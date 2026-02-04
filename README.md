📦 MECWISH V2.0 - MODULAR E-COMMERCE PLATFORM
Kiến trúc: Modular Monolith (Enterprise Standard)
Lộ trình: Xây dựng hệ sinh thái "Shopify Mini" mạnh mẽ, linh hoạt và dễ mở rộng.
🌟 1. TRIẾT LÝ THIẾT KẾ ( kế thừa V1)
MECWISH V2 không chỉ là bản cập nhật, mà là sự trưởng thành về kiến trúc dựa trên 4 trụ cột:

Chia để trị (Advanced Modularity): Mỗi module (Products, Orders, Auth) là một đơn vị độc lập. Một lập trình viên có thể làm việc trên Module A mà không cần biết Module B hoạt động ra sao.
Giao tiếp phi tập trung (Event-Driven): Các module không gọi hàm của nhau trực tiếp. Chúng "nói chuyện" qua EventBus.
Ví dụ: Khi Đơn hàng thanh toán xong (ORDER_PAID), Module Kho (Inventory) sẽ nghe và tự trừ số lượng, Module Email sẽ nghe và tự gửi hóa đơn.
Độc lập dữ liệu (Data Abstraction): Tuyệt đối không hard-code các lệnh gọi Database trong Giao diện. Mọi truy xuất phải qua lớp Adapter. Bạn có thể chuyển từ lưu trữ tại chỗ (Local - IndexedDB) sang máy chủ (Remote - API) chỉ bằng một dòng cấu hình.
Thiết kế theo linh kiện (Component-Driven): Tận dụng sức mạnh của Alpine.js để biến các phần tử giao diện thành các Shared Components có thể tái sử dụng toàn hệ thống.
📂 2. CẤU TRÚC THƯ MỤC (V2 SKELETON)
code


MECWISH-V2/
├── public/                 # Entry points (index.html, admin.html) & Static Assets
├── src/
│   ├── core/               # [HẠ TẦNG CỐT LÕI]
│   │   ├── kernel.js       # Bộ nạp module & Router
│   │   ├── event_bus.js    # Hệ thần kinh trung ương (Pub/Sub)
│   │   ├── database/       # Adapter kết nối (IndexedDB / REST API)
│   │   └── ui_engine.js    # Quản lý Global UI (Toast, Modal, Loader)
│   │
│   ├── shared/             # [THÀNH PHẦN DÙNG CHUNG]
│   │   ├── components/     # Button, Table, Form Inputs, Card UI
│   │   └── utils/          # Format tiền, ngày tháng, validation
│   │
│   ├── modules/            # [KHÔNG GIAN TÍNH NĂNG - SHOPIFY APPS]
│   │   ├── products/       # Quản lý hàng hóa
│   │   │   ├── services/   # Logic nghiệp vụ (Tính giá, lọc tồn kho)
│   │   │   ├── stores/     # Quản lý trạng thái (State) của Alpine.js
│   │   │   └── views/      # Giao diện (Admin & Client)
│   │   ├── orders/         # Quản lý đơn hàng & Thanh toán
│   │   └── auth/           # Quản lý tài khoản & Phân quyền
│   │
│   ├── styles/             # [HỆ THỐNG GIAO DIỆN]
│   │   ├── theme/          # Design Tokens (Màu sắc, Font, Spacing)
│   │   └── animations/     # Hiệu ứng chuyển động chuẩn Shopify
│   │
│   └── types/              # Định nghĩa cấu trúc dữ liệu (TypeScript-like)
│
├── scripts/                # Script hỗ trợ (Dev server, Build, Seed dữ liệu)
└── tests/                  # Kiểm thử tự động (Unit test, E2E)

🛠 3. CÁC LỚP XỬ LÝ (THE LAYERS)
Để đạt được mô hình Shopify Mini, V2 phân cấp như sau:

UI Layer (Views): Chỉ làm nhiệm vụ hiển thị và nhận lệnh từ User. Không chứa logic tính toán.
Service Layer: Nơi chứa "Chất xám". Ví dụ: DiscountService.applyVoucher() sẽ tính toán số tiền được giảm.
Store Layer: Nơi giữ dữ liệu tạm thời. Giúp ứng dụng mượt mà, không cần load lại trang khi chuyển giữa các tab Admin.
Data Layer (Adapters): Cổng kết nối dữ liệu. Che giấu sự phức tạp của việc truy vấn dữ liệu từ Browser hay từ Server.
🚦 4. QUY TẮC PHÁT TRIỂN (DEVELOPER RULES)
Event Over Call: Ưu tiên dùng App.bus.emit('ACTION') thay vì import trực tiếp module khác.
Strict Views: Mã HTML trong views/admin không được chứa logic phức tạp. Mọi logic phải nằm trong Controller hoặc Service.
Design Tokens: Không sử dụng mã màu Hex (#FFFFFF) trực tiếp. Luôn sử dụng biến CSS: var(--color-primary).
No Direct DB: Cấm sử dụng fetch() hoặc indexedDB trực tiếp trong Module. Phải qua Data Service.
🏗 5. LỘ TRÌNH XÂY DỰNG SHOPIFY MINI
Giai đoạn 1 (Nền tảng): Hoàn thiện Core Kernel và Event Bus.
Giai đoạn 2 (Quản lý nội dung): Xây dựng Module Products và Collections (Hỗ trợ nhiều biến thể sản phẩm - Variants).
Giai đoạn 3 (Thương mại): Xây dựng Module Orders và tích hợp Payment Gateways (Ví điện tử, COD).
Giai đoạn 4 (Hệ sinh thái): Phát triển Theme Engine - Cho phép thay đổi giao diện Storefront thông qua cấu hình JSON (giống Shopify Sections).
Giai đoạn 5 (Tối ưu): Hệ thống Analytics và Affiliate Marketing.
💻 6. CÂU LỆNH CƠ BẢN
npm run dev: Chạy môi trường phát triển với Vite (Hỗ trợ Hot Reload).
npm run build: Đóng gói ứng dụng tối ưu cho Production.
npm run seed: Tạo dữ liệu mẫu (Sản phẩm, Đơn hàng) để test nhanh.
npm test: Chạy các bản kiểm thử logic.
📞 7. BẢO TRÌ & MỞ RỘNG
Khi muốn thêm một tính năng mới (Ví dụ: Module Blog):

Tạo thư mục src/modules/blogs.
Khai báo Route và Service trong thư mục đó.
Đăng ký module vào App.Kernel trong file cấu hình khởi chạy.
Hệ thống sẽ tự động nạp Menu và Router cho Blog.


LOGIC NGHIỆP VỤ:
================================================================================
DỰ ÁN: MECWISH V2.0 - MODERN MODULAR E-COMMERCE PLATFORM
TÀI LIỆU ĐẶC TẢ LOGIC NGHIỆP VỤ VẬN HÀNH HỆ THỐNG (DASHBOARD & STOREFRONT)
Phiên bản: 2.0.0 | Trạng thái: Đang hoàn thiện logic Dashboard (Digital Focused)
================================================================================

1. TRIẾT LÝ VÀ CHẾ ĐỘ VẬN HÀNH (SYSTEM MODES)
--------------------------------------------------------------------------------
1.1. Chế độ kinh doanh (Business Mode):
   - Mặc định: Phi vật lý (DIGITAL FIRST).
   - Hệ thống cho phép "mở cửa" để nâng cấp lên Vật lý (PHYSICAL) ở giai đoạn cuối của lộ trình.


1.2. Kiến trúc Module:
   - Các tính năng (Products, Orders, Payments, Affiliate...) hoạt động độc lập nhưng giao tiếp qua EventBus.
   - Khi có sự kiện (ví dụ: Thanh toán thành công), hệ thống tự kích hoạt các module liên quan (Kho, Email, Affiliate).
 - Lưu dữ liệu trình duyệt truy cập trang con để khi quay lại từ bất kì trang nào cũng sẽ là trang truy cập trước đó.
2. QUẢN LÝ SẢN PHẨM VÀ BỘ SƯU TẬP (CATALOG MANAGEMENT)
--------------------------------------------------------------------------------
2.1. Sản phẩm (Products):
   - Slug: Tự động tạo từ tên sản phẩm. Nếu trùng, hệ thống tự thêm đuôi số (-1, -2...).
   - Trạng thái: [DRAFT - Nháp, ACTIVE - Đang bán, ARCHIVED - Lưu trữ].
   - Quy tắc xóa: Không cho phép xóa sản phẩm đã có phát sinh đơn hàng; chỉ cho phép Lưu trữ (Archived) để bảo toàn dữ liệu báo cáo.
   - Giới hạn bán (Sales Limit): Độc lập hoàn toàn với tồn kho. Admin có thể giới hạn bán N sản phẩm (ví dụ: suất ưu đãi) ngay cả khi kho còn hàng nghìn key.

2.2. Biến thể (Variants):
   - Mỗi biến thể có SKU riêng, giá bán và giá so sánh.
   - Hình thức giao hàng (Delivery Method): Cấu hình theo từng biến thể [AUTO - Tự động | MANUAL - Thủ công].

2.3. Bộ sưu tập (Collections):
   - Hỗ trợ Lọc/Tìm kiếm sản phẩm bên trong bộ sưu tập.
   - Cho phép Xuất file (Export) danh sách sản phẩm thuộc bộ sưu tập đó.

3. QUẢN LÝ KHO SỐ VÀ CẦU DAO AN TOÀN (VAULT & SAFETY)
--------------------------------------------------------------------------------
3.1. Quản lý Kho (Pool Management):
   - Nhập hàng (Import): Hỗ trợ nhập key hàng loạt. Tự động bỏ qua (Skip) các key đã tồn tại trong hệ thống.
   - Trạng thái Key: [AVAILABLE - Sẵn sàng, SOLD - Đã bán, MAINTENANCE - Bảo trì, VOID - Hủy].

3.2. Cầu dao an toàn (Circuit Breaker Logic):
   - Đối với sản phẩm AUTO: Admin đặt giới hạn "Auto Sales Limit" (ví dụ: 5).
     + Hệ thống tự động giao 5 key đầu tiên.
     + Từ đơn hàng thứ 6, hệ thống tự động ngắt giao tự động và chuyển đơn hàng sang trạng thái "Chờ giao thủ công" để Admin kiểm tra (Chống hacker/bot rút cạn kho khi Admin vắng mặt).
   - Đối với sản phẩm MANUAL: Đạt giới hạn bán sẽ báo "Hết hàng" (Sold out).

4. QUY TRÌNH ĐƠN HÀNG VÀ GIAO HÀNG (ORDER & FULFILLMENT)
--------------------------------------------------------------------------------
4.1. Đơn hàng thủ công:
   - Admin có quyền tạo đơn trực tiếp từ Dashboard, tùy chỉnh giá, áp mã giảm giá 100%.
   - Đơn hàng do Admin tạo thủ công mặc định KHÔNG tính hoa hồng Affiliate.

4.2. Trạng thái giao hàng:
   - PARTIALLY_FULFILLED (Giao một phần): Áp dụng khi đơn hàng có cả sản phẩm AUTO (đã giao xong) và MANUAL (đang chờ Admin).
   - FULFILLED (Hoàn tất): Khi toàn bộ nội dung số đã được gửi tới khách.

4.3. Chỉnh sửa nội dung:
   - Admin có quyền sửa/đổi nội dung (Key/Link) đã giao.
   - Hệ thống bắt buộc lưu lịch sử (History) các lần thay đổi nội dung này.
   - Tự động thông báo nội dung mới cho khách qua Email/Storefront.

5. QUẢN LÝ TÀI CHÍNH VÀ DÒNG TIỀN (FINANCIALS)
--------------------------------------------------------------------------------
5.1. Số dư khách hàng (Balance):
   - Khách có ví nội bộ. Admin có thể nạp/trừ tiền thủ công.
   - Mọi thay đổi số dư bắt buộc phải sinh ra một "Dòng tiền" (Transaction History) để đối soát. Cấm việc cộng/trừ tiền mà không có nhật ký giao dịch.

5.2. Thanh toán:
   - Tích hợp QR, USDT, PayPal, Stripe...
   - Phê duyệt nạp tiền: Có thể duyệt tự động qua Webhook/API hoặc duyệt thủ công bằng tay.

5.3. Hoàn tiền (Refund):
   - Admin được hoàn tiền toàn phần hoặc một phần (không vượt quá số tiền thực thu).
   - Khi Refund: Hệ thống tự động TRUY THU (Trừ lại) tiền hoa hồng đã cộng cho Affiliate của đơn hàng đó.
   - Khi Refund: Hệ thống hỏi Admin có muốn thu hồi Key về kho "Bảo trì" (Maintenance) hay không.

6. HỆ THỐNG AFFILIATE VÀ MARKETING
--------------------------------------------------------------------------------
6.1. Affiliate (Tiếp thị liên kết):
   - User đăng ký làm Affiliate phải được Admin phê duyệt mới bắt đầu được tính hoa hồng.
   - Hoa hồng được cộng trực tiếp vào số dư tài khoản khi đơn hàng hoàn tất.

6.2. Mã giảm giá (Discounts):
   - Giảm tối đa 100% giá trị đơn hàng.
   - Có thể áp dụng cho toàn sàn hoặc chỉ định cho một số Sản phẩm/Bộ sưu tập.

7. NHÂN SỰ VÀ BẢO MẬT (RBAC & AUDIT LOG)
--------------------------------------------------------------------------------
7.1. Phân quyền (RBAC):
   - Admin có thể tạo nhiều vai trò (Nhân viên kho, Nhân viên kế toán, CSKH...).
   - Hạn chế truy cập: Tùy theo vai trò mà nhân viên bị ẩn/hiện các mục chức năng.

7.2. Nhật ký hệ thống (Audit Log):
   - Ghi lại mọi hành động Thêm/Sửa/Xóa của nhân viên (Ai, lúc nào, dữ liệu cũ/mới).
   - Đặc biệt: Ghi lại cả hành động "XEM" dữ liệu nhạy cảm (ví dụ: Nhân viên A đã xem thông tin Khách hàng B) để chống rò rỉ data.

7.3. Bảo mật thông tin khách hàng:
   - Tự động Masking (Che mờ) Email và Số điện thoại khách hàng đối với các tài khoản nhân viên không có quyền quản trị tối cao (Super Admin).

8. CHĂM SÓC KHÁCH HÀNG (CRM)
--------------------------------------------------------------------------------
8.1. Khung trò chuyện (Chat):
   - Tích hợp khung chat trực tiếp trong chi tiết từng đơn hàng.
   - Nhật ký trao đổi được lưu vĩnh viễn trong Timeline đơn hàng.

8.2. Chặn khách hàng (Block):
   - Admin có quyền chặn khách hàng vi phạm. Khách bị chặn không thể đăng nhập hoặc thực hiện giao dịch mới.

================================================================================
TÀI LIỆU NÀY LÀ TÀI SẢN NỘI BỘ CỦA DỰ ÁN MECWISH V2.0.
CÁC THÀNH VIÊN THAM GIA DỰ ÁN CÓ TRÁCH NHIỆM TUÂN THỦ TUYỆT ĐỐI CÁC LOGIC TRÊN.
================================================================================