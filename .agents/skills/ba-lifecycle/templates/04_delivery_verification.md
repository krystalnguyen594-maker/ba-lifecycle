# [PHASE 4] Đồng Hành Triển Khai & Kiểm Thử (Delivery & Verification)

**Initiative Name:** `{{INITIATIVE_NAME}}`  
**Date:** `{{DATE}}`  
**BABOK Knowledge Area:** Requirements Life Cycle Management  

---

## 1. Phân Rã Sprint & Story Mapping (Sprint Backlog)

| Story ID | Tiêu đề User Story | Story Points | Sprint dự kiến | Độ ưu tiên (MoSCoW) | Dependencies | Phụ trách (Assignee) |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| `US-01` | Tạo cấu trúc data model & bảng giao dịch | 3 | Sprint 1 | Must Have | None | Backend Dev |
| `US-02` | API xử lý giao dịch & tính toán cashback | 5 | Sprint 1 | Must Have | US-01 | Backend Dev |
| `US-03` | Màn hình xác nhận giao dịch & nhận thưởng | 3 | Sprint 2 | Must Have | US-02 | Frontend Dev |
| `US-04` | Xử lý lỗi ngoại lệ, timeout & retry | 3 | Sprint 2 | Should Have | US-02, US-03 | Fullstack Dev |
| `US-05` | Dashboard tra cứu lịch sử giao dịch cho Admin | 5 | Sprint 3 | Could Have | US-01 | Fullstack Dev |

---

## 2. Ma Trận Kiểm Thử Ca Biên (QA Edge Cases Matrix)

| Mã test | Kịch bản kiểm thử | Dữ liệu đầu vào | Kỳ vọng hệ thống (Expected Behavior) | Kết quả (Pass/Fail) |
| :--- | :--- | :--- | :--- | :---: |
| `TC-EDGE-01` | Người dùng nhập số tiền có giá trị âm hoặc 0 | `amount = -100` hoặc `0` | Báo lỗi validation phía Client ngay trước khi gửi API request. | |
| `TC-EDGE-02` | Rớt mạng đột ngột khi đang gửi request | Bật Airplane mode giữa chừng | App lưu local pending state, thông báo "Kiểm tra kết nối mạng", retry an toàn. | |
| `TC-EDGE-03` | Cổng đối tác timeout quá 30 giây | 30s no response | Circuit breaker kích hoạt, chuyển trạng thái giao dịch sang `PROCESSING_PENDING`, không báo fail giả tạo. | |
| `TC-EDGE-04` | Thao tác đồng thời từ 2 thiết bị khác nhau | Cùng bấm nút tại t = 0 | Distributed Lock ngăn chặn trừ tiền 2 lần, thiết bị thứ 2 nhận thông báo "Giao dịch đang được xử lý". | |

---

## 3. Kịch Bản Nghiệm Thu Người Dùng (UAT Scenarios)

### Kịch bản UAT 1: Luồng thanh toán hoàn tiền thành công trọn vẹn (End-to-End)
- **Người thực hiện:** Stakeholder (PO / Khách hàng đại diện)
- **Môi trường:** Staging / UAT Environment
- **Các bước thực hiện:**
  1. Đăng nhập tài khoản test `test_user_01` (số dư 200,000 VND).
  2. Chọn đơn hàng giá trị 100,000 VND.
  3. Kiểm tra thông tin hiển thị cashback ước tính (VD: 5,000 VND).
  4. Bấm "Thanh toán". Nhập mã PIN xác thực.
- **Tiêu chí nghiệm thu (Acceptance Criteria):**
  - Số dư tài khoản chính trừ đúng 100,000 VND.
  - Ví điểm/Ví cashback cộng đúng 5,000 VND ngay lập tức.
  - Lịch sử giao dịch hiển thị đúng mã, thời gian và trạng thái "Thành công".

---

## 4. Quy Trình Quản Lý Thay Đổi (Change Request - CR Log)

| Mã CR | Ngày yêu cầu | Người yêu cầu | Nội dung thay đổi đề xuất | Đánh giá tác động (Impact Analysis) | Quyết định (Approved/Rejected) |
| :--- | :--- | :--- | :--- | :--- | :---: |
| `CR-01` | YYYY-MM-DD | Stakeholder Name | Đổi tỷ lệ hoàn tiền từ cố định 5% sang động theo khung giờ vàng | Tăng thêm 3 Story Points vào Sprint 2; ảnh hưởng API calculation. | Approved |
