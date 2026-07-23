# 09. Performance Specification

## 1. Tổng quan hiệu năng hệ thống

Performance Specification định nghĩa các yêu cầu, nguyên tắc và giải pháp tối ưu hiệu năng cho website chấm C++.

Mục tiêu:

- Hệ thống phản hồi nhanh.
- Xử lý được nhiều người dùng đồng thời.
- Giảm thời gian chờ khi nộp bài.
- Tối ưu tài nguyên máy chủ.
- Đảm bảo Judge System hoạt động ổn định.


Mô hình hiệu năng tổng thể:

```
User Request

      |
      v

Frontend Optimization

      |
      v

Backend API Optimization

      |
      v

Database Optimization

      |
      v

Judge Processing Optimization

      |
      v

Monitoring & Scaling
```

---

# 2. Performance Goals


## 2.1 Response Time


Các yêu cầu:


| Chức năng | Thời gian mục tiêu |
|-|-|
| Load trang | < 2 giây |
| API thông thường | < 500ms |
| Submit bài | < 1 giây |
| Xem kết quả | < 500ms |


---

## 2.2 Availability


Mục tiêu:

```
System Availability >= 99%
```


Hệ thống cần:

- Hoạt động ổn định.
- Có khả năng phục hồi lỗi.
- Không mất dữ liệu.


---

# 3. Frontend Performance


## 3.1 Code Optimization


Áp dụng:


- Component reuse.
- Lazy loading.
- Code splitting.
- Minify source.


---

## 3.2 Resource Optimization


Tối ưu:


- JavaScript.
- CSS.
- Images.
- Static files.


Nguyên tắc:


```
Load only what is needed
```


---

## 3.3 Browser Cache


Sử dụng:


```
Browser Cache

+

Static Resource Cache
```


Mục tiêu:

- Giảm request.
- Tăng tốc tải trang.


---

# 4. Backend Performance


## 4.1 API Optimization


Các nguyên tắc:


- Không xử lý tác vụ nặng trong request.
- Tách xử lý nền.
- Validate nhanh.


Ví dụ:


Không thực hiện:


```
Submit API

    |
    |
    v

Compile Code
Run Test
Calculate Score

    |
    v

Return
```


Thay bằng:


```
Submit API

    |
    v

Create Submission

    |
    v

Return Immediately

    |
    v

Background Judge Process
```


---

## 4.2 Caching Strategy


Các dữ liệu phù hợp:


- Problem list.
- Contest information.
- User ranking.


Cache:


```
Memory Cache

+

Database Cache
```


---

# 5. Database Performance


## 5.1 Indexing


Các bảng cần index:


```
Users

Problems

Submissions

Results
```


Ví dụ:


```
Submission

INDEX(user_id)

INDEX(problem_id)

INDEX(created_time)
```


---

## 5.2 Query Optimization


Yêu cầu:


- Không query dữ liệu không cần thiết.
- Giới hạn số lượng bản ghi.
- Sử dụng pagination.


Ví dụ:


Không dùng:


```sql
SELECT *
FROM submissions;
```


Sử dụng:


```sql
SELECT id,status
FROM submissions
LIMIT 20;
```


---

# 6. Judge System Performance


## 6.1 Queue Processing


Judge System sử dụng hàng đợi:


```
Submission Queue

       |
       v

Judge Worker

       |
       v

Result
```


Lợi ích:


- Không block API.
- Xử lý nhiều bài.
- Dễ mở rộng.


---

## 6.2 Worker Management


Mô hình:


```
Queue

 |
 +---- Worker 1
 |
 +---- Worker 2
 |
 +---- Worker 3

```


Khi tải tăng:


```
Add More Workers
```


---

# 7. Resource Management


## 7.1 CPU Management


Theo dõi:


- CPU usage.
- Judge workload.
- API workload.


Mục tiêu:


```
CPU Usage < 80%
```


---

## 7.2 Memory Management


Kiểm soát:


- Memory leak.
- Large object.
- Cache size.


Theo dõi:


```
RAM Usage

Heap Usage

Cache Usage
```


---

# 8. Concurrent Processing


Hệ thống hỗ trợ:


- Nhiều user submit cùng lúc.
- Nhiều bài được chấm đồng thời.


Ví dụ:


```
User A
 |
Submit

User B
 |
Submit

User C
 |
Submit


        |
        v


Submission Queue


        |
        v


Judge Workers
```


---

# 9. File Storage Performance


Quản lý:


- Source code.
- Test data.
- Result logs.


Nguyên tắc:


- Không lưu file lớn trong Database.
- Phân tách Storage.
- Xóa file tạm sau khi chấm.


---

# 10. Monitoring System


Theo dõi:


## Application Metrics


- Request time.
- Error rate.
- API throughput.


## Database Metrics


- Query time.
- Connection count.
- Storage usage.


## Judge Metrics


- Queue length.
- Average compile time.
- Average execution time.


---

# 11. Performance Testing


## 11.1 Load Testing


Kiểm tra:


- Nhiều user truy cập.
- Nhiều bài submit.


Ví dụ:


```
100 users

100 submissions/minute
```


---

## 11.2 Stress Testing


Mục tiêu:


Xác định giới hạn hệ thống.


Kiểm tra:


- CPU overload.
- Memory overload.
- Queue overload.


---

## 11.3 Benchmark Testing


Đo:


- Compile speed.
- Judge speed.
- Database speed.


---

# 12. Optimization Strategy


Thứ tự tối ưu:


```
1. Database

2. Backend API

3. Judge Engine

4. Frontend

5. Infrastructure
```


---

# 13. Scalability Design


## Vertical Scaling


Tăng:


- CPU.
- RAM.
- Storage.


---

## Horizontal Scaling


Thêm:


```
More API Servers

+

More Judge Workers
```


Mô hình:


```
             Load Balancer

                   |

        +----------+----------+

        API 1    API 2    API 3


                   |

              Database


                   |

              Judge Queue


          +--------+--------+

       Worker 1  Worker 2  Worker 3

```


---

# 14. Performance Best Practices


Áp dụng:


- Clean code.
- Efficient algorithm.
- Database indexing.
- Async processing.
- Resource monitoring.


---

# 15. Future Performance Enhancement


Có thể mở rộng:


- Distributed Judge System.
- CDN Integration.
- Advanced caching.
- Auto scaling.
- Real-time monitoring dashboard.


---

# 16. Kết luận


Performance Specification đảm bảo hệ thống:

- Nhanh.
- Ổn định.
- Có khả năng mở rộng.
- Đáp ứng lượng người dùng tăng trong tương lai.


Đây là cơ sở để triển khai:

- Coding Convention.
- Testing.
- Deployment.


---

# End of Document