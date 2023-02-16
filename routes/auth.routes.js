const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require("./../models/User.model")
const salt = 10


// 
router.get('/signup', (req, res, next) => {
    res.render('auth/signup')
})

router.post('/signup', async (req, res, next) => {
    const { username, password } = req.body
    console.log({ username, password });

    const suPassword = await bcrypt.genSalt(salt)
    const hashPassword = await bcrypt.hash(password, suPassword) // this is your hashed password

    await User.create(
        {
            username, password: hashPassword,

        })

    res.redirect('/auth/login')
})

router.get('/login', (req, res, next) => {
    res.render('auth/login')
})

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body

    const foundUser = await User.findOne({ username })
    if (!foundUser) {
        let errorMsg = "No user in the DataBase"
        return res.render("auth/login", { errorMsg })
    }

    const checkPassword = await bcrypt.compare(password, foundUser.password) // true or false
    //if it's true it means that checkPassword is truthy // otherwise is falsy
    if (!checkPassword) {
        let errorMsg = "No user in the DataBase"
        return res.render("auth/login", { errorMsg })
    }

    req.session.currentUser = foundUser

    res.redirect("/")


}
)

module.exports = router