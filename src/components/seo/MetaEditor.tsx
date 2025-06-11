import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function MetaEditor() {
  const [meta, setMeta] = useState({ title: '', description: '', h1: '' });
  const [verification, setVerification] = useState({ google: '', yandex: '' });

  useEffect(() => {
    fetch('/api/seo/meta')
      .then(res => res.json())
      .then(data => {
        setMeta({
          title: data.title || '',
          description: data.description || '',
          h1: data.h1 || '',
        });
        setVerification({
          google: data.verification?.google || '',
          yandex: data.verification?.yandex || '',
        });
      });
  }, []);

  const handleSave = () => {
    fetch('/api/seo/meta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ meta, verification }),
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Meta-теги</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={meta.title} onChange={e => setMeta({ ...meta, title: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" value={meta.description} onChange={e => setMeta({ ...meta, description: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="h1">H1</Label>
            <Input id="h1" value={meta.h1} onChange={e => setMeta({ ...meta, h1: e.target.value })} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Верификация для поисковых систем</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="google-verification">Google Site Verification</Label>
            <Input id="google-verification" value={verification.google} onChange={e => setVerification({ ...verification, google: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="yandex-verification">Yandex Verification</Label>
            <Input id="yandex-verification" value={verification.yandex} onChange={e => setVerification({ ...verification, yandex: e.target.value })} />
          </div>
        </CardContent>
      </Card>
      
      <Button onClick={handleSave}>Сохранить все</Button>
    </div>
  );
} 