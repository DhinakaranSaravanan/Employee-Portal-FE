import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectAllUsers, useGetUsersQuery } from '../users/usersApiSlice'
import { selectNoteById, useGetNotesQuery } from './notesApiSlice'
import EditNoteForm from './EditNoteForm'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditNote = () => {
  useTitle('Edit Note')
  const {id} = useParams()
  // const users = useSelector(selectAllUsers)
  // const note = useSelector(state => selectNoteById(state, id))
  // const content = users && note ? <EditNoteForm users={users} note={note} /> : <p>Loading...</p>

  const {user} = useGetUsersQuery('usersList',{
    selectFromResult:({data}) => ({
      user: data?.ids.map(id => data?.entities[id])
    }),
  })
  const {note} = useGetNotesQuery('notesList',{
    selectFromResult:({data}) => ({
      note: data?.entities[id]
    }),
  })
  const{username, isManager, isAdmin} = useAuth()

  if(!note || !user?.length) return <PulseLoader color={'#FFF'} />
  
  if(!isManager && !isAdmin){
    if(note.username !== username){
      return <p className='errmsg'>No access</p>
    }
  } 

  const content = <EditNoteForm users={user} note={note} />

  return content
}

export default EditNote