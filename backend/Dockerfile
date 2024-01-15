FROM node:alpine
WORKDIR /app
COPY . .
RUN npm i
ENV PORT 3000
EXPOSE ${PORT}
CMD ["npm", "run", "dev"]