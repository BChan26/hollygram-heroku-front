import Feed from './Feed'
import Register from './Register'

export default function Home ({authenticated, user }) {
    
    let authenticatedOptions
    if (user) {
      authenticatedOptions = (
        <Feed></Feed>

      )
    }
  
    const publicOptions = (
      <Register></Register>

    )
    
    
    return (
    <div id='HomeContent'>
    <header>
      {authenticated && user ? authenticatedOptions : publicOptions}
    </header>
    </div>
    )}