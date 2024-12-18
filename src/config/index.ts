import dotenv from "dotenv";
import Joi from "joi";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envValidation = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("development", "production", "local")
      .required(),
    PORT: Joi.number().default(3000),
    BASE_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description("days after which refresh tokens expire"),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which reset password token expires"),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which verify email token expires"),
    LOG_FOLDER: Joi.string().required(),
    LOG_FILE: Joi.string().required(),
    LOG_LEVEL: Joi.string().required(),
    REDIS_HOST: Joi.string().default("127.0.0.1"),
    REDIS_PORT: Joi.number().default(6379),
    REDIS_USE_PASSWORD: Joi.string().default("no"),
    REDIS_PASSWORD: Joi.string(),
    SMTP_USERNAME: Joi.string(),
    SMTP_PASSWORD: Joi.string(),
  })
  .unknown();

const { value: envVar, error } = envValidation
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  nodeEnv: envVar.NODE_ENV,
  appIdentifier: envVar.APP_IDENTIFIER,
  port: envVar.PORT,
  baseUrl: envVar.BASE_URL,
  jwt: {
    secret: envVar.JWT_SECRET,
    accessExpirationMinutes: envVar.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVar.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVar.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVar.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  logConfig: {
    logFolder: envVar.LOG_FOLDER,
    logFile: envVar.LOG_FILE,
    logLevel: envVar.LOG_LEVEL,
  },
  redis: {
    host: envVar.REDIS_HOST,
    port: envVar.REDIS_PORT,
    usePassword: envVar.REDIS_USE_PASSWORD,
    password: envVar.REDIS_PASSWORD,
  },
  SMTP: {
    username: envVar.SMTP_USERNAME,
    password: envVar.SMTP_PASSWORD,
  },
};

export default config;
