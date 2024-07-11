FROM node:alpine
WORKDIR /app
COPY . .
RUN npm i
EXPOSE 5173
CMD ["npm", "run", "dev","--", "--host"]