import axios from "axios"
const baseUrl = "/api/login"

const login = async (user) => {
    console.log(user)
    try {
        const response = await axios.post(baseUrl, user)
        console.log(response)
        return response
    } catch (error) {
        console.log(error.message)
        return null
    }
}

export default { login }
