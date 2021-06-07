const defaultPagination = {
  size: 5,
  page: 1
}

export default httpClient => ({
  getAll: async ({ type, size, page } = defaultPagination) => {
    const query = { size, page }

    if (type) {
      query.type = type
    }

    const response = await httpClient.get('/categories', { params: query })

    return {
      data: response.data
    }
  },

  post: async ({ name, description, status }) => {
    const response = await httpClient.post('/categories', {
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
    const response = await httpClient.put('/categories/' + code, {
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
