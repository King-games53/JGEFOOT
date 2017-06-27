const expect = require('expect');
const PageCtrl = require('../../app/controllers/PageCtrl');

// describe("PageCtrl", () => {
//     describe("#constructor", () => {
//         it("Verification de la présence de la propriété loginService", () => {
//             const pageCtrl = new PageCtrl(true);
//
//             expect(pageCtrl._loginService).toBe(true);
//         });
//     });
//
//     describe("#login", () => {
//         it("je m'attends à voir le vue qui affiche le formulaire de login: la page/login", () => {
//             const page = new PageCtrl();
//
//             const req = {
//             };
//
//             const res = {
//                 render: view => {
//                     expect(view).toBe('index/index');
//                 }
//             };
//
//             page.login(req, res);
//         });
//     });
//
//     describe("#postLogin", () => {
//         it("Je m'attends à ne rien recevoir et j'affiche le message 'Merci de saisir le login' ", () => {
//             const pageCtrl = new PageCtrl();
//
//             const req = {
//                 body: {
//
//                 }
//             };
//
//             const res = {
//                 render: (view, data) => {
//                     expect(view).toBe('index/index');
//                     expect(data.message).toBe('Merci de saisir votre login.')
//                 }
//             };
//
//             pageCtrl.postLogin(req, res);
//         });
//
//         it("Je m'attends à recevoir un login vide et j'affiche le message 'Merci de saisir le login'", () => {
//             const loginCtrl=new PageCtrl();
//             const req={
//                 body:{
//                     login:''
//                 }
//
//                 };
//             const res={
//                 render:(view,data)=>{
//                     expect(view).toBe('index/index');
//                     expect(data.message).toBe('Merci de saisir votre login.')
//                 }
//             };
//         loginCtrl.postLogin(req, res);
//
//         });
//
//
// });

    describe("PageCtrl",()=> {
        describe('#constructor', () => {
            it("Vérification que le controleur peut récupérer un objet membre envoyé par le login service", () => {
                const pageCtrl = new PageCtrl(true);

           expect(pageCtrl._loginService).toBe(true);
            })
        });

        describe("#postLogin",()=>{
        it("Je m'attends à recevoir un login qui correspond à un membre et j'affiche le message 'Vous êtes connecté.'", () => {
            const loginService={
                login: (login) => {
                    expect(login).toBe('7');
                    return new Promise(resolve => {
                        resolve('success');
                    });
                }
            };

            const loginMemberCtrl = new PageCtrl(loginService);

            const req = {
                body: {
                    login:'7'
                }

            };
            const res = {
                render: (view, data) => {
                    expect(view).toBe('index/index');
                    expect(data.message).toBe('Vous êtes connecté.');
                }
            };
            loginMemberCtrl.postLogin(req, res)
        });
        });

        describe("#postLogin",()=>{
            it("Je m'attends à recevoir un login qui ne correspond pas à un membre et j'affiche le message 'Identifiant n'existe pas.'", () => {
                const loginService={
                    login: (login) => {
                        return new Promise((resolve,reject) => {
                            resolve('Identifiant n\'existe pas');
                        });
                    }
                };

                const loginCheckCtrl = new PageCtrl(loginService);

                const req = {
                    body: {
                        login:'8'
                    }

                };
                const res = {
                    render: (view, data) => {
                        expect(view).toBe('index/index');
                        expect(data.message).toBe('Identifiant n\'existe pas');

                    }
                };
                loginCheckCtrl.postLogin(req, res)
            });
        });
    });









