import Commodity from "../model/commodity.js";
import { adminOps, managerOps, userOps } from "../utils/authentication.js";
import { protectedService, statusResponse } from "../utils/statusResponse.js";
import * as Constants from "../resources/constants.js";

export const commodityByIdService = (context, id) => {
  return protectedService(context, async ({ role }) => {
    if (managerOps(role)) {
      const result = (await Commodity.findOne({ _id: id })).populate("manufacturer");
      return {
        data: result,
        status: statusResponse(Constants.INFO_SUCCESS.value),
      };
    } else {
      const result = (await Commodity.findOne({ _id: id, active: true, approved: true })).populate("manufacturer");
      return {
        data: result,
        status: statusResponse(Constants.INFO_SUCCESS.value),
      };
    }
  });
};
export const commodityListService = (context) => {
  return protectedService(context, async ({ role }) => {
    if (managerOps(role)) {
      const result = await Commodity.find({}).populate("manufacturer");
      return {
        data: result,
        status: statusResponse(Constants.INFO_SUCCESS.value),
      };
    } else {
      const result = await Commodity.find({ active: true, approved: true }).populate("manufacturer");
      return {
        data: result,
        status: statusResponse(Constants.INFO_SUCCESS.value),
      };
    }
  });
};
export const commodityListServicePublic = async(context) => {
   
      const result = await Commodity.find({ active: true, approved: true }).populate("manufacturer");
      return {
        data: result,
        status: statusResponse(Constants.INFO_SUCCESS.value),
      };
    
};

export const commodityByIdServicePublic = async(context,id) => {
   
  const result = (await Commodity.findOne({ code: id, active: true, approved: true })).populate("manufacturer");
      return {
        data: result,
        status: statusResponse(Constants.INFO_SUCCESS.value),
      };

};


function generateCode(name, batchNo) {
  // Concatenate name and batchNo with a hyphen
  let code = `${name}-${batchNo}`;

  // Replace spaces and special characters with hyphens
  code = code.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

  // Convert to lowercase
  code = code.toLowerCase();

  return code;
}
export const createCommodityService = (context, commodityData) => {
  return protectedService(context, async ({ _id, role }) => {
    if (managerOps(role)) {
      commodityData.code = generateCode(commodityData.name, commodityData.batchNo);

      const result = (await Commodity.create(commodityData)).populate("manufacturer");
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

export const updateCommodityService = (context, args) => {
  return protectedService(context, async ({ role }) => {
    const oldData = await Commodity.findById(args.id);

    if (oldData) {
      let code = oldData.code;
      if (args.name && args.batchNo) {
        code = generateCode(args.name, args.batchNo);
      } else if (args.name) {
        code = generateCode(args.name, oldData.batchNo);
      } else {
        code = generateCode(oldData.name, args.batchNo);
      }
      args.code = code;
      if (adminOps(role)) {
        const res = (await Commodity.findByIdAndUpdate(args.id, { $set: args }, { new: true })).populate(
          "manufacturer"
        );
        return {
          status: statusResponse(Constants.UPDATE_SUCCESS.value),
          data: res,
        };
      } else if (managerOps(role)) {
        delete args["active"];
        delete args["approved"];

        const res = (await Commodity.findByIdAndUpdate(args.id, { $set: args }, { new: true })).populate(
          "manufacturer"
        );
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
    } else {
      return {
        status: statusResponse(Constants.NOT_FOUND.value),
        data: null,
      };
    }
  });
};

export const getCommodityDataService = async (context) => {
  const commodities = await Commodity.find({ active: true, approved: true }).populate("manufacturer");

  const categories = [...new Set(commodities.map((commodity) => commodity.category))];
  const compositions = [...new Set(commodities.flatMap((commodity) => commodity.content.composition))];
  const types = [...new Set(commodities.map((commodity) => commodity.type))];

  const result = {
    categories,
    commodities,
    compositions,
    types,
  };
  return {
    data: result,
    status: statusResponse(Constants.INFO_SUCCESS.value),
  };
};
