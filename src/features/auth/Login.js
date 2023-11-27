import { useRef, useState, useEffect } from "react"
import { useLoginMutation } from "./authApiSlice"
import { Link, useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import usePresist from "../../hooks/usePresist"
import useTitle from "../../hooks/useTitle"



const Login = () => {
  useTitle('Employee Login')
  const userRef = useRef()
  const errRef = useRef()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [errMsg, setErrMsg] = useState()
  const dispatch = useDispatch()
  const navigater = useNavigate()
  const [login, {isLoading}] = useLoginMutation() 
  
  const [presist, setPresist] = usePresist()
  
  useEffect(() => {
    userRef.current.focus()    
  }, [])

  useEffect(() => {
    setErrMsg('')
  },[username, password])

  
  //handler
  const handleUserInput = e => setUsername(e.target.value)
  const handlePwdInput = e => setPassword(e.target.value)
  const handleToggle = () => setPresist(pre => !pre )
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {accessToken} = await login({username, password}).unwrap()
      dispatch(setCredentials({accessToken}))
      setUsername('')
      setPassword('')
      navigater('/dash')      
    } catch (err) {
      if(!err.useState) {
        setErrMsg('Server no respond')
      } else if(err.status === 400){
        setErrMsg(' Missing username or password')
      } else if(err.status === 401){
        setErrMsg('Unauthorized')
      } else {
        setErrMsg(err?.data?.message)
      }
      errRef.current.focus()
    }
  }
 

  const errClass = errMsg ? 'errmsg' : 'offscreen'
  
  if(isLoading) return <p>Loading...</p> 
  
  const content = (
    <section className="public">
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className="login">
        <p className={errClass} ref={errRef} aria-live="assertive">{errMsg}</p>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input 
            className="form__input"
            type="text"
            id="username"
            name="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />
          
          <label htmlFor="password" >Password: </label>
          <input
            type="password"
            id="password"
            className="form__input"
            required
            value={password}
            onChange={handlePwdInput}
          />

          <button className="form__submit-button">Sign In</button> {/* //default is onsubmit */}
          <label className="form__presist" htmlFor="presist" >
            <input
              className="form__checkbox"
              type="checkbox"
              id="presist"
              checked = {presist}
              onChange={handleToggle}
            />
            Trust This Device
          </label>
        </form>

      </main>
      <footer>
        <Link to='/' >Back To Home</Link>
      </footer>
    </section>
  )
  return content
}

export default Login