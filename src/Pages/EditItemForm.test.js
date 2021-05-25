import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {EditItemForm} from './EditItemForm';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><EditItemForm /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  