import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export function FeedEditor() {
  const [data, setData] = useState('')
  useEffect(()=>{
    fetch('/api/seo/feed').then(r=>r.json()).then(r=>setData(JSON.stringify(r,null,2)))
  },[])
  const save = async () => {
    await fetch('/api/seo/feed',{method:'POST',headers:{'Content-Type':'application/json'},body:data})
    alert('YML-фид сохранён')
  }
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">YML-фид</h2>
      <Textarea rows={10} value={data} onChange={e=>setData(e.target.value)}/>
      <Button onClick={save}>Сохранить</Button>
    </div>
  )
} 