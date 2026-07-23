/**
 * D:\DuAnLapTrinh\frontend\src\services\submission_service.js
 * Xử lý logic gửi bài và nhận kết quả chấm
 */
export default class SubmissionService {
    constructor(db) {
        this.db = db;
        this.collection = 'submissions';
    }

    // Gửi bài làm mới
    async submitCode(submissionData) {
        try {
            const docRef = await this.db.collection(this.collection).add(submissionData.toFirestore());
            return docRef.id;
        } catch (error) {
            console.error("Submission failed:", error);
            throw error;
        }
    }

    // Theo dõi trạng thái chấm bài thời gian thực
    subscribeToResult(submissionId, callback) {
        return this.db.collection(this.collection).doc(submissionId)
            .onSnapshot((doc) => {
                if (doc.exists) callback(doc.data());
            });
    }
}