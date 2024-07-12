import type { Poool } from 'poool-engage';
import type { ReactNode } from 'react';
import puppeteer, { type PuppeteerLaunchOptions } from 'puppeteer';

import { type EngageContextValue, EngageContext } from '../src/contexts';

export const withEngage = (
  children: ReactNode,
  engage: Partial<Omit<EngageContextValue, 'lib' | 'factory'>> & {
    lib?: Partial<Poool.Engage>;
    factory?: Partial<Poool.Engage>;
  } = {}
) => (
  <EngageContext.Provider value={{ ...engage } as EngageContextValue}>
    { children }
  </EngageContext.Provider>
);

export const createBrowser = (opts?: PuppeteerLaunchOptions) =>
  puppeteer.launch({
    headless: !process.env.HEADFULL,
    pipe: true,
    ...opts,
    args: [
      '--enable-logging',
      '--lang=en',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--single-process',
      ...opts?.args || [],
    ],
  });
