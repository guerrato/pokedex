import React from 'react';
import logo from './logo.svg';
import './App.css';
import DTable from './components/DTable';
// import container from './Infrastructure/Installer';
// import { IPokemonService } from './services/interfaces/iPokemonService';
// import SERVICE_IDENTIFIER from './Constants/Identifiers';

const App = ()=> {
  // const pokeService = container.get<IPokemonService>(SERVICE_IDENTIFIER.IPokemonService);

  return (
    <div className="App">
      <DTable></DTable>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
