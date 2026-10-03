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

### Câu 1: *"Kể lại một lần Khối Kinh Doanh (Product/Business) và Khối Quản Trị Rủi Ro (Risk/Compliance) mâu thuẫn gay gắt về một yêu cầu nghiệp vụ, bạn đã làm gì để giải quyết?"*
- **Gợi ý phân tích của nhà tuyển dụng:** Người phỏng vấn muốn xem bạn có tư duy dựa trên dữ liệu (Data-driven), hiểu biết pháp lý (Regulatory Awareness) và khả năng tối ưu trải nghiệm khách hàng (Customer-Centricity) mà không vi phạm quy định.
- **Câu trả lời chuẩn STAR mẫu:**
  - **Situation:** Trong dự án nâng cấp tính năng Mở tài khoản eKYC trên ứng dụng số theo **Thông tư 17/2024/TT-NHNN**, Khối Rủi ro yêu cầu bắt buộc 100% người dùng phải quét NFC CCCD gắn chip và khớp sinh trắc học với dữ liệu C06 Bộ Công An. Khối Kinh doanh phản đối gay gắt vì lo ngại tỷ lệ rớt phễu (drop-off rate) sẽ tăng vọt do người dùng gặp khó khăn khi tìm vị trí chạm chip NFC trên điện thoại.
  - **Task:** Với vai trò BA, tôi cần tìm ra giải pháp đảm bảo tuân thủ 100% quy định pháp luật của NHNN (không có ngoại lệ bỏ qua NFC) nhưng phải triệt tiêu tối đa sự ức chế của khách hàng để bảo vệ chỉ số hoàn tất mở tài khoản (Onboarding Completion Rate).
  - **Action:** Tôi tiến hành phân tích nhật ký lỗi (Error Logs) và nhận thấy 80% lỗi quét NFC thất bại là do người dùng đặt sai vị trí thẻ hoặc di chuyển thẻ quá nhanh trong quá trình đọc chip. Tôi đã đề xuất 3 cải tiến sản phẩm:
    1. *Tối ưu UX ngữ cảnh:* Tự động nhận diện dòng máy điện thoại (Device Detection) để hiển thị hình ảnh động (Animation) hướng dẫn chính xác vị trí đặt thẻ (iPhone đặt ở đỉnh camera sau, Samsung/Xiaomi đặt ở giữa lưng).
    2. *Phản hồi xúc giác & âm thanh:* Rung nhẹ điện thoại khi kết nối NFC thành công để người dùng giữ yên thẻ trong 2 giây.
    3. *Kênh Fallback hợp chuẩn:* Với thiết bị không hỗ trợ NFC, ứng dụng hướng dẫn người dùng kết nối luồng Video KYC hoặc đặt lịch hẹn nhận thẻ tại Kiosk/Chi nhánh gần nhất.
  - **Result:** Tỷ lệ quét NFC thành công ngay lần đầu tăng từ 54% lên 86%, thời gian hoàn tất mở tài khoản rút ngắn xuống còn 2 phút 15 giây. Dự án nghiệm thu đúng hạn và được Hội đồng Khối Rủi ro lẫn Khối Kinh doanh đánh giá rất cao.

---

### Câu 2: *"Khi một Stakeholder cấp cao (như Giám đốc Khối) đột ngột yêu cầu bổ sung một tính năng lớn ngay giữa Sprint đang chạy (Scope Creep), bạn xử lý như thế nào?"*
- **Gợi ý phân tích của nhà tuyển dụng:** Đánh giá khả năng bảo vệ Sprint Goal của đội ngũ Dev, thái độ chuyên nghiệp và sự hiểu biết về quy trình Agile trong ngân hàng.
- **Câu trả lời chuẩn STAR mẫu:**
  - **Situation:** Vào ngày thứ 6 của một Sprint kéo dài 2 tuần, Giám đốc Khối Thẻ yêu cầu bổ sung ngay một tính năng "Tặng quà voucher sinh nhật tự động" để kịp chương trình lễ hội vào cuối tuần tới.
  - **Task:** Với vai trò BA phối hợp cùng Product Owner, tôi cần bảo vệ cam kết công việc hiện tại của đội ngũ kỹ sư, tránh việc chuyển nợ kỹ thuật hoặc làm vỡ kế hoạch Sprint, nhưng vẫn giải quyết được mong muốn kinh doanh cấp bách của Sếp.
  - **Action:** Tôi lắng nghe kỹ mục tiêu kinh doanh của yêu cầu. Thay vì từ chối thẳng thừng, tôi thực hiện phân tích tác động nhanh (Quick Impact Assessment): việc chen ngang tính năng này sẽ khiến 2 User Story cốt lõi của Sprint bị dời lại. Tôi cùng PO trao đổi lại với Giám đốc Khối theo 2 phương án: Phương án 1 là áp dụng giải pháp thủ công ngắn hạn (Ops gửi mã voucher qua tin nhắn SMS Marketing vào cuối tuần) để chiến dịch kinh doanh không bị lỡ; Phương án 2 là đưa tính năng tự động này lên vị trí ưu tiên số 1 của Sprint kế tiếp để phát triển bài bản, có đầy đủ kiểm thử bảo mật.
  - **Result:** Giám đốc đồng ý với giải pháp linh hoạt này. Đội ngũ Dev hoàn thành 100% mục tiêu Sprint hiện tại, và tính năng tặng quà tự động được bàn giao hoàn hảo ở Sprint sau mà không phát sinh lỗi hệ thống.

---

### Câu 3: *"Kể về một tình huống bạn phải làm việc dưới sức ép thời hạn ngặt nghèo (Tight Deadline) hoặc dự án có hạn chót pháp lý bắt buộc (Regulatory Hard Deadline)?"*
- **Gợi ý phân tích của nhà tuyển dụng:** VPBank rất coi trọng tinh thần **Ownership (Chủ động chịu trách nhiệm)** và **Agility (Tốc độ & Thích ứng)**.
- **Câu trả lời chuẩn STAR mẫu:**
  - **Situation:** Dự án tích hợp Xác thực Sinh trắc học theo Quyết định 2345/QĐ-NHNN có thời hạn bắt buộc toàn quốc là ngày 01/07/2024. Đội dự án chỉ còn đúng 4 tuần để hoàn thiện tích hợp SDK sinh trắc học và kiểm thử tải với Core Banking.
  - **Task:** Tôi phụ trách viết tài liệu yêu cầu chi tiết (BRD) và phối hợp với đội QA xây dựng bộ kịch bản kiểm thử (Test Matrix) cho tất cả các luồng chuyển tiền trên 10 triệu đồng.
  - **Action:** Tôi chủ động bẻ nhỏ phạm vi dự án theo nguyên tắc **MVP First**: Ưu tiên luồng chuyển tiền Napas 24/7 trước (chiếm 85% giao dịch), các luồng nội bộ và thanh toán hóa đơn đưa vào pha kế tiếp. Để đẩy nhanh tiến độ, tôi chuyển giao User Story từng phần (Incremental Handover) ngay khi hoàn thành thay vì chờ viết xong cả tài liệu lớn, đồng thời trực tiếp ngồi cùng đội Dev để giải thích rõ mã lỗi trả về từ đối tác cung cấp giải pháp Face Matching.
  - **Result:** Tính năng được đóng gói và thử nghiệm thành công trước ngày G-Day 5 ngày. Vào ngày 01/07/2024, hệ thống vận hành ổn định xử lý hơn 200,000 lượt xác thực khuôn mặt thành công, không xảy ra sự cố nghẽn mạng nghiêm trọng.

---

### Câu 4: *"Trong một buổi làm việc nhóm, khi các thành viên tranh cãi không thống nhất được phương án giải quyết bài toán, bạn làm gì để đưa nhóm về đích?"*
- **Gợi ý phân tích của nhà tuyển dụng:** Đây là câu hỏi kinh điển để đánh giá tố chất của ứng viên vòng **Assessment Center / Case Study Group** của VPBank Young Talents.
- **Câu trả lời chuẩn STAR mẫu:**
  - **Situation:** Trong một buổi thảo luận nhóm giải bài toán tăng trưởng người dùng cho ứng dụng ngân hàng số, hai bạn trong nhóm tranh cãi gay gắt: một bạn muốn dồn ngân sách vào chạy quảng cáo tặng tiền thưởng (Cashback), bạn kia muốn dồn tiền xây dựng tính năng Gamification (chơi game tích điểm). Thời gian chỉ còn 15 phút là phải thuyết trình trước ban giám khảo.
  - **Task:** Tôi cần can thiệp để hạ nhiệt cuộc tranh luận, tái định hình mục tiêu và giúp cả nhóm đồng thuận một phương án tối ưu trong thời gian giới hạn.
  - **Action:** Tôi chủ động đóng vai trò điều phối: (1) Tôi nhắc lại đề bài ban đầu của giám khảo là *Tăng trưởng bền vững gắn với chi phí chuyển đổi (CAC)*; (2) Tôi vẽ một bảng so sánh nhanh 2x2 gồm hai trục: Chi phí triển khai và Hiệu quả giữ chân người dùng (Retention); (3) Tôi đề xuất giải pháp kết hợp dạng **Phễu (Funnel Approach)**: Dùng gói Cashback nhỏ làm mồi nhử thu hút user cài app trong 7 ngày đầu, sau đó dẫn dắt họ vào vòng lặp Gamification để giữ chân lâu dài.
  - **Result:** Cả nhóm đồng tình 100% với phương án dung hoà này. Nhóm hoàn thành bài thuyết trình đúng giờ, phân công rõ ràng người trình bày số liệu và người bảo vệ giải pháp, được ban giám khảo đánh giá là nhóm có sự phối hợp và tư duy chiến lược tốt nhất buổi thi.

