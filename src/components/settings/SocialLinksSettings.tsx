import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface SocialLinks {
  vk?: string;
  telegram?: string;
  instagram?: string;
}

interface SocialLinksSettingsProps {
  settings: {
    socialLinks?: SocialLinks;
  };
  onSettingsChange: (newSettings: any) => void;
}

export const SocialLinksSettings: React.FC<SocialLinksSettingsProps> = ({ settings, onSettingsChange }) => {
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      socialLinks: {
        ...settings.socialLinks,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Социальные сети</CardTitle>
        <CardDescription>
          Добавьте ссылки на ваши профили в социальных сетях.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="vk">ВКонтакте</Label>
          <Input 
            id="vk"
            name="vk"
            value={settings.socialLinks?.vk || ''}
            onChange={handleLinkChange} 
            placeholder="https://vk.com/yourpage"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telegram">Telegram</Label>
          <Input 
            id="telegram"
            name="telegram"
            value={settings.socialLinks?.telegram || ''}
            onChange={handleLinkChange}
            placeholder="https://t.me/yourchannel"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instagram">Instagram</Label>
          <Input 
            id="instagram"
            name="instagram"
            value={settings.socialLinks?.instagram || ''}
            onChange={handleLinkChange}
            placeholder="https://instagram.com/yourprofile"
          />
        </div>
      </CardContent>
    </Card>
  );
}; 