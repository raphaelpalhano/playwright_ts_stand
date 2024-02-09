import { Page } from '@playwright/test';

export async function createNewTodo (page: Page, element?: string, data?: string) {
  const newTodo = page.getByPlaceholder(element);

  // Create 1st todo.
  await newTodo.fill(data);
  await newTodo.press('Enter');
}


export async function checkNumberOfTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction(e => {
    return JSON.parse(localStorage['react-todos']).length === e;
  }, expected);
}

export async function checkNumberOfCompletedTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction(e => {
    return JSON.parse(localStorage['react-todos']).filter((todo: any) => todo.completed).length === e;
  }, expected);
}

export async function checkTodosInLocalStorage(page: Page, title: string) {
  return await page.waitForFunction(t => {
    return JSON.parse(localStorage['react-todos']).map((todo: any) => todo.title).includes(t);
  }, title);
}


export async function createDefaultTodos(page: Page, data: Array<string>) {
  // create a new todo locator
  const newTodo = page.getByPlaceholder('What needs to be done?');

  for (const item of data) {
    await newTodo.fill(item);
    await newTodo.press('Enter');
  }
}
