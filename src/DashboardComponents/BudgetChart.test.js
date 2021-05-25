import React from 'react';
import ReactDOM from 'react-dom';
import {BudgetChart} from './BudgetChart';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BudgetChart />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
