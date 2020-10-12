FROM mongo:4.2.2 as mongo

RUN apt update
RUN apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt install nodejs -y
RUN apt install zip -y

# Copy main script
COPY package.json /package.json
RUN npm install

COPY index.js /index.js
COPY docker-entrypoint.sh /docker-entrypoint.sh

RUN mkdir /backup

ENTRYPOINT [ "sh", "/docker-entrypoint.sh" ]