/// <reference types="cypress"/>

const {
  rgb
} = require("d3-color")

describe("First step", () => {

  it('first test', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    cy.wait(200)
    cy.get('[tabindex="0"]').parents('form').find('label')

    cy.contains('nb-card', 'Horizontal form').find('[type="password"]')
  })

  it('second test', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    cy.wait(200)

    // cy.contains('nb-card','Using the Grid').find('[for="inputEmail1"]').should('contain', "Email")
    // cy.contains('nb-card','Using the Grid').find('[for="inputPassword2"]').should('contain', "Password")
    // cy.contains('nb-card','Basic form').find('[for="exampleInputEmail1"]').should('contain', "Email address")
    // cy.contains('nb-card','Basic form').find('[for="exampleInputPassword1"]').should('contain', "Password")

    cy.contains('nb-card', 'Using the Grid').then(firstForm => {
      const firstEmailForm = firstForm.find('[for="inputEmail1"]').text()
      const firstPasswordForm = firstForm.find('[for="inputPassword2"]').text()
      expect(firstEmailForm).to.equal("Email")
      expect(firstPasswordForm).to.equal("Password")

      cy.contains('nb-card', 'Basic form').then(secondForm => {
        const secondPasswordForm = secondForm.find('[for="exampleInputPassword1"]').text()
        expect(firstPasswordForm).to.equal(secondPasswordForm)

        cy.wrap(secondForm).should('contain', "Password")
      })
    })
  })

  it('invoke command', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    cy.wait(200)

    //1
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

    //2
    cy.get('[for="exampleInputEmail1"]').then(label => {
      expect(label.text()).to.equal('Email address')
    })

    //3
    cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
      expect(text).to.equal('Email address')
    })

    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      // .should('contain', 'checked')
      .then(className => {
        expect(className).to.contain('checked')
      })
  })

  it('Datepicker  test', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    let date = new Date()
    date.setDate(date.getDate() + 5)
    let futureDay = date.getDate()
    let futureMonth = date.toLocaleString('default', {
      month: 'short'
    })

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()

      cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttr => {
        if (dateAttr == futureMonth) {
          cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
        }
        if (!dateAttr.includes(futureMonth)) {
          cy.get('[data-name="chevron-right"]').click()
          cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
        }
      })
    })
  })

  it('radioboxes test', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    cy.wait(200)

    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButton => {
      cy.wrap(radioButton)
        .first()
        .check({
          force: true
        })
        .should('be.checked')

      cy.wrap(radioButton)
        .eq(1)
        .check({
          force: true
        })

      cy.wrap(radioButton)
        .first()
        .should('not.be.checked')

      cy.wrap(radioButton)
        .eq(2)
        .should('be.disabled')
    })
  })

  it('checkboxes test', () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()
    cy.wait(200)

    // cy.get('[type="checkbox"]').check({force: true})
    // cy.get('[type="checkbox"]').eq(0).click({force: true})
    cy.get('[type="checkbox"]').eq(0).check({
      force: true
    })

  })

  it('lists and dropdown test', () => {
    cy.visit('/')

    //1
    // cy.get('nav nb-select').contains("Light").click()
    // cy.get('[ng-reflect-value="dark"]').click()
    // cy.get('nav nb-select').should('contain', 'Dark')
    // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

    //2
    cy.get('nav nb-select').then(dropdown => {
      cy.wrap(dropdown).click()
      cy.get('.options-list nb-option').each((listItem, index) => {
        const colorText = listItem.text().trim()

        const color = {
          "Light": "rgb(255, 255, 255)",
          "Dark": "rgb(34, 43, 69)",
          "Cosmic": "rgb(50, 50, 89)",
          "Corporate": "rgb(255, 255, 255)"
        }

        cy.wrap(listItem).click()
        cy.wrap(dropdown).should('contain', colorText)
        cy.get('nb-layout-header nav').should('have.css', 'background-color', color[colorText])

        if (index < 3) {
          cy.wrap(dropdown).click()
        }
      })
    })
  })

  it('Web tabs test', () => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //1
    cy.get('tbody').contains('tr', "Larry").then(tableRow => {
      cy.wrap(tableRow).find('.nb-edit').click()
      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
      cy.wrap(tableRow).find('.nb-checkmark').click()
      cy.wrap(tableRow).find('td').eq(6).contains('25')
    })

    //2
    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('tr').eq(2).then(tableRow => {
      cy.wrap(tableRow).find('[placeholder="First Name"]').click().type('Yaroslav')
      cy.wrap(tableRow).find('[placeholder="Last Name"]').click().type('Saienko')
      cy.wrap(tableRow).find('.nb-checkmark').click()
    })
    cy.get('tbody').find('tr').eq(0).then(tableRow => {
      cy.wrap(tableRow).find('td').eq(2).contains('Yaroslav')
      cy.wrap(tableRow).find('td').eq(3).contains('Saienko')
    })

    //3 
    const age = [20, 30, 40, 200]

    cy.wrap(age).each(age => {
      cy.get('thead [placeholder="Age"]').clear().type(age)
      cy.wait(500)
      cy.get('tbody tr').each(tableColum => {
        if (age == 200) {
          cy.wrap(tableColum).should('contain', 'No data found')
        } else {
          cy.wrap(tableColum).find('td').eq(6).should('contain', age)

        }
      })
    })


  })

  it('Tooltips', () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Tooltip').click()

    cy.contains('nb-card', 'Colored Tooltips')
      .contains('Default').click()
    cy.get('nb-tooltip').should('contain', 'This is a tooltip')
  })

  it('browsers dialog box test', () => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //1
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.equal('Are you sure you want to delete?')
    })

    //2
    const stub = cy.stub()
    cy.on('window:confirm', stub)
    cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    })

    //3 'cancel'
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', () => false)
  })

})
