/**
 * D:\DuAnLapTrinh\judge-system\src\checker.js
 * So sánh kết quả đầu ra
 */
class Checker {
    /**
     * So sánh tuyệt đối hoặc bỏ qua khoảng trắng dư thừa (Ignore Space)
     */
    check(userOutput, expectedOutput) {
        // Chuẩn hóa: loại bỏ khoảng trắng và xuống dòng ở đầu/cuối
        const cleanUser = userOutput.trim().replace(/\r?\n|\r/g, "\n");
        const cleanExpected = expectedOutput.trim().replace(/\r?\n|\r/g, "\n");

        if (cleanUser === cleanExpected) {
            return { status: 'Accepted', score: 100 };
        } else {
            return { status: 'Wrong Answer', score: 0 };
        }
    }
}

module.exports = Checker;