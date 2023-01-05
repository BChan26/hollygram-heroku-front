import Axios from 'axios'
export const BASE_URL = 'https://holly-gram-backend-2-production.up.railway.app/'
const Client = Axios.create({ baseURL: BASE_URL })

//Enter Interceptors
// Lucky for us, we're using axios. axios has a really cool feature called interceptors that allows us to catch each request or response as we send or receive them and modify certain information in the request/response!
// Open the api.js file located in services.
// Let's add the following above our export of Client and below our Client instance:

// Intercepts every request axios makes
Client.interceptors.request.use((config) => {
      // Reads the token in localStorage
      const token = localStorage.getItem('token')
      // console.log(token)
      // if the token exists, we set the authorization header
      if (token) {
          config.headers['authorization'] = `Bearer ${token}`
      }
      // console.log(config)
      return config // We return the new config if the token exists or the default config if no token exists.
      // Provides the token to each request that passes through axios
    },
    (error) => Promise.reject(error)
  )

export default Client