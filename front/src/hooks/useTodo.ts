import { useRef, useCallback, ChangeEvent} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

type Todo = {
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

export function useTodo () {
  const { error, data } = useQuery<{todos: Todo[]}>(FETCH_TODOS);
  const [addTodo] = useMutation<{ addTodo: Todo }>(
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

  const [toggleTodo] = useMutation<{ toggleTodo: Todo }>(
    TOGGLE_TODO,
    {
      update(cache, { data }) {
        const state = cache.readQuery<{ todos: Todo[] }>({ query: FETCH_TODOS });
        if (state && data) {
          const newTodos =  [ ...state.todos ]
          const index = newTodos.findIndex(todo => todo.id === data.toggleTodo.id);
          newTodos[index].done = data.toggleTodo.done
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

  return {
    data,
    error,
    inputRef,
    onClickAdd,
    onChangeTick
  }
}