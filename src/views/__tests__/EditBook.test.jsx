import React from 'react';
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom';
import Routes from '../../Routes';

const { act } = renderer;

function TestRouter({ path }) {
  return (
    <MemoryRouter initialEntries={[ path ]}>
      <Routes />
    </MemoryRouter>
  );
}

const responseObj = {
    data: {
      data: {
        id: 2,
        name: 'book',
        ISBN: '988718927312',
        editorial: 'responseLastName2',
        pages_number: 'response_test2@email.cl',
        author: 'responseDescription2',
        genre: 'hola',
      },
    },
  };

jest.mock('../../hooks/calls', () => ({
    getBookRoute: () => responseObj,
}));

describe('User Profile', () => {
  describe('When there is a normal user', () => {
    const user = {
      access_token: 'TestToken',
      token_type: 'Bearer',
      user: {
        id: 1,
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
    };

    beforeEach(() => {
      global.Storage.prototype.getItem = jest.fn(
        (key) => JSON.stringify(localStorageData[key]),
      );
    });

    afterEach(() => {
      global.Storage.prototype.getItem.mockReset();
    });

    it('should redirect to home page', async () => {
      let testRenderer;

      act(() => {
        testRenderer = renderer.create(<TestRouter path="/edit-book/2"/>);
      })

      await act(async () => {});

      const DOM = testRenderer.toJSON();
      expect(DOM).toMatchSnapshot();
    });
  });

  describe('When there is an admin user', () => {
    const user = {
      access_token: 'TestToken',
      token_type: 'Bearer',
      user: {
        id: 1,
        username: 'testUserName',
        first_name: 'testFirstName',
        last_name: 'testLastName',
        email: 'test@email.cl',
        description: 'testDescription',
        is_admin: true
      },
    };
    const sessionExp = new Date(
      new Date().getTime() + 1000 * 60 * 60 * 24, // One day in the future
    );
    const localStorageData = {
      user,
      sessionExp,
    };

    beforeEach(() => {
      global.Storage.prototype.getItem = jest.fn(
        (key) => JSON.stringify(localStorageData[key]),
      );
    });

    afterEach(() => {
      global.Storage.prototype.getItem.mockReset();
    });

    it('should renders the edit book page', async () => {
      let testRenderer;

      act(() => {
        testRenderer = renderer.create(<TestRouter path="/edit-book/2"/>);
      })

      await act(async () => {});

      const DOM = testRenderer.toJSON();
      expect(DOM).toMatchSnapshot();
    });
  });
});