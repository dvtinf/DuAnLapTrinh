# 06. Server Configuration Design

## 1. Tổng quan

Tài liệu này mô tả cấu hình máy chủ (Server Configuration) cho hệ thống website chấm C++ D:\DuAnLapTrinh.

Mục tiêu:

* Chuẩn hóa môi trường máy chủ.
* Đảm bảo hiệu năng.
* Tăng cường bảo mật.
* Tối ưu vận hành Production.
* Tạo nền tảng ổn định cho Backend, Database và Judge System.

---

# 2. Server Architecture

Mô hình máy chủ:

```text id="h4z7mz"
                    Internet

                       |

                       v

                Load Balancer


                       |

        +--------------+--------------+

        |                             |

        v                             v


   Application Server          Judge Server



        |

        v


 Database Server



        |

        v


 Backup Server

```

---

# 3. Operating System

Hệ điều hành đề xuất:

```text id="v7l5ne"
Ubuntu Server LTS

```

Phiên bản khuyến nghị:

```text id="8o0d0h"
Ubuntu Server 24.04 LTS

```

Lý do:

* Ổn định lâu dài.
* Hỗ trợ Docker tốt.
* Cộng đồng lớn.
* Bảo mật thường xuyên.

---

# 4. Server Specification

## Application Server

Cấu hình tham khảo:

```text id="v3dr9q"
CPU:

8 Core


RAM:

16 GB


Storage:

100 GB SSD


Network:

1 Gbps

```

Chạy:

```text id="3g5jap"
Frontend

Backend API

Nginx

Docker Runtime

```

---

# 5. Database Server

Cấu hình:

```text id="oq2x1s"
CPU:

16 Core


RAM:

64 GB


Storage:

NVMe SSD


Backup Storage:

High Capacity

```

Chạy:

```text id="y5x4pl"
PostgreSQL

Backup Service

Monitoring Agent

```

---

# 6. Judge Server

Cấu hình:

```text id="f8q5ws"
CPU:

16-32 Core


RAM:

32-64 GB


Storage:

SSD


OS:

Linux

```

Chạy:

```text id="y7m6xq"
Judge Worker

Compiler Environment

Sandbox Runtime

```

---

# 7. Initial Server Setup

Sau khi cài OS:

```bash id="m4z8kd"
sudo apt update

sudo apt upgrade -y

```

Cài công cụ:

```bash id="8s2k0h"
sudo apt install \

git \

curl \

wget \

vim \

htop \

net-tools

```

---

# 8. User Management

Không sử dụng:

```text id="o6w9ny"
root

```

Tạo user quản trị:

```bash id="x7k1rs"
adduser deployer

```

Cấp quyền:

```bash id="c1v6fz"
usermod -aG sudo deployer

```

---

# 9. SSH Security

Cấu hình:

```text id="q8w5mh"
Disable Root Login

Disable Password Login

Use SSH Key

Change Default Port

```

---

# 10. SSH Key Authentication

Quy trình:

```text id="1k8qps"
Developer Machine

        |

        v

Public SSH Key

        |

        v

Server Authorized Keys

```

---

# 11. Firewall Configuration

Sử dụng:

```text id="t2z9kc"
UFW

```

Mở port:

```text id="x5b7ra"
22   SSH

80   HTTP

443  HTTPS

```

Ví dụ:

```bash id="v2j8bg"
sudo ufw allow 22

sudo ufw allow 80

sudo ufw allow 443

sudo ufw enable

```

---

# 12. Network Security

Quy tắc:

```text id="w0h7pr"
Public Server

        |

        v

Application Layer

        |

        v

Private Database Network

```

Database không public Internet.

---

# 13. Nginx Configuration

Nginx đảm nhận:

```text id="h2q6bv"
Reverse Proxy

Static File Server

SSL Termination

Load Balancing

```

---

# 14. Nginx Directory Structure

Ví dụ:

```text id="n8s5az"
etc/nginx/

├── nginx.conf

├── sites-available/

└── sites-enabled/

```

---

# 15. Reverse Proxy

Luồng:

```text id="z1y8gm"
Client

 |

HTTPS

 |

Nginx

 |

API Server

```

---

# 16. SSL Configuration

Sử dụng:

```text id="j9p4fk"
Let's Encrypt

```

Yêu cầu:

* Certificate Renewal.
* HTTPS Redirect.
* Secure Cipher.

---

# 17. Docker Installation

Cài Docker:

```bash id="t3h7qw"
curl -fsSL https://get.docker.com | sh

```

Kiểm tra:

```bash id="u4m8zn"
docker version

```

---

# 18. Docker Compose Installation

Kiểm tra:

```bash id="a6v9xc"
docker compose version

```

---

# 19. PostgreSQL Server Configuration

Các thiết lập:

```text id="r2m5cv"
Connection Limit

Memory Allocation

Backup Policy

Logging

```

---

# 20. PostgreSQL Security

Không cho:

```text id="p7s4qm"
Remote Public Access

```

Bật:

```text id="w5z8nx"
Password Authentication

SSL Connection

Access Control

```

---

# 21. System Optimization

## Kernel Parameters

Điều chỉnh:

```text id="k8m3dx"
Network Buffer

File Descriptor

Connection Limit

```

---

# 22. File Descriptor

Kiểm tra:

```bash id="f3n8qp"
ulimit -n

```

Tăng giới hạn:

```text id="x0q7vm"
65535

```

---

# 23. Time Synchronization

Sử dụng:

```text id="g9w2mk"
NTP

```

Đảm bảo:

* Log chính xác.
* Token hoạt động đúng.
* Database consistency.

---

# 24. System Monitoring Agent

Cài:

```text id="r7v5mx"
Node Exporter

Docker Metrics

Database Exporter

```

---

# 25. Server Backup

Bao gồm:

```text id="n1j6pa"
Configuration Backup

Database Backup

Docker Configuration Backup

SSL Backup

```

---

# 26. Server Update Policy

Định kỳ:

```text id="m7c2zw"
Security Update

Package Update

Docker Update

Kernel Update

```

---

# 27. Log Management

Log:

```text id="y4k8nb"
System Log

SSH Log

Nginx Log

Docker Log

Database Log

```

---

# 28. Server Hardening Checklist

Kiểm tra:

```text id="p6v9mc"
✓ SSH Secure

✓ Firewall Enabled

✓ Root Login Disabled

✓ Automatic Update Enabled

✓ Monitoring Active

✓ Backup Tested

```

---

# 29. Disaster Recovery Preparation

Server cần:

```text id="q2w7fz"
Image Backup

Configuration Backup

Recovery Script

Documentation

```

---

# 30. Future Expansion

Có thể bổ sung:

```text id="r5x8nd"
Infrastructure as Code

Terraform

Ansible Automation

Cloud Auto Scaling

Immutable Server

```

---

# 31. Kết luận

Server Configuration Design cung cấp nền tảng:

* An toàn.
* Ổn định.
* Dễ quản trị.
* Sẵn sàng triển khai Production.
* Phù hợp hệ thống chấm C++ có lượng truy cập lớn.

---

# End of Document
