# 03. CI/CD Pipeline Design

## 1. Tổng quan

Tài liệu này mô tả thiết kế quy trình Continuous Integration (CI) và Continuous Deployment (CD) cho hệ thống website chấm C++ D:\DuAnLapTrinh.

Mục tiêu:

* Tự động hóa quá trình build.
* Tự động kiểm thử.
* Tự động đóng gói ứng dụng.
* Giảm lỗi khi triển khai.
* Đảm bảo phiên bản phần mềm ổn định.

Mô hình tổng quát:

```text
Developer

   |

   v

Git Repository

   |

   v

CI Pipeline

   |

   +----------------+

   |                |

   v                v

Build           Automated Test


   |

   v

Docker Image


   |

   v

Container Registry


   |

   v

Deployment


   |

   v

Production

```

---

# 2. CI/CD Objectives

## Continuous Integration

Đảm bảo:

* Code luôn được kiểm tra.
* Các nhánh có thể hợp nhất an toàn.
* Phát hiện lỗi sớm.

---

## Continuous Deployment

Đảm bảo:

* Phiên bản mới được triển khai tự động.
* Giảm thao tác thủ công.
* Có khả năng rollback.

---

# 3. Source Control Strategy

Sử dụng:

```text
Git

```

Repository:

```text
DuAnLapTrinh

```

---

# 4. Git Branching Model

Áp dụng:

```text
main

 |

 +---- develop

          |

          +---- feature/*

          |

          +---- bugfix/*

```

---

# 5. Branch Description

## main

Chứa:

```text
Production Ready Code

```

---

## develop

Chứa:

```text
Integration Code

```

---

## feature

Ví dụ:

```text
feature/user-login

feature/judge-engine

feature/problem-management

```

---

# 6. Pull Request Workflow

Quy trình:

```text
Developer

    |

    v

Create Feature Branch

    |

    v

Commit Code

    |

    v

Create Pull Request

    |

    v

CI Validation

    |

    v

Code Review

    |

    v

Merge

```

---

# 7. CI Pipeline Stages

Các bước:

```text
1. Checkout Source


2. Install Dependencies


3. Static Analysis


4. Unit Test


5. Integration Test


6. Build Application


7. Build Docker Image


8. Security Scan

```

---

# 8. Stage 1 - Checkout Source

CI lấy code:

```bash
git clone repository

```

Kiểm tra:

* Commit version.
* Branch.
* Tag.

---

# 9. Stage 2 - Dependency Installation

Frontend:

```bash
npm install

```

Backend:

```bash
npm install

```

Judge:

```bash
install compiler environment

```

---

# 10. Stage 3 - Static Code Analysis

Mục đích:

* Phát hiện lỗi coding.
* Kiểm tra chuẩn lập trình.

Công cụ:

```text
ESLint

SonarQube

CppCheck

Clang-Tidy

```

---

# 11. Stage 4 - Automated Testing

Bao gồm:

## Unit Test

Kiểm tra:

* Function.
* Service.
* Component.

---

## Integration Test

Kiểm tra:

* API.
* Database.
* Judge Flow.

---

# 12. Backend Test Pipeline

Ví dụ:

```text
Run Backend Test

        |

        v

Connect Test Database

        |

        v

Execute API Test

        |

        v

Generate Report

```

---

# 13. Frontend Test Pipeline

Kiểm tra:

* Component.
* UI Logic.
* State Management.

Ví dụ:

```bash
npm run test

```

---

# 14. Judge System Test

Đặc biệt quan trọng:

Kiểm tra:

```text
Compile C++

Run Program

Compare Output

Calculate Score

Timeout Handling

Memory Limit

```

---

# 15. Stage 5 - Build Application

Backend:

```bash
npm run build

```

Frontend:

```bash
npm run build

```

---

# 16. Docker Image Build

Sau khi Test thành công:

```bash
docker build .

```

Tạo:

```text
frontend-image

backend-image

judge-worker-image

```

---

# 17. Image Tag Strategy

Ví dụ:

```text
backend:v1.0.0

backend:v1.0.1

backend:latest

```

---

# 18. Container Registry

Lưu trữ:

```text
Docker Image

```

Có thể sử dụng:

```text
Docker Hub

Private Registry

Cloud Registry

```

---

# 19. CD Pipeline

Luồng:

```text
New Image

    |

    v

Deploy Server

    |

    v

Run Migration

    |

    v

Restart Service

    |

    v

Health Check

```

---

# 20. Deployment Strategy

## Rolling Deployment

Triển khai từng phần:

```text
Instance 1

Update


Instance 2

Update

```

---

## Blue-Green Deployment

Hai môi trường:

```text
Blue

(Current)


Green

(New)

```

Sau kiểm tra:

```text
Switch Traffic

```

---

# 21. Database Migration in CD

Trước Deploy:

```text
Backup Database

        |

        v

Run Migration

        |

        v

Deploy Application

```

---

# 22. Environment Management

Các môi trường:

```text
Development

Testing

Staging

Production

```

---

# 23. Secret Management

Không lưu:

```text
Password

API Key

Token

```

Sử dụng:

```text
Environment Variable

Secret Manager

Vault

```

---

# 24. Automated Rollback

Nếu Deploy lỗi:

```text
Detect Failure

        |

        v

Stop Deployment

        |

        v

Restore Previous Version

        |

        v

Verify System

```

---

# 25. Deployment Verification

Kiểm tra:

```text
Health Check

API Response

Database Connection

Judge Queue

Frontend Loading

```

---

# 26. CI/CD Tools

Có thể sử dụng:

```text
GitHub Actions

GitLab CI

Jenkins

ArgoCD

```

---

# 27. Example Pipeline

```yaml
pipeline:

 stages:

  - checkout

  - test

  - build

  - dockerize

  - deploy

```

---

# 28. Monitoring After Deployment

Theo dõi:

* Error Rate.
* CPU.
* Memory.
* API Latency.
* Queue Length.

---

# 29. Security Integration

Pipeline cần:

* Dependency Scan.
* Container Scan.
* Secret Detection.
* Vulnerability Check.

---

# 30. Future Expansion

Có thể bổ sung:

```text
GitOps

Automatic Scaling

Canary Release

Feature Flag

AI Deployment Monitoring

```

---

# 31. Kết luận

CI/CD Pipeline Design giúp hệ thống:

* Triển khai nhanh.
* Giảm lỗi.
* Kiểm soát phiên bản.
* Tự động hóa vận hành.
* Sẵn sàng mở rộng Production.

---

# End of Document
