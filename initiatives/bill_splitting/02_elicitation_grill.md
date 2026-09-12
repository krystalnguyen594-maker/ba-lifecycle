# [PHASE 2] Khai Thác & Làm Rõ Yêu Cầu (Elicitation & Collaboration)

**Initiative Name:** Chia Hoá Đơn Nhóm Qua QR Code (Group Bill Splitting via QR)  
**Slug:** `bill_splitting`  
**Date:** 2026-09-13  
**BABOK Knowledge Area:** Elicitation & Collaboration  

---

## 1. Ngân Hàng Câu Hỏi Khai Thác Nghiệp Vụ (Cross-Department Question Bank)

### 1.1. Góc nhìn Trải nghiệm & Tăng trưởng (Product & Growth):
- *Làm sao để người được mời chia bill cảm thấy thoải mái mà không bị khó chịu vì cảm giác "đòi nợ"?* ➔ Thông điệp Push Notification được cá nhân hoá theo phong cách hóm hỉnh (Gamified microcopy: "Bạn có 1 kèo cưa đôi vui vẻ cùng @Nam"), kèm meme vui nhộn.
- *Có cho phép Host huỷ phòng chia bill hoặc chỉnh sửa lại số tiền sau khi đã phát hành QR không?* ➔ Cho phép huỷ nếu chưa có ai thanh toán. Nếu đã có người thanh toán thì chỉ cho phép điều chỉnh số tiền của các thành viên còn lại chưa trả.

### 1.2. Góc nhìn Kỹ thuật & Hạ tầng (Backend & Security):
- *Nếu 10 người trong bàn cùng quét QR và bấm thanh toán cùng 1 lúc (t = 0), làm sao tránh xung đột dữ liệu?* ➔ Áp dụng WebSocket để cập nhật trạng thái "Đã thanh toán" thời gian thực trên màn hình của Host; backend sử dụng cơ chế Pessimistic / Optimistic Locking trên bản ghi Room.
- *Phòng chia bill có tồn tại vĩnh viễn không?* ➔ Cần có thời gian hết hạn (Time-to-Live: 72 giờ). Sau 72h, phòng tự động đóng và tổng kết ai đã trả / ai chưa trả.

### 1.3. Góc nhìn Vận hành & Tài chính (Finance & Risk Ops):
- *Có thu phí giao dịch chia bill không?* ➔ Miễn phí 100% giữa các ví điện tử nội bộ để kích thích tăng trưởng người dùng P2P.
- *Hạn mức chia bill tối đa là bao nhiêu?* ➔ Tối đa 20,000,000 VND/phòng để tránh bị lợi dụng vào mục đích thương mại hoặc rửa tiền phi pháp.

---

## 2. Phân Tích Nghịch Đảo (Inversion Thinking & Pre-Mortem)

> **Kịch bản thảm hoạ:** Tính năng ra mắt được 1 tuần, nhóm bạn đi ăn tiệc 10 người, có 2 người dùng ngân hàng khác không có ví điện tử không trả được tiền; số tiền lẻ 100,000 chia 3 bị lỗi cộng dồn khiến hệ thống lệch 1 đồng không cho đóng phòng; người ứng tiền tức giận xoá app.

### Ma trận phòng vệ (Pre-Mortem Mitigation Matrix):
| Điểm lỗi tiềm tàng (Failure Mode) | Hậu quả (Impact) | Biện pháp ngăn chặn tiên quyết (Mitigation) |
| :--- | :--- | :--- |
| **Lỗi tiền lẻ phân số vô hạn** (100k / 3 = 33,333.33...) | Lệch đối soát kế toán, tổng số tiền các thành viên không khớp với bill gốc. | Áp dụng thuật toán **Remainder Distribution**: Làm tròn đến hàng nghìn gần nhất hoặc phân bổ 1 đồng lẻ vào thành viên Host. |
| **Thành viên lười mở app trả tiền** | Host phải gánh nợ xấu, tính năng bị chê vô dụng. | Nút "Nhắc nợ thông minh (Nudge)" tự động gửi thông báo cách nhau tối thiểu 4 tiếng/lần (tránh spam). |
| **Gian lận tạo phòng bill giả để đòi tiền người lạ** | Spam lừa đảo chuyển tiền. | Chỉ cho phép mời thành viên qua: Quét QR trực tiếp tại chỗ, hoặc thành viên có trong danh bạ điện thoại / bạn bè trên ví. |

---

## 3. Grill BA Decision Log (Nhật Ký Quyết Định Nghiệp Vụ Chốt Với BA)

### Quyết định 1: Thuật toán xử lý tiền lẻ không chia hết (Remainder Distribution)
- **Vấn đề:** Khi hoá đơn có giá trị lẻ (ví dụ 100,000 VND / 3 người = 33,333.33 VND).
- **Quyết định chốt:** **Phương án A (Recommended)**:
  - Hệ thống tự động làm tròn số tiền của các thành viên tham gia về số nguyên (33,333 VND).
  - Số tiền chênh lệch còn dư (1 đồng) được tự động cộng dồn/khấu trừ vào phần thanh toán của **Host (Người tạo phòng)**: 33,334 VND.
  - **Lợi ích:** Đảm bảo tổng tiền thu về luôn khớp chính xác 100.00% với giá trị bill gốc, không bị lệch đối soát kế toán và không gây bối rối cho khách mời.

### Quyết định 2: Hỗ trợ người dùng chưa cài đặt ứng dụng Ví điện tử (Non-wallet Users)
- **Vấn đề:** Không phải tất cả mọi người trong bàn tiệc đều đã cài ví điện tử.
- **Quyết định chốt:** **Phương án A (Recommended) - Mở rộng qua VietQR**:
  - Giao diện phòng chia bill sinh kèm mã **VietQR động** chuẩn Napas 247.
  - Người chưa có ví chỉ cần dùng app ngân hàng bất kỳ (Vietcombank, Techcombank, MB...) quét mã để chuyển khoản liên ngân hàng thẳng vào ví của Host kèm cú pháp giao dịch nhận diện tự động (`BILL_<ROOM_ID>_<MEMBER_ID>`).
  - Trang web thanh toán hiển thị banner hóm hỉnh: *"Tải app Ví điện tử ngay để nhận voucher 50k hoàn tiền cho bữa ăn sau"*.
  - **Lợi ích:** Giải quyết trọn vẹn bài toán thực tế (không làm gián đoạn bữa ăn của nhóm), đồng thời biến tính năng thành kênh thu hút người dùng mới (Organic Acquisition) cực kỳ tự nhiên.

