# [VPBANK YOUNG TALENTS] Chuyên Đề 3: Bộ 3 Case Study Sản Phẩm Số Thực Chiến Tại VPBank

**Mục tiêu bài học:** Giải mã kiến trúc sản phẩm, logic nghiệp vụ và bài toán tối ưu hoá thực tế của 3 sản phẩm chủ lực trong hệ sinh thái số VPBank: **VPBank NEO**, **Cake by VPBank**, và **Hệ thống Cho vay thấu chi / Thẻ tín dụng tức thì (Instant Approval)**.

---

## CASE STUDY 1: Tối Ưu Hóa Phễu Mở Tài Khoản eKYC Trên Ứng Dụng VPBank NEO

### 1. Bối cảnh bài toán:
VPBank NEO là ứng dụng ngân hàng số toàn năng. Mỗi tháng có khoảng 150,000 lượt tải app để đăng ký mở tài khoản mới. Tuy nhiên, dữ liệu Product Analytics cho thấy:
* **Tỷ lệ rớt phễu (Drop-off rate):** Lên tới 42% tại bước quét thẻ CCCD gắn chip (NFC).
* **Quy định pháp lý bắt buộc:** **Thông tư 17/2024/TT-NHNN** yêu cầu từ 01/01/2025 mọi tài khoản mở bằng eKYC phải xác thực sinh trắc học khớp đúng với dữ liệu CCCD gắn chip của Bộ Công An, **tuyệt đối không được bỏ qua bước quét NFC**.

### 2. Phân tích nguyên nhân bằng Data & UX:
BA tiến hành phân tích sự cố:
* 65% lượt quét thất bại do người dùng di chuyển thẻ khi chip chưa đọc xong (quá trình đọc chip cần 1.5 - 2.5 giây).
* 25% do người dùng không biết vị trí ăng-ten NFC trên điện thoại (đặt thẻ lung tung khắp màn hình).
* 10% do điện thoại không có NFC hoặc hệ điều hành quá cũ.

### 3. Giải pháp thiết kế sản phẩm của Digital BA:

```mermaid
flowchart TD
    Start["Khách hàng bắt đầu eKYC"] --> CheckDevice{"Kiểm tra thiết bị (Device Detection)"}
    
    CheckDevice -->|Có NFC| ShowGuide["Hiển thị Animation vị trí ăng-ten NFC<br/>theo đúng Model máy (iPhone / Android)"]
    CheckDevice -->|Không có NFC| Fallback["Điều hướng sang Video Call KYC<br/>hoặc đặt lịch phục vụ tại Chi nhánh"]
    
    ShowGuide --> ScanNFC["Chạm thẻ CCCD vào điện thoại"]
    ScanNFC --> Haptic["Rung điện thoại (Haptic Feedback)<br/>và hiển thị thanh tiến trình 100% trong 2s"]
    
    Haptic --> FaceMatch["Chụp ảnh khuôn mặt (Liveness Detection)"]
    FaceMatch --> VerifyC06["Gọi API xác thực dữ liệu với Bộ Công An"]
    VerifyC06 --> Success["Kích hoạt tài khoản ngay trong 2 phút!"]
```

### 4. Kết quả đo lường (Product Metrics):
* Tỷ lệ quét NFC thành công ngay lần đầu tăng từ 58% lên 89%.
* Tỷ lệ rớt phễu chung của toàn luồng Onboarding giảm từ 42% xuống còn 14%.

---

## CASE STUDY 2: Vay Tiêu Dùng Trực Tuyến & Cấp Thẻ Tín Dụng Tức Thì Trong 3 Phút (Instant Credit)

### 1. Bối cảnh bài toán:
VPBank là ngân hàng dẫn đầu thị phần cho vay tiêu dùng và thẻ tín dụng. Thay vì bắt khách hàng nộp sao kê lương giấy và chờ 3-5 ngày làm việc, ban lãnh đạo đặt mục tiêu: **Quy trình vay và cấp thẻ tín dụng ảo 100% tự động (STP - Straight-Through Processing) trên App trong vòng dưới 3 phút.**

### 2. Thách thức lớn nhất:
Làm sao vừa phê duyệt giải ngân siêu nhanh mà vẫn kiểm soát được tỷ lệ nợ xấu (NPL)?

### 3. Kiến trúc giải pháp của Digital BA:

```mermaid
sequenceDiagram
    autonumber
    actor User as Khách Hàng App
    participant App as VPBank NEO
    participant Gateway as API Gateway
    participant RuleEngine as Decision Engine (Rule + ML)
    participant CIC as Trung Tâm Tín Dụng CIC
    participant Core as Core Banking (T24)

    User->>App: Chọn 'Vay Nhanh 20 Triệu' & Bấm 'Đăng ký'
    App->>Gateway: POST /loans/apply (Kèm User Consent theo NĐ 13)
    Gateway->>RuleEngine: Chuyển tiếp hồ sơ thẩm định
    
    critical Bước 1: Pre-screening (Loại trừ nhanh trong 1 giây)
        RuleEngine->>RuleEngine: Kiểm tra Blacklist nội bộ & Tuổi (20 - 60)
    end

    critical Bước 2: Kiểm tra lịch sử nợ bên ngoài
        RuleEngine->>CIC: Tra cứu điểm tín dụng CIC (S21/B10)
        CIC-->>RuleEngine: Trả về kết quả (Nhóm nợ: Nhóm 1 - Tốt)
    end

    critical Bước 3: Chấm điểm Machine Learning (ML Credit Scoring)
        RuleEngine->>RuleEngine: Tổng hợp dữ liệu (Lịch sử giao dịch CASA + Telco Score)
        Note over RuleEngine: Điểm tín nhiệm: 760/1000 -> Duyệt cấp hạn mức 30 Triệu!
    end

    RuleEngine->>Core: Tự động tạo Hợp đồng vay & Mở tài khoản vay (Sub-Account)
    Core-->>App: Giải ngân tiền vào tài khoản thanh toán trong 30 giây!
    App-->>User: Thông báo 'Khoản vay đã giải ngân thành công!'
```

---

## CASE STUDY 3: Open API & Hệ Sinh Thái Số (Tích Hợp Đối Tác Be Group / E-Wallet)

### 1. Bối cảnh bài toán:
Hệ sinh thái VPBank liên kết chặt chẽ với ứng dụng gọi xe Be Group (Cake by VPBank). Mục tiêu: Cho phép tài xế Be mở tài khoản ngân hàng và nhận tiền cước xe theo thời gian thực (Real-time Settlement), đồng thời người dùng ứng dụng Be có thể liên kết tài khoản VPBank/Cake để thanh toán chuyến đi không cần tiền mặt.

### 2. Vai trò của Digital BA:
* **Thiết kế hợp đồng API (API Specification):** Đảm bảo tính nhất quán giữa hai hệ thống của hai công ty khác nhau.
* **Cơ chế Idempotency & Đối soát:** Ngăn chặn việc trừ tiền đúp khi tài xế bấm xác nhận chuyến đi nhiều lần trong lúc mạng lag.
* **Tuân thủ an toàn:** Sử dụng chuẩn bảo mật mTLS (Mutual TLS) và chữ ký số HMAC-SHA256 trên mọi payload thanh toán.
