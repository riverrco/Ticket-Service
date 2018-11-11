import {GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLList } from 'graphql';
import {TicketService} from '../../services'
import handlers from './handlers';
import {TicketType} from '../types'

const {searchByTicketNumber, searchByUser} = handlers;

const RootQuery = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({

    // ::::::::::::::::::::::::::::::::::::::::::::::::: SEARCH BY TICKET NUBMER

    searchByTicketNumber: {
      type: TicketType,
      args: {ticketnumber : {type: new GraphQLNonNull(GraphQLString)}},
      async resolve(_, args) {
        try{
          const {ticketnumber} = args;
          return searchByTicketNumber(ticketnumber)
        }catch(err){
          return err
        }
      }
    },

    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::: SEARCH BY USER
    
    searchByUser: {
      type: new GraphQLList(TicketType),
      args: {token: {type: new GraphQLNonNull(GraphQLString)}},
      async resolve(_, args){
        try{
          const {token} = args;
          return await searchByUser(token);
        } catch(err){
          return err;
        }
      }
    }
  })
})

export default RootQuery;