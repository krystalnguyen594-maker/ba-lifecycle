# 🧠 AI-Augmented IT Business Analyst Life Cycle (BABOK v3 & Scrum)

Hệ thống tự động hoá vòng đời phân tích nghiệp vụ chuẩn quốc tế (Docs-as-Code) dành cho **IT Business Analyst**, tích hợp trực tiếp trên nền tảng **Antigravity**.

---

## 🌟 Tính Năng Nổi Bật

1. **Quy trình 5 Bước Khép Kín (End-to-End Autonomous Pipeline)**:
   - Từ một bài toán thô của Sếp / PO / Khách hàng, Agent tự động chạy qua 5 phases chuẩn BABOK v3 và Scrum Guide.
2. **Cơ Chế "Grill BA" Tương Tác**:
   - Tự suy luận logic kỹ thuật/UI thông thường.
   - Khi gặp các điểm rẽ nhánh quan trọng (Scope boundaries, Business Rules, Trade-offs), Agent sử dụng tool hỏi tương tác với các phương án phân tích sẵn `(Recommended)` để BA chỉ cần 1 cú click là chốt phương án.
3. **Kho Tư Duy Chiến Lược (BA Mental Models)**:
   - Tích hợp **First Principles**, **Inversion (Pre-Mortem)**, **Thought Experiments**, **2nd-Order Thinking**, và **Feynman Technique (ELI5)** giúp tài liệu sắc bén, không có "lỗ hổng" logic hay bẫy tư duy cục bộ.
4. **Mô hình Docs-as-Code & Tích hợp Notion MCP**:
   - Lưu trữ tập trung và quản lý phiên bản trong Git repository (`git diff`, `git branch`).
   - Sẵn sàng đồng bộ 1-click lên Notion qua **Notion MCP (`notion-mcp-server`)** cho Stakeholders và Dev xem trực quan.

---

## 🗺️ Cấu Trúc Thư Mục Repository

```text
BA Life Cycle/
├── .agents/
│   └── skills/
│       ├── ba-lifecycle/              # Master Orchestrator (5 Phases quy chuẩn)
│       │   ├── SKILL.md               # Định nghĩa luồng thực thi & gọi tool
│       │   └── templates/             # Bộ 5 templates Markdown chuẩn BABOK & Notion guide
│       └── ba-mental-models/          # Kỹ năng tư duy chiến lược cho BA
│           └── SKILL.md               # First Principles, Inversion, ELI5...
├── initiatives/                       # Kho lưu trữ các bài toán / sáng kiến (Docs-as-Code)
│   └── sample_e_wallet_cashback/      # Dự án mẫu thực tế hoàn chỉnh 5 phases
├── AGENTS.md                          # Workspace Rules kích hoạt & định tuyến Agent
├── .gitignore                         # Loại trừ file rác
└── README.md                          # Tài liệu tổng quan hệ thống
```

---

## 🚀 Cách Sử Dụng Cho BA Khi Có Bài Toán Mới

Khi nhận được yêu cầu mới từ Sếp, Khách hàng hoặc PO, bạn chỉ cần gõ prompt gửi cho Antigravity:

```text
Tôi nhận được bài toán mới từ PO: 
"Xây dựng tính năng chia hoá đơn (Bill Splitting) giữa các thành viên trong nhóm bạn sau khi ăn uống qua QR thanh toán ví điện tử".
Hãy chạy quy trình BA Life Cycle cho bài toán này.
```

**Agent sẽ tự động:**
1. Tạo thư mục `initiatives/bill_splitting/`.
2. Áp dụng First Principles để phân tích bài toán gốc (`01_discovery_scoping.md`).
3. Đào sâu rủi ro, gian lận và mở modal **Grill bạn** về các quyết định nghiệp vụ (`02_elicitation_grill.md`).
4. Vẽ Flowchart Mermaid, viết User Stories INVEST, Gherkin AC, API spec (`03_analysis_modeling.md`).
5. Lập Sprint Backlog, QA Edge cases, UAT test checklist (`04_delivery_verification.md`).
6. Thiết lập Metrics Tree & Funnel tracking (`05_solution_evaluation.md`).
7. Tự động commit Git và hỏi bạn có muốn sync lên Notion hay không!
