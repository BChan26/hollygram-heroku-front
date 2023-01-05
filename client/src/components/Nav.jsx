import Hollygram from '../assets/Hollygram.png'

import {Link} from 'react-router-dom'

export default function Nav ({authenticated, user, handleLogOut}) {

    return (
    <div id='NavBarContent' style={{ 
        backgroundImage: `url("https://i.postimg.cc/SQZChxPc/image-1.png")`,
        backgroundPosition: 'right top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto'
    }}>

        <div id="NavBarLogo">
        <img id ="HollyGramLogo" src={Hollygram}/>
        </div>

        <div id="LogOut">
        <button id="LogOutButton">
        <Link onClick={handleLogOut} to="/">
        Sign Out
        </Link>
        </button>
        </div>

    </div>
    )}