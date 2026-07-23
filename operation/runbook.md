# OPERATION RUNBOOK - C++ ONLINE JUDGE

## 1. Công việc hằng ngày (Daily Tasks) [41]
- [ ] Kiểm tra nhật ký lỗi (Error Logs) trên Firebase Console.
- [ ] Kiểm tra trạng thái các Worker trong Judge System.
- [ ] Giám sát tài nguyên CPU/RAM của máy chủ chấm bài.

## 2. Xử lý sự cố thường gặp (Troubleshooting) [47, 48]
### Website không truy cập được
1. Kiểm tra kết nối Internet của máy khách.
2. Kiểm tra trạng thái Firebase Hosting.
3. Kiểm tra SSL/TLS Certificate.

### Bài nộp bị treo trạng thái "Pending"
1. Kiểm tra hàng đợi chấm bài (Judge Queue).
2. Kiểm tra xem Docker Worker có đang chạy không.
3. Khởi động lại (Restart) Judge Worker nếu cần.

## 3. Quản lý người dùng
- Kiểm tra và khóa các tài khoản có hành vi gian lận hoặc tấn công hệ thống [49].