import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {SceneInfo} from './SceneInfo';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><SceneInfo /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  