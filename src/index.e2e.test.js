import devServer from 'jest-dev-server';

import { createBrowser } from '~tests-utils';

describe('E2E > Engage', () => {
  jest.setTimeout(30000);
  let server, browser;

  beforeAll(async () => {
    process.env.TEST_PORT = 63003;
    server = await devServer.setup({
      command: 'yarn example:basic',
      host: 'localhost',
      port: 63003,
      launchTimeout: 10000,
    });

    browser = await createBrowser();
  });

  describe('Element', () => {
    let page;

    beforeAll(async () => {
      page = await browser.newPage();
      await page.goto('http://localhost:63003', {
        referer: 'http://localhost:63003',
      });
    });

    it('should display an element', async () => {
      await page.waitForSelector('iframe.p3-outlet');
      const src = await page.evaluate(() =>
        document.querySelector('iframe.p3-outlet').src);

      expect(src).toMatch(/https:\/\/[^/]+\/engage\/[^/]+\/[^/]/g);
    });

    afterAll(async () => {
      await page.close();
    });
  });

  describe('Elements', () => {
    let page;

    beforeAll(async () => {
      page = await browser.newPage();
      await page.goto('http://localhost:63003', {
        referer: 'http://localhost:63003',
      });
    });

    it('should display elements', async () => {
      const button = await page.waitForSelector('#SwitchMode');
      await button.evaluate(btn => btn.click());

      await page.waitForSelector('iframe.p3-outlet');
      const handles = await page.$$('iframe.p3-outlet');
      const srcs = await Promise.all(handles.map(async handle =>
        handle.evaluate(iframe => iframe.src)));
      srcs.forEach(src =>
        expect(src).toMatch(/https:\/\/[^/]+\/engage\/[^/]+\/[^/]/g));
    });

    afterAll(async () => {
      await page.close();
    });
  });

  afterAll(async () => {
    await devServer.teardown(server);
    await browser.close();
  });
});
