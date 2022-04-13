/// <reference types="cypress"/>

describe('visual testing with plugins', () => {

    it('first test with using snapshots', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.wait(200)

        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
          cy.wrap(firstForm).toMatchImageSnapshot()
      })
    })

    it('first test with using percy', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.wait(200)

        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
          cy.wait(1000)
          cy.percySnapshot('FormLayouts')
      })
    })
})