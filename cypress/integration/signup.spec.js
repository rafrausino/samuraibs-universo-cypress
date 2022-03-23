import signupPage from "../support/pages/signup";

describe("cadastro", () => {
  context("quando o usuário é novato", () => {
    // definindo a massa de testes
    const user = {
      name: "Fernando Papito",
      email: "papito@samuraibs.com", 
      password: "pwd123",
    };

    before(() => {
      // removendo o usuário para que a massa seja sempre válida
      cy.task("removeUser", user.email).then(function (result) {
        console.log(result);
      });
    });

    it("deve cadastrar com sucesso", () => {
      signupPage.go();    
      signupPage.form(user);   
      signupPage.submit();
      signupPage.toast.shouldHaveTest(
        "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"
      );
    });
  });

  context("quando o email já existe", () => {
    const user = {
      name: "João Lucas",
      email: "joao@samuraibs.com",
      password: "pwd123",
      is_provider: true,
    };

    before(() => {
      cy.task("removeUser", user.email).then(function (result) {
        console.log(result);
      });

      cy.request("POST", "http://localhost:3333/users", user).then(function (
        response
      ) {
        expect(response.status).to.eq(200);
      });
    });

    it("não deve cadastrar o usuário", () => {
      signupPage.go();
      signupPage.form(user);
      signupPage.submit();
      signupPage.toast.shouldHaveTest("Email já cadastrado para outro usuário.");
    });
  });

  context('quando o email é incorreto', () => {
    const user = {
      name: "Elizabeth Olsen",
      email: "liza.yahoo.com",
      password: "pwd123",
      is_provider: true
    }

    it('deve exibir mensagem de alerta', () => {
      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.alertHaveText('Informe um email válido')
    })
  })

  context('quando a senha é muito curta', () => {
    const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

    beforeEach(() => {
      signupPage.go()
    });

    passwords.forEach((password) => {
      it('não deve cadastrar com a senha: ' + password, () => {
        const user = {
        name: "Jason Friday",
        email: "jason@gmail.com",
        password: password,
      }
        signupPage.form(user)
        signupPage.submit()
      })
    })

    afterEach(() => {
      signupPage.alertHaveText('Pelo menos 6 caracteres')
    });
  })

  context.only('quando não preencho nenhum dos campos', function(){
     const alertMessages = [
       'Nome é obrigatório',
       'E-mail é obrigatório',
       'Senha é obrigatória'
     ]

     before(function(){
       signupPage.go()
       signupPage.submit()
     })

     alertMessages.forEach((alert) => {
        it('deve exibir ' + alert.toLowerCase(), () => {
            signupPage.alertHaveText(alert)
        })
     })
  })
});
