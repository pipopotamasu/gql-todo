import React, { useEffect } from 'react';
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});


function App() {
  useEffect(() => {
    client
      .query({
              query: gql`
                {
                  todos {
                    id,
                    content,
                    done
                  }
                }
              `
            })
  .then(result => console.log(result));

  })

  return (
    <div className="App">
      foo
    </div>
  );
}

export default App;
