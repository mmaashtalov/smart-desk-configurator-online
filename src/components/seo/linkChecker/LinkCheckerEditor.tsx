import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

export function LinkCheckerEditor() {
  const [report, setReport] = useState('')
  const run=async()=>{
    const r=await fetch('/api/seo/check-links').then(r=>r.json())
    setReport(JSON.stringify(r,null,2))
  }
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Проверка битых ссылок</h2>
      <Button onClick={run}>Запустить</Button>
      {report && <pre className="bg-gray-100 p-4 text-sm whitespace-pre-wrap">{report}</pre>}
    </div>
  )
} 