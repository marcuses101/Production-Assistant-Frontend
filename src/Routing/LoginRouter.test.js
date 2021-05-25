import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {LoginRouter} from './LoginRouter';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><LoginRouter /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  