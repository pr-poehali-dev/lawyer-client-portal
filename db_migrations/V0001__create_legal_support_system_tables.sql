-- Таблица жителей поселения
CREATE TABLE t_p27994121_lawyer_client_portal.residents (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    snils VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Таблица категорий юридических услуг
CREATE TABLE t_p27994121_lawyer_client_portal.service_categories (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица обращений жителей
CREATE TABLE t_p27994121_lawyer_client_portal.requests (
    id SERIAL PRIMARY KEY,
    resident_id INTEGER REFERENCES t_p27994121_lawyer_client_portal.residents(id),
    category_id INTEGER REFERENCES t_p27994121_lawyer_client_portal.service_categories(id),
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    priority VARCHAR(20) DEFAULT 'normal',
    assigned_to VARCHAR(255),
    response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP
);

-- Таблица корпоративных документов
CREATE TABLE t_p27994121_lawyer_client_portal.documents (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    file_url TEXT,
    file_size INTEGER,
    file_type VARCHAR(50),
    document_type VARCHAR(100),
    document_number VARCHAR(100),
    document_date DATE,
    is_public BOOLEAN DEFAULT TRUE,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица консультаций и ответов
CREATE TABLE t_p27994121_lawyer_client_portal.consultations (
    id SERIAL PRIMARY KEY,
    request_id INTEGER REFERENCES t_p27994121_lawyer_client_portal.requests(id),
    resident_id INTEGER REFERENCES t_p27994121_lawyer_client_portal.residents(id),
    consultant_name VARCHAR(255),
    question TEXT NOT NULL,
    answer TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    answered_at TIMESTAMP
);

-- Таблица файлов к обращениям
CREATE TABLE t_p27994121_lawyer_client_portal.request_files (
    id SERIAL PRIMARY KEY,
    request_id INTEGER REFERENCES t_p27994121_lawyer_client_portal.requests(id),
    file_name VARCHAR(500) NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    file_type VARCHAR(50),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица уведомлений для жителей
CREATE TABLE t_p27994121_lawyer_client_portal.notifications (
    id SERIAL PRIMARY KEY,
    resident_id INTEGER REFERENCES t_p27994121_lawyer_client_portal.residents(id),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица истории статусов обращений
CREATE TABLE t_p27994121_lawyer_client_portal.request_status_history (
    id SERIAL PRIMARY KEY,
    request_id INTEGER REFERENCES t_p27994121_lawyer_client_portal.requests(id),
    old_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    comment TEXT,
    changed_by VARCHAR(255),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для оптимизации запросов
CREATE INDEX idx_residents_email ON t_p27994121_lawyer_client_portal.residents(email);
CREATE INDEX idx_residents_snils ON t_p27994121_lawyer_client_portal.residents(snils);
CREATE INDEX idx_requests_status ON t_p27994121_lawyer_client_portal.requests(status);
CREATE INDEX idx_requests_resident ON t_p27994121_lawyer_client_portal.requests(resident_id);
CREATE INDEX idx_requests_created ON t_p27994121_lawyer_client_portal.requests(created_at DESC);
CREATE INDEX idx_documents_category ON t_p27994121_lawyer_client_portal.documents(category);
CREATE INDEX idx_documents_public ON t_p27994121_lawyer_client_portal.documents(is_public);
CREATE INDEX idx_notifications_resident ON t_p27994121_lawyer_client_portal.notifications(resident_id);
CREATE INDEX idx_notifications_unread ON t_p27994121_lawyer_client_portal.notifications(resident_id, is_read);

-- Заполнение начальными данными - категории услуг
INSERT INTO t_p27994121_lawyer_client_portal.service_categories (title, description, icon) VALUES
('Консультация по жилищным вопросам', 'Помощь в вопросах приватизации, регистрации прав собственности, коммунальных услуг', 'Home'),
('Земельные вопросы', 'Оформление земельных участков, межевание, разрешение споров о границах', 'MapPin'),
('Социальная поддержка', 'Консультации по получению льгот, пособий, пенсионных выплат', 'Users'),
('Имущественные споры', 'Помощь в решении споров по наследству, разделу имущества', 'FileText'),
('Предпринимательство', 'Регистрация ИП, налоговые консультации, лицензирование', 'Briefcase'),
('Судебное представительство', 'Подготовка документов, представительство интересов в суде', 'Scale');

-- Заполнение тестовыми документами
INSERT INTO t_p27994121_lawyer_client_portal.documents (category, title, description, document_type, file_type, file_size) VALUES
('Нормативные акты', 'Постановление №45 от 15.09.2024', 'О порядке предоставления земельных участков', 'Постановление', 'PDF', 184320),
('Образцы заявлений', 'Заявление на оформление земельного участка', 'Стандартный образец заявления для получения земли в собственность', 'Образец', 'PDF', 245760),
('Инструкции', 'Инструкция по получению льгот', 'Пошаговое руководство для оформления социальных льгот', 'Инструкция', 'PDF', 327680),
('Справочная информация', 'Контакты служб поселения', 'Телефоны и адреса всех административных служб', 'Справка', 'PDF', 102400);