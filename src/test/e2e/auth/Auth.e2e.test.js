import puppeteer from 'puppeteer';
import { getRandomString } from '../../util/randomString';

describe('Auth', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000');
    });

    it('should allow to create a new user', async () => {
        const random = getRandomString();
        await page.waitForSelector('[data-testid="sign-up-button"]');
        await page.click('[data-testid="sign-up-button"]');

        await page.waitForSelector('[data-testid="submit-sign-up-button"]');
        await page.type('#username', random);
        await page.type('#password', random);
        await page.click('[data-testid="submit-sign-up-button"]');

        await page.waitForSelector('[data-testid="logout-button"]');
        const text = await page.$eval('[data-testid="logout-button"]', e => e.textContent);
        expect(text).toEqual('Logout');
        await page.click('[data-testid="logout-button"]');
    }, 20000);

    it('should allow to logout', async () => {
        const random = getRandomString();
        await page.waitForSelector('[data-testid="sign-up-button"]');
        await page.click('[data-testid="sign-up-button"]');

        await page.waitForSelector('[data-testid="submit-sign-up-button"]');
        await page.type('#username', random);
        await page.type('#password', random);
        await page.click('[data-testid="submit-sign-up-button"]');

        await page.waitForSelector('[data-testid="logout-button"]');
        await page.click('[data-testid="logout-button"]');

        await page.waitForSelector('[data-testid="login-button"]');
        const text = await page.$eval('[data-testid="login-button"]', e => e.textContent);
        expect(text).toEqual('Login');
    }, 20000);

    it('should allow to login', async () => {
        const random = getRandomString();
        await page.waitForSelector('[data-testid="sign-up-button"]');
        await page.click('[data-testid="sign-up-button"]');

        await page.waitForSelector('[data-testid="submit-sign-up-button"]');
        await page.type('#username', random);
        await page.type('#password', random);
        await page.click('[data-testid="submit-sign-up-button"]');

        await page.waitForSelector('[data-testid="logout-button"]');
        await page.click('[data-testid="logout-button"]');

        await page.waitForSelector('[data-testid="login-button"]');
        await page.click('[data-testid="login-button"]');

        await page.waitForSelector('[data-testid="submit-login-button"]');
        await page.type('#username', random);
        await page.type('#password', random);
        await page.click('[data-testid="submit-login-button"]');

        await page.waitForSelector('[data-testid="logout-button"]');
        const text = await page.$eval('[data-testid="logout-button"]', e => e.textContent);
        expect(text).toEqual('Logout');
    }, 20000);

    afterAll(() => browser.close());
});