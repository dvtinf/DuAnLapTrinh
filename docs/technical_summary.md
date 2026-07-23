# TECHNICAL SUMMARY FOR DEVELOPERS

## 1. Công nghệ lõi [23]
- **Frontend:** Native HTML/JS (ES2023), Bootstrap 5, Monaco Editor.
- **Backend:** Firebase (Auth, Firestore, Cloud Functions).
- **Judge:** Docker Sandbox + g++ compiler.

## 2. Quy tắc mở rộng [59, 60]
- Để thêm ngôn ngữ mới (Python, Java): Cập nhật `JudgeWorker` trong thư mục `judge-system` và thêm Image tương ứng vào Docker.
- Mọi thay đổi Database phải thông qua tệp `database/firestore.rules`.
- Tuân thủ nguyên tắc **Single Responsibility**: Mỗi tệp chỉ thực hiện một nhiệm vụ [3].