import { Model, Schema, model, models } from "mongoose";

// const ObjectWithPostSchema = new Schema({
//   post: {
//     type: Schema.ObjectId,
//     ref: "Post",
//   },
// });

interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  emailVerified: boolean;
  comments: string[];
  reviews: string[];
  views: string[];
  favorite: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema({
  name: String,
  email: String,
  image: String,
  emailVerified: Boolean,
  comments: [String],
  reviews: [String],
  views: [String],
  favorite: [String],
  createdAt: Date,
  updatedAt: Date,
});

const User: Model<IUser> = models?.User || model<IUser>("User", UserSchema);

export default User;
