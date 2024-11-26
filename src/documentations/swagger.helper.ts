import { OpenAPIObject } from '@nestjs/swagger';

const pathMethods = ['get', 'post', 'put', 'delete', 'patch'];

// Общие ответы
const generalResponses = {
  400: { description: 'Неверный запрос: Проверьте корректность данных.' },
  422: { description: 'Ошибка валидации: Некорректная структура данных.' },
  500: { description: 'Ошибка сервера: Попробуйте позже.' },
};

// Ответы для аутентификации
const authResponses = {
  401: { description: 'Не авторизован: Требуется токен доступа.' },
  403: {
    description:
      'Доступ запрещён: У вас нет прав для выполнения этого действия.',
  },
};

// Ответы для каждого эндпоинта
const endpointResponses = {
  // Пользователи
  '/users': {
    get: { 200: { description: 'Список пользователей успешно получен.' } },
    post: { 201: { description: 'Пользователь успешно создан.' } },
  },
  '/users/{id}': {
    get: {
      200: { description: 'Пользователь успешно найден.' },
      404: { description: 'Пользователь не найден.' },
    },
    patch: { 200: { description: 'Данные пользователя успешно обновлены.' } },
    delete: {
      204: { description: 'Пользователь успешно удалён.' },
      404: { description: 'Пользователь не найден.' },
    },
  },
  '/users/upgrade-account': {
    post: { 200: { description: 'Аккаунт пользователя успешно обновлён.' } },
  },

  // Роли
  '/roles': {
    get: { 200: { description: 'Список ролей успешно получен.' } },
    post: { 201: { description: 'Роль успешно создана.' } },
  },
  '/roles/{id}': {
    get: {
      200: { description: 'Роль успешно найдена.' },
      404: { description: 'Роль не найдена.' },
    },
    patch: { 200: { description: 'Роль успешно обновлена.' } },
    delete: {
      204: { description: 'Роль успешно удалена.' },
      404: { description: 'Роль не найдена.' },
    },
  },

  // Разрешения
  '/permissions': {
    get: { 200: { description: 'Список разрешений успешно получен.' } },
    post: { 201: { description: 'Разрешение успешно создано.' } },
  },
  '/permissions/{id}': {
    get: {
      200: { description: 'Разрешение успешно найдено.' },
      404: { description: 'Разрешение не найдено.' },
    },
    patch: { 200: { description: 'Разрешение успешно обновлено.' } },
    delete: {
      204: { description: 'Разрешение успешно удалено.' },
      404: { description: 'Разрешение не найдено.' },
    },
  },
  '/permissions/assign-to-role': {
    post: { 200: { description: 'Разрешение успешно назначено роли.' } },
  },

  // Объявления
  '/listings': {
    get: { 200: { description: 'Список объявлений успешно получен.' } },
    post: { 201: { description: 'Объявление успешно создано.' } },
  },
  '/listings/{id}': {
    get: {
      200: { description: 'Объявление успешно найдено.' },
      404: { description: 'Объявление не найдено.' },
    },
    patch: { 200: { description: 'Объявление успешно обновлено.' } },
    delete: {
      204: { description: 'Объявление успешно удалено.' },
      404: { description: 'Объявление не найдено.' },
    },
  },
  '/listings/{id}/mark-for-review': {
    post: { 200: { description: 'Объявление отправлено на проверку.' } },
  },

  // Бренды автомобилей
  '/car-brands': {
    get: { 200: { description: 'Список брендов успешно получен.' } },
    post: { 201: { description: 'Бренд успешно создан.' } },
  },
  '/car-brands/{id}': {
    get: {
      200: { description: 'Бренд успешно найден.' },
      404: { description: 'Бренд не найден.' },
    },
    patch: { 200: { description: 'Бренд успешно обновлён.' } },
    delete: {
      204: { description: 'Бренд успешно удалён.' },
      404: { description: 'Бренд не найден.' },
    },
  },

  // Модели автомобилей
  '/car-models': {
    get: { 200: { description: 'Список моделей успешно получен.' } },
    post: { 201: { description: 'Модель успешно создана.' } },
  },
  '/car-models/{id}': {
    get: {
      200: { description: 'Модель успешно найдена.' },
      404: { description: 'Модель не найдена.' },
    },
    patch: { 200: { description: 'Модель успешно обновлена.' } },
    delete: {
      204: { description: 'Модель успешно удалена.' },
      404: { description: 'Модель не найдена.' },
    },
  },

  // Авторизация
  '/auth/register': {
    post: { 201: { description: 'Пользователь успешно зарегистрирован.' } },
  },
  '/auth/login': { post: { 200: { description: 'Успешный вход в систему.' } } },
  '/auth/refresh-token': {
    post: { 200: { description: 'Токен успешно обновлён.' } },
  },
  '/auth/logout': {
    post: { 200: { description: 'Успешный выход из системы.' } },
  },
  '/auth/me': {
    get: {
      200: { description: 'Информация о пользователе успешно получена.' },
    },
  },

  // Прочие
  '/health': { get: { 200: { description: 'Приложение работает.' } } },
};

export class SwaggerHelper {
  /**
   * Устанавливает корректные ответы для каждого эндпоинта.
   * @param document - OpenAPIObject
   */
  static setDefaultResponses(document: OpenAPIObject): void {
    for (const path of Object.keys(document.paths)) {
      for (const method of pathMethods) {
        const route = document.paths[path]?.[method];
        if (route) {
          // Общие ответы
          Object.assign(route.responses, generalResponses);

          // Добавление специфичных ответов
          const responses = endpointResponses[path]?.[method];
          if (responses) {
            Object.assign(route.responses, responses);
          }

          // Добавляем ответы для защищённых маршрутов
          if (route.security) {
            Object.assign(route.responses, authResponses);
          }
        }
      }
    }
  }
}
