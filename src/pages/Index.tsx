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
    title: 'Консультация по жилищным вопросам',
    description: 'Помощь в вопросах приватизации, регистрации прав собственности, коммунальных услуг',
    icon: 'Home',
  },
  {
    title: 'Земельные вопросы',
    description: 'Оформление земельных участков, межевание, разрешение споров о границах',
    icon: 'MapPin',
  },
  {
    title: 'Социальная поддержка',
    description: 'Консультации по получению льгот, пособий, пенсионных выплат',
    icon: 'Users',
  },
  {
    title: 'Имущественные споры',
    description: 'Помощь в решении споров по наследству, разделу имущества',
    icon: 'FileText',
  },
  {
    title: 'Предпринимательство',
    description: 'Регистрация ИП, налоговые консультации, лицензирование',
    icon: 'Briefcase',
  },
  {
    title: 'Судебное представительство',
    description: 'Подготовка документов, представительство интересов в суде',
    icon: 'Scale',
  },
];

const documents = [
  {
    category: 'Нормативные акты',
    count: 45,
    icon: 'FileCheck',
    description: 'Постановления, распоряжения администрации',
  },
  {
    category: 'Образцы заявлений',
    count: 28,
    icon: 'FileEdit',
    description: 'Готовые шаблоны для обращений',
  },
  {
    category: 'Инструкции',
    count: 15,
    icon: 'BookOpen',
    description: 'Пошаговые руководства',
  },
  {
    category: 'Справочная информация',
    count: 32,
    icon: 'Info',
    description: 'Контакты служб, режим работы',
  },
];

export default function Index() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { toast } = useToast();

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: authMode === 'login' ? 'Вход выполнен' : 'Регистрация завершена',
      description: 'Добро пожаловать в личный кабинет',
    });
    setIsAuthOpen(false);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Обращение принято',
      description: 'Мы рассмотрим ваш вопрос в течение 3 рабочих дней',
    });
    setIsRequestOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-2 border-secondary bg-white sticky top-0 z-50 shadow-sm">
        <div className="bg-primary text-primary-foreground py-2">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <span>📞 +7 (86162) 3-45-67</span>
              <span>✉️ adm-beisugskoye@mail.ru</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={14} />
              <span>Пн-Пт: 8:00 - 17:00</span>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
              <Icon name="Building" size={24} className="text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-primary">Администрация</div>
              <div className="text-sm text-muted-foreground">Бейсугского сельского поселения</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="text-foreground hover:text-primary transition-colors font-medium">
              Услуги
            </a>
            <a href="#documents" className="text-foreground hover:text-primary transition-colors font-medium">
              Документы
            </a>
            <a href="#contacts" className="text-foreground hover:text-primary transition-colors font-medium">
              Контакты
            </a>
          </nav>
          <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Icon name="User" size={18} />
                Личный кабинет
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {authMode === 'login' ? 'Вход в личный кабинет' : 'Регистрация жителя'}
                </DialogTitle>
                <DialogDescription>
                  {authMode === 'login'
                    ? 'Войдите для доступа к личным документам и обращениям'
                    : 'Зарегистрируйтесь для получения юридической поддержки'}
                </DialogDescription>
              </DialogHeader>
              <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as 'login' | 'register')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Вход</TabsTrigger>
                  <TabsTrigger value="register">Регистрация</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <form onSubmit={handleAuthSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email или СНИЛС</Label>
                      <Input id="login-email" placeholder="ivanov@mail.ru или 123-456-789 00" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Пароль</Label>
                      <Input id="login-password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                      Войти
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="register">
                  <form onSubmit={handleAuthSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-name">ФИО</Label>
                      <Input id="reg-name" placeholder="Иванов Иван Иванович" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-snils">СНИЛС</Label>
                      <Input id="reg-snils" placeholder="123-456-789 00" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <Input id="reg-email" type="email" placeholder="ivanov@mail.ru" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Пароль</Label>
                      <Input id="reg-password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                      Зарегистрироваться
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-br from-primary via-primary to-accent">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/d248eb09-dd7f-4cb2-bac6-19e2d80bfc94/files/c359a1a8-cb5e-481b-9e7c-49afce123e8c.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Цифровая юридическая поддержка жителей
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Бейсугского сельского поселения
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog open={isRequestOpen} onOpenChange={setIsRequestOpen}>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="text-lg gap-2">
                  <Icon name="FileText" size={20} />
                  Подать обращение онлайн
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Онлайн обращение</DialogTitle>
                  <DialogDescription>
                    Опишите ваш вопрос, и мы предоставим юридическую консультацию
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="req-name">ФИО</Label>
                    <Input id="req-name" placeholder="Иванов Иван Иванович" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="req-phone">Телефон</Label>
                      <Input id="req-phone" type="tel" placeholder="+7 (999) 123-45-67" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="req-email">Email</Label>
                      <Input id="req-email" type="email" placeholder="mail@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="req-category">Категория вопроса</Label>
                    <select
                      id="req-category"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      required
                    >
                      <option value="">Выберите категорию</option>
                      {services.map((service) => (
                        <option key={service.title} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="req-message">Описание вопроса</Label>
                    <Textarea
                      id="req-message"
                      placeholder="Подробно опишите вашу ситуацию"
                      rows={5}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="req-files">Приложить документы (опционально)</Label>
                    <Input id="req-files" type="file" multiple accept=".pdf,.doc,.docx,.jpg,.png" />
                  </div>
                  <Button type="submit" className="w-full">
                    Отправить обращение
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <Button size="lg" variant="outline" className="text-lg gap-2 bg-white text-primary hover:bg-white/90">
              <Icon name="Phone" size={20} />
              Позвонить: +7 (86162) 3-45-67
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y-2 border-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">350+</div>
              <div className="text-muted-foreground text-sm">обращений рассмотрено</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">24ч</div>
              <div className="text-muted-foreground text-sm">срок ответа онлайн</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-muted-foreground text-sm">бесплатно для жителей</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">6</div>
              <div className="text-muted-foreground text-sm">категорий услуг</div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-3">Юридические услуги для жителей</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Бесплатная консультационная поддержка по всем правовым вопросам
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-primary hover:border-l-accent"
              >
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <Icon name={service.icon} size={28} className="text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="documents" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-3">База корпоративных документов</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Электронное хранилище нормативных актов и образцов документов
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {documents.map((doc, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer bg-white hover:bg-accent/5"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                    <Icon name={doc.icon} size={24} className="text-accent" />
                  </div>
                  <CardTitle className="text-lg">{doc.category}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-primary">{doc.count}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{doc.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-2 border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2">
                <Icon name="Search" size={24} className="text-primary" />
                Поиск документов
              </CardTitle>
              <CardDescription>Найдите нужный документ или образец заявления</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Input placeholder="Введите название документа или ключевые слова..." className="flex-1" />
                <Button className="gap-2">
                  <Icon name="Search" size={18} />
                  Найти
                </Button>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex items-start gap-3">
                    <Icon name="FileText" size={20} className="text-primary mt-1" />
                    <div>
                      <div className="font-medium mb-1">Заявление на оформление земли</div>
                      <div className="text-sm text-muted-foreground">PDF • 245 КБ</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex items-start gap-3">
                    <Icon name="FileText" size={20} className="text-primary mt-1" />
                    <div>
                      <div className="font-medium mb-1">Постановление №45 от 15.09.2024</div>
                      <div className="text-sm text-muted-foreground">PDF • 180 КБ</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex items-start gap-3">
                    <Icon name="FileText" size={20} className="text-primary mt-1" />
                    <div>
                      <div className="font-medium mb-1">Инструкция по получению льгот</div>
                      <div className="text-sm text-muted-foreground">PDF • 320 КБ</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Личный кабинет жителя</h2>
              <p className="text-xl opacity-90 mb-6">
                Зарегистрируйтесь для доступа ко всем функциям системы
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="text-secondary flex-shrink-0 mt-1" />
                  <span>Отслеживание статуса обращений в реальном времени</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="text-secondary flex-shrink-0 mt-1" />
                  <span>Хранение истории консультаций и документов</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="text-secondary flex-shrink-0 mt-1" />
                  <span>Электронная запись на личный прием</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="text-secondary flex-shrink-0 mt-1" />
                  <span>Получение уведомлений о новых документах</span>
                </li>
              </ul>
            </div>
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-primary">Быстрая регистрация</CardTitle>
                <CardDescription>Получите доступ к личному кабинету за 2 минуты</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input placeholder="ФИО" />
                  <Input placeholder="СНИЛС" />
                  <Input type="email" placeholder="Email" />
                  <Input type="tel" placeholder="Телефон" />
                  <Button className="w-full" type="submit">
                    Зарегистрироваться
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Контактная информация</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Адрес администрации</div>
                    <div className="text-muted-foreground">
                      Краснодарский край, Выселковский район, ст. Бейсугская, ул. Ленина, 43
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Телефон приемной</div>
                    <div className="text-muted-foreground">+7 (86162) 3-45-67</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Электронная почта</div>
                    <div className="text-muted-foreground">adm-beisugskoye@mail.ru</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">График приема граждан</div>
                    <div className="text-muted-foreground">Понедельник, среда: 9:00 - 12:00, 14:00 - 17:00</div>
                    <div className="text-muted-foreground">Пятница: 9:00 - 12:00</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-2 border-primary/20">
              <CardHeader className="bg-primary/5">
                <CardTitle>Задать вопрос администрации</CardTitle>
                <CardDescription>Мы ответим на ваше письмо в течение 3 рабочих дней</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">ФИО</Label>
                    <Input id="contact-name" placeholder="Иванов Иван Иванович" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" type="email" placeholder="ivanov@mail.ru" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-subject">Тема</Label>
                    <Input id="contact-subject" placeholder="Тема обращения" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Сообщение</Label>
                    <Textarea id="contact-message" placeholder="Текст обращения" rows={5} />
                  </div>
                  <Button type="submit" className="w-full">
                    Отправить обращение
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
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="Building" size={20} className="text-white" />
                </div>
                <span className="text-lg font-bold">Администрация БСП</span>
              </div>
              <p className="text-primary-foreground/80 text-sm">
                Официальный портал цифровой юридической поддержки Бейсугского сельского поселения
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Навигация</h3>
              <ul className="space-y-2 text-primary-foreground/80 text-sm">
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Услуги
                  </a>
                </li>
                <li>
                  <a href="#documents" className="hover:text-white transition-colors">
                    База документов
                  </a>
                </li>
                <li>
                  <a href="#contacts" className="hover:text-white transition-colors">
                    Контакты
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-primary-foreground/80 text-sm">
                <li>📞 +7 (86162) 3-45-67</li>
                <li>✉️ adm-beisugskoye@mail.ru</li>
                <li>📍 ст. Бейсугская, ул. Ленина, 43</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-primary-foreground/60 text-sm">
            © 2024 Администрация Бейсугского сельского поселения. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
