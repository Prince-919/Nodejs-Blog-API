import mongoose from "mongoose";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Post description is required"],
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: [true, "Post category is required"],
    },
    numViews: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    disLikes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: ObjectId,
        ref: "Comment",
      },
    ],
    user: {
      type: ObjectId,
      ref: "User",
      required: [true, "Please Author is required"],
    },
    photo: {
      type: String,
      required: [true, "Post Image is required"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// Hook
postSchema.pre(/^find/, function (next) {
  // add views count as virtual field
  postSchema.virtual("viewsCount").get(function () {
    const post = this;
    return post.numViews.length;
  });
  // add likes count as virtual field
  postSchema.virtual("likesCount").get(function () {
    const post = this;
    return post.likes.length;
  });
  // add dislikes count as virtual field
  postSchema.virtual("disLikesCount").get(function () {
    const post = this;
    return post.disLikes.length;
  });
  // check the most liked post in percentage
  postSchema.virtual("likesPercentage").get(function () {
    const post = this;
    const total = +post.likes.length + +post.disLikes.length;
    const percentage = (post.likes.length / total) * 100;
    return `${percentage}%`;
  });
  // check the most disLiked post in percentage
  postSchema.virtual("disLikesPercentage").get(function () {
    const post = this;
    const total = +post.disLikes.length + +post.disLikes.length;
    const percentage = (post.disLikes.length / total) * 100;
    return `${percentage}%`;
  });
  //if days is less 0 return today if days is 1 return yesterday else return days ago
  postSchema.virtual("daysAgo").get(function () {
    const post = this;
    const date = new Date(post?.createdAt);
    const daysAgo = Math.floor((Date.now() - date) / 86400000);
    return daysAgo === 0
      ? "Today"
      : daysAgo === 1
      ? "Yesterday"
      : `${daysAgo} days ago`;
  });
  next();
});

const PostModel = mongoose.model("Post", postSchema);
export default PostModel;
