import { useState } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { GlobalContext } from './context/GlobalContext';
import { IAccess, IArticle } from './interfaces';
import Admin from './components/Admin';
import Header from './components/Header/Header';

const App = () => {
  const [label, setLabel] = useState<string>('list');
  const [access, setAccess] = useState<IAccess | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<IArticle[]>([]);

  const serverUrl = process.env.REACT_APP_APOLLO_CLIENT_URL;

  const client = new ApolloClient({
    uri: serverUrl,
    cache: new InMemoryCache(),
  });

  return (
    <GlobalContext.Provider
      value={{
        label,
        setLabel,
        articles,
        setArticles,
        access,
        setAccess,
        isLoading,
        setIsLoading,
      }}
    >
      <ApolloProvider client={client}>
        <div>
          <Header />
          <main>
            <Admin />
          </main>
        </div>
      </ApolloProvider>
    </GlobalContext.Provider>
  );
};

export default App;
