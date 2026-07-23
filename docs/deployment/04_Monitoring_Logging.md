# 04. Monitoring & Logging Design

## 1. Tổng quan

Tài liệu này mô tả kiến trúc giám sát (Monitoring) và quản lý Log (Logging) cho hệ thống website chấm C++ D:\DuAnLapTrinh.

Mục tiêu:

* Theo dõi trạng thái hệ thống.
* Phát hiện lỗi sớm.
* Đảm bảo tính ổn định của Production.
* Phân tích hiệu năng.
* Hỗ trợ xử lý sự cố.

Các thành phần cần giám sát:

```text
Frontend

Backend API

Database

Redis

Message Queue

Judge System

Docker Container

Server Infrastructure

```

---

# 2. Monitoring Architecture

Kiến trúc tổng quát:

```text
                Application

                    |

                    v

              Metrics Collector

                    |

        +-----------+-----------+

        |                       |

        v                       v

   Monitoring System       Alert System


        |

        v


     Dashboard


```

---

# 3. Monitoring Objectives

Hệ thống cần theo dõi:

## Availability

Đảm bảo:

```text
Service đang chạy

API phản hồi

Database kết nối

```

---

## Performance

Theo dõi:

```text
Response Time

CPU Usage

Memory Usage

Database Query Time

Judge Processing Time

```

---

## Reliability

Theo dõi:

```text
Error Rate

Failed Jobs

Container Restart

Database Failure

```

---

# 4. Monitoring Stack

Đề xuất:

```text
Prometheus

+

Grafana

+

Alert Manager

```

Vai trò:

| Component     | Chức năng          |
| ------------- | ------------------ |
| Prometheus    | Thu thập Metrics   |
| Grafana       | Hiển thị Dashboard |
| Alert Manager | Gửi cảnh báo       |

---

# 5. Infrastructure Monitoring

Theo dõi Server:

## CPU

Metrics:

```text
cpu_usage_percent

```

Cảnh báo:

```text
CPU > 80%

trong 5 phút

```

---

## Memory

Theo dõi:

```text
memory_usage_percent

```

---

## Disk

Theo dõi:

```text
Disk Usage

Disk I/O

Storage Availability

```

---

## Network

Theo dõi:

```text
Incoming Traffic

Outgoing Traffic

Connection Count

```

---

# 6. Backend Monitoring

Backend API cần theo dõi:

## Request Metrics

Bao gồm:

```text
Total Request

Request Rate

HTTP Status Code

Latency

```

---

## API Performance

Ví dụ:

```text
GET /problems

POST /submission

GET /result

```

Theo dõi:

```text
Average Response Time

Maximum Response Time

Error Percentage

```

---

# 7. Database Monitoring

PostgreSQL Metrics:

## Connection

Theo dõi:

```text
Active Connection

Idle Connection

Connection Limit

```

---

## Query Performance

Theo dõi:

```text
Slow Query

Query Duration

Lock

Transaction

```

---

## Storage

Theo dõi:

```text
Database Size

Table Size

Index Size

```

---

# 8. Redis Monitoring

Theo dõi:

```text
Memory Usage

Connected Client

Cache Hit Rate

Expired Key

```

---

# 9. Message Queue Monitoring

Judge Queue cần:

```text
Queue Length

Waiting Job

Processing Job

Failed Job

```

---

# 10. Judge System Monitoring

Đây là thành phần quan trọng nhất.

Theo dõi:

## Worker Status

```text
Worker Online

Worker Busy

Worker Failed

```

---

## Compilation Metrics

```text
Compile Success

Compile Failed

Average Compile Time

```

---

## Execution Metrics

```text
Run Time

Memory Usage

Timeout Count

Runtime Error Count

```

---

# 11. Application Logging

Các loại Log:

```text
Application Log

Access Log

Error Log

Security Log

Audit Log

Judge Log

```

---

# 12. Log Architecture

Mô hình:

```text
Application

      |

      v

Log Collector

      |

      v

Log Storage

      |

      v

Search Dashboard

```

---

# 13. Logging Technology

Đề xuất:

```text
ELK Stack

hoặc

Loki + Grafana

```

Bao gồm:

```text
Log Collector

Log Database

Visualization

```

---

# 14. Backend Log Format

Sử dụng JSON Log:

Ví dụ:

```json
{
 "timestamp":"2026-01-01T10:00:00",
 "level":"ERROR",
 "service":"backend",
 "message":"Database connection failed"
}

```

---

# 15. Log Level

Các mức:

```text
DEBUG

INFO

WARNING

ERROR

CRITICAL

```

---

# 16. Security Logging

Theo dõi:

```text
Login Failed

Permission Denied

Suspicious Request

Data Access

Admin Action

```

---

# 17. Judge Logging

Judge Log:

```text
Submission ID

Compiler Version

Execution Time

Memory Usage

Result

Error Detail

```

---

# 18. Alerting System

Cảnh báo khi:

## Service Down

```text
Backend unavailable

Database unavailable

Worker unavailable

```

---

## Performance Issue

Ví dụ:

```text
API latency > 2s

CPU > 90%

Memory > 90%

```

---

## Judge Problem

Ví dụ:

```text
Queue quá dài

Worker lỗi

Compile failure tăng cao

```

---

# 19. Alert Channels

Có thể gửi:

```text
Email

Telegram

Slack

Mobile Notification

```

---

# 20. Health Check Endpoint

Mỗi Service cần:

```http
GET /health

```

Ví dụ:

```json
{
 "status":"healthy",
 "database":"connected",
 "queue":"available"
}

```

---

# 21. Dashboard Design

Các Dashboard:

## System Dashboard

Hiển thị:

```text
CPU

RAM

Disk

Network

```

---

## Application Dashboard

Hiển thị:

```text
Request

Latency

Errors

Users

```

---

## Judge Dashboard

Hiển thị:

```text
Queue Size

Worker Status

Accepted Rate

Failed Rate

```

---

# 22. Log Retention Policy

Đề xuất:

| Log             | Thời gian |
| --------------- | --------- |
| Application Log | 30 ngày   |
| Security Log    | 1 năm     |
| Audit Log       | 1 năm     |
| Judge Log       | 6 tháng   |

---

# 23. Monitoring Security

Yêu cầu:

* Dashboard giới hạn quyền.
* Không public Metrics.
* Bảo vệ Credential.
* Audit truy cập.

---

# 24. Incident Response Flow

Khi có cảnh báo:

```text
Alert

 |

 v

Investigate

 |

 v

Identify Root Cause

 |

 v

Fix

 |

 v

Review

```

---

# 25. Performance Analysis

Dữ liệu Monitoring dùng để:

* Tối ưu API.
* Tối ưu Database.
* Điều chỉnh Worker.
* Dự báo tải.

---

# 26. Capacity Planning

Dựa trên:

```text
User Growth

Submission Growth

Traffic Growth

Storage Growth

```

---

# 27. Backup Monitoring

Theo dõi:

```text
Backup Success

Backup Size

Backup Duration

Restore Test

```

---

# 28. Future Expansion

Có thể bổ sung:

```text
Distributed Tracing

OpenTelemetry

AI Anomaly Detection

Automatic Root Cause Analysis

```

---

# 29. Kết luận

Monitoring & Logging Design giúp hệ thống:

* Vận hành ổn định.
* Phát hiện lỗi nhanh.
* Dễ dàng phân tích sự cố.
* Kiểm soát hiệu năng.
* Sẵn sàng phục vụ quy mô lớn.

---

# End of Document
