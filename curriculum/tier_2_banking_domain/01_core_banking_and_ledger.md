# [TIER 2 - BÀI 1] Kiến Trúc Core Banking, Hệ Thống Tài Khoản (COA) & Nguyên Lý Bút Toán Kép

**Mục tiêu bài học:** Hiểu tường tận "trái tim" của một ngân hàng – **Hệ thống Core Banking** (T24 Temenos, Flexcube Oracle, Finacle Infosys), Hệ thống Tài khoản Kế toán (Chart of Accounts - COA), và cách một BA thiết kế các luồng giao dịch tuân thủ **Nguyên lý Kế toán Kép (Double-Entry Bookkeeping)**.

---

## 1. Core Banking Là Gì Và Tại Sao Nó Là "Trái Tim" Của Ngân Hàng?

Mọi dịch vụ số hào nhoáng như Mobile Banking, Internet Banking, Apple Pay, hay VietQR đều chỉ là **kênh giao tiếp (Channel Layer)** bên ngoài. Cuối cùng, mọi đồng tiền ra vào đều phải được ghi nhận vào hệ thống **Core Banking (Centralized Online Real-Time Electronic Banking)**.

### 4 Chức năng cốt lõi của Core Banking:
1. **Quản lý thông tin khách hàng tập trung (CIF - Customer Information File):** Mỗi cá nhân/doanh nghiệp có 1 mã CIF duy nhất quản lý toàn bộ tài khoản, khoản vay, thẻ và tiền gửi.
2. **Quản lý tài khoản tiền gửi & thanh toán (CASA - Current Account & Savings Account):** Tính lãi suất hàng ngày, phong tỏa, trích nợ tự động.
3. **Quản lý khoản vay & tín dụng (Loans & Advances):** Theo dõi lịch trả nợ gốc/lãi, phân loại nhóm nợ (Nhóm 1 đến Nhóm 5).
4. **Sổ Cái Kế Toán Tổng Hợp (General Ledger - GL):** Phản ánh toàn bộ tài sản, công nợ, vốn chủ sở hữu và doanh thu/chi phí của toàn ngân hàng.

---

## 2. Hệ Thống Tài Khoản Kế Toán (Chart of Accounts - COA)

Ngân hàng Nhà nước Việt Nam (SBV) ban hành Hệ thống Tài khoản Kế toán các Tổ chức Tín dụng (Quyết định 479/2004/QĐ-NHNN và các văn bản sửa đổi). Mọi tài khoản trong Core Banking đều tuân theo phân loại 9 loại tài khoản:

| Loại Tài Khoản | Tên Phân Loại | Tính Chất Số Dư | Ví Dụ Nghiệp Vụ Cụ Thể |
| :---: | :--- | :--- | :--- |
| **Loại 1** | Tiền mặt, chứng từ có giá trị và các khoản đầu tư | Luôn có số dư **BÊN NỢ (Debit)** | Tài khoản 1011 (Tiền mặt tại quỹ ngân hàng) |
| **Loại 2** | Hoạt động tín dụng (Cho khách hàng vay) | Luôn có số dư **BÊN NỢ (Debit)** | Tài khoản 2111 (Cho vay ngắn hạn khách hàng cá nhân) |
| **Loại 3** | Hoạt động liên ngân hàng & Thanh toán bù trừ | Có thể Dư Nợ hoặc Dư Có | Tài khoản 388 (Tài khoản trung gian chờ đối soát bù trừ) |
| **Loại 4** | Tiền gửi của khách hàng (CASA, Tiết kiệm) | Luôn có số dư **BÊN CÓ (Credit)** | Tài khoản 4211 (Tiền gửi không kỳ hạn của khách hàng) |
| **Loại 5** | Các khoản phải trả (Công nợ của ngân hàng) | Luôn có số dư **BÊN CÓ (Credit)** | Tài khoản 519 (Tài khoản thanh toán qua cổng điện tử) |
| **Loại 6** | Vốn chủ sở hữu và các quỹ dự trữ | Luôn có số dư **BÊN CÓ (Credit)** | Vốn điều lệ ngân hàng |
| **Loại 7** | Thu nhập của ngân hàng (Lãi vay, phí dịch vụ) | Luôn có số dư **BÊN CÓ (Credit)** | Thu phí duy trì tài khoản, phí chuyển tiền |
| **Loại 8** | Chi phí của ngân hàng (Trả lãi tiết kiệm, vận hành) | Luôn có số dư **BÊN NỢ (Debit)** | Chi phí trả lãi tiền gửi cho khách |
| **Loại 9** | Các cam kết ngoại bảng (Bảo lãnh, L/C, nợ khó đòi) | Theo dõi riêng ngoài bảng cân đối kế toán | Thư tín dụng bảo lãnh thương mại L/C |

---

## 3. Nguyên Lý Kế Toán Kép (Double-Entry Bookkeeping) - "Nợ Có Phải Cân"

Trong ngân hàng, tiền **không tự sinh ra và không tự mất đi**, nó chỉ chuyển dịch từ tài khoản này sang tài khoản khác. Bất kỳ giao dịch nào cũng phải sinh ra một cặp bút toán:

$$\sum \text{Debit (Nợ)} = \sum \text{Credit (Có)}$$

> [!IMPORTANT]
> **Góc nhìn đảo ngược giữa Khách Hàng và Ngân Hàng:**  
> - Khi bạn gửi tiền vào tài khoản, tin nhắn báo: *"Tài khoản của bạn được ghi CÓ (Credit) 10 triệu"*.  
> - **Tại sao lại là Ghi Có?** Vì đối với Ngân hàng, tiền của bạn là một **Khoản Nợ (Liability - Tài khoản loại 4)** mà ngân hàng đang nợ bạn!  
> - Khi bạn rút tiền ra, ngân hàng **Ghi Nợ (Debit)** tài khoản của bạn, nghĩa là khoản nợ của ngân hàng với bạn đã giảm xuống.

### Ví Dụ Bút Toán Khi Khách Hàng Nộp 10,000,000 VND Tiền Mặt Vào Tài Khoản:
1. **NỢ (Debit) TK 1011 (Tiền mặt tại quỹ):** $+10,000,000 \text{ VND}$ *(Tài sản của ngân hàng tăng lên)*
2. **CÓ (Credit) TK 4211 (Tiền gửi của khách hàng):** $+10,000,000 \text{ VND}$ *(Nghĩa vụ nợ của ngân hàng với khách hàng tăng lên)*

### Ví Dụ Bút Toán Khi Khách Hàng Trả Phí Dịch Vụ 55,000 VND (Đã gồm 10% VAT):
1. **NỢ (Debit) TK 4211 (Tài khoản khách hàng):** $55,000 \text{ VND}$ *(Trừ tiền trong tài khoản khách)*
2. **CÓ (Credit) TK 7111 (Thu nhập phí dịch vụ thanh toán):** $50,000 \text{ VND}$ *(Doanh thu thuần của ngân hàng)*
3. **CÓ (Credit) TK 4531 (Thuế GTGT phải nộp nhà nước):** $5,000 \text{ VND}$ *(Công nợ thuế ngân hàng nộp hộ)*

---

## 4. Chu Kỳ Khóa Sổ Cuối Ngày (End-of-Day Batch Job - EOD)

Mỗi đêm (thường từ 23:00 đến 02:00 sáng hôm sau), Core Banking sẽ chạy một tiến trình khổng lồ gọi là **EOD Batch Processing**:
- Tính lãi dồn tích hàng ngày (Daily Accrual Interest) cho toàn bộ tài khoản tiết kiệm và dư nợ cho vay.
- Trích nợ tự động các khoản nợ vay đến hạn trả (Auto-Debit).
- Chuyển nhóm nợ nếu khách hàng quá hạn (Quá hạn 10 ngày nhảy sang Nhóm 2 - Nợ cần chú ý).
- Đóng sổ cái và xuất Bảng cân đối tài khoản kế toán hàng ngày để nộp báo cáo Ngân hàng Nhà nước.

> [!WARNING]
> **Lưu ý cho Banking BA khi thiết kế tính năng 24/7:**  
> Trong khung giờ EOD chạy, Core Banking có thể bị "khoá tạm thời" hoặc chuyển sang chế độ Stand-by (chỉ đọc). BA phải thiết kế cơ chế **Shadow Balance / Stand-in Processing (STIP)** trên tầng Middleware để khách hàng vẫn có thể quẹt thẻ hoặc rút tiền ATM trong lúc Core Banking đang khóa sổ!
