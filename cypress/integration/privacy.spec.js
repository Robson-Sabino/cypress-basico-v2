/* executando o  teste varias vezes usando o Lodash, messe caso ele vai executar o teste 3 vezes*/
Cypress._.times(3, function () {
    it('Central de Atendimento ao Cliente TAT - Política de privacidade', function () {
        cy.visit('./src/privacy.html')
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')

    })
})