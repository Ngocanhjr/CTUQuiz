# SETUP Guide

## 1. Mục tiêu

Tài liệu này hướng dẫn cài đặt và chạy dự án Quiz Exam Studio trên máy local theo quy trình chuẩn, ưu tiên Windows.

## 2. Yêu cầu hệ thống

- OS: Windows, macOS, hoặc Linux
- Node.js: >= 18.x (khuyến nghị 18 LTS hoặc 20 LTS)
- npm: đi kèm theo Node.js
- Trình duyệt hiện đại: Edge, Chrome, Firefox

Kiểm tra phiên bản:

```powershell
node -v
npm -v
```

## 3. Cấu trúc dự án liên quan đến setup

- frontend/: giao diện web
- backend/: HTTP server + API question bank
- exam_templates/: file DOCX mẫu để test import
- doc/: tài liệu mô tả và quy ước
- package.json: script chạy dự án

## 4. Cài đặt

Dự án hiện tại không có dependency npm bắt buộc. Tuy vậy, để đồng bộ môi trường và phòng trường hợp mở rộng sau này, vẫn nên chạy:

```powershell
npm install
```

Nếu không có package cần cài, lệnh sẽ hoàn tất nhanh.

## 5. Chạy ứng dụng local

Từ thư mục gốc dự án, chạy:

```powershell
npm run dev
```

Hoặc:

```powershell
npm start
```

Mặc định server chạy tại:

- http://localhost:3000

## 6. Tùy chỉnh cổng (port)

Mặc định backend dùng PORT=3000. Có thể đổi cổng trước khi chạy.

PowerShell:

```powershell
$env:PORT=3001
npm run dev
```

CMD:

```cmd
set PORT=3001
npm run dev
```

## 7. Kiểm tra nhanh sau khi chạy

### 7.1 Kiểm tra API health

Mở trình duyệt hoặc gọi:

- http://localhost:3000/api/health

Kết quả mong đợi:

```json
{ "status": "ok" }
```

### 7.2 Kiểm tra giao diện

Mở:

- http://localhost:3000

Xác nhận các khu vực:

- Thi thử
- Luyện tập
- Import DOCX

### 7.3 Kiểm tra API question bank

- GET http://localhost:3000/api/question-bank
- POST http://localhost:3000/api/question-bank/reset

## 8. Test import DOCX theo chuẩn hiện tại

Dùng các file mẫu trong exam_templates/:

- template1.docx
- template2.docx
- 40 cauhtml.docx

Quy trình test:

1. Mở Home screen.
2. Chọn file DOCX ở panel Import.
3. Bấm Nhập bộ câu hỏi.
4. Kiểm tra số câu trong bank và preview đã cập nhật.

Lưu ý:

- DOCX được ưu tiên hỗ trợ.
- DOC cũ (.doc) không được parser frontend hỗ trợ đầy đủ.

## 9. Troubleshooting

### 9.1 Cổng 3000 bị chiếm

Đổi PORT như mục 6 hoặc tắt process đang dùng cổng.

### 9.2 Mở bằng file:// không gọi được API

Không mở frontend bằng cách double click file HTML.
Luôn chạy qua server Node và truy cập bằng http://localhost:3000.

### 9.3 Lỗi import DOCX

- Đảm bảo file là .docx hợp lệ.
- Thử test bằng template1.docx và template2.docx trước.
- Nếu file có format lạ, đổi về một trong các mẫu parser đang hỗ trợ.

### 9.4 Không lưu được question bank

Kiểm tra quyền ghi trong thư mục backend/storage.

## 10. Quy trình cập nhật để giữ repo up to date

Mỗi khi thay đổi hành vi ứng dụng:

1. Cập nhật code.
2. Chạy test nhanh theo mục 7 và 8.
3. Cập nhật tài liệu liên quan trong doc/.
4. Nếu thay đổi parser import, cập nhật thêm:
   - doc/question plan.md
   - imports/templates/question-template-guide.md
   - mô tả import trên giao diện

## 11. Lệnh nhanh tổng hợp

```powershell
# 1) vào thư mục dự án
cd "e:\RHNA\Student\CT214H - Web\THI\W3Schools Quiz Results_files"

# 2) cài đặt (an toàn, có thể bỏ qua nếu không cần)
npm install

# 3) chạy server
npm run dev

# 4) mở app
# http://localhost:3000
```
