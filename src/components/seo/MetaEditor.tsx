import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function MetaEditor() {
  const [meta, setMeta] = useState({ title: '', description: '', h1: '' });
  const [verification, setVerification] = useState({ google: '', yandex: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/seo/meta');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setMeta({
          title: data.title || '',
          description: data.description || '',
          h1: data.h1 || '',
        });
        setVerification({
          google: data.verification?.google || '',
          yandex: data.verification?.yandex || '',
        });
      } catch (error) {
        console.error("Failed to fetch meta data:", error);
        // Optionally, handle error state in UI
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch('/api/seo/meta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meta, verification }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      // Optionally, show a success message
      console.log("Meta data saved successfully!");
    } catch (error) {
      console.error("Failed to save meta data:", error);
      // Optionally, show an error message to the user
    }
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