import { Document, Model, Schema, model, models } from "mongoose";

interface IComment {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    image?: string;
  };
  content: string;
  createdAt: Date;
}

interface IReview {
  _id: string;
  user: string;
  rating: number;
}

interface IPost extends Document {
  slug: string;
  comments: IComment[];
  reviews: IReview[];
  views: string[];
  favorites: string[];
}

const CommentSchema = new Schema({
  _id: Schema.ObjectId,
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const ReviewSchema = new Schema({
  _id: Schema.ObjectId,
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  rating: Number,
});

const PostSchema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  comments: [CommentSchema],
  reviews: [ReviewSchema],
  views: [String],
  favorites: [String],
});

// PostSchema.statics.findOrCreate = async function (slug: string) {
//   let post = await this.findOne({ slug });

//   if (!post) {
//     post = await this.create({
//       slug,
//       comments: [],
//       reviews: [],
//       views: [],
//       favorites: [],
//     });
//   }

//   return post;
// };

const Post: Model<IPost> = models?.Post || model<IPost>("Post", PostSchema);

export default Post;
