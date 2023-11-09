import mongoose from "mongoose";

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "First name is required"],
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
    },
    profilePhoto: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Guest", "Editor"],
    },
    viewers: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: ObjectId,
        ref: "Post",
      },
    ],
    blocked: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    plan: [
      {
        type: String,
        enum: ["Free", "Premium", "Pro"],
        default: "Free",
      },
    ],
    userAward: [
      {
        type: String,
        enum: ["Bronze", "Silver", "Gold"],
        default: "Bronze",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// get fullName
userSchema.virtual("fullname").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

// get initials name
userSchema.virtual("initials").get(function () {
  return `${this.firstname[0]}${this.lastname[0]}`;
});

// get post counts
userSchema.virtual("postCounts").get(function () {
  return this.posts.length;
});

// get followers count
userSchema.virtual("followersCount").get(function () {
  return this.followers.length;
});

// get following count
userSchema.virtual("followingCount").get(function () {
  return this.following.length;
});

// get viewers count
userSchema.virtual("viewersCount").get(function () {
  return this.viewers.length;
});

// get blocked count
userSchema.virtual("blockedCount").get(function () {
  return this.blocked.length;
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
