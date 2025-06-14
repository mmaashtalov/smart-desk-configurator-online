import { useMemo, useState } from "react"
import { TOP_MATERIALS, FRAMES, PEDESTALS, ADDONS } from "@/data/officeDeskOptions"

type AddonId = (typeof ADDONS)[number]["id"]

export function useOfficeConfigurator() {
  const [top,  setTop]  = useState<typeof TOP_MATERIALS[number]["id"]>("chipboard")
  const [frame,setFrame]= useState<typeof FRAMES[number]["id"]>("static_p")
  const [ped,  setPed]  = useState<typeof PEDESTALS[number]["id"]>("none")
  const [addons,setAdd] = useState<AddonId[]>([])

  const toggleAddon = (id: AddonId)=>{
    setAdd(a=> a.includes(id) ? a.filter(x=>x!==id) : [...a,id])
  }

  const price = useMemo(()=>{
    const base = 15000                                   // базовая цена стола
    const topPrice   = TOP_MATERIALS.find(m=>m.id===top)!.addPrice
    const framePrice = FRAMES.find(f=>f.id===frame)!.addPrice
    const pedPrice   = PEDESTALS.find(p=>p.id===ped)!.addPrice
    const addonSum   = ADDONS.filter(a=>addons.includes(a.id))
                              .reduce((s,a)=>s+a.price,0)
    return base + topPrice + framePrice + pedPrice + addonSum
  },[top,frame,ped,addons])

  return {top,frame,ped,addons, setTop,setFrame,setPed,toggleAddon, price}
} 