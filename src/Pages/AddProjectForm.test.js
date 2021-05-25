import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {AddProjectForm} from './AddProjectForm';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><AddProjectForm /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  