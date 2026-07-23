# 02. Database ERD Design

## 1. Tổng quan

Tài liệu này mô tả thiết kế sơ đồ quan hệ dữ liệu (Entity Relationship Diagram - ERD) của hệ thống website chấm C++ D:\DuAnLapTrinh.

Mục tiêu:

* Xác định quan hệ giữa các thực thể.
* Chuẩn hóa cấu trúc dữ liệu.
* Đảm bảo tính toàn vẹn dữ liệu.
* Làm cơ sở triển khai Database.

---

# 2. Entity Overview

Các Entity chính:

```
User

Problem

TestCase

Submission

Result

JudgeJob

JudgeWorker

AuditLog

```

Quan hệ tổng quát:

```
User

 |

 +----------------+

 |                |

 v                v

Problem       Submission

 |

 v

TestCase


Submission

 |

 v

Result


Submission

 |

 v

JudgeJob


JudgeJob

 |

 v

JudgeWorker

```

---

# 3. ERD Diagram

Sơ đồ quan hệ:

```
+-------------+
|    users    |
+-------------+
| id PK       |
| username    |
| email       |
| role        |
+-------------+
       |
       |
       | 1:N
       |
       v

+-------------+
|  problems   |
+-------------+
| id PK       |
| title       |
| created_by FK
+-------------+
       |
       |
       | 1:N
       |
       v

+-------------+
| test_cases  |
+-------------+
| id PK       |
| problem_id FK
| input       |
| output      |
+-------------+



+-------------+
| submissions |
+-------------+
| id PK       |
| user_id FK  |
| problem_id FK
| source_code |
| status      |
+-------------+
       |
       |
       | 1:1
       |
       v


+-------------+
|  results    |
+-------------+
| id PK       |
| submission_id FK
| score       |
| runtime     |
+-------------+


submissions

       |

       | 1:1

       v


+-------------+
| judge_jobs  |
+-------------+
| id PK       |
| submission_id FK
| worker_id FK
| status      |
+-------------+


       |

       | N:1

       v


+-------------+
| judge_workers|
+-------------+
| id PK       |
| worker_id   |
| status      |
+-------------+

```

---

# 4. User Entity

## Description

Đại diện cho người sử dụng hệ thống.

Bao gồm:

```
Student

Teacher

Admin

```

---

## Relationship

Một User có thể:

```
1 User

    |

    +---- N Problems

    |

    +---- N Submissions

    |

    +---- N Audit Logs

```

---

# 5. Problem Entity

## Description

Đại diện cho một bài tập lập trình.

---

## Relationship

Một Problem:

Có nhiều:

```
Test Cases

Submissions

```

Quan hệ:

```
Problem

1

|

N

TestCase


Problem

1

|

N

Submission

```

---

# 6. TestCase Entity

## Description

Lưu dữ liệu kiểm thử của bài.

---

## Relationship

```
Problem

1

|

N

TestCase

```

---

## Constraint

Một TestCase bắt buộc:

```
Thuộc một Problem

Có Input

Có Expected Output

Có Score

```

---

# 7. Submission Entity

## Description

Lưu bài làm của người dùng.

---

## Relationship

Submission thuộc:

```
Một User

Một Problem

```

Mô hình:

```
User

1

|

N

Submission


Problem

1

|

N

Submission

```

---

# 8. Result Entity

## Description

Lưu kết quả chấm.

---

## Relationship

```
Submission

1

|

1

Result

```

---

## Data

Bao gồm:

```
Status

Score

Runtime

Memory

Error Detail

```

---

# 9. JudgeJob Entity

## Description

Đại diện cho một tác vụ chấm.

---

## Relationship

```
Submission

1

|

1

JudgeJob

```

---

# 10. JudgeWorker Entity

## Description

Đại diện cho máy hoặc tiến trình thực hiện chấm.

---

## Relationship

Một Worker có thể xử lý nhiều Job:

```
JudgeWorker

1

|

N

JudgeJob

```

---

# 11. AuditLog Entity

## Description

Lưu lịch sử hoạt động.

---

## Relationship

```
User

1

|

N

AuditLog

```

---

# 12. Cardinality Summary

| Relationship          | Cardinality |
| --------------------- | ----------- |
| User - Problem        | 1:N         |
| User - Submission     | 1:N         |
| Problem - TestCase    | 1:N         |
| Problem - Submission  | 1:N         |
| Submission - Result   | 1:1         |
| Submission - JudgeJob | 1:1         |
| Worker - JudgeJob     | 1:N         |
| User - AuditLog       | 1:N         |

---

# 13. Foreign Key Mapping

## Problems

```sql
created_by

REFERENCES users(id)

```

---

## Test Cases

```sql
problem_id

REFERENCES problems(id)

```

---

## Submissions

```sql
user_id

REFERENCES users(id)


problem_id

REFERENCES problems(id)

```

---

## Results

```sql
submission_id

REFERENCES submissions(id)

```

---

## Judge Jobs

```sql
submission_id

REFERENCES submissions(id)


worker_id

REFERENCES judge_workers(id)

```

---

# 14. Delete Policy

## User

Không xóa vật lý.

Sử dụng:

```
status = INACTIVE

```

---

## Problem

Có thể:

```
Archive

```

Không xóa nếu đã có Submission.

---

## Submission

Không xóa.

Lưu để:

```
History

Statistics

Audit

```

---

# 15. Normalization

Database đạt:

```
Third Normal Form (3NF)

```

Lợi ích:

* Giảm dữ liệu trùng lặp.
* Tăng tính nhất quán.
* Dễ bảo trì.

---

# 16. Data Flow Example

## User Submit Code

```
User

 |

 v

Submission

 |

 v

JudgeJob

 |

 v

Worker

 |

 v

Result

```

---

# 17. Reporting Data Flow

```
Submission

      |

      v

Result

      |

      v

Statistics

      |

      v

Ranking

```

---

# 18. Index Relationship

Index quan trọng:

```
submissions.user_id

submissions.problem_id

results.submission_id

test_cases.problem_id

judge_jobs.status

```

---

# 19. ERD Extension

Trong tương lai có thể thêm:

```
Contest

ContestProblem

Discussion

Comment

Notification

Achievement

UserRating

```

---

# 20. Kết luận

Database ERD Design mô tả cấu trúc quan hệ dữ liệu cốt lõi của hệ thống.

Thiết kế đảm bảo:

* Quan hệ rõ ràng.
* Dữ liệu nhất quán.
* Hỗ trợ truy vấn nhanh.
* Sẵn sàng mở rộng hệ thống chấm C++ quy mô lớn.

---

# End of Document
