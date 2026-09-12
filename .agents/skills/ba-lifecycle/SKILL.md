---
name: ba-lifecycle
description: >-
  Executes the automated 5-phase IT Business Analyst lifecycle aligned with BABOK v3 and Scrum/Agile.
  Use this skill whenever the user submits a business problem, feature request, epic, or PRD requirement.
---

# BA Lifecycle Orchestrator (BABOK v3 & Scrum/Agile)

Skill này điều phối và tự động hoá quy trình phân tích bài toán 5 bước cho IT Business Analyst trong dự án Scrum/Agile, tuân thủ chặt chẽ khung năng lực BABOK v3.

## Cấu Trúc 5 Phases Chuẩn Hoá

Mỗi sáng kiến (Initiative) được khởi tạo tại thư mục `initiatives/<initiative_slug>/` với 5 tài liệu thành phần:

```text
initiatives/<initiative_slug>/
├── README.md                     # Dashboard tổng quan sáng kiến (Executive Summary)
├── 01_discovery_scoping.md       # Phase 1: Problem Statement, BACCM, Stakeholders, In/Out Scope
├── 02_elicitation_grill.md       # Phase 2: Question Bank, Elicitation Notes, Grill Decision Log
├── 03_analysis_modeling.md       # Phase 3: Flowcharts, Epics, INVEST Stories, Gherkin AC, API & Data Spec
├── 04_delivery_verification.md   # Phase 4: Sprint Backlog, QA Edge Cases, UAT Test Cases, Change Log
└── 05_solution_evaluation.md     # Phase 5: Metrics Tree, Funnel Tracking, Post-Launch Evaluation
```

---

## Quy Trình Thực Hiện Chi Tiết

### Phase 1: Khởi Tạo & Định Hình Bài Toán (Discovery & Scoping)
- **Mục tiêu**: Làm rõ bài toán gốc từ Sếp/PO/Khách hàng, tránh bẫy "nhảy ngay vào giải pháp".
- **Áp dụng Mental Model**: *First Principles Thinking* & *Big Picture*.
- **Nội dung cần tạo (`01_discovery_scoping.md`)**:
  1. **Problem Statement (5W1H)**: Ai gặp vấn đề? Vấn đề xảy ra khi nào/ở đâu? Tại sao nghiêm trọng?
  2. **BACCM Framework**: 6 yếu tố cốt lõi (Need, Changes, Solution, Context, Value, Stakeholders).
  3. **Stakeholder RACI Matrix**: Responsible, Accountable, Consulted, Informed.
  4. **Scope Boundaries**: Danh sách tính năng Trong phạm vi (In-Scope) và Ngoài phạm vi (Out-of-Scope) cho phiên bản MVP.

### Phase 2: Khai Thác & Làm Rõ Yêu Cầu (Elicitation & Collaboration)
- **Mục tiêu**: Đào sâu các góc khuất nghiệp vụ giữa các phòng ban (Tech, Ops, Finance, Legal, Marketing).
- **Áp dụng Mental Model**: *Inversion Thinking (Pre-Mortem)*.
- **Nội dung cần tạo (`02_elicitation_grill.md`)**:
  1. **Question Bank**: Bộ câu hỏi đào sâu theo từng phòng ban và persona.
  2. **Rủi ro & Giả định (Risks & Assumptions)**: Đặt ra các kịch bản thất bại / gian lận (Fraud/Abuse).
- **CƠ CHẾ "GRILL BA" (BẮT BUỘC)**:
  - Khi phát hiện các điểm rẽ nhánh quan trọng (ví dụ: Quyết định giới hạn hạn mức giao dịch, chính sách hoàn tiền khi lỗi mạng, cách xử lý tài khoản gian lận, trade-off giữa trải nghiệm vs bảo mật):
  - Agent **KHÔNG ĐƯỢC TỰ Ý ĐOÁN BỪA**.
  - Gọi công cụ `ask_question`:
    - Tạo các câu hỏi trắc nghiệm rõ ràng.
    - Luôn kèm theo phân tích Pros/Cons và đánh dấu phương án `(Recommended)`.
    - Ghi nhận quyết định của BA vào mục **Grill Decision Log** trong tài liệu.

### Phase 3: Phân Tích & Đặc Tả Giải Pháp (Analysis & Modeling)
- **Mục tiêu**: Chuyển hoá yêu cầu nghiệp vụ thành đặc tả kỹ thuật chi tiết sẵn sàng cho Dev và QA.
- **Áp dụng Mental Model**: *Thought Experiments ("What-If")* & *Feynman Technique*.
- **Nội dung cần tạo (`03_analysis_modeling.md`)**:
  1. **Sơ đồ luồng nghiệp vụ (Mermaid Flowchart / Sequence Diagram)**:
     - Luồng chuẩn (Happy Path)
     - Luồng ngoại lệ & xử lý lỗi (Exception / Edge Case Flow)
  2. **User Stories (Chuẩn INVEST)**:
     - Cấu trúc: `As a <User>, I want to <Action>, So that <Benefit>`
  3. **Acceptance Criteria (AC chuẩn Gherkin)**:
     - `Scenario: ...`
     - `Given [Tiền điều kiện]`
     - `When [Hành động]`
     - `Then [Kết quả mong đợi]`
  4. **Data Dictionary & API Contract Spec**:
     - Định nghĩa Entity, Data Types, Constraints (Validation Rules).
     - Định dạng Request/Response JSON (RESTful hoặc GraphQL).

### Phase 4: Đồng Hành Triển Khai & Kiểm Thử (Delivery & Verification)
- **Mục tiêu**: Chuẩn bị cho Sprint Planning, Refinement và nghiệm thu tính năng.
- **Áp dụng Mental Model**: *2nd-Order Thinking*.
- **Nội dung cần tạo (`04_delivery_verification.md`)**:
  1. **Sprint Backlog Breakdown**: Phân chia Epics thành Stories nhỏ (< 5 Story Points), độ ưu tiên MoSCoW (Must, Should, Could, Won't).
  2. **QA Edge Cases Test Matrix**: Danh sách các ca kiểm thử biên (Boundary values, Concurrency, Timeout, Invalid input).
  3. **UAT Test Scenarios**: Kịch bản nghiệm thu thực tế từng bước cho người dùng/khách hàng.
  4. **Change Request (CR) Log**: Khung ghi nhận và đánh giá tác động khi có thay đổi nghiệp vụ giữa chừng.

### Phase 5: Đánh Giá Sau Ra Mắt (Evaluation)
- **Mục tiêu**: Đảm bảo tính năng mang lại giá trị thực tế sau khi Go-Live.
- **Áp dụng Mental Model**: *Systems Thinking*.
- **Nội dung cần tạo (`05_solution_evaluation.md`)**:
  1. **Product Analytics Metrics Tree**:
     - North Star Metric & Leading/Lagging Indicators.
     - Funnel Tracking Specs (Event Name, Event Parameters, Drop-off rate criteria).
  2. **Post-Launch Verification & Feedback Plan**: Kế hoạch đo lường 7 ngày, 30 ngày sau Go-Live, khảo sát NPS/CSAT.

---

## Tích Hợp Notion MCP (Post-Delivery Sync)

Sau khi hoàn thành 5 phases và tạo file `README.md` trong thư mục sáng kiến:
1. Hỏi BA nếu muốn đẩy bộ tài liệu lên **Notion**.
2. Khi BA cung cấp `Parent Page ID` hoặc đồng ý sync:
   - Sử dụng tool `call_mcp_tool` với server `notion-mcp-server` và tool `API-post-page`.
   - Tạo trang cha (Parent Page) tương ứng với sáng kiến.
   - Tạo 5 sub-pages con tương ứng với 5 Phase documents.
   - Báo cáo URL trang Notion hoàn thành cho BA.
