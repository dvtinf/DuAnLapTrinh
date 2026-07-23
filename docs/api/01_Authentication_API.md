# 01. Authentication API Specification

## 1. Tổng quan

Tài liệu này mô tả đặc tả API cho module Authentication của hệ thống website chấm C++ D:\DuAnLapTrinh.

Authentication API chịu trách nhiệm:

* Đăng ký tài khoản.
* Đăng nhập.
* Xác thực người dùng.
* Quản lý JWT Token.
* Làm mới phiên đăng nhập.
* Đăng xuất.

---

# 2. Authentication Architecture

Luồng xác thực:

```
Client

 |

 v

Authentication API

 |

 v

User Service

 |

 v

Database

 |

 v

JWT Token

```

---

# 3. Base API

Tất cả API:

```
/api/v1/auth
```

Ví dụ:

```
POST /api/v1/auth/login
```

---

# 4. Register API

## Endpoint

```
POST

/api/v1/auth/register
```

---

## Description

Tạo tài khoản người dùng mới.

---

## Request Body

```json
{
    "username": "student01",
    "email": "student01@email.com",
    "password": "password123"
}
```

---

## Validation Rules

| Field    | Rule                 |
| -------- | -------------------- |
| username | Bắt buộc, duy nhất   |
| email    | Đúng định dạng email |
| password | Tối thiểu 8 ký tự    |

---

## Success Response

HTTP:

```
201 Created
```

Body:

```json
{
    "success": true,
    "message": "Register successfully"
}
```

---

## Error Response

Ví dụ:

```json
{
    "success": false,
    "error": {
        "code": "AUTH_REGISTER_FAILED",
        "message": "Username already exists"
    }
}
```

---

# 5. Login API

## Endpoint

```
POST

/api/v1/auth/login
```

---

## Description

Xác thực tài khoản và cấp JWT Token.

---

## Request Body

```json
{
    "username": "student01",
    "password": "password123"
}
```

---

## Processing Flow

```
Receive Request

      |

Find User

      |

Verify Password

      |

Generate Token

      |

Return Response

```

---

## Success Response

```json
{
    "success": true,
    "data": {
        "accessToken": "JWT_TOKEN",
        "refreshToken": "REFRESH_TOKEN",
        "user": {
            "id": 1,
            "username": "student01",
            "role": "USER"
        }
    }
}
```

---

# 6. Refresh Token API

## Endpoint

```
POST

/api/v1/auth/refresh
```

---

## Description

Cấp access token mới khi token hiện tại hết hạn.

---

## Request

```json
{
    "refreshToken": "REFRESH_TOKEN"
}
```

---

## Response

```json
{
    "success": true,
    "data": {
        "accessToken": "NEW_ACCESS_TOKEN"
    }
}
```

---

# 7. Logout API

## Endpoint

```
POST

/api/v1/auth/logout
```

---

## Authentication Required

```
Bearer Token
```

---

## Header

```
Authorization:
Bearer JWT_TOKEN
```

---

## Response

```json
{
    "success": true,
    "message": "Logout successfully"
}
```

---

# 8. Current User API

## Endpoint

```
GET

/api/v1/auth/me
```

---

## Description

Lấy thông tin người dùng hiện tại.

---

## Header

```
Authorization:
Bearer JWT_TOKEN
```

---

## Response

```json
{
    "success": true,
    "data": {
        "id": 1,
        "username": "student01",
        "email": "student01@email.com",
        "role": "USER"
    }
}
```

---

# 9. JWT Specification

## Access Token

Mục đích:

* Xác thực request.
* Truy cập API.

Thời gian sống:

```
15 - 60 phút
```

---

## Refresh Token

Mục đích:

* Duy trì phiên đăng nhập.

Thời gian sống:

```
7 - 30 ngày
```

---

# 10. JWT Payload

Ví dụ:

```json
{
    "userId": 1,
    "username": "student01",
    "role": "USER",
    "iat": 123456,
    "exp": 123999
}
```

---

# 11. Authentication Middleware

Mọi API cần bảo vệ sử dụng:

```
JWT Authentication Middleware

```

Luồng:

```
Request

 |

Check Header

 |

Verify Token

 |

Load User

 |

Allow Access

```

---

# 12. Role Validation

Các role:

```
USER

TEACHER

ADMIN

```

Ví dụ:

```
Create Problem

Require:

TEACHER or ADMIN

```

---

# 13. Security Requirements

Authentication API phải đảm bảo:

* Password được hash.
* Không trả password về client.
* Token có thời hạn.
* Không lưu token nhạy cảm trong source code.
* Có rate limit.

---

# 14. Error Code

| Code    | Meaning                   |
| ------- | ------------------------- |
| AUTH001 | Invalid username/password |
| AUTH002 | Token expired             |
| AUTH003 | Invalid token             |
| AUTH004 | Account locked            |
| AUTH005 | Permission denied         |

---

# 15. API Testing

Test cases:

## Register

```
Valid account

Duplicate username

Invalid email

Weak password

```

## Login

```
Correct password

Wrong password

Expired account

```

## Token

```
Valid token

Expired token

Invalid token

```

---

# 16. Future Extension

Có thể mở rộng:

```
Two Factor Authentication

OAuth Login

Social Login

Password Recovery

Email Verification

```

---

# 17. Kết luận

Authentication API cung cấp nền tảng xác thực an toàn cho toàn bộ hệ thống.

Thiết kế đảm bảo:

* Quản lý người dùng tập trung.
* Bảo mật phiên đăng nhập.
* Hỗ trợ phân quyền.
* Sẵn sàng mở rộng.

---

# End of Document
