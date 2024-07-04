import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
const Schema = mongoose.Schema;

const defaultAvatar = ["male_avatar.webp", "female_avatar.webp"];
const defaultPermissions = ["READ", "CREATE", "UPDATE"];
const defaultRole = "USER";

const metaSchema = new Schema({
  lastLogin: {
    type: Date,
    default: new Date(),
  },
  lastPasswordChange: {
    type: Date,
    default: new Date(),
  },
  lastUpdated: {
    type: Date,
    default: new Date(),
  },
});

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    phone: {
      type: String,
      default: "",
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      default: '',
    },
    avatar: {
      type: Array,
      default: defaultAvatar,
    },
    role: {
      type: String,
      default: defaultRole,
    },
    permissions: {
      type: Array,
      default: defaultPermissions,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    meta: {
      lastLogin: {
        type: Date,
        default: new Date(),
      },
      lastPasswordChange: {
        type: Date,
        default: new Date(),
      },
      lastUpdated: {
        type: Date,
        default: new Date(),
      },
      createdAt: {
        type: Date,
        default: new Date(),
      },
    },
  },
  {
    timestamps: true,
  }
);
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

export default User;
