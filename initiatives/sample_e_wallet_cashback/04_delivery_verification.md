# [PHASE 4] Đồng Hành Triển Khai & Kiểm Thử (Delivery & Verification)

**Initiative Name:** Ví Điện Tử Hoàn Tiền Động & Gamification  
**Slug:** `sample_e_wallet_cashback`  
**Date:** 2026-09-13  
**BABOK Area:** Requirements Life Cycle Management  

---

## 1. Phân Bổ Sprint Backlog & Kế Hoạch Triển Khai (Sprint Breakdown)

| Story ID | Hạng mục công việc (Task Description) | Story Points | Sprint | Phụ trách (Assignee) | Tiêu chí hoàn thành (DoD) |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `SP-01` | Tạo cấu trúc bảng `rewards` và Redis distributed lock | 3 | Sprint 1 | Backend Engineer | Migration chạy thành công trên Staging, pass load test. |
| `SP-02` | Viết Kafka Consumer và Cashback calculation engine | 5 | Sprint 1 | Backend Engineer | P95 latency < 50ms, pass unit test > 90% coverage. |
| `SP-03` | Phát triển UI animation Cào thẻ may mắn trên Flutter/React Native | 5 | Sprint 2 | Mobile FE Dev | Animation 60fps mượt mà, hỗ trợ haptic feedback rung nhẹ. |
| `SP-04` | Xử lý Circuit Breaker & Cảnh báo Slack khi chạm ngân sách ngày | 3 | Sprint 2 | Backend Engineer | Tự động hạ tỷ lệ thưởng và bắn webhook Slack trong 5s. |
| `SP-05` | Màn hình Admin cấu hình tỷ lệ hoàn tiền & theo dõi ngân sách | 5 | Sprint 3 | Fullstack Dev | Cho phép Marketing đổi tỷ lệ mà không cần restart server. |

---

## 2. Ma Trận Ca Kiểm Thử Biên Của QA (QA Edge Cases Matrix)

| Test ID | Kịch bản kiểm thử | Hành động kiểm thử | Kỳ vọng kết quả kiểm thử | Kết quả |
| :--- | :--- | :--- | :--- | :---: |
| `TC-01` | Đơn hàng 49,999 VND | Thanh toán đơn 49,999đ (thiếu 1đ đạt mốc 50k) | Không hiển thị thẻ cào may mắn. | PASS |
| `TC-02` | Người dùng cào thẻ lần thứ 4 trong ngày | Hoàn tất đơn hàng thứ 4 hợp lệ | Màn hình báo: "Bạn đã dùng hết 3 lượt cào hôm nay. Hãy quay lại vào ngày mai!" | PASS |
| `TC-03` | Cào thẻ lúc 23:59:59 đến 00:00:01 (Giao thoa ngày) | Bắt đầu cào trước nửa đêm, kết thúc sau nửa đêm | Lượt cào tính đúng vào ngày phát hành token, reset quota ngày mới chuẩn xác. | PASS |
| `TC-04` | Giả mạo `reward_token` không tồn tại | Gọi API với token random | Trả về HTTP 404 NOT_FOUND với thông báo bảo mật, ghi nhận log nghi vấn gian lận. | PASS |

---

## 3. Kịch Bản Nghiệm Thu Thực Tế Của BA & Khách Hàng (UAT Checklist)

- [x] **Kịch bản UAT-01: Luồng thanh toán đơn 100,000 VND và cào thưởng**
  - Người thực hiện: BA Lead & Product Owner.
  - Kết quả: Thẻ cào xuất hiện trong 200ms sau thanh toán, cào trúng 8,000đ, số dư ví điểm cập nhật tức thì.
- [x] **Kịch bản UAT-02: Kiểm tra Circuit Breaker hạn mức ngày**
  - Người thực hiện: QA Lead & BA.
  - Giả lập ngân sách ngày chạm 45/50 triệu: Tỷ lệ thưởng lập tức được giới hạn về 1%, tin nhắn Slack cảnh báo nhảy vào channel `#growth-alerts`.

---

## 4. Quản Lý Thay Đổi Yêu Cầu Nghiệp Vụ (Change Request Log)

| Mã CR | Ngày đề xuất | Người yêu cầu | Chi tiết thay đổi | Đánh giá tác động (Impact Analysis) | Phê duyệt |
| :--- | :--- | :--- | :--- | :--- | :---: |
| `CR-001` | 2026-09-15 | Marketing Lead | Cho phép hạng Platinum được cào 5 lượt/ngày thay vì 3 lượt cố định | Thay đổi rule trong Redis config, thêm 1 Story Point vào Sprint 2 | **Approved** |
