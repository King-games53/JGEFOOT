const expect = require('expect');
const IndexCtrl = require('../../app/controllers/IndexCtrl');

describe("IndexCtrl", () => {
    describe("#constructor", () => {
        it("Verfication de la présence de la propriété registerService", () => {
            const indexCtrl = new IndexCtrl(true);

            expect(indexCtrl._registerService).toBe(true);
        });
    });

    describe("#register", () => {
        // beforeEach(() => {
        //     console.log("before");
        // });
        //
        // afterEach(() => {
        //     console.log("after");
        // });

        it("Test de retour : index/index", () => {
            const index = new IndexCtrl();

            const req = { };

            const res = {
                render: view => {
                    expect(view).toBe('index/index');
                }
            };

            index.register(req, res);
        });
    });

    describe("#postRegister", () => {
        it("Test tous les champs sont ok (1)", () => {
            const indexCtrl = new IndexCtrl();

            const req = {
                body: { }
            };

            const res = {
                render: (view, data) => {
                    expect(view).toBe('index/index');
                    expect(data.message).toBe('Tous les champs sont obligatoires.')
                }
            };

            indexCtrl.postRegister(req, res);
        });

        it("Test tous les champs sont ok (2)", () => {
            const indexCtrl = new IndexCtrl();

            const req = {
                body: {
                    email: 'john.doe@domain.tld',
                    password: '',
                    confirm: '1234567890'
                }
            };

            const res = {
                render: (view, data) => {
                    expect(view).toBe('index/index');
                    expect(data.message).toBe('Tous les champs sont obligatoires.')
                }
            };

            indexCtrl.postRegister(req, res);
        });

        it("Test la défaillance du système", () => {
            const registerService = {
                register: () => {
                    return new Promise((resolve, reject) => {
                        reject('error');
                    });
                }
            };

            const indexCtrl = new IndexCtrl(registerService);

            const req = {
                body: {
                    email: 'john.doe@domain.tld',
                    password: '1234567890',
                    confirm: '1234567890'
                }
            };

            const res = {
                render: (view, data) => {
                    expect(view).toBe('index/index');
                    expect(data.message).toBe("Erreur système");
                }
            };

            indexCtrl.postRegister(req, res);
        });

        it("Test si le mdp et la confirmation sont ok", () => {
            const indexCtrl = new IndexCtrl();

            const req = {
                body: {
                    email: 'john.doe@domain.tld',
                    password: '1234567890',
                    confirm: '0987654321'
                }
            };

            const res = {
                render: (view, data) => {
                    expect(view).toBe('index/index');
                    expect(data.message).toBe('La confirmation est différente du mot de passe.');
                }
            };

            indexCtrl.postRegister(req, res);
        });

        it("Test si l'utilisateur existe déjà", () => {
            const registerService = {
                register: () => {
                    return new Promise(resolve => {
                        resolve('email_already_exists');
                    });
                }
            };

            const indexCtrl = new IndexCtrl(registerService);

            const req = {
                body: {
                    email: 'john.doe@domain.tld',
                    password: '1234567890',
                    confirm: '1234567890'
                }
            };

            const res = {
                render: (view, data) => {
                    expect(view).toBe('index/index');
                    expect(data.message).toBe("Un compte existe déjà avec cette adresse.")
                }
            };

            indexCtrl.postRegister(req, res);
        });

        it("Test que l'utilisateur reçoit un message de succès", () => {
            const registerService = {
                register: (email, password) => {
                    expect(email).toBe('john.doe@domain.tld');
                    expect(password).toBe('1234567890');

                    return new Promise(resolve => {
                        resolve('success');
                    });
                }
            };

            const indexCtrl = new IndexCtrl(registerService);

            const req = {
                body: {
                    email: 'john.doe@domain.tld',
                    password: '1234567890',
                    confirm: '1234567890'
                }
            };

            const res = {
                render: (view, data) => {
                    expect(view).toBe('index/index');
                    expect(data.message).toBe('Vous êtes enregistré.');
                }
            };

            indexCtrl.postRegister(req, res);
        });
    });
});










