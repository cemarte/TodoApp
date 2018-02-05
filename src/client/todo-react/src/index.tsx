import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { todoStore } from './reducers';
import { Provider } from 'react-redux';
import { createStore, Middleware, compose, Store, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { ItodoAppState, FilterType, TodoTask } from './types/index';
import thunkMiddleware from 'redux-thunk';
import { fetchTodosInit } from './actions/index';

const loggerMiddleware: Middleware = createLogger();
// tslint:disable-next-line:no-any
const composeEnhancers: any = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let filter = localStorage.getItem('todos.filter') as FilterType || 'ALL';
const initialState: ItodoAppState = {
  todos: [],
  filter: filter,
  tasks: 0,
  isEdit: false,
  selectedTodo: new TodoTask('New To-Do')
  
};
/* eslint-disable no-underscore-dangle */
const store: Store<ItodoAppState> = createStore<ItodoAppState>(
  todoStore,
  initialState,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware // neat middleware that logs actions
    )
  ));

store.dispatch(fetchTodosInit());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
