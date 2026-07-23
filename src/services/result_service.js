/**
 * D:\DuAnLapTrinh\frontend\src\services\result_service.js
 * Lấy dữ liệu kết quả chấm từ Database
 */
export default class ResultService {
    constructor(db) {
        this.db = db;
        this.collection = 'results';
    }

    // Lấy kết quả dựa trên ID của bài nộp (submissionId)
    async getResultBySubmissionId(submissionId) {
        try {
            const query = this.db.collection(this.collection)
                               .where('submission_id', '==', submissionId)
                               .limit(1);
            const snapshot = await query.get();
            
            if (snapshot.empty) return null;
            return { id: snapshot.docs.id, ...snapshot.docs.data() };
        } catch (error) {
            console.error("Error fetching result:", error);
            throw error;
        }
    }
}