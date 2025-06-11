import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function RobotsEditor() {
  const [robots, setRobots] = useState('');

  useEffect(() => {
    fetch('/api/seo/robots')
      .then(res => res.text())
      .then(data => setRobots(data));
  }, []);

  const handleSave = () => {
    fetch('/api/seo/robots', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: robots,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>robots.txt</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea value={robots} onChange={e => setRobots(e.target.value)} rows={10} />
        <Button onClick={handleSave}>Сохранить</Button>
      </CardContent>
    </Card>
  );
} 