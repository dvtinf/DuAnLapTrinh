# 06. Backend Design

## 1. Tổng quan

Tài liệu này mô tả thiết kế chi tiết hệ thống Backend của website chấm C++ D:\DuAnLapTrinh.

Backend là trung tâm xử lý nghiệp vụ của hệ thống, chịu trách nhiệm:

- Cung cấp API cho Frontend.
- Quản lý người dùng.
- Quản lý bài tập.
- Quản lý bài nộp.
- Điều phối Judge System.
- Xử lý kết quả chấm.
- Quản lý bảo mật và phân quyền.


Mục tiêu:

- Kiến trúc rõ ràng.
- Dễ mở rộng.
- Dễ bảo trì.
- Hiệu năng tốt.
- Bảo mật cao.

---

# 2. Backend Architecture


Backend sử dụng kiến trúc:


```
Layered Architecture

+

Service Oriented Design

```


Mô hình:


```
                API Layer

                    |

                    v

             Controller Layer

                    |

                    v

              Service Layer

                    |

                    v

             Repository Layer

                    |

                    v

               Database


                    |

                    +

                    |

              Judge Integration

```


---

# 3. Technology Stack


Backend đề xuất:


## Runtime


```
Node.js

```


---

## Framework


```
NestJS / ExpressJS

```


---

## Language


```
TypeScript

```


---

## Database ORM


Có thể sử dụng:


```
Prisma

TypeORM

```


---

## Authentication


```
JWT

+

Passport

```


---

## API Documentation


```
Swagger / OpenAPI

```


---

# 4. Backend Project Structure


Cấu trúc:


```
backend

|

src

|

+-- controllers

|

+-- services

|

+-- repositories

|

+-- models

|

+-- entities

|

+-- middleware

|

+-- guards

|

+-- routes

|

+-- config

|

+-- utils

|

+-- integrations

|

+-- main.ts

```


---

# 5. Application Layer


## Main Application


Chịu trách nhiệm:


- Khởi tạo server.
- Load configuration.
- Register module.
- Start application.


File:


```
main.ts

```


---

# 6. Controller Layer


## Nhiệm vụ


Controller chịu trách nhiệm:


- Nhận HTTP Request.
- Validate dữ liệu.
- Gọi Service.
- Trả Response.


Không chứa:


- Business logic.
- Database query.


---

Ví dụ:


```
UserController

        |

        v

UserService

```


---

# 7. Service Layer


## Nhiệm vụ


Service chứa:


- Business logic.
- Rule xử lý.
- Transaction logic.


Ví dụ:


```
SubmissionService


Process:

Receive Code

      |

Create Submission

      |

Send Judge Job

      |

Return Status

```


---

# 8. Repository Layer


## Nhiệm vụ


Repository quản lý:


- Database access.
- Query.
- Data mapping.


Ví dụ:


```
UserRepository


Methods:

create()

findById()

findByEmail()

update()

delete()

```


---

# 9. Module Design


Backend gồm các module:


```
Auth Module

User Module

Problem Module

Submission Module

Judge Module

Result Module

Admin Module

```


---

# 10. Authentication Module


## Chức năng


Quản lý:


- Register.
- Login.
- Logout.
- Token.


---

## Components


```
AuthController

AuthService

TokenService

AuthGuard

```


---

## Flow


```
User Login

      |

Validate Account

      |

Generate JWT

      |

Return Token

```


---

# 11. User Module


## Chức năng


Quản lý:


- Profile.
- Role.
- Permission.


Components:


```
UserController

UserService

UserRepository

UserEntity

```


---

# 12. Problem Module


## Chức năng


Quản lý bài toán:


- Create.
- Update.
- Delete.
- Search.
- Detail.


Components:


```
ProblemController

ProblemService

ProblemRepository

ProblemEntity

```


---

# 13. Submission Module


## Chức năng


Quản lý bài nộp.


Flow:


```
Receive Source Code

        |

Validate

        |

Save Submission

        |

Create Judge Job

        |

Return Submission ID

```


Components:


```
SubmissionController

SubmissionService

SubmissionRepository

```


---

# 14. Judge Integration Module


## Chức năng


Kết nối Backend với Judge Engine.


Components:


```
JudgeClient

JudgeQueue

JudgeService

JudgeResultHandler

```


---

## Communication


Backend gửi:


```json
{
    "submissionId":"SUB001",
    "sourceCode":"..."
}
```


Judge trả:


```json
{
    "status":"ACCEPTED",
    "score":100
}
```


---

# 15. Queue Processing Design


Submission không chấm trực tiếp.


Mô hình:


```
User Submit

      |

Backend

      |

Queue

      |

Judge Worker

      |

Result

```


Lợi ích:


- Không block API.
- Xử lý nhiều bài.
- Dễ mở rộng.


---

# 16. Result Module


## Chức năng


Quản lý:


- Điểm.
- Trạng thái.
- Runtime.
- Memory.


Components:


```
ResultController

ResultService

ResultRepository

```


---

# 17. Admin Module


Chức năng:


```
User Management

Problem Management

System Monitoring

```


---

# 18. Middleware Design


Middleware xử lý:


```
Request Logging

Authentication

Error Handling

Validation

```


---

# 19. Error Handling


Chuẩn lỗi:


```json
{
    "success":false,
    "code":"SUBMISSION_ERROR",
    "message":"Cannot submit code"
}
```


---

# 20. Configuration Management


Cấu hình:


```
.env

config.ts

database.config.ts

```


Bao gồm:


```
Database URL

JWT Secret

Server Port

Judge Endpoint

```


---

# 21. Logging System


Log:


```
Request Log

Error Log

Security Log

Judge Log

```


---

# 22. Security Design


Backend áp dụng:


## Authentication


```
JWT

Refresh Token

```


## Authorization


```
Role Based Access Control

```


## Input Protection


```
Validation

Sanitization

Rate Limit

```


---

# 23. Performance Design


Áp dụng:


- Database indexing.
- Connection pooling.
- Cache.
- Queue processing.
- Async processing.


---

# 24. Testing Design


Backend testing:


## Unit Test


```
Service Test

Repository Test

Utility Test

```


---

## Integration Test


```
API Test

Database Test

Judge Integration Test

```


---

# 25. Future Backend Expansion


Có thể thêm:


```
Microservice Architecture

Distributed Judge

Message Queue Cluster

AI Analysis Service

Analytics Service

```


---

# 26. Kết luận


Backend Design xác định kiến trúc xử lý trung tâm của website chấm C++.

Thiết kế đảm bảo:

- Phân tầng rõ ràng.
- Dễ mở rộng.
- Dễ kiểm thử.
- An toàn.
- Sẵn sàng triển khai thực tế.


---

# End of Document