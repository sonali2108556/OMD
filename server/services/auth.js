import User from "../model/users.js";
import { adminOps, getToken, managerOps, setMeta, superAdminOps, userOps } from "../utils/authentication.js";
import { protectedService, statusResponse } from "../utils/statusResponse.js";
import * as Constants from "../resources/constants.js";
import isStrongPassword from "../utils/passwordStrength.js";

export const userByIdService = (context, id) => {
  return protectedService(context, async ({ _id, role }) => {
    if (id && id !== String(_id) && managerOps(role)) {
      try {
        const user = await User.findById(id);
        return {
          data: user,
          status: statusResponse(Constants.INFO_SUCCESS.value),
        };
      } catch (error) {
        return {
          data: null,
          status: statusResponse(Constants.UNKNOWN_ERROR.value),
        };
      }
    } else if ((id && id === String(_id)) || (!id && userOps(role))) {
      return {
        data: context.auth,
        status: statusResponse(Constants.INFO_SUCCESS.value),
      };
    } else {
      return {
        data: null,
        status: statusResponse(Constants.INFO_DENIED.value),
      };
    }
  });
};
export const userByMeService = (context) => {
  return protectedService(context, async ({ _id, role }) => {
    if (userOps(role)) {
      try {
        const user = await User.findById(_id);
        return {
          data: user,
          status: statusResponse(Constants.INFO_SUCCESS.value),
        };
      } catch (error) {
        return {
          data: null,
          status: statusResponse(Constants.UNKNOWN_ERROR.value),
        };
      }

    } else {
      return {
        data: null,
        status: statusResponse(Constants.INFO_DENIED.value),
      };
    }
  });
}
export const usersList = (context) => {
  return protectedService(context, async ({ role }) => {
    if (managerOps(role)) {
      const users = await User.find({}).sort({ createdAt: -1 });
      return {
        data: users,
        status: statusResponse(Constants.INFO_SUCCESS.value),
      };
    } else {
      return {
        data: null,
        status: statusResponse(Constants.INFO_DENIED.value),
      };
    }
  });
};
export const signUp = async (firstName, lastName, gender, email, password) => {
  const newUser = new User({
    username: email,
    firstName,
    lastName,
    gender,
    email,
    meta: setMeta("signup"),
  });
  if (!isStrongPassword(password)) {
    return {
      data: null,
      status: statusResponse(Constants.AUTH_FAILED_WEAK_PASSWORD.value),
    };
  }
  await newUser.setPassword(password);

  try {
    await newUser.save();

    const result = await User.authenticate()(email, password);

    result.user.token = getToken({ _id: result.user._id });

    return {
      data: result.user,
      status: statusResponse(Constants.AUTH_SUCCESS_SIGNUP.value),
    };
  } catch (error) {
    if (error.code === 11000) {
      return {
        data: null,
        status: statusResponse(Constants.AUTH_FAILED_EXISTS.value),
      };
    }
    return {
      data: null,
      status: statusResponse(Constants.UNKNOWN_ERROR),
    };
  }
};
export const logIn = async (email, password) => {
  const result = await User.authenticate()(email, password);
  if (result.user) {
    var user = await User.findById(result.user._id);

    if (user.isActive) {
      user.meta = setMeta("login", result.user.meta);
      user = await user.save();

      // console.log(result.user.meta, user.meta);
      user.meta = result.user.meta;
      user.token = getToken({ _id: user._id });
      return {
        data: user,
        status: statusResponse(Constants.AUTH_SUCCESS_LOGIN.value),
      };
    } else {
      return {
        data: null,
        status: statusResponse(Constants.AUTH_FAILED_INACTIVE.value),
      };
    }
  } else {
    return {
      data: null,
      status: statusResponse(Constants.AUTH_FAILED_LOGIN.value),
    };
  }
};
export const deleteUserService = (context, ids) => {
  return protectedService(context, async ({ _id, role }) => {
    if (ids && adminOps(role)) {
      const filteredIds = ids.filter((item) => String(item) !== String(_id));
      try {
        await User.deleteMany({ _id: { $in: filteredIds } });
        return {
          status: statusResponse(Constants.DELETE_SUCCESS.value),
          data: null,
        };
      } catch (error) {
        return {
          status: statusResponse(Constants.UNKNOWN_ERROR.value),
          data: null,
        };
      }
    } else {
      return {
        status: statusResponse(Constants.DELETE_DENIED.value),
        data: null,
      };
    }
  });
};
const updateHelper = async (update) => {
  try {
    const oldUser = await User.findById(update.id);

    update.meta = setMeta("update_user", oldUser.meta);
    const res = await User.findByIdAndUpdate(update.id, { $set: update }, { new: true });
    return {
      status: statusResponse(Constants.UPDATE_SUCCESS.value),
      data: res,
    };
  } catch (error) {
    return {
      status: statusResponse(Constants.UNKNOWN_ERROR.value),
      data: null,
    };
  }
};
export const updateUserService = (context, args) => {
  return protectedService(context, async ({ _id, role }) => {
    if (args.id === String(_id) && userOps(role)) {
      delete args["role"];
      delete args["permissions"];
      delete args["isActive"];
      return await updateHelper(args);
    } else if (args.id !== String(_id) && superAdminOps(role)) {
      return await updateHelper(args);
    } else if (args.id !== String(_id) && adminOps(role)) {
      delete args["role"];
      delete args["permissions"];
      return await updateHelper(args);
    } else {
      return {
        status: statusResponse(Constants.UPDATE_DENIED.value),
        data: null,
      };
    }
  });
};
