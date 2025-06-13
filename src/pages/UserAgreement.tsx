import { Layout } from '@/components/Layout'

const UserAgreement = () => {
  return (
    <Layout>
      <div className="bg-neutral py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-8 text-center">
            Пользовательское соглашение
          </h1>

          <p className="text-gray-700 mb-6">
            Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между ООО «Офис Интеллект»
            (далее — «Компания», «мы») и физическим лицом (далее — «Пользователь», «вы»), возникающие при использовании
            веб-сайта smart-desk-configurator.ru и связанных с ним сервисов (далее совместно — «Сайт»).
          </p>

          <section className="mb-10">
            <h2 className="font-semibold text-2xl mb-4">1. Общие положения</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Используя Сайт, Пользователь подтверждает своё согласие с настоящим Соглашением и обязуется соблюдать его
                положения.
              </li>
              <li>
                Компания может изменять Соглашение без уведомления Пользователя. Актуальная версия всегда доступна по
                данному адресу.
              </li>
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="font-semibold text-2xl mb-4">2. Права и обязанности Пользователя</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Пользователь обязуется использовать Сайт в рамках законодательства РФ.</li>
              <li>Пользователь обязуется не нарушать работу Сайта и не предпринимать действий, направленных на получение несанкционированного доступа к ресурсам Компании.</li>
              <li>Пользователь вправе обращаться в службу поддержки по вопросам использования Сайта.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-semibold text-2xl mb-4">3. Ответственность сторон</h2>
            <p className="text-gray-700">
              Компания не несет ответственности за прямой или косвенный ущерб, возникший у Пользователя вследствие
              использования или невозможности использования Сайта.
            </p>
          </section>

          <p className="text-sm text-gray-500">
            Дата публикации: 01.06.2025. Актуальная версия Соглашения находится на данной странице.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default UserAgreement 