# C++ ONLINE JUDGE

**Software Design Specification (SDS)**

Version: **1.0.0**

Document: **06 - Backend Architecture**

Status: **Approved**

---

# 1. Mục đích

Tài liệu này quy định kiến trúc Backend của hệ thống C++ Online Judge.

Backend chịu trách nhiệm:

- Xác thực người dùng
- Quản lý dữ liệu
- Giao tiếp với Judge
- Quản lý lưu trữ
- Ghi nhật ký hệ thống
- Thực thi các nghiệp vụ

Frontend không được truy cập trực tiếp vào dữ liệu nhạy cảm hoặc hệ thống Judge.

---

# 2. Công nghệ sử dụng

| Thành phần | Công nghệ |
|------------|-----------|
| Authentication | Firebase Authentication |
| Database | Cloud Firestore |
| Storage | Firebase Storage |
| Backend API | Firebase Cloud Functions |
| Hosting | Firebase Hosting |
| Runtime | Node.js 22 LTS |
| Judge | Docker Sandbox |

---

# 3. Kiến trúc Backend

```text
Browser
    │
    ▼
Firebase Hosting
    │
    ▼
Cloud Functions
    │
    ├──────────────┐
    ▼              ▼
Firestore      Firebase Storage
    │
    ▼
Judge Service
```

---

# 4. Cloud Functions

Cloud Functions chỉ thực hiện:

- Kiểm tra quyền truy cập.
- Kiểm tra dữ liệu đầu vào.
- Gọi Judge.
- Ghi dữ liệu.
- Trả kết quả.

Cloud Functions không render HTML.

---

# 5. Chức năng chính

Backend gồm các nhóm chức năng:

```
Authentication

Users

Classes

Problems

Testcases

Submissions

Rankings

Announcements

Logs

Settings
```

---

# 6. Authentication

Sử dụng Firebase Authentication.

Các phương thức hỗ trợ:

- Email/Password
- Google Sign-In

Mỗi người dùng có UID duy nhất.

---

# 7. Firestore

Cloud Functions là tầng duy nhất ghi dữ liệu quan trọng.

Frontend chỉ được phép ghi các dữ liệu đã được cho phép theo Security Rules.

---

# 8. Firebase Storage

Storage lưu:

```
Testcase Input

Testcase Output

Avatar

Tài liệu đính kèm
```

Không lưu:

- File thực thi.
- File tạm của Judge.

---

# 9. Judge Service

Judge là dịch vụ độc lập.

Cloud Functions gửi yêu cầu theo luồng:

```text
Submission

↓

Judge Queue

↓

Compile

↓

Execute

↓

Compare

↓

Score

↓

Firestore
```

---

# 10. API Logic

Mỗi API chỉ thực hiện một nhiệm vụ.

Ví dụ:

```
createProblem()

updateProblem()

deleteProblem()

submitSolution()

getSubmission()

getRanking()
```

Không viết API đa chức năng.

---

# 11. Validation

Mọi dữ liệu gửi lên Backend phải kiểm tra:

- Kiểu dữ liệu.
- Giá trị bắt buộc.
- Độ dài.
- Quyền truy cập.
- Trạng thái tài khoản.

Nếu không hợp lệ:

```
HTTP 400
```

---

# 12. Authentication Flow

```text
User

↓

Firebase Authentication

↓

ID Token

↓

Cloud Functions

↓

Verify Token

↓

Execute Request

↓

Return Response
```

Không tin tưởng dữ liệu do Client tự gửi.

---

# 13. Authorization

Ba nhóm quyền:

```
Student

Teacher

Admin
```

Student:

- Nộp bài.
- Xem kết quả của mình.

Teacher:

- Quản lý bài tập.
- Quản lý lớp.
- Xem thống kê lớp.

Admin:

- Toàn quyền.

---

# 14. Error Handling

Các mã lỗi chuẩn:

| Mã | Ý nghĩa |
|-----|----------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

Không trả Stack Trace cho Client.

---

# 15. Logging

Mọi thao tác quan trọng phải ghi log.

Ví dụ:

- Đăng nhập.
- Đăng xuất.
- Tạo bài tập.
- Chỉnh sửa bài tập.
- Nộp bài.
- Xóa dữ liệu.
- Thay đổi quyền.

---

# 16. Queue

Judge sử dụng hàng đợi.

```text
Submission

↓

Queue

↓

Worker

↓

Judge

↓

Result
```

Không thực hiện đồng thời trên Frontend.

---

# 17. Retry

Nếu Judge lỗi:

```
Retry tối đa 3 lần
```

Nếu vẫn lỗi:

```
System Error
```

---

# 18. Timeout

Cloud Functions:

```
≤ 60 giây
```

Judge:

Theo Time Limit của bài.

---

# 19. Rate Limiting

Giới hạn:

Student

```
20 submission / phút
```

Teacher

```
100 request / phút
```

Admin

```
Không giới hạn
```

---

# 20. Security

Backend phải:

- Xác thực Token.
- Kiểm tra Role.
- Kiểm tra dữ liệu.
- Chống Injection.
- Chống Spam.
- Chống Replay Request.

---

# 21. Backup

Firestore:

- Sao lưu định kỳ.

Storage:

- Sao lưu theo lịch.

Không sao lưu dữ liệu tạm.

---

# 22. Monitoring

Theo dõi:

- CPU.
- Memory.
- Response Time.
- Error Rate.
- Judge Queue.
- Active Users.

---

# 23. Khả năng mở rộng

Có thể bổ sung:

- Contest.
- API công khai.
- Nhiều Judge Server.
- Nhiều Region.
- Notification Service.

Không thay đổi kiến trúc.

---

# 24. Quy tắc phát triển

Mỗi Function:

- Một nhiệm vụ.
- Dễ kiểm thử.
- Không phụ thuộc vòng.
- Có xử lý ngoại lệ.

---

# 25. Kết luận

Kiến trúc Backend này là tiêu chuẩn chính thức của dự án.

Mọi Cloud Functions và dịch vụ Backend phải tuân thủ tài liệu này.

---

**Kết thúc tài liệu**

**Version:** 1.0.0

**Status:** Approved