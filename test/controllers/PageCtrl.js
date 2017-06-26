const expect = require('expect');
const PageCtrl = require('../../app/controllers/PageCtrl');

describe("PageCtrl", () => {
    describe("#constructor", () => {
        it("Verification de la présence de la propriété loginService", () => {
            const pageCtrl = new PageCtrl(true);

            expect(pageCtrl._loginService).toBe(true);
        });
    });

    describe("#login", () => {
        it("je m'attends à voir le vue qui affiche le formulaire de login: la page/login", () => {
            const page = new PageCtrl();

            const req = { };

            const res = {
                render: view => {
                    expect(view).toBe('page/login');
                }
            };

            page.login(req, res);
        });
    });

    describe("#posLogin", () => {
        it("Je m'attends à ne rien recevoir et j'affiche le message 'Merci de saisir le login' ", () => {
            const pageCtrl = new PageCtrl();

            const req = {
                body: { }
            };

            const res = {
                render: (view, data) => {
                    expect(view).toBe('index/index');
                    expect(data.message).toBe('Merci de saisir votre login.')
                }
            };

            pageCtrl.postRegister(req, res);
        });

        it("Je m'attends à recevoir un login vide et j'affiche le message 'Merci de saisir le login'", () => {
            
        });
        it("Je m'attends à recevoir un login qui ne correspond à aucun membre et j'affiche le message 'Login invalide'", () => {
            
        });
        it("Je m'attends à recevoir un login correspond à un membre enregistré et je le redirige vers la page d'accueil avec une session d'activée'", () => {
            
        });

    });
});










