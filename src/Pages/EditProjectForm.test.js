import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {EditProjectForm} from './EditProjectForm';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><EditProjectForm /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  