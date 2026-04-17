FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

RUN npm run build

COPY build .

EXPOSE 3000

CMD ["npx", "serve", "-s", "build", "-l", "3000"]