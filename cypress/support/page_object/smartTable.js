export class SmartTablePage {

  updateAgeSmartTable(name, age) {
    cy.get('tbody').contains('tr', name).then(tableRow => {
      cy.wrap(tableRow).find('.nb-edit').click()
      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
      cy.wrap(tableRow).find('.nb-checkmark').click()
      cy.wrap(tableRow).find('td').eq(6).contains(age)
    })
  }

  addNewTabWithFirsrLastName(FirstName, LastName) {
    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('tr').eq(2).then(tableRow => {
      cy.wrap(tableRow).find('[placeholder="First Name"]').click().type(FirstName)
      cy.wrap(tableRow).find('[placeholder="Last Name"]').click().type(LastName)
      cy.wrap(tableRow).find('.nb-checkmark').click()
    })
    cy.get('tbody').find('tr').eq(0).then(tableRow => {
      cy.wrap(tableRow).find('td').eq(2).contains(FirstName)
      cy.wrap(tableRow).find('td').eq(3).contains(LastName)
    })
  }

  deleteRowByIndex(index) {
    const stub = cy.stub()
    cy.on('window:confirm', stub)
    cy.get('tbody tr').eq(index).find('.nb-trash').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    })
  }

}

export const onSmartTablePage = new SmartTablePage()
