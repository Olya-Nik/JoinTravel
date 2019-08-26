import { ADD_MESS, ADD_MONGO_MESS } from './types';

const addMessAC = messText => {
  return {
    type: ADD_MESS,
    message: messText
  };
};

const addMongoMessAC = data => {
  return {
    type: ADD_MONGO_MESS,
    data: data
  };
};

export { addMessAC, addMongoMessAC };
