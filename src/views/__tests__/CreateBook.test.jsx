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

describe('CreateBook', () => {
  describe('When there is no current session', () => {
    it ('renders the home page.', () => {
      const DOM = create(<TestRouter path ="/books/new" />).toJSON();
      expect(DOM).toMatchSnapshot();
    });
  });

  describe('When there is a current session', () => {
    const user = {
      access_token: 'TestToken',
      token_type: 'Bearer',
      user: {
        username: 'testUserName',
        first_name: 'testFirstName',
        last_name: 'testLastName',
        email: 'test@email.cl',
        description: 'testDescription',
      },
    };
    const sessionExp = new Date(
      new Date().getTime() + 1000 * 60 * 60 * 24, // One day in the future
    );
    const localStorageData = {
      user,
      sessionExp,
    }

    beforeEach(() => {
      global.Storage.prototype.getItem = jest.fn(
        (key) => JSON.stringify(localStorageData[key]),
      );
    });

    afterEach(() => {
      global.Storage.prototype.getItem.mockReset();
    });

    it('renders the create page form', () => {
      const DOM = create(<TestRouter path="/books/new" />).toJSON();
      expect(DOM).toMatchSnapshot();
    });
  });
});