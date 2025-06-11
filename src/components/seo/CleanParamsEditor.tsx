import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';

export function CleanParamsEditor() {
  const [params, setParams] = useState<string[]>([]);
  const [newParam, setNewParam] = useState('');

  useEffect(() => {
    fetch('/api/seo/clean-params')
      .then(res => res.json())
      .then(data => setParams(data));
  }, []);

  const handleSave = () => {
    fetch('/api/seo/clean-params', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
  };

  const handleAddParam = () => {
    if (newParam && !params.includes(newParam)) {
      setParams([...params, newParam]);
      setNewParam('');
    }
  };

  const handleRemoveParam = (paramToRemove: string) => {
    setParams(params.filter(param => param !== paramToRemove));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clean-param</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input value={newParam} onChange={e => setNewParam(e.target.value)} placeholder="utm_source" />
          <Button onClick={handleAddParam}>Добавить</Button>
        </div>
        <div className="space-y-2">
          {params.map(param => (
            <div key={param} className="flex items-center justify-between">
              <span>{param}</span>
              <Button variant="ghost" size="icon" onClick={() => handleRemoveParam(param)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button onClick={handleSave}>Сохранить параметры</Button>
      </CardContent>
    </Card>
  );
} 