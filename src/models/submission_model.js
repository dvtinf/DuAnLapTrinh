/**
 * D:\DuAnLapTrinh\frontend\src\models\submission_model.js
 * Định nghĩa cấu trúc dữ liệu bài nộp
 */
export default class SubmissionModel {
    constructor(data = {}) {
        this.id = data.id || "";
        this.userId = data.userId || "";
        this.problemId = data.problemId || "";
        this.language = data.language || "cpp";
        this.sourceCode = data.sourceCode || "";
        this.status = data.status || "pending"; // pending, compiling, running, finished
        this.score = data.score || 0;
        this.executionTime = data.executionTime || 0;
        this.memoryUsed = data.memoryUsed || 0;
        this.createdAt = data.createdAt || new Date().toISOString();
    }

    toFirestore() {
        return {
            userId: this.userId,
            problemId: this.problemId,
            language: this.language,
            sourceCode: this.sourceCode,
            status: this.status,
            score: this.score,
            createdAt: this.createdAt
        };
    }
}