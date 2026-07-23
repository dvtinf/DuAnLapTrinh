/**
 * D:\DuAnLapTrinh\frontend\src\services\ai_service.js
 * Tầng giao tiếp với AI để hỗ trợ học tập
 */
export default class AIService {
    /**
     * Gửi mã nguồn bị lỗi và nhận gợi ý sửa từ AI
     * @param {string} sourceCode - Mã nguồn học sinh nộp
     * @param {string} errorLog - Thông báo lỗi từ Compiler/Judge
     */
    async getFixSuggestion(sourceCode, errorLog) {
        try {
            console.log("AI đang phân tích mã nguồn...");
            // Trong thực tế, đoạn này sẽ gọi đến API của OpenAI/Gemini
            // hoặc mô hình AI nội bộ đã được huấn luyện cho C++.
            return {
                suggestion: "Bạn quên dấu chấm phẩy ở dòng 5",
                explanation: "Trong C++, mọi câu lệnh kết thúc phải có dấu ;"
            };
        } catch (error) {
            console.error("AI Assistant Error:", error);
            return null;
        }
    }
}