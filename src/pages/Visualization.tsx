import { Layout } from '@/components/Layout'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Visualization: React.FC = () => {
  return (
    <Layout>
      <section className="bg-gradient-to-b from-accent/10 to-transparent py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-6">
            3D-визуализация вашего <span className="text-accent">Smart&nbsp;Desk</span> бесплатно
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Увидьте будущий стол ещё до начала производства. Мы создадим реалистичное 3D-изображение с учётом цвета, комплектующих и вашего интерьера — бесплатно в рамках заказа.
          </p>
          <Button asChild size="lg">
            <Link to="#form">Заказать визуализацию</Link>
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <img src="/images/visualization-example.jpg" alt="Пример визуализации" className="rounded-lg shadow-lg" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Зачем нужна визуализация?</h2>
            <ul className="list-disc pl-5 space-y-3 text-gray-700">
              <li>Экономит время — согласуем все детали ещё до запуска производства.</li>
              <li>Позволяет экспериментировать с цветами, формой и гаджетами.</li>
              <li>Гарантирует, что итоговый продукт будет именно таким, как вы задумали.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-semibold mb-8 text-center">FAQ</h2>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <details className="p-4 bg-white rounded-lg shadow-sm open:shadow-md">
              <summary className="font-medium cursor-pointer">Сколько времени занимает создание одной визуализации?</summary>
              <p className="mt-2">Обычно 1–2 часа для изображения стола на белом фоне.</p>
            </details>
            <details className="p-4 bg-white rounded-lg shadow-sm open:shadow-md">
              <summary className="font-medium cursor-pointer">Можно ли внести правки?</summary>
              <p className="mt-2">Да, до 5 небольших корректировок и до 3 полноценных изменений макета.</p>
            </details>
            <details className="p-4 bg-white rounded-lg shadow-sm open:shadow-md">
              <summary className="font-medium cursor-pointer">Смогу ли я увидеть стол в своём интерьере?</summary>
              <p className="mt-2">Конечно! Пришлите фото помещения — мы «вставим» модель стола прямо в ваш интерьер.</p>
            </details>
          </div>
        </div>
      </section>

      <section id="form" className="py-16">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <h2 className="text-3xl font-semibold mb-6">Заказать визуализацию</h2>
          {/* Simple placeholder form – to be replaced with working form component */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full border rounded-md px-4 py-3 focus:outline-accent"
              required
            />
            <input
              type="tel"
              placeholder="Телефон для связи"
              className="w-full border rounded-md px-4 py-3 focus:outline-accent"
              required
            />
            <select className="w-full border rounded-md px-4 py-3 focus:outline-accent">
              <option>Удобное время для звонка</option>
              <option>Как можно быстрее</option>
              <option>До 12:00</option>
              <option>С 12 до 14:00</option>
              <option>С 14 до 18:00</option>
              <option>После 18:00</option>
            </select>
            <Button type="submit" size="lg" className="w-full">Отправить запрос</Button>
          </form>
          <p className="text-xs text-gray-500 mt-4">
            Нажимая на кнопку, вы соглашаетесь с нашей&nbsp;
            <Link to="/privacy-policy" className="underline">политикой конфиденциальности</Link>.
          </p>
        </div>
      </section>
    </Layout>
  )
}

export default Visualization; 