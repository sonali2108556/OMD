import { adminOps, managerOps, userOps } from "../utils/authentication.js";
import { protectedService, statusResponse } from "../utils/statusResponse.js";
import * as Constants from "../resources/constants.js";
import { Widget } from "../model/widgets.js";

export const widgetByIdService = (context, id) => {
  return protectedService(context, async ({ role }) => {
    if (userOps(role)) {
      const result = await Widget.findOne({ _id: id });
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
export const widgetListService = (context) => {
  return protectedService(context, async ({ role }) => {
    if (userOps(role)) {
      const result = await Widget.find({});
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

export const widgetLinkTo = (title) => {
  return (
    "/logging/" +
    title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
  );
};
export const createWidgetService = (context, widgetData) => {
  return protectedService(context, async ({ _id, role }) => {
    if (managerOps(role)) {
      widgetData.to = widgetLinkTo(widgetData.title);

      const result = await Widget.create(widgetData);
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

export const updateWidgetService = (context, args) => {
  return protectedService(context, async ({ role }) => {
    const oldData = await Widget.findById(args.id);

    if (oldData) {
      if (managerOps(role)) {
        if (args.title) {
          args.to = widgetLinkTo(args.title);
        }
        const res = await Widget.findByIdAndUpdate(args.id, { $set: args }, { new: true });
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
