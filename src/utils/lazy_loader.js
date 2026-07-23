/**
 * D:\DuAnLapTrinh\frontend\src\utils\lazy_loader.js
 * Tiện ích tải các thành phần nặng một cách bất đồng bộ
 */
export const lazyLoad = async (importFn) => {
    try {
        const module = await importFn();
        return module.default;
    } catch (error) {
        console.error("Lỗi khi tải thành phần:", error);
        throw error;
    }
};

// Hàm tải script bên ngoài (ví dụ: Monaco Editor từ CDN)
export const loadExternalScript = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
};