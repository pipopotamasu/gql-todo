function createUser (id = 1) {
  return {
    id,
    name: "pipopotamasu"
  }
}

function createTodo (id = 1) {
  return {
    id,
    user: createUser(),
    content: `todo-${id}`,
    done: id % 2 === 0
  }
}

const todos = [...Array(5)].map((_, i) => {
  return createTodo(i+1)
})

function getTodo({ id }) {
  return todos.find(todo => todo.id === id)
}

function getTodos({ filter, limit }) {
  return todos.filter((todo) => {
    switch (filter) {
      case 'ALL':
        return true
      case 'DONE':
        return todo.done;
      case 'TODO':
        return !todo.done;
    }
  }).slice(0, limit);
}

module.exports = {
  todo: getTodo,
  todos: getTodos,
}