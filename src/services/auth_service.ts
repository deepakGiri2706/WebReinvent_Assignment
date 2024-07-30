import { catchErr } from "../utils/common_function"
import { getAsyncData, getAsyncPostData } from "./common_service"

const BaseUrl = `https://reqres.in/api/`
interface UserRegisterParams{
    name:string,
    email:string,
    password:string,
}
interface LoginParams{
    email:string,
    password:string
}

interface RegisterResponse{
    id:string,
    token:string
}

export interface LoginResponse{
    token?:string,
    error?:string
}
export const createUser=async (params:UserRegisterParams)=>{
    try{
        let url = BaseUrl+"register"
       const response  : RegisterResponse = await getAsyncPostData(url, params);
       return response
    
    }catch(err){
        catchErr(err) 
    }

}

export const loginUser=async(data:LoginParams)=>{
        try{
            let url = BaseUrl+"login"
            const response : LoginResponse = await getAsyncPostData(url, data)
            return response
        }catch(err){
            catchErr(err) 
        }
}

export interface User {
    "id": number,
    "email": string,
    "first_name": string,
    "last_name": string,
    "avatar": string
}
export interface UserResponse {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data:User[]
}
export const getUsers =async () => {
    try {
        let url = BaseUrl+"users"
        const response  : UserResponse = await getAsyncData(url);
        return response
    } catch (err: any) {
        throw err.message
    }
}