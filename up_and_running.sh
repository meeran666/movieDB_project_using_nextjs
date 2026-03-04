#!/bin/bash

echo "Building Docker image..."
docker build -t nextjs_image .

echo "saving the image in .tar file"
docker save -o nextjs_image1.tar nextjs_image

echo "compress the .tar file"
xz nextjs_image1.tar

echo "transfer the .tar.xz file"
scp nextjs_image1.tar.xz digitalServer:/home/meeran/github/moviemania_proj

echo "delete the file .tar.xz file"
rm -rf nextjs_image1.tar.xz

ssh digitalServer << 'EOF'

echo "cd to project folder"
cd /home/meeran/github/moviemania_proj

echo "uncompress the .tar file"
unxz nextjs_image1.tar.xz

echo "load the .tar file"
docker load -i nextjs_image1.tar

echo "run docker compose"
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --force-recreate

echo "delete the .tar file"
rm -rf nextjs_image1.tar

EOF