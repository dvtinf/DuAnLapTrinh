# 01. Database Schema Design

## 1. Tổng quan

Tài liệu này mô tả thiết kế cấu trúc cơ sở dữ liệu cho hệ thống website chấm C++ D:\DuAnLapTrinh.

Database chịu trách nhiệm lưu trữ:

* Thông tin người dùng.
* Danh sách bài tập.
* Test Case.
* Source Code.
* Submission.
* Judge Result.
* Thống kê.
* Nhật ký hệ thống.

Mục tiêu:

* Dữ liệu nhất quán.
* Truy vấn nhanh.
* Hỗ trợ lượng lớn bài nộp.
* Dễ mở rộng.
* Đảm bảo an toàn dữ liệu.

---

# 2. Database Technology

Hệ quản trị đề xuất:

```
PostgreSQL

```

Lý do:

* Hỗ trợ quan hệ mạnh.
* Transaction tốt.
* Index hiệu quả.
* Phù hợp hệ thống chấm bài.

---

# 3. Database Architecture

Mô hình:

```
                Application

                     |

                     v

              Database Layer

                     |

        +------------+------------+

        |                         |

        v                         v

   Main Database             Cache Layer

   PostgreSQL                  Redis


```

---

# 4. Database Naming Convention

Quy tắc:

## Table

Sử dụng:

```
snake_case

```

Ví dụ:

```
users

submissions

test_cases

```

---

## Column

Ví dụ:

```
created_at

updated_at

user_id

```

---

# 5. Entity Relationship Overview

Các bảng chính:

```
users

 |

 +---- submissions

 |

 +---- problems


problems

 |

 +---- test_cases


submissions

 |

 +---- results


```

---

# 6. Users Table

## Table

```
users

```

---

## Purpose

Lưu thông tin tài khoản.

---

## Schema

| Column        | Type      | Description     |
| ------------- | --------- | --------------- |
| id            | BIGSERIAL | Primary Key     |
| username      | VARCHAR   | Tên đăng nhập   |
| email         | VARCHAR   | Email           |
| password_hash | TEXT      | Mật khẩu mã hóa |
| display_name  | VARCHAR   | Tên hiển thị    |
| role          | VARCHAR   | Quyền           |
| status        | VARCHAR   | Trạng thái      |
| created_at    | TIMESTAMP | Ngày tạo        |
| updated_at    | TIMESTAMP | Ngày cập nhật   |

---

## Index

```
PRIMARY KEY(id)

UNIQUE(username)

UNIQUE(email)

```

---

# 7. User Role

Giá trị:

```
USER

TEACHER

ADMIN

```

---

# 8. User Status

Giá trị:

```
ACTIVE

LOCKED

INACTIVE

```

---

# 9. Problems Table

## Table

```
problems

```

---

## Purpose

Lưu thông tin bài tập.

---

## Schema

| Column        | Type      | Description  |
| ------------- | --------- | ------------ |
| id            | BIGSERIAL | Primary Key  |
| title         | VARCHAR   | Tên bài      |
| slug          | VARCHAR   | URL friendly |
| description   | TEXT      | Nội dung     |
| input_format  | TEXT      | Input        |
| output_format | TEXT      | Output       |
| difficulty    | VARCHAR   | Độ khó       |
| time_limit    | INTEGER   | Thời gian    |
| memory_limit  | INTEGER   | Bộ nhớ       |
| status        | VARCHAR   | Trạng thái   |
| created_by    | BIGINT    | Người tạo    |
| created_at    | TIMESTAMP | Ngày tạo     |

---

## Relationship

```
users.id

      |

      v

problems.created_by

```

---

# 10. Problem Difficulty

Giá trị:

```
EASY

MEDIUM

HARD

EXPERT

```

---

# 11. Problem Status

Giá trị:

```
DRAFT

PUBLIC

PRIVATE

ARCHIVED

```

---

# 12. Test Cases Table

## Table

```
test_cases

```

---

## Purpose

Lưu dữ liệu kiểm thử.

---

## Schema

| Column      | Type      | Description |
| ----------- | --------- | ----------- |
| id          | BIGSERIAL | Primary Key |
| problem_id  | BIGINT    | Bài tập     |
| input_data  | TEXT      | Input       |
| output_data | TEXT      | Output      |
| score       | INTEGER   | Điểm        |
| is_hidden   | BOOLEAN   | Ẩn test     |
| created_at  | TIMESTAMP | Ngày tạo    |

---

## Relationship

```
problems.id

      |

      v

test_cases.problem_id

```

---

# 13. Submissions Table

## Table

```
submissions

```

---

## Purpose

Lưu bài nộp.

---

## Schema

| Column      | Type      | Description |
| ----------- | --------- | ----------- |
| id          | BIGSERIAL | Primary Key |
| user_id     | BIGINT    | Người nộp   |
| problem_id  | BIGINT    | Bài tập     |
| language    | VARCHAR   | Ngôn ngữ    |
| source_code | TEXT      | Mã nguồn    |
| status      | VARCHAR   | Trạng thái  |
| score       | INTEGER   | Điểm        |
| created_at  | TIMESTAMP | Ngày nộp    |

---

## Relationship

```
users.id

      |

      v

submissions.user_id


problems.id

      |

      v

submissions.problem_id

```

---

# 14. Submission Status

Giá trị:

```
PENDING

QUEUED

COMPILING

RUNNING

ACCEPTED

WRONG_ANSWER

TIME_LIMIT_EXCEEDED

MEMORY_LIMIT_EXCEEDED

RUNTIME_ERROR

COMPILE_ERROR

```

---

# 15. Results Table

## Table

```
results

```

---

## Schema

| Column        | Type      | Description    |
| ------------- | --------- | -------------- |
| id            | BIGSERIAL | Primary Key    |
| submission_id | BIGINT    | Submission     |
| status        | VARCHAR   | Kết quả        |
| score         | INTEGER   | Điểm           |
| runtime       | INTEGER   | Thời gian chạy |
| memory        | INTEGER   | Bộ nhớ         |
| detail        | JSONB     | Chi tiết       |
| created_at    | TIMESTAMP | Ngày tạo       |

---

## Relationship

```
submissions.id

        |

        v

results.submission_id

```

---

# 16. Judge Jobs Table

## Table

```
judge_jobs

```

---

## Purpose

Quản lý hàng đợi chấm.

---

## Schema

| Column        | Type      | Description |
| ------------- | --------- | ----------- |
| id            | BIGSERIAL | Primary Key |
| submission_id | BIGINT    | Bài nộp     |
| status        | VARCHAR   | Trạng thái  |
| priority      | INTEGER   | Ưu tiên     |
| worker_id     | VARCHAR   | Worker      |
| created_at    | TIMESTAMP | Ngày tạo    |
| completed_at  | TIMESTAMP | Hoàn thành  |

---

# 17. Workers Table

## Table

```
judge_workers

```

---

## Schema

| Column         | Type      |
| -------------- | --------- |
| id             | BIGSERIAL |
| worker_id      | VARCHAR   |
| hostname       | VARCHAR   |
| status         | VARCHAR   |
| capacity       | INTEGER   |
| last_heartbeat | TIMESTAMP |

---

# 18. Audit Logs Table

## Table

```
audit_logs

```

---

## Purpose

Theo dõi hoạt động hệ thống.

---

## Schema

| Column     | Type      |
| ---------- | --------- |
| id         | BIGSERIAL |
| user_id    | BIGINT    |
| action     | VARCHAR   |
| ip_address | VARCHAR   |
| metadata   | JSONB     |
| created_at | TIMESTAMP |

---

# 19. Database Constraints

Áp dụng:

## Foreign Key

```
users

problems

submissions

results

test_cases

```

---

## Not Null

Các trường quan trọng:

```
username

email

problem_id

submission_id

```

---

## Unique

```
username

email

slug

```

---

# 20. Index Strategy

Index quan trọng:

```
users(email)

users(username)

problems(difficulty)

submissions(user_id)

submissions(problem_id)

submissions(status)

results(submission_id)

```

---

# 21. Transaction Design

Các thao tác cần Transaction:

## Create Submission

```
Create Submission

+

Create Judge Job

```

---

## Save Result

```
Update Submission

+

Insert Result

```

---

# 22. Data Retention Policy

Dữ liệu lâu dài:

```
Users

Problems

Results

```

Dữ liệu có thể lưu trữ lạnh:

```
Old Submissions

Logs

```

---

# 23. Backup Strategy

Backup:

```
Daily Full Backup

Hourly Incremental Backup

```

---

# 24. Migration Strategy

Sử dụng:

```
Database Migration Tool

```

Ví dụ:

```
Prisma Migration

Flyway

Liquibase

```

---

# 25. Performance Consideration

Áp dụng:

* Index hợp lý.
* Partition bảng lớn.
* Query optimization.
* Connection pooling.

---

# 26. Security Consideration

Database phải:

* Không public trực tiếp.
* Mã hóa dữ liệu nhạy cảm.
* Phân quyền truy cập.
* Backup an toàn.

---

# 27. Future Expansion

Có thể thêm:

```
Contest Tables

Discussion Tables

Achievement Tables

Notification Tables

AI Analysis Tables

```

---

# 28. Kết luận

Database Schema Design xác định nền tảng dữ liệu của toàn bộ hệ thống.

Thiết kế đảm bảo:

* Quản lý dữ liệu rõ ràng.
* Hỗ trợ chấm bài quy mô lớn.
* Tích hợp tốt với Backend và Judge System.
* Sẵn sàng mở rộng thành nền tảng học lập trình hoàn chỉnh.

---

# End of Document
