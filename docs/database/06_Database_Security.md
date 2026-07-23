# 06. Database Security Design

## 1. Tổng quan

Tài liệu này mô tả thiết kế bảo mật Database cho hệ thống website chấm C++ D:\DuAnLapTrinh.

Database Security đảm bảo:

* Bảo vệ dữ liệu người dùng.
* Ngăn chặn truy cập trái phép.
* Bảo vệ mã nguồn bài nộp.
* Đảm bảo tính toàn vẹn kết quả chấm.
* Theo dõi mọi hoạt động quan trọng.

Các vùng dữ liệu cần bảo vệ:

```text id="9f5g2m"
User Information

Authentication Data

Source Code

Test Cases

Judge Result

System Logs

```

---

# 2. Security Architecture

Mô hình:

```text id="q7w3kd"
Application Layer

        |

        v

Database Access Layer

        |

        v

PostgreSQL Security Layer

        |

        v

Encrypted Storage

```

---

# 3. Security Principles

Áp dụng:

## Least Privilege

Mỗi thành phần chỉ có quyền cần thiết.

Ví dụ:

```text id="p8x4za"
Application User

Không được:

DROP TABLE

ALTER DATABASE

```

---

## Defense In Depth

Nhiều lớp bảo vệ:

```text id="m5n7cx"
Authentication

+

Authorization

+

Encryption

+

Audit

```

---

# 4. Database User Management

Không sử dụng tài khoản PostgreSQL superuser cho Application.

Phân quyền:

```text id="w9h3mq"
postgres

(Admin Only)


app_user

(Application)


readonly_user

(Reporting)

```

---

# 5. Database Roles

## Application Role

Quyền:

```sql id="g6t2qa"
SELECT

INSERT

UPDATE

DELETE

```

Không có:

```sql id="h4v7ks"
CREATE DATABASE

DROP TABLE

ALTER SYSTEM

```

---

## Reporting Role

Chỉ:

```sql id="s8p2nv"
SELECT

```

---

# 6. Authentication Security

## Password Storage

Không lưu:

```text id="c2v9zx"
Plain Text Password

```

Sử dụng:

```text id="e7k4wm"
Argon2id

hoặc

bcrypt

```

---

# 7. Connection Security

Database connection phải:

```text id="r3p6kn"
Encrypted Connection

TLS Enabled

Certificate Validation

```

---

# 8. Environment Separation

Mỗi môi trường có Database riêng:

```text id="y5m8qw"
Development DB


Testing DB


Staging DB


Production DB

```

---

# 9. Sensitive Data Protection

Dữ liệu nhạy cảm:

| Data              | Protection        |
| ----------------- | ----------------- |
| Password          | Hash              |
| Token             | Encrypted         |
| Source Code       | Access Control    |
| Private Test Case | Restricted Access |

---

# 10. Source Code Protection

Bài nộp chứa:

```text id="v8q2lr"
User Source Code

```

Chính sách:

* User chỉ xem code của mình.
* Teacher không xem code khi không có quyền.
* Admin access phải được audit.

---

# 11. Test Case Protection

Test Case ẩn:

```text id="u4m9pz"
is_hidden = true

```

Quy tắc:

USER:

```text id="x2k7va"
Không được truy cập.

```

Judge:

```text id="z9m3bc"
Được phép sử dụng.

```

---

# 12. SQL Injection Prevention

Không dùng:

```sql id="k3y8pw"
String Concatenation Query

```

Ví dụ nguy hiểm:

```text id="1x7nqa"
SELECT *

FROM users

WHERE username=' + input

```

---

Sử dụng:

```text id="w4c6hs"
Prepared Statement

Parameterized Query

ORM Protection

```

---

# 13. Database Constraint Security

Sử dụng:

## NOT NULL

```sql id="m8q5tr"
username NOT NULL

```

---

## UNIQUE

```sql id="j6v9da"
email UNIQUE

```

---

## FOREIGN KEY

```sql id="s1k7mw"
problem_id REFERENCES problems(id)

```

---

# 14. Row Level Security

PostgreSQL hỗ trợ:

```sql id="r9v4np"
Row Level Security

```

Ví dụ:

User chỉ xem Submission của mình:

```text id="h2q8zx"
user_id = current_user

```

---

# 15. Database Audit

Bảng:

```text id="k7m3qa"
audit_logs

```

Lưu:

```text id="t8w5xy"
Who

When

Action

IP

Data Changed

```

---

# 16. Audit Events

Theo dõi:

## User Management

```text id="p5z8jc"
Create User

Change Role

Lock Account

```

---

## Problem Management

```text id="n2q7vw"
Create Problem

Update Problem

Delete Problem

```

---

## System

```text id="m4x9kp"
Migration

Configuration Change

```

---

# 17. Backup Security

Backup phải:

* Mã hóa.
* Giới hạn quyền.
* Có thời hạn lưu.
* Không public.

---

# 18. Database Network Security

Database:

Không mở:

```text id="s7n3qc"
Internet Access

```

Chỉ cho:

```text id="d4k8mx"
Backend Server

Judge Server

Admin Network

```

---

# 19. Firewall Rule Example

Cho phép:

```text id="p2x7wm"
Backend IP

      |

      v

Database Port

5432

```

Chặn:

```text id="q6m1rv"
External Access

```

---

# 20. Logging Security

Log không được chứa:

```text id="c9n4hb"
Password

Secret Token

Private Key

```

---

# 21. Database Encryption

## At Rest

Mã hóa:

```text id="z5w8qk"
Disk Encryption

Database Storage Encryption

```

---

## In Transit

Sử dụng:

```text id="v3m6ps"
TLS

SSL Certificate

```

---

# 22. Access Review

Định kỳ:

```text id="x8q1md"
Review User Permission

Remove Unused Account

Rotate Credential

```

---

# 23. Security Monitoring

Theo dõi:

* Failed Login.
* Abnormal Query.
* Permission Violation.
* Large Data Export.

---

# 24. Security Testing

Kiểm tra:

## Injection Test

```text id="a4n8vk"
SQL Injection

```

---

## Permission Test

```text id="b6q3xy"
Unauthorized Access

```

---

## Data Leakage Test

```text id="m9w2pz"
Sensitive Data Exposure

```

---

# 25. Incident Response

Khi phát hiện sự cố:

```text id="j5q7nw"
Detect

 |

Block

 |

Investigate

 |

Recover

 |

Review

```

---

# 26. Future Expansion

Có thể bổ sung:

```text id="w7k3qa"
Database Activity Monitoring

Secrets Manager

Hardware Security Module

Zero Trust Database Access

```

---

# 27. Kết luận

Database Security Design đảm bảo:

* Dữ liệu được bảo vệ nhiều lớp.
* Quyền truy cập được kiểm soát.
* Source code và test case an toàn.
* Sẵn sàng vận hành hệ thống chấm C++ trong môi trường Production.

---

# End of Document
