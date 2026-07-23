# 04. Database Migration Strategy

## 1. Tổng quan

Tài liệu này mô tả chiến lược quản lý thay đổi cấu trúc Database của hệ thống website chấm C++ D:\DuAnLapTrinh.

Database Migration chịu trách nhiệm:

* Quản lý phiên bản Database.
* Thay đổi Schema có kiểm soát.
* Đồng bộ Database giữa các môi trường.
* Hỗ trợ triển khai tự động.
* Đảm bảo khả năng rollback khi xảy ra lỗi.

Các môi trường:

```text
Development

        |

        v

Testing

        |

        v

Staging

        |

        v

Production

```

---

# 2. Migration Philosophy

Nguyên tắc:

```text
Every Database Change

=

A New Migration Version

```

Không thay đổi trực tiếp Database Production.

Sai:

```text
ALTER TABLE users ...

(trực tiếp trên server)
```

Đúng:

```text
Create Migration File

        |

        v

Review

        |

        v

Execute

```

---

# 3. Migration Tool

Công cụ đề xuất:

```text
Flyway

```

hoặc:

```text
Liquibase

```

Lý do:

* Quản lý version rõ ràng.
* Tích hợp CI/CD.
* Hỗ trợ rollback.
* Theo dõi lịch sử thay đổi.

---

# 4. Migration Folder Structure

Cấu trúc:

```text
database

└── migrations

    ├── V001__create_users.sql

    ├── V002__create_problems.sql

    ├── V003__create_submissions.sql

    ├── V004__create_results.sql

    └── V005__add_indexes.sql

```

Quy tắc:

```text
V{version}__{description}.sql

```

Ví dụ:

```text
V006__add_user_avatar.sql

```

---

# 5. Migration Version Control

Database lưu:

```text
schema_history

```

Ví dụ:

| Version | Description        | Applied |
| ------- | ------------------ | ------- |
| 001     | Create users       | Yes     |
| 002     | Create problems    | Yes     |
| 003     | Create submissions | Yes     |

---

# 6. Initial Database Migration

## V001 - Create Users

Tạo bảng:

```sql
CREATE TABLE users (

    id BIGSERIAL PRIMARY KEY,

    username VARCHAR(100) UNIQUE NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    role VARCHAR(20),

    status VARCHAR(20),

    created_at TIMESTAMP,

    updated_at TIMESTAMP

);

```

---

# 7. Table Creation Order

Thứ tự Migration:

```text
1. users


2. problems


3. test_cases


4. submissions


5. results


6. judge_workers


7. judge_jobs


8. audit_logs

```

Lý do:

* Đảm bảo Foreign Key tồn tại.
* Tránh lỗi dependency.

---

# 8. Schema Change Example

## Requirement

Thêm avatar cho User.

Migration:

```text
V006__add_user_avatar.sql

```

SQL:

```sql
ALTER TABLE users

ADD COLUMN avatar_url TEXT;

```

---

# 9. Adding Column Strategy

Khi thêm Column:

Không nên:

```sql
ADD COLUMN NOT NULL

```

ngay lập tức.

Nên:

Bước 1:

```sql
ADD COLUMN avatar_url TEXT;

```

Bước 2:

```sql
UPDATE users

SET avatar_url='default.png';

```

Bước 3:

```sql
ALTER COLUMN avatar_url

SET NOT NULL;

```

---

# 10. Data Migration

Ngoài Schema Migration còn có:

```text
Structure Migration

+

Data Migration

```

Ví dụ:

Đổi format username:

```text
student_001

-->

student001

```

Cần:

```text
Backup

Validate

Transform

Verify

```

---

# 11. Rollback Strategy

Mỗi Migration cần kế hoạch:

```text
Forward Migration

+

Rollback Plan

```

Ví dụ:

Migration:

```sql
DROP COLUMN old_field;

```

Rollback:

```sql
ADD COLUMN old_field;

```

---

# 12. Production Migration Process

Quy trình:

```text
Create Migration

        |

        v

Code Review

        |

        v

Backup Database

        |

        v

Run Migration

        |

        v

Verify

        |

        v

Deploy Application

```

---

# 13. Zero Downtime Migration

Đối với hệ thống lớn:

Áp dụng:

```text
Expand

Migrate

Contract

```

Ví dụ:

## Phase 1

Thêm Column mới:

```text
new_column

```

---

## Phase 2

Application dùng cả hai:

```text
old_column

new_column

```

---

## Phase 3

Xóa Column cũ.

---

# 14. Seed Data

Dữ liệu mẫu:

```text
database

└── seeds

    ├── users.sql

    ├── problems.sql

    └── test_cases.sql

```

---

# 15. Development Seed

Tạo:

## Admin User

```json
{
    "username":"admin",
    "role":"ADMIN"
}

```

## Sample Problem

```json
{
    "title":"Hello World",
    "difficulty":"EASY"
}

```

---

# 16. Migration Testing

Trước Production:

Kiểm tra:

```text
Fresh Install

Upgrade Existing Database

Rollback

Data Integrity

```

---

# 17. CI/CD Integration

Pipeline:

```text
Build Application

        |

        v

Run Tests

        |

        v

Run Migration

        |

        v

Deploy

```

---

# 18. Backup Before Migration

Bắt buộc:

```text
Production Database Backup

```

Ví dụ:

```bash
pg_dump database_name > backup.sql

```

---

# 19. Migration Security

Yêu cầu:

* Chỉ Developer có quyền Migration.
* Không chạy SQL tùy ý trên Production.
* Audit toàn bộ thay đổi.
* Kiểm tra Review trước Merge.

---

# 20. Migration Naming Convention

Ví dụ:

```text
V001__initial_schema.sql


V002__add_problem_table.sql


V003__create_submission_index.sql

```

---

# 21. Common Migration Errors

## Foreign Key Error

Nguyên nhân:

```text
Migration sai thứ tự

```

---

## Duplicate Column

Nguyên nhân:

```text
Migration chạy lại

```

---

## Data Loss

Nguyên nhân:

```text
DROP TABLE không kiểm soát

```

---

# 22. Monitoring Migration

Theo dõi:

* Migration duration.
* Failed migration.
* Lock database.
* Query performance.

---

# 23. Future Expansion

Có thể bổ sung:

```text
Automated Schema Validation

Database Version Dashboard

Migration Approval Workflow

Blue-Green Database Deployment

```

---

# 24. Kết luận

Database Migration Strategy giúp hệ thống:

* Thay đổi Database an toàn.
* Kiểm soát phiên bản.
* Hỗ trợ CI/CD.
* Giảm rủi ro khi triển khai.
* Duy trì tính ổn định lâu dài.

---

# End of Document
