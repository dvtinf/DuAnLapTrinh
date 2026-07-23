# 02. User API Specification

## 1. Tổng quan

Tài liệu này mô tả đặc tả API cho module User của hệ thống website chấm C++ D:\DuAnLapTrinh.

User API chịu trách nhiệm:

* Quản lý thông tin người dùng.
* Xem hồ sơ cá nhân.
* Cập nhật thông tin cá nhân.
* Quản lý danh sách bài nộp của người dùng.
* Hỗ trợ quản trị người dùng.

---

# 2. User API Architecture

Luồng xử lý:

```
Client

   |

   v

User Controller

   |

   v

User Service

   |

   v

User Repository

   |

   v

Database

```

---

# 3. Base API

Prefix:

```
/api/v1/users
```

Ví dụ:

```
GET /api/v1/users/profile
```

---

# 4. Authentication Requirement

Các API trong module User yêu cầu:

```
Authorization Header

Bearer JWT_TOKEN

```

Ví dụ:

```
Authorization:
Bearer eyJhbGci...
```

---

# 5. Get Current User Profile API

## Endpoint

```
GET

/api/v1/users/profile
```

---

## Description

Lấy thông tin tài khoản hiện tại.

---

## Response

```json
{
    "success": true,
    "data": {
        "id": 1,
        "username": "student01",
        "email": "student01@email.com",
        "displayName": "Student One",
        "role": "USER",
        "createdAt": "2026-01-01"
    }
}
```

---

# 6. Get User By ID API

## Endpoint

```
GET

/api/v1/users/{id}
```

---

## Permission

```
USER

ADMIN

```

---

## Response

```json
{
    "success": true,
    "data": {
        "id": 1,
        "username": "student01",
        "role": "USER"
    }
}
```

---

# 7. Update User Profile API

## Endpoint

```
PUT

/api/v1/users/profile
```

---

## Description

Cập nhật thông tin cá nhân.

---

## Request Body

```json
{
    "displayName": "New Display Name",
    "email": "new@email.com"
}
```

---

## Validation

| Field       | Rule                    |
| ----------- | ----------------------- |
| displayName | Không vượt quá giới hạn |
| email       | Đúng định dạng          |

---

## Response

```json
{
    "success": true,
    "message": "Profile updated"
}
```

---

# 8. Change Password API

## Endpoint

```
PUT

/api/v1/users/password
```

---

## Request

```json
{
    "oldPassword": "old_password",
    "newPassword": "new_password"
}
```

---

## Processing Flow

```
Receive Request

      |

Verify Old Password

      |

Hash New Password

      |

Update Database

```

---

## Response

```json
{
    "success": true,
    "message": "Password changed"
}
```

---

# 9. Get User Submission History API

## Endpoint

```
GET

/api/v1/users/{id}/submissions
```

---

## Description

Lấy danh sách bài đã nộp.

---

## Query Parameters

```
?page=1

&limit=20

```

---

## Response

```json
{
    "success": true,
    "data": {
        "page": 1,
        "limit": 20,
        "total": 50,
        "items": [
            {
                "submissionId": "SUB001",
                "problemId": 10,
                "status": "ACCEPTED",
                "score": 100
            }
        ]
    }
}
```

---

# 10. Get User Statistics API

## Endpoint

```
GET

/api/v1/users/{id}/statistics
```

---

## Description

Lấy thống kê học tập.

---

## Response

```json
{
    "success": true,
    "data": {
        "totalSubmission": 120,
        "accepted": 80,
        "solvedProblem": 60,
        "rating": 1500
    }
}
```

---

# 11. Admin User Management API

Các API sau chỉ dành cho ADMIN.

---

# 11.1 Get All Users

## Endpoint

```
GET

/api/v1/users
```

---

## Query

```
?page=1

&limit=50

&role=USER

```

---

## Response

```json
{
    "success": true,
    "data": [
        {
            "id":1,
            "username":"student01",
            "role":"USER"
        }
    ]
}
```

---

# 11.2 Update User Role

## Endpoint

```
PATCH

/api/v1/users/{id}/role
```

---

## Request

```json
{
    "role":"TEACHER"
}
```

---

## Permission

```
ADMIN ONLY

```

---

# 11.3 Lock User Account

## Endpoint

```
PATCH

/api/v1/users/{id}/lock
```

---

## Request

```json
{
    "locked":true
}
```

---

# 12. User Data Model

User Object:

```json
{
    "id":1,
    "username":"student01",
    "email":"student01@email.com",
    "displayName":"Student",
    "role":"USER",
    "status":"ACTIVE"
}
```

---

# 13. User Status

Các trạng thái:

```
ACTIVE

LOCKED

INACTIVE

```

---

# 14. Permission Matrix

| API             | USER | TEACHER | ADMIN |
| --------------- | ---- | ------- | ----- |
| View Profile    | ✓    | ✓       | ✓     |
| Update Profile  | ✓    | ✓       | ✓     |
| View Submission | ✓    | ✓       | ✓     |
| View All Users  | ✗    | ✗       | ✓     |
| Change Role     | ✗    | ✗       | ✓     |
| Lock Account    | ✗    | ✗       | ✓     |

---

# 15. Validation Rules

User API phải kiểm tra:

* User tồn tại.
* Quyền truy cập.
* Dữ liệu đầu vào.
* Trạng thái tài khoản.

---

# 16. Error Code

| Code    | Meaning              |
| ------- | -------------------- |
| USER001 | User not found       |
| USER002 | Email already exists |
| USER003 | Invalid password     |
| USER004 | Account locked       |
| USER005 | Permission denied    |

---

# 17. Security Requirements

Áp dụng:

* Không trả password.
* Kiểm tra quyền.
* Audit thay đổi quan trọng.
* Validate input.
* Rate limit.

---

# 18. Testing

## Profile Test

```
Get Profile

Update Profile

Invalid Data

```

## Password Test

```
Correct Password

Wrong Password

Weak Password

```

## Admin Test

```
View Users

Change Role

Lock Account

```

---

# 19. Future Extension

Có thể mở rộng:

```
Avatar Management

User Achievement

Learning Progress

Notification Settings

Social Profile

```

---

# 20. Kết luận

User API cung cấp lớp quản lý người dùng cho toàn bộ hệ thống.

Thiết kế đảm bảo:

* Quản lý tài khoản rõ ràng.
* Phân quyền an toàn.
* Hỗ trợ mở rộng chức năng học tập và thi đấu.

---

# End of Document
