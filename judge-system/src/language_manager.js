/**
 * D:\DuAnLapTrinh\judge-system\src\language_manager.js
 * Quản lý các cấu hình biên dịch và thực thi đa ngôn ngữ
 */
export const LanguageConfig = {
    cpp: {
        compiler: 'g++',
        compileArgs: ['-std=c++17', '-O2'],
        extension: '.cpp',
        executable: './solution'
    },
    python: {
        compiler: null, // Python là ngôn ngữ thông dịch
        interpreter: 'python3',
        extension: '.py',
        executable: 'solution.py'
    },
    java: {
        compiler: 'javac',
        interpreter: 'java',
        extension: '.java',
        executable: 'Solution'
    }
};

export default class LanguageManager {
    getCommand(lang, sourceFile) {
        const config = LanguageConfig[lang];
        if (lang === 'python') return `${config.interpreter} ${sourceFile}`;
        if (lang === 'cpp') return config.executable;
        return '';
    }
}