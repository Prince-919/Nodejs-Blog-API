import mongoose from "mongoose";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new Schema(
  {
    post: {
      type: ObjectId,
      ref: "Post",
      required: [true, "Post is required"],
    },
    user: {
      type: ObjectId,
      required: [true, "User is required"],
    },
    description: {
      type: String,
      required: [true, "Comment description is required"],
    },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("Comment", commentSchema);
export default CommentModel;
