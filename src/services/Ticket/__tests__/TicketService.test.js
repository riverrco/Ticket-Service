import {Ticket} from '../index';


describe('Ticket Service', () => {
  test('Initialize the Ticket Service', () => {
    const ticket = new Ticket({model: () => {}, user: {id: 2}});
    expect(typeof ticket.model).toEqual('function');
    expect(ticket.user).toEqual({id: 2})
  });

  test('Should return new ticket created with user id', async() => {
    const mock = () => ({
      save: () => ({ticketnumber: '231'})
    })
    const ticket = new Ticket({model: mock, user: {id: '123', name: 'Halil', surname: 'Irmak', email: 'test@test.com'}});
    expect(ticket.createNew({title: 'test123', description: 'test123'})).toEqual({ticketnumber: '231'})
  });

  test('Should return new ticket created with user info', async() => {
    const mock = () => ({
      save: () => ({ticketnumber: '231'})
    })
    const ticket = new Ticket({model: mock});
    expect(ticket.createNew({title: 'test123', description: 'test123'}, {name: "halil", surname: 'Irmak', email: 'test@test'})).toEqual({ticketnumber: '231'})
  });


  test('Change the status', async() => {
    const mock = {
      findOneAndUpdate: () => ({status: 'resolved'})
    }
    const ticket = new Ticket({model: mock});
    expect(ticket.changeStatus({id: '123', status: 'resolved'})).toEqual({status: 'resolved'})
  });
  
  test('Reply for custumer type', async () => {
    const mock = {
      findOneAndUpdate: () => ({status: 'resolved'})
    };
    const ticket = new Ticket({model: mock});
    expect(ticket.reply({type: 'customer'})).toEqual({status: 'resolved'})
  });

  test('Reply for company type', async () => {
    const mock = {
      findOneAndUpdate: () => ({status: 'resolved'})
    };
    const ticket = new Ticket({model: mock});
    expect(ticket.reply({type: 'company'})).toEqual({status: 'resolved'})
  });

  test('Get the ticket with ticket number', async () => {
    const mock = {
      find: () => ({status: 'resolved'})
    };
    const ticket = new Ticket({model: mock});
    expect(ticket.getTicket({ticketnumber: '123123'})).toEqual({status: 'resolved'})
  });

  test('Get the ticket with userid number', async () => {
    const mock = {
      find: () => ({status: 'resolved'})
    };
    const ticket = new Ticket({model: mock});
    expect(ticket.getTicket({user:{id: 1}, type: 'user'})).toEqual({status: 'resolved'})
  });
})