FROM node:16.16.0 as build-stage
WORKDIR /var/jenkins_home/workspace/bbkk_frontend/FrontEnd
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#COPY --from=build-stage /var/jenkins_home/workspace/ggotmari/frontend/ggotmari/build /usr/share/nginx/html
#COPY --from=build-stage /var/jenkins_home/workspace/deploytest/testproject_react/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["npm", "run", "dev"]
