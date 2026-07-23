# 10. Test Design

## 1. Tổng quan

Tài liệu này mô tả thiết kế kiểm thử (Test Design) cho hệ thống website chấm C++ D:\DuAnLapTrinh.

Mục tiêu:

* Đảm bảo các thành phần hoạt động đúng yêu cầu.
* Phát hiện lỗi trong quá trình phát triển.
* Đảm bảo tính ổn định của hệ thống trước khi triển khai.
* Kiểm chứng độ chính xác của Judge System.
* Đảm bảo khả năng mở rộng và bảo trì.

---

# 2. Testing Strategy

Chiến lược kiểm thử tổng thể:

```text
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

Security Testing

      |

      v

Acceptance Testing
```

---

# 3. Testing Scope

Các thành phần cần kiểm thử:

```text
Frontend

Backend API

Database

Authentication

Judge System

Deployment

Security

Performance
```

---

# 4. Test Environment

Môi trường kiểm thử:

```text
Development Environment

Testing Environment

Staging Environment

Production Verification
```

Mỗi môi trường có:

```text
Configuration riêng

Database riêng

Test Data riêng

Permission riêng
```

---

# 5. Unit Testing

## Frontend Unit Test

Kiểm tra:

```text
UI Component

Form Validation

User Interaction

Client Logic
```

---

## Backend Unit Test

Kiểm tra:

```text
Business Logic

Service Layer

Validation

Exception Handling
```

---

## Judge Unit Test

Kiểm tra:

```text
Compiler Handler

Execution Engine

Result Checker

Resource Limiter
```

---

# 6. Integration Testing

Mục tiêu:

Kiểm tra sự kết nối giữa các module.

Các luồng:

```text
Frontend

   |

   v

Backend API

   |

   v

Database
```

và:

```text
Submission API

      |

      v

Queue

      |

      v

Judge Worker

      |

      v

Result Storage
```

---

# 7. API Testing

Các API cần kiểm thử:

## Authentication API

```text
Register

Login

Logout

Refresh Token
```

---

## Problem API

```text
Create Problem

Update Problem

Get Problem

Search Problem
```

---

## Submission API

```text
Submit Code

Get Submission

Get Result

View History
```

---

# 8. Database Testing

Kiểm tra:

```text
Schema

Relationship

Constraint

Transaction

Migration
```

---

# 9. Judge System Testing

Đây là phần quan trọng nhất.

## Compile Test

Kiểm tra:

```text
Valid C++ Code

Invalid Code

Missing Header

Syntax Error
```

---

## Execution Test

Kiểm tra:

```text
Correct Output

Wrong Answer

Runtime Error

Timeout

Memory Limit
```

---

## Sandbox Test

Kiểm tra:

```text
Process Isolation

Resource Limitation

File Access Restriction

Network Restriction
```

---

# 10. Test Case Management

Mỗi bài toán cần:

```text
Input Case

Expected Output

Constraint

Validation Rule
```

Ví dụ:

```text
Problem:

Sum two numbers


Input:

2 3


Expected:

5
```

---

# 11. Functional Testing

Kiểm thử chức năng người dùng:

```text
User Registration

User Login

Problem Browsing

Code Submission

Result Viewing

Ranking
```

---

# 12. Admin Testing

Kiểm thử:

```text
Create Problem

Manage User

View Statistics

Manage Submission

System Configuration
```

---

# 13. Performance Testing

Kiểm tra:

```text
API Response Time

Database Query Time

Concurrent User

Submission Processing Speed
```

---

# 14. Load Testing

Mô phỏng:

```text
Multiple Users

Multiple Submission

High Traffic

Large Dataset
```

---

# 15. Security Testing

Kiểm tra:

```text
Authentication

Authorization

Input Validation

SQL Injection

XSS Protection

CSRF Protection
```

---

# 16. Regression Testing

Sau mỗi thay đổi:

```text
Run Existing Test

Verify Old Feature

Check Side Effect
```

---

# 17. Automation Testing

Có thể tự động hóa:

```text
Unit Test

API Test

Build Test

Deployment Test

Judge Test
```

---

# 18. Test Data Management

Quản lý:

```text
Sample User

Sample Problem

Sample Submission

Expected Result
```

---

# 19. Bug Management

Mỗi lỗi cần ghi nhận:

```text
Bug ID

Description

Severity

Steps To Reproduce

Fix Status
```

---

# 20. Severity Classification

## Critical

Ví dụ:

```text
System Down

Wrong Judge Result

Data Loss
```

---

## High

Ví dụ:

```text
Major Feature Failure

Security Issue
```

---

## Medium

Ví dụ:

```text
Minor Feature Error

UI Issue
```

---

## Low

Ví dụ:

```text
Display Problem

Documentation Issue
```

---

# 21. Acceptance Testing

Người dùng kiểm tra:

```text
Create Account

Solve Problem

Submit C++ Code

Receive Correct Result

View Ranking
```

---

# 22. Test Report

Báo cáo gồm:

```text
Test Scope

Test Result

Failed Case

Bug List

Recommendation
```

---

# 23. Continuous Testing

Trong CI/CD:

```text
Commit

 |

 v

Build

 |

 v

Run Test

 |

 v

Deploy
```

---

# 24. Judge Accuracy Verification

Định kỳ:

```text
Known Solution

Compare Result

Verify Score

Check Edge Case
```

---

# 25. Future Testing Expansion

Có thể bổ sung:

```text
AI Generated Test Case

Chaos Testing

Automated Security Testing

Distributed Load Testing
```

---

# 26. Kết luận

Test Design giúp D:\DuAnLapTrinh:

* Đảm bảo chất lượng phần mềm.
* Kiểm soát lỗi trong toàn bộ vòng đời phát triển.
* Đảm bảo Judge System chính xác.
* Tạo nền tảng ổn định để mở rộng hệ thống.

---

# End of Document
