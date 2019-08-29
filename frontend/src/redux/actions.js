import { ADD_MESS, ADD_MONGO_MESS, CHECK_LOGIN, LOGOUT } from './types';

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
    login: loginUser
  };
};

const logoutAC = () => {
  return {
    type: LOGOUT
  }
}

export { addMessAC, addMongoMessAC, checkLoginAC, logoutAC };
