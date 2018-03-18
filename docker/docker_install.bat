docker kill parkd_run
docker rm parkd_run
docker build -t parkd_app .
docker run -d --name parkd_run --mount type=bind,source="%~dp0\"..,target=/app --restart=always -p 80:80 -t parkd_app
