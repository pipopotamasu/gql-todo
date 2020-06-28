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

function getTodo(_parent, { id }) {
  return todos.find(todo => todo.id === id)
}

function getTodos(_parent, { searchBy, filter, limit }) {
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

function addTodo (_parent, { input }) {
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

function updateTodoContent (_parent, { input }) {
  const { id, content } = input;
  const i = todos.findIndex(todo => todo.id === id)
  todos[i].content = content
  return todos[i]
}

function toggleTodo (_parent, { id }) {
  const todo = todos.find((todo) => todo.id === id);
  todo.done = !todo.done;
  return todo;
}

function deleteTodo (_parent, { id }) {
  const i = todos.findIndex(todo => todo.id === id);
  const deletedTodo = todos.splice(i, 1);
  return deletedTodo[0]
}

module.exports = {
  Query: {
    todo: getTodo,
    todos: getTodos,
    todoTotalCount: () => todos.length,
    hello: () => 'world',
  },
  Mutation: {
    addTodo,
    toggleTodo,
    updateTodoContent,
    deleteTodo
  }
}
