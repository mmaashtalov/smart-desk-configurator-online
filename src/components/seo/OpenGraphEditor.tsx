import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function OpenGraphEditor() {
  const [openGraph, setOpenGraph] = useState({ title: '', description: '', image: '' });

  useEffect(() => {
    // TODO: Fetch initial data from API
    // fetch('/api/seo/opengraph')
    //   .then(res => res.json())
    //   .then(data => setOpenGraph(data));
  }, []);

  const handleSave = () => {
    // TODO: Implement API call to save data
    // fetch('/api/seo/opengraph', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(openGraph),
    // });
    console.log('Saving OpenGraph data:', openGraph);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>OpenGraph Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="og-title">og:title</Label>
          <Input 
            id="og-title" 
            value={openGraph.title} 
            onChange={e => setOpenGraph({ ...openGraph, title: e.target.value })} 
            placeholder="Enter OpenGraph title" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="og-description">og:description</Label>
          <Input 
            id="og-description" 
            value={openGraph.description} 
            onChange={e => setOpenGraph({ ...openGraph, description: e.target.value })}
            placeholder="Enter OpenGraph description" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="og-image">og:image</Label>
          <Input 
            id="og-image" 
            value={openGraph.image}
            onChange={e => setOpenGraph({ ...openGraph, image: e.target.value })}
            placeholder="Enter OpenGraph image URL" 
          />
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
