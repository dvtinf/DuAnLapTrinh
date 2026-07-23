# C++ ONLINE JUDGE

**Software Design Specification (SDS)**

Version: **1.0.0**

Document: **04 - Database Design**

Status: **Approved**

---

# 1. Mục đích

Tài liệu này quy định cấu trúc cơ sở dữ liệu của hệ thống C++ Online Judge.

Hệ thống sử dụng **Cloud Firestore** làm cơ sở dữ liệu chính.

Mục tiêu:

- Tốc độ truy vấn cao
- Dễ mở rộng
- Dễ bảo trì
- Chi phí thấp
- Phù hợp với Firebase Hosting

---

# 2. Nguyên tắc thiết kế

Toàn bộ cơ sở dữ liệu phải tuân thủ các nguyên tắc sau:

- Không lưu dữ liệu trùng lặp nếu có thể tránh.
- Mỗi Collection chỉ quản lý một loại dữ liệu.
- Mỗi Document có khóa định danh duy nhất.
- Không lưu mật khẩu người dùng.
- Không lưu dữ liệu bí mật ở phía Client.
- Ưu tiên đọc nhanh hơn ghi.
- Hạn chế truy vấn nhiều tầng.

---

# 3. Danh sách Collection

Hệ thống sử dụng các Collection sau:

```
users
classes
problems
testcases
submissions
rankings
announcements
system_logs
settings
```

---

# 4. Collection users

Lưu thông tin người dùng.

Document ID

```
uid
```

Cấu trúc

```json
{
  "uid": "",
  "email": "",
  "displayName": "",
  "photoURL": "",
  "role": "student",
  "classId": "",
  "createdAt": "",
  "updatedAt": "",
  "status": "active"
}
```

Role

```
student

teacher

admin
```

Status

```
active

disabled
```

---

# 5. Collection classes

Lưu thông tin lớp học.

Document ID

```
classId
```

Cấu trúc

```json
{
  "classId": "",
  "className": "",
  "teacherId": "",
  "school": "",
  "createdAt": ""
}
```

---

# 6. Collection problems

Lưu danh sách bài tập.

Document ID

```
problemId
```

Cấu trúc

```json
{
  "problemId": "",
  "title": "",
  "slug": "",
  "difficulty": "easy",
  "timeLimit": 1000,
  "memoryLimit": 256,
  "inputDescription": "",
  "outputDescription": "",
  "statement": "",
  "sampleInput": "",
  "sampleOutput": "",
  "tags": [],
  "author": "",
  "createdAt": "",
  "updatedAt": "",
  "published": true
}
```

Difficulty

```
easy

medium

hard
```

---

# 7. Collection testcases

Lưu testcase.

Document ID

```
testcaseId
```

Cấu trúc

```json
{
  "problemId": "",
  "inputFile": "",
  "outputFile": "",
  "score": 10,
  "hidden": true
}
```

Lưu ý

- File Input và Output được lưu trong Firebase Storage.
- Firestore chỉ lưu đường dẫn.

---

# 8. Collection submissions

Lưu toàn bộ bài nộp.

Document ID

```
submissionId
```

Cấu trúc

```json
{
  "submissionId": "",
  "userId": "",
  "problemId": "",
  "language": "cpp17",
  "sourceCode": "",
  "status": "Pending",
  "score": 0,
  "runtime": 0,
  "memory": 0,
  "createdAt": "",
  "judgedAt": ""
}
```

Status

```
Pending

Running

Accepted

Wrong Answer

Compile Error

Runtime Error

Time Limit Exceeded

Memory Limit Exceeded

Presentation Error

System Error
```

---

# 9. Collection rankings

Lưu bảng xếp hạng.

Document ID

```
userId
```

Cấu trúc

```json
{
  "userId": "",
  "displayName": "",
  "classId": "",
  "totalSolved": 0,
  "totalScore": 0,
  "lastSubmission": ""
}
```

---

# 10. Collection announcements

Lưu thông báo.

```json
{
  "title": "",
  "content": "",
  "createdBy": "",
  "createdAt": "",
  "published": true
}
```

---

# 11. Collection system_logs

Lưu nhật ký hệ thống.

```json
{
  "userId": "",
  "action": "",
  "ip": "",
  "createdAt": ""
}
```

---

# 12. Collection settings

Lưu cấu hình hệ thống.

Ví dụ

```json
{
  "judgeEnabled": true,
  "maintenance": false,
  "maxUploadSize": 65536
}
```

---

# 13. Quan hệ dữ liệu

```
User
 │
 ├────────────┐
 │            │
 ▼            ▼
Class     Submission
                 │
                 ▼
             Problem
                 │
                 ▼
             Testcase
```

---

# 14. Chỉ mục (Indexes)

Các trường nên tạo Composite Index:

```
submissions

userId + createdAt
```

```
submissions

problemId + createdAt
```

```
problems

published + difficulty
```

```
rankings

classId + totalScore
```

---

# 15. Quy tắc đặt tên

Collection

```
chữ thường

số nhiều
```

Ví dụ

```
users

problems

submissions
```

Field

```
camelCase
```

Ví dụ

```
displayName

createdAt

timeLimit
```

---

# 16. Quy tắc Timestamp

Toàn bộ thời gian sử dụng

```
Firebase Timestamp
```

Không lưu chuỗi ngày giờ tự tạo.

---

# 17. Quy tắc xóa dữ liệu

Không xóa cứng nếu không cần thiết.

Ưu tiên:

```
status

deleted

published
```

để đánh dấu trạng thái.

---

# 18. Bảo mật dữ liệu

Student

Có thể:

- Đọc bài tập
- Đọc kết quả của chính mình
- Gửi bài

Không thể:

- Xem testcase ẩn
- Xem bài nộp người khác
- Thay đổi dữ liệu

Teacher

Có thể:

- Quản lý bài tập
- Quản lý lớp
- Xem kết quả lớp mình

Admin

Toàn quyền.

---

# 19. Khả năng mở rộng

Có thể bổ sung:

- contests
- organizations
- courses
- achievements
- discussions
- notifications

mà không thay đổi cấu trúc hiện tại.

---

# 20. Kết luận

Cấu trúc cơ sở dữ liệu trên là chuẩn chính thức của dự án.

Mọi Service và Cloud Function phải tuân thủ tài liệu này.

---

**Kết thúc tài liệu**

**Version:** 1.0.0

**Status:** Approved