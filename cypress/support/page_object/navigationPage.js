
function selectMenuItem(groupName){
    cy.contains('a', groupName).then( menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attr => {
            if(attr.includes('left')){
                cy.wrap(menu).click()
            }
        })
    })
}

export class NavigationPage{
    
    formLayoutsPage(){
        selectMenuItem('Form')
        cy.contains('Form Layouts').click()
    }

    datepockerPage(){
        selectMenuItem('Form')
        cy.contains('Datepicker').click()
    }

    toasterPage(){
        selectMenuItem('Modal & Overlays')
        cy.contains('Toastr').click()
    }

    smartTablePage(){
        selectMenuItem('Tables & Data')
        cy.contains('Smart Table').click()
    }

    tooltipsPage(){
        selectMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click()
    }

}

export const navigateTo = new NavigationPage()