# 11. Testing Specification

## 1. Tổng quan kiểm thử hệ thống

Testing Specification định nghĩa chiến lược, quy trình và tiêu chuẩn kiểm thử cho toàn bộ hệ thống website chấm C++ D:\DuAnLapTrinh.

Mục tiêu:

- Đảm bảo hệ thống hoạt động đúng yêu cầu.
- Phát hiện lỗi trước khi triển khai.
- Đảm bảo tính ổn định.
- Đảm bảo an toàn cho người dùng và hệ thống Judge.
- Duy trì chất lượng trong quá trình phát triển.


Phạm vi kiểm thử:

```
Frontend

Backend API

Database

Judge System

Security

Performance

Deployment
```

---

# 2. Testing Strategy


Quy trình kiểm thử:


```
Development

      |
      v

Unit Testing

      |
      v

Integration Testing

      |
      v

System Testing

      |
      v

Performance Testing

      |
      v

Release Testing

```


---

# 3. Testing Levels


## 3.1 Unit Testing


Unit Test kiểm tra từng thành phần nhỏ.


Phạm vi:


Frontend:

- Component.
- Function.
- State.


Backend:

- Service.
- Utility.
- Business Logic.


Judge:

- Compiler module.
- Checker module.
- Score calculator.


Ví dụ:


```cpp
TEST(CalculateScore)
{
    assert(score == 100);
}
```


---

# 4. Frontend Testing


## 4.1 Component Testing


Kiểm tra:


- Component render đúng.
- Event hoạt động.
- State cập nhật chính xác.


Ví dụ:


```
ProblemCard

Input:
Problem Data

Expected:
Display Correct Information

```


---

## 4.2 UI Testing


Kiểm tra:


- Layout.
- Responsive.
- Browser compatibility.


Các trình duyệt:


```
Chrome

Edge

Firefox

Safari
```


---

## 4.3 User Flow Testing


Kiểm tra luồng:


```
Login

    |

Select Problem

    |

Write Code

    |

Submit

    |

View Result
```


---

# 5. Backend Testing


## 5.1 API Testing


Kiểm tra:


- Request.
- Response.
- Authentication.
- Authorization.


Ví dụ:


Request:


```
POST /api/submissions
```


Response:


```json
{
    "status":"success",
    "submissionId":"SUB001"
}
```


---

## 5.2 Service Testing


Kiểm tra:


- Business logic.
- Data processing.
- Error handling.


---

## 5.3 Database Testing


Kiểm tra:


- CRUD operation.
- Constraint.
- Transaction.


Ví dụ:


```
Create User

Update User

Delete User

```


---

# 6. Judge System Testing


Judge System cần kiểm thử đặc biệt.


## 6.1 Compile Testing


Test:


- Code đúng.
- Code sai cú pháp.
- Code thiếu thư viện.


Kết quả:


```
COMPILE_SUCCESS

COMPILE_ERROR
```


---

## 6.2 Execution Testing


Kiểm tra:


- Chạy đúng chương trình.
- Xử lý input/output.
- Giới hạn thời gian.


---

## 6.3 Test Case Testing


Kiểm tra:


```
Normal Case

Boundary Case

Large Data Case

Invalid Case

```


---

## 6.4 Result Checking Testing


Kiểm tra:


Accepted:


```
Expected:
100

Output:
100
```


Wrong Answer:


```
Expected:
100

Output:
90
```


---

# 7. Integration Testing


Kiểm tra kết nối giữa các module.


Ví dụ:


```
Frontend

    |

Backend API

    |

Database

    |

Judge System

```


Các luồng:


## Submit Flow


```
User Submit Code

        |

API Receive

        |

Create Submission

        |

Judge Process

        |

Save Result

        |

Return Result

```


---

# 8. Security Testing


Kiểm tra:


## Authentication


- Login.
- Token.
- Session.


## Authorization


- Permission.
- Role.


## Input Security


- SQL Injection.
- XSS.
- Invalid Input.


## Judge Security


- Infinite Loop.
- Resource Abuse.
- Unsafe Code.


---

# 9. Performance Testing


## 9.1 Load Testing


Mục tiêu:


Kiểm tra khi nhiều người dùng:


Ví dụ:


```
100 concurrent users

100 submissions
```


---

## 9.2 Stress Testing


Kiểm tra giới hạn:


```
Maximum Request

Maximum Submission

Maximum Queue Size

```


---

## 9.3 Benchmark Testing


Đo:


- API response time.
- Compile time.
- Execution time.
- Database query time.


---

# 10. Test Environment


Môi trường:


## Development


Dùng cho:


- Developer testing.
- Debug.


---

## Testing


Dùng cho:


- Automated test.
- Integration test.


---

## Production


Dùng cho:


- Final verification.


---

# 11. Test Data Management


Test data gồm:


```
Users

Problems

Test Cases

Submissions

Results

```


Yêu cầu:


- Không dùng dữ liệu thật.
- Có dữ liệu mẫu.
- Có dữ liệu biên.


---

# 12. Automated Testing


Các kiểm thử nên tự động:


```
Build Test

Unit Test

API Test

Regression Test

```


Quy trình:


```
Code Commit

      |

CI Pipeline

      |

Run Tests

      |

Pass

      |

Deploy
```


---

# 13. Bug Management


## Bug Report


Thông tin:


```json
{
    "title":"Judge timeout error",
    "severity":"high",
    "status":"open"
}
```


---

## Bug Severity


| Mức độ | Ý nghĩa |
|-|-|
|Critical|Hệ thống không hoạt động|
|High|Chức năng chính lỗi|
|Medium|Lỗi ảnh hưởng một phần|
|Low|Lỗi giao diện nhỏ|


---

# 14. Regression Testing


Mỗi lần sửa lỗi cần kiểm tra:


- Chức năng cũ.
- Chức năng liên quan.
- Luồng chính.


Ví dụ:


Sửa Judge Engine:


Cần kiểm tra lại:


```
Submit

Compile

Execute

Score

Result Display
```


---

# 15. Release Testing


Trước khi phát hành:


Checklist:


```
Build Success

All Tests Passed

Security Checked

Performance Accepted

Backup Completed

```


---

# 16. Continuous Integration Testing


CI Pipeline:


```
Push Code

      |

Build

      |

Run Tests

      |

Generate Report

      |

Deploy
```


---

# 17. Future Testing Enhancement


Có thể mở rộng:


- AI Test Generation.
- Automated Code Review.
- Mutation Testing.
- Advanced Security Testing.
- Distributed Load Testing.


---

# 18. Kết luận


Testing Specification đảm bảo hệ thống:

- Hoạt động chính xác.
- Ổn định.
- An toàn.
- Có khả năng phát triển lâu dài.


Testing là bước bắt buộc trước khi triển khai hệ thống thực tế.


---

# End of Document