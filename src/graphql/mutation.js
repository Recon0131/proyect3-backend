import {
  GraphQLError,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import bcryptjs from "bcryptjs";
import User_P3 from "../models/User.js";
import { createJWT } from "../util/auth.js";
import Post from "../models/Post.js";
import { PostType, CommentType } from "./types.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Comment from "../models/Comment.js";
import 'dotenv/config' 

export const register = {
  type: GraphQLString,
  description: "Hello string",
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_, args) {
    const { username, email, password } = args;

    const userFound = await User_P3.findOne({ email });
    
    if (userFound) {
      throw new Error("This email address already exists");
    }
    
    const bcrptPassword = await bcryptjs.hash(password, 10);
    
    const newUser = new User_P3({ username, email, password: bcrptPassword });
    
    
    const res= await newUser.save();
    
    

    const token = createJWT({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });

    return token;
  },
};

export const login = {
  type: GraphQLString,
  description: "Login to GraphQL",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_, args) {
    const { email, password } = args;
    
    const userFound = await User_P3.findOne({ email }).select("+password");
    if (!userFound) {
      throw new Error("Invalid credentials");
    }
    const pass = bcryptjs.compare(password, userFound.password);

    if (!pass) {
      throw new Error("Invalid credentials");
    }

    const token = createJWT({
      _id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });

    return token;
  },
};

export const createPost = {
  type: PostType,
  description: "create a new blog post",
  args: {
    body: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, args) {
    const userFound = await User.findOne({ _id: args.authorId });
    if (!userFound) throw new Error("Unauthorized");

    const post = new Post({
      authorId: args.authorId,
      body: args.body,
    });
    return post.save();
  },
};

export const updatePost = {
  type: PostType,
  description: "Update a post",
  args: {
    id: { type: GraphQLString },
    body: { type: GraphQLString },
    token: { type: GraphQLString },
  },
  async resolve(_, { id, title, body, token }) {
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!verifyToken) throw new Error("Invalid token");
    

    const updatedPost = await Post.findOneAndUpdate(
      {
        _id: id,
        authorId: verifyToken._id,
      },
      {
        body,
      },
      {
        new: true,
      }
    );

    return updatedPost;
  },
};

export const deletePost = {
  type: GraphQLString,
  description: "Update a post",
  args: {
    id: { type: GraphQLString },
    token: { type: GraphQLString },
  },
  async resolve(_, { id, token }) {
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!verifyToken) throw new Error("Invalid token");

    const postDelete = await Post.findOneAndDelete({
      _id: id,
      authorId: verifyToken._id,
    });
    if (!postDelete) throw new Error("Invalid post delete");

    return "Post deleted";
  },
};

export const addComment = {
  type: CommentType,
  description: "Add a comment to your post",
  args: {
    comment: { type: GraphQLString },
    postId: { type: GraphQLString },
    token: { type: GraphQLString },
  },
  async resolve(_, { comment, postId, token }) {
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyToken);
    if (!verifyToken) throw new Error("Invalid token");
    const newComment = new Comment({
      comment,
      postId,
      userId: verifyToken._id,
    });
    return newComment.save();
  },
};

export const updateComment = {
  type: CommentType,
  description: "Update a comment ",
  args: {
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    token: { type: GraphQLString },
  },
  async resolve(_, { id, token, comment }) {
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!verifyToken) throw new Error("Invalid token");

    const commentUpdate = await Comment.findOneAndUpdate(
      {
        _id: id,
        userId: verifyToken._id,
      },
      {
        comment
      }
    );

    if (!commentUpdate) throw new Error("Couldn't find comment");

    return commentUpdate;
  },
};

export const deleteComment = {
  type: GraphQLString,
  description: "Delete a comment",
  args: {
    id: { type: GraphQLString },
    token: { type: GraphQLString },
  },
  async resolve(_, { id, token }) {
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyToken);
    if (!verifyToken) throw new Error("Invalid token");

    const CommentDeleted = await Comment.findOneAndDelete({
      _id: id,
      userId: verifyToken._id,
    });

    if(!CommentDeleted) throw new Error("Comment deleted failed");

    return "Comment deleted";
  },
};
