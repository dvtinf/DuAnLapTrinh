# 07. Judge System Design

## 1. Tổng quan

Tài liệu này mô tả thiết kế chi tiết hệ thống chấm bài C++ (Judge System) của website chấm C++ D:\DuAnLapTrinh.

Judge System là thành phần quan trọng nhất của hệ thống, chịu trách nhiệm:

- Nhận mã nguồn người dùng.
- Biên dịch chương trình C++.
- Thực thi chương trình trong môi trường kiểm soát.
- Kiểm tra kết quả.
- Tính điểm.
- Trả kết quả về Backend.


Mục tiêu:

- Chấm chính xác.
- Bảo mật khi chạy code người dùng.
- Kiểm soát tài nguyên.
- Xử lý nhiều bài đồng thời.
- Có khả năng mở rộng.

---

# 2. Judge System Architecture


Kiến trúc tổng thể:


```
                    Backend

                       |

                       v

                Judge Queue

                       |

                       v

                Judge Worker

                       |

        +--------------+--------------+

        |              |              |

        v              v              v

   Compiler       Executor       Checker

        |              |              |

        +--------------+--------------+

                       |

                       v

                 Result Processor

                       |

                       v

                 Database

```


---

# 3. Judge Workflow


Quy trình chấm:


```
User Submit Code

        |

        v

Create Submission

        |

        v

Create Judge Job

        |

        v

Queue Waiting

        |

        v

Worker Receive Job

        |

        v

Compile Source

        |

        v

Execute Program

        |

        v

Compare Output

        |

        v

Calculate Score

        |

        v

Save Result

        |

        v

Notify Backend

```


---

# 4. Judge Project Structure


Cấu trúc:


```
judge

|

src

|

+-- compiler

|

+-- executor

|

+-- checker

|

+-- sandbox

|

+-- worker

|

+-- queue

|

+-- models

|

+-- utils

|

+-- config

|

+-- tests

```


---

# 5. Compiler Module


## 5.1 Mục đích


Compiler chịu trách nhiệm biên dịch mã nguồn C++.


Input:


```
source.cpp

```


Output:


```
Executable File

Compile Result

```


---

## 5.2 Compiler Flow


```
Receive Source

       |

Validate File

       |

Compile

       |

Capture Error

       |

Return Status

```


---

## 5.3 Compile Status


Các trạng thái:


```
SUCCESS

COMPILE_ERROR

SYSTEM_ERROR

```


---

## 5.4 Compiler Interface


Ví dụ:


```cpp
class Compiler
{

public:

    CompileResult compile(
        string sourcePath
    );

};

```


---

# 6. Executor Module


## 6.1 Mục đích


Executor chạy chương trình đã biên dịch.


Input:


```
Executable

+

Test Input

```


Output:


```
Program Output

Execution Information

```


---

## 6.2 Execution Flow


```
Create Process

        |

Apply Resource Limit

        |

Run Program

        |

Monitor

        |

Collect Result

```


---

# 7. Execution Result


Kết quả chạy:


```json
{
    "status":"SUCCESS",
    "time":120,
    "memory":32,
    "output":"..."
}
```


---

# 8. Runtime Status


Các trạng thái:


```
RUNNING

FINISHED

TIME_LIMIT_EXCEEDED

MEMORY_LIMIT_EXCEEDED

RUNTIME_ERROR

```


---

# 9. Sandbox Module


## 9.1 Mục đích


Sandbox bảo vệ hệ thống khi chạy code người dùng.


Kiểm soát:


- CPU.
- RAM.
- Process.
- File access.
- Network access.


---

# 10. Sandbox Architecture


```
Executor

   |

   v

Sandbox Layer

   |

   v

Operating System

```


---

# 11. Resource Limitation


Mỗi chương trình có:


## Time Limit


Ví dụ:


```
1000 ms

```


---

## Memory Limit


Ví dụ:


```
256 MB

```


---

## Process Limit


Giới hạn:


```
Maximum Process Count

```


---

# 12. Checker Module


## 12.1 Mục đích


So sánh output của chương trình với đáp án.


Input:


```
User Output

Expected Output

```


Output:


```
Accepted

Wrong Answer

Partial Score

```


---

# 13. Checker Types


## Exact Checker


So sánh chính xác:


```
Output A == Output B

```


---

## Special Checker


Dùng cho:


- Multiple answers.
- Floating point.
- Optimization problem.


---

# 14. Score Calculator


Chịu trách nhiệm:


- Tính điểm.
- Xử lý subtask.
- Tổng hợp kết quả.


Ví dụ:


```
Test 1 : 20 points

Test 2 : 30 points

Test 3 : 50 points


Total = 100

```


---

# 15. Judge Queue


## Mục đích


Quản lý các bài chờ chấm.


Cấu trúc:


```
Pending Jobs

      |

      v

Worker Pool

```


---

# 16. Queue Data


Ví dụ:


```json
{
    "jobId":"JOB001",
    "submissionId":"SUB001",
    "priority":1
}
```


---

# 17. Worker Module


## Chức năng


Worker thực hiện:


```
Get Job

   |

Process

   |

Return Result

```


---

# 18. Worker Pool


Cho phép:


```
Worker 1

Worker 2

Worker 3

```


chạy song song.


Lợi ích:


- Tăng throughput.
- Giảm thời gian chờ.


---

# 19. Judge Result Processor


Nhiệm vụ:


- Nhận kết quả.
- Chuẩn hóa dữ liệu.
- Lưu Database.
- Thông báo Backend.


---

# 20. Security Design


Judge System phải bảo vệ:


## User Code


Không cho phép:


- Truy cập hệ thống.
- Truy cập dữ liệu khác.
- Gây treo server.


---

## Isolation


Áp dụng:


```
Sandbox

Container

Restricted Permission

```


---

# 21. Error Handling


Các lỗi:


```
Compilation Error

Runtime Error

Timeout

Memory Error

Checker Error

System Error

```


---

# 22. Logging


Judge Log:


```
Job ID

Submission ID

Worker ID

Execution Time

Result

Error

```


---

# 23. Performance Optimization


Áp dụng:


- Worker Pool.
- Queue Optimization.
- Compiler Cache.
- Resource Monitoring.
- Parallel Execution.


---

# 24. Testing Strategy


Judge Testing:


## Compiler Test


```
Valid Code

Invalid Code

Library Error

```


---

## Executor Test


```
Normal Program

Infinite Loop

High Memory Usage

```


---

## Checker Test


```
Correct Output

Wrong Output

Special Case

```


---

# 25. Future Enhancement


Có thể mở rộng:


```
Distributed Judge

Cloud Sandbox

AI Code Analysis

Automatic Test Generation

GPU Judge

```


---

# 26. Kết luận


Judge System Design là thiết kế cốt lõi của nền tảng chấm C++.

Thiết kế đảm bảo:

- Chấm chính xác.
- Chạy code an toàn.
- Xử lý nhiều người dùng.
- Có khả năng mở rộng.


---

# End of Document