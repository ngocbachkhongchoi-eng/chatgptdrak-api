const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// CẤU HÌNH SUPABASE (GIẤU KÍN TRÊN SERVER)
const SUPABASE_URL = "https://jatjwkbikmggopsvjrh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphdGp3a2Jpa21nZ3FvcHN2anJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyNDU5NjUsImV4cCI6MjEwNzgyMTk2NX0.K0WWpCEUv1rbjtlDlHhEfrcdRlZ4AZlGCSYr2TMZmdE";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// API LẤY DỮ LIỆU
app.get('/api/data', async (req, res) => {
    try {
        const { data, error } = await supabase.from('data').select('content').eq('id', 'main').single();
        if (error) return res.status(500).json({ error: error.message });
        res.json(data.content);
    } catch(e) {
        res.status(500).json({ error: e.message });
    }
});

// API LƯU DỮ LIỆU
app.post('/api/data', async (req, res) => {
    try {
        const { error } = await supabase.from('data').update({ content: req.body }).eq('id', 'main');
        if (error) return res.status(500).json({ error: error.message });
        res.json({ success: true });
    } catch(e) {
        res.status(500).json({ error: e.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy tại cổng ${PORT}`));