# [PHASE 4] Đồng Hành Triển Khai & Kiểm Thử (Delivery & Verification)

**Initiative Name:** Chia Hoá Đơn Nhóm Qua QR Code (Group Bill Splitting via QR)  
**Slug:** `bill_splitting`  
**Date:** 2026-09-13  
**BABOK Knowledge Area:** Requirements Life Cycle Management  

---

## 1. Phân Bổ Sprint Backlog & Kế Hoạch Triển Khai (Sprint Breakdown)

| Story ID | Tiêu đề công việc | Story Points | Sprint | Phụ trách (Assignee) | Tiêu chí hoàn thành (DoD) |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `SP-BS-01` | Thiết kế schema CSDL `split_rooms`, `split_members` & Index | 3 | Sprint 1 | Backend Engineer | Chạy migration thành công, hỗ trợ truy vấn < 10ms. |
| `SP-BS-02` | API tạo phòng & Thuật toán Remainder Distribution | 3 | Sprint 1 | Backend Engineer | Unit test phủ 100% các ca chia tiền lẻ (100k/3, 50k/7...). |
| `SP-BS-03` | Tích hợp sinh mã VietQR động & Webhook Napas 247 | 5 | Sprint 1 | Backend Engineer | Webhook IPN xử lý dưới 500ms, chống replay attack. |
| `SP-BS-04` | Giao diện Mobile App: Tạo phòng, chia đều & chia theo món | 5 | Sprint 2 | Mobile FE Dev | UI theo đúng Figma design, responsive trên iOS & Android. |
| `SP-BS-05` | Triển khai WebSocket Hub cập nhật Real-time trạng thái phòng | 3 | Sprint 2 | Fullstack Dev | Tick xanh nhảy tức thì trên máy Host khi có người trả tiền. |
| `SP-BS-06` | Tính năng "Nhắc nợ 1-chạm" & Hạn chế spam Nudge (Rate limit) | 2 | Sprint 3 | Fullstack Dev | Chặn bấm liên tục (tối thiểu 4 tiếng/lần nhắc). |

---

## 2. Ma Trận Ca Kiểm Thử Biên Của QA (QA Edge Cases Matrix)

| Mã Test | Kịch bản kiểm thử (Edge Case) | Dữ liệu & Thao tác | Kỳ vọng hệ thống (Expected Behavior) | Kết quả |
| :--- | :--- | :--- | :--- | :---: |
| `TC-EDGE-01` | Hoá đơn 10,000đ chia cho 7 người | `total_amount = 10000`, `num_people = 7` | 6 thành viên trả `1,428đ`, Host gánh phần dư `1,432đ`. Tổng: `1,428 * 6 + 1,432 = 10,000đ` (Khớp 100%). | PASS |
| `TC-EDGE-02` | 2 thành viên cùng bấm thanh toán tại cùng mili-giây (t = 0) | Concurrency stress test | Cả 2 giao dịch được trừ ví và cộng ví Host độc lập, không bị deadlock hoặc race condition. | PASS |
| `TC-EDGE-03` | Người dùng quét VietQR nhưng sửa lại số tiền ít hơn quy định | Chuyển khoản 20,000đ thay vì 33,333đ | Hệ thống ghi nhận `amount_paid = 20,000`, giữ trạng thái `PARTIAL_PAID`, hiển thị còn thiếu 13,333đ. | PASS |
| `TC-EDGE-04` | Quét QR khi phòng đã bị Host huỷ hoặc hết hạn sau 72h | Quét mã phòng trạng thái `CANCELLED` | Báo lỗi thân thiện: "Phòng chia tiền này đã đóng hoặc hết hạn. Vui lòng liên hệ Host". | PASS |
| `TC-EDGE-05` | Thành viên bị mất mạng khi đang trừ tiền | Rớt kết nối lúc nhập PIN | Idempotency Key bảo vệ giao dịch: tiền không bị trừ 2 lần, trạng thái đồng bộ khi có mạng lại. | PASS |

---

## 3. Kịch Bản Nghiệm Thu Người Dùng Thực Tế (UAT Checklist)

- [x] **Kịch bản UAT-01: Luồng chia đều nội bộ ví hoàn tất trọn vẹn**
  - Người thực hiện: BA Lead & Product Owner.
  - Các bước: Host tạo bill 120k chia 3 người. Thành viên A & B mở app quét QR và xác nhận.
  - Kết quả: Ví Host nhận đủ 2 lần 40k. Phòng tự động chuyển sang "COMPLETED".
- [x] **Kịch bản UAT-02: Luồng khách ngoài quét VietQR từ ngân hàng Techcombank**
  - Người thực hiện: QA Lead & Stakeholder.
  - Các bước: Khách chưa có ví dùng camera quét VietQR trên điện thoại Host, app Techcombank mở ra với đúng số tiền và nội dung `BILL_...`, bấm chuyển tiền.
  - Kết quả: Sau 1.5 giây, màn hình của Host rung nhẹ và hiện tick xanh tên khách ngoài đã trả tiền.

---

## 4. Quản Lý Thay Đổi Yêu Cầu (Change Request - CR Log)

| Mã CR | Ngày đề xuất | Người yêu cầu | Chi tiết thay đổi đề xuất | Đánh giá tác động (Impact Analysis) | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :---: |
| `CR-BS-01` | 2026-09-13 | PO & Growth Lead | Bổ sung nút chia sẻ Deep Link qua Zalo/Messenger thay vì chỉ quét QR tại chỗ | Tăng thêm 2 Story Points vào Sprint 2; cần viết module sinh Dynamic Universal Link. | **Approved** |
