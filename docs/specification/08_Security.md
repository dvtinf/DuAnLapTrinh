# 08. Security Specification

## 1. Tổng quan bảo mật hệ thống

Security là thành phần quan trọng trong hệ thống website chấm C++.

Mục tiêu của hệ thống bảo mật:

- Bảo vệ dữ liệu người dùng.
- Bảo vệ mã nguồn bài nộp.
- Ngăn chặn hành vi khai thác hệ thống.
- Bảo vệ Judge System khi thực thi code.
- Đảm bảo tính toàn vẹn của kết quả chấm.

Mô hình bảo mật tổng thể:

```
User
 |
 v
Frontend Security
 |
 v
Backend API Security
 |
 v
Authentication
 |
 v
Authorization
 |
 v
Database Security
 |
 v
Judge Sandbox Security
```

---

# 2. Security Principles

Hệ thống tuân thủ các nguyên tắc:

## 2.1 Least Privilege

Mỗi thành phần chỉ được cấp quyền cần thiết.

Ví dụ:

- Frontend không truy cập trực tiếp Database.
- User không truy cập Judge Server.
- Judge Worker không có quyền quản trị hệ thống.


---

## 2.2 Defense in Depth

Bảo mật nhiều lớp:


```
Layer 1:
Frontend Validation


Layer 2:
API Validation


Layer 3:
Authentication


Layer 4:
Database Protection


Layer 5:
Execution Sandbox

```

---

# 3. Authentication System


## 3.1 User Authentication

Hệ thống hỗ trợ:

- Đăng ký tài khoản.
- Đăng nhập.
- Đăng xuất.
- Quản lý phiên làm việc.


Thông tin đăng nhập:

```json
{
    "username":"user01",
    "password":"encrypted_password"
}
```


---

## 3.2 Password Security


Mật khẩu không được lưu dạng plaintext.


Yêu cầu:


```
Password

    |
    v

Hash Algorithm

    |
    v

Stored Password Hash
```


Áp dụng:

- Salt password.
- Hash một chiều.
- Không thể khôi phục mật khẩu gốc.


---

# 4. Authorization System


## 4.1 Role Based Access Control


Hệ thống sử dụng RBAC.


Các role:


```
ADMIN

TEACHER

USER

GUEST
```


---

## 4.2 Permission Matrix


| Chức năng | USER | TEACHER | ADMIN |
|-|-|-|-|
| Làm bài | ✓ | ✓ | ✓ |
| Xem kết quả | ✓ | ✓ | ✓ |
| Tạo bài | | ✓ | ✓ |
| Quản lý user | | | ✓ |
| Quản trị hệ thống | | | ✓ |


---

# 5. API Security


## 5.1 Request Validation


Backend kiểm tra:


- Kiểu dữ liệu.
- Kích thước dữ liệu.
- Quyền truy cập.
- Token.


Ví dụ:


```json
{
    "problemId":"P001",
    "sourceCode":"..."
}
```


---

## 5.2 API Authentication


Các API quan trọng yêu cầu:


```
Authorization Token
```


Ví dụ:


```
Authorization:
Bearer TOKEN_VALUE
```


---

# 6. Input Validation


Tất cả dữ liệu người dùng gửi lên phải được kiểm tra.


Bao gồm:

- Username.
- Email.
- Source code.
- Problem ID.
- File upload.


Mục tiêu:


Ngăn chặn:

- SQL Injection.
- XSS.
- Invalid Data.
- Buffer Overflow.


---

# 7. Database Security


## 7.1 Database Access


Nguyên tắc:


```
Frontend

X

Database


Backend API

|

Database
```


Chỉ Backend được phép truy cập Database.


---

## 7.2 SQL Injection Prevention


Không sử dụng:


```sql
SELECT *
FROM users
WHERE username='input'
```


Sử dụng:


```
Prepared Statement

Parameterized Query
```


---

# 8. Source Code Security


Mã nguồn C++ của người dùng là dữ liệu nguy hiểm.


Yêu cầu:


- Không thực thi trực tiếp.
- Không lưu trong thư mục public.
- Kiểm soát quyền truy cập.
- Xóa dữ liệu tạm sau khi chấm.


---

# 9. Judge Sandbox Security


Đây là lớp bảo mật quan trọng nhất.


## 9.1 Isolation


Code người dùng chạy trong môi trường riêng:


```
Judge Environment

+-------------------+
| User Code         |
|                   |
| Limited CPU       |
| Limited Memory    |
| Limited Access    |
+-------------------+

```


---

## 9.2 Resource Control


Giới hạn:


```
CPU

Memory

Execution Time

File Access

Process Count

Network
```


---

## 9.3 Network Isolation


Chương trình C++ không được phép:


- Truy cập Internet.
- Gửi dữ liệu ra ngoài.
- Kết nối hệ thống khác.


Thiết lập:


```
Network = Disabled
```


---

# 10. File Security


## 10.1 Upload Protection


Kiểm tra:


- File size.
- File type.
- Extension.
- Content.


---

## 10.2 Storage Permission


Cấu trúc:


```
storage

 |
 +-- submissions

 |
 +-- problems

 |
 +-- logs

```


Quyền:


```
Private Access Only
```


---

# 11. Session Security


Áp dụng:


- Session expiration.
- Secure token.
- Token rotation.


Không lưu:

- Password.
- Sensitive information.


---

# 12. Frontend Security


Frontend áp dụng:


## Input Protection

- Validate form.
- Escape output.


## XSS Prevention

Không render trực tiếp HTML từ user.


## Secure Storage

Không lưu:

- Password.
- Private key.
- Sensitive token.


---

# 13. Logging and Monitoring


Hệ thống ghi nhận:


- Login attempt.
- Failed authentication.
- API error.
- Judge error.
- Suspicious activity.


Ví dụ:


```json
{
    "event":"LOGIN_FAILED",
    "user":"user01",
    "time":"2026-01-01"
}
```


---

# 14. Backup and Recovery


Dữ liệu cần backup:


- User database.
- Problem database.
- Submission history.
- System configuration.


Chiến lược:


```
Daily Backup

+

Version Backup

+

Recovery Plan
```


---

# 15. Security Testing


Các kiểm tra:


## Authentication Test

Kiểm tra:

- Login.
- Token.
- Session.


## Authorization Test

Kiểm tra:

- Permission.


## Injection Test

Kiểm tra:

- SQL Injection.
- XSS.


## Judge Security Test

Kiểm tra:

- Infinite loop.
- Resource abuse.
- Unsafe code.


---

# 16. Future Security Enhancement


Có thể mở rộng:


- Two Factor Authentication.
- Advanced Sandbox.
- Security Monitoring Dashboard.
- Automatic Vulnerability Scanner.
- AI Code Security Analysis.


---

# 17. Kết luận


Security Specification đảm bảo website chấm C++:

- An toàn cho người dùng.
- An toàn cho hệ thống.
- Bảo vệ dữ liệu.
- Bảo vệ Judge Engine.

Đây là nền tảng để triển khai:

- Performance.
- Testing.
- Deployment.

---

# End of Document