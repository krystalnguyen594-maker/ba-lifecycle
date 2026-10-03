export interface RelatedCaseStudy {
  slug: string
  title: string
  phase: string
  reason: string
}

export interface QuickCheck {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface Lesson {
  id: string
  title: string
  subtitle: string
  tier: 'tier-1' | 'tier-2' | 'tier-3'
  category: string
  estimatedMinutes: number
  filePath: string
  skillsCovered: string[]
  keyTakeaways: string[]
  prerequisites?: string[]
  unlocks?: string[]
  relatedCaseStudies?: RelatedCaseStudy[]
  relatedInterviewIds?: string[]
  quickCheck?: QuickCheck
}

export interface QuizQuestion {
  id: string
  tier: 'tier-1' | 'tier-2' | 'tier-3'
  category: 'BABOK' | 'Core Banking' | 'Payments' | 'Cards' | 'Lending' | 'Compliance' | 'API & Data Modeling' | 'Process Modeling'
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  bankReference?: string
}

export interface InterviewQuestion {
  id: string
  category: 'Behavioral' | 'Technical' | 'Banking Domain'
  bank: string
  question: string
  summaryAnswer: string
  starTips: string[]
  redFlags: string[]
}

export const TIER_INFO = {
  'tier-1': {
    title: 'Tầng 1: Nền Tảng BABOK v3 & Kỹ Năng Kỹ Thuật BA',
    description: 'Làm chủ 6 vùng tri thức BABOK v3, kỹ thuật khơi gợi yêu cầu, vẽ luồng BPMN 2.0, viết User Story INVEST và đặc tả API/Data Dictionary chuẩn tài chính.',
    badge: 'BABOK Foundation',
    color: 'from-blue-600 to-cyan-500'
  },
  'tier-2': {
    title: 'Tầng 2: Bản Đồ Nghiệp Vụ Ngân Hàng & Fintech Chuyên Sâu',
    description: 'Thấu hiểu tường tận Core Banking, Sổ cái kế toán bút toán kép, Mạng chuyển mạch Napas 247/SWIFT, Hệ thống thẻ Visa/Mastercard, Cho vay trực tuyến STP và eKYC/AML.',
    badge: 'Banking Mastery',
    color: 'from-indigo-600 to-purple-600'
  },
  'tier-3': {
    title: 'Tầng 3: Thực Chiến 5 Phases Với Bài Toán Ngân Hàng Thật',
    description: 'Trực tiếp phân tích và thiết kế giải pháp cho các bài toán kinh điển: Hoàn tiền lỗi mạng, Chia bill QR, và Công cụ Loyalty Cashback theo mô hình Docs-as-Code.',
    badge: 'Real-world Capstone',
    color: 'from-emerald-600 to-teal-500'
  }
}

export const LESSONS: Lesson[] = [
  // TIER 1
  {
    id: '01_business_analysis_overview',
    title: 'Tổng Quan Về Nghề BA Trong Ngân Hàng & BABOK v3',
    subtitle: 'Vị trí cầu nối giữa Khối Kinh Doanh, Khối IT và Đối tác Chuyển mạch liên ngân hàng',
    tier: 'tier-1',
    category: 'BABOK Foundation',
    estimatedMinutes: 20,
    filePath: 'curriculum/tier_1_babok_foundation/01_business_analysis_overview.md',
    skillsCovered: ['BABOK v3 6 KAs', 'Agile Digital Squad', 'Gap Analysis', 'AS-IS & TO-BE'],
    keyTakeaways: [
      'Nắm vững 3 khối mà Banking BA kết nối: Business, IT Core/Microservices và Đối tác Napas/CIC/SBV.',
      'Hiểu rõ 6 Knowledge Areas của BABOK v3 trong thực tế ngân hàng.',
      'Phân biệt mô hình Water-Scrum-Fall thực tế tại các Ngân hàng Việt Nam.'
    ],
    prerequisites: [],
    unlocks: ['02_elicitation_stakeholder_mgmt'],
    relatedCaseStudies: [],
    relatedInterviewIds: ['int-1'],
    quickCheck: {
      question: 'Trong các ngân hàng Việt Nam hiện nay, mô hình phối hợp nào giữa Business và IT là phổ biến nhất trong các dự án Ngân hàng số?',
      options: [
        'Mô hình Waterfall cứng nhắc 100% không cho thay đổi yêu cầu',
        'Mô hình Agile Squad đa chức năng (Scrum) kết hợp quản trị tuân thủ (Water-Scrum-Fall)',
        'Mô hình Kanban không cần viết tài liệu phân tích nghiệp vụ',
        'Mô hình để Developer tự nói chuyện trực tiếp với Khách hàng không qua BA'
      ],
      correctIndex: 1,
      explanation: 'Hầu hết các Ngân hàng số áp dụng mô hình Digital Squad (Scrum) linh hoạt cho tầng Kênh (Mobile/Web), nhưng vẫn kết hợp Waterfall có cổng kiểm soát chặt chẽ ở tầng Core Banking và Pháp chế/Tuân thủ (Mô hình Water-Scrum-Fall).'
    }
  },
  {
    id: '02_elicitation_stakeholder_mgmt',
    title: 'Kỹ Thuật Khơi Gợi Yêu Cầu & Quản Lý Xung Đột Stakeholder',
    subtitle: 'Nghệ thuật dung hòa mâu thuẫn kinh điển giữa Khối Kinh Doanh (UX) và Khối Rủi Ro (Bảo mật)',
    tier: 'tier-1',
    category: 'Elicitation & Collaboration',
    estimatedMinutes: 25,
    filePath: 'curriculum/tier_1_babok_foundation/02_elicitation_stakeholder_mgmt.md',
    skillsCovered: ['JAD Workshop', 'Document Analysis', 'Job Shadowing', 'Trade-off Matrix'],
    keyTakeaways: [
      'Áp dụng Document Analysis đọc Thông tư NHNN trước khi họp với Stakeholder.',
      'Sử dụng Risk-Based Tiering để cân bằng giữa trải nghiệm khách hàng và an toàn bảo mật.',
      'Nguyên tắc vàng: Thuyết phục Khối Rủi ro bằng dữ liệu định lượng, không tranh cãi cảm tính.'
    ],
    prerequisites: ['01_business_analysis_overview'],
    unlocks: ['03_business_process_bpmn_modeling'],
    relatedCaseStudies: [
      {
        slug: 'payment_network_error_refund',
        title: 'Hoàn Tiền Khi Lỗi Mạng',
        phase: 'Phase 2: Elicitation Grill',
        reason: 'Áp dụng Grill Decision Log để giải quyết mâu thuẫn giữa Trải nghiệm hoàn tiền tức thì vs Rủi ro mất vốn đối soát với Ngân hàng.'
      }
    ],
    relatedInterviewIds: ['int-1'],
    quickCheck: {
      question: 'Khi Khối Kinh Doanh muốn bỏ bớt bước xác thực để tăng chuyển đổi, còn Khối Rủi Ro muốn giữ bảo mật nghiêm ngặt, giải pháp kỹ thuật tối ưu của BA là gì?',
      options: [
        'Nghe theo bên nào có chức vụ cao hơn trong cuộc họp',
        'Áp dụng mô hình Phân Tầng Theo Mức Độ Rủi Ro (Risk-Based Tiering): Giao dịch nhỏ xác thực nhanh, giao dịch lớn hoặc bất thường mới kích hoạt đa tầng bảo mật',
        'Bỏ qua cả 2 bên và tự quyết định theo ý mình',
        'Tạo ra 2 ứng dụng riêng biệt'
      ],
      correctIndex: 1,
      explanation: 'Risk-Based Tiering là tiêu chuẩn vàng của ngành Fintech & Banking: Tối ưu trải nghiệm cho 90% giao dịch thông thường, và tập trung lớp phòng thủ cho 10% giao dịch có rủi ro cao.'
    }
  },
  {
    id: '03_business_process_bpmn_modeling',
    title: 'Mô Hình Hóa Quy Trình Chuẩn BPMN 2.0 & UML',
    subtitle: 'Vẽ luồng nghiệp vụ chuyển tiền liên ngân hàng 24/7 không kẽ hở cho Dev & QA',
    tier: 'tier-1',
    category: 'Process Modeling',
    estimatedMinutes: 30,
    filePath: 'curriculum/tier_1_babok_foundation/03_business_process_bpmn_modeling.md',
    skillsCovered: ['BPMN 2.0 Gateways', 'Swimlanes', 'Sequence Diagram', 'Hold & Settlement Flow'],
    keyTakeaways: [
      'Phân biệt Exclusive XOR, Parallel AND và Event-based Gateway trong ngân hàng.',
      'Nguyên tắc: Khoá số dư (Hold) trước khi gọi API đối tác, không trừ tiền thật trước.',
      'Tránh 3 lỗi sai chí mạng: Happy Path Only, nhầm lẫn Hold với Debit, và thiếu luồng Reversal.'
    ],
    prerequisites: ['02_elicitation_stakeholder_mgmt'],
    unlocks: ['04_user_stories_gherkin_invest', '02_payment_switching_napas_swift'],
    relatedCaseStudies: [
      {
        slug: 'bill_splitting',
        title: 'Chia Hoá Đơn Nhóm Qua QR',
        phase: 'Phase 3: Analysis & Modeling',
        reason: 'Sơ đồ luồng BPMN kết hợp trạng thái phòng chia tiền và gọi thanh toán P2P.'
      }
    ],
    relatedInterviewIds: ['int-2', 'int-3'],
    quickCheck: {
      question: 'Khi thiết kế quy trình chuyển tiền liên ngân hàng gọi sang bên thứ 3 (Napas/Visa), bước nào sau đây PHẢI thực hiện trước khi gửi request ra ngoài?',
      options: [
        'Hạch toán trừ tiền thật và ghi Có cho người nhận ngay lập tức',
        'Tạm khoá số dư khả dụng (Hold / Reserve Funds) trên tài khoản người gửi',
        'Gửi email thông báo cho người nhận',
        'Đợi đối tác gửi kết quả rồi mới kiểm tra số dư'
      ],
      correctIndex: 1,
      explanation: 'Bắt buộc phải Hold Funds để đảm bảo người gửi không tẩu tán số dư ở kênh khác trong lúc giao dịch đang bay, đồng thời chưa trừ tiền thật để tránh lệch sổ cái nếu đối tác bị timeout.'
    }
  },
  {
    id: '04_user_stories_gherkin_invest',
    title: 'Viết User Stories & Gherkin AC Chuẩn Mực Trong Ngân Hàng',
    subtitle: 'Phân rã tiêu chuẩn INVEST và thiết kế 3 tầng kịch bản nghiệm thu không thể bị bắt bẻ',
    tier: 'tier-1',
    category: 'Requirements Engineering',
    estimatedMinutes: 25,
    filePath: 'curriculum/tier_1_babok_foundation/04_user_stories_gherkin_invest.md',
    skillsCovered: ['INVEST Criteria', 'BDD Gherkin', 'Given-When-Then', 'VietQR 2345 AC'],
    keyTakeaways: [
      'Áp dụng bộ tiêu chuẩn INVEST để cắt nhỏ User Story vừa vặn Sprint 2-5 Story Points.',
      'Viết Acceptance Criteria đủ 3 tầng: Happy Path, Negative Validation, và Edge Case/Timeout.',
      'Kịch bản mẫu chuyển tiền VietQR xác thực sinh trắc học theo QĐ 2345/QĐ-NHNN.'
    ],
    prerequisites: ['03_business_process_bpmn_modeling'],
    unlocks: ['05_api_data_dictionary_spec', '05_ekyc_biometrics_aml_compliance'],
    relatedCaseStudies: [
      {
        slug: 'payment_network_error_refund',
        title: 'Hoàn Tiền Khi Lỗi Mạng',
        phase: 'Phase 3: Analysis & Modeling',
        reason: 'Bộ kịch bản Acceptance Criteria chuẩn Gherkin xử lý timeout và bồi hoàn voucher.'
      }
    ],
    relatedInterviewIds: ['int-2'],
    quickCheck: {
      question: 'Một bộ Acceptance Criteria (AC) chuẩn chỉnh trong ngân hàng bắt buộc phải bao quát đủ 3 tầng kịch bản nào?',
      options: [
        'Chỉ cần kịch bản Thành công (Happy Path) là đủ cho Dev làm',
        'Happy Path, Negative Path (Lỗi nhập liệu/Không đủ điều kiện), và Edge Case / System Failure (Timeout/Rớt mạng/Spam)',
        'Kịch bản giao diện đẹp, kịch bản tải nhanh, kịch bản màu sắc',
        'Kịch bản tiếng Việt và kịch bản tiếng Anh'
      ],
      correctIndex: 1,
      explanation: 'Trong ngân hàng, các kịch bản ngoại lệ và lỗi mạng chiếm tới 80% rủi ro tài chính, do đó AC bắt buộc phải bao quát cả 3 tầng: Happy Path, Negative Validation và Edge Cases.'
    }
  },
  {
    id: '05_api_data_dictionary_spec',
    title: 'Thiết Kế Data Dictionary & Đặc Tả Hợp Đồng API Ngân Hàng',
    subtitle: 'Kiểu dữ liệu tiền tệ chống sai số làm tròn và cơ chế khoá Idempotency Key chống trừ tiền kép',
    tier: 'tier-1',
    category: 'API & Data Modeling',
    estimatedMinutes: 30,
    filePath: 'curriculum/tier_1_babok_foundation/05_api_data_dictionary_spec.md',
    skillsCovered: ['DECIMAL vs Float', 'Idempotency Key', 'Correlation ID', 'RESTful API Spec'],
    keyTakeaways: [
      'Tuyệt đối không dùng Float/Double cho tiền tệ, bắt buộc dùng DECIMAL(18,2) hoặc BIGINT.',
      'Thiết kế X-Idempotency-Key và Redis Lock để chống trừ tiền đúp khi mạng lag.',
      'X-Correlation-ID xuyên suốt các microservices phục vụ truy vết sự cố.'
    ],
    prerequisites: ['04_user_stories_gherkin_invest'],
    unlocks: ['01_core_banking_and_ledger'],
    relatedCaseStudies: [
      {
        slug: 'payment_network_error_refund',
        title: 'Hoàn Tiền Khi Lỗi Mạng',
        phase: 'Phase 3: Data & API Spec',
        reason: 'Đặc tả bảng payment_transactions, refund_audit_logs và API timeout-resolver có Idempotency.'
      }
    ],
    relatedInterviewIds: ['int-5'],
    quickCheck: {
      question: 'Tại sao trong các hệ thống Core Banking và Cổng thanh toán, tuyệt đối KHÔNG ĐƯỢC dùng kiểu dữ liệu FLOAT hoặc DOUBLE để lưu trữ số tiền?',
      options: [
        'Vì kiểu FLOAT không hỗ trợ số âm',
        'Vì chuẩn dấu phẩy động IEEE 754 gây sai số làm tròn (Rounding Error), tích lũy qua nhiều giao dịch sẽ làm lệch sổ cái kế toán',
        'Vì kiểu FLOAT chiếm quá nhiều dung lượng bộ nhớ',
        'Vì cơ sở dữ liệu SQL không hỗ trợ kiểu FLOAT'
      ],
      correctIndex: 1,
      explanation: 'Số thực dấu phẩy động biểu diễn nhị phân không chính xác (vd: 0.1 + 0.2 = 0.30000000000000004), gây sai lệch tiền lẻ hàng tỷ đồng khi đối soát. Bắt buộc dùng DECIMAL hoặc BIGINT.'
    }
  },

  // TIER 2
  {
    id: '01_core_banking_and_ledger',
    title: 'Kiến Trúc Core Banking, Hệ Thống Tài Khoản (COA) & Bút Toán Kép',
    subtitle: 'Giải mã "trái tim" của ngân hàng, 9 loại tài khoản kế toán và chu kỳ khoá sổ EOD',
    tier: 'tier-2',
    category: 'Core Banking & Accounting',
    estimatedMinutes: 35,
    filePath: 'curriculum/tier_2_banking_domain/01_core_banking_and_ledger.md',
    skillsCovered: ['Core Banking T24/Flexcube', 'Chart of Accounts (COA)', 'Double-Entry Bookkeeping', 'EOD Batch Job'],
    keyTakeaways: [
      'Hiểu rõ 9 loại tài khoản theo QĐ 479/2004/QĐ-NHNN (Tài khoản loại 4 là Nợ Phải Trả).',
      'Nguyên lý bất biến: Tổng Nợ (Debit) luôn bằng Tổng Có (Credit).',
      'Chu kỳ chạy EOD ban đêm và giải pháp Stand-In Processing (STIP) cho các kênh 24/7.'
    ],
    prerequisites: ['05_api_data_dictionary_spec'],
    unlocks: ['03_cards_pos_merchant_clearing'],
    relatedCaseStudies: [
      {
        slug: 'sample_e_wallet_cashback',
        title: 'Hệ Thống Cashback Loyalty',
        phase: 'Phase 3: Ledger Accounting',
        reason: 'Hạch toán bút toán kép chi phí khuyến mại vào tài khoản General Ledger.'
      }
    ],
    relatedInterviewIds: ['int-3'],
    quickCheck: {
      question: 'Khi khách hàng nộp 10,000,000 VND tiền mặt vào tài khoản thanh toán của mình tại ngân hàng, bút toán kế toán kép trong Core Banking được ghi nhận như thế nào?',
      options: [
        'Nợ (Debit) TK 4211 (Khách hàng) / Có (Credit) TK 1011 (Tiền mặt)',
        'Nợ (Debit) TK 1011 (Tiền mặt tại quỹ) / Có (Credit) TK 4211 (Tiền gửi của khách hàng)',
        'Chỉ cần ghi Có TK 4211 là xong không cần ghi Nợ',
        'Ghi Nợ tài khoản doanh thu của ngân hàng'
      ],
      correctIndex: 1,
      explanation: 'Tiền mặt của ngân hàng tăng lên (Tài sản tăng ➔ Ghi NỢ TK 1011); nghĩa vụ nợ của ngân hàng với khách hàng tăng lên (Nợ phải trả tăng ➔ Ghi CÓ TK 4211).'
    }
  },
  {
    id: '02_payment_switching_napas_swift',
    title: 'Chuyển Mạch Thanh Toán Napas 247, Chuẩn ISO & Mạng Lưới SWIFT',
    subtitle: 'Cơ chế bù trừ ròng liên ngân hàng, so sánh ISO 8583 vs ISO 20022, tài khoản Nostro/Vostro',
    tier: 'tier-2',
    category: 'Payments & Switching',
    estimatedMinutes: 35,
    filePath: 'curriculum/tier_2_banking_domain/02_payment_switching_napas_swift.md',
    skillsCovered: ['Napas 247 Real-time', 'Net Clearing CITAD', 'ISO 8583 vs ISO 20022', 'SWIFT Nostro/Vostro'],
    keyTakeaways: [
      'Khách nhận tiền sau 2s nhưng quyết toán bù trừ ròng giữa các Bank chỉ diễn ra 3 phiên/ngày tại NHNN.',
      'So sánh ISO 8583 (Legacy Bitmap) với ISO 20022 (Rich XML/JSON hiện đại).',
      'Cặp tài khoản thanh toán quốc tế: Nostro (Của ta tại bạn) và Vostro (Của bạn tại ta).'
    ],
    prerequisites: ['03_business_process_bpmn_modeling'],
    unlocks: ['payment_network_error_refund'],
    relatedCaseStudies: [
      {
        slug: 'payment_network_error_refund',
        title: 'Hoàn Tiền Khi Lỗi Mạng',
        phase: 'Phase 1 & 2',
        reason: 'Sự cố rớt mạng giữa cổng chuyển mạch Napas và hệ thống nội bộ.'
      },
      {
        slug: 'bill_splitting',
        title: 'Chia Hoá Đơn Nhóm Qua QR',
        phase: 'Phase 2: VietQR Bridge',
        reason: 'Tích hợp chuẩn mã VietQR chuyển tiền liên ngân hàng 24/7.'
      }
    ],
    relatedInterviewIds: ['int-2', 'int-3'],
    quickCheck: {
      question: 'Khi chuyển tiền Napas 247, tại sao người nhận thấy tiền nổi ngay sau 2 giây nhưng thực tế tiền thật giữa 2 ngân hàng chưa chuyển cho nhau ngay lúc đó?',
      options: [
        'Vì Napas ứng tiền túi ra trả thay cho các ngân hàng',
        'Vì hệ thống áp dụng cơ chế Chuyển mạch thời gian thực (Real-time Switching) cho khách hàng, còn tiền thật giữa các ngân hàng được Bù trừ ròng (Net Clearing) theo các phiên định kỳ tại NHNN',
        'Vì ngân hàng người nhận tự in tiền ảo vào tài khoản',
        'Vì đây là giao dịch không cần đối soát'
      ],
      correctIndex: 1,
      explanation: 'Napas cam kết xử lý thông điệp real-time cho khách hàng, còn nghĩa vụ thanh toán giữa các tổ chức tín dụng được bù trừ đa phương và quyết toán ròng 3 phiên mỗi ngày tại hệ thống CITAD của Ngân hàng Nhà nước.'
    }
  },
  {
    id: '03_cards_pos_merchant_clearing',
    title: 'Hệ Thống Thẻ, Cổng POS, Mô Hình Phí MDR & Tra Soát Chargeback',
    subtitle: 'Mô hình 4 bên Visa/Mastercard, phân biệt Auth vs Settlement, và giải quyết tranh chấp',
    tier: 'tier-2',
    category: 'Cards & Merchant',
    estimatedMinutes: 30,
    filePath: 'curriculum/tier_2_banking_domain/03_cards_pos_merchant_clearing.md',
    skillsCovered: ['Four-Party Model', 'Authorization vs Settlement', 'MDR & Interchange Fee', 'Chargeback Dispute'],
    keyTakeaways: [
      'Phân biệt 3 giai đoạn của giao dịch thẻ: Authorization (2s) ➔ Clearing (EOD) ➔ Settlement (T+1/T+2).',
      'Bóc tách cấu trúc phí MDR 2%: Interchange Fee (Issuer nhận), Scheme Fee, và Acquirer Markup.',
      'Quy trình tra soát đòi bồi hoàn (First Chargeback -> Representment -> Arbitration).'
    ],
    prerequisites: ['01_core_banking_and_ledger'],
    unlocks: ['04_digital_lending_credit_scoring'],
    relatedCaseStudies: [],
    relatedInterviewIds: [],
    quickCheck: {
      question: 'Trong giao dịch quẹt thẻ tín dụng tại máy POS, giai đoạn nào số tiền chỉ bị tạm khoá (Hold) ở tài khoản thẻ của khách hàng mà chưa được chuyển sang người bán?',
      options: [
        'Giai đoạn Settlement (Quyết toán tiền thật)',
        'Giai đoạn Authorization (Uỷ quyền hạn mức)',
        'Giai đoạn Clearing (Đối chiếu tệp bù trừ)',
        'Giai đoạn Chargeback (Đòi bồi hoàn)'
      ],
      correctIndex: 1,
      explanation: 'Authorization diễn ra trong 2 giây đầu tiên để xác minh thẻ và khoá số dư. Tiền chỉ thực sự chuyển giao sau khi POS đóng ca (Clearing) và quyết toán bù trừ liên ngân hàng (Settlement T+1 hoặc T+2).'
    }
  },
  {
    id: '04_digital_lending_credit_scoring',
    title: 'Cho Vay Kỹ Thuật Số, Chấm Điểm Tín Dụng CIC & Phê Duyệt Tự Động (STP)',
    subtitle: 'Quy trình giải ngân không gặp mặt dưới 3 phút, tra cứu 5 nhóm nợ CIC và Rule Engine',
    tier: 'tier-2',
    category: 'Lending & Credit',
    estimatedMinutes: 30,
    filePath: 'curriculum/tier_2_banking_domain/04_digital_lending_credit_scoring.md',
    skillsCovered: ['STP Digital Lending', 'CIC 5 Debt Groups', 'Credit Scoring BRMS', 'Risk-Based Pricing'],
    keyTakeaways: [
      'Quy trình phê duyệt tự động Straight-Through Processing (STP) không người duyệt.',
      'Ý nghĩa 5 nhóm nợ tại CIC (Nhóm 1 nợ chuẩn đến Nhóm 5 có khả năng mất vốn).',
      'Bộ lọc Pre-screening nội bộ để tiết kiệm chi phí tra cứu API cổng CIC quốc gia.'
    ],
    prerequisites: ['03_cards_pos_merchant_clearing'],
    unlocks: ['05_ekyc_biometrics_aml_compliance'],
    relatedCaseStudies: [],
    relatedInterviewIds: ['int-4'],
    quickCheck: {
      question: 'Một khách hàng cá nhân bị nợ quá hạn 45 ngày tại một tổ chức tín dụng. Khách hàng này thuộc nhóm nợ nào trên hệ thống thông tin tín dụng quốc gia CIC?',
      options: [
        'Nhóm 1 (Nợ đủ tiêu chuẩn)',
        'Nhóm 2 (Nợ cần chú ý: Quá hạn từ 10 đến 90 ngày)',
        'Nhóm 3 (Nợ dưới tiêu chuẩn)',
        'Nhóm 5 (Nợ có khả năng mất vốn)'
      ],
      correctIndex: 1,
      explanation: 'Quá hạn từ 10 đến 90 ngày thuộc Nhóm 2 (Nợ cần chú ý). Hầu hết các ứng dụng ngân hàng số sẽ từ chối cấp hạn mức vay tín chấp mới tự động khi phát hiện nợ Nhóm 2.'
    }
  },
  {
    id: '05_ekyc_biometrics_aml_compliance',
    title: 'eKYC, Quét Chip NFC, Sinh Trắc Học QĐ 2345 & Phòng Chống Rửa Tiền AML',
    subtitle: 'Quy chuẩn an toàn bảo mật mới nhất của NHNN và luồng phát hiện giao dịch đáng ngờ STR',
    tier: 'tier-2',
    category: 'Security & Compliance',
    estimatedMinutes: 30,
    filePath: 'curriculum/tier_2_banking_domain/05_ekyc_biometrics_aml_compliance.md',
    skillsCovered: ['eKYC 4 Layers', 'NFC ICAO 9303', 'Quyết định 2345/QĐ-NHNN', 'AML CTR & STR'],
    keyTakeaways: [
      '4 lớp phòng thủ eKYC: OCR -> Anti-Spoofing -> Đọc Chip NFC -> Liveness & Face Match.',
      'Ngưỡng giao dịch bắt buộc Face Match theo QĐ 2345: >= 10tr/lần hoặc tổng > 20tr/ngày.',
      'Hệ thống AML: Phân biệt Báo cáo giao dịch lớn CTR (>= 400tr) và Báo cáo đáng ngờ STR.'
    ],
    prerequisites: ['04_digital_lending_credit_scoring', '04_user_stories_gherkin_invest'],
    unlocks: ['interview-mastery'],
    relatedCaseStudies: [],
    relatedInterviewIds: ['int-1'],
    quickCheck: {
      question: 'Theo Quyết định 2345/QĐ-NHNN, khi một khách hàng lần đầu tiên đăng nhập ứng dụng Mobile Banking trên một chiếc điện thoại mới (Thiết bị mới), hệ thống bắt buộc phải làm gì?',
      options: [
        'Chỉ cần gửi mã OTP qua tin nhắn SMS thông thường',
        'BẮT BUỘC phải thực hiện xác thực sinh trắc học khuôn mặt (Face Matching) trùng khớp với dữ liệu CCCD gắn chip đã thu thập',
        'Chỉ cần nhập mật khẩu tĩnh của tài khoản',
        'Khách hàng phải ra chi nhánh ngân hàng ký giấy xác nhận'
      ],
      correctIndex: 1,
      explanation: 'Quyết định 2345 bắt buộc phải Face Matching khi kích hoạt tài khoản trên thiết bị mới để ngăn chặn triệt để kẻ gian hack mật khẩu hoặc cướp SIM để chiếm đoạt tài sản từ xa.'
    }
  }
]

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    tier: 'tier-1',
    category: 'API & Data Modeling',
    question: 'Khi thiết kế bảng cơ sở dữ liệu lưu trữ số dư tài khoản thanh toán và số tiền giao dịch trong ngân hàng, kiểu dữ liệu nào sau đây là chuẩn xác nhất?',
    options: [
      'FLOAT vì chiếm ít bộ nhớ và tính toán nhanh',
      'DOUBLE vì hỗ trợ độ chính xác cao',
      'DECIMAL(18, 2) hoặc BIGINT (lưu đơn vị cents/đồng lẻ) để tránh sai số dấu phẩy động',
      'VARCHAR(30) để lưu định dạng tiền tệ kèm ký tự phân cách dấu chấm/phẩy'
    ],
    correctIndex: 2,
    explanation: 'Trong tài chính, tuyệt đối không dùng FLOAT/DOUBLE vì chuẩn dấu phẩy động IEEE 754 gây sai số làm tròn khi cộng trừ nhiều lần. Phải dùng kiểu số chính xác tuyệt đối như DECIMAL hoặc số nguyên BIGINT.',
    bankReference: 'Techcombank Data Architecture Standard'
  },
  {
    id: 'q2',
    tier: 'tier-1',
    category: 'Process Modeling',
    question: 'Khi khách hàng bấm chuyển tiền liên ngân hàng 24/7 trên Mobile Banking, luồng xử lý số dư nào sau đây là ĐÚNG NGUYÊN TẮC ngân hàng?',
    options: [
      'Hạch toán trừ tiền thật ngay trong Core Banking, sau đó gọi Napas. Nếu lỗi thì gọi lệnh cộng tiền lại.',
      'Tạm khóa số dư (Hold/Reserve Funds) ➔ Gọi API Napas ➔ Nếu Napas báo Thành công thì mới hạch toán trừ tiền thật (Commit Debit) ➔ Nếu Napas lỗi thì giải phóng số tiền tạm giữ (Unhold).',
      'Gọi API Napas trước, khi nào Napas báo thành công mới kiểm tra xem khách hàng có đủ số dư hay không.',
      'Cộng tiền trước cho người nhận, sau đó mới trừ tiền người gửi.'
    ],
    correctIndex: 1,
    explanation: 'Nguyên tắc an toàn giao dịch phân tán (2-Phase Commit): Không bao giờ trừ tiền thật trước khi biết kết quả bên thứ 3 (để tránh rủi ro lệch sổ cái), cũng không bao giờ gọi đối tác mà chưa khoá số dư (để tránh khách hàng rút sạch tiền ở kênh khác trong lúc giao dịch đang bay).',
    bankReference: 'Core Banking Transaction Safety Guidelines'
  },
  {
    id: 'q3',
    tier: 'tier-2',
    category: 'Core Banking',
    question: 'Trong Hệ thống tài khoản kế toán các Tổ chức tín dụng (QĐ 479/2004/QĐ-NHNN), số dư tiền gửi của khách hàng (CASA) thuộc loại tài khoản nào?',
    options: [
      'Tài khoản Loại 1 (Tài sản của Ngân hàng)',
      'Tài khoản Loại 4 (Nợ phải trả của Ngân hàng)',
      'Tài khoản Loại 7 (Thu nhập hoạt động)',
      'Tài khoản Loại 6 (Vốn chủ sở hữu)'
    ],
    correctIndex: 1,
    explanation: 'Đối với Ngân hàng, tiền của khách gửi vào là nghĩa vụ mà ngân hàng đang nợ khách hàng (Liability), nên thuộc Tài khoản Loại 4 (Nợ phải trả) và luôn có số dư Bên Có (Credit).',
    bankReference: 'Vietcombank Financial Accounting Exam'
  },
  {
    id: 'q4',
    tier: 'tier-2',
    category: 'Compliance',
    question: 'Theo Quyết định 2345/QĐ-NHNN có hiệu lực từ 01/07/2024, tình huống nào sau đây BẮT BUỘC người dùng phải xác thực sinh trắc học khuôn mặt?',
    options: [
      'Mọi giao dịch chuyển tiền trên 5,000,000 VND',
      'Giao dịch chuyển tiền từ 10,000,000 VND/lần trở lên HOẶC tổng giá trị giao dịch trong ngày vượt quá 20,000,000 VND',
      'Chỉ áp dụng khi khách hàng mở sổ tiết kiệm trên 100 triệu đồng',
      'Chỉ áp dụng khi thanh toán quốc tế'
    ],
    correctIndex: 1,
    explanation: 'Quyết định 2345 quy định: Chuyển tiền từ 10 triệu/lần hoặc tổng ngày vượt 20 triệu phải Face Matching khớp với CCCD chip. Ngoài ra lần đầu đăng nhập trên thiết bị mới cũng bắt buộc.',
    bankReference: 'Ngân hàng Nhà nước Việt Nam (SBV)'
  },
  {
    id: 'q5',
    tier: 'tier-2',
    category: 'Cards',
    question: 'Khi khách hàng quẹt thẻ tín dụng tại máy POS của nhà hàng, số tiền 100,000 VND bị trừ ở tài khoản thẻ của khách hàng nhưng nhà hàng chỉ nhận được 98,000 VND. Khoản chênh lệch 2,000 VND (2%) đó gọi là gì?',
    options: [
      'Phí rút tiền mặt (Cash Advance Fee)',
      'Phí chấp nhận thanh toán thẻ (Merchant Discount Rate - MDR)',
      'Thuế thu nhập doanh nghiệp của nhà hàng',
      'Lãi suất quá hạn thẻ tín dụng'
    ],
    correctIndex: 1,
    explanation: 'Đó là phí MDR (Merchant Discount Rate) do đơn vị chấp nhận thẻ trả cho ngân hàng Acquirer, sau đó được chia sẻ cho Issuer (Interchange fee) và Tổ chức thẻ Visa/Mastercard.',
    bankReference: 'VPBank Card Business Division'
  },
  {
    id: 'q6',
    tier: 'tier-2',
    category: 'Lending',
    question: 'Một khách hàng cá nhân bị ghi nhận nợ quá hạn 120 ngày tại một công ty tài chính. Khi tra cứu trên hệ thống CIC, khách hàng này sẽ bị phân loại vào nhóm nợ nào?',
    options: [
      'Nhóm 1 (Nợ đủ tiêu chuẩn)',
      'Nhóm 2 (Nợ cần chú ý)',
      'Nhóm 3 (Nợ dưới tiêu chuẩn: Quá hạn 91 - 180 ngày)',
      'Nhóm 5 (Nợ có khả năng mất vốn)'
    ],
    correctIndex: 2,
    explanation: 'Quá hạn 120 ngày nằm trong khoảng từ 91 đến 180 ngày, thuộc Nhóm 3 (Nợ dưới tiêu chuẩn). Ngân hàng sẽ từ chối giải ngân các khoản vay tín chấp mới tự động.',
    bankReference: 'CIC Credit Scoring Standard'
  },
  {
    id: 'q7',
    tier: 'tier-2',
    category: 'Payments',
    question: 'Tài khoản Nostro và Vostro được phân biệt như thế nào trong nghiệp vụ thanh toán quốc tế qua SWIFT?',
    options: [
      'Nostro là tài khoản tiền VNĐ, Vostro là tài khoản ngoại tệ USD',
      'Nostro là tài khoản của chúng tôi mở tại ngân hàng đối tác; Vostro là tài khoản của đối tác mở tại ngân hàng chúng tôi',
      'Nostro dùng cho khách hàng cá nhân, Vostro dùng cho khách hàng doanh nghiệp lớn',
      'Nostro là tiền gửi tiết kiệm, Vostro là tiền vay'
    ],
    correctIndex: 1,
    explanation: 'Gốc tiếng Ý: Nostro = "của chúng tôi" (Our money on their books), Vostro = "của các bạn" (Their money on our books).',
    bankReference: 'MB Bank Treasury & International Settlement'
  },
  {
    id: 'q8',
    tier: 'tier-1',
    category: 'BABOK',
    question: 'Tiêu chí nào sau đây KHÔNG THUỘC bộ tiêu chuẩn INVEST trong việc đánh giá User Story cho dự án Ngân hàng số?',
    options: [
      'I - Independent (Độc lập)',
      'N - Negotiable (Thương lượng được)',
      'V - Versatile (Đa năng / Làm được nhiều việc cùng lúc)',
      'T - Testable (Kiểm thử được)'
    ],
    correctIndex: 2,
    explanation: 'Chữ V trong INVEST là "Valuable" (Có giá trị kinh doanh/khách hàng), không phải là Versatile. Một Story phải tập trung vào 1 giá trị rõ ràng, không được ôm đồm đa năng.',
    bankReference: 'Agile BA Scrum Standard'
  }
]

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'int-1',
    category: 'Behavioral',
    bank: 'Techcombank',
    question: 'Hãy kể lại một trường hợp khi Khối Kinh Doanh (Retail Product) muốn đơn giản hoá quy trình để tăng chuyển đổi, nhưng Khối Quản Trị Rủi Ro (Risk) yêu cầu thêm nhiều bước bảo mật, bạn đã dung hoà mâu thuẫn này thế nào?',
    summaryAnswer: 'Sử dụng mô hình Phân Tầng Rủi Ro (Risk-Based Tiering). Thay vì áp đặt một quy trình cứng nhắc cho 100% người dùng, phân loại khách hàng dựa trên hạn mức giao dịch và chỉ số rủi ro để đưa ra các lớp bảo mật phù hợp.',
    starTips: [
      'Situation: Nêu rõ dự án và sự đối đầu giữa mong muốn UX mượt mà vs yêu cầu tuân thủ an toàn.',
      'Task: Xác định vai trò của bạn là người phân tích giải pháp trung gian, không nghiêng về cảm tính bên nào.',
      'Action: Chứng minh bằng việc phân tích dữ liệu rớt phễu, đề xuất giải pháp phân tầng (Tier 1 vs Tier 2), tổ chức JAD Workshop.',
      'Result: Cả hai bên ký duyệt giải pháp; tỷ lệ chuyển đổi tăng trong khi rủi ro nợ xấu/gian lận được kiểm soát.'
    ],
    redFlags: [
      'Đứng về một bên và chê bai bên còn lại thiếu hiểu biết.',
      'Nói chung chung mà không đưa ra giải pháp kỹ thuật cụ thể.',
      'Thừa nhận làm theo lệnh sếp to hơn mà không qua phân tích đánh đổi.'
    ]
  },
  {
    id: 'int-2',
    category: 'Technical',
    bank: 'Vietcombank Digital',
    question: 'Khi hệ thống thanh toán gọi API sang Cổng chuyển mạch Napas nhưng bị Timeout sau 15 giây không có phản hồi, bạn sẽ thiết kế cơ chế xử lý ngoại lệ này như thế nào để đảm bảo tính an toàn giao dịch?',
    summaryAnswer: 'Áp dụng mô hình State Machine 3 trạng thái với giai đoạn In-Doubt (PENDING_VERIFICATION). Khoá số dư tạm thời, kích hoạt Worker truy vấn trạng thái tự động theo chu kỳ (5s, 15s, 60s) và chuẩn bị luồng đối soát bán tự động trong 15 phút.',
    starTips: [
      'Giải thích bản chất phân tán: Timeout không đồng nghĩa với Thất bại (có thể bên kia đã trừ tiền).',
      'Nêu rõ việc tạm giữ (Hold) số dư thay vì trừ tiền thật ngay.',
      'Trình bày cơ chế Fast-Query Retry và thời hạn tối đa trước khi đảo lệnh (Auto-reversal) hoặc đối soát.'
    ],
    redFlags: [
      'Bảo khách hàng bấm lại thanh toán (Gây nguy cơ trừ tiền kép).',
      'Tự ý hoàn tiền ngay lập tức khi chưa có xác nhận từ Napas (Gây nguy cơ mất vốn đối soát).'
    ]
  },
  {
    id: 'int-3',
    category: 'Banking Domain',
    bank: 'MB Bank',
    question: 'Hãy giải thích nguyên lý hoạt động của mã VietQR động và luồng hạch toán liên ngân hàng khi khách hàng quét mã này thanh toán?',
    summaryAnswer: 'VietQR động mã hoá chuẩn EMVCo gồm BIN ngân hàng, số tài khoản, số tiền cố định và mã tham chiếu đơn hàng. Khi quét mã, Mobile App giải mã và gửi lệnh Napas 247; hệ thống ghi có tài khoản người nhận tức thì và bù trừ ròng qua NHNN vào cuối ngày.',
    starTips: [
      'Nhắc đến chuẩn mã hoá EMVCo QR Code quốc tế.',
      'Mô tả 2 pha: Real-time switching cho người dùng trong 2 giây, và Net Clearing đa phương tại CITAD NHNN.'
    ],
    redFlags: [
      'Nhầm lẫn giữa VietQR tĩnh (tự gõ tiền) và VietQR động (khoá số tiền kèm order ID).',
      'Nghĩ rằng tiền thật giữa 2 ngân hàng được chuyển giao tức thì trong từng giây.'
    ]
  },
  {
    id: 'int-4',
    category: 'Banking Domain',
    bank: 'VPBank',
    question: 'Trong quy trình cho vay tiêu dùng tín chấp trực tuyến (Digital Lending), hệ thống đánh giá rủi ro và ra quyết định phê duyệt (STP) dựa trên những yếu tố dữ liệu nào?',
    summaryAnswer: 'Hệ thống kết hợp dữ liệu định danh eKYC, lịch sử tín dụng quốc gia CIC (loại bỏ nợ nhóm 2-5), dữ liệu nội bộ (số dư bình quân CASA, lịch sử chi tiêu), và dữ liệu thay thế (viễn thông/hóa đơn) qua Rule Engine/BRMS để chấm điểm FICO và định giá theo rủi ro.',
    starTips: [
      'Nêu rõ khái niệm STP (Straight-Through Processing) - phê duyệt tự động không cần con người can thiệp.',
      'Nhắc đến bộ lọc Pre-screening trước khi tốn phí gọi API sang CIC.'
    ],
    redFlags: [
      'Không biết 5 nhóm nợ CIC là gì.',
      'Nghĩ rằng cho vay online chỉ cần khách hàng khai báo thu nhập bằng miệng.'
    ]
  },
  {
    id: 'int-5',
    category: 'Technical',
    bank: 'Techcombank',
    question: 'Hãy giải thích cơ chế Idempotency Key trong các API tài chính ngân hàng và cách bạn đặc tả nó cho đội ngũ Backend Developer?',
    summaryAnswer: 'Idempotency Key là khoá duy nhất (UUID) sinh ra từ phía Client cho mỗi phiên giao dịch. Backend dùng Redis lưu khoá này để nhận diện và từ chối các request trùng lặp do mạng lag hoặc spam click, đảm bảo không bao giờ trừ tiền khách hàng 2 lần.',
    starTips: [
      'Đặc tả rõ vị trí: Nằm trong HTTP Header (X-Idempotency-Key).',
      'Mô tả mã phản hồi khi phát hiện trùng: HTTP 409 Conflict hoặc trả lại kết quả cũ của lần 1.',
      'Nêu rõ thời gian hết hạn TTL của khoá trong Redis (thường từ 60s đến 24 giờ).'
    ],
    redFlags: [
      'Nói rằng nút bấm trên app đã disable rồi thì không cần Idempotency ở backend (Kẻ gian có thể bypass bằng Postman/Script).'
    ]
  }
]
