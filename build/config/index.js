"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const joi_1 = __importDefault(require("joi"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env") });
const envValidation = joi_1.default.object()
    .keys({
    NODE_ENV: joi_1.default.string()
        .valid("development", "production", "local")
        .required(),
    PORT: joi_1.default.number().default(3000),
    BASE_URL: joi_1.default.string().required(),
    DB_HOST: joi_1.default.string().default("localhost"),
    DB_PORT: joi_1.default.string().default("5432"),
    DB_USER: joi_1.default.string().required(),
    DB_PASS: joi_1.default.string().required(),
    DB_NAME: joi_1.default.string().required(),
    JWT_SECRET: joi_1.default.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: joi_1.default.number()
        .default(30)
        .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: joi_1.default.number()
        .default(30)
        .description("days after which refresh tokens expire"),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: joi_1.default.number()
        .default(10)
        .description("minutes after which reset password token expires"),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: joi_1.default.number()
        .default(10)
        .description("minutes after which verify email token expires"),
    LOG_FOLDER: joi_1.default.string().required(),
    LOG_FILE: joi_1.default.string().required(),
    LOG_LEVEL: joi_1.default.string().required(),
    REDIS_HOST: joi_1.default.string().default("127.0.0.1"),
    REDIS_PORT: joi_1.default.number().default(6379),
    REDIS_USE_PASSWORD: joi_1.default.string().default("no"),
    REDIS_PASSWORD: joi_1.default.string(),
    SMTP_USERNAME: joi_1.default.string(),
    SMTP_PASSWORD: joi_1.default.string(),
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
    dbHost: envVar.DB_HOST,
    dbPort: envVar.DB_PORT,
    dbUser: envVar.DB_USER,
    dbPass: envVar.DB_PASS,
    dbName: envVar.DB_NAME,
    jwt: {
        secret: envVar.JWT_SECRET,
        accessExpirationMinutes: envVar.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVar.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVar.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
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
exports.default = config;
//# sourceMappingURL=index.js.map