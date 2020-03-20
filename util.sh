#!/bin/sh
#docker service create --name addressapi --network=churchclerk --secret source=churchclerk,target=churchclerk --publish 18080:8080 dongpak/addressapi:latest

#docker service create --name addressapi --network=churchclerk --publish 18080:8080 --env CHURCHCLERK_DBHOST=clerkdb:3306 --env CHURCHCLERK_DBUSER=apiapp --env CHURCHCLERK_DBPASS=password --env CHURCHCLERK_JWT_SECRET=churchclerk --env APP_ARG=--debug dongpak/addressapi:latest


#docker run --name proxy --add-host addressapi:192.168.1.100 -d -p 8080:80 nginx

#docker service create --name proxy --network churchclerk --publish 18080:80 --publish 8443:443 --replicas 1 --mount type=bind,source=/c/wip/church/clerk/secrets/nginx.conf,target=/etc/nginx/nginx.conf,readonly nginx

docker service create --name react --network churchclerk myapp:latest
