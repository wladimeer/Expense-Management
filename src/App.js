import React from 'react';
import Container from './elements/Container';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import Background from './components/Background';
import General from './router/General';

const App = () => {
  return (
    <HelmetProvider>
      <Container>
        <BrowserRouter>
          <General />
        </BrowserRouter>
      </Container>

      <Background />
    </HelmetProvider>
  );
}
 
export default App;