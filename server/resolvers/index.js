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

function getTodos({ searchBy, filter, limit }) {
  return todos.filter((todo) => {
    if (!todo.content.match(searchBy)) return false;
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

function addTodo ({ input }) {
  const { content, userId } = input;
  const newTodo = {
    id: todos.length + 1,
    content,
    user: createUser(userId),
    done: false
  }
  todos.push(newTodo)
  return newTodo;
}

function toggleTodo ({ id }) {
  const todo = todos.find((todo) => todo.id === id);
  todo.done = !todo.done;
  return todo;
}

module.exports = {
  // query
  todo: getTodo,
  todos: getTodos,
  // mutation
  addTodo,
  toggleTodo
}