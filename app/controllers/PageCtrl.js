const _ = require('underscore');

class PageCtrl {
    constructor(loginService) {
        this._loginService = loginService;
    }

    login(req, res) {
        res.render('page/login');
    }

    postLogin(req, res) {
        if(_.isEmpty(req.body.login)) {
            res.render('page/login', {
                message: 'Merci de saisir votre login.'
            });
            return;
        }

        this._loginService.login(req.body.login).then(
            result => {
                if (!result){
                    res.render('page/login', {
                        message: 'Login invalide.'
                    });
                } else {
                    res.render('index/index', {
                        message: 'Vous êtes connecté.'
                    });
                }
            }
        ).catch(e => {
            res.render('page/login', {
                message: 'Erreur système'
            });
        });
    }
}

module.exports = PageCtrl;