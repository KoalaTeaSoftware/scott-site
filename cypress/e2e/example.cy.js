// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'You did it!')
  })
})

/*
1
2
3
import './clock.cy'
import './play.cy'
import './spec.cy'

 */