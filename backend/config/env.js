import dotenv from 'dotenv';
dotenv.config();

const accessTimeout = 60 * 1;
const refreshTimeout = 60 * 60 * 24;
const cookieTimeout = 1 * 24 * 60 * 60 * 1000;
export const {
    ACCESS_TIMEOUT = accessTimeout,
    REFRESH_TIMEOUT = refreshTimeout,
    COOKIE_TIMEOUT = cookieTimeout,
    DATABASE_URI = process.env.DATABASE_URI,
    JWT_SECRET = process.env.JWT_SECRET,
    ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET,
    SESSION_NAME = process.env.SESSION_NAME,
    SESSION_SECRET = process.env.SESSION_SECRET,
    COOKIE_SECRET = process.env.COOKIE_SECRET,
    PORT = process.env.PORT,
} = process.env;

// require('crypto').randomBytes(64).toString('hex')
