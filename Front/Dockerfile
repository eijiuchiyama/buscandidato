FROM ubuntu
COPY buscandidato /home/buscandidato

RUN apt update -y && apt install -y npm nodejs
RUN chown -R ubuntu /home/buscandidato

USER ubuntu
WORKDIR /home/buscandidato 

RUN npm install

ENTRYPOINT npm start
