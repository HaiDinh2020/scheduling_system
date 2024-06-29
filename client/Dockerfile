# FROM node:alpine

# COPY package.json ./
# COPY package-lock.json ./
# COPY ./ ./

# RUN npm i

# EXPOSE 3000
# CMD ["npm", "run", "start"]
# /client/Dockerfile
FROM node:alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "run", "start"]


# Sử dụng một image Node chính thức làm base image
# FROM node:18

# # Thiết lập thư mục làm việc
# WORKDIR /app

# # Sao chép package.json và package-lock.json vào thư mục làm việc
# COPY package*.json ./

# # Cài đặt các dependencies
# RUN npm install

# # Sao chép toàn bộ mã nguồn của bạn vào thư mục làm việc
# COPY . .

# # Build ứng dụng
# RUN npm run build

# # Sử dụng một image Nginx chính thức để serve ứng dụng React
# FROM nginx:alpine

# # Sao chép các file build từ bước trước vào thư mục gốc của Nginx
# COPY --from=0 /app/build /usr/share/nginx/html

# # Expose port 3000 để có thể truy cập từ bên ngoài
# EXPOSE 3000

# # Khởi động Nginx server
# CMD ["nginx", "-g", "daemon off;"]
