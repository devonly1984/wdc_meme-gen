import {defineConfig} from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config({
    path: '.env.local'
})
export default defineConfig({
    schema: './drizzle/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DRIZZLE_DATABASE_URL!
    },
    verbose: true,
    strict:true
})