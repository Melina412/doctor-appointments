FROM node:alpine
WORKDIR /app
COPY . .
RUN npm i
# ENV PORT 3000
# EXPOSE ${PORT}
EXPOSE 3000
CMD ["npm", "run", "dev"]