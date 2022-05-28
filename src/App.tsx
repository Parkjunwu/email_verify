
import { ApolloProvider } from '@apollo/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { client } from './apollo';
import NotFound from './screens/NotFound';
import VerifyEmailFetch from './screens/VerifyEmailFetch';

// 얘 deploy 할 때 environment variable /graphql 확인 !!

function App() {
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            
            <Route path="confirm/:token/:email" element={<VerifyEmailFetch />} />
            <Route path="*" element={<NotFound />} />
            
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
