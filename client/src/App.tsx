import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/header/header';
import { Stream } from './routes/stream/stream';
import { Welcome } from './routes/welcome/welcome';
import cx from 'classnames';
import { useLocalStorage } from './lib/useLocalStorage';

function App() {
  const [isDark, setIsDark] = useLocalStorage('isDark', false);
  return (
    <div
      className={cx(
        isDark && 'dark',
        'w-full min-h-screen flex flex-col items-stretch'
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
