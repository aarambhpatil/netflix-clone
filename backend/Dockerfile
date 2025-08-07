FROM node:22.13.1-slim

COPY . /backend
COPY .env /

RUN cd backend && npm i

CMD [ "node", "backend/server.js" ]