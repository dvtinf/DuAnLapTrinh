# 07. Judge System Specification

## 1. Tổng quan hệ thống Judge

Judge System là thành phần chịu trách nhiệm tự động biên dịch, thực thi và đánh giá chương trình C++ do người dùng gửi lên.

Trong hệ thống D:\DuAnLapTrinh, Judge System được thiết kế với mục tiêu:

- Chấm bài C++ tự động.
- Đảm bảo tính chính xác của kết quả.
- Kiểm soát tài nguyên khi chạy chương trình.
- Bảo vệ hệ thống khỏi mã nguồn độc hại.
- Có khả năng mở rộng trong tương lai.

Judge System hoạt động như một pipeline xử lý:

```
User Submission
        |
        v
Submission API
        |
        v
Judge Queue
        |
        v
Judge Engine
        |
        +----------------+
        |                |
        v                v
    Compile          Execute
        |                |
        +-------+--------+
                |
                v
          Result Analyzer
                |
                v
          Database Update
                |
                v
          Return Result
```

---

# 2. Vai trò của Judge System

Judge System thực hiện các nhiệm vụ chính:

## 2.1 Nhận bài gửi

Tiếp nhận:

- Mã nguồn C++.
- Thông tin bài toán.
- Người gửi.
- Phiên bản compiler.
- Cấu hình chấm.


Thông tin submission:

```json
{
    "submissionId": "SUB001",
    "problemId": "PRO001",
    "language": "cpp",
    "sourceFile": "main.cpp"
}
```

---

## 2.2 Biên dịch chương trình

Judge thực hiện:

- Kiểm tra source code.
- Tạo môi trường compile.
- Chạy compiler.
- Thu nhận lỗi biên dịch.


Compiler mặc định:

```
GNU G++
C++17 Standard
```

---

## 2.3 Thực thi chương trình

Sau khi compile thành công:

- Chương trình được chạy với từng test case.
- Input được cung cấp tự động.
- Output được ghi nhận.
- Kết quả được so sánh.


---

# 3. Judge Pipeline


## 3.1 Các trạng thái Submission


Một bài nộp đi qua các trạng thái:


```
PENDING

   |
   v

COMPILING

   |
   +------------+
   |            |
   v            v

COMPILE_ERROR   RUNNING


                 |
                 v

              CHECKING


                 |
        +--------+--------+
        |                 |
        v                 v

    ACCEPTED          WRONG_ANSWER

```


Các trạng thái bổ sung:

```
TIME_LIMIT_EXCEEDED

MEMORY_LIMIT_EXCEEDED

RUNTIME_ERROR

SYSTEM_ERROR
```

---

# 4. Compilation System


## 4.1 Compiler Environment


Môi trường biên dịch:

```
OS:
Linux

Compiler:
g++

Standard:
C++17
```


---

## 4.2 Compile Command


Ví dụ:


```bash
g++ main.cpp \
-std=c++17 \
-O2 \
-o program
```


Trong đó:


| Tham số | Ý nghĩa |
|---|---|
| -std=c++17 | Chuẩn C++ |
| -O2 | Tối ưu chương trình |
| -o | File thực thi |


---

## 4.3 Compile Result


Thành công:

```
COMPILE_SUCCESS
```


Thất bại:

```
COMPILE_ERROR
```


Thông tin lỗi được lưu:


```json
{
    "status":"COMPILE_ERROR",
    "message":"Compiler error message"
}
```

---

# 5. Execution Environment


## 5.1 Mục tiêu


Môi trường chạy phải đảm bảo:

- Không ảnh hưởng máy chủ.
- Không truy cập dữ liệu hệ thống.
- Không chạy vô hạn.
- Không tiêu thụ quá mức tài nguyên.


---

## 5.2 Resource Limit


Cấu hình giới hạn:


| Thành phần | Giá trị mặc định |
|-|-|
| CPU | giới hạn theo cấu hình server |
| RAM | giới hạn theo bài toán |
| Execution Time | giới hạn theo test |
| File Access | hạn chế |
| Network | Disable |


---

# 6. Test Case System


Mỗi bài toán gồm nhiều test case.


Cấu trúc:


```
Problem

 |
 +-- Test Case 01
 |
 +-- Test Case 02
 |
 +-- Test Case 03

```


Mỗi test case:


```json
{
    "input":"5",
    "expectedOutput":"25"
}
```


---

# 7. Output Checker


Output Checker chịu trách nhiệm:


- So sánh output của chương trình.
- Xác định đúng/sai.
- Hỗ trợ sai khác định dạng.


Các kiểu kiểm tra:


## Exact Match


So sánh tuyệt đối:


```
Expected:
10

Output:
10

=> Accepted
```


---

## Ignore Space


Cho phép:

- Khác khoảng trắng.
- Khác xuống dòng.


---

# 8. Scoring System


## 8.1 Full Score


Ví dụ:


```
Problem:
100 points

Test:
10 cases
```


Mỗi test:

```
10 points
```


---

## 8.2 Partial Score


Cho phép:


```
Passed:
8/10 tests

Score:
80
```


---

# 9. Judge Engine Architecture


Cấu trúc:


```
Judge Engine

 |
 +-- Compiler Module
 |
 +-- Runner Module
 |
 +-- Checker Module
 |
 +-- Score Module
 |
 +-- Result Module

```


---

# 10. Judge Database Records


Submission:


```json
{
    "id":"SUB001",
    "problem":"P001",
    "user":"USER001",
    "status":"ACCEPTED",
    "score":100
}
```


Execution Result:


```json
{
    "submissionId":"SUB001",
    "time":120,
    "memory":32,
    "result":"AC"
}
```


---

# 11. Error Handling


## Compile Error

```
CE
```


## Runtime Error

```
RE
```


## Time Limit Exceeded

```
TLE
```


## Memory Limit Exceeded

```
MLE
```


## Wrong Answer

```
WA
```


---

# 12. Security Considerations


Judge System phải:


- Không chạy source code trực tiếp trên server chính.
- Giới hạn quyền thực thi.
- Kiểm soát tài nguyên.
- Kiểm tra file truy cập.


Các biện pháp:

```
Sandbox Environment

Resource Limitation

Process Isolation

Permission Control
```

---

# 13. Logging System


Mỗi lần chấm lưu:


```json
{
    "submissionId":"SUB001",
    "compileTime":500,
    "runTime":1200,
    "memoryUsed":64,
    "status":"ACCEPTED"
}
```


Log phục vụ:

- Theo dõi lỗi.
- Phân tích hiệu năng.
- Cải thiện hệ thống.


---

# 14. Future Extension


Judge System có thể mở rộng:


- Hỗ trợ nhiều ngôn ngữ.
- Chấm song song.
- Sinh test tự động.
- AI hỗ trợ đánh giá code.
- Phân tích độ phức tạp thuật toán.


---

# 15. Kết luận


Judge System là lõi xử lý của website chấm C++.

Thiết kế hiện tại đảm bảo:

- Đơn giản.
- Dễ triển khai.
- An toàn.
- Có khả năng mở rộng.

Đây là nền tảng để phát triển các module:

- Security.
- Performance.
- Testing.
- Deployment.

---

# End of Document