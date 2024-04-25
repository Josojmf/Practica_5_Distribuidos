# Jose María Fernández  Sincronizador
## Sincronizado mediante:
 - 1 Servidor externo:
    - Link : [World Time Api](http://worldtimeapi.org/api/timezone/Europe/Madrid)
 - 2 Syncronización interna:
   - <img src="/Images/image.png">
 - 3 Servidor NTP Propio
   <img src="/Images/NTPSERVER.png">
# Arquitectura
<img src=""><img src="/Images/image.png">

# Install dependencies:
````
npm install
````
# Run both scripts
````
npm run start
````
# Run just NTP server
````
npm run startntp
````
# Run just Chat server
````
npm run start chat
````
# Run Docker whole Application
````
docker compose up --build
````
# Run whole Application Uploading to Docker Hub (Need to Login First )
````
npm run build`
````


# TODO:
<li>
Mirar Api Discord microservicios
</li>
<li>
Mirar Api Telegram microservicios
</li>

