# 05. Database Backup & Recovery Strategy

## 1. Tổng quan

Tài liệu này mô tả chiến lược sao lưu và phục hồi Database cho hệ thống website chấm C++ D:\DuAnLapTrinh.

Mục tiêu:

* Bảo vệ dữ liệu người dùng.
* Giảm thiểu mất mát dữ liệu.
* Đảm bảo hệ thống có thể phục hồi khi xảy ra sự cố.
* Hỗ trợ vận hành Production ổn định.

Các dữ liệu quan trọng:

```text
Users

Problems

Test Cases

Submissions

Results

Judge Jobs

Audit Logs

```

---

# 2. Backup Objectives

Hệ thống cần đảm bảo:

## Data Safety

```text
Không mất dữ liệu quan trọng.

```

## Availability

```text
Có khả năng khôi phục nhanh.

```

## Consistency

```text
Backup phải đảm bảo trạng thái Database hợp lệ.

```

---

# 3. Backup Strategy Overview

Mô hình:

```text
Production Database

        |

        |

        +----------------+

        |                |

        v                v

 Full Backup      Incremental Backup

        |

        v

 Backup Storage

```

---

# 4. Backup Types

## 4.1 Full Backup

Sao lưu toàn bộ Database.

Ví dụ:

```bash
pg_dump database_name > full_backup.sql

```

Đặc điểm:

Ưu điểm:

* Phục hồi đơn giản.
* Dữ liệu đầy đủ.

Nhược điểm:

* Dung lượng lớn.
* Thời gian lâu.

---

## 4.2 Incremental Backup

Chỉ lưu phần thay đổi.

Sử dụng:

```text
PostgreSQL WAL Archive

```

Ưu điểm:

* Tiết kiệm dung lượng.
* Hỗ trợ phục hồi thời điểm.

---

## 4.3 Snapshot Backup

Sử dụng:

```text
Cloud Volume Snapshot

```

Phù hợp:

* Database lớn.
* Production.

---

# 5. Backup Schedule

Lịch đề xuất:

| Loại Backup         | Tần suất  |
| ------------------- | --------- |
| Full Backup         | Hàng ngày |
| Incremental Backup  | Mỗi giờ   |
| WAL Archive         | Liên tục  |
| Backup Verification | Hàng tuần |

---

# 6. Backup Storage Architecture

Mô hình:

```text
Database Server

        |

        v

Backup Service

        |

        +-------------+

        |             |

        v             v

Local Backup     Remote Storage

```

---

# 7. Backup Retention Policy

Chính sách lưu:

| Backup         | Thời gian giữ |
| -------------- | ------------- |
| Hourly Backup  | 24 giờ        |
| Daily Backup   | 30 ngày       |
| Weekly Backup  | 6 tháng       |
| Monthly Backup | 1 năm         |

---

# 8. PostgreSQL Backup Implementation

## Logical Backup

Công cụ:

```text
pg_dump

pg_restore

```

Ví dụ:

```bash
pg_dump \
-U postgres \
-d duanlaptrinh \
-F c \
-f backup.dump

```

Restore:

```bash
pg_restore \
-U postgres \
-d duanlaptrinh \
backup.dump

```

---

# 9. Physical Backup

Sử dụng:

```text
PostgreSQL WAL

Base Backup

```

Phù hợp:

* Database lớn.
* Yêu cầu phục hồi nhanh.

---

# 10. Point In Time Recovery (PITR)

Mục tiêu:

Khôi phục Database tại thời điểm cụ thể.

Ví dụ:

```text
Database lỗi lúc:

10:35:20


Restore về:

10:35:19

```

---

# 11. Recovery Process

Quy trình:

```text
Detect Failure

        |

        v

Stop Application

        |

        v

Restore Backup

        |

        v

Replay WAL

        |

        v

Validate Data

        |

        v

Start System

```

---

# 12. Recovery Scenarios

## Scenario 1: Database Server Failure

Giải pháp:

```text
Restore Latest Backup

+

Apply WAL

```

---

## Scenario 2: Accidental Data Delete

Giải pháp:

```text
Point In Time Recovery

```

---

## Scenario 3: Corrupted Database

Giải pháp:

```text
Restore Clean Backup

```

---

# 13. Recovery Target

## RPO (Recovery Point Objective)

Mục tiêu:

```text
<= 1 hour

```

Ý nghĩa:

Mất tối đa 1 giờ dữ liệu.

---

## RTO (Recovery Time Objective)

Mục tiêu:

```text
<= 2 hours

```

Ý nghĩa:

Hệ thống hoạt động lại trong 2 giờ.

---

# 14. Backup Encryption

Backup phải:

* Mã hóa khi lưu trữ.
* Mã hóa khi truyền.
* Kiểm soát quyền truy cập.

Ví dụ:

```text
AES-256 Encryption

```

---

# 15. Backup Validation

Không chỉ tạo Backup mà phải kiểm tra:

## Integrity Check

```text
Backup tồn tại

File không lỗi

Checksum hợp lệ

```

---

## Restore Test

Định kỳ:

```text
Restore thử nghiệm

Kiểm tra dữ liệu

Đánh giá thời gian phục hồi

```

---

# 16. Database Replication

Production có thể sử dụng:

```text
Primary Database

        |

        v

Replica Database

```

Lợi ích:

* High Availability.
* Read Scaling.
* Disaster Recovery.

---

# 17. Backup Monitoring

Theo dõi:

* Backup thành công/thất bại.
* Dung lượng Backup.
* Thời gian chạy.
* Restore capability.

---

# 18. Backup Failure Handling

Khi Backup lỗi:

```text
Retry

        |

        v

Send Alert

        |

        v

Manual Investigation

```

---

# 19. Security Policy

Backup phải:

* Không chứa dữ liệu public.
* Giới hạn quyền truy cập.
* Có Audit Log.
* Không lưu mật khẩu dạng plaintext.

---

# 20. Disaster Recovery Plan

Kịch bản:

```text
Primary Server Down

        |

        v

Activate Replica

        |

        v

Restore If Needed

        |

        v

Switch Traffic

```

---

# 21. Backup Automation

Có thể sử dụng:

```text
Cron Job

CI/CD Pipeline

Cloud Backup Service

```

Ví dụ:

```bash
0 2 * * *

Run Full Backup

```

---

# 22. Backup Directory Structure

Ví dụ:

```text
backup/

├── daily/

│   ├── backup_2026_01_01.dump

│

├── weekly/

│

└── monthly/

```

---

# 23. Future Expansion

Có thể bổ sung:

```text
Multi Region Backup

Automatic Failover

Database Cluster

Backup Dashboard

AI Failure Prediction

```

---

# 24. Kết luận

Database Backup & Recovery Strategy đảm bảo:

* An toàn dữ liệu.
* Khả năng phục hồi sau sự cố.
* Duy trì hoạt động liên tục.
* Sẵn sàng triển khai Production quy mô lớn.

---

# End of Document
