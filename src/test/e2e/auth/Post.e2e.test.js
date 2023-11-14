import puppeteer from 'puppeteer';
import { getRandomString } from '../../util/randomString';

describe('Post', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();

        const random = getRandomString();

        await page.goto('http://localhost:3000');
        await page.waitForSelector('[data-testid="sign-up-button"]');
        await page.click('[data-testid="sign-up-button"]');

        await page.waitForSelector('[data-testid="submit-sign-up-button"]');
        await page.type('#username', random);
        await page.type('#password', random);
        await page.click('[data-testid="submit-sign-up-button"]');
    }, 20000);

    it('should allow to create a new post', async () => {
        await page.waitForSelector('[data-testid="submit-post-button"]');
        await page.type('#title', 'some title');
        await page.type('#body', 'some body');
        await page.click('[data-testid="submit-post-button"]');

        const postTitle = await page.$x('(//div[contains(string(), "some title")])[last()]');
        const text = await page.evaluate(el => el.textContent, postTitle[0]);
        expect(text).toContain('some title');
    }, 20000);

    it('should allow to edit a post', async () => {
        await page.waitForSelector('[data-testid="submit-post-button"]');
        await page.type('#title', 'some title');
        await page.type('#body', 'some body');
        await page.click('[data-testid="submit-post-button"]');

        await page.waitForSelector('[data-testid="edit-post-button"]');
        await page.click('[data-testid="edit-post-button"]');

        await page.waitForSelector('[data-testid="submit-edit-post-button"]');
        await page.type('#title-edit', ' edited');
        await page.type('#body-edit', ' edited');
        await page.click('[data-testid="submit-edit-post-button"]');

        const postTitle = await page.$x('(//div[contains(string(), "some title edited")])[last()]');
        const text = await page.evaluate(el => el.textContent, postTitle[0]);
        expect(text).toContain('some title edited');
    }, 20000);

    it('should allow to delete a post', async () => {
        const randomToDelete = getRandomString();
        await page.waitForSelector('[data-testid="submit-post-button"]');
        await page.type('#title', randomToDelete);
        await page.type('#body', 'some body');
        await page.click('[data-testid="submit-post-button"]');

        await page.waitForTimeout(1000);
        const deleteButton = await page.$x('(//button[contains(string(), "delete")])[last()]');
        deleteButton[0].click();
        await page.waitForTimeout(1000);

        const postTitle = await page.$x(`//div[contains(string(), "${randomToDelete}")]`);
        expect(postTitle.length).toBe(0);
    }, 20000);

    afterAll(() => browser.close());
});
