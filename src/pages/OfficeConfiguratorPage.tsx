import React from 'react'
import { Layout } from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { useOfficeConfigurator } from '@/hooks/useOfficeConfigurator'
import { TOP_MATERIALS, FRAMES, PEDESTALS, ADDONS } from '@/data/officeDeskOptions'
import { OptionGroup } from '@/components/configurator/OptionGroup'
import { AddonGroup } from '@/components/configurator/AddonGroup'

const OfficeConfiguratorPage: React.FC = () => {
  const { top, frame, ped, addons, setTop, setFrame, setPed, toggleAddon, price } = useOfficeConfigurator()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      top, frame, ped, addons, price
    })
    alert(`Ваш заказ на ${price} ₽ успешно отправлен!`)
  }

  return (
    <Layout>
      <section className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 font-playfair text-center">
          Конфигуратор <span className="text-accent">офисного</span> стола
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-12">
          <OptionGroup
            title="Материал столешницы"
            options={TOP_MATERIALS}
            selectedValue={top}
            onValueChange={setTop as (value: string) => void}
          />

          <OptionGroup
            title="Тип подстолья"
            options={FRAMES}
            selectedValue={frame}
            onValueChange={setFrame as (value: string) => void}
          />

          <OptionGroup
            title="Тумбы"
            options={PEDESTALS}
            selectedValue={ped}
            onValueChange={setPed as (value: string) => void}
          />

          <AddonGroup
            title="Дополнительные опции"
            addons={ADDONS}
            selectedAddons={addons}
            onCheckedChange={toggleAddon as (id: string, checked: boolean | 'indeterminate') => void}
          />

          <div className="bg-gray-100 p-6 rounded-lg shadow-inner text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">Итоговая стоимость: <span className="text-accent">{price} ₽</span></h2>
            <p className="text-gray-700 mb-4">Нажмите, чтобы отправить заявку или добавить в корзину</p>
            <Button type="submit" size="lg" className="w-full md:w-auto">Оформить заказ</Button>
          </div>
        </form>
      </section>
    </Layout>
  )
}

export default OfficeConfiguratorPage 