FROM node:18-alpine

EXPOSE 8080

WORKDIR /home/node

COPY . .

RUN npm ci --omit=dev --ignore-scripts

CMD ["node", "./src/app.js"]
