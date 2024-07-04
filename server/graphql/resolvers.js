import {
  deleteUserService,
  userByMeService,
  logIn,
  signUp,
  updateUserService,
  userByIdService,
  usersList,
} from "../services/auth.js";
import {
  commodityByIdService,
  commodityListService,
  updateCommodityService,
  createCommodityService,
  getCommodityDataService,
  commodityListServicePublic,
  commodityByIdServicePublic,
} from "../services/commodity.js";
import {
  createManufacturerService,
  manufacturerByIdService,
  manufacturerListService,
  updatManufacturerService,
  manufacturerListServicePublic,
} from "../services/manufacturer.js";
import { createWidgetService, updateWidgetService, widgetByIdService, widgetListService } from "../services/widgets.js";
import { cartListService } from "../services/cart.js";
import { cartByIdService } from "../services/cart.js";
import { addItemCartService } from "../services/cart.js";
import { deleteFromCartService } from "../services/cart.js";
import { createOrderService, orderByIdService, orderListService, updateOrderService } from "../services/orders.js";

const resolvers = {
  User: {
    id: (parent) => parent._id,
  },
  Query: {
    async userById(_, { id }, context) {
      return userByIdService(context, id);
    },
    async userByMe(_, __, context) {
      return userByMeService(context);
    },

    async userDTO(_, __, context) {
      return usersList(context);
    },
    async manufacturerList(_, __, context) {
      return manufacturerListService(context);
    },
    async manufacturerListPublic(_, __, context) {
      return manufacturerListServicePublic(context);
    },
    async manufacturerById(_, { id }, context) {
      return manufacturerByIdService(context, id);
    },
    async commodityById(_, { id }, context) {
      return commodityByIdService(context, id);
    },
    async commodityByIdPublic(_, { id }, context) {
      return commodityByIdServicePublic(context, id);
    },
    async commodityList(_, __, context) {
      return commodityListService(context);
    },
    async commodityListPublic(_, __, context) {
      return commodityListServicePublic(context);
    },
    async getCommodityData(_, __, context) {
      return getCommodityDataService(context);
    },
    async widgetById(_, { id }, context) {
      return widgetByIdService(context, id);
    },
    async widgetList(_, __, context) {
      return widgetListService(context);
    },
    async cartList(_, __, context) {
      return cartListService(context);
    },
    async cartById(_, __, context) {
      return cartByIdService(context);
    },
    async orderList(_, __, context) {
      return orderListService(context);
    },
    async orderById(_, { id }, context) {
      return orderByIdService(context, id);
    },
  },
  Mutation: {
    async createUser(_, { firstName, lastName, gender, email, password }, context) {
      return await signUp(firstName, lastName, gender, email, password);
    },
    async loginUser(_, { email, password }, context) {
      return await logIn(email, password);
    },
    async deleteUser(_, { ids }, context) {
      return deleteUserService(context, ids);
    },
    async updateUser(_, { newData }, context) {
      return updateUserService(context, newData);
    },
    async createManufacturer(_, { manufacturerData }, context) {
      return createManufacturerService(context, manufacturerData);
    },
    async updateManufacturer(_, { newData }, context) {
      return updatManufacturerService(context, newData);
    },
    async createCommodity(_, { commodityData }, context) {
      return createCommodityService(context, commodityData);
    },
    async updateCommodity(_, { commodityData }, context) {
      return updateCommodityService(context, commodityData);
    },
    async createWidget(_, { widgetData }, context) {
      return createWidgetService(context, widgetData);
    },
    async updateWidget(_, { widgetData }, context) {
      return updateWidgetService(context, widgetData);
    },
    async addItemCart(_, args, context) {
      return addItemCartService(context, args);
    },
    async deleteFromCart(_, args, context) {
      return deleteFromCartService(context, args);
    },
    async createOrder(_, args, context) {
      return createOrderService(context,args);
    },
    async updateOrder(_, args, context) {
      return updateOrderService(context, args);
    },
  },
};

export default resolvers;
