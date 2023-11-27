import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import { useNavigate } from "react-router-dom"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useEffect, useState } from "react"
import useTitle from "../../hooks/useTitle"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
    useTitle('Add New User')
    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Employee"])

    const onUsernameChange = (e) => setUsername(e.target.value)
    const onPasswordChange = (e) => setPassword(e.target.value)
    const onRoleChange = (e) => {
        //why this method because we need to select more than one option
        const values = Array.from(
            e.target.selectedOptions,  //html collection
            (option) => option.value //create array and store the value
        )
        setRoles(values)
    }

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
         
    },[username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    },[password])

    useEffect(() => {
        if(isSuccess){
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }       
    },[isSuccess, navigate])
    
    const canSave = [roles.length, validPassword, validUsername].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if(canSave){
            await addNewUser({username, password, roles})
        }
    }
    
    const options = Object.values(ROLES).map(role => {
        return (
            <option 
                key ={role} 
                value={role}
                >
                {role}
            </option>)
        })
    
        const errClass = isError? 'errmsg':'offscreen'
        const validUserClass = !validUsername? 'form__input--imcomplete' : ''
        const validPwdClass = !validPassword? 'form__input--imcomplete' : ''
        const validRolesClass = !Boolean(roles.length)? 'form__input--imcomplete' : ''

        const content = (
        <>
            <p className={errClass} >{error?.data?.message}</p>
            <form className="form" onSubmit={onSaveUserClicked} >
                <div className="form__title-row">
                    <h2>New User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="save"
                            disabled = {!canSave}
                        >
                            <FontAwesomeIcon icon={faSave}/>
                        </button>
                    </div>
                </div>
                <label htmlFor="username" className="form__label">
                    Username: <span className="nowrap">[3-20 letters]</span>
                </label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChange}            
                />

                <label htmlFor="password" className="form__label" >
                    password : <span className="nowrap">[4-12 chars incl. !@#$%]</span>
                </label>
                <input 
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChange}            
                />

                <label htmlFor="roles" className="form__label">
                    Roles:
                </label>
                <select 
                    className={`form__select ${validRolesClass}`}
                    id="roles"
                    name="roles"
                    multiple = {true}
                    size={3}
                    value={roles}
                    onChange={onRoleChange}
                >
                        {options}
                </select>
            </form>
        </>
        )



  return content
}

export default NewUserForm