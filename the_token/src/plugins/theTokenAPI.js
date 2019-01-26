const axios = require('axios')

const theTokenApi = ({ app }, inject) => {

  const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000/'
  })

  console.log('theTokenApi Injected', app.router.options.base)

  inject('theTokenApi', instance)
}


export default theTokenApi