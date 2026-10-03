# 🏦 Banking IT Business Analyst Mastery Hub & Career Roadmap

Dự án phát triển sự nghiệp và nền tảng học tập phân tích nghiệp vụ chuyên sâu cho **Banking & Fintech Domain**, kết hợp khung chuẩn quốc tế **BABOK v3, Scrum/Agile**, mô hình **Docs-as-Code** trên IDE và **Ứng Dụng Web Học Tập Tương Tác (Next.js 14)**.

---

## 🌟 4 Trụ Cột Cốt Lõi Của Dự Án

1. **Lộ Trình Đào Tạo 3 Tầng Thực Chiến (`curriculum/`):**
   - **Tầng 1 (Nền tảng BABOK v3):** Elicitation, Mô hình hóa BPMN 2.0 / Sequence Diagram, User Story INVEST & Gherkin AC, Thiết kế Data Dictionary & API Contract (chống sai số làm tròn tiền tệ và rủi ro trừ tiền kép qua Idempotency Key).
   - **Tầng 2 (Bản đồ nghiệp vụ Banking):** Core Banking T24/Flexcube, Sổ cái kế toán kép (COA QĐ 479), Mạng chuyển mạch Napas 247 & VietQR, Thẻ Visa/Mastercard & POS, Cho vay số STP & CIC, eKYC NFC CCCD & Quyết định 2345/QĐ-NHNN, AML Chống rửa tiền.
   - **Tầng 3 (Dự án thực tế Docs-as-Code):** Các hồ sơ phân tích 5 phases chuẩn mực tại `initiatives/`.

2. **Luyện Thi Phỏng Vấn Ngân Hàng Lớn (`interview_prep/`):**
   - 30 câu hỏi nghiệp vụ và kỹ thuật thực tế từ các ngân hàng lớn (**Techcombank, Vietcombank, MB Bank, VPBank**).
   - Hướng dẫn trả lời theo phương pháp **STAR (Situation - Task - Action - Result)** và các bẫy phỏng vấn cần tránh (Red Flags).

3. **Ứng Dụng Web Học Tập & Theo Dõi Tiến Độ (`web/`):**
   - Xây dựng bằng **Next.js 14 (App Router) + Tailwind CSS + Lucide Icons + Mermaid.js**.
   - Theo dõi % tiến độ học tập qua LocalStorage, đánh dấu hoàn thành từng bài học.
   - Trình đọc Markdown tích hợp bộ giải mã sơ đồ Mermaid tương tác phóng to/thu nhỏ.
   - Trắc nghiệm kiểm tra kiến thức Banking BA có chấm điểm và phân tích giải thích chuyên sâu.

4. **Quy Trình Tự Động Hoá 5 Phases (BABOK & Mental Models):**
   - Tích hợp 2 kỹ năng cốt lõi: `ba-lifecycle` và `ba-mental-models` (First Principles, Inversion Pre-Mortem, Feynman Technique, 2nd-Order Thinking).

---

## 🗺️ Cấu Trúc Thư Mục Monorepo

```text
BA Life Cycle/
├── curriculum/                                  # Giáo trình Banking BA 3 tầng chuẩn hóa
│   ├── tier_1_babok_foundation/                 # 5 bài học nền tảng BABOK & Kỹ thuật BA
│   ├── tier_2_banking_domain/                   # 5 bài học nghiệp vụ Ngân hàng & Fintech
│   ├── tier_3_capstone_projects/                # Hướng dẫn dự án thực chiến
│   └── interview_prep/                          # Bộ cẩm nang luyện phỏng vấn ngân hàng STAR
├── initiatives/                                 # Hồ sơ 5 Phases các bài toán ngân hàng
│   ├── payment_network_error_refund/            # Case Study 1: Hoàn tiền lỗi mạng thanh toán
│   ├── bill_splitting/                          # Case Study 2: Chia bill nhóm qua VietQR
│   └── sample_e_wallet_cashback/                # Case Study 3: Cashback loyalty engine
├── web/                                         # Ứng dụng Web Next.js theo dõi tiến độ
│   ├── src/
│   │   ├── app/                                 # Next.js App Router (Dashboard, Roadmap, Quiz, Interview)
│   │   ├── components/                          # Navbar, MermaidViewer, LessonViewerClient
│   │   ├── context/                             # ProgressContext lưu trạng thái học tập
│   │   └── data/                                # Metadata bài học & ngân hàng câu hỏi quiz
│   ├── package.json
│   └── tailwind.config.js
├── .agents/skills/                              # Bộ công cụ Agent Skills
│   ├── ba-lifecycle/
│   └── ba-mental-models/
├── AGENTS.md                                    # Workspace Guidelines & Grill Rules
└── README.md                                    # Tài liệu tổng quan
```

---

## 🚀 Hướng Dẫn Khởi Động Website Học Tập

Để mở giao diện Web học tập và theo dõi tiến độ trực quan:

```bash
# 1. Di chuyển vào thư mục web
cd web

# 2. Khởi động môi trường phát triển (Dev Server)
npm run dev
```

Sau khi chạy lệnh, mở trình duyệt truy cập: **`http://localhost:3000`**

### Các trang chính trên Web:
- **`http://localhost:3000/`** : Dashboard tổng quan tiến độ % và thẻ bài học gần nhất.
- **`http://localhost:3000/roadmap`** : Bản đồ lộ trình học tập 3 tầng kèm checklist đánh dấu hoàn thành.
- **`http://localhost:3000/case-studies`** : Thư viện hồ sơ bài toán ngân hàng thực tế 5 phases.
- **`http://localhost:3000/quiz`** : Phòng thi trắc nghiệm kiến thức tài chính ngân hàng có chấm điểm tức thì.
- **`http://localhost:3000/interview`** : Phòng luyện thi phỏng vấn ngân hàng chuẩn STAR.
