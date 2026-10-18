const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// CẤU HÌNH SUPABASE
const SUPABASE_URL = "https://jatjwkbikmggopsvjrh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphdGp3a2Jpa21nZ3FvcHN2anJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyNDU5NjUsImV4cCI6MjEwNzgyMTk2NX0.K0WWpCEUv1rbjtlDlHhEfrcdRlZ4AZlGCSYr2TMZmdE";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// API LẤY DỮ LIỆU (TỰ ĐỘNG TẠO NẾU CHƯA CÓ)
app.get('/api/data', async (req, res) => {
    try {
        const { data, error } = await supabase.from('data').select('content').eq('id', 'main').single();
        if (error || !data) {
            // Nếu chưa có dữ liệu, trả về object rỗng
            return res.json({ users: {}, orders: [] });
        }
        res.json(data.content);
    } catch(e) {
        res.json({ users: {}, orders: [] }); // Bỏ qua lỗi nếu có
    }
});

// API LƯU DỮ LIỆU (TỰ ĐỘNG TẠO MỚI NẾU CHƯA CÓ)
app.post('/api/data', async (req, res) => {
    try {
        // Dùng upsert thay vì update để tự tạo nếu chưa có
        const { error } = await supabase.from('data').upsert({ id: 'main', content: req.body });
        if (error) return res.status(500).json({ error: error.message });
        res.json({ success: true });
    } catch(e) {
        res.status(500).json({ error: e.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy tại cổng ${PORT}`));
