import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/header/header';
import { Stream } from './components/stream/stream';
import { Welcome } from './components/welcome/welcome';
import cx from 'classnames';

function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <div
      className={cx(
        isDark && 'dark',
        'w-full min-h-screen flex flex-col animate-gradient bg-500'
      )}
    >
      <Header isDarkMode={isDark} onModeChange={setIsDark} />
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
