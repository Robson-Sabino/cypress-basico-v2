///<reference types="Cypress" />

//const cypress = require("cypress");




describe('Central de Atendimento ao Cliente TAT', function () {
 beforeEach(function () {
  cy.visit('./src/index.html')
})

  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function () {
    const longtext = 'teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste '
    cy.get('#firstName').type('Robson')
    cy.get('#lastName').type('Sabino')
    cy.get('#email').type('robsonsabino@gmail.com')
    cy.get('#open-text-area').type(longtext)
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })

  it('preenche os campos obrigatórios e envia o formulário', function () {
    cy.get('#firstName').type('Robson')
    cy.get('#lastName').type('Sabino')
    cy.get('#email').type('robsonsabino.gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor nao-numerico', function () {
    cy.get('#phone')
      .type('jhgfdsdwrtwret')
      .should('have.value', '')
  })

  it('telefone obrigatorio nao preenchido', function () {
    cy.get('#firstName').type('Robson')
    cy.get('#lastName').type('Sabino')
    cy.get('#email').type('robsonsabino@gmail.com')
    cy.get('#phone').type('jhgfdsdwrtwret')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName')
      .type('Robson')
      .should('have.value', 'Robson')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('sabino')
      .should('have.value', 'sabino')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('robsonsabino@gmail.com')
      .should('have.value', 'robsonsabino@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('1632563699')
      .should('have.value', '1632563699')
      .clear()
      .should('have.value', '')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')

  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible') 
  })

  it('envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit('robson', 'sabino', 'robsonsabinof@gmail.com', 'teste de cadastro')
    cy.get('.success').should('be.visible')
  })

  it('selecionar um produto (youtube) por seu texto', function () {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('selecionar um produto (youtube) por seu valor', function () {
    cy.get('#product').select('youtube').should('have.value', 'youtube')
  })

  it('selecionar um produto (youtube) por seu indice', function () {
    cy.get('#product').select(4).should('have.value', 'youtube')
  })

  it('marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })  
    
  })

  it('marca amboscheckbox, e depois desmarca o ultimo', function () {
    cy.get('input[type="checkbox"]').check()
      .should('be.checked')
      .last().uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures e verificar no console', function(){
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('selecionar um arquivo sinulando um drag-and-drop',function(){
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json',{action: 'drag-drop'})
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json').as('samplefile')
    cy.get('input[type="file"]')
      .selectFile('@samplefile')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
  })

    it('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('Talking About Testing').should('be.visible') //verifica se tem esse testo na pagina
  })
})

