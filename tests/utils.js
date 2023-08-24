import puppeteer from 'puppeteer';

import { EngageContext } from '../src/contexts';

export const withEngage = (component, engage = {}) => (
  <EngageContext.Provider value={{ ...engage }}>
    { component }
  </EngageContext.Provider>
);

export const createBrowser = () =>
  puppeteer.launch({
    headless: process.env.HEADFULL ? false : 'new',
    pipe: true,
    args: [
      '--enable-logging',
      '--lang=en',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--single-process',
    ],
  });
