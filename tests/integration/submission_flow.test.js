/**
 * D:\DuAnLapTrinh\tests\integration\submission_flow.test.js
 * Kiểm thử tích hợp luồng nộp bài và chấm bài hoàn chỉnh
 */
const JudgeMain = require('../../judge-system/src/main');
const mockData = {
    id: 'sub_001',
    sourceCode: '#include <iostream>\nint main() { int a, b; std::cin >> a >> b; std::cout << a + b; return 0; }',
    testCases: [{ input: '5 10', output: '15', score: 100 }],
    timeLimit: 1000
};

describe('Submission Flow Integration', () => {
    const judge = new JudgeMain();

    it('Luồng nộp bài phải trả về kết quả Accepted (AC) cho code đúng', async () => {
        const result = await judge.processSubmission(mockData);
        console.log("Kết quả chấm bài tích hợp:", result.status);
        
        assert.strictEqual(result.status, 'Accepted');
        assert.strictEqual(result.score, 100);
    });
});