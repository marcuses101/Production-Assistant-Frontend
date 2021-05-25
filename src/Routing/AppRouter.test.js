import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {AppRouter} from './AppRouter';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><AppRouter /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  