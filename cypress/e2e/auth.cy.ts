describe('L2P Register Flow', () => {
  const testUser = {
    email: 'cypress_test_' + Math.floor(Date.now() / 1000) + '@example.com', // avoid duplicates
    password: 'test1234',
    name: 'Cypress',
    surname: 'Tester',
    nick: 'CyTest',
    class: 'Warrior', // must match the label
  }

  it('Registers successfully with valid data', () => {
    cy.visit('/register')

    cy.get('#email').type(testUser.email)
    cy.get('#password input').type(testUser.password) // PrimeVue wraps input
    cy.get('#name').type(testUser.name)
    cy.get('#surname').type(testUser.surname)
    cy.get('#nick').type(testUser.nick)

    // Select class from Dropdown
    // Open the dropdown
    cy.get('#charClass').click()
    cy.get('li[aria-label="Warrior"]').should('be.visible').click()

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Check redirect to login
    cy.url().should('include', '/login')
  })

  // login
  it('Logs in with registered user', () => {
    cy.visit('/login')

    cy.get('#email').type(testUser.email)
    cy.get('#password input').type(testUser.password)

    cy.get('button[type="submit"]').click()

    // ✅ Wait until token is available
    cy.window().should(win => {
      const token = win.localStorage.getItem('jwt_token')
      expect(token).to.exist
    })

    // Optional: confirm redirect worked
    cy.url().should('include', '/faq')
  })
})
