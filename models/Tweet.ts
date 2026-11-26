
import mongoose, { Schema, model, models } from "mongoose";

const TweetSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
    },

    upvotes: {
      type: Number,
      default: 0,
    },

    downvotes: {
      type: Number,
      default: 0,
    },

    likedBy: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Tweet =
  models.Tweet || model("Tweet", TweetSchema);

export default Tweet;
