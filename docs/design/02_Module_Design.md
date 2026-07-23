# 02. Module Design

## 1. Tổng quan

Tài liệu này mô tả thiết kế chi tiết các module chức năng của hệ thống website chấm C++ D:\DuAnLapTrinh.

Mục tiêu:

- Xác định rõ trách nhiệm từng module.
- Tách biệt logic xử lý.
- Giảm phụ thuộc giữa các thành phần.
- Dễ phát triển và bảo trì.
- Hỗ trợ mở rộng trong tương lai.

---

# 2. System Module Overview


Hệ thống gồm các module chính:


```
D:\DuAnLapTrinh

        |

        +----------------+

        |                |

    Frontend          Backend

                         |

              +----------+----------+

              |          |          |

          User       Problem     Submission

              |

              |

          Judge System

              |

          Result System

```


---

# 3. Frontend Modules


Frontend chịu trách nhiệm:

- Hiển thị giao diện.
- Nhận thao tác người dùng.
- Giao tiếp Backend API.


Cấu trúc:


```
Frontend

|

+-- Authentication Module

|

+-- Problem Module

|

+-- Code Editor Module

|

+-- Submission Module

|

+-- Result Module

|

+-- User Dashboard Module

```


---

# 4. Authentication Module


## Chức năng


Quản lý:


- Đăng nhập.
- Đăng ký.
- Đăng xuất.
- Kiểm tra trạng thái người dùng.


---

## Components


```
LoginPage

RegisterPage

AuthForm

UserSession

```


---

## Data Flow


```
User

 |

Login Form

 |

Auth API

 |

Backend

 |

Token

 |

Frontend Storage

```

---

# 5. Problem Module


## Chức năng


Quản lý bài toán:


- Danh sách bài.
- Chi tiết bài.
- Nội dung đề.
- Test information.


---

## Components


```
ProblemList

ProblemCard

ProblemDetail

ProblemStatement

```


---

## Flow


```
User

 |

Select Problem

 |

Request Problem API

 |

Display Problem

```

---

# 6. Code Editor Module


## Chức năng


Cho phép người dùng:


- Viết code C++.
- Chỉnh sửa code.
- Gửi bài.


---

## Components


```
CodeEditor

LanguageSelector

RunButton

SubmitButton

```


---

## Data


Input:


```
Source Code

Language

Problem ID

```


Output:


```
Submission ID

Status

```


---

# 7. Submission Module


## Chức năng


Quản lý bài gửi:


- Tạo submission.
- Theo dõi trạng thái.
- Hiển thị lịch sử.


---

## Components


```
SubmissionHistory

SubmissionItem

SubmissionStatus

```


---

# 8. Result Module


## Chức năng


Hiển thị kết quả chấm:


- Điểm.
- Trạng thái.
- Thời gian chạy.
- Bộ nhớ.


---

## Components


```
ResultCard

ScoreDisplay

TestResultTable

```


---

# 9. Backend Modules


Backend chịu trách nhiệm:


- Xử lý nghiệp vụ.
- Quản lý dữ liệu.
- Cung cấp API.
- Điều phối Judge System.


Cấu trúc:


```
Backend

|

+-- Auth Module

|

+-- User Module

|

+-- Problem Module

|

+-- Submission Module

|

+-- Judge Integration Module

|

+-- Result Module

```


---

# 10. User Module


## Chức năng


Quản lý người dùng:


- Profile.
- Role.
- Permission.


---

## Components


```
UserController

UserService

UserRepository

UserModel

```


---

# 11. Problem Module


## Chức năng


Quản lý bài tập:


- Tạo bài.
- Cập nhật bài.
- Xóa bài.
- Lấy danh sách.


---

## Components


```
ProblemController

ProblemService

ProblemRepository

ProblemModel

```


---

# 12. Submission Module


## Chức năng


Quản lý bài nộp:


- Nhận code.
- Lưu submission.
- Gửi Judge.


---

## Components


```
SubmissionController

SubmissionService

SubmissionRepository

SubmissionModel

```


---

# 13. Judge Integration Module


## Chức năng


Kết nối Backend với Judge System.


Nhiệm vụ:


- Tạo job.
- Gửi code.
- Nhận kết quả.


---

## Components


```
JudgeClient

JudgeQueue

JudgeResultHandler

```


---

# 14. Judge System Modules


Judge System gồm:


```
Judge

|

+-- Compiler Module

|

+-- Executor Module

|

+-- Checker Module

|

+-- Sandbox Module

|

+-- Worker Module

```


---

# 15. Compiler Module


## Chức năng


Biên dịch C++:


Input:


```
source.cpp

```


Output:


```
executable file

compile result

```


---

# 16. Executor Module


## Chức năng


Chạy chương trình:


Input:


```
Executable

Test Input

```


Output:


```
Program Output

Execution Information

```


---

# 17. Checker Module


## Chức năng


So sánh:


```
Expected Output

        |

        v

User Output

```


Kết quả:


```
Accepted

Wrong Answer

```


---

# 18. Sandbox Module


## Chức năng


Kiểm soát:


- CPU.
- RAM.
- Time.
- Permission.


---

# 19. Worker Module


## Chức năng


Xử lý queue:


```
Receive Job

      |

Execute Judge

      |

Save Result

```


---

# 20. Database Module


Database quản lý:


```
User Data

Problem Data

Submission Data

Result Data

```


---

# 21. Module Communication


Giao tiếp:


```
Frontend

   |

REST API

   |

Backend

   |

Service Layer

   |

Database / Judge

```


---

# 22. Module Dependency Rule


Quy tắc:


```
Frontend

    ↓

Backend Controller

    ↓

Service

    ↓

Repository

    ↓

Database


Judge Integration

    ↓

Judge System

```


Không cho phép:


```
Frontend --> Database

Frontend --> Judge Directly

```


---

# 23. Error Handling


Mỗi module phải:


- Có xử lý lỗi.
- Có log.
- Có response chuẩn.


Ví dụ:


```json
{
    "success":false,
    "error":"INVALID_REQUEST"
}
```


---

# 24. Future Module Expansion


Có thể thêm:


```
Contest Module

Ranking Module

Notification Module

AI Assistant Module

Analytics Module

```


---

# 25. Kết luận


Module Design xác định kiến trúc chức năng của website chấm C++.

Thiết kế này đảm bảo:

- Phân chia rõ ràng.
- Dễ phát triển song song.
- Dễ kiểm thử.
- Dễ mở rộng.

---

# End of Document