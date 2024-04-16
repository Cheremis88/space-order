import { setCookie, deleteCookie } from '../../src/utils/cookie';

describe('Tests for constructor page', () => {
  
  beforeEach(() => {
    cy.intercept('GET', '*/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
    cy.get(`[data-cy='643d69a5c3f7b9001cfa093d']`).as('bun');
    cy.get(`[data-cy='643d69a5c3f7b9001cfa0946']`).as('filling');
  });

  describe('Creating an order', () => {
    
    beforeEach(() => {
      cy.get('@bun').find('button').click();
      cy.get('@filling').find('button').click();
    });

    it('adding ingredients to the burger by button click', () => {
      cy.get(`[data-cy='topBun']`).contains('флюоресцентная булка', { matchCase: false });
      cy.get(`[data-cy='bottomBun']`).contains('Флюоресцентная булка', { matchCase: false });
      cy.get(`[data-cy='filling']`).contains('Хрустящие минеральные кольца', { matchCase: false });
    });

    it('placing and sending an order', () => {
      setCookie('accessToken', '123');
      localStorage.setItem('refreshToken', '456');
      cy.intercept('GET', '*/auth/user', { fixture: 'user.json' });
      cy.visit('http://localhost:4000');
      cy.contains('Оформить').click();
    });
  });
});
