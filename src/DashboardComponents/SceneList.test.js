import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {SceneList} from './SceneList';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><SceneList /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  