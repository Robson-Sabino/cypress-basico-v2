it('Central de Atendimento ao Cliente TAT - Política de privacidade', function () {
    cy.visit('./src/privacy.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
})