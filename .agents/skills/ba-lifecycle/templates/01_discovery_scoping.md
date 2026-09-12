# [PHASE 1] Khởi Tạo & Định Hình Bài Toán (Discovery & Scoping)

**Initiative Name:** `{{INITIATIVE_NAME}}`  
**Date:** `{{DATE}}`  
**Author / BA Lead:** Principal AI BA & `{{USER_NAME}}`  
**BABOK Knowledge Area:** Strategy Analysis & Business Analysis Planning  

---

## 1. Problem Statement (5W1H)
*Áp dụng First Principles Thinking để xác định bài toán cốt lõi thay vì giả định ban đầu.*

| Câu hỏi | Chi tiết phân tích |
| :--- | :--- |
| **Who (Ai gặp vấn đề?)** | Mô tả rõ đối tượng chịu ảnh hưởng (End-user, Merchant, CSKH, Kế toán...). |
| **What (Vấn đề là gì?)** | Mô tả cụ thể triệu chứng, điểm đau (Pain points), sự cố hoặc rào cản hiện tại. |
| **Where (Xảy ra ở đâu?)** | Nền tảng (Mobile App, Web Portal, Internal Admin, Backend Service). |
| **When (Khi nào xảy ra?)** | Thời điểm, tần suất hoặc điều kiện kích hoạt vấn đề. |
| **Why (Tại sao nghiêm trọng?)** | Tác động tiêu cực đến doanh thu, tỷ lệ chuyển đổi, chi phí vận hành hoặc uy tín thương hiệu. |
| **How (Hiện tại đang xử lý thế nào?)** | Giải pháp tạm thời hiện có (Workaround) và chi phí/rủi ro của nó. |

---

## 2. Khung BACCM (Business Analysis Core Concept Model)

- **Need (Nhu cầu thực sự):** Vấn đề kinh doanh cốt lõi hoặc cơ hội thị trường cần nắm bắt.
- **Changes (Sự thay đổi cần tạo ra):** Những thay đổi về quy trình, hệ thống, con người để giải quyết Need.
- **Solution (Giải pháp đề xuất):** Mô tả giải pháp phần mềm/tính năng ở mức khái niệm (Conceptual Level).
- **Context (Bối cảnh doanh nghiệp):** Môi trường công nghệ hiện tại, xu hướng thị trường, đối thủ cạnh tranh, quy định pháp luật.
- **Value (Giá trị mang lại):** Lợi ích định lượng (Doanh thu tăng $X, Chi phí giảm Y%) và định tính (Trải nghiệm người dùng tốt hơn).
- **Stakeholders (Các bên liên quan):** Các phòng ban và nhóm người dùng chịu ảnh hưởng trực tiếp/gián tiếp.

---

## 3. Ma trận Phân công Trách nhiệm (Stakeholder RACI Matrix)

| Bên liên quan (Stakeholder) | Vai trò trong dự án | R (Responsible) | A (Accountable) | C (Consulted) | I (Informed) |
| :--- | :--- | :---: | :---: | :---: | :---: |
| Product Owner / Sponsor | Định hướng sản phẩm & ngân sách | | X | | |
| Business Analyst (BA) | Làm rõ yêu cầu & viết tài liệu | X | | | |
| Tech Lead / Architect | Thiết kế kiến trúc & thẩm định kỹ thuật | | | X | |
| Development Team (FE/BE) | Lập trình tính năng | X | | | |
| QA / QC Lead | Kiểm thử chất lượng | X | | | |
| Operations / CSKH | Vận hành & hỗ trợ khách hàng | | | X | X |
| Finance / Accounting | Đối soát tiền tệ & hóa đơn | | | X | X |
| Legal / Compliance | Rà soát pháp lý & bảo mật dữ liệu | | | X | X |

---

## 4. Ranh Giới Phạm Vi (Scope Boundaries: MVP vs Future)

### 4.1. Trong phạm vi (In-Scope - MVP)
- [ ] Tính năng cốt lõi 1...
- [ ] Tính năng cốt lõi 2...
- [ ] Các điểm tích hợp bắt buộc...

### 4.2. Ngoài phạm vi (Out-of-Scope - Phase 2+)
- [ ] Tính năng nâng cao hoãn lại...
- [ ] Tích hợp với hệ thống phụ chưa cấp thiết...

### 4.3. Ràng buộc & Giả định (Constraints & Assumptions)
- **Constraints (Ràng buộc):** Thời gian ra mắt (Deadline), giới hạn công nghệ (Legacy database), quy định pháp lý (Nghị định 13/GDPR).
- **Assumptions (Giả định):** Tỷ lệ người dùng chấp nhận, SLA của đối tác thứ 3 đạt > 99.5%.
