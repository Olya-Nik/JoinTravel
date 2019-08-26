import { ADD_MESS, ADD_MONGO_MESS } from './types';

const initialState = {
  messTexts: [],
  allusers: []
};

export default function(state = initialState, action) {
  //console.log('Lllllll',action.message)
  switch (action.type) {
    case ADD_MESS: {
      return {
        messTexts: [...state.messTexts, action.message]
      }
    }
    case ADD_MONGO_MESS: {
        return {messTexts: action.data}
    }
    default:
      return state;
  }
}
