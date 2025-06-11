import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { SiteInfoSettings } from '@/components/settings/SiteInfoSettings';
import { ContactInfoSettings } from '@/components/settings/ContactInfoSettings';
import { SocialLinksSettings } from '@/components/settings/SocialLinksSettings';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetch('/api/seo/settings')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setSettings(data);
        }
      })
      .catch(() => {
        toast.error('Не удалось загрузить настройки.');
      });
  }, []);

  const handleSettingsChange = (newSettings: any) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleSave = () => {
    fetch('/api/seo/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    }).then(res => {
      if (res.ok) {
        toast.success('Настройки успешно сохранены!');
      } else {
        toast.error('Не удалось сохранить настройки.');
      }
    });
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold">Общие настройки</h1>
      
      <SiteInfoSettings settings={settings} onSettingsChange={handleSettingsChange} />
      <ContactInfoSettings settings={settings} onSettingsChange={handleSettingsChange} />
      <SocialLinksSettings settings={settings} onSettingsChange={handleSettingsChange} />

      <Card>
        <CardHeader>
          <CardTitle>Внешний вид</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <Label htmlFor="theme-switch" className="flex items-center gap-4">
               <div className="flex items-center gap-2">
                <Sun className={`transition-all ${isDarkMode ? 'text-slate-500' : 'text-yellow-500'}`} />
                <span className="font-medium">Светлая тема</span>
              </div>
              <div className="flex items-center gap-2">
                <Moon className={`transition-all ${isDarkMode ? 'text-blue-500' : 'text-slate-500'}`} />
                <span className="font-medium">Темная тема</span>
              </div>
            </Label>
            <Switch
              id="theme-switch"
              checked={isDarkMode}
              onCheckedChange={toggleTheme}
            />
          </div>
        </CardContent>
      </Card>
      
      <Button onClick={handleSave} size="lg" className="w-full">
        Сохранить все изменения
      </Button>
    </div>
  );
};

export default Settings; 