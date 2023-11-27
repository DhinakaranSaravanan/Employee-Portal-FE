import { useSelector } from "react-redux"
import { selectAllUsers, useGetUsersQuery } from "../users/usersApiSlice"
import NewNoteForm from "./NewNoteForm"
import PulseLoader from "react-spinners/PulseLoader"
import useTitle from "../../hooks/useTitle"

const NewNote = () => {
  useTitle('New Note')
  // const users = useSelector(selectAllUsers)
  
  // if(!users.length) return('Currently not availabel')
  
  const {user} = useGetUsersQuery('usersList', {
    selectFromResult:({data}) => ({
      user: data?.ids.map(id => data?.entities[id])
    }),
  })

  if(!user?.length) return <PulseLoader color={'#FFF'} />

  const content =<NewNoteForm users ={user} />
  
  return content
}

export default NewNote