import {GraphQLSchema,GraphQLObjectType} from 'graphql'
import { hello,verify,posts,post } from './queries.js'
import {register,login,createPost,updatePost,deletePost,addComment,deleteComment,updateComment} from './mutation.js'

const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: " root query type",
    fields: {
      hello,
      verify,
      posts,
      post
    },
});

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "mutation type",
    fields:{
        register,
        login,
        createPost,
        updatePost,
        deletePost,
        addComment,
        deleteComment,
        updateComment
    }
});

export const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});
