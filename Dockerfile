# Базовый образ Node.js
FROM node:18

# Устанавливаем рабочую директорию в контейнере
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем проект
RUN npm run build

# Устанавливаем переменную среды для production режима
ENV NODE_ENV=production

# Открываем порт для приложения
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "start:prod"]
