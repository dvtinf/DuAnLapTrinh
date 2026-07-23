# 10. Coding Convention Specification

## 1. Tổng quan

Coding Convention định nghĩa các quy tắc, tiêu chuẩn và hướng dẫn viết mã nguồn cho toàn bộ dự án D:\DuAnLapTrinh.

Mục tiêu:

- Đảm bảo code dễ đọc.
- Dễ bảo trì.
- Dễ mở rộng.
- Đồng nhất giữa các thành viên phát triển.
- Giảm lỗi trong quá trình phát triển.


Phạm vi áp dụng:

```
Frontend

Backend

Database

Judge System

Testing Code

Configuration
```

---

# 2. Nguyên tắc lập trình chung


## 2.1 Clean Code


Mã nguồn phải:


- Có cấu trúc rõ ràng.
- Tên biến có ý nghĩa.
- Hàm có nhiệm vụ cụ thể.
- Không viết code lặp.


Ví dụ:


Không nên:

```cpp
int a;
int b;
int c;
```


Nên:

```cpp
int studentScore;
int totalScore;
int submissionCount;
```


---

## 2.2 Single Responsibility


Mỗi module chỉ nên chịu trách nhiệm một nhiệm vụ.


Ví dụ:


Không:


```
UserController

    |
    + Login

    + Database Query

    + Send Email

    + Generate Report

```


Nên:


```
UserController

AuthService

UserRepository

EmailService

ReportService

```

---

# 3. Project Structure Convention


Cấu trúc thư mục chuẩn:


```
D:\DuAnLapTrinh

|
+-- frontend

|
+-- backend

|
+-- judge

|
+-- database

|
+-- docs

|
+-- tests

|
+-- deployment

```


---

# 4. Naming Convention


## 4.1 Folder Naming


Sử dụng:


```
lowercase
```


Ví dụ:


```
controllers

services

components

models

```


Không sử dụng:


```
Controllers

MyFolder

TEST
```


---

## 4.2 File Naming


Quy tắc:


```
lowercase-with-extension
```


Ví dụ:


```
user_controller.cpp

auth_service.ts

database_config.json
```


---

## 4.3 Variable Naming


Sử dụng:


```
camelCase
```


Ví dụ:


```cpp
int userCount;

string problemName;
```


---

## 4.4 Constant Naming


Sử dụng:


```
UPPER_CASE
```


Ví dụ:


```cpp
const int MAX_TIMEOUT = 5;
```


---

# 5. C++ Coding Convention


## 5.1 File Structure


Một file C++:


```cpp
#include <iostream>


// Constants


// Classes


// Functions


// Main

```


---

## 5.2 Class Naming


Sử dụng:


```
PascalCase
```


Ví dụ:


```cpp
class JudgeEngine
{

};
```


---

## 5.3 Function Naming


Sử dụng:


```
camelCase
```


Ví dụ:


```cpp
bool checkAnswer()
{

}
```


---

## 5.4 Pointer Usage


Khuyến nghị:


```cpp
std::unique_ptr

std::shared_ptr
```


Hạn chế:


```cpp
raw pointer
```


---

# 6. Backend Coding Convention


## 6.1 Layer Separation


Backend chia thành:


```
Controller

      |

Service

      |

Repository

      |

Database

```


---

## 6.2 Controller Rule


Controller chỉ:


- Nhận request.
- Validate input.
- Gọi service.
- Trả response.


Không xử lý:


- Business logic.
- Database query.


---

## 6.3 Service Rule


Service chứa:


- Business logic.
- Processing.
- Validation.


---

## 6.4 Repository Rule


Repository chịu trách nhiệm:


- Database access.
- Query.
- Data mapping.


---

# 7. Frontend Coding Convention


## 7.1 Component Rule


Component:


- Nhỏ.
- Tái sử dụng.
- Có trách nhiệm rõ ràng.


Ví dụ:


```
Button

Editor

ProblemCard

SubmissionTable

```


---

## 7.2 State Management


Quy tắc:


- State dùng đúng nơi cần thiết.
- Không lưu dữ liệu dư thừa.


---

## 7.3 CSS Convention


Sử dụng:


```
Component-based CSS
```


Tên class:


```css
.problem-card

.submit-button

.editor-container
```


---

# 8. Database Convention


## 8.1 Table Naming


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

## 8.2 Column Naming


Ví dụ:


```
user_id

created_at

updated_at

problem_id
```


---

## 8.3 Primary Key


Quy ước:


```
id
```


Ví dụ:


```
users

id

username

email
```


---

# 9. API Convention


## 9.1 Endpoint Naming


Sử dụng REST API:


Ví dụ:


```
GET

/api/problems


POST

/api/submissions
```


---

## 9.2 HTTP Status Code


Quy định:


| Code | Ý nghĩa |
|-|-|
|200|Success|
|201|Created|
|400|Bad Request|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|
|500|Server Error|


---

# 10. Git Convention


## 10.1 Branch Naming


Quy tắc:


```
feature/

bugfix/

hotfix/

release/
```


Ví dụ:


```
feature/user-login

bugfix/judge-timeout
```


---

## 10.2 Commit Message


Định dạng:


```
type: description
```


Ví dụ:


```
feat: add submission api

fix: solve compile error

docs: update architecture
```


---

# 11. Comment Convention


Comment dùng để giải thích:


- Logic phức tạp.
- Quyết định thiết kế.
- Algorithm.


Không comment:


```cpp
// increase i
i++;
```


---

# 12. Error Handling Convention


Không sử dụng:


```cpp
ignore error
```


Yêu cầu:


- Log lỗi.
- Xử lý ngoại lệ.
- Trả thông báo rõ ràng.


---

# 13. Security Coding Rules


Không:


- Hardcode password.
- Lưu token trong source.
- Disable security check.


Ví dụ:


Sai:


```javascript
const password="123456";
```


Đúng:


```javascript
process.env.PASSWORD
```


---

# 14. Documentation Convention


Mỗi module cần có:


- README.
- API document.
- Configuration guide.


Code quan trọng cần:


- Comment.
- Example usage.


---

# 15. Code Review Rules


Trước khi merge:


Kiểm tra:


- Coding style.
- Security.
- Performance.
- Test coverage.


---

# 16. Testing Requirement


Mã mới phải có:


- Unit test.
- Integration test nếu cần.
- Regression test khi sửa lỗi.


---

# 17. Kết luận


Coding Convention giúp dự án:

- Duy trì chất lượng code.
- Làm việc nhóm hiệu quả.
- Giảm lỗi.
- Dễ phát triển lâu dài.


Đây là chuẩn chung áp dụng cho toàn bộ:

```
Frontend

Backend

Judge System

Database

Deployment
```


---

# End of Document