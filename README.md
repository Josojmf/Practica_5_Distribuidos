# Jose María Fernández  Sincronizador
## Sincronizado mediante:
 - 1 Servidor externo:
    - Link : [World Time Api](http://worldtimeapi.org/api/timezone/Europe/Madrid)
 - 2 Syncronización interna:
   - <img src="/Images/image.png">
 - 3 Servidor NTP Propio
   <img src="/Images/NTPSERVER.png">
# Link Operativo:

https://practica-5-distribuidos.onrender.com/
# RUN LOCAL
## Install dependencies:
````
npm install
````
## Run both scripts
````
npm run start
````
## Run just NTP server
````
npm run startntp
````
## Run just Chat server
````
npm run start chat
````
# Run Docker whole Application on local
## If you build the app, you will need to change the username,dockerhub repo and tag of your docker build
````
docker compose up --build
````
# Run whole Application Uploading to Docker Hub (Need to Login First )
````
npm run build
````
# Run Application Monitor on newrelic
````
npm run monitor
````




# TODO:
Mirar Api Discord microservicios
</li>
<li>
Mirar Api Telegram microservicios
</li>


