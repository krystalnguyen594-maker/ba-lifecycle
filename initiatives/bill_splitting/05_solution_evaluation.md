# [PHASE 5] Đánh Giá Sau Ra Mắt (Solution Evaluation)

**Initiative Name:** Chia Hoá Đơn Nhóm Qua QR Code (Group Bill Splitting via QR)  
**Slug:** `bill_splitting`  
**Date:** 2026-09-13  
**BABOK Knowledge Area:** Solution Evaluation  

---

## 1. Cây Chỉ Số Sản Phẩm (Product Metrics Tree & HEART Framework)

### 1.1. North Star Metric & Viral Growth
- **Chỉ số Cốt lõi (North Star):** **Hệ số Lan tỏa (Viral Coefficient - K-Factor)**.
  - **Công thức:** $K = i \times c$
    - $i$: Số lời mời chia bill trung bình mỗi Host gửi đi (Kỳ vọng: 3.5 lời mời/phòng).
    - $c$: Tỷ lệ người nhận tham gia thanh toán và tải app nếu là khách mới (Kỳ vọng: 38%).
  - **Mục tiêu:** $K \ge 1.33$ (Mỗi 100 người dùng Host sẽ lôi kéo thêm 133 người dùng mới/quay lại ví).

### 1.2. Đánh Giá Toàn Diện Theo Khung HEART

```mermaid
mindmap
  root((HEART Evaluation))
    Happiness
      Điểm CSAT tính năng chia bill >= 4.7/5
      Giảm 80% khiếu nại 'quên nợ / ngại đòi tiền'
    Engagement
      Trung bình 2.4 phòng chia bill/tháng/Host
      Tỷ lệ phản hồi thanh toán trong 30 phút đầu: 72%
    Adoption
      25% các hoá đơn F&B trên 100k được chuyển thành phòng chia bill
    Retention
      D30 Retention của người dùng tham gia chia bill đạt 52% (cao hơn 15% so với user thường)
    Task Success
      Thời gian hoàn tất tạo phòng: < 15 giây
      Tỷ lệ thu đủ tiền toàn phòng (Room Completion Rate): >= 89%
```

---

## 2. Đặc Tả Theo Dõi Phễu Chuyển Đổi (Funnel Tracking Specification)

| Bước Phễu | Event Name | Thuộc tính cần ghi nhận (Event Properties) | Tỷ lệ Drop-off mục tiêu |
| :--- | :--- | :--- | :---: |
| 1. Bấm nút "Chia bill" | `click_split_bill_entry` | `source` ('TX_HISTORY' / 'HOME_MENU'), `amount` | Baseline (100%) |
| 2. Khởi tạo phòng thành công | `split_room_created` | `room_id`, `num_members`, `split_type`, `total_amount` | Drop-off < 5% |
| 3. Thành viên quét xem hoá đơn | `split_room_viewed` | `room_id`, `member_type` ('IN_APP' / 'WEB_VIETQR') | Drop-off < 8% |
| 4. Bấm xác nhận thanh toán | `split_payment_initiated` | `room_id`, `member_id`, `method` | Drop-off < 4% |
| 5. Chuyển tiền thành công | `split_payment_completed` | `room_id`, `tx_id`, `amount`, `duration_seconds` | Lỗi < 0.2% |
| 6. Đóng phòng (Thu đủ tiền) | `split_room_completed` | `room_id`, `total_time_hours`, `member_count` | Hoàn tất >= 89% |

---

## 3. Lịch Trình Rà Soát Sau Go-Live (Post-Release Evaluation Plan)

| Mốc thời gian | Mục tiêu trọng tâm | Hành động chi tiết | Bên phụ trách |
| :--- | :--- | :--- | :--- |
| **D+1 (24h sau ra mắt)** | Kiểm tra độ ổn định & Webhook Napas | Giám sát tỷ lệ thành công của Webhook VietQR; kiểm tra độ trễ WebSocket. | Tech Lead, DevOps |
| **D+7 (Sau 1 tuần)** | Đo lường tỷ lệ tạo phòng & phễu chia bill | Phân tích xem người dùng chuộng "Chia đều" hay "Chia theo món"; rà soát các ca phòng bị treo > 72h. | BA, Product Owner |
| **D+30 (Sau 1 tháng)** | Đo lường K-Factor & Tỷ lệ chuyển đổi User mới | Thống kê số lượng tài khoản mới đăng ký sau khi quét trang Web VietQR; đo lường D30 Retention. | BA, Growth Team |
| **D+90 (Sau 1 quý)** | Lên kế hoạch Phase 2 (AI Bill Scanner OCR) | Thu thập User Feedback, khảo sát nhu cầu bóc tách hoá đơn tự động bằng camera để đưa vào Sprint kế tiếp. | Scrum Team |
