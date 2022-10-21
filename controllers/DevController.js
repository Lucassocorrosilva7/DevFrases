const Dev = require('../model/Dev')
const User = require('../model/User')

const { Op } = require('sequelize')

module.exports = class DevController {
    static async showDev(req, res) {

        let search = ''

        if (req.query.search) {
            search = req.query.search
        }

        let order = 'DESC'

        if (req.query.order === 'old') {
            order = 'ASC'
        } else {
            order = 'DESC'
        }


        const devsData = await Dev.findAll({
            include: User,
            where: {
                title: { [Op.like]: `%${search}%` },
            },
            order: [['createdAt', order]],
        })
        const devs = devsData.map((result) => result.get({ plain: true }))

        let devsQty = devs.length

        if (devsQty === 0) {
            devsQty = false
        }


        res.render('pages/home', { devs, search, devsQty })
    }


    static async dashboard(req, res) {
        const userId = req.session.userid

        const user = await User.findOne({
            where: {
                id: userId,
            },
            include: Dev,
            plain: true,
        })

        if (!user) {
            res.redirect('/login')
        }

        const devs = user.Devs.map((result) => result.dataValues)

        let emptyDevs = false

        if (devs.length === 0) {
            emptyDevs = !false
        }



        res.render('pages/dashboard', { devs, emptyDevs })
    }

    static createDev(req, res) {
        res.render("pages/create")
    }

    static async about(req, res) {
        res.render("pages/about")
    }

    static async createDevSave(req, res) {

        const dev = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try {
            await Dev.create(dev)
            req.flash('message', 'Ideia criado com sucesso')
            req.session.save(() => {
                res.redirect('/pages/dashboard')
            })
        } catch (error) {
            console.log(error)
        }

    }

    static async removeDev(req, res) {
        const id = req.body.id
        const UserId = req.session.userid
        try {
            await Dev.destroy({ where: { id: id, UserId: UserId } })
            req.flash('message', 'Ideia removida com sucesso')
            req.session.save(() => {
                res.redirect('/pages/dashboard')
            })
        } catch (error) {
            console.log(error)
        }

    }

    static async updateDev(req, res) {
        const id = req.params.id
        const dev = await Dev.findOne({ where: { id: id }, raw: true })
        res.render('pages/edit', { dev })
    }


    static async updateDevSave(req, res) {

        const id = req.body.id

        const dev = {
            title: req.body.title
        }

        try {
            await Dev.update(dev, { where: { id: id } })
            req.flash('message', 'Ideia atualizada com sucesso')
            req.session.save(() => {
                res.redirect('/pages/dashboard')
            })
        } catch (error) {
            console.log(error)
        }

    }

}