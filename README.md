# BusCandidato

## Descrição
O projeto se trata da criação de um site web que busca exibir, de forma simples, dados de políticos atuais e partidos da Câmara Municipal de São Paulo, da Câmara dos Deputados e do Senado, com o objetivo de auxiliar pessoas a encontrarem seu candidato, caso este já esteja inserido na política, e a conhecerem melhor seus representantes.

## Ferramentas utilizadas

O projeto utiliza os frameworks React e Bootstrap no front-end e o framework Django no back-end. 

## Como executar

### Front-end

Na pasta _buscandidato_ do front, abrir o terminal e utilizar o comando `npm start`. Automaticamente o navegador abrirá a página da aplicação. 

**Obs.:** no primeiro uso pode ser necessário utilizar o comando `npm install` na pasta para criar o diretório _node_modules_ para ser possível executar a página inicial.

### Back-end

O back-end contém um arquivo marcado com GIT LFS. Para ser possível acessar o arquivo e executar o comando para iniciar o back-end, é preciso instalar o LFS na máquina, com os comandos:

`sudo apt install git-lfs`

`git lfs install`

Para puxar o arquivo para a sua máquina, execute, no repositório `git lfs pull`

Após isso, na pasta do back, abrir o terminal e utilizar o comando `python3 manage.py runserver`. O back-end será então exibido no navegador em http://127.0.0.1:8000/admin/

## Autores

Fernando Yang

João Mantovani

Lucas dos Anjos Dantas Teixeira

Lucas Eiji Uchiyama

Marcelo Mendes Spessoto Junior

Thiago Sikusawa

## Licença

A licença utilizada no projeto é a GNU GPL 3.0, que pode ser acessada pelo arquivo LICENSE.
