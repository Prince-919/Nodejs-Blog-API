import mongoose from "mongoose";
import { PostModel } from "./index.js";

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
    // plan: [
    //   {
    //     type: String,
    //     enum: ["Free", "Premium", "Pro"],
    //     default: "Free",
    //   },
    // ],
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

// Hooks
// pre-before record is save
userSchema.pre("findOne", async function (next) {
  this.populate({
    path: "posts",
  });
  const userId = this._conditions._id;
  const posts = await PostModel.find({ user: userId });
  const lastPost = posts[posts.length - 1];
  const lastPostDate = new Date(lastPost?.createdAt);
  const lastPostDateStr = lastPostDate.toDateString();
  userSchema.virtual("lastPostDate").get(function () {
    return lastPostDateStr;
  });

  /*------- check if user is inactive for 30 days ---------*/

  const currentDate = new Date();
  const diff = currentDate - lastPostDate;
  const diffInDate = diff / (1000 * 3600 * 24);
  if (diffInDate < 30) {
    userSchema.virtual("isInactive").get(function () {
      return true;
    });
    await UserModel.findByIdAndUpdate(
      userId,
      {
        isBlocked: true,
      },
      { new: true }
    );
  } else {
    userSchema.virtual("isInactive").get(function () {
      return false;
    });
    await UserModel.findByIdAndUpdate(
      userId,
      {
        isBlocked: false,
      },
      { new: true }
    );
  }

  // Last active Date
  const daysAgo = Math.floor(diffInDate);
  userSchema.virtual("lastActive").get(function () {
    if (daysAgo <= 0) {
      return "Today";
    }
    if (daysAgo === 1) {
      return "Yesterday";
    }
    if (daysAgo > 1) {
      return `${daysAgo} days ago`;
    }
  });

  /*-----------------------------------------------
   Update userAward based on the number of post
  --------------------------------------------- */

  const numberOfPosts = posts.length;
  if (numberOfPosts < 10) {
    await UserModel.findByIdAndUpdate(
      userId,
      {
        userAward: "Bronze",
      },
      { new: true }
    );
  }
  if (numberOfPosts > 10) {
    await UserModel.findByIdAndUpdate(
      userId,
      {
        userAward: "Silver",
      },
      { new: true }
    );
  }
  if (numberOfPosts > 20) {
    await UserModel.findByIdAndUpdate(
      userId,
      {
        userAward: "Gold",
      },
      { new: true }
    );
  }
  next();
});

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
