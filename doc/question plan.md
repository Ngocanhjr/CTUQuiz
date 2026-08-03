# Kế hoạch import câu hỏi DOCX

## Mục tiêu

Tài liệu này mô tả chuẩn import DOCX theo trạng thái parser hiện tại của repo, để người biên soạn đề tạo file đúng format ngay từ đầu.

## Các mẫu parser đang hỗ trợ

### Mẫu 1: Bảng Field/Value

- Mỗi câu là một bảng 2 cột.
- Cột trái là tên trường, cột phải là giá trị.

Trường thường dùng:

- Question Number
- Question Type
- Question Text
- Option A, Option B, Option C, Option D
- Correct Answer
- Explanation, Topic, Difficulty (tùy chọn)

### Mẫu 2: Văn bản đánh số + đáp án tô màu/đánh dấu

- Câu hỏi dạng Question 1. ... hoặc Câu 1: ...
- Lựa chọn dạng A. ..., B. ..., C. ..., D. ...
- Đáp án đúng lấy theo một trong các cách:
  - Dòng Correct Answer: B hoặc Đáp án: B
  - Lựa chọn được tô màu/đánh dấu trong Word

### Mẫu 3: Bảng ma trận nhiều dòng

- Một bảng có hàng tiêu đề cột và nhiều hàng dữ liệu câu hỏi.
- Ví dụ cột: Number, Type, Question, Option A-D, Correct Answer.

### Mẫu 4: Block nhãn linh hoạt

- Mỗi block gồm các dòng có nhãn:
  - Câu/Question/Q
  - Đáp án/Answer/Correct Answer
  - Giải thích/Explanation (tùy chọn)
- Biến thể thực tế cũng được hỗ trợ:
  - `Câu 1: ...`
  - `A. ...`, `B. ...`, `C. ...`, `D. ...`
  - đáp án đúng được tô màu/highlight trực tiếp trên lựa chọn

## Nhận diện alias trường

Parser có hỗ trợ alias Việt/Anh cho các trường chính như:

- question text, nội dung câu hỏi, câu hỏi
- correct answer, đáp án đúng, đáp án
- explanation, giải thích, lời giải
- topic/chủ đề, difficulty/độ khó

## Chuẩn dữ liệu sau import

Mỗi câu được chuẩn hóa về:

- id, number, type
- correctAnswer
- topic, difficulty
- content.vi và content.en

## Validation hiện hành

- Câu hỏi phải có nội dung.
- Phải có options hợp lệ cho loại trắc nghiệm.
- Phải xác định được correctAnswer.
- Question type không thuộc danh sách UI hỗ trợ sẽ bị báo lỗi.

## Giới hạn hiện tại

- UI làm bài hiện tối ưu cho single_choice và true_false.
- DOC cũ chưa được parser frontend hỗ trợ trực tiếp, nên ưu tiên DOCX.

## Checklist trước khi import

1. File lưu đúng định dạng DOCX.
2. Mỗi câu có số thứ tự rõ ràng.
3. Đáp án đúng thể hiện nhất quán (field, tô màu, hoặc answer key).
4. Không để lựa chọn A/B/C/D rỗng nếu câu là single_choice.
