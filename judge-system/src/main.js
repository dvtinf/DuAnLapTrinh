/**
 * D:\DuAnLapTrinh\judge-system\src\main.js
 * Luồng tích hợp: Compile -> Execute -> Check (Phiên bản hoàn chỉnh)
 */
const Compiler = require('./compiler.js');
const Executor = require('./executor.js');
const Checker = require('./checker.js');

class JudgeMain {
    constructor() {
        this.compiler = new Compiler();
        this.executor = new Executor();
        this.checker = new Checker();
    }

    async processSubmission(submission) {
        console.log(`Bắt đầu chấm bài nộp ID: ${submission.id}`);

        // Bước 1: Biên dịch
        const compileResult = this.compiler.compile('temp/source.cpp', 'temp/solution.exe');
        if (!compileResult.success) {
            return { status: 'Compile Error', message: compileResult.message };
        }

        // Bước 2: Chạy các Test Case
        let totalScore = 0;
        const testResults = [];

        for (const test of submission.testCases) {
            const runResult = this.executor.execute('temp/solution.exe', test.input, submission.timeLimit);
            
            if (runResult.status !== 'success') {
                testResults.push({ status: runResult.status });
                continue;
            }

            // Bước 3: Kiểm tra đáp án
            const checkResult = this.checker.check(runResult.stdout, test.output);
            if (checkResult.status === 'Accepted') {
                totalScore += test.score;
            }
            testResults.push({ status: checkResult.status, runtime: runResult.runtime });
        }

        return {
            status: totalScore === 100 ? 'Accepted' : 'Partially Accepted',
            score: totalScore,
            details: testResults
        };
    }
}

module.exports = JudgeMain;