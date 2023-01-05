////Imports for Authentication
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import Register from './components/Register'
import SignIn from './components/SignIn'
import Feed from './components/Feed'
import Home from './components/Home'
import Nav from './components/Nav'
import './App.css';
function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const handleLogOut = () => {
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }
// //Persisting Logged In Users
// // Nothing is more frustrating to a user than an application that constantly kicks them back to a log in screen when they refresh. Luckily, that's a simple fix.
// // What we'll do here is add some logic to check if a token is already stored in localStorage. If it is, we'll make a request to a route in our back-end that will validate and decrypt the currently stored token. This decrypted token will contain the same information about the user that we stored after signing in.
// //Next, we'll create a method called checkToken that will make a GET request to our back-end with the currently stored token to check it's validity:
  //Here, we'll invoke the CheckSession function and store the returned information in a variable called user:
  const checkToken = async () => {
    const user = await CheckSession()
    console.log(user, 'user')
    //Next, we'll store this returned user in state using the setUser method:
    setUser(user)
    //Finally, we'll toggle the authenticated state:
    toggleAuthenticated(true)
  }
// We'll utilize useEffect to check if a token exists currently. If and only if a token exists, we'll invoke our checkToken function:
  useEffect(()=> {
    const token = localStorage.getItem('token')
    // console.log(token)
    if (token) {
      checkToken()
      // console.log(checkToken)
    }
  }, [])
  return (
    <div className="App">
    <main>
        <Routes>
          <Route path="/" element={<Home
                                    authenticated={authenticated}
                                    user={user}
                                    />} />
          <Route path="/SignIn" element={<SignIn
                                          setUser={setUser}
                                          toggleAuthenticated={toggleAuthenticated}
                                          />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Feed" element={<Feed
                                        user={user}
                                        authenticated={authenticated}
                                        />} />
          <Route path="/Nav" element={<Nav
                                      authenticated={authenticated}
                                      user={user}
                                      handleLogOut={handleLogOut}
                                      />}/>
        </Routes>
      </main>
    </div>
  );
}
export default App;