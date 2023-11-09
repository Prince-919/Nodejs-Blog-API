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
      // required: [true, "Post category is required"],
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
    user: {
      type: ObjectId,
      ref: "User",
      required: [true, "Please Author is required"],
    },
    photo: {
      type: String,
      // required: [true, "Post Image is required"],
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", postSchema);
export default PostModel;
