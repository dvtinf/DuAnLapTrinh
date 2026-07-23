# C++ ONLINE JUDGE

**Software Design Specification (SDS)**

Version: **1.0.0**

Document: **05 - Frontend Architecture**

Status: **Approved**

---

# 1. Mục đích

Tài liệu này mô tả kiến trúc Frontend của hệ thống C++ Online Judge.

Frontend được thiết kế theo các mục tiêu:

- Tốc độ tải nhanh.
- Giao diện hiện đại.
- Không cần Build Tool.
- Không phụ thuộc Framework.
- Dễ bảo trì.
- Dễ mở rộng.
- Có thể hoạt động như Progressive Web App (PWA).

---

# 2. Công nghệ sử dụng

| Thành phần | Công nghệ |
|------------|-----------|
| HTML | HTML5 |
| CSS | CSS3 |
| JavaScript | ES2023 Modules |
| UI Framework | Bootstrap 5 |
| Icon | Bootstrap Icons |
| Editor | Monaco Editor |
| Chart | Chart.js (khi cần thống kê) |

---

# 3. Kiến trúc thư mục Frontend

```text
assets/
│
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── typography.css
│   ├── animation.css
│   ├── theme.css
│   ├── layout/
│   ├── components/
│   └── pages/
│
├── js/
│   ├── app.js
│   ├── config.js
│   ├── router.js
│   ├── utils.js
│   ├── storage.js
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── models/
│
├── images/
├── fonts/
└── vendor/
```

---

# 4. Nguyên tắc tổ chức

Frontend chia thành 4 lớp:

```text
Pages
    │
    ▼
Components
    │
    ▼
Services
    │
    ▼
Firebase
```

Không cho phép:

```
Page

↓

Firestore
```

hoặc

```
Component

↓

Firestore
```

Tất cả phải đi qua Service.

---

# 5. Application Lifecycle

Khi website mở.

```text
Browser

↓

index.html

↓

app.js

↓

config.js

↓

Firebase

↓

Router

↓

Load Page

↓

Render Components

↓

Ready
```

---

# 6. Router

Router chịu trách nhiệm:

- Điều hướng.
- Thay đổi nội dung.
- Kiểm tra đăng nhập.
- Hiển thị trang lỗi.

Router không chứa nghiệp vụ.

---

# 7. Pages

Một Page tương ứng một màn hình.

Ví dụ:

```
Dashboard

Problems

Problem Detail

Submission

Ranking

Profile

Login

Admin
```

Một Page chỉ điều phối giao diện.

Không thao tác trực tiếp với Firestore.

---

# 8. Components

Component là thành phần có thể tái sử dụng.

Ví dụ:

```
Navbar

Sidebar

Footer

Card

Button

Toast

Modal

Breadcrumb

Loading

DataTable

Editor
```

Mỗi Component:

- Độc lập.
- Không phụ thuộc Page.
- Có thể tái sử dụng.

---

# 9. Services

Service chịu trách nhiệm:

- Đăng nhập.
- Đọc Firestore.
- Ghi Firestore.
- Upload.
- Download.
- Gọi Judge.

Service không render giao diện.

---

# 10. Models

Model mô tả cấu trúc dữ liệu.

Ví dụ:

```
User

Problem

Submission

Ranking
```

Model không chứa giao diện.

---

# 11. Cấu trúc HTML

Mọi Page tuân thủ:

```text
<body>

Navbar

↓

Sidebar

↓

Main Content

↓

Footer

</body>
```

Không tự ý thay đổi bố cục.

---

# 12. CSS Architecture

CSS chia thành:

Core

↓

Layout

↓

Components

↓

Pages

Không được khai báo CSS trùng lặp.

---

# 13. JavaScript Architecture

JavaScript sử dụng ES Module.

Ví dụ

```javascript
import { getProblems } from "../services/problem.service.js";
```

Không sử dụng:

```
<script>

function x(){}

</script>
```

---

# 14. State Management

Không sử dụng Redux.

State được quản lý bằng:

- Module
- Local Storage
- Session Storage
- Firebase Authentication

---

# 15. Local Storage

Chỉ lưu:

- Theme.
- Sidebar State.
- User Preference.

Không lưu:

- Password.
- Access Token.
- Source Code.

---

# 16. Session Storage

Dùng cho dữ liệu tạm.

Ví dụ:

- Bộ lọc.
- Trang hiện tại.
- Tìm kiếm.

---

# 17. Loading

Mọi thao tác bất đồng bộ đều phải có Loading.

Ví dụ:

```
Login

↓

Loading

↓

Success
```

---

# 18. Toast

Thông báo gồm:

- Success
- Warning
- Error
- Info

Không dùng `alert()`.

---

# 19. Modal

Modal sử dụng Bootstrap.

Không tự viết Modal.

---

# 20. Form Validation

Kiểm tra:

- Client.
- Server.

Client chỉ nhằm cải thiện trải nghiệm.

Server là nơi quyết định cuối cùng.

---

# 21. Error Handling

Có 3 loại lỗi:

- UI Error.
- Network Error.
- System Error.

Không hiển thị Stack Trace cho người dùng.

---

# 22. Responsive

Desktop ưu tiên.

Các kích thước:

```
≥1400

≥1200

≥992

≥768

≥576

<576
```

---

# 23. Dark Mode

Được hỗ trợ ngay từ kiến trúc.

Sử dụng:

```
data-theme="light"

data-theme="dark"
```

Không tạo CSS riêng cho Dark Mode.

---

# 24. Performance

Nguyên tắc:

- Lazy Load Monaco Editor.
- Lazy Load Chart.js.
- Cache Service Worker.
- SVG ưu tiên hơn PNG.
- CSS tối ưu.
- JavaScript chia module.

---

# 25. Accessibility

Đảm bảo:

- Keyboard Navigation.
- Focus Visible.
- ARIA Label.
- Semantic HTML.
- Contrast đạt chuẩn WCAG AA.

---

# 26. Bảo mật Frontend

Không lưu:

- Password.
- Firebase Secret.
- Admin Key.

Không tin tưởng dữ liệu từ Client.

---

# 27. Quy tắc đặt tên

HTML

```
kebab-case
```

Ví dụ

```
problem-detail.html
```

CSS

```
kebab-case
```

Class

```
.block__element--modifier
```

JavaScript

```
camelCase
```

Constant

```
UPPER_CASE
```

---

# 28. Quy trình hoạt động

```text
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

Page

↓

User
```

---

# 29. Mục tiêu cuối cùng

Frontend phải đạt:

- Lighthouse > 90.
- Responsive.
- Hiện đại.
- Dễ bảo trì.
- Dễ mở rộng.
- Không phụ thuộc Framework.

---

# 30. Kết luận

Kiến trúc Frontend này là tiêu chuẩn chính thức của dự án.

Mọi file HTML, CSS và JavaScript phải tuân thủ tài liệu này.

---

**Kết thúc tài liệu**

**Version:** 1.0.0

**Status:** Approved