#!/bin/sh

#docker service create --name proxy --network churchclerk --publish 18080:80 --publish 8443:443 --replicas 1 --mount type=bind,source=/c/wip/church/clerk/secrets/nginx.conf,target=/etc/nginx/nginx.conf,readonly nginx

CWD=`pwd`
SOURCE=${CWD}/src

docker service create --name react --network churchclerk --mount type=bind,source=$SOURCE,target=/app/src myapp:latest
