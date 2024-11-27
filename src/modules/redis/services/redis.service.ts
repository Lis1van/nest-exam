import { Inject, Injectable } from '@nestjs/common'; // Импорт необходимых декораторов и классов из NestJS
import { Redis } from 'ioredis'; // Импорт класса Redis из ioredis для работы с Redis

import { REDIS_CLIENT } from '../models/redis.constants'; // Импорт константы REDIS_CLIENT

@Injectable() // Декоратор, который делает класс доступным для внедрения зависимостей
export class RedisService {
  constructor(
    @Inject(REDIS_CLIENT) // Внедрение зависимости REDIS_CLIENT
    private readonly redisClient: Redis, // Инициализация клиента Redis
  ) {}

  /**
   * Добавляет элемент в множество.
   * @param hash - имя множества (ключ)
   * @param value - значение, которое нужно добавить
   * @returns Promise<number> - количество элементов в множестве после добавления
   */
  public async addOneToSet(hash: string, value: string): Promise<number> {
    return await this.redisClient.sadd(hash, value); // Использует метод sadd для добавления элемента в множество
  }

  /**
   * Удаляет один элемент из множества.
   * @param key - имя множества (ключ)
   * @param setMember - значение, которое нужно удалить
   * @returns Promise<number> - количество элементов, которые были удалены
   */
  public async remOneFromSet(key: string, setMember: string): Promise<number> {
    return await this.redisClient.srem(key, setMember); // Использует метод srem для удаления элемента из множества
  }

  /**
   * Удаляет все записи по ключу из Redis.
   * @param key - ключ для удаления
   * @returns Promise<number> - количество удаленных записей
   */
  public async deleteByKey(key: string): Promise<number> {
    return await this.redisClient.del(key); // Использует метод del для удаления ключа из Redis
  }

  /**
   * Получает все элементы из множества.
   * @param key - имя множества (ключ)
   * @returns Promise<string[]> - массив строк, содержащий все элементы множества
   */
  public async sMembers(key: string): Promise<string[]> {
    return await this.redisClient.smembers(key); // Использует метод smembers для получения всех элементов из множества
  }

  /**
   * Устанавливает таймаут на ключ.
   * После истечения времени ключ будет автоматически удален.
   * @param key - ключ, на который устанавливается таймаут
   * @param time - время в секундах до истечения
   * @returns Promise<number> - число 1, если таймаут установлен, иначе 0
   */
  public async expire(key: string, time: number): Promise<number> {
    return await this.redisClient.expire(key, time); // Использует метод expire для установки таймаута на ключ
  }
}
