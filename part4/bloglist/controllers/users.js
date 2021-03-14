const bcrypt = require("bcrypt")
const { response } = require("express")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.post("/", async (req, res, next) => {
  if (!req.body.password) {
    return res.status(400).json({ message: "password missing" })
  }
  if (req.body.password.length < 3) {
    return res.status(400).json({ message: "password length too short" })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

  const user = new User({
    username: req.body.username,
    name: req.body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.json(savedUser)
})

usersRouter.get("/", async (req, res, next) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  })
  res.json(users.map((u) => u.toJSON()))
})

module.exports = usersRouter
