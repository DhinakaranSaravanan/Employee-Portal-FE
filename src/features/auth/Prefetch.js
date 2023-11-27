import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { store } from '../../app/store'
import { notesApiSlice } from "../notes/notesApiSlice"
import { usersApiSlice } from "../users/usersApiSlice"

const Prefetch = () => {

    useEffect(() => {

        /* //manually subcribe the data once load the page untill the page alive 
        console.log('subscribing');
        const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

        //data will unsubscribe when the page is closed 
        return () => {
            console.log("unsubscribe");
            notes.unsubscribe()
            users.unsubscribe()
        } */

        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', {force: true}))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', {force: true}))

    },[])
    // [] no dependency 

  return <Outlet />
}

export default Prefetch