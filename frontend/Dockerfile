FROM node:alpine
WORKDIR /app
COPY . .
RUN npm i
# ENV PORT 5173
# EXPOSE ${PORT}
EXPOSE 5173
CMD ["npm", "run", "dev","--", "--host"]