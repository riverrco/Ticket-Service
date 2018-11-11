import express from 'express';
import osLog from './utils/osinfo';
import bodyParser from 'body-parser';
import expressGraphql from 'express-graphql';
import schema from './graphql';
import config from './config';



const Sentry =  require('@sentry/node');

const isDevelopment = process.env.NODE_ENV === 'development';
const {PORT, SENTY} = config;


const app = express();
Sentry.init({ dsn: SENTY });

!isDevelopment && app.use(Sentry.Handlers.requestHandler());

app.use(bodyParser.json());

app.use('/graphql', expressGraphql({
  graphiql: true,
  schema
}))


!isDevelopment && app.use(Sentry.Handlers.errorHandler());

!isDevelopment && app.use((req,res,next) => {
  res.statusCode = 500;
  res.end(res.sentry + '\n')
});

app.listen(PORT, '0.0.0.0', async(err) => {
  if (err)  console.log(err)
  else{
    osLog({url: `http://0.0.0.0:${PORT}`, service: 'Ticket'});
  }
})

export default app;