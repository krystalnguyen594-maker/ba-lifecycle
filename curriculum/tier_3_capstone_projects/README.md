# [TIER 3] Danh Mục Dự Án Thực Chiến (Capstone Projects & Case Studies)

Tầng 3 là giai đoạn đưa toàn bộ kiến thức của **Tầng 1 (Kỹ năng BABOK)** và **Tầng 2 (Nghiệp vụ Banking)** vào giải quyết các bài toán hóc búa nhất trong môi trường ngân hàng số thực tế.

Mỗi dự án đều được triển khai đầy đủ theo quy trình **Docs-as-Code 5 Phases** tại thư mục `initiatives/`:

---

## 📌 Bảng Tổng Hợp Các Dự Án Thực Chiến

| Mã Case | Tên Sáng Kiến / Bài Toán Ngân Hàng | Trọng Tâm Nghiệp Vụ & Kỹ Thuật | Trạng Thái & Đường Dẫn |
| :---: | :--- | :--- | :---: |
| **CS-01** | **Tự Động Hoàn Tiền Khi Lỗi Mạng Thanh Toán** *(Payment Network Error Auto-Refund)* | Xử lý timeout hệ thống phân tán 3 bên, Idempotency Key, Fast-query Backoff (5s, 15s, 60s), Transaction State Machine, Chống Race condition & rủi ro hoàn kép (Double-dip). | [Xem Chi Tiết](../../initiatives/payment_network_error_refund/README.md) |
| **CS-02** | **Chia Hoá Đơn Nhóm Bằng Mã QR** *(Group Bill Splitting via QR & Napas)* | Thuật toán phân bổ tiền lẻ (Remainder Distribution), Real-time Room WebSocket, Dynamic VietQR 247, Mô hình tăng trưởng K-Factor. | [Xem Chi Tiết](../../initiatives/bill_splitting/README.md) |
| **CS-03** | **Chương Trình Hoàn Tiền Tiêu Dùng Số** *(Cashback Loyalty Engine & Rules)* | Hệ thống tính toán ngân sách khuyến mãi, cơ chế chống gian lận lạm dụng Cashback (Fraud & Abuse), Bút toán kế toán chi phí Marketing. | [Xem Chi Tiết](../../initiatives/sample_e_wallet_cashback/README.md) |

---

## 🎯 Hướng Dẫn Thực Hành Cho Học Viên Banking BA

Khi nghiên cứu hoặc tự thiết kế một bài toán ngân hàng mới trong `initiatives/`, bạn cần tuân thủ 5 bước chuẩn hóa:
1. **Phase 1: `01_discovery_scoping.md`** - Định hình bài toán bằng *First Principles* & 5W1H, ma trận RACI và ranh giới MVP.
2. **Phase 2: `02_elicitation_grill.md`** - Đặt câu hỏi đa phòng ban (Biz, Tech, Ops, Legal), phân tích nghịch đảo *Pre-Mortem* và ghi lại nhật ký quyết định nghiệp vụ (*Grill Decision Log*).
3. **Phase 3: `03_analysis_modeling.md`** - Vẽ sơ đồ BPMN & Sequence Diagram, viết User Stories theo tiêu chí INVEST, đặc tả Acceptance Criteria chuẩn Gherkin, thiết kế Data Dictionary & REST API contract.
4. **Phase 4: `04_delivery_verification.md`** - Phân rã Sprint Backlog theo MoSCoW, ma trận kiểm thử biên QA Edge Cases, kịch bản UAT và khung Change Request.
5. **Phase 5: `05_solution_evaluation.md`** - Xây dựng Cây chỉ số North Star Metric, khung HEART Framework, Telemetry Funnel Tracking và kế hoạch đánh giá sau Go-Live.
