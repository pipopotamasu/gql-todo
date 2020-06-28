import { useRef, useCallback, ChangeEvent, MouseEvent} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export type Todo = {
  id: number,
  user: { id: number },
  content: string,
  done: boolean
}

const TODO_FIELDS = gql`
  fragment todoFields on Todo {
    id
    user {
      id
    }
    content
    done
  }
`

const FETCH_TODOS = gql`
  {
    todos {
      ...todoFields
    }
  }

  ${TODO_FIELDS}
`;

const ADD_TODO = gql`
  mutation AddTodo($content: String!, $userId: Int!) {
    addTodo(input: { content: $content, userId: $userId }) {
      ...todoFields
    }
  }

  ${TODO_FIELDS}
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: Int!) {
    toggleTodo(id: $id) {
      ...todoFields
    }
  }

  ${TODO_FIELDS}
`

const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      ...todoFields
    }
  }

  ${TODO_FIELDS}
`

const UPDATE_TODO_CONTENT = gql`
  mutation UpdateTodoContent($id: Int!, $content: String!) {
    updateTodoContent(input: { id: $id, content: $content }) {
      ...todoFields
    }
  }

  ${TODO_FIELDS}
`

export function useTodo () {
  const { error, data } = useQuery<{todos: Todo[]}>(FETCH_TODOS);
  const [addTodo] = useMutation<{ addTodo: Todo }, { content: string, userId: number }>(
    ADD_TODO,
    {
      update (cache, { data }) {
        const state = cache.readQuery<{ todos: Todo[] }>({ query: FETCH_TODOS });
        if (state && data) {
          cache.writeQuery({
            query: FETCH_TODOS,
            data: { todos: state.todos.concat([data.addTodo]) },
          });
        }
      }
    }
  );

  const [toggleTodo] = useMutation<{ toggleTodo: Todo }, { id: number }>(
    TOGGLE_TODO,
    {
      update(cache, { data }) {
        const state = cache.readQuery<{ todos: Todo[] }>({ query: FETCH_TODOS });
        if (state && data) {
          const newTodos =  [ ...state.todos ]
          const index = newTodos.findIndex(todo => todo.id === data.toggleTodo.id);
          newTodos[index] = data.toggleTodo
          cache.writeQuery({
            query: FETCH_TODOS,
            data: { todos: newTodos },
          });
        }
      }
    }
  )

  const [deleteTodo] = useMutation<{ deleteTodo: Todo }, { id: number }>(
    DELETE_TODO,
    {
      update(cache, { data }) {
        const state = cache.readQuery<{ todos: Todo[] }>({ query: FETCH_TODOS });
        if (state && data) {
          const newTodos =  [ ...state.todos ]
          const index = newTodos.findIndex(todo => todo.id === data.deleteTodo.id);
          newTodos.splice(index, 1)
          cache.writeQuery({
            query: FETCH_TODOS,
            data: { todos: newTodos },
          });
        }
      }
    }
  )

  const [updateTodoContent] = useMutation<{ updateTodoContent: Todo }, { id: number, content: string }>(
    UPDATE_TODO_CONTENT,
    {
      update(cache, { data }) {
        const state = cache.readQuery<{ todos: Todo[] }>({ query: FETCH_TODOS });
        if (state && data) {
          const newTodos =  [ ...state.todos ]
          const index = newTodos.findIndex(todo => todo.id === data.updateTodoContent.id);
          newTodos[index] = data.updateTodoContent
          cache.writeQuery({
            query: FETCH_TODOS,
            data: { todos: newTodos },
          });
        }
      }
    }
  )

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickAdd = useCallback(async () => {
    const input = inputRef.current;
    if (input && input.value) {
      try {
        await addTodo({ variables: { content: input.value, userId: 1 } })
        input.value = ''
      } catch (e) {
        window.alert('error occured')
      }
    }
  }, [addTodo]);

  const onChangeTick = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(e.currentTarget.value)
    try {
      toggleTodo({ variables: { id } })
    } catch (e) {
      window.alert('error occured')
    }
  }, [toggleTodo])

  const onClickDelete = useCallback((e: MouseEvent<HTMLSpanElement>) => {
    if (window.confirm('Is it ok to delete?')) {
      try {
        const id = parseInt((e.target as any).dataset.id)
        deleteTodo({ variables: { id } })
      } catch (e) {
        window.alert('error occured')
      }
    }
  }, [deleteTodo]);

  const onClickUpdateContent = useCallback((id: number, content: string) => {
    try {
      updateTodoContent({ variables: { id, content } })
    } catch (e) {
      window.alert('error occured')
    }
  }, [updateTodoContent]);

  return {
    data,
    error,
    inputRef,
    onClickAdd,
    onChangeTick,
    onClickDelete,
    onClickUpdateContent
  }
}