export const locators  = {
  login: {
    email: '[data-test="email"]',
    password: '[data-test="passwd"]',
  },
  menu: {
    settings: '[data-test="menu-settings"]'
  }
};

export type elements = {
  login: {
    email: string,
    password: string
  },

  menu: {
    settings: string
  }
}