# Sử dụng Ubuntu làm nền tảng ổn định
FROM ubuntu:22.04

# Cài đặt trình biên dịch và môi trường chạy cho C++, Python, Java
RUN apt-get update && apt-get install -y \
    g++ \
    python3 \
    openjdk-17-jdk \
    && rm -rf /var/lib/apt/lists/*

# Tạo người dùng an toàn
RUN useradd -m judge_user
USER judge_user
WORKDIR /home/judge_user

# Môi trường đã sẵn sàng cho đa ngôn ngữ
ENV PATH="/usr/local/bin:/usr/bin:/bin"