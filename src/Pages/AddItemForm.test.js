import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {AddItemForm} from './AddItemForm';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><AddItemForm /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  