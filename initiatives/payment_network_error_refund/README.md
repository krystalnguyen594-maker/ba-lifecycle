# 🚀 Sáng Kiến: Tự Động Xử Lý Hoàn Tiền Khi Lỗi Mạng Thanh Toán (Payment Network Error Auto-Refund)

**Slug:** `payment_network_error_refund`  
**Trạng thái:** `Ready for Sprint Planning & Dev Handover`  
**Version:** `1.0.0` (Docs-as-Code)  

---

## 📌 Tổng Quan Sáng Kiến (Executive Summary)

Sáng kiến **Tự Động Xử Lý Hoàn Tiền Khi Lỗi Mạng Thanh Toán (Payment Network Error Auto-Refund)** giải quyết triệt để bài toán nhạy cảm nhất trong thanh toán số: **khách hàng bị trừ tiền oan nhưng giao dịch báo lỗi do sự cố đứt gãy kết nối mạng phân tán (Network Timeout, Socket Hang-up, 504 Gateway Timeout)**.

Thông qua việc kết hợp các giải pháp công nghệ phân tán tiên tiến:
1. **Client-Side Defense & Idempotency Key:** Chặn đứng 100% rủi ro khách hàng bấm đúp trừ tiền kép (Double-Deduction).
2. **Fast-Query Status Worker:** Tự động truy vấn Cổng thanh toán (PG) đa tầng theo chu kỳ Exponential Backoff (5s, 15s, 60s).
3. **Transaction State Machine & Distributed Lock:** Ngăn chặn tuyệt đối tình trạng tranh chấp dữ liệu (Race Condition) và hoàn tiền nhầm (Double-Dip Risk).
4. **Instant Auto-Reversal & Original Source Refund:** Đảo lệnh huỷ giao dịch và giải phóng tồn kho tức thì khi chưa trừ tiền; tự động hoàn tiền về tài khoản ngân hàng nguồn ban đầu kèm cung cấp mã tra soát (FT/Trace ID) minh bạch khi đã trừ tiền.
5. **Voucher Rollback & Auto-Extension:** Tự động khôi phục mã giảm giá và gia hạn thêm 24h nếu voucher hết hạn trong quá trình xử lý sự cố.

Giải pháp giúp rút ngắn thời gian giải quyết khiếu nại từ **5 ngày xuống < 30 giây (Fast-path)**, cắt giảm **85% chi phí vận hành CSKH**, và đảm bảo **tỉ lệ thất thoát đối soát bằng 0.00%**.

---

## 📂 Bộ Tài Liệu Bàn Giao 5 Phases Hoàn Chỉnh

| Phase | Tài Liệu Chi Tiết | Trọng Tâm Nghiệp Vụ & Kỹ Thuật |
| :---: | :--- | :--- |
| **01** | [01_discovery_scoping.md](./01_discovery_scoping.md) | **First Principles Analysis**, 5W1H Problem Statement, BACCM Core Model, Stakeholder RACI Matrix, In/Out Scope Boundaries (MVP vs Future). |
| **02** | [02_elicitation_grill.md](./02_elicitation_grill.md) | Ngân hàng câu hỏi đa phòng ban (Biz, Tech, Ops, Legal), **Inversion Thinking & Pre-Mortem Matrix**, **Grill BA Decision Log** (Kênh hoàn tiền nguồn, giữ tồn kho 15 phút, bảo vệ voucher). |
| **03** | [03_analysis_modeling.md](./03_analysis_modeling.md) | **Feynman Technique (ELI5)**, Sequence Diagram & State Machine (Mermaid), INVEST User Stories, Gherkin AC, Data Dictionary & REST API Specifications. |
| **04** | [04_delivery_verification.md](./04_delivery_verification.md) | **2nd-Order & 3rd-Order Thinking**, Phân rã Sprint Backlog (MoSCoW, Story Points), Ma trận kiểm thử biên QA (Chaos/Race condition), Kịch bản UAT, Change Request Protocol. |
| **05** | [05_solution_evaluation.md](./05_solution_evaluation.md) | **Systems Thinking**, Cây chỉ số North Star (Zero-touch Resolution Rate >= 98.5%), Khung đánh giá HEART, Telemetry Funnel Tracking Specs, Kế hoạch kiểm toán D+7 và D+30. |

---

## 🔄 Trạng Thái Phiên Bản & Notion Sync
- **Git Repo:** Đã lưu trữ và quản lý phiên bản trong Git repo theo chuẩn Docs-as-Code.
- **Notion Sync:** Sẵn sàng đồng bộ 1-click lên Notion Workspace thông qua MCP Server `notion-mcp-server`.
