///<reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
 
    const THREE_SECONDS_IN_MS = 3000 //variavel que recebi o valor do time do relogio em milesegundos pra avanço no tempo
    
 
  beforeEach(function () {
  cy.visit('./src/index.html')
  })
  it.only('Verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('Preenche os campos obrigatórios e envia o formulário com texto longo', function () {
    const longtext = 'teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste '
    cy.get('#firstName').type('Robson')
    cy.get('#lastName').type('Sabino')
    cy.get('#email').type('robsonsabino@gmail.com')
    cy.get('#open-text-area').type(longtext,{delay:0})//usando uma variavel pra escrever o testo e usando o delay 0 pra colocar o testo de forma automatica sem esperar o tempo de digitação
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })
  it('preencher os campos obrigatórios e envia o formulário', function () {
    cy.clock()//congela o relogio do navegador
    cy.get('#firstName').type('Robson')
    cy.get('#lastName').type('Sabino')
    cy.get('#email').type('robsonsabino@gmail.com')
    cy.get('#open-text-area').type('texto')
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)//avaça no tempo pra nao precissar esperar o tempo das messagens
    cy.get('.success').should('not.be.visible')
  })
  it('Exibe a mensagem de erro ao submeter o formulario com um email com formatação invalida', function () {
    cy.clock()
    cy.get('#firstName').type('Robson')
    cy.get('#lastName').type('Sabino')
    cy.get('#email').type('robsonsabino.gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error').should('not.be.visible')
  })
  it('campo telefone continua vazio quando preenchido com valor nao-numerico', function () {
    cy.get('#phone')
      .type('jhgfdsdwrtwret')
      .should('have.value', '')
  })
  it('telefone obrigatorio nao preenchido', function () {
    cy.clock()
    cy.get('#firstName').type('Robson')
    cy.get('#lastName').type('Sabino')
    cy.get('#email').type('robsonsabino@gmail.com')
    cy.get('#phone').type('jhgfdsdwrtwret')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get(".error").should("not.be.visible")
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
    cy.clock()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error').should('not.be.visible')
  })
  it('envia o formuário com sucesso usando um comando customizado', function() {
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit('robson', 'sabino', 'robsonsabinof@gmail.com', 'teste de cadastro')
    cy.get('.success').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.success').should('not.be.visible')
  })
  it('selecionar um produto (youtube) por seu texto', function () {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })
  it('selecionar um produto (youtube) por seu valor', function () {
    cy.get('#product')
      .select('youtube')
      .should('have.value', 'youtube')
  })
  it('selecionar um produto (youtube) por seu indice', function () {
    cy.get('#product')
      .select(4)
      .should('have.value', 'youtube')
  })
  it('marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })
  it('marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]').should('have.length', 3)
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
    cy.contains('Talking About Testing').should('be.visible') //verifica se tem esse texto na pagina
  })
  it('Exibe e esconde os mansagens de sucesso e erro usando o .invoke', () =>{
    cy.get('.success')//peguei o elemento com a classe success
      .should('not.be.visible')//verrifiquei de que nao esta visivel
      .invoke('show')//forcei a exibição dele
      .should('be.visible')//verrifiquei de que esta visivel
      .and('contain', 'Mensagem enviada com sucesso.')//verrifiquei tambem que contem a mensagem certa
      .invoke('hide')//forcei a acultação dele
      .should('not.be.visible')//verrifiquei de que nao esta visivel novamente
    cy.get('.error')//peguei o elemento com a classe success
      .should('not.be.visible')//verrifiquei de que nao esta visivel
      .invoke('show')//forcei a exibição dele
      .should('be.visible')//verrifiquei de que esta visivel
      .and('contain', 'Valide os campos obrigatórios!')//verrifiquei tambem que contem a mensagem certa
      .invoke('hide')//forcei a acultação dele
      .should('not.be.visible')//verrifiquei de que nao esta visivel novamente
  })
  it('preenchea area de testo usando o comando invoke', function() {
    const longText = Cypress._.repeat('0123456789', 20)// repete os numeros 20x
    cy.get('#open-text-area')
      .invoke('val', longText)
      .should('have.value', longText)
  })
  it('faz uma requisição HTTP', function() {
   cy.request('http://localhost:52496/src/index.html')
     .should(function(response) {
        const { status, statusText, body} = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('cypress')
    })
  })
  it.only('encontre o gato e modificar o titulo para CAT-TAT e subtitulo', function() {
    cy.get('#cat').invoke('show').should('be.visible')
    cy.get('#title').invoke('text', 'CAT-TAT').should('be.visible')
    cy.get('#subtitle').invoke('text', 'Eu 💙 Cypress').should('be.visible')
  })
})