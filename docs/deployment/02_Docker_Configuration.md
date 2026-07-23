# 02. Docker Configuration Design

## 1. Tổng quan

Tài liệu này mô tả cấu hình Docker cho hệ thống website chấm C++ D:\DuAnLapTrinh.

Docker được sử dụng để:

* Đóng gói ứng dụng.
* Chuẩn hóa môi trường chạy.
* Đơn giản hóa triển khai.
* Hỗ trợ phát triển và Production.
* Tạo nền tảng chuyển đổi sang Kubernetes.

Các dịch vụ chính:

```text
Frontend Container

Backend Container

PostgreSQL Container

Redis Container

Message Queue Container

Judge Worker Container

Monitoring Container

```

---

# 2. Docker Architecture

Mô hình:

```text
                    Docker Network


        +-------------------------------+

        |                               |

        v                               v


 Frontend Container             Backend Container


                                        |

                                        v


        +---------------+---------------+

        |               |               |

        v               v               v


 PostgreSQL          Redis          Queue


                                        |

                                        v


                               Judge Worker


```

---

# 3. Docker Project Structure

Cấu trúc:

```text
D:\DuAnLapTrinh

│

├── docker

│

├── docker-compose.yml

│

├── backend

│   └── Dockerfile

│

├── frontend

│   └── Dockerfile

│

└── judge

    └── Dockerfile

```

---

# 4. Docker Compose Overview

File:

```text
docker-compose.yml

```

Quản lý:

* Container.
* Network.
* Volume.
* Environment.
* Dependency.

---

# 5. Docker Services

Danh sách:

```yaml
services:

 frontend

 backend

 postgres

 redis

 queue

 judge-worker

```

---

# 6. Frontend Docker Configuration

## Dockerfile

Ví dụ:

```dockerfile
FROM node:22-alpine


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


FROM nginx:alpine


COPY --from=0 /app/dist /usr/share/nginx/html

```

---

# 7. Frontend Deployment

Luồng:

```text
Source Code

      |

      v

Node Build

      |

      v

Static Files

      |

      v

Nginx Container

```

---

# 8. Backend Docker Configuration

Ví dụ:

```dockerfile
FROM node:22-alpine


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 8080


CMD ["npm","start"]

```

---

# 9. Backend Environment

Không ghi trực tiếp:

```text
Database Password

JWT Secret

API Key

```

Sử dụng:

```text
.env

Docker Secret

Environment Variable

```

---

# 10. PostgreSQL Container

Image:

```text
postgres:latest

```

Cấu hình:

```yaml
postgres:

 image: postgres

 environment:

   POSTGRES_DB:

   POSTGRES_USER:

   POSTGRES_PASSWORD:

```

---

# 11. Database Volume

Dữ liệu phải tồn tại khi Container restart.

Volume:

```text
postgres_data


        |

        v


/var/lib/postgresql/data

```

---

# 12. Redis Container

Mục đích:

* Cache.
* Session.
* Queue.

Cấu hình:

```yaml
redis:

 image: redis

 restart: always

```

---

# 13. Message Queue Container

Có thể sử dụng:

```text
RabbitMQ

Kafka

Redis Queue

```

Vai trò:

```text
Submission

      |

      v

Queue

      |

      v

Judge Worker

```

---

# 14. Judge Worker Container

Judge Worker chạy độc lập.

Cấu trúc:

```text
Judge Container


 |

 +-- Compiler

 |

 +-- Runtime Environment

 |

 +-- Test Executor

```

---

# 15. Judge Isolation

Mỗi bài chấm cần:

* Container riêng.
* Giới hạn CPU.
* Giới hạn RAM.
* Giới hạn thời gian.

Ví dụ:

```text
CPU Limit

1 Core


Memory Limit

512MB


Timeout

2s

```

---

# 16. Docker Network

Tạo Network riêng:

```text
duanlaptrinh-network

```

Các container giao tiếp:

```text
backend

      |

      v

postgres


backend

      |

      v

redis

```

---

# 17. Container Communication

Không dùng:

```text
localhost

```

Trong Docker:

```text
postgres:5432

redis:6379

backend:8080

```

---

# 18. Docker Compose Example

Cấu trúc:

```yaml
version: "3.9"


services:


 backend:

   build: ./backend

   ports:

    - "8080:8080"


 postgres:

   image: postgres

   volumes:

    - postgres_data:/var/lib/postgresql/data


 redis:

   image: redis



volumes:


 postgres_data:

```

---

# 19. Container Restart Policy

Production:

```yaml
restart: always

```

Mục đích:

* Tự khởi động lại.
* Tăng tính sẵn sàng.

---

# 20. Health Check

Mỗi service cần:

```text
Health Endpoint

Container Check

Dependency Check

```

Ví dụ:

```text
GET /health

```

---

# 21. Docker Logging

Không lưu log trong container.

Sử dụng:

```text
Docker Logging Driver

ELK Stack

Loki

```

---

# 22. Image Optimization

Nguyên tắc:

* Dùng Alpine Image.
* Multi-stage Build.
* Xóa file không cần thiết.
* Không chạy root.

---

# 23. Security Configuration

Container:

Không nên:

```text
RUN AS ROOT

Expose Unused Port

Store Secret

```

Nên:

```text
Non-root User

Minimal Image

Read-only Filesystem

```

---

# 24. Local Development Workflow

Quy trình:

```text
Clone Repository

        |

        v

Create .env

        |

        v

docker compose up

        |

        v

Development

```

---

# 25. Production Build Workflow

Quy trình:

```text
Source Code

      |

      v

Docker Build

      |

      v

Image Registry

      |

      v

Production Deploy

```

---

# 26. Container Registry

Lưu Image:

```text
Docker Hub

Private Registry

Cloud Registry

```

---

# 27. Backup Container Configuration

Cần backup:

```text
Docker Compose

Environment Config

Dockerfile

Migration File

```

---

# 28. Migration Execution

Khi Deploy:

```text
Start Database

        |

        v

Run Migration

        |

        v

Start Backend

        |

        v

Start Frontend

```

---

# 29. Future Kubernetes Migration

Docker là nền tảng cho:

```text
Deployment

Service

Pod

ConfigMap

Secret

```

---

# 30. Kết luận

Docker Configuration Design giúp hệ thống:

* Chạy nhất quán trên mọi môi trường.
* Dễ triển khai.
* Dễ mở rộng.
* An toàn hơn.
* Sẵn sàng chuyển sang kiến trúc Cloud Native.

---

# End of Document
