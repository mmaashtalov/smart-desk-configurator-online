import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ContactInfoSettingsProps {
  settings: {
    contactEmail?: string;
    phone?: string;
    address?: string;
  };
  onSettingsChange: (newSettings: any) => void;
}

export const ContactInfoSettings: React.FC<ContactInfoSettingsProps> = ({ settings, onSettingsChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Контактная информация</CardTitle>
        <CardDescription>
          Эта информация будет отображаться на странице контактов и в других частях сайта.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="contactEmail">Email для связи</Label>
          <Input 
            id="contactEmail" 
            name="contactEmail"
            type="email"
            value={settings.contactEmail || ''}
            onChange={handleChange} 
            placeholder="например, support@smartdesk.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Телефон</Label>
          <Input 
            id="phone"
            name="phone"
            value={settings.phone || ''}
            onChange={handleChange}
            placeholder="например, +7 (999) 123-45-67"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Адрес</Label>
          <Input 
            id="address"
            name="address"
            value={settings.address || ''}
            onChange={handleChange}
            placeholder="например, г. Москва, ул. Примерная, д. 1"
          />
        </div>
      </CardContent>
    </Card>
  );
}; 