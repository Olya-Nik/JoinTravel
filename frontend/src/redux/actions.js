import { ADD_MESS, ADD_MONGO_MESS, CHECK_LOGIN } from './types';

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

const checkLoginAC = loginUser => {
  return {
    type: CHECK_LOGIN,
    loginUser: loginUser
  };
};

export { addMessAC, addMongoMessAC, checkLoginAC };
