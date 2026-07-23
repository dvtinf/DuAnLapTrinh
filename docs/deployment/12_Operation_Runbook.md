# 12. Operation Runbook

## 1. Tổng quan

Tài liệu này là sổ tay vận hành hệ thống website chấm C++ D:\DuAnLapTrinh.

Mục đích:

* Hướng dẫn quản trị hệ thống Production.
* Chuẩn hóa thao tác vận hành.
* Hỗ trợ xử lý sự cố.
* Giảm phụ thuộc vào cá nhân quản trị.

---

# 2. System Components

Hệ thống bao gồm:

```text
Frontend

Backend API

PostgreSQL Database

Redis Cache

Message Queue

Judge Manager

Judge Worker

Monitoring

Backup System
```

---

# 3. Daily Operation

Công việc mỗi ngày:

```text
1. Kiểm tra trạng thái Service

2. Kiểm tra CPU/RAM/Disk

3. Kiểm tra Database

4. Kiểm tra Judge Queue

5. Kiểm tra Error Log

6. Kiểm tra Backup

```

---

# 4. Service Management

## Kiểm tra Container

```bash
docker ps
```

Xem log:

```bash
docker logs <container_name>
```

Restart service:

```bash
docker restart <container_name>
```

---

# 5. Backend Operation

## Kiểm tra Backend

```text
API Available

Database Connected

Redis Connected

Queue Connected

```

---

## Restart Backend

Quy trình:

```text
Stop Container

      |

Start Container

      |

Health Check

      |

Verify API

```

---

# 6. Frontend Operation

Kiểm tra:

```text
Website Accessible

HTTPS Working

Static Resource Loaded

API Connection

```

---

# 7. Database Administration

## Kiểm tra PostgreSQL

```sql
SELECT version();
```

Kiểm tra Connection:

```sql
SELECT count(*) FROM pg_stat_activity;
```

---

## Database Backup

Quy trình:

```text
Create Backup

      |

Verify Backup

      |

Store Remote Location

```

---

# 8. Database Recovery

Khôi phục:

```text
Stop Application

      |

Restore Database

      |

Apply Migration

      |

Start Application

```

---

# 9. Redis Administration

Kiểm tra:

```bash
redis-cli ping
```

Kết quả:

```text
PONG
```

---

# 10. Message Queue Operation

Theo dõi:

```text
Waiting Jobs

Processing Jobs

Failed Jobs

Retry Queue

```

---

# 11. Judge System Operation

## Kiểm tra Worker

Cần đảm bảo:

```text
Worker Online

Compiler Available

Sandbox Active

Queue Connected

```

---

# 12. Judge Troubleshooting

## Worker không xử lý bài

Kiểm tra:

```text
1. Worker Status

2. Queue Connection

3. Compiler

4. Container Resource

```

---

## Submission bị treo

Kiểm tra:

```text
Queue Length

Execution Timeout

Worker Capacity

```

---

# 13. Deployment Operation

Quy trình chuẩn:

```text
Prepare Release

      |

Backup

      |

Deploy New Version

      |

Migration

      |

Restart Service

      |

Health Check

```

---

# 14. Release Procedure

Mỗi Release cần:

```text
Version Number

Release Note

Docker Image

Database Migration

Rollback Plan

```

---

# 15. Hotfix Procedure

Khi có lỗi nghiêm trọng:

```text
Identify Issue

      |

Create Hotfix

      |

Test

      |

Deploy

      |

Monitor

```

---

# 16. Rollback Procedure

Khi Release lỗi:

```text
Stop Current Version

      |

Restore Previous Image

      |

Restore Database If Required

      |

Verify System

```

---

# 17. Common Troubleshooting

## Website không truy cập

Kiểm tra:

```text
Nginx

DNS

SSL

Frontend Container

```

---

## API lỗi

Kiểm tra:

```text
Backend Log

Database Connection

Environment Config

```

---

## Database lỗi

Kiểm tra:

```text
Connection

Storage

Process Status

Backup

```

---

## Judge lỗi

Kiểm tra:

```text
Worker

Queue

Compiler

Sandbox

```

---

# 18. Security Operation

Định kỳ:

```text
Update System

Review User Access

Rotate Secret

Check Security Log

```

---

# 19. User Permission Management

Quản lý:

```text
Admin Account

Developer Access

Database Access

Server Access

```

---

# 20. Monitoring Response

Khi nhận Alert:

```text
Receive Alert

      |

Analyze Metric

      |

Check Log

      |

Fix Problem

      |

Close Incident

```

---

# 21. Incident Report

Mỗi sự cố cần ghi:

```text
Time

Cause

Impact

Solution

Prevention

```

---

# 22. Backup Operation

Kiểm tra:

```text
Backup Success

Backup Size

Restore Test

Storage Availability

```

---

# 23. Maintenance Schedule

## Hằng ngày

```text
Monitoring Check

Log Review

Backup Verification

```

---

## Hằng tuần

```text
Performance Review

Security Review

Database Optimization

```

---

## Hằng tháng

```text
System Update

Recovery Test

Architecture Review

```

---

# 24. Administrator Checklist

```text
✓ All Services Running

✓ No Critical Alert

✓ Database Healthy

✓ Backup Available

✓ Judge Working

✓ Security Normal

```

---

# 25. Future Operation Improvement

Có thể bổ sung:

```text
Self Healing System

Automatic Scaling

AI Monitoring

Infrastructure Automation

```

---

# 26. Kết luận

Operation Runbook là tài liệu vận hành trung tâm giúp:

* Quản trị hệ thống dễ dàng.
* Xử lý sự cố nhanh.
* Chuẩn hóa thao tác Production.
* Đảm bảo nền tảng chấm C++ hoạt động ổn định lâu dài.

---

# End of Document
