import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {ShoppingList} from './ShoppingList';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><ShoppingList /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  