import {GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLID} from 'graphql';
import {TicketType} from '../types';
import handlers from './handlers'

const {createTicketWithUser, createTicketUserless, changeStatus, customerReply, companyReply} = handlers;


const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({

    // :::::::::::::::::::::::::::::::::::::::::::::: CREATE TICKET WITHOUT USER
    
    createTicketUserless: {
      type: TicketType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        surname: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)}
      },
      async resolve(_, args){
        try{
          const { name, surname, email, title, description } = args;
          return createTicketUserless({name, surname, email, title, description});
        } catch(err) {
          return err;
        }
      }
    },

    // ::::::::::::::::::::::::::::::::::::::::::::::::: CREATE TICKET WITH USER

    createTickeWithUser: {
      type: TicketType,
      args: {
        title: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        token: {type: new GraphQLNonNull(GraphQLString)}
      },
      async resolve (_, args) {
       try {
        const { title, description, token } = args;
        return await createTicketWithUser( title, description, token );
       } catch(err){
         return err;
       }
      }
    },

    // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: CHANGE STATUS


    changeStatus: {
      type: TicketType,
      args: {
        ticketnumber: {type: new GraphQLNonNull(GraphQLString)},
        status: {type: new GraphQLNonNull(GraphQLString)},
      },
      async resolve(_, args){
        try{
          const {ticketnumber, status} = args;
          return await changeStatus({ticketnumber, status});
        } catch(err) {
          return err;
        }
      }
    },

    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::: CUSTOMER REPLY

    customerReply: {
      type: TicketType,
      args: {
        ticketnumber: {type: new GraphQLNonNull(GraphQLString)},
        message: {type: new GraphQLNonNull(GraphQLString)},
      },
      async resolve(_, args){
        try{
          const {ticketnumber, message} = args;
          return await customerReply({ticketnumber, message})
        } catch (err){
          return err
        }
      }
    },

    // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: COMPANY REPLY

    
    companyReply: {
      type: TicketType,
      args: {
        ticketnumber: {type: new GraphQLNonNull(GraphQLString)},
        message: {type: new GraphQLNonNull(GraphQLString)},
        relatedTo: {type: new GraphQLNonNull(GraphQLString)},
      },
      async resolve(_, args){
        try{
          const {ticketnumber, message, relatedTo} = args;
          return await companyReply({ticketnumber, message, relatedTo});
        } catch (err) {
          return err
        }
      }
    }
  })
})

export default Mutations;