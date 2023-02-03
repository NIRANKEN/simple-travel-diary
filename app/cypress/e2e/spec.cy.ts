describe('template spec', () => {
  before(() => {
  });
  beforeEach(() => {
    cy.viewport(1280, 960);
  });
  it('visit diary page', () => {
    cy.visit('http://localhost:9000/');
  })
})