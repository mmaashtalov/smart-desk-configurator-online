import { Layout } from '@/components/Layout'

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="bg-neutral py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-8 text-center">
            Политика конфиденциальности
          </h1>

          <p className="text-gray-700 mb-6">
            Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального
            закона от 27.07.2006 №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и
            меры по обеспечению безопасности персональных данных, предпринимаемые ООО «Офис Интеллект» (далее –
            «Оператор», «мы», «наш»).
          </p>

          <section className="mb-10">
            <h2 className="font-semibold text-2xl mb-4">1. Общие положения</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Настоящая Политика применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта
                smart-desk-configurator.ru.
              </li>
              <li>
                Используя сайт и/или оставляя свои данные, пользователь соглашается с условиями данной Политики.
              </li>
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="font-semibold text-2xl mb-4">2. Основные понятия</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                «Персональные данные» — любая информация, относящаяся к прямо или косвенно определённому физическому лицу.
              </li>
              <li>
                «Обработка персональных данных» — любое действие, совершаемое с персональными данными.
              </li>
            </ul>
          </section>

          <p className="text-sm text-gray-500">
            Дата публикации: 01.06.2025. В случае изменений мы опубликуем новую версию Политики на этой странице.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default PrivacyPolicy 