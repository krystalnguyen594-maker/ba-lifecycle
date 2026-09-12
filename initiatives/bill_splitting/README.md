# 🚀 Sáng Kiến: Chia Hoá Đơn Nhóm Qua QR Code (Group Bill Splitting via QR)

**Slug:** `bill_splitting`  
**Trạng thái:** `Ready for Sprint Planning & Dev Handover`  
**Version:** `1.0.0` (Docs-as-Code)  

---

## 📌 Tổng Quan Sáng Kiến (Executive Summary)

Tính năng **Chia Hoá Đơn Nhóm (Group Bill Splitting via QR)** giải quyết trọn vẹn điểm nghẽn xã hội (Social Friction) lớn nhất của người trẻ khi đi ăn uống theo nhóm: ngại nhắc nợ, chia tiền lẻ phức tạp và tốn thời gian. 

Bằng cách kết hợp **thuật toán phân bổ tiền lẻ thông minh (Remainder Distribution)**, **Dynamic QR nhóm thời gian thực qua WebSocket**, và **cầu nối Napas VietQR 247** cho người dùng chưa có ví, tính năng không chỉ giúp người dùng thanh toán sòng phẳng trong 1 chạm mà còn mở ra động cơ tăng trưởng lan truyền tự nhiên (**Viral K-Factor > 1.33**) cho toàn bộ hệ sinh thái ví điện tử.

---

## 📂 Bộ Tài Liệu Bàn Giao 5 Phases Hoàn Chỉnh

| Phase | Tài Liệu Chi Tiết | Trọng Tâm Nghiệp Vụ & Kỹ Thuật |
| :---: | :--- | :--- |
| **01** | [01_discovery_scoping.md](./01_discovery_scoping.md) | **First Principles Analysis**, 5W1H Problem Statement, BACCM Core Model, Stakeholder RACI Matrix, In/Out Scope Boundaries. |
| **02** | [02_elicitation_grill.md](./02_elicitation_grill.md) | Ngân hàng câu hỏi đa phòng ban (Biz, Tech, Ops, Legal), **Inversion Thinking & Pre-Mortem**, **Grill BA Decision Log**. |
| **03** | [03_analysis_modeling.md](./03_analysis_modeling.md) | Flowchart & Sequence Diagram (Mermaid), INVEST User Stories, Gherkin AC (Edge cases), Data Dictionary & REST API Spec. |
| **04** | [04_delivery_verification.md](./04_delivery_verification.md) | Phân rã Sprint Backlog (Story Points, MoSCoW), Ma trận kiểm thử biên QA, UAT Acceptance Checklist, Change Request (CR-01). |
| **05** | [05_solution_evaluation.md](./05_solution_evaluation.md) | Cây chỉ số North Star (K-Factor), Khung đánh giá HEART, Phễu chuyển đổi Event Tracking, Kế hoạch D+1/D+7/D+30 Review. |

---

## 🔄 Trạng Thái Phiên Bản & Notion Sync
- **Git Repo:** Đã lưu trữ và quản lý phiên bản trong Git repo này.
- **Notion Sync:** Sẵn sàng đồng bộ 1-click lên Notion Workspace `XPERC BA HQ` thông qua MCP Server `notion-mcp-server`.
