import api from 'services/api'

interface SignupSuccess {
  id: number
}

const signup = async (signupData: {
  firstName: string
  lastName: string
  username: string
  email: string
  phoneNumber: string
  password: string
}) => {
  try {
    const res = await api.post<SignupSuccess>(`/users`, signupData)
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export { signup }
