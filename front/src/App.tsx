import React, { lazy, Suspense } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './apollo';

const TodoApp = lazy(() => import('./components/TodoApp'));


function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Suspense fallback={<p>Loading...</p>}>
          <TodoApp />
        </Suspense>
      </ApolloProvider>
    </div>
  );
}

export default App;
