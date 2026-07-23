# C++ ONLINE JUDGE

**Software Design Specification (SDS)**

Version: **1.0.0**

Document: **02 - System Architecture**

Status: **Approved**

---

# 1. Mục đích

Tài liệu này mô tả kiến trúc tổng thể của hệ thống C++ Online Judge.

Kiến trúc được thiết kế theo hướng module hóa, dễ bảo trì, dễ mở rộng và phù hợp với Firebase Hosting.

Sau khi tài liệu này được phê duyệt, kiến trúc hệ thống được xem là cố định.

---

# 2. Kiến trúc tổng thể

Hệ thống được chia thành 5 tầng.

```
+------------------------------------------------+
|                 Client Browser                 |
+------------------------------------------------+
                    |
                    ▼
+------------------------------------------------+
|                Presentation Layer              |
| HTML + CSS + JavaScript + Bootstrap            |
+------------------------------------------------+
                    |
                    ▼
+------------------------------------------------+
|               Application Layer                |
| Router - Components - Pages                    |
+------------------------------------------------+
                    |
                    ▼
+------------------------------------------------+
|                 Service Layer                  |
| Firebase Authentication                        |
| Firestore                                      |
| Storage                                        |
| Judge Service                                  |
+------------------------------------------------+
                    |
                    ▼
+------------------------------------------------+
|                  Data Layer                    |
| Firestore                                      |
| Firebase Storage                               |
| Testcases                                      |
+------------------------------------------------+
```

---

# 3. Kiến trúc Frontend

Frontend chỉ sử dụng công nghệ gốc.

## Thành phần

- HTML5
- CSS3
- JavaScript ES Modules
- Bootstrap 5
- Bootstrap Icons

## Không sử dụng

- React
- Vue
- Angular
- jQuery

Mục tiêu:

- Tốc độ cao
- Không cần Build Tool
- Dễ triển khai
- Dễ bảo trì

---

# 4. Kiến trúc Backend

Backend sử dụng dịch vụ Firebase.

Các thành phần gồm:

- Firebase Authentication
- Firestore
- Firebase Storage
- Cloud Functions

Frontend không truy cập trực tiếp vào Judge.

Mọi yêu cầu đều đi qua Service Layer.

---

# 5. Kiến trúc Judge

Judge là một dịch vụ độc lập.

Luồng xử lý:

```
Submit Code
        │
        ▼
Receive Source
        │
        ▼
Compile
        │
        ▼
Compile Success ?
      /     \
    No       Yes
    │          │
    ▼          ▼
Return CE   Execute
                │
                ▼
Run Testcases
                │
                ▼
Compare Output
                │
                ▼
Calculate Score
                │
                ▼
Save Result
                │
                ▼
Return Result
```

Judge phải được cô lập khỏi hệ thống chính.

---

# 6. Kiến trúc thư mục

```
D:\DuAnLapTrinh
│
├── index.html
├── manifest.json
├── service-worker.js
├── .gitignore
├── README.md
│
├── assets
│   ├── css
│   ├── js
│   ├── images
│   ├── vendor
│   └── fonts
│
├── data
│
├── docs
│   └── specification
│
├── testcases
│
└── functions
```

---

# 7. Kiến trúc CSS

CSS được chia thành ba nhóm.

## Core

```
reset.css
variables.css
typography.css
animation.css
theme.css
```

## Layout

```
app.css
sidebar.css
navbar.css
footer.css
```

## Components

```
button.css
card.css
form.css
table.css
badge.css
modal.css
toast.css
breadcrumb.css
loading.css
editor.css
```

Mỗi file chỉ đảm nhiệm một chức năng.

---

# 8. Kiến trúc JavaScript

JavaScript được tổ chức thành các module.

```
app.js
config.js
router.js
utils.js
storage.js
```

Các module giao diện.

```
components/
```

Các module trang.

```
pages/
```

Các module nghiệp vụ.

```
services/
```

Các model dữ liệu.

```
models/
```

---

# 9. Luồng dữ liệu

```
User

↓

Page

↓

Component

↓

Service

↓

Firebase

↓

Service

↓

Component

↓

User
```

Toàn bộ dữ liệu đều đi theo một chiều.

Không cho phép component truy cập trực tiếp Firestore.

---

# 10. Luồng đăng nhập

```
Login Page

↓

Authentication Service

↓

Firebase Authentication

↓

Access Token

↓

Firestore

↓

Load User Profile

↓

Dashboard
```

---

# 11. Luồng nộp bài

```
Editor

↓

Source Code

↓

Submission Service

↓

Cloud Function

↓

Judge

↓

Result

↓

Firestore

↓

Result Page
```

---

# 12. Khả năng mở rộng

Hệ thống được thiết kế để có thể bổ sung:

- Python
- Java
- C#
- JavaScript
- Go
- Rust

mà không thay đổi kiến trúc.

---

# 13. Nguyên tắc phụ thuộc

Mỗi tầng chỉ được gọi tầng ngay phía dưới.

Ví dụ:

Presentation

↓

Application

↓

Service

↓

Data

Không được bỏ qua tầng trung gian.

---

# 14. Quy tắc module

Mỗi module phải:

- Độc lập.
- Có thể tái sử dụng.
- Có trách nhiệm duy nhất.
- Không phụ thuộc vòng.

---

# 15. Kết luận

Kiến trúc trên là nền tảng chính thức của dự án.

Mọi tệp mã nguồn được tạo sau này phải tuân thủ tài liệu này.

---

**Kết thúc tài liệu**

**Version:** 1.0.0

**Status:** Approved