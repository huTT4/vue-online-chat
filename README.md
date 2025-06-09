# 💬 Vue Online Chat

[![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3.0+-3ECF8E?logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Онлайн-чат с авторизацией и realtime-обновлениями на Vue 3 и Supabase.

| Светлая тема                                              | Темная тема                                             |
| --------------------------------------------------------- | ------------------------------------------------------- |
| ![Главный экран светлая тема](screenshots/main-light.png) | ![Главный экран темная тема](screenshots/main-dark.png) |

## 🌟 Особенности

### 💌 Чат функционал

- Обновления чата в реальном времени через Supabase Realtime
- Полная история сообщений
- Отображение информации об отправителе

### 🔐 Безопасность

- Регистрация и вход через Supabase Auth
- Защищенные маршруты (Vue Router Navigation Guards)
- Row-Level Security (RLS) политики

### 🎨 Интерфейс

- Темная/светлая тема
- Удобное форматирование дат

## 🛠 Технологический стек

### Frontend

- ⚡️ [Vue 3](https://vuejs.org/) - Компонентный фреймворк
- 🏗️ [Vite](https://vitejs.dev/) - Сборка проекта
- 🎨 [Pinia](https://pinia.vuejs.org/) - Управление состоянием
- 🛣️ [Vue Router](https://router.vuejs.org/) - Навигация

### Backend/Services

- 🔄 [Supabase](https://supabase.com/) - Бэкенд (Auth, Realtime, Database)
- 📅 [Day.js](https://day.js.org/) - Форматирование дат

## 🚀 Быстрый старт

```bash
git clone https://github.com/huTT4/vue-kanban.git

cd vue-online-chat

npm install

npm run dev
```
