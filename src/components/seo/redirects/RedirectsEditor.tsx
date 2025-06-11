import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

type Rule = { from: string, to: string }
export function RedirectsEditor() {
  const [rules, setRules] = useState<Rule[]>([])
  useEffect(()=>{
    fetch('/api/seo/redirects').then(r=>r.json()).then(r=>setRules(r.rules||[]))
  },[])
  const add=()=>setRules([...rules,{from:'',to:''}])
  const update=(i: number,key: keyof Rule,value: string)=>{ const a=[...rules]; a[i][key]=value; setRules(a) }
  const save=async()=>{ await fetch('/api/seo/redirects',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({rules})}); alert('Redirects сохранены') }
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">301 Redirects</h2>
      {rules.map((r,i)=>(
        <div key={i} className="flex gap-2">
          <input className="border p-1 flex-1" placeholder="/old" value={r.from} onChange={e=>update(i,'from',e.target.value)}/>
          <span className="self-center">→</span>
          <input className="border p-1 flex-1" placeholder="/new" value={r.to} onChange={e=>update(i,'to',e.target.value)}/>
        </div>
      ))}
      <Button variant="outline" onClick={add}>Добавить правило</Button>
      <Button onClick={save}>Сохранить</Button>
    </div>
  )
} 