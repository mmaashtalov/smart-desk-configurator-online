import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface SiteInfoSettingsProps {
  settings: {
    siteName?: string;
    tagline?: string;
  };
  onSettingsChange: (newSettings: any) => void;
}

export const SiteInfoSettings: React.FC<SiteInfoSettingsProps> = ({ settings, onSettingsChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Информация о сайте</CardTitle>
        <CardDescription>
          Укажите основную информацию о вашем сайте, которая будет использоваться в заголовках и мета-тегах.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="siteName">Название сайта</Label>
          <Input 
            id="siteName" 
            name="siteName"
            value={settings.siteName || ''}
            onChange={handleChange} 
            placeholder="например, SmartDesk"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tagline">Слоган или краткое описание</Label>
          <Input 
            id="tagline" 
            name="tagline"
            value={settings.tagline || ''}
            onChange={handleChange}
            placeholder="например, Инновационные столы для вашего комфорта"
          />
        </div>
      </CardContent>
    </Card>
  );
}; 