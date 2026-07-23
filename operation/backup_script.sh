#!/bin/bash
# D:\DuAnLapTrinh\operation\backup_script.sh
# Script tự động sao lưu Firestore và Storage hàng ngày [53]

PROJECT_ID="cpp-judge-project"
BUCKET_NAME="gs://cpp-judge-backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "Bắt đầu sao lưu hệ thống: $TIMESTAMP"

# 1. Sao lưu Cloud Firestore
gcloud firestore export $BUCKET_NAME/firestore_$TIMESTAMP --project $PROJECT_ID

# 2. Sao lưu Firebase Storage (Test cases)
gsutil cp -r gs://cpp-judge-testcases $BUCKET_NAME/storage_$TIMESTAMP

echo "Sao lưu hoàn tất thành công!"