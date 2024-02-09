import { chromium, type FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';


async function globalSetup(config: FullConfig) {
  if(process.env.environment) {
    dotenv.config({
      path: `${path.join(process.cwd(), `./envs/.env.${process.env.environment}`)}`,
      override: true
    });
  }


  //const browser = await chromium.launch();
  //const page = await browser.newPage();
  //await page.goto('/');
  //  await page.context().storageState({ path: storageState as string });
  //await browser.close();
}

export default globalSetup;

