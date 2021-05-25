import React from 'react';
import ReactDOM from 'react-dom';
import {AddAcquisitionForm} from './AddAcquisitionForm';
import {MemoryRouter} from 'react-router-dom'

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><AddAcquisitionForm /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
