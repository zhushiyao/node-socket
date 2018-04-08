
# FROM registry.docker-cn.com/library/node:7.7.4
FROM zephyrdev/node-with-cnpm

ADD /src /root/src 
ADD app.js  /root/app.js 
ADD server.js /root/server.js 
ADD .babelrc /root 
ADD index.html /root/index.html 
ADD package.json /root/package.json
ADD webpack.config.js /root/webpack.config.js 

WORKDIR /root 

# RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
# RUN npm -v && cnpm -v && ls
# RUN cnpm install && npm run build 
# RUN npm config set registry https://registry.npm.taobao.org
RUN npm -v && cnpm install && npm run build 
RUN ls 

# COPY asset /root/asset
# COPY app.js /root/app.js
# COPY server.js /root/server.js 
# COPY index.html /root/index.html 
# COPY src/node /root/src/node 
CMD [ "npm", "run", "server"]