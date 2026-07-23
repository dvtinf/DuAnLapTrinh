# API SPECIFICATION V1.0.0

## 1. Quy chuẩn chung
- **Base URL:** `https://api.cppjudge.com/v1` [3].
- **Định dạng dữ liệu:** JSON [3].
- **Xác thực:** JWT Token (Access Token & Refresh Token) [1, 4].
- **Phân trang:** Sử dụng tham số `page` và `limit` [5, 6].

## 2. Các Module API chi tiết

### 2.1 Module Authentication [1, 4, 7-14]
- **Register:** `POST /auth/register` - Tạo tài khoản (Yêu cầu: username duy nhất, email đúng định dạng) [7].
- **Login:** `POST /auth/login` - Cấp JWT Token [8].
- **Refresh Token:** `POST /auth/refresh` - Cấp access token mới khi hết hạn [9].
- **Logout:** `POST /auth/logout` [10].

### 2.2 Module User [15-25]
- **Get Profile:** `GET /users/me` - Lấy thông tin người dùng hiện tại [16].
- **Update Profile:** `PUT /users/me` - Cập nhật thông tin cá nhân [18].
- **Statistics:** `GET /users/me/stats` - Lấy thống kê học tập (số bài đã giải, tỷ lệ đúng) [20].
- **Admin Management:** `GET /admin/users` (Chỉ ADMIN) - Quản lý toàn bộ người dùng [21].

### 2.3 Module Problem [6, 26-36]
- **List Problems:** `GET /problems` - Hỗ trợ lọc theo `difficulty` và `keyword` [6].
- **Problem Detail:** `GET /problems/:id_or_slug` [6, 28].
- **Manage Test Cases:** `GET /admin/problems/:id/testcases` (Chỉ TEACHER/ADMIN) [31].

### 2.4 Module Submission & Judge [37-58]
- **Submit Code:** `POST /submissions` - Nhận mã nguồn và đẩy vào Judge Queue [39, 43].
- **Status Check:** `GET /submissions/:id/status` - Theo dõi trạng thái thời gian thực [40].
- **Internal Judge API:** `POST /judge/jobs` - Backend tạo tác vụ chấm cho Judge Worker [50].

## 3. Bảng mã lỗi hệ thống (Error Codes)
| Mã lỗi | Ý nghĩa |
| :--- | :--- |
| **AUTH001** | Thông tin đăng nhập không hợp lệ [5, 12] |
| **USER001** | Không tìm thấy người dùng [5, 24] |
| **PROB001** | Không tìm thấy bài tập [5, 34] |
| **SUB001** | Lỗi nộp bài hoặc hàng đợi quá tải [5, 45] |
| **JUDGE001** | Lỗi hệ thống chấm bài (Worker không sẵn sàng) [56] |

## 4. Ma trận phân quyền (Permission Matrix)
| Chức năng | STUDENT | TEACHER | ADMIN |
| :--- | :---: | :---: | :---: |
| Nộp bài & Xem kết quả | ✓ | ✓ | ✓ |
| Tạo & Sửa bài tập | ✗ | ✓ | ✓ |
| Quản lý Test Case ẩn | ✗ | ✓ | ✓ |
| Khóa tài khoản & Đổi quyền | ✗ | ✗ | ✓ |
*(Nguồn: [23, 33, 59-63])*