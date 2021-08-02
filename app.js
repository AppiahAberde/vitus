const express = require('express')
const jwt = require('jsonwebtoken')

const auth = require('./middleware/auth')
const app = express()
const User = require('./models/Login')
const Member = require('./models/Member')
const cookieparser = require ('cookie-parser')

app.use(express.urlencoded({ extended: true }))
//app.use(ex.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieparser())

//
app.set('view engine', 'ejs')

app.listen(3000)

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                password: req.body.pass
            }
        })
        if (!user) { res.status(400).render('index') }
        const token = jwt.sign({ _id: user._id.toString() }, "mysecret")
        res.cookie('jwttoken', token, {
            httpOnly: true,
            expires: new Date(new Date().getTime() + 5 * 60 * 1000)
        })
        if (user) {
            res.status(201).render('about', {
                isPage: true,
                isLogin: true
            })
        } else {
            res.status(403).render('index')
        }
        //res.status(200).send({ "token": token, ...user.dataValues })
    } catch (error) {
        res.status(403).render('index')
    }
})

app.get('/logOut', auth, async (req, res) => {
    try {
        res.clearCookie('jwttoken');
        res.render('index', { isLogin: false });
    } catch (error) {
        console.log(error);
    }
});


app.post('/addMember', auth, async (req, res) => {
    const member = new Member(req.body)
    try {
        await member.save()
        res.send(member)

    } catch (error) {
        res.send(error)
    }
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/home', auth, (req, res) => {
    res.render('about', { isLogin: true })
})

app.use((req, res) => {
    res.sendFile('./views/404.html', { root: __dirname })
})
