import dotenv from 'dotenv';
const env = dotenv.config();

export default {
    cron: env.parsed!.PROPERTY_SCRAPER_JOB,
    async job() {
        console.log('Cron Job:', env.parsed!.PROPERTY_SCRAPER_JOB);
    },
};