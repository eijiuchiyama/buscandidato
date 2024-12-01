FROM python:3
USER root

RUN apt update -y && apt install -y git-lfs && git lfs install

WORKDIR /home
RUN git clone https://gitlab.com/eijiuchiyama/buscandidato.git

WORKDIR /home/buscandidato
RUN git lfs install && git lfs pull
RUN pip install django

WORKDIR /home/buscandidato/Back
ENTRYPOINT python3 manage.py runserver 0.0.0.0:8000
