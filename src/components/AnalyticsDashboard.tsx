import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useAnalytics } from '@/contexts/AnalyticsContext'
import { useEventTracking } from '@/hooks/useAnalytics'
import { formatNumber, formatDate } from '@/lib/utils'
import { 
  ArrowLeft, 
  Download, 
  RefreshCw, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

export function AnalyticsDashboard() {
  const { getMetrics, getEvents, exportData, clearData } = useAnalytics()
  const { trackClick } = useEventTracking()
  
  const [dateRange, setDateRange] = useState('7d')
  const [metrics, setMetrics] = useState(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
  }, [dateRange])

  const loadAnalytics = () => {
    setLoading(true)
    
    const endDate = new Date().toISOString()
    let startDate = new Date()
    
    switch (dateRange) {
      case '1d':
        startDate.setDate(startDate.getDate() - 1)
        break
      case '7d':
        startDate.setDate(startDate.getDate() - 7)
        break
      case '30d':
        startDate.setDate(startDate.getDate() - 30)
        break
      case '90d':
        startDate.setDate(startDate.getDate() - 90)
        break
      default:
        startDate = null
    }

    const startDateStr = startDate ? startDate.toISOString() : undefined
    const metricsData = getMetrics(startDateStr, endDate)
    const eventsData = getEvents(startDateStr, endDate)
    
    setMetrics(metricsData)
    setEvents(eventsData)
    setLoading(false)
  }

  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    trackClick('export-analytics')
  }

  const handleClearData = () => {
    if (confirm('Вы уверены, что хотите очистить все данные аналитики?')) {
      clearData()
      loadAnalytics()
      trackClick('clear-analytics-data')
    }
  }

  // Prepare chart data
  const pageViewsChartData = events
    .filter(e => e.type === 'page_view')
    .reduce((acc, event) => {
      const date = new Date(event.timestamp).toLocaleDateString('ru-RU')
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {})

  const chartData = Object.entries(pageViewsChartData).map(([date, views]) => ({
    date,
    views
  }))

  const deviceColors = {
    mobile: '#8884d8',
    desktop: '#82ca9d',
    tablet: '#ffc658'
  }

  const deviceIcons = {
    mobile: Smartphone,
    desktop: Monitor,
    tablet: Tablet
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span>Загрузка аналитики...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              to="/admin" 
              className="flex items-center text-gray-600 hover:text-gray-900"
              onClick={() => trackClick('back-to-admin')}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Назад к панели
            </Link>
            <h1 className="text-3xl font-playfair font-bold text-gray-900">
              Аналитика
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {[
                { value: '1d', label: '1 день' },
                { value: '7d', label: '7 дней' },
                { value: '30d', label: '30 дней' },
                { value: '90d', label: '90 дней' }
              ].map((period) => (
                <Button
                  key={period.value}
                  variant={dateRange === period.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setDateRange(period.value)
                    trackClick('analytics-date-range', { range: period.value })
                  }}
                >
                  {period.label}
                </Button>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={handleExport}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Экспорт</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={loadAnalytics}
                className="flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Обновить</span>
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleClearData}
                className="flex items-center space-x-2"
              >
                <span>Очистить</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Просмотры страниц</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatNumber(metrics?.pageViews || 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Уникальные посетители</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatNumber(metrics?.uniqueVisitors || 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Показатель отказов</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {(metrics?.bounceRate || 0).toFixed(1)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Среднее время сессии</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {Math.floor((metrics?.avgSessionDuration || 0) / 60)}м
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="pages">Страницы</TabsTrigger>
            <TabsTrigger value="events">События</TabsTrigger>
            <TabsTrigger value="devices">Устройства</TabsTrigger>
            <TabsTrigger value="sources">Источники</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Просмотры страниц по дням</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="views" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Популярные страницы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics?.topPages?.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary">{index + 1}</Badge>
                        <span className="font-medium">{page.page}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{formatNumber(page.views)} просмотров</span>
                      </div>
                    </div>
                  )) || (
                    <p className="text-gray-500 text-center py-8">Нет данных о страницах</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Популярные события</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics?.topEvents?.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary">{index + 1}</Badge>
                        <span className="font-medium">{event.event}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{formatNumber(event.count)} раз</span>
                      </div>
                    </div>
                  )) || (
                    <p className="text-gray-500 text-center py-8">Нет данных о событиях</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Распределение по устройствам</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={metrics?.deviceTypes || []}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {(metrics?.deviceTypes || []).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={deviceColors[entry.type] || '#8884d8'} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Статистика устройств</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {metrics?.deviceTypes?.map((device, index) => {
                      const Icon = deviceIcons[device.type] || Monitor
                      const total = metrics.deviceTypes.reduce((sum, d) => sum + d.count, 0)
                      const percentage = total > 0 ? (device.count / total * 100).toFixed(1) : 0
                      
                      return (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${deviceColors[device.type] || '#8884d8'}20` }}
                            >
                              <Icon 
                                className="w-5 h-5" 
                                style={{ color: deviceColors[device.type] || '#8884d8' }}
                              />
                            </div>
                            <div>
                              <p className="font-medium capitalize">{device.type}</p>
                              <p className="text-sm text-gray-600">{percentage}%</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatNumber(device.count)}</p>
                            <p className="text-sm text-gray-600">посещений</p>
                          </div>
                        </div>
                      )
                    }) || (
                      <p className="text-gray-500 text-center py-8">Нет данных об устройствах</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sources" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Источники трафика</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={metrics?.trafficSources || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="source" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Детализация источников</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {metrics?.trafficSources?.map((source, index) => {
                      const total = metrics.trafficSources.reduce((sum, s) => sum + s.count, 0)
                      const percentage = total > 0 ? (source.count / total * 100).toFixed(1) : 0
                      
                      return (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Badge variant="secondary">{index + 1}</Badge>
                            <div>
                              <p className="font-medium capitalize">{source.source}</p>
                              <p className="text-sm text-gray-600">{percentage}% трафика</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatNumber(source.count)}</p>
                            <p className="text-sm text-gray-600">посещений</p>
                          </div>
                        </div>
                      )
                    }) || (
                      <p className="text-gray-500 text-center py-8">Нет данных об источниках</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Danger Zone */}
        <Card className="mt-8 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Опасная зона</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Очистить все данные аналитики</p>
                <p className="text-sm text-gray-600">
                  Это действие нельзя отменить. Все данные аналитики будут удалены.
                </p>
              </div>
              <Button 
                variant="destructive" 
                onClick={handleClearData}
              >
                Очистить данные
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

