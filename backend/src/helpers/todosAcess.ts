import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';
import { ddbDocClient } from './dbConnection';
import { PutCommand, UpdateCommand, GetCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { CreateTodoRequest } from '../requests/CreateTodoRequest';

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic

export class TodosAccess{

    createTodo = async(userId:string, todo:CreateTodoRequest)=>{
        const params = {
        TableName: "project4-serverless-176654325514-${self:provider.stage}",
        Item: todo,
      };
    
      try {
        const data = await ddbDocClient.send(new PutCommand(params));
        console.log("Success - item added or updated", data);
        logger.info("Success - item added or updated", data);
      } catch (err) {
        console.log("Error", err.stack);
        logger.info("Error", err.stack);
      }
    }

    


    async getTodos(userId:string):Promise<TodoItem>{

        const params = {
        TableName: "TABLE_NAME",
        Key: {
            userId
        },
      };
    
      try {
        const data = await ddbDocClient.send(new GetCommand(params));
        console.log("Success - item added or updated", data.Item);
        logger.info("Success - item added or updated", data.Item);
        return data.Item as TodoItem
      } catch (err) {
        console.log("Error", err.stack);
        logger.info("Error", err.stack);
      }
    }



    async updateTodo(userId:string, todoId:string, todo:TodoUpdate){

        const params = {
        TableName: "TABLE_NAME",
        Key: {
            userId,
            todoId,
            name:todo.name
    
        },
      };
    
      try {
        const data = await ddbDocClient.send(new UpdateCommand(params));
        console.log("Success - item added or updated", data);
        logger.info("Success - item added or updated", data);
      } catch (err) {
        console.log("Error", err.stack);
        logger.info("Error", err.stack);
      }
    }


    async deleteTodo(userId:string, todoId:string){

        const params = {
        TableName: "TABLE_NAME",
        Key: {
            userId,
            todoId
        },
      };
    
      try {
        const data = await ddbDocClient.send(new DeleteCommand(params));
        console.log("Success - item deleted",data);
        logger.info("Success - item deleted", data);
      } catch (err) {
        console.log("Error", err.stack);
        logger.info("Error", err.stack);
      }
    }
}

