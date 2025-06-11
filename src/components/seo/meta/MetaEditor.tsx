import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export function MetaEditor() {
  const [data, setData] = useState({ title:'', description:'', h1:'' })
  useEffect(() => {
    fetch('/api/seo/meta')
      .then(r=>r.json())
      .then(r=>setData(r))
  },[])
  const save = async () => {
    await fetch('/api/seo/meta',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
    alert('Meta сохранено')
  }
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Meta-теги</h2>
      <Input placeholder="Title" value={data.title} onChange={e=>setData({...data,title:e.target.value})}/>
      <Textarea placeholder="Description" value={data.description} onChange={e=>setData({...data,description:e.target.value})}/>
      <Input placeholder="H1" value={data.h1} onChange={e=>setData({...data,h1:e.target.value})}/>
      <Button onClick={save}>Сохранить</Button>
    </div>
  )
} 