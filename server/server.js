const { GraphQLServer,PubSub } = require("graphql-yoga");
const messages = [];
//! means the type is require
const typeDefs = `
  type Message {
    id: ID!
    user: String!
    content: String!
  }
  type Query {
    messages: [Message!]
  }
  type Mutation{
    postMessage(user:String!,content:String!):ID!
  }
  type Subscription{
    messages: [Message!]
  }
`;
const resolvers = {
  Query:{
    messages: ()=>messages,
  },
  Mutation:{
    postMessage:(parent,{user,content})=>{
      const id = messages.length;
      messages.push({
        id,
        user,
        content,
      });
      return id;
    }
  },
  Subscription:{
    
  }
}

const server = new GraphQLServer({typeDefs,resolvers});

server.start(({ port }) => {
  console.log(`Server on http://localhost:${port}/`);
});
