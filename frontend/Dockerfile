FROM node:22.13.1-slim

COPY dist/ /frontend/

RUN npm install serve -g

CMD [ "serve", "-S", "frontend" ]