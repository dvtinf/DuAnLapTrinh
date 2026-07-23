# 09. Performance Design

## 1. Tổng quan

Tài liệu này mô tả thiết kế hiệu năng cho hệ thống website chấm C++ D:\DuAnLapTrinh.

Mục tiêu:

- Đảm bảo hệ thống phản hồi nhanh.
- Xử lý nhiều người dùng đồng thời.
- Tối ưu tài nguyên máy chủ.
- Giảm thời gian chờ khi chấm bài.
- Có khả năng mở rộng khi số lượng bài nộp tăng.


Phạm vi tối ưu:


```
Frontend Performance

Backend Performance

Database Performance

API Performance

Judge Performance

Infrastructure Performance

```

---

# 2. Performance Architecture


Kiến trúc tối ưu:


```
                 User

                  |

                  v

              Frontend

                  |

                  v

              API Layer

                  |

        +---------+---------+

        |                   |

        v                   v

     Cache              Backend Service

                            |

             +--------------+--------------+

             |                             |

             v                             v

        Database                    Judge Queue

                                             |

                                             v

                                       Judge Worker

```

---

# 3. Performance Goals


Mục tiêu:


| Thành phần | Mục tiêu |
|-|-|
|Frontend Load|< 3 giây|
|API Response|< 500ms|
|Database Query|< 100ms|
|Judge Queue|Ổn định|
|Submission Processing|Không block API|


---

# 4. Frontend Performance


## 4.1 Code Splitting


Tách bundle:


```
Main Bundle

        +

Feature Bundle

```


Ví dụ:


```
Home Page

Problem Page

Admin Page

```


chỉ tải khi cần.


---

# 5. Lazy Loading


Áp dụng cho:


- Page.
- Component lớn.
- Editor.


Ví dụ:


```
Code Editor

Problem Detail

Admin Dashboard

```


---

# 6. Asset Optimization


Tối ưu:


- Image compression.
- Minify CSS.
- Minify JavaScript.
- Cache static file.


---

# 7. Editor Optimization


Code Editor là thành phần nặng.


Giải pháp:


- Lazy load Monaco Editor.
- Giới hạn số lần render.
- Debounce xử lý input.


---

# 8. Frontend State Optimization


Nguyên tắc:


- Không lưu dữ liệu dư thừa.
- Chia nhỏ state.
- Tránh re-render không cần thiết.


---

# 9. Backend Performance


## 9.1 Async Processing


Các tác vụ nặng:


```
Judge Processing

Email

Report Generation

Analytics

```


không xử lý trực tiếp trong request.


---

Mô hình:


```
Request

   |

   v

Create Job

   |

   v

Background Worker

```


---

# 10. API Optimization


Áp dụng:


## Pagination


Ví dụ:


```
?page=1&limit=20

```


---

## Filtering


Ví dụ:


```
/problems?difficulty=easy

```


---

## Compression


Sử dụng:


```
GZIP

Brotli

```


---

# 11. Cache Design


Cache sử dụng cho:


```
Problem List

User Profile

Configuration

Ranking Data

```


---

Công nghệ:


```
Redis

```


---

# 12. Cache Strategy


## Cache Read


Luồng:


```
Request

   |

Check Cache

   |

+--------+

|        |

Hit    Miss

|        |

Return Database

```


---

## Cache Invalidation


Xóa cache khi:


```
Update Data

Delete Data

Data Expired

```


---

# 13. Database Performance


## Index Optimization


Index cho:


```
users.email

users.username

submissions.user_id

submissions.problem_id

submissions.status

```


---

# 14. Query Optimization


Nguyên tắc:


- Không query dư thừa.
- Select đúng column.
- Pagination.
- Avoid N+1 Query.


---

# 15. Connection Pooling


Database connection:


```
Application

      |

Connection Pool

      |

Database

```


Lợi ích:


- Giảm thời gian tạo connection.
- Tăng khả năng xử lý.


---

# 16. Database Scaling


Có thể mở rộng:


## Read Replica


```
Write Database

        |

        v

Read Replica

```


---

## Partitioning


Áp dụng cho bảng lớn:


```
submissions

results

logs

```


---

# 17. Judge System Performance


Judge là phần tiêu tốn tài nguyên nhất.


---

# 18. Queue Optimization


Không chấm trực tiếp:


```
Submission

      |

Queue

      |

Worker

```


Lợi ích:


- Không nghẽn API.
- Điều phối tải.


---

# 19. Worker Pool Design


Ví dụ:


```
Worker Pool


+---------+

|Worker 1|

+---------+

|Worker 2|

+---------+

|Worker 3|

+---------+

```


---

# 20. Compiler Optimization


Áp dụng:


- Reuse compiler environment.
- Cache dependency.
- Giảm thời gian khởi tạo.


---

# 21. Execution Optimization


Kiểm soát:


```
CPU

Memory

Process

Timeout

```


---

# 22. Parallel Judge Processing


Cho phép:


```
Job 1 ---> Worker 1

Job 2 ---> Worker 2

Job 3 ---> Worker 3

```


---

# 23. Infrastructure Performance


## Load Balancing


Khi mở rộng:


```
User

 |

Load Balancer

 |

+-------+-------+

Server1 Server2

```


---

# 24. Auto Scaling


Có thể mở rộng:


```
High Load

    |

Create More Worker

    |

Process Faster

```


---

# 25. Monitoring Performance


Theo dõi:


## Application Metrics


```
Request Time

Error Rate

Throughput

```


---

## Database Metrics


```
Query Time

Connection Count

Slow Query

```


---

## Judge Metrics


```
Queue Length

Average Runtime

Worker Usage

```


---

# 26. Stress Testing


Kiểm tra:


```
100 Users

1000 Users

10000 Submissions

```


---

# 27. Performance Testing Tools


Có thể sử dụng:


```
JMeter

k6

Artillery

Apache Benchmark

```


---

# 28. Performance Checklist


Trước Release:


```
✓ API Optimized

✓ Database Indexed

✓ Cache Enabled

✓ Queue Configured

✓ Worker Tested

✓ Monitoring Enabled

```


---

# 29. Future Performance Enhancement


Có thể mở rộng:


```
Microservices

Distributed Database

Distributed Judge Cluster

CDN

AI Performance Optimization

```


---

# 30. Kết luận


Performance Design đảm bảo website chấm C++:

- Nhanh.
- Ổn định.
- Chịu tải cao.
- Có khả năng mở rộng.


Thiết kế này kết hợp với:

```
Architecture Design

Database Design

Backend Design

Judge System Design

Security Design

```

tạo nền tảng cho việc triển khai hệ thống thực tế.


---

# End of Document