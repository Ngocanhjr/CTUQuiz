# Rule

## Commit

- Dùng Conventional Commits: feat, fix, refactor, docs, style, test, chore.
- Mỗi commit nên có phạm vi rõ ràng, tránh gộp nhiều mục đích.

## Coding

- Ưu tiên code rõ ràng, dễ đọc, không over-engineering.
- Không đổi format hoặc rename diện rộng nếu không cần thiết cho task.
- Khi sửa parser/import, luôn giữ backward compatibility cho template đã chạy ổn.

## Docs

- Có thay đổi hành vi thì phải cập nhật doc/ trong cùng PR.
- Tài liệu ưu tiên mô tả trạng thái hiện tại, không để dạng kế hoạch cũ.

## Import DOCX

- Ưu tiên DOCX, không cam kết parser cho DOC cũ.
- Nếu thêm template mới, cập nhật đồng bộ:
  - doc/question plan.md
  - imports/templates/question-template-guide.md
  - mô tả import trên UI frontend

## Quality gate

- Kiểm tra luồng cơ bản: thi thử, luyện tập, import, reset bank.
- Không merge khi tài liệu và hành vi thực tế lệch nhau.
