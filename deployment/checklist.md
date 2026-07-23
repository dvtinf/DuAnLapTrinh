# DEPLOYMENT CHECKLIST - C++ ONLINE JUDGE

## 1. Cơ sở hạ tầng (Infrastructure)
- [ ] Firebase Hosting đã được kích hoạt.
- [ ] Cloud Functions đã được triển khai (Node.js 22).
- [ ] GitHub Secrets (`FIREBASE_SERVICE_ACCOUNT`) đã được thiết lập.

## 2. Bảo mật (Security)
- [ ] HTTPS đã được bật (Mặc định bởi Firebase) [20].
- [ ] Firestore Rules đã được cập nhật để bảo vệ test case [21, 22].
- [ ] Sandbox Docker đã được ngắt kết nối Internet [23, 24].

## 3. Hiệu năng (Performance)
- [ ] Lighthouse score đạt trên 90 điểm.
- [ ] Service Worker đang hoạt động bình thường [4].
- [ ] Mọi tài nguyên tĩnh đều được nén (Gzip/Brotli).

## 4. Chức năng (Functionality)
- [ ] Luồng: Nộp bài -> Chấm -> Trả kết quả hoạt động tốt.
- [ ] Bảng xếp hạng cập nhật thời gian thực.
- [ ] Admin/Giáo viên có thể tạo bài tập mới.