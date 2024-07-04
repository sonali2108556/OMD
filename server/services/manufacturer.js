import { managerOps, userOps } from "../utils/authentication.js";
import { protectedService, statusResponse } from "../utils/statusResponse.js";
import * as Constants from "../resources/constants.js";
import Manufacturer from "../model/manufacturer.js";

export const createManufacturerService = (context, manuData) => {
  return protectedService(context, async ({ _id, role }) => {
    if (managerOps(role)) {
      const result = await Manufacturer.create(manuData);
      return {
        data: result,
        status: statusResponse(Constants.OPERATION_SUCCESS.value),
      };
    } else {
      return {
        status: statusResponse(Constants.ACCESS_DENIED.value),
        data: null,
      };
    }
  });
};
export const manufacturerListServicePublic = async (context) => {
  const result = await Manufacturer.find({});
  return {
    data: result,
    status: statusResponse(Constants.INFO_SUCCESS.value),
  };
};
export const manufacturerListService = (context) => {
  return protectedService(context, async ({ role }) => {
    if (managerOps(role)) {
      const result = await Manufacturer.find({});
      return {
        data: result,
        status: statusResponse(Constants.INFO_SUCCESS.value),
      };
    } else {
      return {
        status: statusResponse(Constants.INFO_DENIED.value),
        data: null,
      };
    }
  });
};
export const manufacturerByIdService = (context, id) => {
  return protectedService(context, async ({ role }) => {
    if (userOps(role)) {
      const result = await Manufacturer.findById(id);
      return {
        data: result,
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
export const updatManufacturerService = (context, args) => {
  return protectedService(context, async ({ role }) => {
    if (managerOps(role)) {
      const res = await Manufacturer.findByIdAndUpdate(args.id, { $set: args }, { new: true });
      return {
        status: statusResponse(Constants.UPDATE_SUCCESS.value),
        data: res,
      };
    } else {
      return {
        data: null,
        status: statusResponse(Constants.UPDATE_DENIED.value),
      };
    }
  });
};
