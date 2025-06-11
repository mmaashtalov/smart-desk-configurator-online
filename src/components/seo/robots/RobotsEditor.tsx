import React, { useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export function RobotsEditor() {
  const [content, setContent] = useState('')
  useEffect(()=>{
    fetch('/api/seo/robots').then(r=>r.json()).then(r=>setContent(r.content||''))
  },[])
  const save=async()=>{
    await fetch('/api/seo/robots',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({content})})
    alert('robots.txt сохранён')
  }
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">robots.txt</h2>
      <Textarea rows={10} value={content} onChange={e=>setContent(e.target.value)}/>
      <Button onClick={save}>Сохранить</Button>
    </div>
  )
} 