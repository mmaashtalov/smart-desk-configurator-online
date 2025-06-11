import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Plus } from 'lucide-react';

interface Redirect {
  from: string;
  to: string;
}

export function RedirectsEditor() {
  const [redirects, setRedirects] = useState<Redirect[]>([]);

  useEffect(() => {
    fetch('/api/seo/redirects')
      .then(res => res.json())
      .then(data => setRedirects(data));
  }, []);

  const handleSave = () => {
    fetch('/api/seo/redirects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(redirects),
    });
  };

  const handleAddRedirect = () => {
    setRedirects([...redirects, { from: '', to: '' }]);
  };

  const handleRemoveRedirect = (index: number) => {
    setRedirects(redirects.filter((_, i) => i !== index));
  };

  const handleRedirectChange = (index: number, field: keyof Redirect, value: string) => {
    const newRedirects = [...redirects];
    newRedirects[index][field] = value;
    setRedirects(newRedirects);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          301-редиректы
          <Button variant="outline" size="icon" onClick={handleAddRedirect}>
            <Plus className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Откуда</TableHead>
              <TableHead>Куда</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {redirects.map((redirect, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input value={redirect.from} onChange={e => handleRedirectChange(index, 'from', e.target.value)} />
                </TableCell>
                <TableCell>
                  <Input value={redirect.to} onChange={e => handleRedirectChange(index, 'to', e.target.value)} />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveRedirect(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={handleSave} className="mt-4">Сохранить редиректы</Button>
      </CardContent>
    </Card>
  );
} 