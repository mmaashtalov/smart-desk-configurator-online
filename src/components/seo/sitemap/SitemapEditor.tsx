import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export function SitemapEditor() {
  const [urls, setUrls] = useState<string[]>([])
  useEffect(()=>{
    fetch('/api/seo/sitemap').then(r=>r.json()).then(r=>setUrls(r.urls || []))
  },[])
  const regenerate = async () => {
    // для примера мы просто POST пустой массив
    await fetch('/api/seo/sitemap',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({urls})})
    alert('sitemap.xml обновлён')
  }
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Sitemap.xml</h2>
      <p>Страницы в карте:</p>
      <ul className="list-disc ml-6">
        {urls.map((u,i)=><li key={i}>{u}</li>)}
      </ul>
      <Button onClick={regenerate}>Перегенерировать</Button>
    </div>
  )
} 