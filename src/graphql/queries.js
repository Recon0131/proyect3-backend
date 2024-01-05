import { GraphQLError, GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { PostType, UserType } from "./types.js";
import jwt from "jsonwebtoken";
import Post from "../models/Post.js";

export const hello = {
  type: GraphQLString,
  description: "Hello string",
  resolve: () => "Hello",
};

export const verify = {
  type: UserType,
  description: " query verify token",
  args: {
    token: { type: GraphQLString },
  },
  async resolve(_, args) {
    const { token } = args;

    if (!token) {
      throw new GraphQLError("Token don't exist", {
        extensions: { code: "YOUR_ERROR_CODE" },
      });
    }
    try {
      const decoded = jwt.verify(token, "secret1223");

      if (decoded && decoded._id && decoded.username && decoded.email) {
        
        return {
          id: decoded._id,
          username: decoded.username,
          email: decoded.email,
        };
        
      } else {
        throw new GraphQLError("Invalid token", {
          extensions: { code: "YOUR_ERROR_CODE" },
        });
      }
    } catch (error) {
      console.error("Token verification error:", error);
      throw new GraphQLError("Invalid token", { code: "INVALID_TOKEN" });
    }
  },
};

export const posts = {
  type: new GraphQLList(PostType),
  description: "Get a list",
  resolve: async () => {
    const posts = Post.find();
    return (await posts).reverse()
  },
};
export const post = {
  type: PostType,
  description: "Get a post by id",
  args: {
    id: { type:GraphQLString },
  },
  async resolve(_, args) {
    const post = await Post.findById(args.id);

    return post;
  },
};
