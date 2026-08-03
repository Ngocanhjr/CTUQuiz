# Question Template Guide

Sử dụng thư mục này để lưu mẫu import câu hỏi từ file DOC/DOCX.

Website hiện hỗ trợ 4 mẫu import chính.

## Template 1: Bảng Field/Value (mỗi câu một bảng)

- Phù hợp khi biên soạn thủ công từng câu.
- Mỗi bảng gồm 2 cột: cột 1 là tên trường, cột 2 là giá trị.

Ví dụ trường:

- `Question Number`
- `Question Type`
- `Question Text`
- `Option A` / `Option B` / `Option C` / `Option D`
- `Correct Answer`
- `Explanation` (tùy chọn)
- `Topic`, `Difficulty` (tùy chọn)

## Template 2: Văn bản đánh số + tô màu đáp án đúng

- Phù hợp khi đã có đề dạng text trong Word.
- Mỗi câu bắt đầu bằng dạng `1.` hoặc `Question 1.`.
- Mỗi lựa chọn bắt đầu bằng `A.`, `B.`, `C.`, `D.`.
- Đáp án đúng có thể:
  - ghi dòng `Correct answer: B`, hoặc
  - tô highlight ngay lựa chọn đúng.

## Template 3: Bảng ma trận nhiều dòng (1 bảng cho nhiều câu)

- Phù hợp khi quản lý ngân hàng câu hỏi bằng sheet-style trong Word.
- Hàng đầu là tiêu đề cột, các hàng sau là dữ liệu câu hỏi.

Các cột thường dùng:

- `Question Number`
- `Question Type`
- `Question Text`
- `Option A`, `Option B`, `Option C`, `Option D`
- `Correct Answer`
- `Explanation`
- `Topic`
- `Difficulty`

Hệ thống cũng nhận các tiêu đề tương đương như `Number`, `Type`, `Question`, `Answer`, `Đáp án`, `Giải thích`.

## Template 4: Block nhãn Câu/Đáp án (không bắt buộc bảng)

- Phù hợp khi copy từ tài liệu tổng hợp, đề cương, ghi chú.
- Mỗi block có thể theo dạng:

`Câu 1: ...`
`A. ...`
`B. ...`
`C. ...`
`D. ...`
`Đáp án: B`
`Giải thích: ...`

Hoặc biến thể không có dòng `Đáp án`, nhưng lựa chọn đúng được tô màu/highlight trực tiếp trong Word.

Hệ thống hỗ trợ các nhãn tương đương:

- `Câu`, `Question`, `Q`
- `Đáp án`, `Answer`, `Correct Answer`
- `Giải thích`, `Explanation`
- `Chủ đề`, `Topic`
- `Độ khó`, `Difficulty`

## Trường bắt buộc

- `Question Number`
- `Question Type`
- `Question Text`
- `Correct Answer`

## Trường tùy chọn

- `Option A`
- `Option B`
- `Option C`
- `Option D`
- `Explanation`
- `Topic`
- `Difficulty`

## Loại câu hỏi hỗ trợ

- `single_choice`
- `true_false`

## Định dạng code trong DOCX

- Các dòng code trong câu hỏi, lựa chọn hoặc giải thích nên dùng font monospace/style code, hoặc đặt thành các dòng riêng có thụt đầu dòng.
- Khi import, hệ thống giữ xuống dòng và thụt đầu dòng của các đoạn code phổ biến như CSS/HTML/JS thay vì nén thành một dòng văn bản thường.

Lưu ý: parser import hiện tối ưu cho các loại trên để đảm bảo tương thích giao diện làm bài hiện tại.
