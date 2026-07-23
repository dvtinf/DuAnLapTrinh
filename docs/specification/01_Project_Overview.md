# C++ ONLINE JUDGE

**Software Design Specification (SDS)**

Version: **1.0.0**

Document: **01 - Project Overview**

Status: **Approved**

---

# 1. Giới thiệu

## 1.1 Mục tiêu

Xây dựng một hệ thống chấm bài lập trình trực tuyến (Online Judge) dành cho học sinh, giáo viên và nhà trường.

Website phải đáp ứng các yêu cầu sau:

- Giao diện hiện đại
- Dễ sử dụng
- Tốc độ tải nhanh
- Hoạt động ổn định
- Bảo mật cao
- Có khả năng mở rộng
- Miễn phí hoặc chi phí rất thấp
- Có thể triển khai nhanh

---

## 1.2 Đối tượng sử dụng

Hệ thống phục vụ ba nhóm người dùng.

### Học sinh

Có thể:

- Đăng ký tài khoản
- Đăng nhập
- Xem bài tập
- Nộp bài
- Xem kết quả
- Xem lịch sử nộp bài
- Xem bảng xếp hạng

---

### Giáo viên

Có thể:

- Quản lý bài tập
- Tạo testcase
- Theo dõi học sinh
- Xem thống kê
- Chấm lại bài
- Quản lý lớp học

---

### Quản trị viên

Có thể:

- Quản lý toàn bộ hệ thống
- Quản lý tài khoản
- Quản lý cơ sở dữ liệu
- Theo dõi hệ thống Judge
- Quản lý quyền
- Theo dõi nhật ký hoạt động

---

# 2. Mục tiêu kỹ thuật

Hệ thống phải đạt các tiêu chí sau.

## Hiệu năng

- Tải trang đầu dưới 2 giây
- Điều hướng dưới 300 ms
- Tối ưu Lighthouse trên 90
- Không tải tài nguyên dư thừa

---

## Giao diện

Phong cách:

- Hiện đại
- Phẳng (Flat Design)
- Tối giản
- Dễ nhìn
- Thân thiện

Màu sắc:

- Xanh dương làm màu chủ đạo
- Màu trung tính
- Không sử dụng màu quá chói

---

## Khả năng mở rộng

Trong tương lai hệ thống có thể bổ sung:

- Python
- Java
- Pascal
- C#
- JavaScript
- Go
- Rust

mà không cần thay đổi kiến trúc.

---

# 3. Kiến trúc tổng thể

Website được chia thành bốn tầng.

```
Presentation Layer

↓

Application Layer

↓

Service Layer

↓

Data Layer
```

---

## 3.1 Presentation Layer

Bao gồm:

- HTML
- CSS
- JavaScript

Chịu trách nhiệm:

- Giao diện
- Điều hướng
- Hiển thị dữ liệu
- Tương tác người dùng

---

## 3.2 Application Layer

Bao gồm:

- Router
- Components
- Pages

Chịu trách nhiệm:

- Điều phối
- Khởi tạo
- Render giao diện

---

## 3.3 Service Layer

Bao gồm:

- Firebase
- Authentication
- Firestore
- Judge API

Chịu trách nhiệm:

- Đọc dữ liệu
- Ghi dữ liệu
- Đăng nhập
- Nộp bài
- Lấy kết quả

---

## 3.4 Data Layer

Bao gồm:

- Firestore
- Storage
- Testcases

---

# 4. Kiến trúc Frontend

Frontend sử dụng:

- HTML5
- CSS3
- JavaScript ES Modules
- Bootstrap 5
- Bootstrap Icons

Không sử dụng:

- React
- Vue
- Angular

Mục tiêu:

- Nhẹ
- Dễ triển khai
- Không cần Build Tool

---

# 5. Kiến trúc Backend

Backend sử dụng:

- Firebase Authentication
- Firestore
- Cloud Functions
- Firebase Hosting

Judge hoạt động độc lập.

---

# 6. Kiến trúc Judge

Judge gồm các bước:

```
Upload Code

↓

Compile

↓

Execute

↓

Compare Output

↓

Calculate Score

↓

Save Result

↓

Return Result
```

---

# 7. Nguyên tắc thiết kế

Website tuân thủ các nguyên tắc.

## Đơn giản

Không có chức năng dư thừa.

---

## Nhất quán

Mọi trang có:

- cùng màu
- cùng khoảng cách
- cùng kiểu chữ
- cùng component

---

## Hiệu năng

Ưu tiên:

- Lazy Loading
- Cache
- Minify
- Compression

---

## Khả năng bảo trì

Một file chỉ thực hiện một nhiệm vụ.

Không tạo file quá lớn.

---

# 8. Yêu cầu bảo mật

Frontend:

- Không lưu khóa bí mật
- Không lưu mật khẩu
- Không tin tưởng dữ liệu người dùng

Backend:

- Xác thực người dùng
- Phân quyền
- Kiểm tra dữ liệu đầu vào
- Ghi nhật ký hoạt động

Judge:

- Chạy trong Sandbox
- Giới hạn CPU
- Giới hạn RAM
- Giới hạn thời gian
- Không truy cập Internet

---

# 9. Công nghệ sử dụng

| Thành phần | Công nghệ |
|------------|-----------|
| Frontend | HTML5 |
| CSS | CSS3 |
| JavaScript | ES2023 |
| UI | Bootstrap 5 |
| Icons | Bootstrap Icons |
| Authentication | Firebase |
| Database | Firestore |
| Storage | Firebase Storage |
| Backend | Cloud Functions |
| Hosting | Firebase Hosting |
| Judge | Docker + g++ |

---

# 10. Quy tắc phát triển

Trong toàn bộ dự án:

- Không thay đổi kiến trúc thư mục.
- Mỗi file chỉ có một nhiệm vụ.
- Không tạo CSS trùng chức năng.
- Không sử dụng thư viện không cần thiết.
- Mọi thay đổi phải tương thích ngược.
- Mọi file đều có thông tin phiên bản.

---

# 11. Mục tiêu cuối cùng

Sau khi hoàn thành, hệ thống phải đáp ứng:

- Website hoạt động ổn định.
- Giao diện hiện đại.
- Có thể phục vụ nhiều lớp học.
- Dễ mở rộng.
- Dễ bảo trì.
- Dễ triển khai.
- Có thể phát triển thành hệ thống Online Judge quy mô lớn.

---

**Kết thúc tài liệu**

**Version:** 1.0.0

**Status:** Approved
