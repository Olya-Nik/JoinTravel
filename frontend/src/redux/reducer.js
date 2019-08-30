import { ADD_MESS, ADD_MONGO_MESS, CHECK_LOGIN, LOGOUT } from './types';

const initialState = {
  messTexts: [],
  allusers: [],
  login: null,
  isLogged: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_MESS: {
      return {
        ...state,
        messTexts: [...state.messTexts, action.message]
      };
    }
    case ADD_MONGO_MESS: {
      return {
        ...state,
        messTexts: action.data
      };
    }
    case CHECK_LOGIN: {
      return {
        ...state,
        isLogged: true,
        login: action.login
      };
    }
    // case LOGIN: {
    //   return {
    //     ...state,
    //     isLogged: true,
    //     login: action.login
    //   };
    // }

    case LOGOUT: {
      return {
        initialState
      };
    }
    default:
      return state;
  }
}
