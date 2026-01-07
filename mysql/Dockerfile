FROM mysql:8.0

ENV MYSQL_DATABASE=gestao_testes
ENV MYSQL_USER=appuser
ENV MYSQL_PASSWORD=apppass
ENV MYSQL_ROOT_PASSWORD=root

COPY 01-schema.sql /docker-entrypoint-initdb.d/
COPY 02-seed.sql /docker-entrypoint-initdb.d/
