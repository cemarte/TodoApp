import * as React from 'react';
import './App.css';
import FilteredTodos from './containers/FilteredTodos';
import TodoForm from './components/TodoForm';
import Toolbar from './components/Toolbar';

const App = () => (
  <section className="App">
      <header className="App-header">
        <h1 className="App-title">My Todo List</h1>
      </header>
        <nav className="App-side">
          <Toolbar />
        </nav>
        <main className="App-main">
          <TodoForm />
          <FilteredTodos />
        </main>
  </section>
);

export default App;
