import {useSelector} from 'react-redux'
import {selectCurrentToken} from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isManager = false
  let isAdmin = false
  let status = 'Employee'
  //if have a token
  if(token){
    const decoded = jwtDecode(token)
    const {username, roles} = decoded.UserInfo
    isManager = roles.includes('Manager')
    isAdmin = roles.includes('Admin')

    if(isManager) status = 'Manager'
    if(isAdmin) status = 'Admin'

    return {username, roles, status, isManager, isAdmin}
  }

  //if no token 
  return {username : '', roles : [], status , isManager, isAdmin}
}

export default useAuth