export type ConfigType = {
  app: AppConfig;
  postgres: PostgresConfig;
  redis: RedisConfig;
  aws: AwsConfig;
  jwt: JwtConfig;
  exchangeRate: ExchangeRate;
  mailer: Mailer;
};

export type AppConfig = {
  port: number;
  host: string;
};

export type PostgresConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export type RedisConfig = {
  host: string;
  port: number;
  password: string;
};

export type AwsConfig = {
  accessKey: string;
  secretKey: string;
};

export type JwtConfig = {
  accessSecret: string;
  accessExpiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
};

export type ExchangeRate = {
  apiUrl: string;
  apiKey: string;
};

export type Mailer = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
};
