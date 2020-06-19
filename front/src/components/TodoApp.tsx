import React, { useMemo, useState, useCallback, ChangeEvent} from 'react';
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

function TodoApp() {
  const { error, data } = useQuery<{todos: Todo[]}>(FETCH_TODOS);
  const [addTodo, { data: _data }] = useMutation(ADD_TODO);
  const [newContent, setNewContent] = useState('');
  const onClickAdd = useCallback(async () => {
    const res = await addTodo({ variables: { content: newContent, userId: 1 } });
    console.log(res)
    console.log(1)
  }, [addTodo, newContent]);
  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewContent(e.target.value)
  }, [setNewContent])

  const Items = useMemo(() => {
    if (!data) return <p>no data.</p>;
    return data.todos.map((item) => {
      return (
        <li key={item.id}>
          <input type="checkbox" checked={item.done} onChange={() => {}} />
          <span>{ item.content }</span>
        </li>
      )
    })
  }, [data])

  if (error) return <p>Error :(</p>;

  return (
    <>
      <div>
        <input type="text" value={newContent} onChange={onChangeInput} />
        <button type="button" onClick={onClickAdd}>Add</button>
      </div>
      <ul>
        {Items}
      </ul>
    </>
  );
}

export default TodoApp;