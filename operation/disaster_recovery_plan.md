# DISASTER RECOVERY PLAN (DRP)

## 1. Mục tiêu khôi phục [50]
- **RTO (Thời gian khôi phục):** < 2 giờ.
- **RPO (Mức độ mất dữ liệu):** < 1 giờ.

## 2. Kịch bản khôi phục Database (Firestore) [51, 52]
1. Truy cập Firebase Console -> Google Cloud Storage.
2. Chọn bản sao lưu (Backup) gần nhất.
3. Sử dụng lệnh `gcloud firestore import` để khôi phục dữ liệu vào dự án mới.

## 3. Kịch bản khôi phục ứng dụng
1. Clone mã nguồn từ GitHub (Nhánh `main`).
2. Chạy Pipeline CI/CD để triển khai lại toàn bộ Frontend và Backend.