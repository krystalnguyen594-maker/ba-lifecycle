---
name: ba-mental-models
description: >-
  Provides advanced cognitive models and strategic frameworks for Business Analysts, including
  First Principles, Inversion (Pre-Mortem), Feynman Technique, Thought Experiments, and 2nd-Order Thinking.
  Use this skill to challenge assumptions, uncover edge cases, simplify complex logic, and prevent system blindspots.
---

# BA Mental Models & Cognitive Toolkit

Bộ công cụ tư duy chiến lược giúp nâng tầm IT Business Analyst từ người tiếp nhận yêu cầu thụ động (Order Taker) thành Chuyên gia giải quyết vấn đề (Strategic Problem Solver).

---

## 1. First Principles Thinking (Tư Duy Nguyên Bản)
- **Bản chất**: Phá vỡ bài toán về những sự thật cốt lõi nhất không thể phủ nhận (Fundemental Truths), loại bỏ mọi giả định "từ xưa đến nay vẫn làm thế" hoặc "đối thủ làm thế thì ta làm thế".
- **Ứng dụng trong BA**:
  - Khi stakeholder yêu cầu: *"Chúng tôi cần một màn hình nhập form 30 trường để kiểm tra thủ công"* ➔ Đặt câu hỏi: *"Dữ liệu nào hệ thống có thể tự lấy qua API? Bước nào có thể tự động duyệt dựa trên rule? Bản chất của việc này là để xác thực danh tính hay kiểm tra hạn mức?"*
  - Giúp tinh gọn quy trình, giảm 70% thao tác thừa cho người dùng.

---

## 2. Inversion Thinking & Pre-Mortem (Tư Duy Nghịch Đảo)
- **Bản chất**: *"Thay vì tìm cách để thành công, hãy tìm mọi cách khiến dự án thất bại thảm hại nhất có thể, rồi chặn đứng các con đường đó."* (Charlie Munger).
- **Ứng dụng trong BA**:
  - **Pre-Mortem**: Trước khi viết spec, BA tự đặt giả định: *"Dự án đã Go-Live được 1 tuần và đang bị khách hàng chửi thậm tệ, server bị sập, tiền công ty bị thất thoát. Chuyện gì đã xảy ra?"*
  - **Phát hiện gian lận (Fraud & Abuse)**: Kẻ xấu có thể tạo hàng ngàn tài khoản clone để rút tiền hoàn như thế nào? Điểm hở của logic khuyến mãi nằm ở đâu?
  - Dùng trong Phase 2 (Elicitation) để tạo ra các kịch bản Grill sắc bén.

---

## 3. Thought Experiments ("What-If" Scenarios)
- **Bản chất**: Tạo ra các phòng thí nghiệm trong tâm trí để thử nghiệm các tình huống cực đoan mà không tốn chi phí triển khai.
- **Ứng dụng trong BA**:
  - *"Điều gì xảy ra nếu mạng của người dùng bị đứt đúng mili-giây bấm nút thanh toán?"* ➔ Cần cơ chế Idempotency Key, retry an toàn.
  - *"Điều gì xảy ra nếu bên thứ 3 (cổng ngân hàng/SMS OTP) bị treo 60s không phản hồi?"* ➔ Cần Timeout Handling, Circuit Breaker, thông báo thân thiện.
  - *"Điều gì xảy ra nếu 10,000 người cùng bấm đổi 1 voucher duy nhất vào 00:00?"* ➔ Cần hàng đợi (Queue), cơ chế khoá phân tán (Distributed Lock).
  - Dùng để viết Acceptance Criteria và Error Handling hoàn hảo ở Phase 3.

---

## 4. 2nd-Order & 3rd-Order Thinking (Tư Duy Hệ Quả Dây Chuyền)
- **Bản chất**: *"Và sau đó thì sao?" (And then what?)*. Giải pháp bậc 1 có vẻ hoàn hảo nhưng có thể tạo ra thảm hoạ ở bậc 2 và bậc 3.
- **Ứng dụng trong BA**:
  - **Bậc 1**: Tăng tỉ lệ hoàn tiền (Cashback) lên 20% để thu hút user mới ➔ User tải app ồ ạt (Good).
  - **Bậc 2**: Đội ngũ Vận hành (Ops) và Đối soát (Reconciliation) bị nghẽn thủ công vì số lượng giao dịch tăng vọt; thâm hụt ngân sách Marketing.
  - **Bậc 3**: Gian lận rửa tiền xuất hiện; khi hạ cashback về 2%, user xóa app hàng loạt và đánh giá 1 sao.
  - Dùng để tham mưu cho PO và Sếp các chính sách phòng vệ (Circuit breaker, Quota limit, KYC tiering).

---

## 5. Feynman Technique (Kỹ Thuật Giải Thích Đơn Giản - ELI5)
- **Bản chất**: Nếu bạn không thể giải thích một logic phức tạp cho một người không có chuyên môn hiểu trong 2 phút, nghĩa là bạn chưa thực sự hiểu nó.
- **Ứng dụng trong BA**:
  - Tránh dùng thuật ngữ kỹ thuật khó hiểu (jargon) khi làm việc với Business/Ops.
  - Minh họa các thuật toán tính phí, điều kiện chia hoa hồng bằng sơ đồ trực quan (Mermaid Flowchart, bảng ma trận ví dụ cụ thể dạng $A + B = C$).
  - Giúp các bên liên quan đồng thuận (Alignment) nhanh chóng trong các buổi Refinement và Sign-off.

---

## 6. Big Picture & Systems Thinking (Góc Nhìn Toàn Cảnh)
- **Bản chất**: Không bao giờ tối ưu hoá cục bộ một tính năng mà làm tổn hại đến toàn bộ hệ sinh thái sản phẩm.
- **Ứng dụng trong BA**:
  - Luôn trả lời: Tính năng này đóng góp gì vào mục tiêu quý (OKR) và North Star Metric của công ty?
  - Hành trình người dùng (User Journey) trước và sau khi dùng tính năng này là gì? Có bị gãy luồng cảm xúc hay không?
