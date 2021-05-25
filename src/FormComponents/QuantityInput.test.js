import React from 'react';
import ReactDOM from 'react-dom';
import {QuantityInput} from './QuantityInput';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<QuantityInput />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  