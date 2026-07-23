/**
 * D:\DuAnLapTrinh\judge-system\src\compiler.js
 * Chịu trách nhiệm biên dịch mã nguồn C++
 */
const { execSync } = require('child_process');
const fs = require('fs');

class Compiler {
    /**
     * Biên dịch tệp nguồn C++
     * @param {string} sourcePath - Đường dẫn tới file .cpp
     * @param {string} outputPath - Đường dẫn file thực thi đầu ra
     */
    compile(sourcePath, outputPath) {
        try {
            // Lệnh biên dịch chuẩn: g++ -std=c++17 -O2 -o [output] [source]
            const command = `g++ -std=c++17 -O2 -o ${outputPath} ${sourcePath}`;
            execSync(command, { stdio: 'pipe' });
            return { success: true, message: "Compilation Successful" };
        } catch (error) {
            // Trả về thông báo lỗi biên dịch (Compile Error)
            return { 
                success: false, 
                message: error.stderr ? error.stderr.toString() : "Unknown Compilation Error" 
            };
        }
    }
}

module.exports = Compiler;