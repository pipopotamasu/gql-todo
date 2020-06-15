import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

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

function TodoApp() {
  const { loading, error, data } = useQuery(FETCH_TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data)
  return (
    <div>
      hoge
    </div>
  );
}

export default TodoApp;