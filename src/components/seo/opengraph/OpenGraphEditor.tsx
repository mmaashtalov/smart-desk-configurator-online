import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export function OpenGraphEditor() {
  const [data, setData] = useState({ ogTitle:'', ogDescription:'', ogImage:'' })
  useEffect(()=>{
    fetch('/api/seo/opengraph').then(r=>r.json()).then(r=>setData(r))
  },[])
  const save=async()=>{
    await fetch('/api/seo/opengraph',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
    alert('OpenGraph сохранён')
  }
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Open Graph</h2>
      <Input placeholder="og:title" value={data.ogTitle} onChange={e=>setData({...data,ogTitle:e.target.value})}/>
      <Textarea placeholder="og:description" value={data.ogDescription} onChange={e=>setData({...data,ogDescription:e.target.value})}/>
      <Input placeholder="og:image URL" value={data.ogImage} onChange={e=>setData({...data,ogImage:e.target.value})}/>
      <Button onClick={save}>Сохранить</Button>
    </div>
  )
} 