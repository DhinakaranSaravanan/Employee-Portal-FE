import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setCredentials} from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({    
    baseUrl:'https://dk-employee-portal-api.onrender.com',
    /* baseUrl:'http://localhost:3500', */
    credentials : 'include',
    prepareHeaders : (headers, {getState}) => {
        const token = getState().auth.token
        if(token){
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }

})
const baseQueryWithReauth = async(arg, api, extraOptions) => {
    let result = await baseQuery(arg, api, extraOptions)

    if(result?.error?.status === 403){
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        if(refreshResult?.data){
            api.dispatch(setCredentials({...refreshResult.data}))
            result = await baseQuery(arg, api, extraOptions)
        } else {
            if(refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = 'Your login has expired'
            }
            return refreshResult
        }
        
    }
    return result
}
export const apiSlice =createApi({
    baseQuery : baseQueryWithReauth /*  : fetchBaseQuery({baseUrl:'http://localhost:3500'}) */,
    tagTypes : ['note', 'user'],
    endpoints : builder =>({})
})