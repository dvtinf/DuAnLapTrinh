# 03. Problem API Specification

## 1. Tổng quan

Tài liệu này mô tả đặc tả API cho module Problem của hệ thống website chấm C++ D:\DuAnLapTrinh.

Problem API chịu trách nhiệm:

* Quản lý danh sách bài tập lập trình.
* Hiển thị nội dung đề bài.
* Tìm kiếm và lọc bài tập.
* Tạo bài tập mới.
* Cập nhật bài tập.
* Xóa bài tập.
* Quản lý test case.

Đối tượng sử dụng:

```
USER

TEACHER

ADMIN
```

---

# 2. Problem API Architecture

Luồng xử lý:

```
Client

   |

   v

Problem Controller

   |

   v

Problem Service

   |

   v

Problem Repository

   |

   v

Database

```

---

# 3. Base API

Prefix:

```
/api/v1/problems
```

Ví dụ:

```
GET /api/v1/problems
```

---

# 4. Problem Data Model

Problem Object:

```json
{
    "id": 1,
    "title": "Two Sum",
    "slug": "two-sum",
    "description": "Find two numbers...",
    "difficulty": "EASY",
    "timeLimit": 1000,
    "memoryLimit": 256,
    "createdBy": 1,
    "createdAt": "2026-01-01"
}
```

---

# 5. Difficulty Level

Các mức độ:

```
EASY

MEDIUM

HARD

EXPERT

```

---

# 6. Get Problem List API

## Endpoint

```
GET

/api/v1/problems
```

---

## Description

Lấy danh sách bài tập.

---

## Query Parameters

| Parameter  | Description      |
| ---------- | ---------------- |
| page       | Trang hiện tại   |
| limit      | Số lượng bản ghi |
| difficulty | Độ khó           |
| keyword    | Từ khóa tìm kiếm |

Ví dụ:

```
/api/v1/problems?page=1&limit=20&difficulty=EASY
```

---

## Response

```json
{
    "success": true,
    "data": {
        "page":1,
        "limit":20,
        "total":100,
        "items":[
            {
                "id":1,
                "title":"Two Sum",
                "difficulty":"EASY"
            }
        ]
    }
}
```

---

# 7. Get Problem Detail API

## Endpoint

```
GET

/api/v1/problems/{id}
```

---

## Description

Lấy thông tin chi tiết bài tập.

---

## Response

```json
{
    "success":true,
    "data":{
        "id":1,
        "title":"Two Sum",
        "description":"...",
        "inputFormat":"...",
        "outputFormat":"...",
        "constraints":"...",
        "example":"..."
    }
}
```

---

# 8. Get Problem By Slug API

## Endpoint

```
GET

/api/v1/problems/slug/{slug}
```

---

## Example

```
GET

/api/v1/problems/slug/two-sum
```

---

# 9. Search Problem API

## Endpoint

```
GET

/api/v1/problems/search
```

---

## Query

```
?q=sort
```

---

## Response

```json
{
    "success":true,
    "data":[
        {
            "id":5,
            "title":"Sorting Array"
        }
    ]
}
```

---

# 10. Create Problem API

## Endpoint

```
POST

/api/v1/problems
```

---

## Permission

```
TEACHER

ADMIN
```

---

## Request Body

```json
{
    "title":"Maximum Subarray",
    "description":"...",
    "difficulty":"MEDIUM",
    "timeLimit":1000,
    "memoryLimit":256
}
```

---

## Processing Flow

```
Receive Data

      |

Validate

      |

Create Problem

      |

Save Database

      |

Return Result

```

---

## Response

```json
{
    "success":true,
    "data":{
        "problemId":101
    }
}
```

---

# 11. Update Problem API

## Endpoint

```
PUT

/api/v1/problems/{id}
```

---

## Permission

```
TEACHER

ADMIN

```

---

## Request

```json
{
    "title":"Updated Title",
    "difficulty":"HARD"
}
```

---

## Response

```json
{
    "success":true,
    "message":"Problem updated"
}
```

---

# 12. Delete Problem API

## Endpoint

```
DELETE

/api/v1/problems/{id}
```

---

## Permission

```
ADMIN
```

---

## Response

```json
{
    "success":true,
    "message":"Problem deleted"
}
```

---

# 13. Test Case Management API

Test case phục vụ Judge System.

---

# 13.1 Get Test Cases

## Endpoint

```
GET

/api/v1/problems/{id}/testcases
```

---

## Permission

```
TEACHER

ADMIN

```

---

## Response

```json
{
    "success":true,
    "data":[
        {
            "id":1,
            "score":10
        }
    ]
}
```

---

# 13.2 Create Test Case

## Endpoint

```
POST

/api/v1/problems/{id}/testcases
```

---

## Request

```json
{
    "input":"5\n1 2 3",
    "output":"6",
    "score":10
}
```

---

# 13.3 Delete Test Case

## Endpoint

```
DELETE

/api/v1/testcases/{id}
```

---

# 14. Problem Status

Trạng thái bài tập:

```
DRAFT

PUBLIC

PRIVATE

ARCHIVED

```

---

# 15. Problem Permission Matrix

| Chức năng        | USER | TEACHER | ADMIN |
| ---------------- | ---- | ------- | ----- |
| View Problem     | ✓    | ✓       | ✓     |
| Search Problem   | ✓    | ✓       | ✓     |
| Create Problem   | ✗    | ✓       | ✓     |
| Update Problem   | ✗    | ✓       | ✓     |
| Delete Problem   | ✗    | ✗       | ✓     |
| Manage Test Case | ✗    | ✓       | ✓     |

---

# 16. Validation Rules

Kiểm tra:

## Title

```
Required

Length Limit

```

---

## Description

```
Required

Maximum Size

```

---

## Time Limit

```
>0

```

---

## Memory Limit

```
>0

```

---

# 17. Error Code

| Code    | Meaning               |
| ------- | --------------------- |
| PROB001 | Problem not found     |
| PROB002 | Invalid problem data  |
| PROB003 | Permission denied     |
| PROB004 | Cannot delete problem |
| PROB005 | Test case invalid     |

---

# 18. Security Requirements

Problem API cần:

* Kiểm tra quyền tạo/sửa.
* Không lộ test case private.
* Validate dữ liệu đầu vào.
* Audit thay đổi đề bài.

---

# 19. Testing

## Public API Test

```
List Problem

Search

View Detail

```

---

## Management Test

```
Create

Update

Delete

```

---

## Test Case Test

```
Add Test

Update Test

Remove Test

```

---

# 20. Future Extension

Có thể mở rộng:

```
Problem Tag

Category

Contest Problem

Difficulty AI Prediction

Problem Recommendation

```

---

# 21. Kết luận

Problem API là module quản lý kho bài tập của hệ thống.

Thiết kế đảm bảo:

* Quản lý bài toán linh hoạt.
* Hỗ trợ giáo viên và quản trị viên.
* Tích hợp tốt với Judge System.
* Sẵn sàng mở rộng thành nền tảng luyện lập trình hoàn chỉnh.

---

# End of Document
