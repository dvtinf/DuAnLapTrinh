/**
 * D:\DuAnLapTrinh\tests\unit\compiler.test.js
 * Kiểm thử đơn vị cho module biên dịch C++
 */
const Compiler = require('../../judge-system/src/compiler');
const assert = require('assert');

describe('Compiler Module Test', () => {
    const compiler = new Compiler();

    it('Nên biên dịch thành công mã nguồn C++ hợp lệ', () => {
        const source = '#include <iostream>\nint main() { return 0; }';
        const result = compiler.compile(source, 'temp/test_success.exe');
        assert.strictEqual(result.success, true);
    });

    it('Nên trả về lỗi biên dịch (CE) khi mã nguồn sai cú pháp', () => {
        const source = 'int main() { std::cout << "Hello" }'; // Thiếu ;
        const result = compiler.compile(source, 'temp/test_fail.exe');
        assert.strictEqual(result.success, false);
        assert.ok(result.message.includes('error'));
    });
});