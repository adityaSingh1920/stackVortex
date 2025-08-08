import axios from "axios";

export const axiosInstance = axios.create({
    withCredentials:true,
});
 
export const apiConnector = (method,url,header,bodyData,params) => 
{
    return axiosInstance(
        {
            method: `${method}`,
            url: `${url}`,
            data: bodyData ? bodyData : null,
            headers: header ? header : null,
            params: params ? params : null

        }
    )
}
    