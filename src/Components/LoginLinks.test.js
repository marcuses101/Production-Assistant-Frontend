import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {LoginLinks} from './LoginLinks';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><LoginLinks /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  