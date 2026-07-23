# 05. Frontend Design

## 1. Tổng quan

Tài liệu này mô tả thiết kế chi tiết hệ thống Frontend của website chấm C++ D:\DuAnLapTrinh.

Frontend chịu trách nhiệm:

- Cung cấp giao diện người dùng.
- Hiển thị bài tập lập trình.
- Cung cấp môi trường viết code.
- Gửi bài tới hệ thống chấm.
- Hiển thị kết quả chấm.
- Quản lý trải nghiệm người dùng.


Mục tiêu:

- Giao diện trực quan.
- Kiến trúc dễ mở rộng.
- Component tái sử dụng.
- Hiệu năng tốt.
- Dễ bảo trì.

---

# 2. Frontend Architecture


Frontend sử dụng kiến trúc:


```
Component Based Architecture

+

State Management

+

Service Layer

+

API Communication

```


Luồng:


```
User Interaction

        |

        v

Component

        |

        v

State Management

        |

        v

Service Layer

        |

        v

Backend API

```


---

# 3. Technology Stack


Frontend đề xuất:


## Framework


```
React.js

```


---

## Language


```
TypeScript

```


---

## UI Framework


Có thể sử dụng:


```
Material UI

Ant Design

Tailwind CSS

```


---

## Code Editor


Sử dụng:


```
Monaco Editor

```


Lý do:

- Hỗ trợ syntax highlighting.
- Trải nghiệm giống VS Code.
- Hỗ trợ nhiều ngôn ngữ.

---

# 4. Project Structure


Cấu trúc:


```
frontend

|

src

|

+-- assets

|

+-- components

|

+-- pages

|

+-- layouts

|

+-- services

|

+-- hooks

|

+-- store

|

+-- utils

|

+-- types

|

+-- routes

|

+-- styles

```


---

# 5. Component Architecture


Component chia thành:


```
Reusable Components

        +

Feature Components

        +

Page Components

```


---

# 6. Common Components


Các component dùng chung:


```
Button

Input

Modal

Table

Loading

Notification

Pagination

```


Ví dụ:


```
components/common/Button.tsx

```


---

# 7. Layout Components


Quản lý bố cục:


```
MainLayout

AuthLayout

AdminLayout

```


Ví dụ:


```
MainLayout

 |

 +-- Header

 |

 +-- Sidebar

 |

 +-- Content

 |

 +-- Footer

```


---

# 8. Page Components


Các trang chính:


```
HomePage

LoginPage

RegisterPage

ProblemListPage

ProblemDetailPage

EditorPage

SubmissionPage

DashboardPage

AdminPage

```


---

# 9. Authentication Design


## Authentication Flow


```
User Login

      |

Auth API

      |

Receive JWT Token

      |

Store Token

      |

Access Protected Pages

```


---

## Protected Route


Ví dụ:


```
/dashboard

/problem/editor

/admin

```


Yêu cầu:


```
Authenticated User

```


---

# 10. Problem Module Design


## Components


```
ProblemList

ProblemCard

ProblemFilter

ProblemDetail

ProblemStatement

```


---

## Data Flow


```
Problem Page

      |

Problem Service

      |

API

      |

Backend

```


---

# 11. Code Editor Module


## Purpose


Cung cấp môi trường lập trình.


---

## Components


```
CodeEditor

LanguageSelector

InputPanel

SubmitButton

RunButton

```


---

## Editor State


Quản lý:


```
sourceCode

language

problemId

executionResult

submissionStatus

```


---

# 12. Submission Module


## Components


```
SubmitPanel

SubmissionHistory

SubmissionDetail

StatusBadge

```


---

## Submission Flow


```
Click Submit

       |

Validate Code

       |

Send API Request

       |

Receive Submission ID

       |

Monitor Result

```


---

# 13. Result Display Module


Hiển thị:


```
Status

Score

Execution Time

Memory Usage

Test Result

```


Component:


```
ResultCard

ScoreBoard

TestCaseTable

```


---

# 14. State Management


Quản lý trạng thái:


## Global State


Bao gồm:


```
User Session

Authentication

Theme

Application Settings

```


---

## Local State


Bao gồm:


```
Editor Content

Form Data

UI State

```


---

# 15. API Service Layer


Frontend không gọi API trực tiếp trong component.


Mô hình:


```
Component

    |

Service

    |

API Client

    |

Backend

```


Ví dụ:


```
services/problemService.ts

```


---

# 16. Routing Design


Routes:


```
/

 /login

 /register

 /problems

 /problems/:id

 /editor/:id

 /submissions

 /dashboard

 /admin

```


---

# 17. Form Handling


Áp dụng:


- Validation.
- Error message.
- Loading state.


Ví dụ:


```
Login Form

    |

Validate

    |

Submit

    |

Display Result

```


---

# 18. Error Handling


Các loại lỗi:


```
Network Error

Authentication Error

Validation Error

Server Error

```


Hiển thị:


```
Notification Component

```


---

# 19. Performance Optimization


Áp dụng:


- Lazy Loading.
- Code Splitting.
- Component Memoization.
- Image Optimization.
- API Caching.


---

# 20. Responsive Design


Hỗ trợ:


```
Desktop

Tablet

Mobile

```


---

# 21. Security Design


Frontend áp dụng:


- Không lưu password.
- Kiểm tra quyền truy cập.
- Validate input.
- Xử lý token an toàn.


---

# 22. Testing Strategy


Frontend test:


## Unit Test


```
Component Test

Function Test

Hook Test

```


---

## Integration Test


```
Login Flow

Submit Flow

Editor Flow

```


---

# 23. Future Frontend Expansion


Có thể thêm:


```
Contest UI

Ranking Dashboard

Learning Dashboard

AI Code Assistant UI

Online Collaboration Editor

```


---

# 24. Kết luận


Frontend Design định nghĩa nền tảng giao diện của hệ thống website chấm C++.

Thiết kế đảm bảo:

- Component rõ ràng.
- Code dễ bảo trì.
- UX tốt.
- Khả năng mở rộng cao.


---

# End of Document