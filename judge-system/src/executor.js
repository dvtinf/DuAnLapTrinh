/**
 * D:\DuAnLapTrinh\judge-system\src\executor.js
 * Chạy chương trình trong môi trường kiểm soát (Sandbox)
 */
const { execSync } = require('child_process');

class Executor {
    /**
     * Thực thi file đã biên dịch
     * @param {string} exePath - Đường dẫn file thực thi
     * @param {string} inputData - Dữ liệu đầu vào (stdin)
     * @param {number} timeLimit - Giới hạn thời gian (ms)
     */
    execute(exePath, inputData, timeLimit = 1000) {
        try {
            // Chạy chương trình với timeout và cấp dữ liệu qua stdin
            const start = Date.now();
            const output = execSync(exePath, {
                input: inputData,
                timeout: timeLimit,
                maxBuffer: 1024 * 1024 * 64, // 64MB Buffer
                stdio: ['pipe', 'pipe', 'pipe']
            });
            const end = Date.now();

            return {
                status: 'success',
                stdout: output.toString(),
                runtime: end - start
            };
        } catch (error) {
            if (error.code === 'ETIMEDOUT') return { status: 'TLE', message: 'Time Limit Exceeded' };
            return { status: 'RE', message: 'Runtime Error' };
        }
    }
}

module.exports = Executor;