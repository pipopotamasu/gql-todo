import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './apollo';
import TodoApp from './components/TodoApp';


function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <TodoApp />
      </ApolloProvider>
    </div>
  );
}

export default App;
