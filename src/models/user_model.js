/**
 * D:\DuAnLapTrinh\frontend\src\models\user_model.js
 * Định nghĩa cấu trúc đối tượng người dùng
 */
export default class UserModel {
    constructor(data = {}) {
        this.uid = data.uid || "";
        this.username = data.username || "";
        this.email = data.email || "";
        this.displayName = data.displayName || "";
        this.role = data.role || "student"; // student, teacher, admin
        this.status = data.status || "active";
        this.createdAt = data.createdAt || new Date().toISOString();
    }

    // Chuyển đổi dữ liệu để lưu vào Firestore
    toFirestore() {
        return {
            username: this.username,
            email: this.email,
            displayName: this.displayName,
            role: this.role,
            status: this.status,
            createdAt: this.createdAt
        };
    }
}