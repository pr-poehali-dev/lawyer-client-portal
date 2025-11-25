import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const services = [
  {
    title: 'Корпоративное право',
    description: 'Сопровождение бизнеса, составление договоров, регистрация юридических лиц',
    icon: 'Briefcase',
  },
  {
    title: 'Гражданское право',
    description: 'Защита прав граждан, споры по недвижимости, наследственные дела',
    icon: 'Users',
  },
  {
    title: 'Семейное право',
    description: 'Бракоразводные процессы, раздел имущества, алименты',
    icon: 'Heart',
  },
  {
    title: 'Уголовное право',
    description: 'Защита в уголовных делах, представительство в суде',
    icon: 'Scale',
  },
];

const lawyers = [
  {
    name: 'Александр Петров',
    position: 'Старший партнёр',
    specialization: 'Корпоративное право',
    experience: '15 лет',
    image: 'https://cdn.poehali.dev/projects/d248eb09-dd7f-4cb2-bac6-19e2d80bfc94/files/dc5392d1-0296-4166-a25c-8611c5beaa8d.jpg',
  },
  {
    name: 'Елена Смирнова',
    position: 'Ведущий юрист',
    specialization: 'Гражданское право',
    experience: '12 лет',
    image: 'https://cdn.poehali.dev/projects/d248eb09-dd7f-4cb2-bac6-19e2d80bfc94/files/dc5392d1-0296-4166-a25c-8611c5beaa8d.jpg',
  },
  {
    name: 'Михаил Иванов',
    position: 'Юрист',
    specialization: 'Семейное право',
    experience: '8 лет',
    image: 'https://cdn.poehali.dev/projects/d248eb09-dd7f-4cb2-bac6-19e2d80bfc94/files/dc5392d1-0296-4166-a25c-8611c5beaa8d.jpg',
  },
];

export default function Index() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { toast } = useToast();

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Вход выполнен',
      description: 'Добро пожаловать в личный кабинет',
    });
    setIsAuthOpen(false);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка отправлена',
      description: 'Мы свяжемся с вами в ближайшее время',
    });
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Scale" size={32} className="text-primary" />
            <span className="text-2xl font-bold text-primary">ЛексПро</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="text-foreground hover:text-primary transition-colors">
              Услуги
            </a>
            <a href="#lawyers" className="text-foreground hover:text-primary transition-colors">
              Специалисты
            </a>
            <a href="#contacts" className="text-foreground hover:text-primary transition-colors">
              Контакты
            </a>
          </nav>
          <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Icon name="LogIn" size={18} />
                Войти
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Вход в личный кабинет</DialogTitle>
                <DialogDescription>Введите ваши данные для входа</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="info@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Войти
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-primary to-primary/90">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/d248eb09-dd7f-4cb2-bac6-19e2d80bfc94/files/08f4fc3c-8834-4f11-b219-23501f5648f6.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Профессиональная юридическая защита
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Более 15 лет опыта в решении сложных правовых вопросов
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="text-lg gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Icon name="Calendar" size={20} />
                  Записаться на консультацию
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Запись на консультацию</DialogTitle>
                  <DialogDescription>Заполните форму, и мы свяжемся с вами</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input id="name" placeholder="Иван Иванов" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Услуга</Label>
                    <select id="service" className="w-full px-3 py-2 border border-input rounded-md bg-background" required>
                      <option value="">Выберите услугу</option>
                      {services.map((service) => (
                        <option key={service.title} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Описание проблемы</Label>
                    <Textarea id="message" placeholder="Кратко опишите вашу ситуацию" rows={4} />
                  </div>
                  <Button type="submit" className="w-full">
                    Отправить заявку
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <Button size="lg" variant="outline" className="text-lg gap-2 bg-white text-primary border-white hover:bg-white/90">
              <Icon name="Phone" size={20} />
              +7 (495) 123-45-67
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">15+</div>
              <div className="text-muted-foreground">лет на рынке</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">выигранных дел</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">98%</div>
              <div className="text-muted-foreground">довольных клиентов</div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Наши услуги</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Полный спектр юридических услуг для физических и юридических лиц
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/20">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="lawyers" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Наши специалисты</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Команда опытных юристов с подтверждённой репутацией
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lawyers.map((lawyer, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{lawyer.name}</CardTitle>
                  <CardDescription className="text-base font-medium text-primary">
                    {lawyer.position}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Award" size={16} className="text-muted-foreground" />
                    <span>{lawyer.specialization}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span>Опыт: {lawyer.experience}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Контакты</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Адрес</div>
                    <div className="text-muted-foreground">г. Москва, ул. Тверская, д. 10, офис 501</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Телефон</div>
                    <div className="text-muted-foreground">+7 (495) 123-45-67</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <div className="text-muted-foreground">info@lexpro.ru</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Режим работы</div>
                    <div className="text-muted-foreground">Пн-Пт: 9:00 - 19:00</div>
                    <div className="text-muted-foreground">Сб: 10:00 - 16:00</div>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Обратная связь</CardTitle>
                <CardDescription>Напишите нам, и мы ответим в течение 24 часов</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Имя</Label>
                    <Input id="contact-name" placeholder="Ваше имя" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" type="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Сообщение</Label>
                    <Textarea id="contact-message" placeholder="Ваше сообщение" rows={5} />
                  </div>
                  <Button type="submit" className="w-full">
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Scale" size={28} className="text-accent" />
                <span className="text-xl font-bold">ЛексПро</span>
              </div>
              <p className="text-primary-foreground/80">
                Профессиональная юридическая помощь с 2010 года
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Навигация</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <a href="#services" className="hover:text-accent transition-colors">
                    Услуги
                  </a>
                </li>
                <li>
                  <a href="#lawyers" className="hover:text-accent transition-colors">
                    Специалисты
                  </a>
                </li>
                <li>
                  <a href="#contacts" className="hover:text-accent transition-colors">
                    Контакты
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>+7 (495) 123-45-67</li>
                <li>info@lexpro.ru</li>
                <li>г. Москва, ул. Тверская, 10</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            © 2024 ЛексПро. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
