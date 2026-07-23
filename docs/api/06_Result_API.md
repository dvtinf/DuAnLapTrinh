# 06. Result API Specification

## 1. Tổng quan

Tài liệu này mô tả đặc tả API cho module Result của hệ thống website chấm C++ D:\DuAnLapTrinh.

Result API chịu trách nhiệm:

* Lưu trữ kết quả chấm.
* Hiển thị kết quả bài nộp.
* Cung cấp thống kê.
* Xây dựng bảng xếp hạng.
* Phục vụ Dashboard người dùng.

Luồng dữ liệu:

```id="s3b6ko"
Judge System

      |

      v

Result Service

      |

      v

Database

      |

      v

Frontend Dashboard

```

---

# 2. Result API Architecture

Kiến trúc:

```id="w4z1qv"
Client

 |

 v

Result Controller

 |

 v

Result Service

 |

 +------------+

 |            |

 v            v

Database    Analytics

```

---

# 3. Base API

Prefix:

```id="h7q4mz"
/api/v1/results
```

---

# 4. Result Data Model

Result Object:

```json id="u8v2dc"
{
    "id":1,
    "submissionId":"SUB001",
    "status":"ACCEPTED",
    "score":100,
    "runtime":120,
    "memory":32,
    "createdAt":"2026-01-01"
}
```

---

# 5. Result Status

Các trạng thái:

```id="p3k9tm"
ACCEPTED

WRONG_ANSWER

PARTIAL_ACCEPTED

COMPILE_ERROR

RUNTIME_ERROR

TIME_LIMIT_EXCEEDED

MEMORY_LIMIT_EXCEEDED

SYSTEM_ERROR

```

---

# 6. Get Submission Result API

## Endpoint

```id="q8w3nb"
GET

/api/v1/results/submission/{submissionId}

```

---

## Description

Lấy kết quả chấm của một bài nộp.

---

## Response

```json id="m7v1ka"
{
    "success":true,
    "data":{
        "submissionId":"SUB001",
        "status":"ACCEPTED",
        "score":100,
        "runtime":120,
        "memory":32
    }
}
```

---

# 7. Get User Result History API

## Endpoint

```id="d6x4zr"
GET

/api/v1/results/user/history

```

---

## Query Parameters

```id="w2m7sd"
?page=1

&limit=20

&status=ACCEPTED

```

---

## Response

```json id="p9n2kl"
{
    "success":true,
    "data":{
        "page":1,
        "limit":20,
        "items":[
            {
                "submissionId":"SUB001",
                "problem":"Two Sum",
                "score":100,
                "status":"ACCEPTED"
            }
        ]
    }
}
```

---

# 8. Get Problem Statistics API

## Endpoint

```id="v8c5yx"
GET

/api/v1/results/problem/{problemId}/statistics

```

---

## Description

Thống kê kết quả của một bài tập.

---

## Response

```json id="r4k6jm"
{
    "success":true,
    "data":{
        "totalSubmission":500,
        "accepted":320,
        "acceptRate":64
    }
}
```

---

# 9. Get User Statistics API

## Endpoint

```id="x9m2ab"
GET

/api/v1/results/user/{userId}/statistics

```

---

## Response

```json id="z6s1pq"
{
    "success":true,
    "data":{
        "totalSubmission":200,
        "accepted":150,
        "solvedProblem":100,
        "averageScore":85
    }
}
```

---

# 10. Ranking API

## Endpoint

```id="b4n7kc"
GET

/api/v1/results/ranking

```

---

## Description

Lấy bảng xếp hạng người dùng.

---

## Query Parameters

```id="n8v3qd"
?page=1

&limit=50

```

---

## Response

```json id="f2k9mh"
{
    "success":true,
    "data":[
        {
            "rank":1,
            "username":"student01",
            "score":2500,
            "solved":200
        }
    ]
}
```

---

# 11. Contest Ranking API

## Endpoint

```id="p5t8xr"
GET

/api/v1/results/contest/{contestId}/ranking

```

---

## Response

```json id="y3m8qa"
{
    "success":true,
    "data":[
        {
            "rank":1,
            "username":"user01",
            "score":950
        }
    ]
}
```

---

# 12. Score Calculation

Công thức tổng quát:

```id="k9r4xt"
Total Score

=

Sum(Test Case Score)

```

---

Ví dụ:

```
Test 1 : 20 điểm

Test 2 : 30 điểm

Test 3 : 50 điểm


Total = 100 điểm

```

---

# 13. Partial Score

Hỗ trợ:

```
Một phần test đúng

Một phần điểm

```

Ví dụ:

```id="m6x8pq"
Accepted Test:

8/10

Score:

80

```

---

# 14. Result Detail API

## Endpoint

```id="s2k7vw"
GET

/api/v1/results/{id}

```

---

## Response

```json id="g4n8yc"
{
    "success":true,
    "data":{
        "status":"WRONG_ANSWER",
        "failedTestCases":[
            {
                "case":3,
                "message":"Wrong output"
            }
        ]
    }
}
```

---

# 15. Admin Result Management API

Dành cho ADMIN.

---

# 15.1 Delete Result

## Endpoint

```id="z8p3lw"
DELETE

/api/v1/results/{id}

```

---

## Permission

```id="t6q9nm"
ADMIN

```

---

# 16. Result Storage Design

Bảng:

```
results

|

+ id

+ submission_id

+ status

+ score

+ runtime

+ memory

+ created_at

```

---

# 17. Caching Strategy

Dữ liệu có thể cache:

```
Ranking

Statistics

Problem Acceptance Rate

```

---

# 18. Security Requirements

Result API phải:

* Kiểm tra quyền xem dữ liệu.
* Không lộ thông tin nhạy cảm.
* Không cho sửa điểm trực tiếp.
* Audit thao tác ADMIN.

---

# 19. Permission Matrix

| Chức năng       | USER | TEACHER | ADMIN |
| --------------- | ---- | ------- | ----- |
| View Own Result | ✓    | ✓       | ✓     |
| View Ranking    | ✓    | ✓       | ✓     |
| View All Result | ✗    | ✓       | ✓     |
| Modify Result   | ✗    | ✗       | ✓     |

---

# 20. Error Code

| Code   | Meaning                |
| ------ | ---------------------- |
| RES001 | Result not found       |
| RES002 | Permission denied      |
| RES003 | Invalid result         |
| RES004 | Statistics unavailable |

---

# 21. Testing

## Result Test

```id="v5z7ph"
Accepted Result

Wrong Answer

Partial Score

```

---

## Statistics Test

```id="n3q8xd"
Calculate Ranking

Calculate Score

Update Statistics

```

---

## Permission Test

```id="h8m2qr"
User Access

Teacher Access

Admin Access

```

---

# 22. Performance Consideration

Result API cần:

* Cache ranking.
* Index database.
* Aggregate statistics định kỳ.
* Không tính toán nặng trong request.

---

# 23. Future Extension

Có thể mở rộng:

```id="r9w5kv"
Achievement System

Skill Rating

Learning Analytics

AI Recommendation

Progress Tracking

```

---

# 24. Kết luận

Result API hoàn thiện lớp dữ liệu kết quả của hệ thống.

Thiết kế đảm bảo:

* Minh bạch kết quả chấm.
* Hỗ trợ thống kê.
* Hỗ trợ xếp hạng.
* Phục vụ học tập và thi đấu.

---

# End of Document
