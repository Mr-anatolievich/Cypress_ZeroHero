import { navigateTo } from "../support/page_object/navigationPage"
import { onFormLayoutsPage } from "../support/page_object/formLayoutsPage"
import { onSmartTablePage } from "../support/page_object/smartTable"


describe('', () => {

    beforeEach('', () => {
        cy.openHomePage()
    })

    it('upt nav menu', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datepockerPage()
        navigateTo.smartTablePage()
        navigateTo.toasterPage()
        navigateTo.tooltipsPage()
    })

    it (' should test Inline form and Basic form + check Smart Table', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Yaroslav', 'test@gmail.com')
        onFormLayoutsPage.submitBasicFormWithNameAndEmail('test@gmail.com', 'test')
        navigateTo.smartTablePage()
        onSmartTablePage.addNewTabWithFirsrLastName('Yaroslav', 'Saienko')
        onSmartTablePage.updateAgeSmartTable('Yaroslav', '25')
        onSmartTablePage.deleteRowByIndex(2)
    })


})