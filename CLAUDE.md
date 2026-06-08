# CLAUDE.md — Online Courses Catalog

## Контекст проекта

Тестовое задание: карточный каталог онлайн-курсов с поиском и фильтрацией.
Макет: [Figma](https://www.figma.com/design/iuXLXifXgv4ZCzad0KeYKr/Test-Task?node-id=0-1)

## Стек

- **HTML** — семантическая разметка по БЭМ
- **SCSS** — стили по БЭМ, компилируется через Vite + sass
- **JavaScript (vanilla)** — ES-модули, без фреймворков и библиотек
- **Vite** — сборщик, dev-сервер с HMR
- **pnpm** — пакетный менеджер

## Структура проекта

```
project/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── scss/
│   │   ├── main.scss          # точка входа, импортируется в main.js
│   │   ├── _variables.scss    # цвета, отступы, типографика
│   │   ├── _reset.scss        # сброс стилей
│   │   ├── _typography.scss   # шрифты и текстовые стили
│   │   └── blocks/
│   │       ├── _filters.scss
│   │       ├── _search.scss
│   │       ├── _catalog.scss
│   │       └── _card.scss
│   └── js/
│       ├── main.js            # точка входа, импортирует SCSS и модули
│       ├── data.js            # данные карточек
│       ├── filter.js          # логика фильтрации по категориям
│       ├── search.js          # логика живого поиска
│       └── render.js          # рендер карточек в DOM
├── public/                    # статика — Vite копирует в dist/ as-is
│   └── assets/
│       ├── decorative/        # SVG-паттерны (dots, rings, arrows) — фон body
│       └── images/
│           └── courses/       # фото карточек (13 штук, в репозитории)
└── dist/                      # продакшн-сборка Vite (git-ignore)
```

## Соглашения по коду

### БЭМ-именование

```
.block {}
.block__element {}
.block--modifier {}
.block__element--modifier {}
```

Примеры:
```
.card {}
.card__image {}
.card__badge {}
.card__badge--marketing {}
.card__badge--design {}
.card__title {}
.card__price {}
.card__author {}

.filters {}
.filters__item {}
.filters__item--active {}

.search {}
.search__input {}
.search__icon {}
```

### JavaScript

- Модульная структура: один файл — одна ответственность
- Без `var`, только `const` / `let`
- Данные карточек вынесены в `data.js` — массив объектов
- Фильтрация и поиск работают над одним и тем же массивом данных (стейт)
- Рендер — чистая функция: принимает массив карточек, возвращает DOM-узлы или HTML-строку

### SCSS

- Переменные для всех цветов и отступов в `_variables.scss`
- Вложенность не глубже 3 уровней
- Медиазапросов по возможности избегать — использовать `clamp()`, `fluid` единицы (`vw`, `%`, `fr`) для резинового адаптива

## Ключевые требования

### Адаптив (резиновый, без жёстких брейкпоинтов)

- Сетка карточек: `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`
- Шрифты: `clamp(min, preferred, max)`
- Отступы: относительные единицы / `clamp()`
- Диапазон: 320px → 1920px без поломок

### Живой поиск

- Событие `input` на поле поиска (не `submit`)
- Фильтрует по `title` карточки, регистронезависимо
- Комбинируется с активным фильтром категории

### Фильтрация по категориям

- Кнопки: All / Marketing / Management / HR & Recruiting / Design / Development
- Active-состояние через CSS-класс `filters__item--active`
- Счётчики курсов на кнопках

### Pixel-perfect детали

- Декоративные SVG (dots, rings, arrows) — `background-image` на `body` в `_reset.scss`, три слоя с фиксированными координатами
- Фото карточек: `object-fit: cover`, заполняют весь превью-блок целиком
- Бейджи категорий — цветные по категории
- Цены — красный акцент
- Кнопка «Load more» с иконкой; пагинация по 9 карточек (`PAGE_SIZE` в `main.js`)

## Запуск

```bash
pnpm install      # установить зависимости
pnpm dev          # dev-сервер с hot-reload → localhost:5173
pnpm build        # продакшн-сборка → dist/
pnpm preview      # превью продакшн-сборки
```

## Деплой

- **Vercel**: `vercel --prod` или через GitHub-интеграцию
- **Netlify**: drag & drop папки или через GitHub

## Что можно улучшить (если не успею)

- [ ] Анимация появления карточек при фильтрации
- [ ] Skeleton-лоадер при первом рендере
- [ ] Debounce на поиск
- [ ] Сохранение состояния фильтра в URL (`?category=design&q=...`)
- [ ] Accessibility: aria-live для результатов поиска