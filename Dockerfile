#使用nodejs
FROM finfosoft/nodejs-npm-8

#维护者信息
MAINTAINER zhangxuanchao "53536364@qq.com"

#nodejs 文件上传到容器中
ADD ff-lanyue-weather-bak.tar /home/app/webapps/
#ADD run.sh run.sh
#RUN chmod +x run.sh

WORKDIR /home/app/webapps/ff-lanyue-weather-bak

RUN npm config set registry https://registry.npm.taobao.org

RUN npm install

CMD ["node","server.js"]
