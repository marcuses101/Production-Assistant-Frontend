import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {EditSceneForm} from './EditSceneForm';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><EditSceneForm /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  