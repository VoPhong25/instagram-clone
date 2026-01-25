import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
    define: {
    global: {},
  },
server: {
    port: 5175,      // Đặt cổng bạn muốn (ví dụ: 3000)
    strictPort: true, // Nếu cổng 3000 đang bận, nó sẽ báo lỗi chứ KHÔNG tự đổi sang 3001
    host: true,       // (Tùy chọn) Giúp bạn truy cập được qua IP mạng LAN (vd: xem trên điện thoại)
  },
})
