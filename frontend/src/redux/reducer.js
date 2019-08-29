import { ADD_MESS, ADD_MONGO_MESS, CHECK_LOGIN } from './types';

const initialState = {
  messTexts: [],
  allusers: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_MESS: {
      return {
        ...state,
        messTexts: [...state.messTexts, action.message]
      }
    }
    case ADD_MONGO_MESS: {
        return {
          ...state,
          messTexts: action.data
        }
    }
    case CHECK_LOGIN: {
      return {
        
      }
  }
    default:
      return state;
  }
}
