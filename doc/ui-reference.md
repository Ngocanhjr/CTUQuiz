# UI Reference

Tài liệu này mô tả giao diện đang triển khai và các mốc tham chiếu để giữ UI nhất quán khi chỉnh sửa.

## File tham chiếu

- frontend_template/Câu hỏi ôn tậpCTU e-Learning.html: mẫu tham chiếu bố cục review kiểu Moodle/CTU.
- frontend/index.html: cấu trúc màn hình thực tế của app.
- frontend/assets/css/style.css: style chính cho layout, trạng thái đúng/sai, palette.
- frontend/assets/js/app.js: logic render câu hỏi, điều hướng, kết quả, import.

## Mục tiêu giao diện

- Gần với trải nghiệm review bài thi dạng Question n.
- Mỗi câu có trạng thái Correct/Incorrect/Blank và điểm theo từng câu.
- Lựa chọn hiển thị dạng danh sách radio.
- Đáp án đúng nên có nền xanh nhạt.
- Đáp án sai nên có nền đỏ nhạt.
- Khu vực giải thích nằm trong hộp vàng nhạt phía dưới.
- Bên phải có palette số câu và khối meta phiên làm bài.

## Tình trạng hiện tại

- Home có 3 khối chính: thi thử, luyện tập, import DOCX.
- Workspace làm bài hỗ trợ 2 kiểu điều hướng: paged và scroll.
- Workspace kết quả hiển thị tổng điểm, breakdown đúng/sai/bỏ trống và danh sách review.
- Import panel hiển thị trạng thái tiến trình và preview question bank đang active.
