const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/user")

loginRouter.post("/", async (req, res, next) => {
  const body = req.body

  const user = await User.findOne({ username: body.username })

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user !== null && passwordCorrect)) {
    console.log("moi")

    return res.status(401).send({
      message: "invalid username or password",
    })
  }

  const userFortoken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userFortoken, process.env.SECRET)
  console.log("we here")
  res.status(200).json({
    token,
    username: user.username,
    name: user.name,
  })
})

module.exports = loginRouter
