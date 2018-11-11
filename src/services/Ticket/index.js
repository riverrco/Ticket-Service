import Model from '../../models/mongo/TicketModel';
import uuid from 'uuid/v4';


class Ticket {
  constructor({model, user} = {}){
    this.model = model || Model;
    this.user = user || null;
    
  }
  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::: CREATE NEW TICKET
  /**
   * check if user exists in constructor. If it does use the related user id 
   * and create unique ticket for the user, if it does not get the related
   * informations from user and save it.
   */
  createNew(content, user){
    const {title, description} = content;
    if(this.user){
      const {id, name, surname, email} = this.user;
      const ticket = new this.model({
        ticketnumber: uuid(),
        belongsTo: id,
        customerInfo: {name, surname, email},
        content: {title, description}
      });
      return ticket.save();
    }
    const {name, surname, email} = user;  
    const ticket = new this.model({
      ticketnumber: uuid(),
      customerInfo: {name, surname, email},
      content: {title, description}
    });
    return ticket.save();
  }

  // ::::::::::::::::::::::::::::::::::::::::::::::::::: CHANGE STATUS OF TICKET
  /**
   * takes id and status and sets the status to new one
   */

  changeStatus({ticketnumber, status}) {
    return this.model.findOneAndUpdate({ticketnumber}, {$set: {status}}, {new: true});
  }

  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: REPLY OF TICKET
  /**
   * takes type and checks if customer or company, depends on the type pushes the
   * reply to the related ticket number. 
   */

  reply({type, message, relatedTo, ticketnumber}){
    switch(type){
      case 'customer':
        return this.model.findOneAndUpdate({ticketnumber}, {$push: {
          customerReply: {status: 'pending',timeStamp: new Date().getTime(),
            message}}
          }, {new: true});
      case 'company':
        return this.model.findOneAndUpdate({ticketnumber}, {$push: {
          companyReply: {status: 'pending',timeStamp: new Date().getTime(),
            message, relatedTo}}
          }, {new: true});
    }
  }

  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: GET TICKET INFO
  /**
   * takes ticket number and type, depends of the type, if type is userid returns
   * all documenets related user, if ticketnumber returns related ticket.
   */

  getTicket({ticketnumber, type}){
    const getBy = type === 'user' ? {belongsTo: this.user.id} : {ticketnumber};
    return this.model.find(getBy);
  }

}

export {Ticket};

