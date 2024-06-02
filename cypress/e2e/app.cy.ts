/// <reference types="cypress" />

describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the header and navigation links', () => {
    cy.get('header').should('be.visible');
    cy.get('[data-testid="home"]').should('be.visible');
    cy.get('[data-testid="nav-starred"]').should('be.visible');
    cy.get('[data-testid="search-movies"]').should('be.visible');
  });

  it('should search for movies', () => {
    cy.get('[data-testid="search-movies"]').type('Inception');
    cy.wait(1000); // wait for debounce
    cy.get('[data-testid="movies"]').should('contain', 'Inception');
  });

  it('should star and unstar a movie', () => {
    cy.get('[data-testid="search-movies"]').type('Inception');
    cy.wait(1000);
    cy.get('[data-testid="movies"]')
      .contains('Inception')
      .parent()
      .find('[data-testid="starred-link"]')
      .click();

    cy.get('[data-testid="nav-starred"]').click();
    cy.get('[data-testid="starred-movies"]').should('contain', 'Inception');

    cy.get('[data-testid="unstar-link"]').click();
    cy.get('[data-testid="starred-movies"]').should('not.contain', 'Inception');
  });

  it('should add and remove a movie to/from watch later list', () => {
    cy.get('[data-testid="search-movies"]').type('Inception');
    cy.wait(1000);
    cy.get('[data-testid="movies"]')
      .contains('Inception')
      .parent()
      .find('[data-testid="watch-later"]')
      .click();

    cy.get('[data-testid="nav-watch-later"]').click();
    cy.get('[data-testid="watch-later-movies"]').should('contain', 'Inception');

    cy.get('[data-testid="remove-watch-later"]').click();
    cy.get('[data-testid="watch-later-movies"]').should('not.contain', 'Inception');
  });

  it('should display trailer in modal', () => {
    cy.get('[data-testid="search-movies"]').type('Inception');
    cy.wait(1000);
    cy.get('[data-testid="movies"]')
      .contains('Inception')
      .parent()
      .find('[data-testid="view-trailer"]')
      .click();

    cy.get('.modal-overlay').should('be.visible');
    cy.get('.video-player').should('be.visible');
    cy.get('.modal-close').click();
    cy.get('.modal-overlay').should('not.exist');
  });
});
