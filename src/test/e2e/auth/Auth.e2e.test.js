import puppeteer from 'puppeteer';

const getRandomString = () => (Math.random() + 1).toString(36).substring(7);

describe('Auth', () => {
    let browser;
    let page;
    const random = getRandomString();

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    it('should allow to create a new user', async () => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('[data-testid="sign-up-button"]');
        await page.click('[data-testid="sign-up-button"]');

        await page.waitForSelector('[data-testid="submit-sign-up-button"]');
        await page.type('#username', random);
        await page.type('#password', random);
        await page.click('[data-testid="submit-sign-up-button"]');

        await page.waitForSelector('[data-testid="logout-button"]');
        const text = await page.$eval('[data-testid="logout-button"]', e => e.textContent);
        expect(text).toEqual('Logout');
    });

    it('should allow to logout', async () => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('[data-testid="logout-button"]');
        await page.click('[data-testid="logout-button"]');

        await page.waitForSelector('[data-testid="login-button"]');
        const text = await page.$eval('[data-testid="login-button"]', e => e.textContent);
        expect(text).toEqual('Login');
    });

    it('should allow to login', async () => {
        await page.waitForSelector('[data-testid="login-button"]');
        await page.click('[data-testid="login-button"]');

        await page.waitForSelector('[data-testid="submit-login-button"]');
        await page.type('#username', random);
        await page.type('#password', random);
        await page.click('[data-testid="submit-login-button"]');

        await page.waitForSelector('[data-testid="logout-button"]');
        const text = await page.$eval('[data-testid="logout-button"]', e => e.textContent);
        expect(text).toEqual('Logout');
    });

    afterAll(() => browser.close());
});