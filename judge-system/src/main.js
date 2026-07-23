/**
 * D:\DuAnLapTrinh\judge-system\src\main.js
 * Lõi điều phối chấm bài: Compile -> Execute -> Check
 */
const Compiler = require('./compiler.js');
const Executor = require('./executor.js');
const Checker = require('./checker.js');

class JudgeMain {
    async process(submissionId, sourceCode, testCases) {
        const compiler = new Compiler();
        const executor = new Executor();
        const checker = new Checker();

        // 1. Biên dịch [16]
        const compileRes = compiler.compile(sourceCode);
        if (!compileRes.success) return { status: 'Compile Error', message: compileRes.log };

        // 2. Thực thi & Kiểm tra [17, 18]
        let totalScore = 0;
        for (const test of testCases) {
            const runRes = executor.run(compileRes.exe, test.input);
            const checkRes = checker.compare(runRes.output, test.output);
            if (checkRes.correct) totalScore += test.score;
        }

        return { status: 'Finished', score: totalScore };
    }
}