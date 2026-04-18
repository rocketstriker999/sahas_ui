FROM node:20-alpine

WORKDIR /app

# 1. Copy dependency files
COPY package.json package-lock.json* ./

# 2. Install dependencies
RUN npm install

# 3. Copy the rest of your source code (src, public, etc.)
COPY . .

# 4. Generate the build folder inside the container
RUN npm run build

# 5. (REMOVED) COPY build . <- This was the line causing the error

EXPOSE 3000

# 6. Serve the folder that was created in step 4
CMD ["npx", "serve", "-s", "build", "-l", "3000"]