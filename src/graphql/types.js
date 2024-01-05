import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const UserType = new GraphQLObjectType({
  name: "User",
  description: "The user type",
  fields: {
    id: { type: GraphQLString },
    username: { type: GraphQLString },
  },
});

export const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post Type",
  fields: () => ({
    id: { type: GraphQLString },
    body: { type: GraphQLString },
    authorId: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.authorId);
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent) {
        return Comment.find({ postId: parent.id });
      },
    },
    createdAt: {
      type: GraphQLString,
      resolve(parent) {
        var DatePost = new Date(parent.createdAt);
        var DateNow = new Date();
        var Diference = DateNow - DatePost;
        var seconds = Math.floor(Diference / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
        var months = Math.floor(days / 31);
        var years = Math.floor(months/12);

        var resultado = "";

        if (years > 0) {
          resultado += years + " año" + (years !== 1 ? "s" : "");
        }
      
        if (months > 0) {
          resultado += (resultado !== "" ? ", " : "") + months + " mes" + (months !== 1 ? "es" : "");
        }
      
        if (days > 0 && years === 0 && months === 0) {
          resultado += (resultado !== "" ? ", " : "") + days + " día" + (days !== 1 ? "s" : "");
        }
      
        if (hours > 0 && years === 0 && months === 0 && days === 0) {
          resultado += (resultado !== "" ? ", " : "") + hours + " hora" + (hours !== 1 ? "s" : "");
        }
      
        if (minutes > 0 && years === 0 && months === 0 && days === 0 && hours === 0) {
          resultado += (resultado !== "" ? ", " : "") + minutes + " minuto" + (minutes !== 1 ? "s" : "");
        }
      
        if (seconds > 0 && years === 0 && months === 0 && days === 0 && hours === 0 && minutes === 0) {
          resultado += (resultado !== "" ? ", " : "") + seconds + " segundo" + (seconds !== 1 ? "s" : "");
        }
      
        return resultado !== "" ? resultado : "Recién ahora";

      
      }
    },
  }),
});
export const CommentType = new GraphQLObjectType({
  name: "CommentType",
  description: "Comment Type",
  fields: {
    id: { type: GraphQLString },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.userId);
      },
    },
    post: {
      type: PostType,
      resolve(parent) {
        return Post.findById(parent.postId);
      },
    },
    createdAt:{
      type: GraphQLString,
      resolve(parent) {
        var DatePost = new Date(parent.createdAt);
        var DateNow = new Date();
        var Diference = DateNow - DatePost;
        var seconds = Math.floor(Diference / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
        var months = Math.floor(days / 31);
        var years = Math.floor(months/12);

        var resultado = "";

        if (years > 0) {
          resultado += years + " año" + (years !== 1 ? "s" : "");
        }
      
        if (months > 0) {
          resultado += (resultado !== "" ? ", " : "") + months + " mes" + (months !== 1 ? "es" : "");
        }
      
        if (days > 0 && years === 0 && months === 0) {
          resultado += (resultado !== "" ? ", " : "") + days + " día" + (days !== 1 ? "s" : "");
        }
      
        if (hours > 0 && years === 0 && months === 0 && days === 0) {
          
          resultado += (resultado !== "" ? ", " : "") + hours + " hora" + (hours !== 1 ? "s" : "");
        }
      
        if (minutes > 0 && years === 0 && months === 0 && days === 0 && hours === 0) {
          resultado += (resultado !== "" ? ", " : "") + minutes + " minuto" + (minutes !== 1 ? "s" : "");
        }
      
        if (seconds > 0 && years === 0 && months === 0 && days === 0 && hours === 0 && minutes === 0) {
          resultado += (resultado !== "" ? ", " : "") + seconds + " segundo" + (seconds !== 1 ? "s" : "");
        }
      
        return resultado !== "" ? resultado : "Recién ahora";
        
       
      }
    }
  },
});
