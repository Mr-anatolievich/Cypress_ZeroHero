/// <reference types="cypress" />

describe('JSON object', () => {

    it('JSON Object', () => {
        cy.openHomePage()

        const sipmpleObject = { "key": "value", "key2": "value2" }

        const simpleArrayOfValue = [ "one", "two", "three" ]

        const arrayOfObject = [ {"key": "value"}, {"key2": "value2"}, {"key3": "value3"} ] 

        const typesData = { "string": "this is a string", "number": 10 }

        const mix = {
            "FirstName": "Yaroslav",
            "LastName": "Saienko",
            "Age": 23, 
            "Students": [
                {
                    "firstName": "Stacia",
                    "lastName": "Andreenko"
                },
                {
                    "firstName": "Ivan",
                    "lastName": "Bondar"
                }
            ]
        }

        console.log(sipmpleObject.key)
        console.log(sipmpleObject["key2"])
        console.log(simpleArrayOfValue[1])
        console.log(arrayOfObject[2].key3)
        console.log(mix.Students[1].firstName)

    })
})
