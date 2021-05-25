import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {ProjectRouter} from './ProjectRouter';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><ProjectRouter /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  