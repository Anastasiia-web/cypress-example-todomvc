/// <reference types="cypress" />
/// <reference types="../support" />

import todos from "../fixtures/todos-list.json";

// check this file using TypeScript if available
// @ts-check

describe("TodoMVC - React", function () {
  // setup these constants to match what TodoMVC does
  let TODO_ITEM_ONE = "buy some cheese";
  let TODO_ITEM_TWO = "feed the cat";
  let TODO_ITEM_THREE = "book a doctors appointment";

  beforeEach(function () {
    cy.visit("/");
  });

  afterEach(() => {
    // In firefox, blur handlers will fire upon navigation if there is an activeElement.
    // Since todos are updated on blur after editing,
    // this is needed to blur activeElement after each test to prevent state leakage between tests.
    cy.window().then((win) => {
      // @ts-ignore
      win.document.activeElement.blur();
    });
  });

  it('adds 2 todos', () => {
    cy.get('.new-todo').type('smile{enter}').type('greet{enter}')
    cy.get('.todo-list li').should('have.length', 2)
  })

  context('When page is initially opened', () => {
    it('should focus on the todo input field', () => {
      cy.focused().should('have.class', 'new-todo')
    })
  })

  context("No todos", () => {
    it("should hide #main and #footer", () => {
      cy.get(".todo-list li").should("not.exist");
      cy.get(".main").should("not.exist");
      cy.get(".footer").should("not.exist");
    });
  });

  context("New todo", () => {
      it('should allow to add todo items', ()=> {
    cy.get('.new-todo').type(`${TODO_ITEM_ONE}{enter}`)
    cy.get('.todo-list li').eq(0).find('label').should('have.text', TODO_ITEM_ONE)

    cy.get('.new-todo').type(`${TODO_ITEM_TWO}{enter}`)
    cy.get('.todo-list li').eq(1).find('label').should('contain', TODO_ITEM_TWO)
      })

    it('should clear text input field when an item is added', ()=> {
      cy.get('.new-todo').type(`${TODO_ITEM_ONE}{enter}`).should('have.text', '')
    })

    it("should append new items to the buttom of the list", () => {
      cy.createMyTodos().as("myTodos");
      cy.get('.todo-count').should('contain', '3 items left')
      cy.get('@myTodos').eq(0).should('have.text', todos.todosList.todo1)
      cy.get('@myTodos').eq(1).should('have.text', todos.todosList.todo2)
      cy.get('@myTodos').eq(2).should('have.text', todos.todosList.todo3)
    });

    it('should trim text input', function () {
      cy.get('.new-todo').type(`       ${todos.todosList.todo1}      `).type(`{enter}`)
      cy.get('.todo-list li')
      .eq(0)
      .should('have.text', todos.todosList.todo1)
    })

    it("should show #main and #footer when items are added", () => {
      cy.createMyTodo();
      cy.get(".main").should("be.visible");
      cy.get(".footer").should("be.visible");
    });
  });
});
