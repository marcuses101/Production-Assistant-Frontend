import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {AddUserForm} from './AddUserForm';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><AddUserForm /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  