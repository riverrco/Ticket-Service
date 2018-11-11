import mongoose from 'mongoose';
import config from '../../config';

const {MONGO_HOST,MONGO_PORT, MONGO_DB} = config;

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, { useNewUrlParser: true }, (err) => {
  if(err) {
    console.log('---------ERROR ON MONGODB CONNECTION-----------')
    console.log(err)
  }
  else {
    console.log('-------MONGO DB CONNECTED----------');
    console.log(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`);
    console.log('------------------------------------');
  }
  
});


export { mongoose };