import express from 'express';
import puppeteer from 'puppeteer';
import scraperJob from './jobs/scraperJob';
import schedule from 'node-schedule';

const {scheduleJob} = require('./lib/scheduleJob');

const options = {
    width: 1663,
    height: 998,
};

(async () => {
    const app = express();
    const port = 8080;
    try {
        const browser = await puppeteer.launch({
        headless: true, //
        ignoreHTTPSErrors: true,
        args: [
            '--start-maximized',
        ],
    });
    scheduleJob(
        'scraperJob',
        scraperJob.cron,
        scraperJob.job,
        );

    // const page = await browser.newPage();
    // await page.setViewport({ width: options.width, height: options.height });
    // await page.goto('https://www.utahrealestate.com/index/public.index');

    app.listen(port, () => console.log(`Server locked on ${port} 🚀`));

    } catch(err) {
        console.error('Error:', err)
    }
})();
