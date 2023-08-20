# Structure Playwright TS


## config


1. Configuração das variáveis de ambiente:

~~~ts


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

~~~


2. Definições gerais

testDir - diretório dos tests;
testMach - arquivo das automações
fullyParallel - vai executar paralelo os tests
workers - quantidade de thread simulateneas para os testes
projects: define os ambientes testes; pode ser criado projetos para configurações específica de navegadores

~~~js
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/specs',
  testMatch: /.*\.spec\.ts/,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */

  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:  [
    ['list'],
    ['json', {  outputFile: 'reports/jsonfile.json' }],
    ['html', {outputFile: 'reports/'}]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  

  //timeout
  timeout: 20000,

  // path to the global setup files.
  //globalSetup: 'tests/hooks/global.setup.ts',

  // path to the global teardown files.
  //globalTeardown: require.resolve('./tests/hooks/global-teardown'),

  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 5000,

    toHaveScreenshot: {
      // An acceptable amount of pixels that could be different, unset by default.
      maxDiffPixels: 10,
    },

    toMatchSnapshot: {
      // An acceptable ratio of pixels that are different to the total amount of pixels, between 0 and 1.
      maxDiffPixelRatio: 0.1,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'stage',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'https://demo.playwright.dev',
        trace: 'on-all-retries'
      },
      
      retries: 2,
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

~~~

## tests

### Estrutura

**hooks/globalSetup**

Primeiro arquivo a ser executado antes de todos.
Posso colocar uma configuração de banco, criação de arquivos, acessar a url, etc.

**actions**

Functions que vão tornar os comportamentos dos testes reaproveitáveis, posso criar functions
para validações, comportamentos repetitiveis, etc.


**Test**

Geralmente coloco um before para fazer um login, como pré condição para iniciar os testes
Em sequência os testes

~~~js 
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



~~~


## CodeGen

### Passos 

Rode o comando:

`npm run codeGen URL_DESEJADA`

Será aberto um navegador, execute agora o teste manual, isso irá gerar insumo para o teste automatizado.

**fonte**: https://playwright.dev/docs/codegen#recording-a-test

