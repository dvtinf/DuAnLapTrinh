/**
 * D:\DuAnLapTrinh\tests\security\sandbox.test.js
 * Kiểm thử khả năng cô lập và bảo mật của Sandbox
 */
const Sandbox = require('../../judge-system/src/sandbox');
const assert = require('assert');

describe('Sandbox Security Test', () => {
    const sandbox = new Sandbox({ timeLimit: 1000 });

    it('Nên chặn mã nguồn cố gắng truy cập file hệ thống', () => {
        const maliciousCode = '#include <fstream>\nint main() { std::ofstream f("/etc/passwd"); return 0; }';
        const isSafe = sandbox.isSafe(maliciousCode);
        assert.strictEqual(isSafe, false);
    });

    it('Nên chặn mã nguồn cố gắng sử dụng lệnh hệ thống (system call)', () => {
        const maliciousCode = '#include <stdlib.h>\nint main() { system("rm -rf /"); return 0; }';
        const isSafe = sandbox.isSafe(maliciousCode);
        assert.strictEqual(isSafe, false);
    });
});