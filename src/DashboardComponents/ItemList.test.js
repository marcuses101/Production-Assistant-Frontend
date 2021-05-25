import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {ItemList} from './ItemList';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><ItemList /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  