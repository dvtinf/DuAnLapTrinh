export default class SubmissionService {
    constructor(db) {
        this.db = db; // Kết nối Firestore [10]
        this.collection = 'submissions';
    }

    async submitCode(problemId, userId, sourceCode) {
        try {
            const submission = {
                user_id: userId,
                problem_id: problemId,
                source_code: sourceCode,
                language: 'cpp',
                status: 'pending', // Trạng thái chờ chấm [12]
                created_at: new Date()
            };
            const docRef = await this.db.collection(this.collection).add(submission);
            return docRef.id;
        } catch (error) {
            console.error("Submission failed:", error);
            throw error;
        }
    }
}