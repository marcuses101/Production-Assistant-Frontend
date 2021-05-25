import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {ProjectList} from './ProjectList';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><ProjectList /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  