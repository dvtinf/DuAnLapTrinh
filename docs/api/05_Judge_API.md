# 05. Judge API Specification

## 1. Tổng quan

Tài liệu này mô tả đặc tả API giao tiếp giữa **Backend System** và **Judge System** của website chấm C++ D:\DuAnLapTrinh.

Judge API không dành cho người dùng cuối mà phục vụ giao tiếp nội bộ giữa:

```id="6zq3xa"
Backend Service

        |

        v

Judge Service

        |

        v

Judge Worker

```

Chức năng:

* Tạo tác vụ chấm.
* Gửi thông tin bài nộp.
* Theo dõi tiến trình chấm.
* Nhận kết quả.
* Quản lý Worker.

---

# 2. Judge API Architecture

Mô hình:

```id="a9d7sf"
Submission Service

        |

        |

        v

Judge API Gateway

        |

        v

Judge Queue

        |

        v

Worker Pool

        |

        v

Compiler + Executor

        |

        v

Result Processor

```

---

# 3. Base API

Prefix:

```id="q7sx3e"
/api/v1/judge
```

---

# 4. Authentication

Judge API sử dụng:

```
Internal Service Authentication

```

Không sử dụng login người dùng.

Cơ chế:

```
Service Token

+

IP Restriction

+

Signature Validation

```

---

# 5. Judge Job Data Model

Judge Job:

```json id="6f6x8d"
{
    "jobId":"JOB001",
    "submissionId":"SUB001",
    "problemId":10,
    "language":"CPP",
    "priority":"NORMAL",
    "status":"QUEUED"
}
```

---

# 6. Judge Job Status

Các trạng thái:

```
CREATED

QUEUED

PROCESSING

COMPLETED

FAILED

CANCELLED

```

---

# 7. Create Judge Job API

## Endpoint

```id="t7n8ak"
POST

/api/v1/judge/jobs
```

---

## Description

Tạo một tác vụ chấm mới.

---

## Request Body

```json id="x1q2hs"
{
    "submissionId":"SUB001",
    "problemId":10,
    "sourceCode":"#include<iostream>",
    "language":"CPP"
}
```

---

# 8. Processing Flow

```id="m9x6yw"
Receive Job

      |

Validate Submission

      |

Create Queue Message

      |

Assign Worker

      |

Execute Judge

```

---

# 9. Create Job Response

HTTP:

```
201 Created

```

Response:

```json id="d9q7pp"
{
    "success":true,
    "data":{
        "jobId":"JOB001",
        "status":"QUEUED"
    }
}
```

---

# 10. Get Judge Job Status API

## Endpoint

```id="e4n6pq"
GET

/api/v1/judge/jobs/{jobId}

```

---

## Response

```json id="j9m5rx"
{
    "success":true,
    "data":{
        "jobId":"JOB001",
        "status":"RUNNING",
        "workerId":"WORKER01"
    }
}
```

---

# 11. Cancel Judge Job API

## Endpoint

```id="h7x2mz"
POST

/api/v1/judge/jobs/{jobId}/cancel

```

---

## Permission

```
ADMIN

SYSTEM

```

---

## Response

```json id="x4q1ca"
{
    "success":true,
    "message":"Job cancelled"
}
```

---

# 12. Submit Result API

## Endpoint

```id="p8s3vd"
POST

/api/v1/judge/results

```

---

## Description

Judge Worker gửi kết quả về Backend.

---

## Request Body

```json id="n1m6ft"
{
    "jobId":"JOB001",
    "submissionId":"SUB001",
    "status":"ACCEPTED",
    "score":100,
    "runtime":120,
    "memory":32
}
```

---

# 13. Result Processing Flow

```id="v3t9qa"
Receive Result

        |

Validate Signature

        |

Update Submission

        |

Save Result

        |

Notify Client

```

---

# 14. Judge Result Status

Các trạng thái:

```
ACCEPTED

WRONG_ANSWER

COMPILE_ERROR

RUNTIME_ERROR

TIME_LIMIT_EXCEEDED

MEMORY_LIMIT_EXCEEDED

SYSTEM_ERROR

```

---

# 15. Worker Registration API

## Endpoint

```id="b6r4kp"
POST

/api/v1/judge/workers/register

```

---

## Description

Đăng ký Judge Worker mới.

---

## Request

```json id="f7w2qn"
{
    "workerId":"WORKER01",
    "hostname":"judge-server-01",
    "capacity":10
}
```

---

## Response

```json id="1j7v3s"
{
    "success":true,
    "message":"Worker registered"
}
```

---

# 16. Worker Heartbeat API

## Endpoint

```id="s9m4yy"
POST

/api/v1/judge/workers/{id}/heartbeat

```

---

## Mục đích

Kiểm tra Worker còn hoạt động.

---

## Request

```json id="4x3jha"
{
    "status":"ONLINE",
    "runningJobs":5
}
```

---

# 17. Worker Status

Trạng thái:

```
ONLINE

BUSY

OFFLINE

ERROR

```

---

# 18. Test Case Access API

Judge Worker cần lấy dữ liệu test.

## Endpoint

```id="z1x5bp"
GET

/api/v1/judge/problems/{id}/tests

```

---

## Response

```json id="j2w7qt"
{
    "success":true,
    "data":[
        {
            "input":"5",
            "output":"120",
            "score":10
        }
    ]
}
```

---

# 19. Source Code Access API

## Endpoint

```id="q4v9mc"
GET

/api/v1/judge/submissions/{id}/source

```

---

## Response

```json id="a5z8qw"
{
    "language":"CPP",
    "sourceCode":"..."
}
```

---

# 20. Security Requirements

Judge API phải:

* Chỉ cho phép service nội bộ truy cập.
* Xác thực request.
* Không public Internet.
* Log toàn bộ hoạt động.
* Kiểm tra dữ liệu nhận từ Worker.

---

# 21. Rate Limit

Áp dụng:

```
Job Creation

Worker Communication

Result Submission

```

---

# 22. Error Code

| Code     | Meaning            |
| -------- | ------------------ |
| JUDGE001 | Invalid job        |
| JUDGE002 | Worker unavailable |
| JUDGE003 | Compilation failed |
| JUDGE004 | Execution failed   |
| JUDGE005 | Result invalid     |

---

# 23. Testing

## Job Test

```
Create Job

Queue Job

Cancel Job

```

---

## Worker Test

```
Register Worker

Heartbeat

Worker Failure

```

---

## Result Test

```
Accepted Result

Wrong Answer

Runtime Error

```

---

# 24. Performance Requirement

Judge API phải:

* Xử lý bất đồng bộ.
* Không giữ connection lâu.
* Hỗ trợ nhiều Worker.
* Có retry khi lỗi.

---

# 25. Future Extension

Có thể mở rộng:

```
Distributed Judge Cluster

Remote Worker Node

GPU Worker

AI Code Analysis Worker

```

---

# 26. Kết luận

Judge API là lớp giao tiếp quan trọng giữa Backend và hệ thống chấm.

Thiết kế đảm bảo:

* Tách biệt Backend và Judge.
* An toàn khi thực thi code.
* Hỗ trợ mở rộng Worker.
* Sẵn sàng triển khai hệ thống chấm quy mô lớn.

---

# End of Document
