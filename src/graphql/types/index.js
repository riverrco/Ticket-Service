import {GraphQLList, GraphQLString, GraphQLObjectType, GraphQLID, GraphQLFloat } from 'graphql';

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::: CUSTOMER INFO TYPE

const CustomerInfoType = new GraphQLObjectType({
  name: 'customerInfo',
  fields: () => ({
    name: {type: GraphQLString},
    surname: {type: GraphQLString},
    email: {type: GraphQLString},
  })
});

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::CONTENT TYPE

const ContentType = new GraphQLObjectType({
  name: 'Content',
  fields: () => ({
    title: {type: GraphQLString},
    description: {type: GraphQLString},
  })
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::: CUSTOMER REPLY TYPE

const CustomerReplyType = new GraphQLObjectType({
  name: 'CustomerReply',
  fields: () => ({
    _id: {
      type: GraphQLID,
      resolve(p) {
        return p._id.toString();
      }
    },
    timeStamp: {type: GraphQLFloat},
    message: {type: GraphQLString}
  })
})

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::: COMPANY REPLY TYPE

const CompanyReplyType = new GraphQLObjectType({
  name: 'CompanyReply',
  fields: () => ({
    _id: {
      type: GraphQLID,
      resolve(p) {
        return p._id.toString();
      }
    },
    timeStamp: {type: GraphQLFloat},
    relatedTo: {type: GraphQLString},
    message: {type: GraphQLString}
  })
})

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::TICKET TYPE

const TicketType = new GraphQLObjectType({
  name: 'getTicket',
  fields: () => ({
    _id: {
      type: GraphQLID,
      resolve(p) {
        return p._id.toString();
      }
    },
    ticketnumber: {type: GraphQLString},
    belongsTo: {type: GraphQLString},
    customerInfo: {type: CustomerInfoType},
    status: {type: GraphQLString},
    content: {type: ContentType},
    customerReply: {type: new GraphQLList(CustomerReplyType)},
    companyReply: {type: new GraphQLList(CompanyReplyType)},
  })
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: EXPORTS

export {
  CustomerInfoType,
  ContentType,
  CustomerReplyType,
  CompanyReplyType,
  TicketType
}