import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Stream } from './components/stream/stream';
import { Welcome } from './components/welcome/welcome';

function App() {
  return (
    <div className="w-full h-full bg-russian-violet-500 text-isablelline-500">
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
