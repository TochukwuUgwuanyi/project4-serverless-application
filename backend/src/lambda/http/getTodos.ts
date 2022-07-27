import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getTodosForUser as getTodosForUser } from '../../helpers/todos'
import { getUserId } from '../utils';

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
   
    try{
      const currentUserID = getUserId(event);
      const todos = await getTodosForUser(currentUserID);
      return {
        statusCode: 200,
        body: JSON.stringify(todos),
      };
    }catch(e){
      return {
        statusCode: 403,
        body: JSON.stringify(e),
      };
    }
    
  });

handler.use(
  cors({
    credentials: true
  })
)
