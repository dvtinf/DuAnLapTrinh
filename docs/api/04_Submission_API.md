# 04. Submission API Specification

## 1. Tổng quan

Tài liệu này mô tả đặc tả API cho module Submission của hệ thống website chấm C++ D:\DuAnLapTrinh.

Submission API là cầu nối giữa:

```
Frontend

    |

    v

Backend Submission Service

    |

    v

Judge System

    |

    v

Result Processor

```

Chức năng chính:

* Nhận mã nguồn người dùng.
* Tạo bài nộp.
* Gửi yêu cầu chấm.
* Theo dõi trạng thái chấm.
* Lấy lịch sử bài nộp.
* Trả kết quả cho người dùng.

---

# 2. Submission Architecture

Luồng xử lý:

```
User Submit Code

        |

        v

Submission API

        |

        v

Create Submission

        |

        v

Create Judge Job

        |

        v

Judge Queue

        |

        v

Judge Worker

        |

        v

Update Result

```

---

# 3. Base API

Prefix:

```
/api/v1/submissions
```

Ví dụ:

```
POST /api/v1/submissions
```

---

# 4. Authentication Requirement

Tất cả Submission API yêu cầu:

```
Authorization Header

Bearer JWT_TOKEN

```

---

# 5. Submission Data Model

Submission Object:

```json
{
    "id": "SUB001",
    "userId": 1,
    "problemId": 10,
    "language": "CPP",
    "status": "PENDING",
    "score": 0,
    "createdAt": "2026-01-01"
}
```

---

# 6. Submission Status

Các trạng thái:

```
PENDING

QUEUED

COMPILING

RUNNING

ACCEPTED

WRONG_ANSWER

PARTIAL_ACCEPTED

TIME_LIMIT_EXCEEDED

MEMORY_LIMIT_EXCEEDED

RUNTIME_ERROR

COMPILE_ERROR

SYSTEM_ERROR

```

---

# 7. Submit Code API

## Endpoint

```
POST

/api/v1/submissions
```

---

## Description

Gửi mã nguồn để chấm.

---

## Request Body

```json
{
    "problemId":10,
    "language":"CPP",
    "sourceCode":
    "#include<iostream>\n..."
}
```

---

# 8. Validation Rules

## Problem

Kiểm tra:

```
Problem Exists

Problem Public

```

---

## Source Code

Kiểm tra:

```
Not Empty

Maximum Size

Valid Encoding

```

---

## Language

Hiện tại:

```
CPP

```

Có thể mở rộng:

```
JAVA

PYTHON

C

```

---

# 9. Submit Processing Flow

Chi tiết:

```
Receive Request

        |

Validate Data

        |

Create Submission Record

        |

Create Judge Job

        |

Push Queue

        |

Return Submission ID

```

---

# 10. Submit Response

HTTP:

```
201 Created

```

Response:

```json
{
    "success":true,
    "data":{
        "submissionId":"SUB001",
        "status":"PENDING"
    }
}
```

---

# 11. Get Submission Detail API

## Endpoint

```
GET

/api/v1/submissions/{id}

```

---

## Description

Xem trạng thái bài nộp.

---

## Response

```json
{
    "success":true,
    "data":{
        "id":"SUB001",
        "problemId":10,
        "status":"RUNNING",
        "score":0
    }
}
```

---

# 12. Get Submission Result API

## Endpoint

```
GET

/api/v1/submissions/{id}/result

```

---

## Response

```json
{
    "success":true,
    "data":{
        "status":"ACCEPTED",
        "score":100,
        "executionTime":120,
        "memoryUsed":32
    }
}
```

---

# 13. Get User Submission History API

## Endpoint

```
GET

/api/v1/submissions/history
```

---

## Query Parameters

```
?page=1

&limit=20

&problemId=10

&status=ACCEPTED

```

---

## Response

```json
{
    "success":true,
    "data":{
        "page":1,
        "limit":20,
        "total":200,
        "items":[
            {
                "id":"SUB001",
                "problem":"Two Sum",
                "status":"ACCEPTED"
            }
        ]
    }
}
```

---

# 14. Rejudge API

## Endpoint

```
POST

/api/v1/submissions/{id}/rejudge

```

---

## Permission

```
ADMIN

```

---

## Description

Chấm lại bài đã nộp.

---

## Response

```json
{
    "success":true,
    "message":"Rejudge queued"
}
```

---

# 15. Cancel Submission API

## Endpoint

```
POST

/api/v1/submissions/{id}/cancel
```

---

## Description

Hủy bài đang chờ chấm.

---

## Permission

```
USER

ADMIN

```

---

# 16. Judge Queue Integration

Khi tạo submission:

Backend tạo:

```json
{
    "jobId":"JOB001",
    "submissionId":"SUB001",
    "priority":1
}
```

Gửi tới:

```
Judge Queue
```

---

# 17. Submission Priority

Mức ưu tiên:

```
HIGH

NORMAL

LOW

```

Ví dụ:

```
Contest Submission

HIGH


Practice Submission

NORMAL

```

---

# 18. Submission Security

Bảo vệ:

## Source Code

* Giới hạn kích thước.
* Không thực thi trực tiếp.
* Lưu trữ an toàn.

---

## User Permission

Kiểm tra:

```
User Logged In

Problem Available

Submission Allowed

```

---

# 19. Submission Storage

Source code có thể lưu:

## Database

Ưu điểm:

* Đơn giản.

## Object Storage

Ví dụ:

```
submission-files/

   SUB001.cpp

```

Ưu điểm:

* Phù hợp dữ liệu lớn.

---

# 20. Error Code

| Code   | Meaning                   |
| ------ | ------------------------- |
| SUB001 | Submission failed         |
| SUB002 | Problem unavailable       |
| SUB003 | Source code invalid       |
| SUB004 | Judge service unavailable |
| SUB005 | Submission not found      |

---

# 21. Testing

## Submit Test

```
Valid Code

Empty Code

Large Code

Invalid Language

```

---

## Judge Integration Test

```
Create Job

Queue Processing

Receive Result

```

---

## Status Test

```
Pending

Running

Accepted

Failed

```

---

# 22. Performance Consideration

Submission API phải:

* Không chạy compiler trực tiếp.
* Sử dụng queue.
* Xử lý bất đồng bộ.
* Giới hạn request.

---

# 23. Future Extension

Có thể mở rộng:

```
Code Version History

AI Code Review

Similarity Detection

Plagiarism Check

Collaborative Submission

```

---

# 24. Kết luận

Submission API là thành phần trung tâm trong quá trình chấm bài.

Thiết kế đảm bảo:

* Nhận bài ổn định.
* Tích hợp Judge an toàn.
* Theo dõi trạng thái rõ ràng.
* Hỗ trợ mở rộng quy mô lớn.

---

# End of Document
