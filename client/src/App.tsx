import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/header/header';
import { Stream } from './components/stream/stream';
import { Welcome } from './components/welcome/welcome';

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <Switch>
        <Route path="/stream/:streamId">
          <Stream />
        </Route>
        <Route path="/">
          <Welcome />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
