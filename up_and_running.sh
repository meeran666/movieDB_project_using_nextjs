
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