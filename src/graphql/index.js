import {GraphQLSchema} from 'graphql';
import RootQueries from './queries';
import RootMutations from './mutations';


// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: GRAPHQL SCHEMA
export default new GraphQLSchema({
  query: RootQueries,
  mutation: RootMutations
});