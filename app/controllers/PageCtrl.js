const _ = require('underscore');

class PageCtrl {
    constructor(loginService) {
        this._loginService = loginService;

    }

    login(req, res) {
        res.render('index/index');
    }

    postLogin(req, res) {
        if(_.isEmpty(req.body)||
            _.isEmpty(req.body.login)

        ) {
            res.render('index/index', {
                message: 'Merci de saisir votre login.'
            });
            return;
        }

        this._loginService.login(req.body.login).then(
            result => {
                let message = 'Vous êtes connecté.';

                res.render('index/index', {
                    message: message
                });
            }
        ).catch(e => {
            res.render('index/index', {
                message: 'Erreur système'
            });
        });

    }
}

module.exports = PageCtrl;