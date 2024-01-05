import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Provide a valid email",
      ],
    },
    password: {
      type: String,
      require: true,
      selected: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("User_P3", userSchema);
