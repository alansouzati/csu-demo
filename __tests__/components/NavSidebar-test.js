import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavSidebar from '../../src/js/components/NavSidebar';
import store from '../../src/js/store';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

test('NavSidebar renders', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Router>
        <Route path='/' component={NavSidebar} />
      </Router>
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
