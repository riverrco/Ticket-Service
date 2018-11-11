import {mongoose} from '../../../connectors/mongo';

const {Schema} = mongoose


const customerMessage = {
  id: Schema.Types.ObjectId,
  timeStamp: Number,
  message: {
    type: String,
    trim: true,
    minlength: 10,
    maxlength: 5000
  }
};

const companyReply = {
  id: Schema.Types.ObjectId,
  timeStamp: Number,
  relatedTo: String,
  message: {
    type: String,
    trim: true,
    minlength: 10,
    maxlength: 5000
  }
};

const TicketModel = new mongoose.Schema({
  
  ticketnumber: {
    required: true,
    type: String
  },

  belongsTo: String,

  customerInfo: {
    name: String,
    surname: String,
    email: String
  },

  status: {
    type: String,
    required: true,
    default: 'inprogress'
  },

  content: {
    title: {
      type: String,
      trim: true,
      required: true,
      minlength: 10,
      maxlength: 100
    },
    description: {
      type: String,
      trim: true,
      required: true,
      minlength: 10,
      maxlength: 5000
    },
    
  },
  
  customerReply: [customerMessage],

  companyReply: [companyReply]
});

const model = mongoose.model('tickets', TicketModel);

export default model;

