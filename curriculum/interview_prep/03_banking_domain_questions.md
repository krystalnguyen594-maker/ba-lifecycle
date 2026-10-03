# [PHỎNG VẤN BANKING BA] Phần 3: 30 Câu Hỏi Nghiệp Vụ Ngân Hàng Kinh Điển (Banking Domain Q&A)

Tập hợp 30 câu hỏi nghiệp vụ thực tế được trích xuất từ các kỳ phỏng vấn tuyển dụng vị trí Business Analyst tại các Ngân hàng TMCP hàng đầu Việt Nam (**Techcombank, Vietcombank, MB Bank, VPBank, TPBank, ACB**).

---

## Nhóm 1: Hệ Thống Thanh Toán & Chuyển Tiền (Payments & Switching)

#### 1. Sự khác biệt cốt lõi giữa Chuyển tiền Napas 247 và Chuyển tiền liên ngân hàng thường qua CITAD là gì?
- **Trả lời:** Napas 247 là hệ thống chuyển tiền nhanh giá trị nhỏ (thường $\le 500$ triệu VND/lệnh), xử lý ghi có tài khoản người nhận tức thì 24/7/365 và bù trừ ròng định kỳ qua Napas. Ngược lại, CITAD (Hệ thống thanh toán điện tử liên ngân hàng của NHNN) xử lý thanh toán tổng tức thời (RTGS) cho các món tiền lớn và bù trừ giá trị thấp trong giờ hành chính các ngày làm việc; các lệnh gửi ngoài giờ làm việc hoặc ngày cuối tuần sẽ bị treo chờ đến sáng thứ Hai tuần sau mới hạch toán.

#### 2. Mã VietQR động (Dynamic QR) và VietQR tĩnh (Static QR) khác nhau như thế nào về mặt cấu trúc dữ liệu và trải nghiệm người dùng?
- **Trả lời:** 
  - *VietQR tĩnh:* Chỉ mã hóa thông tin Mã Ngân hàng (BIN) và Số tài khoản của người thụ hưởng. Khi khách hàng quét mã, họ phải tự gõ số tiền và nội dung chuyển tiền bằng tay. Thường dùng cho các hộ kinh doanh dán tại quầy.
  - *VietQR động:* Chứa thêm Số tiền chính xác cần thanh toán và Mã tham chiếu hoá đơn duy nhất (Order Ref / Transaction ID). Khách hàng chỉ cần quét mã là màn hình tự điền đúng 100% số tiền và khoá không cho sửa, bấm xác nhận trong 1 chạm. Dùng cho thương mại điện tử hoặc chia bill nhóm.

#### 3. Bút toán kép (Double-Entry) khi khách hàng chuyển 10 triệu đồng từ tài khoản của mình sang tài khoản người khác cùng ngân hàng nội bộ (Internal Transfer) được ghi nhận thế nào?
- **Trả lời:**
  - Nợ (Debit) TK 4211 của Người chuyển: $-10,000,000 \text{ VND}$
  - Có (Credit) TK 4211 của Người nhận: $+10,000,000 \text{ VND}$
  - Tổng Nợ = Tổng Có, số dư tổng tài sản và công nợ của ngân hàng không thay đổi, chỉ luân chuyển giữa hai khách hàng.

#### 4. Nếu khách hàng chuyển 10 triệu sang tài khoản tại ngân hàng khác qua Napas 247 thì bút toán của Ngân hàng chuyển tiền ghi thế nào?
- **Trả lời:**
  - Nợ (Debit) TK 4211 của Khách hàng chuyển tiền: $10,000,000 \text{ VND}$
  - Có (Credit) TK 388 / TK 519 (Tài khoản thanh toán trung gian bù trừ chuyển mạch qua Napas): $10,000,000 \text{ VND}$. Cuối ngày khi quyết toán qua NHNN, tài khoản 388 này mới được tất toán với tài khoản tiền gửi của ngân hàng tại NHNN (TK 1113).

#### 5. "Cut-off time" trong thanh toán liên ngân hàng là gì?
- **Trả lời:** Là thời điểm cuối cùng trong ngày làm việc mà hệ thống chuyển tiền (như CITAD hoặc hệ thống thanh toán bù trừ đa phương) ngừng tiếp nhận các lệnh thanh toán mới để tiến hành đóng sổ đối chiếu và quyết toán công nợ cuối ngày.

---

## Nhóm 2: Core Banking & Kế Toán Ngân Hàng (Core & Ledger)

#### 6. Tài khoản Nostro và Vostro khác nhau như thế nào?
- **Trả lời:** "Nostro" trong tiếng Ý là "của chúng tôi", "Vostro" là "của các bạn". Nostro là tài khoản tiền tệ của ngân hàng chúng ta mở tại một ngân hàng đối tác ở nước ngoài. Vostro là tài khoản của ngân hàng nước ngoài mở tại sổ sách của ngân hàng chúng ta.

#### 7. Trình bày chu kỳ EOD (End of Day) trong Core Banking?
- **Trả lời:** Là quy trình chạy ngầm hàng đêm để chốt sổ kế toán ngày cũ, tính lãi dồn tích cho tiền gửi/tiền vay, chuyển nhóm nợ đối với các khoản vay quá hạn, sao lưu dữ liệu và đổi ngày kế toán sang ngày làm việc mới (Value Date).

#### 8. "Value Date" (Ngày hiệu lực) và "Booking Date" (Ngày ghi sổ) khác nhau thế nào?
- **Trả lời:** Booking Date là thời điểm thực tế giao dịch được ghi nhận vào hệ thống phần mềm. Value Date là ngày mà số tiền đó chính thức được tính lãi hoặc trích lãi theo thỏa thuận hợp đồng tài chính. Hai ngày này có thể khác nhau trong các giao dịch phát sinh vào ngày nghỉ hoặc giao dịch tài trợ thương mại.

#### 9. Mã CIF (Customer Information File) là gì?
- **Trả lời:** Là số định danh hồ sơ khách hàng tập trung duy nhất của một cá nhân hoặc doanh nghiệp tại ngân hàng. Một mã CIF có thể gắn liền với nhiều số tài khoản thanh toán, sổ tiết kiệm, thẻ tín dụng và hợp đồng vay vốn.

#### 10. Tại sao trong Core Banking, số dư tiền gửi của khách hàng lại được xếp vào Tài khoản Loại 4 (Nợ phải trả)?
- **Trả lời:** Vì đối với Ngân hàng, tiền của khách hàng gửi vào không phải là tài sản của ngân hàng mà là khoản tiền ngân hàng đang "mượn" của khách hàng và có nghĩa vụ pháp lý phải hoàn trả lại khi khách hàng yêu cầu.

---

## Nhóm 3: Hệ Thống Thẻ & POS (Cards & Acquiring)

#### 11. Trình bày sự khác biệt giữa Thẻ Ghi Nợ (Debit Card) và Thẻ Tín Dụng (Credit Card)?
- **Trả lời:** Thẻ Ghi nợ trừ tiền trực tiếp từ số dư tài khoản thanh toán (CASA) của khách hàng ("Chi tiêu tiền của mình"). Thẻ Tín dụng sử dụng hạn mức thấu chi do ngân hàng cấp trước ("Vay tiền ngân hàng chi tiêu trước, trả nợ sau") với thời gian miễn lãi tối đa 45 - 55 ngày.

#### 12. Quá trình Authorization (Ủy quyền) trong giao dịch thẻ thực chất là gì?
- **Trả lời:** Là việc ngân hàng phát hành (Issuer) kiểm tra số dư hoặc hạn mức tín dụng của chủ thẻ, nếu đủ điều kiện thì tạm khoá (Hold) số tiền giao dịch và cấp mã Auth Code cho máy POS/cổng thanh toán. Lúc này tiền chưa được chuyển sang người bán.

#### 13. Phí MDR (Merchant Discount Rate) là gì và bên nào phải chịu?
- **Trả lời:** Là phí chiết khấu chấp nhận thanh toán mà Đơn vị chấp nhận thẻ (Merchant - người bán hàng) phải trả cho Ngân hàng thanh toán (Acquirer) trên mỗi giao dịch quẹt thẻ thành công (thường từ 1.5% đến 2.5%). Khách hàng mua hàng theo quy định không được phép bị thu thêm khoản phí này.

#### 14. Phí Interchange Fee (Phí chia sẻ thẻ) là gì?
- **Trả lời:** Là khoản phí mà Ngân hàng thanh toán (Acquirer) phải trả cho Ngân hàng phát hành thẻ (Issuer) trên mỗi giao dịch thanh toán để bù đắp chi phí vốn, chương trình ưu đãi và rủi ro tín dụng.

#### 15. Quy trình Đòi bồi hoàn (Chargeback) diễn ra khi nào?
- **Trả lời:** Khi chủ thẻ khiếu nại về một giao dịch gian lận (bị lộ thông tin thẻ) hoặc giao dịch đã thanh toán nhưng người bán không giao hàng/giao hàng hỏng. Tổ chức thẻ (Visa/Mastercard) sẽ can thiệp và yêu cầu Acquirer/Merchant xuất trình chứng từ hợp lệ trong thời hạn quy định, nếu không sẽ tự động trích tiền hoàn trả lại cho chủ thẻ.

---

## Nhóm 4: Tín Dụng & Cho Vay Số (Digital Lending)

#### 16. Phân biệt 5 nhóm nợ theo phân loại của Ngân hàng Nhà nước Việt Nam?
- **Trả lời:** Nhóm 1 (Đủ tiêu chuẩn: quá hạn < 10 ngày); Nhóm 2 (Cần chú ý: quá hạn 10 - 90 ngày); Nhóm 3 (Dưới tiêu chuẩn: quá hạn 91 - 180 ngày); Nhóm 4 (Nghi ngờ: quá hạn 181 - 360 ngày); Nhóm 5 (Có khả năng mất vốn: quá hạn > 360 ngày).

#### 17. Chỉ số DTI (Debt-to-Income) là gì và tại sao BA cần quan tâm khi xây dựng luồng vay trực tuyến?
- **Trả lời:** Là tỷ lệ Tổng nghĩa vụ trả nợ hàng tháng trên Tổng thu nhập hàng tháng của khách hàng. Đây là chỉ số then chốt được cấu hình trong Rule Engine (BRMS) để quyết định hạn mức cho vay tối đa, đảm bảo khách hàng không bị quá tải nợ dẫn đến vỡ nợ (thường ngưỡng an toàn DTI $\le 40\% - 50\%$).

#### 18. Quy trình Straight-Through Processing (STP) trong Digital Lending là gì?
- **Trả lời:** Là quy trình phê duyệt và giải ngân khoản vay hoàn toàn tự động 100% bằng thuật toán và API kết nối (eKYC -> CIC -> Scoring -> Ký hợp đồng điện tử -> Giải ngân tiền vào tài khoản) mà không cần bất kỳ sự can thiệp thủ công nào của con người.

#### 19. Hệ thống CIC cung cấp những thông tin gì cho ngân hàng?
- **Trả lời:** Lịch sử dư nợ hiện tại và quá khứ tại tất cả các tổ chức tín dụng tại Việt Nam, nhóm nợ cao nhất từng bị trong 5 năm gần nhất, số lượng thẻ tín dụng đang mở, các tài sản đang thế chấp và điểm tín dụng quốc gia.

#### 20. Trả nợ theo phương thức "Dư nợ giảm dần" khác "Dư nợ ban đầu" như thế nào?
- **Trả lời:** Dư nợ ban đầu tính lãi suất cố định trên số tiền vay gốc ban đầu trong suốt toàn bộ kỳ hạn vay. Dư nợ giảm dần chỉ tính lãi trên số tiền gốc thực tế còn nợ lại sau khi đã trừ đi phần gốc đã trả ở các kỳ trước, giúp khách hàng trả ít tiền lãi hơn theo thời gian.

---

## Nhóm 5: eKYC, Bảo Mật & Pháp Chế (Compliance & Security)

#### 21. Quyết định 2345/QĐ-NHNN quy định ngưỡng xác thực sinh trắc học như thế nào?
- **Trả lời:** Giao dịch chuyển tiền từ 10 triệu VND/lần trở lên HOẶC tổng giá trị giao dịch trong ngày vượt quá 20 triệu VND bắt buộc phải xác thực sinh trắc học khuôn mặt khớp với dữ liệu sinh trắc học thu thập từ chip CCCD. Ngoài ra, lần đầu tiên đăng nhập ứng dụng trên thiết bị di động mới cũng bắt buộc xác thực sinh trắc học.

#### 22. Tại sao luồng eKYC chuẩn ngân hàng lại bắt buộc phải quét chip NFC trên CCCD?
- **Trả lời:** Ảnh chụp CCCD thông thường (OCR) rất dễ bị làm giả bằng công nghệ in 3D, photoshop hoặc thẻ nhựa giả. Chip NFC lưu trữ dữ liệu được mã hoá theo chuẩn ICAO 9303 và được ký số bằng chữ ký số bảo mật của Bộ Công An, giúp ngân hàng xác thực 100% tài liệu là thật và chống lại hiện tượng mở tài khoản bằng giấy tờ giả mạo.

#### 23. Liveness Detection trong sinh trắc học khuôn mặt là gì?
- **Trả lời:** Là công nghệ phân tích nhận diện người thật sống đang hiện diện trước camera, ngăn chặn các hình thức tấn công giả mạo (Spoofing) như cầm ảnh in, đeo mặt nạ silicon hoặc dùng video Deepfake phát lại qua màn hình điện thoại khác.

#### 24. AML là viết tắt của từ gì và nhiệm vụ của hệ thống AML trong ngân hàng là gì?
- **Trả lời:** Anti-Money Laundering (Phòng chống rửa tiền). Hệ thống AML tự động rà soát danh sách trừng phạt quốc tế (Sanction Lists), giám sát và phát hiện các mẫu hành vi giao dịch bất thường (giao dịch giá trị lớn, phân tán nhỏ dòng tiền rồi gom lại) để báo cáo Cục Phòng chống rửa tiền của Ngân hàng Nhà nước.

#### 25. Báo cáo STR (Suspicious Transaction Report) và CTR (Cash Transaction Report) khác nhau thế nào?
- **Trả lời:** CTR là báo cáo giao dịch tiền mặt có giá trị lớn theo ngưỡng luật định (từ 400 triệu VND trở lên). STR là báo cáo giao dịch đáng ngờ dựa trên dấu hiệu bất thường không hợp lý về mặt kinh tế của khách hàng mà không phụ thuộc vào giá trị giao dịch lớn hay nhỏ.

#### 26. PCI-DSS là gì và nó áp dụng cho các hệ thống nào của ngân hàng?
- **Trả lời:** Payment Card Industry Data Security Standard - Tiêu chuẩn bảo mật dữ liệu thẻ thanh toán quốc tế bắt buộc đối với tất cả các tổ chức lưu trữ, xử lý hoặc truyền dẫn dữ liệu thẻ (Visa/Mastercard). Yêu cầu mã hoá số thẻ (PAN), tuyệt đối không được lưu mã CVV/CVC2 sau khi hoàn tất xác thực.

#### 27. Tokenization trong dịch vụ thanh toán di động (như Apple Pay, Google Pay) hoạt động như thế nào?
- **Trả lời:** Số thẻ thực tế (16 số PAN) của khách hàng được thay thế bằng một chuỗi mã định danh duy nhất (Token). Số thẻ thật được lưu trữ an toàn trong kho Vault của Tổ chức thẻ. Khi thanh toán tại máy POS, ứng dụng chỉ truyền Token này đi, nên dù kẻ gian có nghe lén đường truyền cũng không thể lấy được thông tin thẻ thật của khách hàng.

#### 28. "Smart OTP" (Soft OTP) an toàn hơn "SMS OTP" ở những điểm nào?
- **Trả lời:** SMS OTP truyền qua sóng viễn thông không được mã hoá, dễ bị tấn công trộm tin nhắn qua SIM rác (SIM Swap attack) hoặc trạm phát sóng giả (IMSI Catcher). Smart OTP được sinh ra và mã hoá cục bộ ngay trên thiết bị di động của người dùng gắn liền với mã giao dịch cụ thể, không phụ thuộc vào sóng điện thoại viễn thông và không thể bị đánh chặn từ xa.

#### 29. Khái niệm "Two-Factor Authentication" (2FA) trong bảo mật ngân hàng được định nghĩa ra sao?
- **Trả lời:** Là cơ chế xác thực yêu cầu kết hợp ít nhất 2 trong 3 yếu tố độc lập: (1) Điều bạn biết (Something you know: Mật khẩu, mã PIN); (2) Điều bạn có (Something you have: Thiết bị đã đăng ký, SIM điện thoại, thẻ vật lý); (3) Điều thuộc về bản thân bạn (Something you are: Vân tay, nhận diện khuôn mặt sinh trắc học).

#### 30. Một Banking BA cần chuẩn bị những tài liệu gì trước khi bàn giao một tính năng thanh toán mới cho đội ngũ phát triển (Dev & QA)?
- **Trả lời:** Bộ tài liệu bàn giao chuẩn mực gồm: (1) Tài liệu đặc tả yêu cầu nghiệp vụ BRD / User Stories chuẩn INVEST; (2) Sơ đồ quy trình nghiệp vụ BPMN 2.0 và Sequence Diagram; (3) Tiêu chí nghiệm thu chi tiết chuẩn Gherkin AC cho cả Happy path và Edge cases; (4) Từ điển dữ liệu Data Dictionary chi tiết kiểu dữ liệu tiền tệ; (5) Đặc tả hợp đồng API Contract (Request/Response JSON/XML) có Idempotency Key; và (6) Ma trận kiểm thử biên QA Matrix.
