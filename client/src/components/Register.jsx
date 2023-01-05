// imports for Authentication
import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import {useNavigate} from 'react-router-dom'

import RegisterPageIcon from '../assets/RegisterPageIcon.gif'
import {Link} from 'react-router-dom'

export default function Register () {

//logic for authentication
    let navigate = useNavigate()

    const [formValues, setFormValues] = useState({
        fullName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()


        await RegisterUser({
        fullName: formValues.fullName,
        userName: formValues.userName,
        email: formValues.email,
        password: formValues.password
        })
        alert ("Account Created! Please Sign In.")

        setFormValues({
        fullName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
        })


    navigate('/SignIn')
    }

//return or display with the form
    return (
    <div id='RegisterContent'>

        <div id="RegisterPreview">
        <img src={RegisterPageIcon}/>
        </div>

        <div id="RegisterInfo">

            <div id="RegisterInfoLogo">
            <h1>🎁 HollyGram 🎁</h1>
            </div>

            <div id="RegisterInfoInput">
                <form   id="RegisterInfoForm" 
                        onSubmit={handleSubmit}
                        >


                    <label>
                    Full Name
                    <input  
                            onChange={handleChange}
                            name="fullName" 
                            type="text" 
                            placeholder="John Doe"
                            value={formValues.fullName}
                            required
                            />
                    </label>

                    <label>
                    Username
                    <input 
                            onChange={handleChange}
                            name="userName" 
                            type="text" 
                            placeholder="JohnDoe123"
                            value={formValues.userName}
                            required
                            />
                    </label>

                    <label>
                    Email
                    <input  
                            onChange={handleChange}
                            name="email" 
                            type="email" 
                            placeholder="email@email.com"
                            value={formValues.email}
                            required
                            />
                    </label>

                    <label>
                    Password
                    <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            value={formValues.password}
                            required
                            />
                    </label>

                    <label>
                    Confirm Password
                    <input
                            onChange={handleChange}
                            type="password"
                            name="confirmPassword"
                            value={formValues.confirmPassword}
                            required
                            />
                    </label>

                    <button className="RegisterButtons"
                    disabled={
                    !formValues.email ||
                    (!formValues.password &&
                        formValues.confirmPassword === formValues.password)
                    }
                    >
                    Register
                    </button>
                </form>
            </div>
            <br/>
            <div id="RouteToGoToSignIn">
            <Link to= "/SignIn">
                <button className="RegisterButtons">Sign In Instead</button>
            </Link>
            

            </div>


        </div>


    </div>
    )}