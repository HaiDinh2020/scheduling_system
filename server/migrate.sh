#!/bin/sh

# Đợi đến khi MySQL sẵn sàng
until nc -z -v -w30 mysql 3309
do
  echo "Đang chờ kết nối đến cơ sở dữ liệu..."
  sleep 1
done

# Di chuyển đến thư mục src
cd src

# Chạy migrations
npx sequelize-cli db:migrate
