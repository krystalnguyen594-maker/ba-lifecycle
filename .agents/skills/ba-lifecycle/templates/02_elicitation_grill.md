# [PHASE 2] Khai Thác & Làm Rõ Yêu Cầu (Elicitation & Collaboration)

**Initiative Name:** `{{INITIATIVE_NAME}}`  
**Date:** `{{DATE}}`  
**BABOK Knowledge Area:** Elicitation & Collaboration  

---

## 1. Question Bank (Ngân Hàng Câu Hỏi Khai Thác Đa Chiều)
*Phân loại theo từng phòng ban và góc nhìn nghiệp vụ.*

### 1.1. Business & Product Strategy (PO, Sếp, Marketing)
- Mục tiêu kinh doanh ngắn hạn và dài hạn của tính năng này là gì?
- Đối tượng khách hàng mục tiêu ban đầu (Target Audience Persona)?
- Ngân sách (Budget) hoặc giới hạn khuyến mãi/chi phí cho phép?

### 1.2. Technical & Architecture (Tech Lead, DevOps, Security)
- Hệ thống hiện tại có sẵn API/Dữ liệu cần thiết chưa? Hay phải xây mới?
- Kỳ vọng về hiệu năng (P95 Response time, Concurrent Users peak)?
- Chính sách bảo mật, mã hóa dữ liệu nhạy cảm (PII, Token, Passwords)?

### 1.3. Operations & Support (Ops, CSKH, Fraud Detection)
- Khi người dùng gặp sự cố, CSKH cần màn hình tra cứu (Admin portal) gồm những thông tin gì?
- Quy trình đối soát và xử lý khiếu nại (Refund / Dispute resolution) diễn ra như thế nào?
- Các hành vi gian lận (Fraud / Abuse) tiềm tàng và ngưỡng cảnh báo tự động?

### 1.4. Legal & Compliance (Pháp chế, Tài chính)
- Tính năng này có chịu sự điều chỉnh của luật bảo vệ dữ liệu cá nhân hay quy định ngân hàng không?
- Quy định về lưu vết lịch sử giao dịch (Audit trail retention)?

---

## 2. Inversion Thinking & Pre-Mortem Analysis (Tư Duy Nghịch Đảo)
*Giả định tính năng ra mắt và thất bại thảm hại. Tìm ra nguyên nhân và giải pháp chặn đứng.*

| Kịch bản thất bại (Failure Scenario) | Nguyên nhân gốc rễ (Root Cause) | Giải pháp phòng ngừa tiên quyết (Preventative Action) |
| :--- | :--- | :--- |
| **Sập hệ thống giờ cao điểm** | Không có hàng đợi (Queue), nghẽn database lock. | Triển khai Rate Limiting, Redis Caching, Idempotency Key. |
| **Bị bào khuyến mãi / Rút ruột ngân sách** | User tạo tài khoản clone, dùng tool auto click. | KYC theo thiết bị (Device ID), gắn Captcha, giới hạn hạn mức/ngày. |
| **CSKH quá tải vì lỗi mơ hồ** | Hệ thống báo "Có lỗi xảy ra" mà không có mã lỗi rõ ràng. | Chuẩn hóa Error Code danh sách mã lỗi thân thiện, log chi tiết. |

---

## 3. Grill BA Decision Log (Nhật Ký Quyết Định Nghiệp Vụ)
*Ghi nhận các quyết định sau khi Agent "Grill" BA qua công cụ tương tác `ask_question`.*

### Quyết định 1: [Tên vấn đề quyết định]
- **Bối cảnh rẽ nhánh:** ...
- **Các phương án đã thảo luận (Options):**
  - Option A: ... (Ưu điểm: ... / Nhược điểm: ...)
  - Option B: ... (Ưu điểm: ... / Nhược điểm: ...)
- **Phương án được chọn:** `[Option A / B]`
- **Lý do & Ràng buộc đi kèm:** ...
- **Người phê duyệt (Sign-off):** BA Lead / PO
