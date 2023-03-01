docker build -t heroes-manager-image .
docker run --name heroes-manager-container -d -p 8080:80 heroes-manager-image