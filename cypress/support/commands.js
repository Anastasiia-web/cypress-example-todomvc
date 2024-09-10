// ***********************************************
// This example commands.js shows you how to
// create the custom commands: 'createDefaultTodos'
// and 'createTodo'.
//
// The commands.js file is a great place to
// modify existing commands and create custom
// commands for use throughout your tests.
//
// You can read more about custom commands here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('createDefaultTodos', function () {

  let TODO_ITEM_ONE = '1 buy some cheese'
  let TODO_ITEM_TWO = '2 feed the cat'
  let TODO_ITEM_THREE = '3 book a doctors appointment'

  // begin the command here, which by will display
  // as a 'spinning blue state' in the UI to indicate
  // the command is running
  let cmd = Cypress.log({
    name: 'create default todos',
    message: [],
    consoleProps () {
      // we're creating our own custom message here
      // which will print out to our browsers console
      // whenever we click on this command
      return {
        'Inserted Todos': [TODO_ITEM_ONE, TODO_ITEM_TWO, TODO_ITEM_THREE],
      }
    },
  })

  // additionally we pass {log: false} to all of our
  // sub-commands so none of them will output to
  // our command log

  cy.get('.new-todo', { log: false })
  .type(`${TODO_ITEM_ONE}{enter}`, { log: false })
  .type(`${TODO_ITEM_TWO}{enter}`, { log: false })
  .type(`${TODO_ITEM_THREE}{enter}`, { log: false })

  cy.get('.todo-list li', { log: false })
  .then(function ($listItems) {
    // once we're done inserting each of the todos
    // above we want to return the .todo-list li's
    // to allow for further chaining and then
    // we want to snapshot the state of the DOM
    // and end the command so it goes from that
    // 'spinning blue state' to the 'finished state'
    cmd.set({ $el: $listItems }).snapshot().end()
  })

  // return a query for the todo items so that we can
  // alias the result of this command in our tests
  return cy.get('.todo-list li', { log: false })
})

Cypress.Commands.add('createTodo', function (todo) {

  let cmd = Cypress.log({
    name: 'create todo',
    message: todo,
    consoleProps () {
      return {
        'Inserted Todo': todo,
      }
    },
  })

  // create the todo
  cy.get('.new-todo', { log: false }).type(`${todo}{enter}`, { log: false })

  // now go find the actual todo
  // in the todo list so we can
  // easily alias this in our tests
  // and set the $el so its highlighted
  cy.get('.todo-list', { log: false })
  .contains('li', todo.trim(), { log: false })
  .then(function ($li) {
    // set the $el for the command so
    // it highlights when we hover over
    // our command
    cmd.set({ $el: $li }).snapshot().end()
  })

  // return a query for the todo items so that we can
  // alias the result of this command in our tests
  return cy.get('.todo-list', { log: false })
  .contains('li', todo.trim(), { log: false })
})

Cypress.Commands.add('addAxeCode', () => {
  cy.window({ log: false }).then((win) => {
    return new Promise((resolve) => {
      const script = win.document.createElement('script')

      script.src = '/node_modules/axe-core/axe.min.js'
      script.addEventListener('load', resolve)

      win.document.head.appendChild(script)
    })
  })
})

//====
import todos from '../fixtures/todos-list.json'

Cypress.Commands.add('createMyTodos', function () {

  cy.get('.new-todo')
  .type(`${todos.todosList.todo1}{enter}`)
  .type(`${todos.todosList.todo2}{enter}`)
  .type(`${todos.todosList.todo3}{enter}`)

  return cy.get('.todo-list li')
})

Cypress.Commands.add('createMyTodo', function () {

  cy.get('.new-todo')
  .type(`${todos.todosList.todo1}{enter}`)
  
  return cy.get('.todo-list li')
})