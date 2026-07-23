# C++ ONLINE JUDGE

**Software Design Specification (SDS)**

Version: **1.0.0**

Document: **03 - Design System**

Status: **Approved**

---

# 1. Mục đích

Tài liệu này quy định toàn bộ tiêu chuẩn giao diện của hệ thống.

Mọi file CSS và Component của dự án phải tuân thủ tài liệu này.

Sau khi tài liệu được phê duyệt:

- Không thay đổi hệ màu.
- Không thay đổi Typography.
- Không thay đổi khoảng cách.
- Không thay đổi Component Rules.

---

# 2. Triết lý thiết kế

Website hướng đến các tiêu chí:

- Hiện đại
- Đơn giản
- Dễ sử dụng
- Đồng nhất
- Chuyên nghiệp
- Tốc độ cao
- Dễ mở rộng

Thiết kế lấy cảm hứng từ:

- LeetCode
- HackerRank
- GitHub
- VS Code
- Bootstrap 5

Không sử dụng hiệu ứng rườm rà.

---

# 3. Màu sắc

## 3.1 Primary

| Token | Giá trị |
|--------|----------|
| Primary | #2563EB |
| Primary Hover | #1D4ED8 |
| Primary Active | #1E40AF |

---

## 3.2 Success

| Token | Giá trị |
|--------|----------|
| Success | #16A34A |
| Success Light | #DCFCE7 |

---

## 3.3 Warning

| Token | Giá trị |
|--------|----------|
| Warning | #F59E0B |
| Warning Light | #FEF3C7 |

---

## 3.4 Danger

| Token | Giá trị |
|--------|----------|
| Danger | #DC2626 |
| Danger Light | #FEE2E2 |

---

## 3.5 Info

| Token | Giá trị |
|--------|----------|
| Info | #0891B2 |
| Info Light | #CFFAFE |

---

## 3.6 Gray Scale

| Token | Giá trị |
|--------|----------|
| Gray 50 | #F8FAFC |
| Gray 100 | #F1F5F9 |
| Gray 200 | #E2E8F0 |
| Gray 300 | #CBD5E1 |
| Gray 400 | #94A3B8 |
| Gray 500 | #64748B |
| Gray 600 | #475569 |
| Gray 700 | #334155 |
| Gray 800 | #1E293B |
| Gray 900 | #0F172A |

---

## 3.7 Background

| Token | Giá trị |
|--------|----------|
| Body | #F8FAFC |
| Surface | #FFFFFF |
| Sidebar | #FFFFFF |
| Navbar | #FFFFFF |
| Card | #FFFFFF |

---

# 4. Typography

Font chính:

```
Inter,
Segoe UI,
Roboto,
Arial,
sans-serif
```

Không sử dụng nhiều font.

---

## Font Weight

| Weight | Giá trị |
|----------|----------|
| Light | 300 |
| Regular | 400 |
| Medium | 500 |
| SemiBold | 600 |
| Bold | 700 |

---

## Font Size

| Thành phần | Size |
|------------|------|
| H1 | 40px |
| H2 | 32px |
| H3 | 28px |
| H4 | 24px |
| H5 | 20px |
| H6 | 18px |
| Body Large | 18px |
| Body | 16px |
| Small | 14px |
| Caption | 12px |

---

## Line Height

| Thành phần | Giá trị |
|------------|----------|
| Heading | 1.3 |
| Body | 1.6 |

---

# 5. Khoảng cách

Hệ thống khoảng cách sử dụng bội số của 4.

| Token | Giá trị |
|---------|----------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| xxl | 48px |
| xxxl | 64px |

Không sử dụng khoảng cách ngoài hệ thống này nếu không có lý do đặc biệt.

---

# 6. Border Radius

| Token | Giá trị |
|---------|----------|
| Small | 6px |
| Medium | 10px |
| Large | 16px |
| Pill | 999px |

---

# 7. Shadow

## Small

```
0 1px 3px rgba(0,0,0,.08)
```

---

## Medium

```
0 6px 16px rgba(0,0,0,.12)
```

---

## Large

```
0 16px 40px rgba(0,0,0,.18)
```

---

# 8. Border

Tiêu chuẩn:

```
1px solid #E2E8F0
```

Không dùng viền dày.

---

# 9. Animation

Thời gian chuẩn.

| Thành phần | Giá trị |
|------------|----------|
| Fast | 150ms |
| Normal | 250ms |
| Slow | 400ms |

Timing Function

```
ease
```

Không sử dụng animation kéo dài quá 500ms.

---

# 10. Responsive

Bootstrap 5 Breakpoints.

| Thiết bị | Width |
|-----------|---------|
| xs | <576 |
| sm | ≥576 |
| md | ≥768 |
| lg | ≥992 |
| xl | ≥1200 |
| xxl | ≥1400 |

---

# 11. Sidebar

Desktop

```
280px
```

Tablet

```
240px
```

Mobile

```
Ẩn
```

---

# 12. Navbar

Chiều cao

```
64px
```

Luôn cố định phía trên.

---

# 13. Footer

Chiều cao tối thiểu

```
60px
```

---

# 14. Card

Đặc điểm

- Nền trắng
- Radius Medium
- Shadow Small
- Padding 24px

---

# 15. Button

Chiều cao

```
40px
```

Padding

```
12px 20px
```

Radius

```
Medium
```

Có các trạng thái:

- Default
- Hover
- Active
- Disabled
- Loading

---

# 16. Form

Input chuẩn.

Chiều cao

```
40px
```

Border

```
1px
```

Radius

```
Medium
```

Focus sử dụng màu Primary.

---

# 17. Table

Header:

- Bold
- Gray 100

Body:

- White

Hover:

- Gray 50

---

# 18. Modal

Radius

```
Large
```

Animation

```
Fade + Scale
```

---

# 19. Toast

Xuất hiện

```
Top Right
```

Thời gian

```
3000ms
```

---

# 20. Icon

Sử dụng

```
Bootstrap Icons
```

Kích thước chuẩn

```
16
20
24
32
```

---

# 21. Coding Rules

Không khai báo màu trực tiếp trong component.

Ví dụ:

Sai

```css
color:#2563EB;
```

Đúng

```css
color:var(--primary);
```

---

Không khai báo khoảng cách trực tiếp.

Sai

```css
padding:17px;
```

Đúng

```css
padding:var(--space-md);
```

---

# 22. Accessibility

Đảm bảo:

- Contrast đạt WCAG AA.
- Điều hướng bằng bàn phím.
- Focus rõ ràng.
- Không dùng màu làm tín hiệu duy nhất.
- Có aria-label khi cần.

---

# 23. Hiệu năng

- Không dùng ảnh quá lớn.
- SVG ưu tiên hơn PNG.
- Font tải cục bộ.
- CSS chia module.
- JavaScript ES Module.
- Lazy Loading khi phù hợp.

---

# 24. Kết luận

Tài liệu này là tiêu chuẩn giao diện chính thức của dự án.

Tất cả các file CSS, HTML và JavaScript phải tuân thủ các quy tắc trong tài liệu này.

---

**Kết thúc tài liệu**

**Version:** 1.0.0

**Status:** Approved