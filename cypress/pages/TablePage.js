import BasePage from './BasePage'

class TablePage extends BasePage {
  getHeaders() {
    return cy.get('.header')
  }
}

export default TablePage