import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../containers/home/index';

describe('VideoApp index', () => {
  configure({ adapter: new Adapter() });
  it('renders home route - main component', () => {
    const renderedApp = mount(<Home />);
    expect(renderedApp.find('.app-title').exists()).toBe(true);
  });
});
