import { test, expect } from '@playwright/test';


test.beforeEach(async ({page}) => {
  await page.goto('https://barrigareact.wcaquino.me');
  await page.locator('[data-test="email"]').click();
  await page.locator('[data-test="email"]').fill('rafa123');
  await page.locator('[data-test="email"]').press('Tab');
  await page.locator('[data-test="passwd"]').fill('rafa123');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page.getByText('Bem vindo, rafa!')).toHaveText('Bem vindo, rafa!');

});

test.describe('Access Account', () => {
  
  test('test', async ({ page }) => {
    await page.goto('https://barrigareact.wcaquino.me/');
    await page.locator('[data-test="menu-settings"]').click();
    await page.getByRole('link', { name: 'Contas' }).click();
    await page.locator('[data-test="nome"]').fill('acesso');
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('cell', { name: 'acesso' }).click();
    await page.getByRole('cell', { name: 'acesso' }).click();
    await page.getByRole('cell', { name: 'acesso' }).click();
    await page.getByRole('cell', { name: 'acesso' }).click({
      button: 'right'
    });
    await expect(page.getByRole('cell', { name: 'acesso' })).toHaveText('acesso');
  });
});
