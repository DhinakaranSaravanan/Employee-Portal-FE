import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { selectUserById, useGetUsersQuery } from "./usersApiSlice"
import EditUserForm from "./EditUserForm"
import {PulseLoader} from 'react-spinners/PulseLoader'
import useTitle from "../../hooks/useTitle"

const EditUser = () => {
  useTitle('Edit user')
  const {id} = useParams()
  // const user = useSelector(state => selectUserById(state, id))
  // console.log(user)
  // const content = user ? <EditUserForm user={user} /> : <p>Loading...</p> 

  const { user } = useGetUsersQuery('usersList',{
    selectFromResult:({data}) => ({
      user: data?.entities[id]
    }),
  })
  if(!user) return <PulseLoader color={'#FFF'} /> 

  const content = <EditUserForm user={user} />
  
  return content
}

export default EditUser