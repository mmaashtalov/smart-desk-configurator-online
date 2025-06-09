import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Sun, Moon } from 'lucide-react';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-playfair">Настройки</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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
    </div>
  );
};

export default Settings; 