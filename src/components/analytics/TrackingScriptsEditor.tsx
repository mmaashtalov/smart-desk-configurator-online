import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface TrackingScript {
  id: string;
  name: string;
  script: string;
}

export function TrackingScriptsEditor() {
  const [scripts, setScripts] = useState<TrackingScript[]>([]);
  const [newScriptName, setNewScriptName] = useState('');
  const [newScriptContent, setNewScriptContent] = useState('');

  useEffect(() => {
    fetch('/api/seo/tracking')
      .then(res => res.json())
      .then(data => setScripts(data));
  }, []);

  const handleSave = () => {
    fetch('/api/seo/tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scripts),
    }).then(res => {
      if (res.ok) {
        toast.success('Tracking scripts saved successfully!');
      } else {
        toast.error('Failed to save tracking scripts.');
      }
    });
  };

  const handleAddScript = () => {
    if (!newScriptName || !newScriptContent) {
      toast.warning('Please provide a name and script content.');
      return;
    }
    const newScript = { 
      id: `script_${Date.now()}`, 
      name: newScriptName, 
      script: newScriptContent 
    };
    setScripts([...scripts, newScript]);
    setNewScriptName('');
    setNewScriptContent('');
  };

  const handleRemoveScript = (id: string) => {
    setScripts(scripts.filter(script => script.id !== id));
  };

  const handleUpdateScript = (id: string, newName: string, newScript: string) => {
    setScripts(scripts.map(s => s.id === id ? { ...s, name: newName, script: newScript } : s));
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Управление скриптами отслеживания</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scripts.length > 0 ? (
            scripts.map((script) => (
              <div key={script.id} className="p-4 border rounded-lg space-y-2">
                <Input 
                  value={script.name} 
                  onChange={(e) => handleUpdateScript(script.id, e.target.value, script.script)}
                  placeholder="e.g., Google Analytics"
                  className="font-semibold"
                />
                <Textarea 
                  value={script.script} 
                  onChange={(e) => handleUpdateScript(script.id, script.name, e.target.value)}
                  placeholder="Paste your <script>...</script> or JS code here"
                  rows={4}
                />
                <Button variant="ghost" size="icon" onClick={() => handleRemoveScript(script.id)} className="float-right">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">Скрипты не добавлены.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Добавить новый скрипт</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="script-name">Название скрипта</Label>
            <Input 
              id="script-name" 
              value={newScriptName} 
              onChange={e => setNewScriptName(e.target.value)} 
              placeholder="например, Google Analytics"
            />
          </div>
          <div>
            <Label htmlFor="script-content">Содержимое скрипта</Label>
            <Textarea
              id="script-content"
              value={newScriptContent}
              onChange={e => setNewScriptContent(e.target.value)}
              placeholder="Вставьте ваш <script>...</script> или JS код"
              rows={6}
            />
          </div>
          <Button onClick={handleAddScript}>
            <Plus className="mr-2 h-4 w-4" />
            Добавить скрипт
          </Button>
        </CardContent>
      </Card>
      
      <Button onClick={handleSave} size="lg" className="w-full">Сохранить все изменения</Button>
    </div>
  );
} 