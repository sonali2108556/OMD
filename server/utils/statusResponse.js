import * as Constants from "../resources/constants.js";

const status = {
  [Constants.INFO_SUCCESS.value]: {
    message: Constants.omd.requestGranted,
    success: true,
    code: Constants.INFO_SUCCESS.code,
    type: Constants.INFO_SUCCESS.value,
  },
  [Constants.INFO_DENIED.value]: {
    message: Constants.omd.requestDenied,
    success: false,
    code: Constants.INFO_DENIED.code,
    type: Constants.INFO_DENIED.value,
  },
  [Constants.UNAUTHORIZED.value]: {
    message: Constants.omd.pleaseLogin,
    success: false,
    code: Constants.UNAUTHORIZED.code,
    type: Constants.UNAUTHORIZED.value,
  },
  [Constants.AUTH_FAILED_WEAK_PASSWORD.value]: {
    message: Constants.omd.notStrongPassword,
    success: false,
    code: Constants.AUTH_FAILED_WEAK_PASSWORD.code,
    type: Constants.AUTH_FAILED_WEAK_PASSWORD.value,
  },
  [Constants.AUTH_FAILED_EXISTS.value]: {
    message: Constants.omd.userAlreadyExists,
    success: false,
    code: Constants.AUTH_FAILED_EXISTS.code,
    type: Constants.AUTH_FAILED_EXISTS.value,
  },
  [Constants.AUTH_FAILED_WEAK_PASSWORD.value]: {
    message: Constants.omd.notStrongPassword,
    success: false,
    code: Constants.AUTH_FAILED_WEAK_PASSWORD.code,
    type: Constants.AUTH_FAILED_WEAK_PASSWORD.value,
  },
  [Constants.AUTH_SUCCESS_SIGNUP.value]: {
    message: Constants.omd.userSignupSuccess,
    success: true,
    code: Constants.AUTH_SUCCESS_SIGNUP.code,
    type: Constants.AUTH_SUCCESS_SIGNUP.value,
  },
  [Constants.UNKNOWN_ERROR.value]: {
    message: Constants.omd.unknownError,
    success: false,
    code: Constants.UNKNOWN_ERROR.code,
    type: Constants.UNKNOWN_ERROR.value,
  },
  [Constants.AUTH_FAILED_LOGIN.value]: {
    message: Constants.omd.loginFailed,
    success: false,
    code: Constants.AUTH_FAILED_LOGIN.code,
    type: Constants.AUTH_FAILED_LOGIN.value,
  },
  [Constants.AUTH_SUCCESS_LOGIN.value]: {
    message: Constants.omd.loginSuccess,
    success: true,
    code: Constants.AUTH_SUCCESS_LOGIN.code,
    type: Constants.AUTH_SUCCESS_LOGIN.value,
  },
  [Constants.AUTH_FAILED_INACTIVE.value]: {
    message: Constants.omd.inactiveUser,
    success: false,
    code: Constants.AUTH_FAILED_INACTIVE.code,
    type: Constants.AUTH_FAILED_INACTIVE.value,
  },
  [Constants.DELETE_DENIED.value]: {
    message: Constants.omd.requestDenied,
    success: false,
    code: Constants.DELETE_DENIED.code,
    type: Constants.DELETE_DENIED.value,
  },
  [Constants.DELETE_SUCCESS.value]: {
    message: Constants.omd.userDeletionSuccess,
    success: true,
    code: Constants.DELETE_SUCCESS.code,
    type: Constants.DELETE_SUCCESS.value,
  },
  [Constants.UPDATE_DENIED.value]: {
    message: Constants.omd.requestDenied,
    success: false,
    code: Constants.UPDATE_DENIED.code,
    type: Constants.UPDATE_DENIED.value,
  },
  [Constants.UPDATE_SUCCESS.value]: {
    message: Constants.omd.updateSuccess,
    success: true,
    code: Constants.UPDATE_SUCCESS.code,
    type: Constants.UPDATE_SUCCESS.value,
  },
  [Constants.ACCESS_DENIED.value]: {
    message: Constants.omd.accessDenied,
    success: false,
    code: Constants.ACCESS_DENIED.code,
    type: Constants.ACCESS_DENIED.value,
  },
  [Constants.OPERATION_SUCCESS.value]: {
    message: Constants.omd.operationSuccess,
    success: true,
    code: Constants.OPERATION_SUCCESS.code,
    type: Constants.OPERATION_SUCCESS.value,
  },
  [Constants.NOT_FOUND.value]: {
    message: Constants.omd.noData,
    success: false,
    code: Constants.NOT_FOUND.code,
    type: Constants.NOT_FOUND.value,
  },
};

export const statusResponse = (type) => {
  return status[type];
};

export const protectedService = (context, callback) => {
  const { auth } = context;
  if (auth) {
    return callback(auth);
  } else {
    return {
      data: null,
      status: statusResponse(Constants.UNAUTHORIZED.value),
    };
  }
};
