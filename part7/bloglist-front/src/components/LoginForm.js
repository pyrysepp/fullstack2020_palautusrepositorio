import React, { useState, useEffect } from "react"
import loginService from "../services/loginService"
import blogService from "../services/blogService"

const LoginForm = ({
    loginStatus,
    setLoginStatus,
    setStatusMessage,
}) => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loggedUser, setUser] = useState(null)

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            console.log({ username: userName, password })
            const response = await loginService.login({
                username: userName,
                password,
            })
            const user = response.data
            window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
            setUser(user)
            setUserName("")
            setPassword("")
            setLoginStatus(!loginStatus)
            blogService.setToken(user.token)
            setStatusMessage({ good: true, message: "succesfully logged in" })
            setTimeout(() => setStatusMessage(null), 3000)
        } catch (error) {
            console.log(error)
            setStatusMessage({ good: false, message: "wrong username or password" })
            setTimeout(() => setStatusMessage(null), 3000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem("loggedBlogAppUser")
        setLoginStatus(!loginStatus)
        setUser(null)
        blogService.setToken(null)
        setStatusMessage({ good: true, message: "succesfully logged out" })
        setTimeout(() => setStatusMessage(null), 3000)
    }
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            setLoginStatus(!loginStatus)
            blogService.setToken(user.token)
        }
    }, [])
    if (loggedUser === null) {
        return (
            <div>
                <form onSubmit={handleLogin} className="loginForm">
                    <div>
            Username
                        <input
                            id="usernameInput"
                            type="text"
                            value={userName}
                            onChange={({ target }) => setUserName(target.value)}
                        />
                    </div>
                    <div>
            Password
                        <input
                            id="passwordInput"
                            type="password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        )
    } else {
        return (
            <div>
                <h3>{loggedUser.name} logged in</h3>
                <button onClick={handleLogout}>log out</button>
            </div>
        )
    }
}

export default LoginForm
