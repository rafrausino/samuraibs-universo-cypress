it('webapp deve estar online', () => {
    // um simples comentário
    cy.visit('/');

    cy.title().should('eq', 'Samurai Barbershop by QAninja')
    
});
