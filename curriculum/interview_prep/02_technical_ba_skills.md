# [PHỎNG VẤN BANKING BA] Phần 2: Kỹ Năng Kỹ Thuật (Technical BA Skills & Architecture)

**Mục tiêu bài học:** Chuẩn bị câu trả lời xuất sắc cho các câu hỏi phỏng vấn kỹ thuật hóc búa, chứng minh bạn là một BA có nền tảng công nghệ vững chắc (Technical BA), sẵn sàng làm việc ăn ý với các Solution Architects và Tech Leads hàng đầu của Ngân hàng.

---

## 1. 4 Câu Hỏi Kỹ Thuật Kinh Điển Nhất Trong Phỏng Vấn Ngân Hàng

### Câu 1: *"Tính chất Idempotency là gì và tại sao nó là yêu cầu sống còn trong các API thanh toán ngân hàng?"*
- **Cách trả lời chuẩn chuyên gia:**
  - **Khái niệm:** Idempotency (Tính luỹ đẳng) là khả năng của một API đảm bảo rằng việc thực thi một yêu cầu một lần hay thực thi lại nhiều lần liên tiếp với cùng một bộ tham số đầu vào đều cho ra **cùng một kết quả duy nhất** và không làm thay đổi thêm trạng thái của hệ thống.
  - **Ứng dụng ngân hàng:** Khi mạng bị lag, người dùng sốt ruột bấm đúp nút "Thanh toán", hoặc kết nối mạng giữa Mobile App và Server bị đứt trước khi nhận được phản hồi. Nếu API không có tính Idempotent, mỗi lần gọi lại (Retry) sẽ trừ thêm một lần tiền của khách hàng (Double Deduction).
  - **Cách thiết kế:** Client sinh ra một mã định danh duy nhất (`X-Idempotency-Key` dạng UUID) kèm theo mỗi phiên giao dịch. Khi Backend nhận được request, nó sử dụng Redis để lưu khoá này trong thời gian ngắn (ví dụ 60 giây). Nếu có một request khác mang cùng key này bay tới trong lúc giao dịch đầu tiên đang xử lý, hệ thống lập tức từ chối với mã lỗi `HTTP 409 Conflict` hoặc trả về kết quả đã được lưu sẵn trong bộ nhớ đệm mà không hạch toán trừ tiền lần thứ hai.

---

### Câu 2: *"Khi một giao dịch thanh toán chuyển tiền liên ngân hàng bị Timeout không nhận được phản hồi từ phía Napas, bạn sẽ thiết kế luồng xử lý như thế nào để không làm mất tiền của khách và không gây thất thoát cho ngân hàng?"*
- **Cách trả lời chuẩn chuyên gia:**
  - **Bản chất vấn đề:** Trong hệ thống phân tán, Timeout **KHÔNG ĐỒNG NGHĨA** với thất bại. Napas có thể đã trừ tiền người nhận thành công nhưng đường truyền mạng phản hồi bị đứt.
  - **Quy trình 3 bước xử lý chuẩn mực:**
    1. **Khoá số dư tạm thời (Hold Funds), không trừ tiền thật ngay:** Trước khi gửi bản tin sang Napas, hệ thống chỉ giữ tạm số tiền trên tài khoản thanh toán của người gửi.
    2. **Chuyển trạng thái giao dịch sang `PENDING_VERIFICATION` (In-Doubt State):** Màn hình người dùng hiển thị thông báo minh bạch rằng *"Giao dịch đang được tra soát liên ngân hàng"*, cam kết thời gian phản hồi rõ ràng, tuyệt đối không báo lỗi đỏ khiến khách hàng bấm lại.
    3. **Kích hoạt Cơ Chế Truy Vấn Tự Động (Auto-Query Status Worker):** Hệ thống đẩy giao dịch vào hàng đợi bất đồng bộ (Message Queue) để gọi API tra cứu trạng thái giao dịch sang Napas theo chu kỳ Exponential Backoff (ví dụ: sau 5 giây, 15 giây, 60 giây).
       - Nếu Napas báo *Thành công*: Hạch toán trừ tiền thật và báo khách hàng.
       - Nếu Napas báo *Thất bại*: Hủy lệnh và giải phóng số tiền tạm giữ (Unhold) ngay lập tức.
       - Nếu sau 15 phút vẫn không nhận được phản hồi: Đưa vào danh sách tra soát cuối ngày (Reconciliation File) giữa hai ngân hàng và có cảnh báo lên bảng điều khiển của chuyên viên Vận hành Đối soát.

---

### Câu 3: *"Phân biệt Pessimistic Locking (Khoá bi quan) và Optimistic Locking (Khoá lạc quan) trong việc xử lý số dư tài khoản ngân hàng khi có nhiều giao dịch xảy ra cùng một mili-giây (Concurrency)?"*
- **Bảng so sánh trả lời phỏng vấn:**

| Tiêu Chí | Pessimistic Locking (Khoá Bi Quan) | Optimistic Locking (Khoá Lạc Quan) |
| :--- | :--- | :--- |
| **Triết lý** | *"Chắc chắn sẽ có xung đột xảy ra, nên khi tôi đọc bản ghi thì tôi khoá chặt lại, không cho ai đọc hay sửa cho đến khi tôi làm xong."* | *"Hiếm khi có xung đột, cứ để mọi người thao tác tự do, khi nào lưu vào Database mới kiểm tra xem dữ liệu có bị ai khác sửa mất chưa."* |
| **Cơ chế kỹ thuật** | Sử dụng lệnh `SELECT ... FOR UPDATE` trong cơ sở dữ liệu quan hệ (PostgreSQL, Oracle). | Sử dụng trường số hiệu phiên bản (`version = version + 1`) trong câu lệnh `UPDATE ... WHERE version = current_version`. |
| **Ứng dụng ngân hàng** | Áp dụng cho các giao dịch nhạy cảm cao như **Trừ tiền số dư tài khoản Core Banking**, rút tiền tại cây ATM để tránh bị thấu chi âm tiền. | Áp dụng cho các tính năng có lưu lượng đọc lớn và tỷ lệ sửa thấp như cập nhật thông tin cá nhân khách hàng, chỉnh sửa cài đặt thông báo. |

---

### Câu 4: *"Hệ thống Ngân hàng cũ thường dùng SOAP XML, còn các dịch vụ Ngân hàng số mới dùng REST JSON hoặc gRPC. Với vai trò BA, bạn cần lưu ý gì khi thiết kế tính năng tích hợp giữa hai tầng công nghệ này?"*
- **Cách trả lời chuẩn chuyên gia:**
  - Cần thiết kế một tầng chuyển đổi trung gian (**Integration Middleware / API Gateway**).
  - Tầng Middleware có nhiệm vụ nhận bản tin REST JSON tốc độ cao từ Mobile App, xác thực bảo mật Token JWT, sau đó biên dịch (Mapping) thành bản tin SOAP XML phức tạp có chữ ký số WS-Security để gọi vào hệ thống Core Banking cũ.
  - BA cần lập bảng **Ma trận ánh xạ dữ liệu (Data Field Mapping Table)** chi tiết từng trường dữ liệu giữa JSON và XML, quy định rõ cách xử lý lỗi khi Core Banking trả về các mã lỗi đặc thù (Return Code) để chuyển đổi thành thông điệp tiếng Việt thân thiện cho khách hàng trên ứng dụng di động.
