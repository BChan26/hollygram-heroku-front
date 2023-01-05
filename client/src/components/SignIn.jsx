import RegisterPageIcon from '../assets/RegisterPageIcon.gif'
import {Link} from 'react-router-dom'

import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

export default function SignIn (props) {
    
    let navigate = useNavigate()
    
    const [formValues, setFormValues] = useState({ email: '', password: '' })
    
    const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const payload = await SignInUser(formValues)
        setFormValues({ email: '', password: '' })
        props.setUser(payload)
        props.toggleAuthenticated(true)
        navigate('/Feed')
    }



    return (
        <div id='SignInContent'>

            <div id="SignInPreview">
            <img  id="RegisterPageIcon" src={RegisterPageIcon}/>
            </div>

        <div id="SignInInfo">
            <div id="SignInInfoLogo">
            <h1>🎁 HollyGram 🎁</h1>
            </div>

            <div id="SignInInfoInput">
                <form id="SignInInfoForm" 
                onSubmit={handleSubmit}
                >
                    <div>
                        <label>
                            Email
                        </label>

                        <input
                            onChange={handleChange}
                            name="email"
                            type="email"
                            placeholder="email@email.com"
                            value={formValues.email}
                            required
                            />
                    </div>

                    <div>
                        <label>
                            Password
                        </label>

                        <input
                        onChange={handleChange}
                        type="password"
                        name="password"
                        value={formValues.password}
                        required
                        />

                    </div>

                    <button className='RegisterButtons'
                    disabled={!formValues.email || !formValues.password}
                    >
                        Sign In
                    </button>

                </form>
            </div>
            <br/>
            <div id="RouteToGoToRegister">
            <Link to= "/Register">
                <button className="RegisterButtons">Register Instead</button>
            </Link>
        </div>
        </div>

    </div>
)}