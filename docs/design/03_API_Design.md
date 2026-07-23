# 03. API Design

## 1. Tổng quan

Tài liệu này mô tả thiết kế hệ thống API của website chấm C++ D:\DuAnLapTrinh.

API là lớp giao tiếp giữa:

```
Frontend

    |

    v

Backend API

    |

    +----------------+

    |                |

    v                v

Database        Judge System

```

Mục tiêu:

- Cung cấp giao tiếp thống nhất giữa các module.
- Tách biệt Frontend và Backend.
- Dễ mở rộng.
- Dễ kiểm thử.
- Đảm bảo bảo mật.

---

# 2. API Architecture


Hệ thống sử dụng mô hình:

```
REST API

+

JSON Data Format

+

HTTP Protocol

```


Luồng xử lý:


```
Client Request

        |

        v

API Router

        |

        v

Controller

        |

        v

Service Layer

        |

        v

Repository

        |

        v

Database

```


---

# 3. API Base Configuration


Base URL:


Development:

```
http://localhost:3000/api
```


Production:

```
https://domain.com/api
```


API Version:


```
/api/v1
```


Ví dụ:


```
GET

/api/v1/problems

```

---

# 4. HTTP Method Convention


Sử dụng chuẩn REST:


| Method | Mục đích |
|-|-|
| GET | Lấy dữ liệu |
| POST | Tạo dữ liệu |
| PUT | Cập nhật toàn bộ |
| PATCH | Cập nhật một phần |
| DELETE | Xóa dữ liệu |


---

# 5. Response Format


Tất cả API trả về cùng một định dạng:


## Success Response


```json
{
    "success":true,
    "data":{}
}
```


---

## Error Response


```json
{
    "success":false,
    "error":{
        "code":"ERROR_CODE",
        "message":"Error message"
    }
}
```


---

# 6. Authentication API


## 6.1 Register User


Endpoint:


```
POST

/api/v1/auth/register
```


Request:


```json
{
    "username":"user01",
    "email":"user01@email.com",
    "password":"password"
}
```


Response:


```json
{
    "success":true,
    "message":"Account created"
}
```


---

## 6.2 Login


Endpoint:


```
POST

/api/v1/auth/login
```


Request:


```json
{
    "username":"user01",
    "password":"password"
}
```


Response:


```json
{
    "success":true,
    "token":"JWT_TOKEN",
    "user":{
        "id":1,
        "username":"user01"
    }
}
```


---

## 6.3 Logout


Endpoint:


```
POST

/api/v1/auth/logout
```


---

# 7. User API


## 7.1 Get User Profile


Endpoint:


```
GET

/api/v1/users/{id}

```


Response:


```json
{
    "id":1,
    "username":"user01",
    "role":"USER"
}
```


---

## 7.2 Update Profile


Endpoint:


```
PUT

/api/v1/users/{id}

```


Request:


```json
{
    "displayName":"New Name"
}
```


---

# 8. Problem API


## 8.1 Get Problem List


Endpoint:


```
GET

/api/v1/problems
```


Response:


```json
{
    "success":true,
    "data":[
        {
            "id":1,
            "title":"Two Sum",
            "difficulty":"Easy"
        }
    ]
}
```


---

## 8.2 Get Problem Detail


Endpoint:


```
GET

/api/v1/problems/{id}
```


Response:


```json
{
    "id":1,
    "title":"Two Sum",
    "description":"...",
    "input":"...",
    "output":"..."
}
```


---

## 8.3 Create Problem


Quyền:

```
ADMIN
TEACHER
```


Endpoint:


```
POST

/api/v1/problems
```


Request:


```json
{
    "title":"Problem A",
    "description":"...",
    "difficulty":"Medium"
}
```


---

# 9. Submission API


## 9.1 Submit Code


Endpoint:


```
POST

/api/v1/submissions
```


Request:


```json
{
    "problemId":1,
    "language":"cpp",
    "sourceCode":"#include<iostream>"
}
```


Response:


```json
{
    "success":true,
    "submissionId":"SUB001",
    "status":"PENDING"
}
```


---

## 9.2 Get Submission Status


Endpoint:


```
GET

/api/v1/submissions/{id}
```


Response:


```json
{
    "id":"SUB001",
    "status":"RUNNING",
    "score":0
}
```


---

## 9.3 Submission History


Endpoint:


```
GET

/api/v1/users/{id}/submissions
```


Response:


```json
[
    {
        "problem":"Two Sum",
        "status":"ACCEPTED",
        "score":100
    }
]
```


---

# 10. Judge API


Judge API dùng nội bộ giữa Backend và Judge System.


## 10.1 Create Judge Job


Endpoint:


```
POST

/internal/judge/jobs
```


Request:


```json
{
    "submissionId":"SUB001",
    "sourcePath":"submission.cpp",
    "testCasePath":"tests/"
}
```


---

## 10.2 Receive Judge Result


Endpoint:


```
POST

/internal/judge/result
```


Request:


```json
{
    "submissionId":"SUB001",
    "status":"ACCEPTED",
    "score":100,
    "time":120
}
```


---

# 11. Result API


## 11.1 Get Result


Endpoint:


```
GET

/api/v1/results/{submissionId}
```


Response:


```json
{
    "status":"ACCEPTED",
    "score":100,
    "executionTime":120,
    "memory":32
}
```


---

# 12. Admin API


Các chức năng:


```
User Management

Problem Management

System Monitoring

```


Ví dụ:


```
GET

/api/v1/admin/users
```


---

# 13. Pagination Convention


Các API danh sách sử dụng:


Query:


```
?page=1

&limit=20

```


Ví dụ:


```
GET

/api/v1/problems?page=1&limit=20

```


Response:


```json
{
    "page":1,
    "limit":20,
    "total":100,
    "items":[]
}
```


---

# 14. API Validation


Mọi request phải kiểm tra:


```
Authentication

Authorization

Input Format

Data Type

Required Fields

```


---

# 15. API Error Code


Quy chuẩn:


| Code | Ý nghĩa |
|-|-|
|AUTH001|Invalid login|
|AUTH002|Token expired|
|USER001|User not found|
|PROB001|Problem not found|
|SUB001|Submission failed|
|SYS001|System error|


---

# 16. API Security


Áp dụng:


- JWT Authentication.
- HTTPS.
- Request validation.
- Rate limiting.
- Input sanitization.


---

# 17. API Logging


Mỗi request quan trọng ghi:


```json
{
    "method":"POST",
    "endpoint":"/submissions",
    "userId":1,
    "time":"2026-01-01"
}
```


---

# 18. API Testing


Kiểm thử:


```
Authentication API

User API

Problem API

Submission API

Judge API

```


Công cụ:


```
Postman

Automated Test

Integration Test

```


---

# 19. Future API Extension


Có thể mở rộng:


```
Contest API

Ranking API

Notification API

AI Assistant API

Analytics API

```


---

# 20. Kết luận


API Design xác định chuẩn giao tiếp của toàn bộ hệ thống.

Thiết kế này đảm bảo:

- Frontend độc lập.
- Backend rõ ràng.
- Judge tích hợp an toàn.
- Dễ mở rộng trong tương lai.


---

# End of Document