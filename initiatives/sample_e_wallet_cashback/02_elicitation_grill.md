# [PHASE 2] Khai Thác & Làm Rõ Yêu Cầu (Elicitation & Collaboration)

**Initiative Name:** Ví Điện Tử Hoàn Tiền Động & Gamification  
**Slug:** `sample_e_wallet_cashback`  
**Date:** 2026-09-13  
**BABOK Area:** Elicitation & Collaboration  

---

## 1. Ngân Hàng Câu Hỏi Khai Thác Nghiệp Vụ (Cross-Department Elicitation)

### Góc nhìn Kế toán / Tài chính (Finance & Accounting):
- *Tiền hoàn lại lấy từ đâu ra?* ➔ Quỹ ngân sách khuyến mãi Marketing (Promo Budget) được hạch toán trước mỗi đầu tháng.
- *Khi đơn hàng gốc bị Huỷ / Hoàn tiền (Refund) thì số tiền cashback đã cộng có bị thu hồi không?* ➔ Cần cơ chế thu hồi (Clawback) hoặc khấu trừ âm điểm thưởng.

### Góc nhìn Vận hành & Chống gian lận (Risk & Fraud Ops):
- *Kẻ xấu có thể tạo 10,000 tài khoản ảo để cào thưởng rồi rút tiền về tài khoản ngân hàng không?* ➔ Bắt buộc tài khoản đã KYC cấp độ 2 mới được rút tiền; điểm thưởng cashback chỉ được dùng để thanh toán dịch vụ (utility bills) thay vì rút thẳng về ATM.

### Góc nhìn Kỹ thuật & Hạ tầng (DevOps & Backend):
- *Vào khung giờ Flash Sale (12h trưa), nếu 50,000 user cùng thanh toán và cào thưởng đồng thời, hệ thống có bị nghẽn không?* ➔ Cần kiến trúc Event-Driven (Kafka message queue), tách rời việc ghi nhận thanh toán gốc và việc tính thưởng bất đồng bộ (Asynchronous Worker).

---

## 2. Phân Tích Nghịch Đảo (Inversion Thinking & Pre-Mortem)

> **Kịch bản thảm họa:** Tính năng ra mắt được 3 ngày, ngân sách Marketing 1 tỷ bị cạn kiệt trong 6 tiếng vì một nhóm "thợ săn khuyến mãi" phát hiện kẽ hở tạo đơn hàng giả 1,000 VND để nhận hoàn 10,000 VND.

### Bảng đối sách phòng thủ (Defense Mechanisms):
| Lỗ hổng tiềm tàng (Failure Vector) | Điểm yếu hệ thống | Giải pháp chặn đứng (Mitigation) |
| :--- | :--- | :--- |
| **Bào tiền từ đơn hàng siêu nhỏ** | Không có chặn giá trị giao dịch tối thiểu. | Đơn hàng phải từ 50,000 VND trở lên mới đủ điều kiện kích hoạt cào thẻ. |
| **Spam request bằng tool/bot** | Không kiểm tra tốc độ request (Rate limit). | Giới hạn 1 request/giây/user; tích hợp reCAPTCHA v3 tàng hình khi phát hiện chỉ số trust score thấp. |
| **Lỗi mạng khiến user cào 2 lần** | Thiếu tính duy nhất của lượt cào. | Sinh `reward_token` gắn chặt với `transaction_id`. Token tự hủy (expire) ngay sau lần đọc đầu tiên. |

---

## 3. Nhật Ký "Grill BA" (Grill BA Decision Log)

Agent đã phỏng vấn và phản biện lại BA Lead về 3 quyết định kinh doanh sống còn:

### Quyết định 1: Cơ chế xử lý hoàn tiền khi đơn hàng bị trả lại (Order Refund / Cancellation)
- **Vấn đề:** Khi khách mua hàng ở Shopee/Tiki qua ví, được nhận 20,000 VND cashback và đã tiêu hết số cashback đó. Hôm sau khách bấm "Trả hàng/Hoàn tiền".
- **Các phương án phân tích:**
  - *Option A (Cắt thẳng):* Không cho hoàn đơn hàng nếu số dư ví cashback không đủ 20,000 VND để trừ lại. ➔ *(Bị loại vì làm gãy trải nghiệm mua sắm của khách, vi phạm chính sách sàn thương mại).*
  - *Option B (Recommended):* Cho phép số dư ví điểm âm tạm thời. Giao dịch kế tiếp sẽ tự động bù trừ. ➔ **ĐÃ CHỌN**.
- **BA Sign-off:** Chấp thuận Option B. Hệ thống sẽ ghi nhận trạng thái ví điểm âm và gửi thông báo lịch sự.

### Quyết định 2: Giới hạn ngân sách an toàn (Circuit Breaker)
- **Vấn đề:** Nếu thuật toán random bị lỗi cấp phát tỷ lệ 10% liên tục, làm sao bảo vệ quỹ công ty?
- **Quyết định đã chốt:**
  - Cài đặt Hard Cap: Ngân sách hoàn tiền tối đa 50,000,000 VND/ngày.
  - Khi chạm 90% ngưỡng (45 triệu), hệ thống tự động kích hoạt chế độ "An toàn": hạ tỷ lệ hoàn tiền về 1% mặc định và bắn cảnh báo khẩn cấp (Slack / PagerDuty) đến Head of Growth.
