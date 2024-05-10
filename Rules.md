# regras para o login

[ ] não é possivel o usuario logar sem antes estar cadastrado
[ ] não é possivel fazer o registro já estando logado

se eu tenho um refresh token quer dizer que em algum momento eu me cadastrei e não é possivel fazer o login sem estar cadstrado, logo o refresh token decidira se um usuario já possui contanta e consequentemente se já esta logado.

## criar mensagens mais declarativas
- criar mensagens mais declarativas tanto pro server como para client
- mesma condição mesma mensgen? ao menos no client.

## tudo que já faço
- cadastrar o usuario.
- logar o usuario na app.
- redirecionar o usuario antes de tudo se estiver logado.
- refresh token
- access token
- auth via email./ login via email(magic links)
- verificar se o usuario já esta logado na app.
- verificar se o usuario já esta cadastrado.

## o que não esta feito no back
- *

## o que não esta feito na ui
- ui de login e cadastrado
- home

## o que mais podemos fazer?
- em login redirecionar o usuario se já estiver logado


## consequencias
- se redirecionar o user já logado o trabalho para dizer "user already logged" sera todo em vão

## possiveis falhas na regra de negocios? talvez
- o usuario já logado quando vai executar um cadastrado como dito antes ele é redirecionado para home antes de tudo mas se eu quiser registrar(o mesmo usuario tentando registrar-se com outro email) ele sera redirecionado também o que não é mau mas pode ser visto que nada ainda esta totalmente definido.