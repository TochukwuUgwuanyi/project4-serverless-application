import { TodosAccess } from './todosAcess'
import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import * as createError from 'http-errors'

// TODO: Implement businessLogic
const todoRepo = new TodosAccess();

export const getTodosForUser = async(currentUserID:string):Promise<TodoItem[]>=>{
    const todos = await todoRepo.getTodos(currentUserID);
    return Promise.resolve([todos]);
}

export const createTodo = async(currentUserID:string, todo:CreateTodoRequest):Promise<TodoItem>=>{
    const newTodoId = uuid();
    todo.todoId = newTodoId;
    const todos = await todoRepo.createTodo(currentUserID,todo);
    

    return Promise.resolve({
        userId:currentUserID,
        todoId:newTodoId,
        name:"",
        createdAt:"",
        done:true,
        dueDate:""
    });
}

export const deleteTodo = async(currentUserID:string, todoId:string):Promise<boolean>=>{
    await todoRepo.deleteTodo(currentUserID,todoId);
    return Promise.resolve(true);
}

export const updateTodo = async(currentUserID:string, todoId:string, updatedTodo:UpdateTodoRequest):Promise<TodoItem>=>{
    const todos = await todoRepo.updateTodo(currentUserID,todoId,updatedTodo);
    return Promise.resolve({
        userId:currentUserID,
        todoId:"",
        name:"",
        createdAt:"",
        done:true,
        dueDate:""
    });
}

export const createAttachmentPresignedUrl = (currentUserID:string, todoId:string):Promise<string>=>{
    const awsS3Utils = new AttachmentUtils()
    return Promise.resolve(awsS3Utils.getGeneratedSignedUrl(currentUserID, todoId));
}