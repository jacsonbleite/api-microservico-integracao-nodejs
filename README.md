# Simpes Arquiterua de Microserviço (p/ autenticação) em API com NodeJS

## Desenvolvido em TypeScript

### Modo de autentiação (BASCI AUTH e JWT)

### Retorno dos dados da API em JSON

Ainda preciso implementar **variáveis de ambiente** e **refresh token**
esssas implementações ficarão para os proximos dias livres para estudo (22 e 23/01) :eyeglasses:
`que Deus me ajude` :pray:.

## Como testar?

Modo de desenvolvimento
`npm run dev`

Servidor startado
`http://localhost:3000`

Endpoints:

##### Usuário

- GET /users
- GET /users/:uuid
- POST /users
- PUT /users/:uuid
- DELETE /users/:uuid

##### Autenticação

- POST /token
- POST /token/validate

Projeto desenvolvido no curso Microsserviços e Integrações com NodeJS
ministrado pelo professor [Renan JP](https://github.com/RenanJPaula) na plataforma [DIO](https://web.dio.me/) no Bootcamp [Eduzz](https://www.eduzz.com/) Fullstack Developer #2

\*Obs: No diretório sql tem o arquivo init.sql lá se encontra o sql no nosso sistema
campos: **uuid(string)** e **username(string)** \*
