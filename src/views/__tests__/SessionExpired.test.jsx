import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Routes from '../../Routes';

const { create } = renderer;

function TestRouter({ path }) {

  return (
    <MemoryRouter initialEntries={[path]}>
      <Routes />
    </MemoryRouter>
  );
}

describe('SessionExpires', () => {
  describe('When the session ends it', () => {
    it ('renders the session expired view with a home button', () => {
      const DOM = create(<TestRouter path ="/session-expired" />).toJSON();
      expect(DOM).toMatchSnapshot();
    });
  });
});