import { buildSchema } from "graphql";

// GraphQL schema
const graphqlSchema = buildSchema(`
    type Query {
      hello(name: String): String
    }
  `);
  
  // GraphQL resolvers
  const graphqlRoot = {
      hello: ({ name }: { name?: string }) => {
          return `Hello ${name ?? 'World'} from GraphQL!`;
      },
  };

export { graphqlSchema, graphqlRoot };