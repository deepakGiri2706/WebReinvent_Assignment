import axios from "axios";
import { catchErr } from "../utils/common_function";
export const getAsyncData = async (url:string, config?:any,params?:any, token?:string) => {
    try {
        config = config ? config : {};
        
        if (token) {
            if (config.headers) {
                config.headers['Authorization'] = 'Bearer ' + token
            } else {
                config = { ...config, headers: { 'Authorization': 'Bearer ' + token } }
            }
        }

        const responseData = await axios
            .get(url, config)
            .then(res => {
                if (res.status == 201 || res.status == 200) {
                    return res;
                } else {
                    return false;
                }
            })
            .catch(error => {
                if (error.response?.status == 308) {
                    return error.response
                } else {
                    console.log('Error Api=', url)
                    console.log('Error In Api = ' + error);
                    return false;
                }
            });
        
        const response = responseData ? responseData?.data : false;
        return response;
    } catch (err) {
        catchErr(err) 
    }
};

export const getAsyncPostData = async (url:string, params:any, headers?:any, token?:string) => {
    try {
        headers = headers ? headers : {};
        
        if (token) {
            headers['Authorization'] = 'Bearer ' + token
        }
        params = params ? params : {};
       
        const responseData = await axios
            .post(url, params, { headers })
            .then(res => {
                if (res.status == 201 || res.status == 200) {
                    return res;
                } else {
                    return false;
                }
            })
            .catch(error => {
                if (error.response?.status == 308) {
                    return error.response
                } else {
                    console.log('Error Api=', url)
                    console.log('Error In Api = ' + error);
                    return false;
                }
            });
        const response = responseData ? responseData.data : false;
        return response;
    } catch (err) {
        catchErr(err) // can handle to throw err using env varialble and can log too using (data dog, new relic etc)
        
    }
}