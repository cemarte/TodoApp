import * as React from 'react';
import './App.css';
import FilteredTodos from './containers/FilteredTodos';
import TodoForm from './components/TodoForm';
import { Layout } from 'antd';
import Toolbar from './components/Toolbar';
const { Header, Sider, Content } = Layout;

const App = () => (
  <div className="App">
    <Layout>
      <Header>
        <h1 className="App-title">My Todo List</h1>
      </Header>
      <Layout>
        <Sider>
          <Toolbar />
        </Sider>
        <Content>
          <TodoForm />
          <FilteredTodos />
        </Content>
      </Layout>
    </Layout>
  </div>
);

export default App;
