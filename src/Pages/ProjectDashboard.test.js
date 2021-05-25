import React from 'react';
import ReactDOM from 'react-dom';
import {ProjectDashboard} from './ProjectDashboard';
import {MemoryRouter} from 'react-router-dom'


  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><ProjectDashboard /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
