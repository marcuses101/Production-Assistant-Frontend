import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {AddSceneForm} from './AddSceneForm';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><AddSceneForm /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  