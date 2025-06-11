import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function CleanParamsEditor() {
  const [params, setParams] = useState('')
  useEffect(()=>{
    fetch('/api/seo/clean-params').then(r=>r.json()).then(r=>setParams((r.params||[]).join(',')))
  },[])
  const save=async()=>{
    const arr = params.split(',').map(s=>s.trim()).filter(Boolean)
    await fetch('/api/seo/clean-params',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({params:arr})})
    alert('Clean-params сохранены')
  }
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Clean Params</h2>
      <Input placeholder="param1,param2,..." value={params} onChange={e=>setParams(e.target.value)}/>
      <Button onClick={save}>Сохранить</Button>
    </div>
  )
} 