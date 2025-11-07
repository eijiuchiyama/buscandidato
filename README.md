# BusCandidato

## Descrição/Description
O projeto se trata da criação de um site web que busca exibir, de forma simples, dados de políticos atuais e partidos da Câmara dos Deputados do Brasil, com o objetivo de auxiliar pessoas a encontrarem seu candidato, caso este já esteja inserido na política, e a conhecerem melhor seus representantes.

The project involves creating a website that aims to display, in a simple way, data on current politicians and parties in the Brazilian Chamber of Deputies, with the goal of helping people find their candidate, if they are already involved in politics, and to learn more about their representatives.

## Ferramentas utilizadas/Used tools

O projeto utiliza os frameworks React e Bootstrap no front-end e o framework Django no back-end. Este projeto utiliza também o banco de dados SQLite para armazenar os dados da API, uma vez que notamos que a consulta de dados através da API levava um tempo maior que o desejável.

The project uses the React and Bootstrap frameworks on the front-end and the Django framework on the back-end. This project also uses the SQLite database to store API data, since we noticed that querying data through the API was taking longer than desired.

## Como executar/How to run

### Front-end

Na pasta _buscandidato_ do front, abrir o terminal e utilizar o comando `npm start`. Automaticamente o navegador abrirá a página da aplicação. 

**Obs.:** no primeiro uso pode ser necessário utilizar o comando `npm install` na pasta para criar o diretório _node_modules_ para ser possível executar a página inicial.

### Back-end

O back-end contém um arquivo marcado com GIT LFS. Para ser possível acessar o arquivo e executar o comando para iniciar o back-end, é preciso instalar o LFS na máquina, com os comandos:

`sudo apt install git-lfs`

`git lfs install`

Para puxar o arquivo para a sua máquina, execute, no repositório `git lfs pull`

Após isso, na pasta do back, abrir o terminal e utilizar o comando `python3 manage.py runserver`. O back-end será então exibido no navegador em http://127.0.0.1:8000/admin/

---

### Front-end

In the `buscandidato` folder of the front-end, open the terminal and use the command `npm start`. The browser will automatically open the application page.

**Note:** On first use, it may be necessary to use the command `npm install` in the folder to create the `node_modules_` directory to be able to run the initial page.

### Back-end

The back-end contains a file marked with GIT LFS. To access the file and run the command to start the back-end, you need to install LFS on your machine with the commands:

`sudo apt install git-lfs`

`git lfs install`

To pull the file to your machine, run `git lfs pull` in the repository.

After that, in the back-end folder, open the terminal and use the command `python3 manage.py runserver`. The back-end will then be displayed in the browser at http://127.0.0.1:8000/admin/

## Autores/Authors

Fernando Yang

João Mantovani

Lucas dos Anjos Dantas Teixeira

Lucas Eiji Uchiyama

Marcelo Mendes Spessoto Junior

Thiago Sikusawa

## Licença/License

A licença utilizada no projeto é a GNU GPL 3.0, que pode ser acessada pelo arquivo LICENSE.

The license used in this project is the GNU GPL 3.0, which can be accessed via the LICENSE file.
