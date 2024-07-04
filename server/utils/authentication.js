import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../model/users.js";

const secretKey = "12345-67890-09876-54321";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};
passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await User.findOne({ _id: payload._id });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

// Authenticates user using Bearer token present in the request Header.
export const verifyUser = (req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (err) reject(err);
      resolve(user);
    })(req, res);
  });

// An authorized user can perform all operations permitted to it and its lower lever users
// The roles array is in their level of access
// Higher index means lower level of access
export const roles = ["SUPERADMIN", "ADMIN", "MANAGER", "THIRDPARTY", "USER"];

// Restrictions to perform certain operations
// Superadmin operations
export const superAdminOps = (role) => {
  let index = roles.indexOf(role);
  return index === 0;
};
// Admin operations (can be performed by superadmin too)
export const adminOps = (role) => {
  let index = roles.indexOf(role);
  return index !== -1 && index <= 1;
};
// Manager operations (can be performed by superadmin and admin too)
export const managerOps = (role) => {
  let index = roles.indexOf(role);
  return index !== -1 && index <= 2;
};
// Third Party user operations (can be performed by superadmin, admin and manager too)
export const tpOps = (role) => {
  let index = roles.indexOf(role);
  return index !== -1 && index <= 3;
};
// Authorized user operations (can be performed by all logged in users)
export const userOps = (role) => {
  let index = roles.indexOf(role);
  return index !== -1 && index <= 4;
};

// Generate access token - parameters( userInfo, token expiry time defaulted to 1 hours)
export const getToken = (user, expiry = "1h") => {
  return jwt.sign(user, secretKey, {
    expiresIn: expiry,
  });
};
// Verify the access token
export const verifyToken = (token) => {
  try {
    var decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return false;
  }
};
// Update and Set meta data for user operations
export const setMeta = (type, old) => {
  const date = new Date();

  if (type === "signup") {
    return {
      lastLogin: date,
      lastPasswordChange: date,
      lastUpdated: date,
      createdAt: date,
    };
  }
  if (type === "login") {
    return {
      ...old,
      lastLogin: date,
    };
  }
  if (type === "update_user") {
    return {
      ...old,
      lastUpdated: date,
    };
  }
  return {};
};
