const expect = require('expect');
const PageCtrl = require('../../app/controllers/PageCtrl');

    describe("PageCtrl",()=> {
        describe('#constructor', () => {
            it("Vérification que le controleur peut récupérer un objet membre envoyé par le login service", () => {
                const pageCtrl = new PageCtrl({
                    member_id: 7,
                    login: 7,
                    name: 'tata'
                })
            })
        });
    });

    describe("#login", () => {
        it("je m'attends à voir la vue qui affiche le formulaire de login: la page/login", () => {
            const page = new PageCtrl();

            describe("#postLogin", () => {
                it("Je m'attends à ne rien recevoir et j'affiche le message 'Merci de saisir votre login.' ", () => {
                    const pageCtrl = new PageCtrl();

                    const req = {
                        body: {}
                    };
                    const res = {
                        render: (view, data) => {
                            expect(view).toBe('page/login');
                            expect(data.message).toBe('Merci de saisir votre login.')
                        }
                    };

                    pageCtrl.postLogin(req, res);
                });

                it("Je m'attends à recevoir un login vide et j'affiche le message 'Merci de saisir votre login.'", () => {
                    const pageCtrl = new PageCtrl();

                    const req = {
                        body: {
                            login: ''
                        }
                    };

                    const res = {
                        render: (view, data) => {
                            expect(view).toBe('page/login');
                            expect(data.message).toBe('Merci de saisir votre login.')
                        }
                    };

                    pageCtrl.postLogin(req, res);
                });

                it("Je m'attends à recevoir un login qui ne correspond à aucun membre et j'affiche le message 'Login invalide.'", () => {

                    const req = {
                        body: {
                            login: '7'
                        }
                    };

                    const loginService = {
                        login: (login) => {
                            expect(login).toBe('7');
                            return new Promise((resolve) => {
                                resolve(false);
                            });
                        }
                    };

                    const pageCtrl = new PageCtrl(loginService);

                    const res = {
                        render: (view, data) => {
                            expect(view).toBe('page/login');
                            expect(data.message).toBe('Login invalide.')
                        }
                    };

                    pageCtrl.postLogin(req, res);

                });

                it("Je m'attends à recevoir un login qui correspond à un membre enregistré et je le redirige vers la page d'accueil'", () => {

                    const req = {
                        body: {
                            login: '7'
                        }
                    };

                    const loginService = {
                        login: (login) => {
                            expect(login).toBe('7');
                            return new Promise((resolve) => {
                                resolve(true);
                            });
                        }
                    };

                    const pageCtrl = new PageCtrl(loginService);

                    const res = {
                        render: (view, data) => {
                            expect(view).toBe('index/index');
                            expect(data.message).toBe('Vous êtes connecté.');
                        }
                    };

                    pageCtrl.postLogin(req, res);

                });
            });
        });
    });
