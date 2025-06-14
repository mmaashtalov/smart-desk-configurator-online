import React, { useState } from 'react'
import { Layout } from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import { ConsultationDialog } from '@/components/ConsultationDialog'

const RentLanding: React.FC = () => {
  const packages = [
    {
      id: 'basic',
      name: 'Start-up',
      price: 5000,
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80',
      features: ['Стол 140×70 см', 'Офисное кресло', 'Тумба с замком', 'Доставка 48 ч']
    },
    {
      id: 'pro',
      name: 'Growth',
      price: 7500,
      image: 'https://images.unsplash.com/photo-1507081325982-219b9e0fdff8?auto=format&fit=crop&w=800&q=80',
      features: ['Стол 160×80 см', 'Эргономичное кресло', 'Подвесная тумба', 'Монитор-рукав', 'Сборка на месте']
    },
    {
      id: 'team',
      name: 'Team ×5',
      price: 32000,
      image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80',
      features: ['5 рабочих мест', 'Единая доставка', 'Продлённая гарантия', 'Скидка 10 %']
    },
  ]

  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  return (
    <Layout>
      <section className="bg-gradient-to-b from-accent/10 to-transparent py-16 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-4">
          Аренда готового <span className="text-accent">рабочего места</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          Быстро разверните полноценный офис без капитальных затрат. Мы привезём, соберём и&nbsp;обслужим всё оборудование&nbsp;— вам останется только работать.
        </p>
        <Button size="lg" asChild>
          <Link to="#packages">Выбрать пакет</Link>
        </Button>
      </section>

      <ConsultationDialog open={dialogOpen} onOpenChange={setDialogOpen} subject={selectedPackage ?? undefined} />

      <section id="packages" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Тарифные пакеты</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {packages.map(pkg => (
            <div key={pkg.id} className="border rounded-lg shadow-sm p-6 flex flex-col">
              <ImageWithFallback
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">{pkg.name}</h3>
              <p className="text-accent text-3xl font-bold mb-4">{pkg.price.toLocaleString('ru-RU')} ₽/мес</p>
              <ul className="flex-1 list-disc list-inside text-sm text-gray-700 mb-6 space-y-1">
                {pkg.features.map((f,i)=>(<li key={i}>{f}</li>))}
              </ul>
              <Button
                className="w-full"
                type="button"
                onClick={() => {
                  setSelectedPackage(pkg.name)
                  setDialogOpen(true)
                }}
              >
                Оставить заявку
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Как это работает?</h2>
          <ol className="text-left space-y-4 list-decimal list-inside text-gray-700">
            <li>Выбираете пакет и&nbsp;оставляете заявку.</li>
            <li>Менеджер уточняет адрес и&nbsp;срок аренды, подписываем договор.</li>
            <li>Мы доставляем и&nbsp;собираем мебель в&nbsp;течение 48&nbsp;часов.</li>
            <li>В&nbsp;конце срока аренды забираем мебель или продлеваем договор.</li>
          </ol>
        </div>
      </section>
    </Layout>
  )
}

export default RentLanding 