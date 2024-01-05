import express from "express";
import { graphqlHTTP } from "express-graphql";
import {schema}  from "./graphql/schema.js";
import { connectDB } from "./db/index.js";
import cors from "cors";
import { FRONTEND_URI } from "./config.js";
import 'dotenv/config' 

const app = express();
app.use(
    "/graphql",
    cors({
        origin: FRONTEND_URI,
        credentials: true,
      }),
    graphqlHTTP({
        schema:schema,
        graphiql: true,
    })
    );
    connectDB();
    
    
app.listen(process.env.PORT);
console.log("Server listening on port 4000");
