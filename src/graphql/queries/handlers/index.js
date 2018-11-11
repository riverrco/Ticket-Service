import {TicketService} from '../../../services';
import Redis from '../../../connectors/redis';

const redis = new Redis();

export default { 
  // ::::::::::::::::::::::::::::::::::::::::::::::::::: SEARCH BY TICKET NUMBER
  /**
   * takes ticket number and tries to find any cases realted to that ticket 
   */

  searchByTicketNumber: async(ticketnumber) => {
    const ticket = new TicketService();
    const result = await ticket.getTicket({ticketnumber});
    return result[0];
  },

  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: SEARCH BY USER
  /**
   * takes token brodcasts the token on token channel. if value returns from 
   * auth service checks if the user valid, if valid returns the tickets of the
   * user.
   */
  searchByUser: async(token) => {
    const publisher = await redis.publish('token', token)
    if(!publisher) throw new Error('Publishing Error')
    
    const result =  await redis.getValues('token');
    const user = JSON.parse(result[token]);
    if(user.isValid){
      const ticket = new TicketService({user: user.data});
      const result = await ticket.getTicket({type:'user'});
      return result;
    }
    else{
      throw new Error('Invalid Token')
    }
  }
}