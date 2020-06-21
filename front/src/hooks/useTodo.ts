import { useRef, useCallback} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

type Todo = {
  id: number,
  user: { id: number },
  content: string,
  done: boolean
}

const FETCH_TODOS = gql`
  {
    todos {
      id
      user {
        id
      }
      content
      done
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($content: String!, $userId: Int!) {
    addTodo(input: { content: $content, userId: $userId }) {
      id
      user {
        id
      }
      content
      done
    }
  }
`;

export function useTodo () {
  const { error, data } = useQuery<{todos: Todo[]}>(FETCH_TODOS);
  const [addTodo] = useMutation<{ addTodo: Todo }>(
    ADD_TODO,
    {
      update (cache, { data }) {
        const result = cache.readQuery<{ todos: Todo[] }>({ query: FETCH_TODOS });
        if (result && data) {
          cache.writeQuery({
            query: FETCH_TODOS,
            data: { todos: result.todos.concat([data.addTodo]) },
          });
        }
      }
    }
  );

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

  return {
    data,
    error,
    inputRef,
    onClickAdd
  }
}