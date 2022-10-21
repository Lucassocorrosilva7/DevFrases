const express = require('express')
const { engine } = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')


const app = express()

const connect = require('./db/connect')


const Dev = require('./model/Dev')
const User = require('./model/User')


const devRoutes = require("./routes/devRoutes")
const authRoutes = require("./routes/authRoutes")


const DevController = require('./controllers/DevController')


app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use(
    session({
        name: 'session',
        secret: "my-secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function () { },
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }),
)


app.use(flash())


app.use(express.static('public'))

app.use((req, res, next) => {

    if (req.session.userid) {
        res.locals.session = req.session
    }
    next()
})

app.use('/pages', devRoutes)
app.use('/', authRoutes)


app.get("/", DevController.showDev)

connect.sync().then(() => {
    app.listen(process.env.PORT)
}).catch((error) => console.log(error))