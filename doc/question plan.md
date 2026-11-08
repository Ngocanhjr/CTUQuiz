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

## Đáp án có chú thích và nhiều lựa chọn

- Nhận `Đáp án đúng: True (a)` hoặc `False (b)` khi nội dung và chữ cái khớp với lựa chọn; chú thích mâu thuẫn sẽ bị báo lỗi.
- Nhận tương tự `Đúng (a)` / `Sai (b)` và `Correct answer: True (a)` / `False (b)`; nhận dạng đúng loại câu True/False và Đúng/Sai.
- Nhận `Đáp án đúng: a, b, c` và giữ đủ ba đáp án, tự nhận dạng thành `multiple_choice`.
- Câu nhiều đáp án dùng checkbox trong thi thử/luyện tập. Chọn đúng toàn bộ, không chọn thừa mới được điểm; xáo trộn lựa chọn và lịch sử giữ đủ đáp án.
- Đáp án chuẩn hóa thành chữ hoa, sắp xếp và nối bằng dấu phẩy (ví dụ `A,B,C`); đáp án một lựa chọn vẫn là `A`.
- Chữ cái không có trong lựa chọn hoặc danh sách không hợp lệ làm nhập thất bại, không tự lấy chữ cái đầu.
- Văn bản thụt đầu dòng có dấu chấm hoặc ngoặc đơn vẫn là văn bản thường, không tự coi là mã nguồn chỉ vì các dấu đó.

## Kiểm chứng ngày 08/11/2026

Đã chạy parser DOCX trong Edge và đối chiếu với XML gốc của 6 đề (20 câu/đề, tổng 120 câu):

- CT244_De_2_Tieng_Anh.docx, CT244_De_2_Tieng_Viet.docx
- CT244_De_3_Tieng_Anh.docx, CT244_De_3_Tieng_Viet.docx
- CT244_20_Cau_Hoi_Trac_Nghiem.docx
- CT244_Software_Maintenance_20_Questions_EN.docx

Khớp nội dung câu, lựa chọn, đáp án và loại câu (bỏ qua khác biệt khoảng trắng khi so sánh). Đã kiểm tra chọn checkbox bằng nhãn/chuột/phím Space, bỏ chọn, xóa câu trả lời, chấm thi thử/luyện tập và quay về bộ mẫu trong trình duyệt riêng.

Kiểm tra hồi quy đơn vị: `node --test tests/docx-answers.test.cjs`.

Các mẫu template1/2/3 vẫn nhập được. template4 và 40 câuhtml có lỗi thiếu lựa chọn/đáp án giống parser trước thay đổi; các lỗi mẫu này chưa xử lý trong tác vụ này. Kiểm tra không ghi ngân hàng câu hỏi hay lịch sử đang lưu của người dùng.

## Giới hạn hiện tại

- UI làm bài hỗ trợ single_choice, true_false và multiple_choice.
- DOC cũ chưa được parser frontend hỗ trợ trực tiếp, nên ưu tiên DOCX.

## Checklist trước khi import

1. File lưu đúng định dạng DOCX.
2. Mỗi câu có số thứ tự rõ ràng.
3. Đáp án đúng thể hiện nhất quán (field, tô màu, hoặc answer key).
4. Không để lựa chọn A/B/C/D rỗng nếu câu là single_choice.
