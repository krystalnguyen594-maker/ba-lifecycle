# [TIER 1 - BÀI 4] Viết User Stories & Gherkin Acceptance Criteria Chuẩn Mực Trong Ngân Hàng

**Mục tiêu bài học:** Nắm vững bộ tiêu chuẩn **INVEST** để phân rã User Story ngân hàng, làm chủ kỹ thuật viết **Acceptance Criteria (AC)** chuẩn **Gherkin (Given - When - Then)** không còn kẽ hở cho QA và Dev.

---

## 1. Tiêu Chí INVEST Ứng Dụng Cho User Story Ngân Hàng

Viết User Story trong ngân hàng khác biệt lớn so với các ứng dụng giải trí vì một tính năng nhỏ cũng liên quan đến tiền bạc, sổ cái kế toán và các chuẩn mực bảo mật:

| Chữ Cái | Ý Nghĩa (INVEST) | Cách Áp Dụng Trong Ngân Hàng | Sai Lầm Thường Gặp Cần Tránh |
| :---: | :--- | :--- | :--- |
| **I** | **Independent (Độc lập)** | Mỗi Story có thể được phát triển và kiểm thử độc lập mà không bị phụ thuộc cứng vào Story khác đang chạy cùng sprint. | Gộp chung Story "Mở sổ tiết kiệm" với "Tất toán sổ tiết kiệm" vào 1 story khổng lồ 20 points. |
| **N** | **Negotiable (Thương lượng được)** | Story là lời mời trao đổi giữa BA, PO và Dev Team; không phải bản hợp đồng cứng nhắc. | BA tự áp đặt giải pháp kỹ thuật sâu (chỉ định database table) vào phần mô tả của Story. |
| **V** | **Valuable (Có giá trị kinh doanh)** | Mang lại giá trị trực tiếp cho Khách hàng (User Value) hoặc cho Ngân hàng (Business/Compliance Value). | Viết story thuần kỹ thuật như: *"Nâng cấp thư viện Redis 7.0"* mà không gắn với giá trị giảm độ trễ thanh toán. |
| **E** | **Estimable (Ước lượng được)** | Đội ngũ kỹ thuật có đủ thông tin rõ ràng về phạm vi để chấm Story Points ($1, 2, 3, 5, 8$). | Yêu cầu nghiệp vụ mơ hồ như *"Hệ thống phải xử lý giao dịch siêu nhanh"*. |
| **S** | **Small (Vừa vặn trong Sprint)** | Story phải hoàn thành trong 1 Sprint (lý tưởng là từ $2 - 5$ Story Points). | Story quá to khiến Sprint bị cháy và phải chuyển nợ kỹ thuật (Carry-over) sang Sprint sau. |
| **T** | **Testable (Kiểm thử được)** | Luôn đi kèm các kịch bản nghiệm thu rõ ràng (Gherkin AC) để QA viết Automation Test. | Không có số liệu cụ thể (ví dụ: không ghi rõ thời gian timeout là bao nhiêu giây). |

---

## 2. Cấu Trúc User Story Chuẩn Mực

```text
As a [Chân dung người dùng / Hệ thống],
I want to [Hành động / Tính năng cụ thể],
So that [Giá trị kinh doanh hoặc lợi ích nhận được].
```

**Ví dụ:**
> **As a** Khách hàng sử dụng ứng dụng Ngân hàng số Mobile Banking,  
> **I want to** Quét mã VietQR tại quầy thanh toán để tự động điền số tài khoản, tên ngân hàng và số tiền giao dịch,  
> **So that** Tôi thanh toán chính xác 100% trong 3 giây mà không sợ bị gõ nhầm số tài khoản người nhận.

---

## 3. Khung Viết Acceptance Criteria Chuẩn Gherkin (3 Tầng Kịch Bản)

Mỗi User Story trong ngân hàng bắt buộc phải có đầy đủ 3 tầng kịch bản:
1. **Happy Path:** Luồng lý tưởng khi mọi điều kiện đều hoàn hảo.
2. **Negative Path / Business Validation:** Người dùng nhập sai, số dư không đủ, tài khoản bị phong tỏa.
3. **Edge Case / System Failure:** Rớt mạng, Timeout bên thứ 3, người dùng spam click liên tục (Double-click).

### Ví dụ hoàn chỉnh: Chuyển tiền quét mã VietQR vượt ngưỡng 10 triệu đồng (Áp dụng Quyết định 2345/QĐ-NHNN)

```gherkin
Feature: Chuyển tiền liên ngân hàng bằng quét mã VietQR với xác thực sinh trắc học

  Scenario 1: Chuyển tiền thành công vượt ngưỡng 10 triệu đồng (Happy Path)
    Given Khách hàng đã đăng nhập ứng dụng Mobile Banking và có số dư khả dụng 15,000,000 VND
    And Tài khoản khách hàng đã đăng ký dữ liệu sinh trắc học khuôn mặt trùng khớp với CCCD gắn chip
    When Khách hàng quét mã VietQR hợp lệ với số tiền là 12,000,000 VND
    And Khách hàng xác nhận thông tin người nhận và bấm "Tiếp tục"
    Then Ứng dụng hiển thị màn hình quét khuôn mặt (Face Matching)
    And Khách hàng hoàn thành nhận diện khuôn mặt thành công trong vòng 30 giây
    Then Hệ thống thực hiện tạm giữ (Hold) 12,000,000 VND và gọi API Napas 247
    And Napas phản hồi mã giao dịch thành công "00"
    Then Hệ thống trừ tiền thật trong Core Banking và hiển thị màn hình Chuyển tiền thành công
    And Gửi thông báo OTT Push Notification biến động số dư trong vòng 3 giây

  Scenario 2: Khuôn mặt không trùng khớp dữ liệu CCCD (Negative Path)
    Given Khách hàng thực hiện giao dịch chuyển tiền 12,000,000 VND
    When Khách hàng thực hiện nhận diện khuôn mặt nhưng tỷ lệ trùng khớp (Similarity Score) < 85%
    Then Hệ thống hiển thị thông báo lỗi: "Khuôn mặt không khớp với dữ liệu đăng ký. Vui lòng thử lại (Còn 2/3 lần)"
    And Hệ thống KHÔNG thực hiện tạm khóa hoặc trừ bất kỳ khoản tiền nào trong tài khoản

  Scenario 3: Gián đoạn kết nối Napas khi đã hoàn thành xác thực khuôn mặt (Edge Case)
    Given Khách hàng đã hoàn thành xác thực sinh trắc học thành công
    When Hệ thống gọi API Napas 247 nhưng bị Timeout không có phản hồi sau 15 giây
    Then Trạng thái giao dịch chuyển sang "PENDING_VERIFICATION"
    And Hệ thống hiển thị thông báo: "Giao dịch đang được tra soát liên ngân hàng. Tiền của bạn đang được bảo đảm an toàn"
    And Kích hoạt Background Worker kiểm tra trạng thái tự động theo chu kỳ 5s - 15s - 60s
    And Nút bấm thanh toán trên màn hình bị vô hiệu hoá để chống bấm lặp
```
