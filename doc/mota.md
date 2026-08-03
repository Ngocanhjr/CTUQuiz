# Mô tả sản phẩm

## Tổng quan

Đây là ứng dụng web ôn luyện trắc nghiệm có hai chế độ sử dụng:

- Thi thử: làm bài theo thời gian, nộp bài, xem kết quả tổng hợp.
- Luyện tập: trả lời và nhận phản hồi đúng sai ngay trong phiên học.

Ứng dụng hỗ trợ song ngữ Việt/Anh cho giao diện và dữ liệu câu hỏi theo từng locale.

## Tính năng đang có

- Quản lý ngân hàng câu hỏi từ backend hoặc local fallback.
- Lưu nhiều bộ test đã upload, chọn nhanh bộ test đang active.
- Xóa bộ test đã upload không còn sử dụng.
- Hiển thị danh sách câu hỏi theo chế độ từng câu hoặc cuộn dọc.
- Theo dõi trạng thái trả lời, đánh dấu câu, điều hướng palette.
- Nộp bài, chấm điểm, thống kê đúng/sai/bỏ trống.
- Lưu lịch sử làm bài theo từng bộ test (điểm số, số câu đúng/sai, thời điểm làm bài).
- Luyện lại các câu sai sau khi có kết quả.
- Import ngân hàng câu hỏi từ file DOCX.

## Import DOCX (trạng thái hiện tại)

Parser hiện hỗ trợ các mẫu phổ biến sau:

- Bảng Field/Value (mỗi câu là một block trường).
- Văn bản đánh số câu hỏi + đáp án A/B/C/D.
- Bảng ma trận nhiều dòng (cột tiêu đề + hàng dữ liệu).
- Block nhãn Câu/Question, Đáp án/Answer, Giải thích/Explanation.

Nhận diện đáp án đúng:

- Theo trường Correct Answer/Đáp án.
- Theo tô màu chữ/đánh dấu trong lựa chọn.
- Theo bảng Answer Key tách riêng cuối tài liệu.

Giới hạn hiện tại của UI quiz:

- Hỗ trợ ổn định nhất cho single_choice và true_false.

## Mô hình dữ liệu câu hỏi

Mỗi câu hỏi chuẩn hóa về cấu trúc:

- id, number, type
- correctAnswer
- topic, difficulty
- content.vi.question, content.vi.options, content.vi.explanation
- content.en.question, content.en.options, content.en.explanation

## Luồng sử dụng

1. Người dùng mở trang, chọn ngôn ngữ và chế độ học.
2. Hệ thống tải bộ test đang active cùng danh sách test đã lưu.
3. Người dùng làm bài, điều hướng và lưu đáp án.
4. Nộp bài để xem kết quả và tự động ghi lịch sử làm bài cho bộ test hiện tại.
5. Có thể luyện lại nhóm câu sai.
6. Có thể import DOCX để thêm/test mới và chuyển active nhanh bằng bộ chọn.
7. Có thể xóa test đã upload khi không cần nữa.

## Ghi chú vận hành

- Nếu backend API không sẵn sàng, ứng dụng vẫn chạy bằng local storage/sample bank.
- Bộ câu hỏi import thành công sẽ được lưu lại làm nguồn active mới.
- Lịch sử làm bài được lưu theo từng test để hỗ trợ theo dõi tiến trình học tập.
