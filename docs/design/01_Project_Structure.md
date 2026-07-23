# 01. Project Structure Design

## 1. Tổng quan

Tài liệu này mô tả cấu trúc thư mục thực tế của dự án D:\DuAnLapTrinh.

Mục tiêu:

- Tách biệt rõ Frontend, Backend, Database và Judge System.
- Dễ phát triển.
- Dễ kiểm thử.
- Dễ triển khai.
- Dễ mở rộng trong tương lai.

---

# 2. Root Project Structure


Cấu trúc tổng thể:


```
D:\DuAnLapTrinh

│
├── docs
│   │
│   ├── specification
│   │
│   ├── design
│   │
│   ├── api
│   │
│   └── database
│
├── frontend
│
├── backend
│
├── judge
│
├── database
│
├── tests
│
├── deployment
│
├── scripts
│
├── .gitignore
│
├── README.md
│
└── LICENSE

```

---

# 3. Documentation Structure


Thư mục:


```
docs
```

Chứa toàn bộ tài liệu dự án.


Cấu trúc:


```
docs

|
├── specification

|
├── design

|
├── api

|
└── database

```


---

# 4. Frontend Structure


Thư mục:


```
frontend
```


Cấu trúc:


```
frontend

│
├── public
│
├── src
│   │
│   ├── components
│   │
│   ├── pages
│   │
│   ├── services
│   │
│   ├── hooks
│   │
│   ├── store
│   │
│   ├── utils
│   │
│   └── assets
│
├── package.json
│
└── README.md

```


---

# 5. Backend Structure


Thư mục:


```
backend
```


Cấu trúc:


```
backend

│
├── src
│   │
│   ├── controllers
│   │
│   ├── services
│   │
│   ├── repositories
│   │
│   ├── models
│   │
│   ├── middleware
│   │
│   ├── routes
│   │
│   ├── config
│   │
│   └── utils
│
├── tests
│
├── package.json
│
└── README.md

```


---

# 6. Judge System Structure


Thư mục:


```
judge
```


Cấu trúc:


```
judge

│
├── compiler
│
├── executor
│
├── checker
│
├── sandbox
│
├── worker
│
├── tests
│
└── README.md

```


---

# 7. Database Structure


Thư mục:


```
database
```


Cấu trúc:


```
database

│
├── migrations
│
├── seeders
│
├── scripts
│
└── README.md

```


---

# 8. Testing Structure


Thư mục:


```
tests
```


Cấu trúc:


```
tests

│
├── frontend
│
├── backend
│
├── judge
│
├── integration
│
└── performance

```


---

# 9. Deployment Structure


Thư mục:


```
deployment
```


Cấu trúc:


```
deployment

│
├── docker
│
├── github-actions
│
├── environment
│
└── README.md

```


---

# 10. Script Management


Thư mục:


```
scripts
```


Chứa:


```
build scripts

database scripts

deployment scripts

maintenance scripts

```


---

# 11. Configuration Rules


Các file cấu hình:


```
.env

config.json

settings.yaml

```


Quy tắc:


- Không lưu secret trong source code.
- Không commit file môi trường.
- Sử dụng biến môi trường.


---

# 12. Naming Rules


Folder:

```
lowercase
```


File:

```
lowercase_with_underscore
```


Ví dụ:


```
user_controller.js

database_config.json

judge_worker.cpp

```


---

# 13. Git Repository Structure


Repository:


```
D:\DuAnLapTrinh

        |

        v

Git Repository

```


Branch:


```
main

develop

feature/*

bugfix/*

release/*

```


---

# 14. Development Workflow


Quy trình:


```
Create Feature

        |

Code

        |

Test

        |

Review

        |

Merge

        |

Deploy

```


---

# 15. Kết luận


Project Structure Design tạo nền tảng cho toàn bộ quá trình phát triển website chấm C++.

Cấu trúc này đảm bảo:

- Rõ ràng.
- Dễ quản lý.
- Dễ mở rộng.
- Phù hợp với kiến trúc đã thiết kế trong Specification.


---

# End of Document