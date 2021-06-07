const defaultPagination = {
  size: 5,
  offset: 0
}

export default httpClient => ({
  getAll: async ({ type, size, offset } = defaultPagination) => {
    const query = { size, offset }

    if (type) {
      query.type = type
    }

    const response = await httpClient.get('/products', { params: query })

    return {
      data: response.data
    }
  },

  post: async ({ name, description, status }) => {
    const response = await httpClient.post('/products', {
      name, description, status
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

  put: async ({ code, name, description, status }) => {
    const response = await httpClient.put('/products/' + code, {
      name, description, status
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
  }
})
