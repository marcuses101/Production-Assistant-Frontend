import React from 'react';
import ReactDOM from 'react-dom';
import {ItemSelector} from './ItemSelector';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ItemSelector />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  