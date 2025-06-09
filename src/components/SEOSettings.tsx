import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { useSEO } from '@/contexts/SEOContext'
import { useEventTracking } from '@/hooks/useAnalytics'
import { ArrowLeft, Save, Download, Upload, Plus, Trash2, Edit, Eye } from 'lucide-react'
import { SEOData, PageSEO } from '@/types'

export function SEOSettings() {
  const { 
    getAllPagesSEO, 
    updatePageSEO, 
    generateSitemap, 
    generateRobotsTxt 
  } = useSEO()
  const { trackClick, trackFormSubmit } = useEventTracking()
  
  const [pages, setPages] = useState<PageSEO[]>([])
  const [selectedPage, setSelectedPage] = useState<PageSEO | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<SEOData>({
    title: '',
    description: '',
    keywords: [],
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterCard: 'summary_large_image',
    twitterSite: '',
    canonical: '',
    robots: 'index, follow'
  })
  const [keywordInput, setKeywordInput] = useState('')
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    loadPages()
  }, [])

  const loadPages = () => {
    const allPages = getAllPagesSEO()
    setPages(allPages)
    if (allPages.length > 0 && !selectedPage) {
      setSelectedPage(allPages[0])
      setFormData(allPages[0].seo)
    }
  }

  const handlePageSelect = (page: PageSEO) => {
    setSelectedPage(page)
    setFormData(page.seo)
    setIsEditing(false)
    trackClick('seo-page-select', { page: page.path })
  }

  const handleInputChange = (field: keyof SEOData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()]
      }))
      setKeywordInput('')
    }
  }

  const handleRemoveKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }))
  }

  const handleSave = () => {
    if (selectedPage) {
      updatePageSEO(selectedPage.path, formData)
      setSaveMessage('Настройки SEO сохранены успешно!')
      setTimeout(() => setSaveMessage(''), 3000)
      loadPages()
      trackFormSubmit('seo-settings-save', { page: selectedPage.path })
    }
  }

  const handleDownloadSitemap = () => {
    const sitemap = generateSitemap()
    const blob = new Blob([sitemap], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sitemap.xml'
    a.click()
    URL.revokeObjectURL(url)
    trackClick('download-sitemap')
  }

  const handleDownloadRobots = () => {
    const robots = generateRobotsTxt()
    const blob = new Blob([robots], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'robots.txt'
    a.click()
    URL.revokeObjectURL(url)
    trackClick('download-robots')
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
              SEO Настройки
            </h1>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleDownloadSitemap}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Sitemap</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDownloadRobots}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Robots.txt</span>
            </Button>
          </div>
        </div>

        {saveMessage && (
          <Alert className="mb-6">
            <AlertDescription>{saveMessage}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Pages List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Страницы</span>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {pages.map((page) => (
                    <div
                      key={page.id}
                      className={`p-3 cursor-pointer hover:bg-gray-50 border-l-4 ${
                        selectedPage?.id === page.id
                          ? 'border-wood-primary bg-wood-primary/5'
                          : 'border-transparent'
                      }`}
                      onClick={() => handlePageSelect(page)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{page.path}</p>
                          <p className="text-xs text-gray-500 truncate">
                            {page.seo.title}
                          </p>
                        </div>
                        <Badge variant={page.isActive ? 'default' : 'secondary'}>
                          {page.isActive ? 'Активна' : 'Неактивна'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SEO Settings */}
          <div className="lg:col-span-3">
            {selectedPage ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      SEO для страницы: {selectedPage.path}
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? <Eye className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                        {isEditing ? 'Просмотр' : 'Редактировать'}
                      </Button>
                      {isEditing && (
                        <Button
                          size="sm"
                          onClick={handleSave}
                          className="bg-wood-primary hover:bg-wood-secondary"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Сохранить
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="basic">Основные</TabsTrigger>
                      <TabsTrigger value="social">Соцсети</TabsTrigger>
                      <TabsTrigger value="technical">Технические</TabsTrigger>
                      <TabsTrigger value="preview">Превью</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-6">
                      <div>
                        <Label htmlFor="title">Заголовок страницы (Title)</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          placeholder="Заголовок страницы"
                          disabled={!isEditing}
                          className="mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Длина: {formData.title.length}/60 символов
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="description">Описание (Description)</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          placeholder="Описание страницы"
                          disabled={!isEditing}
                          className="mt-1"
                          rows={3}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Длина: {formData.description.length}/160 символов
                        </p>
                      </div>

                      <div>
                        <Label>Ключевые слова</Label>
                        <div className="mt-1 space-y-2">
                          {isEditing && (
                            <div className="flex space-x-2">
                              <Input
                                value={keywordInput}
                                onChange={(e) => setKeywordInput(e.target.value)}
                                placeholder="Добавить ключевое слово"
                                onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                              />
                              <Button onClick={handleAddKeyword} size="sm">
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2">
                            {formData.keywords.map((keyword, index) => (
                              <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                                <span>{keyword}</span>
                                {isEditing && (
                                  <button
                                    onClick={() => handleRemoveKeyword(keyword)}
                                    className="ml-1 hover:text-red-500"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="social" className="space-y-6">
                      <div>
                        <Label htmlFor="ogTitle">Open Graph заголовок</Label>
                        <Input
                          id="ogTitle"
                          value={formData.ogTitle || ''}
                          onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                          placeholder="Заголовок для соцсетей"
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="ogDescription">Open Graph описание</Label>
                        <Textarea
                          id="ogDescription"
                          value={formData.ogDescription || ''}
                          onChange={(e) => handleInputChange('ogDescription', e.target.value)}
                          placeholder="Описание для соцсетей"
                          disabled={!isEditing}
                          className="mt-1"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="ogImage">Open Graph изображение</Label>
                        <Input
                          id="ogImage"
                          value={formData.ogImage || ''}
                          onChange={(e) => handleInputChange('ogImage', e.target.value)}
                          placeholder="URL изображения"
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="twitterSite">Twitter аккаунт</Label>
                        <Input
                          id="twitterSite"
                          value={formData.twitterSite || ''}
                          onChange={(e) => handleInputChange('twitterSite', e.target.value)}
                          placeholder="@username"
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="technical" className="space-y-6">
                      <div>
                        <Label htmlFor="canonical">Canonical URL</Label>
                        <Input
                          id="canonical"
                          value={formData.canonical || ''}
                          onChange={(e) => handleInputChange('canonical', e.target.value)}
                          placeholder="https://example.com/page"
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="robots">Robots</Label>
                        <Input
                          id="robots"
                          value={formData.robots || ''}
                          onChange={(e) => handleInputChange('robots', e.target.value)}
                          placeholder="index, follow"
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="preview" className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-4">Превью в поисковой выдаче</h3>
                        <div className="border rounded-lg p-4 bg-white">
                          <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                            {formData.title || 'Заголовок страницы'}
                          </div>
                          <div className="text-green-700 text-sm">
                            {window.location.origin}{selectedPage.path}
                          </div>
                          <div className="text-gray-600 text-sm mt-1">
                            {formData.description || 'Описание страницы'}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-4">Превью в социальных сетях</h3>
                        <div className="border rounded-lg overflow-hidden bg-white max-w-md">
                          {formData.ogImage && (
                            <div className="h-48 bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500">Изображение</span>
                            </div>
                          )}
                          <div className="p-4">
                            <div className="font-semibold text-gray-900">
                              {formData.ogTitle || formData.title || 'Заголовок'}
                            </div>
                            <div className="text-gray-600 text-sm mt-1">
                              {formData.ogDescription || formData.description || 'Описание'}
                            </div>
                            <div className="text-gray-500 text-xs mt-2">
                              {window.location.hostname}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-500">
                    Выберите страницу для редактирования SEO настроек
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

