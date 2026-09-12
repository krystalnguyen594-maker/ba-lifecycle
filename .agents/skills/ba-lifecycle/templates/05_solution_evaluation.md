# [PHASE 5] Đánh Giá Sau Ra Mắt (Solution Evaluation)

**Initiative Name:** `{{INITIATIVE_NAME}}`  
**Date:** `{{DATE}}`  
**BABOK Knowledge Area:** Solution Evaluation  

---

## 1. Cây Chỉ Số Sản Phẩm (Product Analytics Metrics Tree)

### 1.1. North Star Metric (Chỉ số Ngôi sao Bắc Đẩu)
- **Chỉ số:** `[Tên chỉ số, VD: Tổng giá trị giao dịch phát sinh qua hoàn tiền - Total Cashback GMV]`
- **Mục tiêu định lượng:** Tăng trưởng 25% sau 60 ngày Go-Live.

### 1.2. Khung Chỉ Số Đánh Giá (HEART Framework)
- **Happiness (Sự hài lòng):** Điểm đánh giá tính năng trên in-app survey (CSAT >= 4.5/5).
- **Engagement (Mức độ tương tác):** Tần suất sử dụng tính năng/user/tuần (Average Active Days >= 3 ngày/tuần).
- **Adoption (Mức độ tiếp nhận):** Tỷ lệ người dùng thử tính năng trong 14 ngày đầu (Adoption Rate >= 35%).
- **Retention (Tỷ lệ quay lại):** Tỷ lệ người dùng lặp lại giao dịch ở tháng thứ 2 (Day-30 Retention >= 40%).
- **Task Success (Tỷ lệ hoàn thành tác vụ):** Tỷ lệ thanh toán không bị lỗi (Transaction Success Rate >= 99.2%).

---

## 2. Đặc Tả Phễu Theo Dõi (Funnel Tracking Specification)

| Bước trong phễu | Tên Event Tracking | Thuộc tính sự kiện (Event Properties) | Tỷ lệ rơi rụng cho phép (Max Drop-off) |
| :--- | :--- | :--- | :---: |
| Bước 1: Mở màn hình thanh toán | `view_payment_screen` | `source_screen`, `user_tier`, `order_amount` | Baseline |
| Bước 2: Nhấn áp dụng cashback | `click_apply_cashback` | `cashback_id`, `reward_percentage` | <= 10% |
| Bước 3: Xác nhận thanh toán | `submit_payment_button` | `payment_method`, `final_amount` | <= 5% |
| Bước 4: Hoàn tất giao dịch | `payment_success` | `tx_id`, `duration_ms`, `cashback_earned` | <= 1% |

---

## 3. Kế Hoạch Đánh Giá & Thu Thập Ý Kiến Định Kỳ (Post-Launch Review Plan)

| Thời điểm | Mục tiêu đánh giá | Hành động cụ thể | Người phụ trách |
| :--- | :--- | :--- | :--- |
| **D+1 (24h sau Go-Live)** | Ổn định hệ thống & không có lỗi Crash | Kiểm tra Sentry, New Relic logs, tỷ lệ lỗi 5xx. | Tech Lead, DevOps |
| **D+7 (Sau 1 tuần)** | Đo lường tỷ lệ tiếp nhận ban đầu | Rà soát chỉ số Drop-off phễu, phản hồi từ CSKH/Ticket. | BA, Product Owner |
| **D+30 (Sau 1 tháng)** | Đánh giá ROI & tác động kinh doanh | Báo cáo doanh thu, ngân sách hoàn tiền thực tế vs kế hoạch. | BA, Finance, PO |
| **D+90 (Sau 1 quý)** | Quyết định mở rộng hoặc điều chỉnh rule | Họp Retrospective toàn diện, đề xuất cải tiến Version 2.0. | Scrum Team |
