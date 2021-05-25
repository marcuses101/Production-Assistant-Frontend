import React from 'react';
import ReactDOM from 'react-dom';
import {NotificationsProvider} from './NotificationsProvider';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NotificationsProvider />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  