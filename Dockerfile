# FROM node:18

# WORKDIR /usr/src/app

# # Копируем package.json и package-lock.json для установки зависимостей
# COPY package*.json ./

# # Устанавливаем зависимости
# RUN npm install

# # Копируем все остальные файлы проекта
# COPY . .

# # Сборка проекта
# RUN npm run build

# # Устанавливаем переменную окружения
# ENV NODE_ENV=production

# # Открываем порт 3000
# EXPOSE 3000

# # Команда для запуска проекта в продакшн-режиме
# CMD ["npm", "run", "start:prod"]

FROM node:18

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
