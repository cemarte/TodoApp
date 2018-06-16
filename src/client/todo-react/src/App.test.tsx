import * as React from 'react';
import App from './App';
import { shallow } from 'enzyme';
// setup file
import { configure } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';

configure({ adapter: new ReactSixteenAdapter() });
it('renders without crashing', () => {
  const component = shallow(<App />);
  expect(component.exists()).toBeTruthy();
});
