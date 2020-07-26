FROM python:3.8-alpine

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR usr/src/backend/

COPY . .


RUN apk update && apk add --update make

RUN \
    apk add --no-cache postgresql-libs jpeg-dev zlib-dev && \
    apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev jpeg-dev zlib-dev

RUN \
    python -m pip install -r requirements.txt --no-cache-dir && \
    apk --purge del .build-deps
