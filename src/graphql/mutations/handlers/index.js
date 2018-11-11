import Redis from '../../../connectors/redis';
import {TicketService} from '../../../services';

const redis = new Redis();
const ticket = new TicketService();

export default {
  // :::::::::::::::::::::::::::::::::::: CREATE TICKET TICKET WITH SIGNED USER
  /**
   * Takes title description and token, first broadcasts the token with on token
   * channel, get values returns the result of the broadcast. Parsing it to 
   * JSON as user. If user is valid Ticket is created with the signed user;
   */

  createTicketWithUser: async ( title, description, token ) => {
    const publisher = await redis.publish('token', token);
    if(!publisher) throw new Error('Publishing Error');

    const result =  await redis.getValues('token');
    const user = JSON.parse(result[token]);
    if(user.isValid){
      const ticket = new TicketService({user: user.data});
      return await ticket.createNew({title, description});
    }
    else{
      throw new Error('Invalid Token')
    }
  },

  // :::::::::::::::::::::::::::::::::::::::::::::::: CREATE TICKET WITHOUT USER
  /**
   * takes name, surname, email, title, description parameters and creates 
   * ticket right away
   */

  createTicketUserless: async ({name, surname, email, title, description}) => {
    return await ticket.createNew({title, description}, {name, surname, email})
  },

  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: CHANGE STATUS
  /**
   * takes ticketnumber, status parementers and changes the status of related 
   * ticket
   */

  changeStatus: async({ticketnumber, status}) => {
    return await ticket.changeStatus({ticketnumber, status});
  },

  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: CUSTOMER REPLY
  /**
   * takes ticketnumber and message and and pushes the customers message to the
   * customerReply field
   */
  customerReply: async({ticketnumber, message}) => {
    return await ticket.reply({type: 'customer', message, ticketnumber});
  },
  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: CUSTOMER REPLY
  /**
   * takes ticketnumber message and realted to and pushes the company message to
   * the companyReply field. With the id number of customers message
   */
  companyReply: async({ticketnumber, message, relatedTo}) => {
    return await ticket.reply({type: 'company', message, ticketnumber, relatedTo});
  }
}
