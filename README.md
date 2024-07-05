# DATN

# Hướng dẫn cài đặt

Đây là hướng dẫn cài đặt cho dự án sau khi bạn đã giải nén mã nguồn.

## Các bước cài đặt

1. **Import file .sql vào cơ sở dữ liệu:**
   - Đảm bảo rằng bạn đã có cơ sở dữ liệu trống để nhập dữ liệu.
   - Sử dụng công cụ quản lý cơ sở dữ liệu của bạn để import file `.sql` vào cơ sở dữ liệu của bạn.

2. **Cài đặt các dependencies cho client:**
   - Mở terminal và đi đến thư mục `client`.
   - Chạy lệnh sau để cài đặt các dependencies:
     ```
     npm i
     ```

3. **Cài đặt các dependencies cho server:**
   - Mở terminal và đi đến thư mục `server`.
   - Chạy lệnh sau để cài đặt các dependencies:
     ```
     npm i
     ```

4. **Chạy ứng dụng:**
   - Để chạy ứng dụng local, sử dụng lệnh sau để khởi động client và server:
     - Đổi host trong file config và databaseconfig thành "localhost" 
     - Trong thư mục `client`:
       ```
       npm start
       ```
     - Trong thư mục `server`:
       ```
       npm start
       ```
   
   - Để chạy ứng dụng bằng Docker, sử dụng lệnh sau để build và chạy:
    - Đổi host trong file config và databaseconfig thành "mysql" 
     ```
     docker-compose up --build
     ```
