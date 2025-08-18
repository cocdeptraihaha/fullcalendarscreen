**Note**:
**15/8/2025**:
Header và Sidebar : làm giao diện các nút, hoàn thành CSS
  + Header chưa có chức năng 
  + Sidebar chưa truyền được dữ liệu tới Calendar
Calendar: Copy từ fullcalendar-examples/react18-typescript
  + Chưa custom



## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js (phiên bản 16 trở lên)
- npm hoặc yarn

### Hướng dẫn cài đặt
1. **Tải về dự án:**
   ```bash
   git clone <repository-url>
   cd fullcalendarscreen
   ```

2. **Cài đặt dependencies (BẮT BUỘC):**
   ```bash
   npm install
   ```
   hoặc nếu bạn sử dụng yarn:
   ```bash
   yarn install
   ```

3. **Chạy ứng dụng ở chế độ development:**
   ```bash
   npm run dev
   ```
   hoặc:
   ```bash
   yarn dev
   ```

4. **Mở trình duyệt và truy cập:**
   ```
   http://localhost:5173
   ```

## 📦 Các lệnh có sẵn

| Lệnh | Mô tả |
|------|--------|
| `npm run dev` | Chạy ứng dụng ở chế độ development |
| `npm run build` | Build ứng dụng cho production |
| `npm run preview` | Xem trước bản build production |
| `npm run lint` | Kiểm tra và sửa lỗi code style |

## 📁 Cấu trúc thư mục

```
fullcalendarscreen/
├── public/                 # Tài nguyên tĩnh
├── src/
│   ├── components/        # Các component React
│   │   ├── Calendar/      # Component lịch chính
│   │   ├── header/        # Component header
│   │   └── sidebar/       # Component sidebar
│   ├── App.tsx           # Component chính
│   └── main.tsx          # Entry point
├── package.json          # Cấu hình dependencies
└── README.md            # File hướng dẫn này
```

**Lưu ý:** Nhớ chạy `npm install` trước khi sử dụng ứng dụng! 🚀
