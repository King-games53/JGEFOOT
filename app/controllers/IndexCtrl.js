const _ = require('underscore');

class IndexCtrl {
    constructor(registerService) {
        this._registerService = registerService;
    }

    register(req, res) {
        res.render('index/index');
    }

    postRegister(req, res) {
        if(_.isEmpty(req.body)
            || _.isEmpty(req.body.email)
            || _.isEmpty(req.body.password)
            || _.isEmpty(req.body.confirm)) {
            res.render('index/index', {
                message: 'Tous les champs sont obligatoires.'
            });
            return;
        }

        if(req.body.password !== req.body.confirm) {
            res.render('index/index', {
                message: 'La confirmation est différente du mot de passe.'
            });
            return;
        }

        this._registerService.register(req.body.email, req.body.password).then(
            result => {
                let message = 'Vous êtes enregistré.';

                if(result === 'email_already_exists') {
                    message = 'Un compte existe déjà avec cette adresse.';
                }

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

module.exports = IndexCtrl;