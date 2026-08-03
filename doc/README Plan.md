# README Plan

## Mục đích tài liệu

Tổng hợp nhanh cấu trúc và cách vận hành hiện tại của repo để thành viên mới có thể chạy, sửa và cập nhật đúng ngữ cảnh.

## Cấu trúc chính

- frontend/
  - index.html
  - assets/css/style.css
  - assets/js/app.js
  - data/questions.js
- backend/
  - server.js
  - src/services/question-bank-service.js
  - data/sample-questions.js
  - storage/question-bank.json (runtime)
- doc/
  - mota.md, question plan.md, ui-reference.md, rule.md, README Plan.md
- exam_templates/
  - template1.docx, template2.docx, 40 câuhtml.docx

## Luồng dữ liệu

1. Frontend tải question bank qua API backend.
2. Nếu API lỗi, frontend fallback local storage/sample.
3. Người dùng có thể import DOCX để thay thế ngân hàng hiện tại.
4. Dữ liệu được chuẩn hóa và lưu lại để dùng cho cả thi thử/luyện tập.

## API backend hiện có

- GET /api/question-bank
- PUT (hoặc POST) /api/question-bank
- POST /api/question-bank/reset
- GET /api/health

## Phạm vi tính năng đã ổn định

- Thi thử có timer, nộp bài, thống kê kết quả.
- Luyện tập có phản hồi đúng/sai ngay.
- Điều hướng paged/scroll.
- Retry nhóm câu sai.
- Import DOCX nhiều mẫu template.

## Ghi chú cập nhật

- Khi thay đổi parser import, cần cập nhật đồng thời:
  - doc/question plan.md
  - imports/templates/question-template-guide.md
  - text mô tả import trong frontend/assets/js/app.js
- Khi thay đổi UI structure, cần cập nhật doc/ui-reference.md.
- Khi đổi API hoặc storage behavior, cập nhật tài liệu này trước khi merge.

## Checklist trước khi merge

1. Chạy app không lỗi JS runtime cơ bản.
2. Kiểm tra import DOCX bằng ít nhất 1 file mẫu trong exam_templates.
3. Kiểm tra luồng thi thử, luyện tập, và retry câu sai.
4. Cập nhật tài liệu trong doc/ nếu có thay đổi hành vi.
