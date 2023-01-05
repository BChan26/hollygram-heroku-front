import Client from './api'

export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/auth/login', data)
    // Set the current signed in users token to localStorage


//Storing the JWT
// In this function, our API is returning two things:
// a user object
// a JWT
// We're already returning the user object from this function, however it's also a good idea to store the token at this point.
// Here, we're using the localStorage API to store the user's authentication token with a key of token. setItem takes two arguments. The order matters:
// Key to reference the data we store. In this case we're using token.
// Value to store. (The value must always be a string)
// Now that we've set the ability to store the token, let's try signing in with the user you created earlier.

    localStorage.setItem('token', res.data.token)
console.log(res.data.token)
    return res.data.user
  } catch (error) {
    throw error
  }
}

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/auth/register', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    // Checks if the current token if it exists is valid
    const res = await Client.get('/auth/session')
    console.log(res)
    return res.data
  } catch (error) {
    throw error
  }
}
