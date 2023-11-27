import { useEffect, useRef, useState } from 'react'
import {Link, Outlet} from 'react-router-dom'
import {useRefreshMutation} from './authApiSlice'
import usePresist from '../../hooks/usePresist'
import {selectCurrentToken} from './authSlice'
import { useSelector } from 'react-redux'

const PresistLogin = () => {
    const [presist] = usePresist()
    const token = useSelector(selectCurrentToken)
    const effectRun = useRef(false)
    const [trueSuccess, setTrueSuccess] = useState(false)
    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    //react 18 strict mode
    useEffect(() => {
        if(effectRun.current = true || process.env.NODE_ENV !== 'development'){
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token');
                try {
                    await refresh()
                    setTrueSuccess(true)                    
                } catch (error) {
                    console.log(error);                    
                }
            }
            if(!token && presist) verifyRefreshToken()
        }
    return () => effectRun.current = true
    //eslint-disable-next-line
    }, [])

    let content
    if(!presist) {
        //presist : no
        console.log('no presist');
        content = <Outlet />
    } else if(isLoading){
        //presist : yes, token :no
        console.log('loading');
        content = <p>Loading...</p>
    } else if(isError){
        //presist : yes, token :no
        console.log('error');
        content = <p className='errmsg'>
            {`${error?.data?.message}- `}
            <Link to={'/login'} >Click to login again</Link>
        </p>
    } else if(isSuccess && trueSuccess){
        //presist : yes, token :yes
        console.log('success');
        content = <Outlet />
    } else if(token && isUninitialized){
    //presist : yes, token :yes
        console.log('token and unint');
        content = <Outlet />        
    }

  return content
}

export default PresistLogin

