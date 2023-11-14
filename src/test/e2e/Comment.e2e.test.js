import puppeteer from 'puppeteer';
import { getRandomString } from '../util/randomString';

describe('Comment', () => {
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

        await page.waitForSelector('[data-testid="submit-post-button"]');
        await page.type('#title', 'some title');
        await page.type('#body', 'some body');
        await page.click('[data-testid="submit-post-button"]');
    }, 20000);

    it('should allow to create a new comment', async () => {
        await page.waitForSelector('[data-testid="submit-comment-button"]');
        await page.type('#body-comment', 'some comment');
        await page.click('[data-testid="submit-comment-button"]');

        await page.waitForTimeout(1000);
        const comment = await page.$x('(//div[contains(string(), "some comment")])[last()]');
        const text = await page.evaluate(el => el.textContent, comment[0]);
        expect(text).toContain('some comment');
    }, 20000);

    it('should allow to edit a comment', async () => {
        await page.waitForSelector('[data-testid="submit-comment-button"]');
        await page.type('#body-comment', 'some comment');
        await page.click('[data-testid="submit-comment-button"]');

        await page.waitForSelector('[data-testid="edit-comment-button"]');
        await page.click('[data-testid="edit-comment-button"]');

        await page.waitForSelector('[data-testid="submit-edit-comment-button"]');
        await page.type('#body-comment-edit', 'some comment edited');
        await page.click('[data-testid="submit-edit-comment-button"]');

        await page.waitForTimeout(1000);
        const comment = await page.$x('(//div[contains(string(), "some comment edited")])[last()]');
        const text = await page.evaluate(el => el.textContent, comment[0]);
        expect(text).toContain('some comment edited');
    }, 20000);

    it('should allow to delete a comment', async () => {
        const randomToDelete = getRandomString();
        await page.waitForSelector('[data-testid="submit-comment-button"]');
        await page.type('#body-comment', 'some comment');
        await page.click('[data-testid="submit-comment-button"]');

        await page.waitForTimeout(1000);
        const deleteButton = await page.$x('(//button[contains(string(), "Delete comment")])[last()]');
        deleteButton[0].click();
        await page.waitForTimeout(1000);

        const comment = await page.$x(`//div[contains(string(), "${randomToDelete}")]`);
        expect(comment.length).toBe(0);
    }, 20000);

    afterAll(() => browser.close());
});
