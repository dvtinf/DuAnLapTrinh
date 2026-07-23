# 08. Security Design

## 1. Tổng quan

Tài liệu này mô tả thiết kế bảo mật cho toàn bộ hệ thống website chấm C++ D:\DuAnLapTrinh.

Bảo mật là thành phần bắt buộc nhằm đảm bảo:

- An toàn dữ liệu người dùng.
- Bảo vệ hệ thống Backend.
- Bảo vệ Database.
- Ngăn chặn mã nguồn độc hại.
- Đảm bảo Judge System hoạt động an toàn.


Phạm vi bảo mật:


```
Frontend Security

Backend Security

API Security

Database Security

Authentication

Authorization

Judge Security

Infrastructure Security

```

---

# 2. Security Architecture


Mô hình bảo mật tổng thể:


```
                User

                 |

                 v

          Frontend Security

                 |

                 v

              API Gateway

                 |

                 v

          Authentication Layer

                 |

                 v

            Backend Service

                 |

        +--------+--------+

        |                 |

        v                 v

    Database          Judge System

```


---

# 3. Security Principles


Áp dụng các nguyên tắc:


## 3.1 Least Privilege


Mỗi thành phần chỉ có quyền cần thiết.


Ví dụ:


```
User

- Submit Code

- View Result


Admin

- Manage Problem

- Manage User

```


---

## 3.2 Defense In Depth


Nhiều lớp bảo vệ:


```
Frontend Validation

        +

API Validation

        +

Database Constraint

        +

Sandbox Security

```


---

## 3.3 Secure By Design


Bảo mật được thiết kế ngay từ đầu, không bổ sung sau.


---

# 4. Authentication Design


## 4.1 Authentication Flow


```
User Login

      |

Validate Account

      |

Verify Password

      |

Generate Token

      |

Return JWT

```


---

# 5. Password Security


Không lưu:


```
Plain Text Password

```


Sử dụng:


```
Hash Algorithm

+

Salt

```


Ví dụ:


```
bcrypt

argon2

```


---

# 6. JWT Authentication


JWT gồm:


```
Header

Payload

Signature

```


Ví dụ:


```json
{
"userId":1,
"role":"USER"
}
```


---

# 7. Token Management


Quản lý:


```
Access Token

Refresh Token

Token Expiration

Token Revocation

```


---

# 8. Authorization Design


Sử dụng:


```
Role Based Access Control

(RBAC)

```


---

## Roles


Hệ thống:


```
USER

TEACHER

ADMIN

```


---

# 9. Permission Matrix


|Chức năng|USER|TEACHER|ADMIN|
|-|-|-|-|
|Xem bài|✓|✓|✓|
|Submit code|✓|✓|✓|
|Tạo bài|✗|✓|✓|
|Quản lý user|✗|✗|✓|
|Cấu hình hệ thống|✗|✗|✓|


---

# 10. API Security


## 10.1 HTTPS


Toàn bộ giao tiếp:


```
Client

      |

 HTTPS

      |

Server

```


---

## 10.2 Input Validation


Kiểm tra:


- Data type.
- Length.
- Format.
- Required fields.


---

# 11. Protection Against Common Attacks


## SQL Injection


Phòng chống:


- ORM.
- Prepared Statement.
- Parameter Binding.


---

## XSS


Phòng chống:


- Escape HTML.
- Sanitize input.


---

## CSRF


Phòng chống:


- CSRF Token.
- SameSite Cookie.


---

## Brute Force


Phòng chống:


- Rate Limit.
- Login Attempt Limit.


---

# 12. Backend Security


Backend áp dụng:


## Middleware Security


Bao gồm:


```
Authentication Middleware

Authorization Middleware

Validation Middleware

Logging Middleware

```


---

# 13. Database Security


## Access Control


Database user:


```
Application User

Admin User

Backup User

```


---

## Data Protection


Bảo vệ:


```
User Information

Submission Data

System Configuration

```


---

# 14. Sensitive Data Management


Không lưu:


```
Password

Secret Key

API Token

Database Credential

```


trong source code.


Sử dụng:


```
Environment Variable

Secret Manager

```


---

# 15. Judge System Security


Đây là phần quan trọng nhất.


User code có thể:


- Lỗi logic.
- Tiêu thụ tài nguyên lớn.
- Có hành vi nguy hiểm.


Do đó cần:


```
Sandbox Environment

Resource Limit

Process Isolation

```


---

# 16. Sandbox Security Design


Môi trường chạy:


```
User Code

      |

      v

Sandbox

      |

      v

Operating System

```


---

# 17. Resource Control


Giới hạn:


## CPU


```
Maximum Execution Time

```


---

## Memory


```
Maximum RAM Usage

```


---

## Process


```
Maximum Process Count

```


---

## File


```
Restricted File Access

```


---

# 18. Network Isolation


Code người dùng:


Không được:


```
Access Internet

Access Internal Service

Access Database

```


---

# 19. Container Security


Có thể sử dụng:


```
Docker Container

```


Mỗi bài chạy:


```
Independent Container

```


---

# 20. Logging And Auditing


Ghi lại:


```
Login Event

API Access

Submission Event

Admin Action

Security Error

```


---

# 21. Security Monitoring


Theo dõi:


```
Failed Login

Suspicious Request

Resource Abuse

System Error

```


---

# 22. Backup Security


Backup cần:


- Mã hóa.
- Kiểm soát quyền.
- Kiểm tra phục hồi.


---

# 23. Deployment Security


Áp dụng:


- Firewall.
- Secure SSH.
- Limited Access.
- Environment Separation.


---

# 24. Security Testing


Kiểm thử:


## Authentication Test


```
Invalid Login

Expired Token

Permission Check

```


---

## API Security Test


```
Injection Test

Authorization Test

Rate Limit Test

```


---

## Judge Security Test


```
Infinite Loop

Memory Abuse

Process Abuse

```


---

# 25. Security Checklist


Trước khi Release:


```
✓ HTTPS Enabled

✓ Password Hashed

✓ JWT Configured

✓ API Validated

✓ Database Protected

✓ Judge Sandbox Enabled

✓ Backup Secured

```


---

# 26. Future Security Enhancement


Có thể mở rộng:


```
Two Factor Authentication

Security Scanner

AI Threat Detection

Zero Trust Architecture

Advanced Monitoring

```


---

# 27. Kết luận


Security Design đảm bảo hệ thống website chấm C++:

- An toàn.
- Tin cậy.
- Bảo vệ người dùng.
- Bảo vệ hạ tầng.
- Có khả năng vận hành thực tế.


---

# End of Document