const authService = require('../service/auth-service')
// const CustomError = require('../exceptions/customError')

class AuthController {
    async registration(req, res, next){
        try{
            const { fingerprint } = req
            const {email, password, firstname, lastname, userRoleId} = req.body
            const userData = await authService.registration(email, password, firstname, lastname, userRoleId, fingerprint)
            // Потом добавить secure: true в куку, чтобы все пахало на https
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json({accessToken: userData.accessToken, email: userData.user.email, accessTokenExpiration: process.env.JWT_ACCESS_EXPIRATION})
        } catch (err){
            next(err)
        }
    }

    async login(req, res, next){
        try{
            const email = req.body.email
            const password = req.body.password
            const {fingerprint} = req
            const userData = await authService.login(email, password, fingerprint)
            
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json({accessToken: userData.accessToken, email: userData.user.email, accessTokenExpiration: process.env.JWT_ACCESS_EXPIRATION})
        } catch (err){
            next(err)
        }
    }

    async logout(req, res, next){
        try{
            const {refreshToken} = req.cookies
            const token = await authService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json({message: "Выход успешный"})
        } catch (err){
            next(err)
        }
    }

    async activate(req, res, next){
        try{
            const activationLink = req.params.link
            await authService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (err){
            next(err)
        }
    }

    async refresh(req, res, next){
        try{
            const {refreshToken} = req.cookies
            const {fingerprint} = req
            const userData = await authService.refresh(refreshToken, fingerprint.hash)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json({accessToken: userData.accessToken, email: userData.user.email, accessTokenExpiration: process.env.JWT_ACCESS_EXPIRATION})
        } catch (err){
            next(err)
        }
    }
}

module.exports = new AuthController()