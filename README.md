Na úvodní stránce vyhledejte požadovaného autora, v detailu autora můžete označit oblíbené knížky. Přehled oblíbených knížek je potom na stránce favourite.

Run
Vytvoření kontejneru:
docker build -t demo .


Spuštění kontejneru:
docker run -it -p 3000:3000 demo


Na lokálním vývoji používám v prohlížeči chrome plugin pro blokování CORS: Allow CORS: Access-Control-Allow-origin (https://mybrowseraddon.com/access-control-allow-origin.html)