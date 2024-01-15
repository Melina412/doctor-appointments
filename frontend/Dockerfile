FROM node:alpine
WORKDIR /app
COPY . .
RUN npm i
ENV PORT 5173
EXPOSE ${PORT}
CMD ["npm", "run", "dev","--", "--host"]