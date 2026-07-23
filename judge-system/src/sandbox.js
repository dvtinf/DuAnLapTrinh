/**
 * D:\DuAnLapTrinh\judge-system\src\sandbox.js
 * Quản lý giới hạn tài nguyên và bảo mật thực thi
 */
class Sandbox {
    constructor(config = { timeLimit: 1000, memoryLimit: 256 }) {
        this.timeLimit = config.timeLimit; // ms
        this.memoryLimit = config.memoryLimit; // MB
    }

    /**
     * Tạo lệnh chạy an toàn với giới hạn tài nguyên
     * @param {string} exePath - Đường dẫn file thực thi
     */
    getSafeCommand(exePath) {
        // Sử dụng lệnh 'timeout' của Linux để giới hạn thời gian thực thi
        // Giới hạn bộ nhớ sẽ được cấu hình qua Docker --memory
        return `timeout ${this.timeLimit / 1000}s ./${exePath}`;
    }

    /**
     * Kiểm tra các hành vi nguy hiểm trong mã nguồn (Static Analysis)
     * @param {string} sourceCode 
     */
    isSafe(sourceCode) {
        const dangerousKeywords = ['system(', 'fork()', 'socket(', 'file('];
        for (const word of dangerousKeywords) {
            if (sourceCode.includes(word)) return false;
        }
        return true;
    }
}

module.exports = Sandbox;