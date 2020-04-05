# build environment
FROM node:alpine as build
WORKDIR /app
COPY package.json ./
RUN npm config set registry https://registry.npmjs.org/
RUN npm install
COPY . /app
RUN npm run build

# production environment
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]