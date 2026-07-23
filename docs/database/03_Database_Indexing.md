# 03. Database Indexing Strategy

## 1. Tổng quan

Tài liệu này mô tả chiến lược thiết kế Index cho cơ sở dữ liệu của hệ thống website chấm C++ D:\DuAnLapTrinh.

Mục tiêu:

* Tăng tốc độ truy vấn.
* Giảm thời gian phản hồi API.
* Hỗ trợ lượng lớn người dùng.
* Tối ưu các tác vụ:

  * Tìm kiếm bài tập.
  * Lấy lịch sử nộp bài.
  * Xử lý hàng đợi chấm.
  * Xây dựng bảng xếp hạng.

---

# 2. Nguyên tắc Index

Index được tạo dựa trên:

```id="8r5qwy"
Frequency of Query

+

Data Volume

+

Query Performance

```

Không tạo Index tùy tiện vì:

* Tăng dung lượng Database.
* Làm chậm INSERT/UPDATE.
* Tăng chi phí bảo trì.

---

# 3. Primary Key Index

Tất cả bảng đều sử dụng:

```sql id="e2h7xy"
PRIMARY KEY

```

Ví dụ:

```sql id="5n3s1q"
users.id

problems.id

submissions.id

results.id

```

Đặc điểm:

* Unique.
* B-tree Index mặc định.
* Truy cập nhanh theo ID.

---

# 4. Users Table Index

## 4.1 Username Index

```sql id="9t2w4a"
CREATE UNIQUE INDEX idx_users_username
ON users(username);

```

Mục đích:

* Login.
* Kiểm tra username tồn tại.

---

## 4.2 Email Index

```sql id="k7p4mz"
CREATE UNIQUE INDEX idx_users_email
ON users(email);

```

Sử dụng:

* Login bằng email.
* Reset password.

---

## 4.3 Role Index

```sql id="q6y8nv"
CREATE INDEX idx_users_role
ON users(role);

```

Phục vụ:

* Quản lý Admin.
* Lọc Teacher.

---

# 5. Problems Table Index

## 5.1 Difficulty Index

```sql id="s3n8vq"
CREATE INDEX idx_problem_difficulty
ON problems(difficulty);

```

Query:

```sql
SELECT *

FROM problems

WHERE difficulty='EASY';

```

---

## 5.2 Status Index

```sql id="h9k2fd"
CREATE INDEX idx_problem_status
ON problems(status);

```

Dùng cho:

* Public problem list.
* Hidden problem.

---

## 5.3 Slug Index

```sql id="j5r8mk"
CREATE UNIQUE INDEX idx_problem_slug
ON problems(slug);

```

Mục đích:

URL:

```id="s2f9nd"
/problems/two-sum

```

---

## 5.4 Search Index

Với PostgreSQL:

```sql id="x6d1pq"
CREATE INDEX idx_problem_search

ON problems

USING GIN

(to_tsvector('english', title));

```

Hỗ trợ:

* Tìm kiếm tên bài.
* Full-text search.

---

# 6. Test Cases Index

## Problem Reference Index

```sql id="m8q2wb"
CREATE INDEX idx_testcase_problem

ON test_cases(problem_id);

```

Lý do:

Judge cần lấy:

```sql
SELECT *

FROM test_cases

WHERE problem_id=10;

```

---

# 7. Submission Table Index

Submission là bảng lớn nhất.

Có thể đạt:

```id="b1x7vz"
Millions of Records

```

Cần tối ưu đặc biệt.

---

# 7.1 User Submission Index

```sql id="q8f5km"
CREATE INDEX idx_submission_user

ON submissions(user_id);

```

Dùng cho:

* Lịch sử bài nộp.
* Dashboard.

---

# 7.2 Problem Submission Index

```sql id="m3p9vx"
CREATE INDEX idx_submission_problem

ON submissions(problem_id);

```

Dùng cho:

* Thống kê bài tập.
* Acceptance Rate.

---

# 7.3 Status Index

```sql id="v6k4rx"
CREATE INDEX idx_submission_status

ON submissions(status);

```

Dùng cho:

* Theo dõi bài đang chấm.

---

# 7.4 Composite Index

Quan trọng nhất:

```sql id="w5h7qs"
CREATE INDEX idx_submission_user_time

ON submissions(user_id, created_at DESC);

```

Phục vụ:

```sql
SELECT *

FROM submissions

WHERE user_id=10

ORDER BY created_at DESC;

```

---

# 8. Result Table Index

## Submission Result Lookup

```sql id="z9v3md"
CREATE UNIQUE INDEX idx_result_submission

ON results(submission_id);

```

Lý do:

Một Submission chỉ có một Result cuối cùng.

---

## Ranking Index

```sql id="a5c8yx"
CREATE INDEX idx_result_score

ON results(score DESC);

```

Hỗ trợ:

* Ranking.
* Statistics.

---

# 9. Judge Job Index

Judge Queue yêu cầu tốc độ cao.

---

## Status Queue Index

```sql id="g3n7px"
CREATE INDEX idx_job_status

ON judge_jobs(status);

```

Query:

```sql
SELECT *

FROM judge_jobs

WHERE status='QUEUED';

```

---

## Priority Queue Index

```sql id="k4v9mz"
CREATE INDEX idx_job_priority

ON judge_jobs(priority DESC, created_at);

```

Phục vụ:

```text
Lấy job ưu tiên cao nhất trước

```

---

# 10. Worker Index

## Worker Status

```sql id="r8m2cy"
CREATE INDEX idx_worker_status

ON judge_workers(status);

```

Dùng để:

* Tìm Worker rảnh.
* Điều phối Job.

---

# 11. Audit Log Index

Audit Log có dữ liệu lớn.

---

## User History

```sql id="p6x9kn"
CREATE INDEX idx_audit_user

ON audit_logs(user_id);

```

---

## Time Query

```sql id="w2k5vb"
CREATE INDEX idx_audit_time

ON audit_logs(created_at DESC);

```

---

# 12. Composite Index Strategy

Nguyên tắc:

```id="n4s7py"
Column thường lọc trước

+

Column thường sắp xếp sau

```

Ví dụ:

```sql
(user_id, created_at)

```

Tốt hơn:

```sql
(created_at, user_id)

```

cho lịch sử cá nhân.

---

# 13. Covering Index

Áp dụng cho truy vấn thường xuyên.

Ví dụ:

```sql
CREATE INDEX idx_problem_list

ON problems(id,title,difficulty);

```

Query:

```sql
SELECT id,title,difficulty

FROM problems;

```

Database không cần đọc bảng chính.

---

# 14. Partial Index

PostgreSQL hỗ trợ:

Ví dụ:

Chỉ Index bài Public:

```sql
CREATE INDEX idx_public_problem

ON problems(title)

WHERE status='PUBLIC';

```

Lợi ích:

* Index nhỏ.
* Truy vấn nhanh.

---

# 15. Partitioning Strategy

Khi dữ liệu lớn:

## Submissions

Partition theo thời gian:

```id="k1m8sz"
submissions_2026

submissions_2027

```

---

## Audit Logs

Partition:

```id="v7x3qp"
Monthly Partition

```

---

# 16. Index Maintenance

Định kỳ:

```sql
VACUUM ANALYZE;

REINDEX;

```

Mục đích:

* Thu hồi vùng trống.
* Cập nhật thống kê.
* Duy trì tốc độ.

---

# 17. Monitoring

Theo dõi:

* Slow Query.
* Index Usage.
* Table Size.
* Query Plan.

Công cụ:

```id="f9x5km"
EXPLAIN ANALYZE

pg_stat_user_indexes

```

---

# 18. Performance Target

Mục tiêu:

| Operation              | Target |
| ---------------------- | ------ |
| Get Problem List       | <100ms |
| Get Submission History | <200ms |
| Judge Queue Query      | <50ms  |
| Result Lookup          | <50ms  |

---

# 19. Future Optimization

Có thể bổ sung:

```id="h6m9qw"
ElasticSearch

Redis Cache

Read Replica

Database Sharding

```

---

# 20. Kết luận

Chiến lược Index đảm bảo Database có khả năng mở rộng khi:

* Số lượng người dùng tăng.
* Số bài tập tăng.
* Số bài nộp đạt hàng triệu.
* Judge System xử lý đồng thời nhiều Job.

Thiết kế Index là nền tảng để hệ thống duy trì hiệu năng ổn định trong môi trường thực tế.

---

# End of Document
