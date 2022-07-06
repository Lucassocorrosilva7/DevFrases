const Dev = require('../model/Dev')
const User = require('../model/User')

module.exports = class DevController {
    static async showDev(req,res) {
     res.render('pages/home')
    }
}