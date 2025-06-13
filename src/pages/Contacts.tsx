import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Contacts = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Сообщение отправлено!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-accent" />,
      title: "Телефон",
      content: "+7 (495) 123-45-67",
      subtitle: "Ежедневно с 9:00 до 21:00"
    },
    {
      icon: <Mail className="h-6 w-6 text-accent" />,
      title: "Email",
      content: "info@office-intellect.ru",
      subtitle: "Ответим в течение 2 часов"
    },
    {
      icon: <MapPin className="h-6 w-6 text-accent" />,
      title: "Адрес",
      content: "Москва, ул. Примерная, д. 1",
      subtitle: "Шоурум 50 м²"
    },
    {
      icon: <Clock className="h-6 w-6 text-accent" />,
      title: "Режим работы",
      content: "Пн-Пт: 9:00-19:00",
      subtitle: "Сб-Вс: 10:00-18:00"
    }
  ];

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: <MessageCircle className="h-5 w-5" />,
      link: "#",
      color: "bg-green-500"
    },
    {
      name: "Telegram",
      icon: <Send className="h-5 w-5" />,
      link: "#", 
      color: "bg-blue-500"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-neutral">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
                Контакты
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Свяжитесь с нами любым удобным способом. Мы всегда готовы ответить на ваши вопросы
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex justify-center mb-4">
                      {info.icon}
                    </div>
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium text-gray-900 mb-1">{info.content}</p>
                    <p className="text-sm text-gray-500">{info.subtitle}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl">Написать нам</CardTitle>
                  <p className="text-gray-600">
                    Заполните форму, и мы свяжемся с вами в ближайшее время
                  </p>
                </CardHeader>
                <CardContent className="px-0">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Имя *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Телефон *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Тема обращения</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Сообщение *</Label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" size="lg">
                      <Send className="h-4 w-4 mr-2" />
                      Отправить сообщение
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <div className="space-y-8">
                {/* Map Placeholder */}
                <Card className="overflow-hidden">
                  <div className="h-56 md:h-64 bg-gradient-to-br from-wood-primary to-wood-secondary flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <MapPin className="h-12 w-12 mx-auto mb-4" />
                      <p className="font-medium">Интерактивная карта</p>
                      <p className="text-sm">Москва, ул. Примерная, д. 1</p>
                    </div>
                  </div>
                </Card>

                {/* Quick Contact */}
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Быстрая связь</CardTitle>
                    <p className="text-gray-600">
                      Свяжитесь с нами через мессенджеры для быстрого ответа
                    </p>
                  </CardHeader>
                  <CardContent className="px-0">
                    <div className="flex space-x-4">
                      {socialLinks.map((social, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className={`${social.color} hover:opacity-90 text-white border-none`}
                          asChild
                        >
                          <a href={social.link} target="_blank" rel="noopener noreferrer">
                            {social.icon}
                            <span className="ml-2">{social.name}</span>
                          </a>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Showroom Info */}
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Посетите наш шоурум</CardTitle>
                    <p className="text-gray-600">
                      Увидите и протестируете наши столы вживую
                    </p>
                  </CardHeader>
                  <CardContent className="px-0">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span>Экспозиция из 10+ моделей столов</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span>Демонстрация всех функций</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span>Консультация специалиста</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span>Бесплатная парковка</span>
                      </li>
                    </ul>
                    <Button className="w-full mt-4" variant="outline">
                      Записаться на визит
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contacts;
