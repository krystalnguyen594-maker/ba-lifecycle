# [PHỎNG VẤN BANKING BA] Phần 1: Câu Hỏi Hành Vi (Behavioral) & Quản Lý Xung Đột Stakeholder

**Mục tiêu bài học:** Chuẩn bị câu trả lời thuyết phục chuẩn cấu trúc **STAR (Situation - Task - Action - Result)** cho các câu hỏi hành vi thường gặp nhất tại các buổi phỏng vấn vị trí Business Analyst của Ngân hàng.

---

## 1. Khung Trả Lời STAR Là Gì?

- **S - Situation (Bối cảnh):** Mô tả ngắn gọn tình huống thực tế, dự án bạn đang tham gia, khó khăn gặp phải là gì (30 giây).
- **T - Task (Nhiệm vụ):** Mục tiêu cụ thể mà bạn với tư cách là BA cần phải đạt được (15 giây).
- **A - Action (Hành động):** Bạn đã áp dụng kỹ năng gì (phỏng vấn, phân tích dữ liệu, vẽ sơ đồ, tổ chức workshop) để giải quyết vấn đề (60 giây).
- **R - Result (Kết quả):** Số liệu định lượng chứng minh thành công (giảm % rớt phễu, bàn giao đúng hạn, tiết kiệm chi phí) và bài học rút ra (30 giây).

---

## 2. Các Câu Hỏi Hành Vi Kinh Điển Kèm Câu Trả Lời Mẫu

### Câu 1: *"Kể lại một lần Khối Kinh Doanh (Product/Business) và Khối Quản Trị Rủi Ro (Risk/Legal) mâu thuẫn gay gắt về một yêu cầu nghiệp vụ, bạn đã làm gì để giải quyết?"*
- **Gợi ý phân tích của nhà tuyển dụng:** Người phỏng vấn muốn xem bạn có kỹ năng thương lượng (Negotiation) và tư duy dựa trên dữ liệu (Data-driven) hay chỉ là người thụ động nghe bên nào to mồm hơn.
- **Câu trả lời chuẩn STAR mẫu:**
  - **Situation:** Trong dự án triển khai tính năng Mở tài khoản trực tuyến eKYC, Khối Kinh doanh muốn lược bỏ bước quét NFC CCCD vì sợ làm tăng thời gian thao tác khiến khách hàng nản lòng bỏ app; trong khi Khối Quản trị Rủi ro kiên quyết yêu cầu quét NFC 100% để chống giả mạo hồ sơ theo yêu cầu bảo mật.
  - **Task:** Tôi là BA phụ trách luồng Onboarding, cần tìm ra giải pháp vừa đảm bảo tuân thủ tuyệt đối quy định an toàn của ngân hàng, vừa không làm sụt giảm tỷ lệ chuyển đổi của chiến dịch marketing đang chạy.
  - **Action:** Tôi không tranh cãi bằng cảm tính mà đã phân tích dữ liệu thiết bị của người dùng: 32% khách hàng mục tiêu sử dụng điện thoại đời cũ không hỗ trợ NFC hoặc chưa kích hoạt tính năng này. Tôi đã đề xuất giải pháp **Phân tầng tài khoản theo mức độ rủi ro (Risk-Based Tiering)**: Khách hàng không quét NFC vẫn được mở tài khoản Hạn mức Cơ bản (Tier 1: Giao dịch tối đa 5 triệu/ngày, chỉ thanh toán hoá đơn, không cho vay); khi khách hàng có nhu cầu nâng hạn mức lên Tier 2 hoặc mở thẻ tín dụng, hệ thống mới yêu cầu quét NFC hoặc đến quầy giao dịch. Tôi tổ chức một buổi JAD Workshop trình bày ma trận đánh đổi và nguyên mẫu màn hình (wireframe) luồng này.
  - **Result:** Cả hai bên đều hài lòng và ký duyệt giải pháp ngay trong buổi họp. Sau khi Go-Live, tỷ lệ hoàn tất mở tài khoản đạt 88%, đồng thời không phát sinh bất kỳ trường hợp gian lận danh tính nào trong suốt 6 tháng đầu tiên.

---

### Câu 2: *"Khi một Stakeholder cấp cao (như Giám đốc Khối) đột ngột yêu cầu bổ sung một tính năng lớn ngay giữa Sprint đang chạy (Scope Creep), bạn xử lý như thế nào?"*
- **Gợi ý phân tích của nhà tuyển dụng:** Đánh giá khả năng bảo vệ Sprint Goal của đội ngũ Dev, thái độ chuyên nghiệp và sự hiểu biết về quy trình Agile trong ngân hàng.
- **Câu trả lời chuẩn STAR mẫu:**
  - **Situation:** Vào ngày thứ 6 của một Sprint kéo dài 2 tuần, Giám đốc Khối Thẻ yêu cầu bổ sung ngay một tính năng "Tặng quà voucher sinh nhật tự động" để kịp chương trình lễ hội vào cuối tuần tới.
  - **Task:** Với vai trò BA phối hợp cùng Product Owner, tôi cần bảo vệ cam kết công việc hiện tại của đội ngũ kỹ sư, tránh việc chuyển nợ kỹ thuật hoặc làm vỡ kế hoạch Sprint, nhưng vẫn giải quyết được mong muốn kinh doanh cấp bách của Sếp.
  - **Action:** Tôi lắng nghe kỹ mục tiêu kinh doanh của yêu cầu. Thay vì từ chối thẳng thừng, tôi thực hiện phân tích tác động nhanh (Quick Impact Assessment): việc chen ngang tính năng này sẽ khiến 2 User Story cốt lõi của Sprint bị dời lại. Tôi cùng PO trao đổi lại với Giám đốc Khối theo 2 phương án: Phương án 1 là áp dụng giải pháp thủ công ngắn hạn (Ops gửi mã voucher qua tin nhắn SMS Marketing vào cuối tuần) để chiến dịch kinh doanh không bị lỡ; Phương án 2 là đưa tính năng tự động này lên vị trí ưu tiên số 1 của Sprint kế tiếp để phát triển bài bản, có đầy đủ kiểm thử bảo mật.
  - **Result:** Giám đốc đồng ý với giải pháp linh hoạt này. Đội ngũ Dev hoàn thành 100% mục tiêu Sprint hiện tại, và tính năng tặng quà tự động được bàn giao hoàn hảo ở Sprint sau mà không phát sinh lỗi hệ thống.
