export default httpClient => ({
  register: async ({ name, email, password }) => {
    const response = await httpClient.post('/auth/signup', {
      name, email, password
    })

    let errors = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  },

  login: async ({ username, password }) => {
    const response = await httpClient.post('/auth/signin', {
      username, password
    })

    let errors = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      res: response.data,
      errors
    }
  }
})
