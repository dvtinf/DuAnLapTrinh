/**
 * D:\DuAnLapTrinh\frontend\src\services\auth_service.js
 * Xử lý logic đăng nhập, đăng ký và quản lý phiên
 */
import UserModel from '../models/user_model.js';

export default class AuthService {
    constructor(firebaseApp) {
        this.auth = firebaseApp.auth();
        this.db = firebaseApp.firestore();
    }

    // Đăng nhập bằng Email và Mật khẩu
    async login(email, password) {
        try {
            const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            return userCredential.user;
        } catch (error) {
            console.error("Login Error:", error.code, error.message);
            throw error;
        }
    }

    // Đăng xuất
    async logout() {
        await this.auth.signOut();
        window.location.href = '/login';
    }

    // Kiểm tra quyền của người dùng hiện tại
    async getCurrentUserRole(uid) {
        const doc = await this.db.collection('users').doc(uid).get();
        if (doc.exists) {
            return doc.data().role;
        }
        return 'student';
    }
}