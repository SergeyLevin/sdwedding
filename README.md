# Wedding Invitation - Дарья и Сергей

Премиальный сайт-приглашение на свадьбу.

## Настройка RSVP (Google Sheets + Apps Script)

Сайт работает как статическое приложение (GitHub Pages) и отправляет данные напрямую в Google Таблицы через Google Apps Script.

### 1. Подготовка Google Таблицы
1. Создайте новую Google Таблицу.
2. Переименуйте первый лист в `RSVP`.
3. В первой строке (заголовки) добавьте следующие столбцы:
   `submitted_at`, `attending`, `is_multiple`, `guest_first_name`, `guest_last_name`, `guests_total`, `guests_list`, `drink_wine_red`, `drink_wine_white`, `drink_whiskey`, `drink_cognac`, `drink_vodka`, `drink_soft`, `comment`, `source`, `user_agent`, `ip`

### 2. Настройка Google Apps Script
1. В таблице выберите **Расширения** -> **Apps Script**.
2. Удалите весь код в редакторе и вставьте код из раздела ниже.
3. Нажмите **Развернуть** (Deploy) -> **Новое развертывание** (New deployment).
4. Выберите тип: **Веб-приложение** (Web app).
5. Описание: `RSVP Backend`.
6. Запуск от имени: **Вас** (Me).
7. У кого есть доступ: **Все** (Anyone).
8. Нажмите **Развернуть**. Скопируйте полученный **URL веб-приложения**.
9. При первом развертывании Google попросит предоставить разрешения на доступ к Таблицам и отправку почты. Нажмите "Предоставить доступ" и подтвердите выбор.

### 3. Настройка фронтенда
1. В файле `.env` (или в настройках GitHub Secrets) установите переменную:
   `VITE_RSVP_ENDPOINT="ВАШ_URL_APPS_SCRIPT"`
2. Пересоберите проект: `npm run build`.

## Разработка

- `npm run dev`: Запуск Vite.
- `src/config/wedding.ts`: Основной файл с данными свадьбы.
- `src/index.css`: Глобальные стили (Tailwind v4).
