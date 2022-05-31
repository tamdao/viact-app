import api from 'services/api'

interface SigninSuccess {
  accessToken: string
}

const signin = async (signinData: { username: string; password: string }) => {
  try {
    const res = await api.post<SigninSuccess>(`/auth/login`, signinData)
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export { signin }
