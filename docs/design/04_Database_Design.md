# 04. Database Design

## 1. Tổng quan

Tài liệu này mô tả thiết kế cơ sở dữ liệu cho hệ thống website chấm C++ D:\DuAnLapTrinh.

Database chịu trách nhiệm lưu trữ và quản lý:

- Thông tin người dùng.
- Bài tập lập trình.
- Bộ test.
- Mã nguồn bài nộp.
- Kết quả chấm.
- Lịch sử hoạt động.

Mục tiêu:

- Thiết kế dữ liệu có cấu trúc.
- Đảm bảo toàn vẹn dữ liệu.
- Tối ưu truy vấn.
- Dễ mở rộng.
- Phù hợp với kiến trúc Backend và Judge System.

---

# 2. Database Architecture


Mô hình tổng thể:


```
                Backend API

                    |

                    v

              Database Layer

                    |

        +-----------+-----------+

        |           |           |

       User      Problem    Submission

                               |

                               v

                           Result

                               |

                               v

                          Judge System

```


---

# 3. Database Technology


Database đề xuất:


```
Relational Database

PostgreSQL / MySQL

```


Lý do:

- Dữ liệu có quan hệ rõ ràng.
- Hỗ trợ transaction.
- Có indexing mạnh.
- Phù hợp hệ thống quản lý bài chấm.


---

# 4. Database Naming Convention


## Table Naming


Sử dụng:


```
snake_case
```


Ví dụ:


```
users

problems

submissions

test_cases

```


---

## Column Naming


Ví dụ:


```
user_id

created_at

updated_at

problem_id

```


---

# 5. Entity Relationship Overview


Các entity chính:


```
Users

  |

  | 1:N

  |

Submissions

  |

  | N:1

  |

Problems


Problems

  |

  | 1:N

  |

Test Cases


Submissions

  |

  | 1:1

  |

Results

```


---

# 6. Users Table


## Purpose


Lưu thông tin người dùng.


Table:


```
users
```


Structure:


| Column | Type | Description |
|-|-|-|
|id|BIGINT|Primary Key|
|username|VARCHAR|Tên đăng nhập|
|email|VARCHAR|Email|
|password_hash|TEXT|Mật khẩu mã hóa|
|role|VARCHAR|Vai trò|
|created_at|TIMESTAMP|Ngày tạo|
|updated_at|TIMESTAMP|Ngày cập nhật|


---

## SQL Example


```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE,
    password_hash TEXT,
    role VARCHAR(20),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```


---

# 7. Problems Table


## Purpose


Lưu thông tin bài tập.


Table:


```
problems
```


Structure:


| Column | Type | Description |
|-|-|-|
|id|BIGINT|Primary Key|
|title|VARCHAR|Tên bài|
|description|TEXT|Nội dung|
|difficulty|VARCHAR|Độ khó|
|time_limit|INT|Giới hạn thời gian|
|memory_limit|INT|Giới hạn bộ nhớ|
|created_by|BIGINT|Người tạo|
|created_at|TIMESTAMP|Ngày tạo|


---

# 8. Test Cases Table


## Purpose


Lưu dữ liệu kiểm thử.


Table:


```
test_cases
```


Structure:


| Column | Type |
|-|-|
|id|BIGINT|
|problem_id|BIGINT|
|input_data|TEXT|
|expected_output|TEXT|
|score|INT|


Relationship:


```
Problem

    |

    |

Test Cases

```


---

# 9. Submissions Table


## Purpose


Lưu bài nộp.


Table:


```
submissions
```


Structure:


| Column | Type |
|-|-|
|id|BIGINT|
|user_id|BIGINT|
|problem_id|BIGINT|
|source_code|TEXT|
|language|VARCHAR|
|status|VARCHAR|
|created_at|TIMESTAMP|


---

Status:


```
PENDING

COMPILING

RUNNING

ACCEPTED

WRONG_ANSWER

TIME_LIMIT_EXCEEDED

RUNTIME_ERROR

COMPILE_ERROR

```


---

# 10. Results Table


## Purpose


Lưu kết quả chấm.


Table:


```
results
```


Structure:


| Column | Type |
|-|-|
|id|BIGINT|
|submission_id|BIGINT|
|score|INT|
|execution_time|INT|
|memory_used|INT|
|message|TEXT|


---

# 11. Judge Jobs Table


## Purpose


Quản lý tác vụ chấm.


Table:


```
judge_jobs
```


Structure:


| Column | Type |
|-|-|
|id|BIGINT|
|submission_id|BIGINT|
|status|VARCHAR|
|worker_id|VARCHAR|
|started_at|TIMESTAMP|
|finished_at|TIMESTAMP|


---

# 12. Roles Table


## Purpose


Quản lý quyền.


Table:


```
roles
```


Structure:


| Column | Type |
|-|-|
|id|BIGINT|
|name|VARCHAR|
|description|TEXT|


---

# 13. Relationships


## User - Submission


Một user có nhiều submission:


```
User

1

|

N

Submission

```


---

## Problem - Submission


Một problem có nhiều submission:


```
Problem

1

|

N

Submission

```


---

## Problem - Test Case


Một problem có nhiều test case:


```
Problem

1

|

N

Test Case

```


---

## Submission - Result


Một submission có một result:


```
Submission

1

|

1

Result

```


---

# 14. Index Design


Các index quan trọng:


## Users


```
username

email
```


---

## Problems


```
difficulty

created_at

```


---

## Submissions


```
user_id

problem_id

status

created_at

```


---

# 15. Data Integrity


Áp dụng:


## Primary Key


Mỗi bảng có:


```
id
```


---

## Foreign Key


Ví dụ:


```
submissions.user_id

        references

users.id

```


---

## Constraint


Bao gồm:


- UNIQUE.
- NOT NULL.
- CHECK.
- FOREIGN KEY.


---

# 16. Database Security


Yêu cầu:


- Không lưu password dạng text.
- Phân quyền database user.
- Backup thường xuyên.
- Audit truy cập.


---

# 17. Migration System


Mọi thay đổi database thông qua migration:


Ví dụ:


```
001_create_users.sql

002_create_problems.sql

003_create_submissions.sql

```


---

# 18. Seed Data


Dữ liệu mẫu:


```
Admin User

Sample Problems

Sample Test Cases

```


---

# 19. Backup Strategy


Backup:


```
Daily Backup

Weekly Full Backup

Recovery Test

```


---

# 20. Database Performance


Tối ưu:


- Index.
- Query optimization.
- Connection pooling.
- Pagination.


---

# 21. Future Database Extension


Có thể mở rộng:


```
contest

ranking

notifications

achievements

learning_progress

```


---

# 22. Kết luận


Database Design cung cấp nền tảng dữ liệu cho toàn bộ hệ thống.

Thiết kế đảm bảo:

- Dữ liệu rõ ràng.
- Quan hệ hợp lý.
- Dễ mở rộng.
- Phù hợp với Backend API và Judge System.


---

# End of Document