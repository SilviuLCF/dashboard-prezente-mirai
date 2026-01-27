#!/bin/bash

echo "🔄 Actualizare Dashboard Prezențe Mirai..."
echo ""

# Descarcă datele din Google Sheets
echo "📥 1. Se descarcă datele din Google Sheets..."
curl -Lk "https://docs.google.com/spreadsheets/d/1DZZLXB6rm0lXSqLtMdfFXNRWi9Gh9N8oKbXMM63FwQA/export?format=csv&gid=1161792968" > prezente_data.csv 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Date descărcate cu succes!"
else
    echo "❌ Eroare la descărcarea datelor!"
    exit 1
fi

# Procesează datele
echo ""
echo "⚙️  2. Se procesează datele..."
node process_prezente.js

echo ""
echo "✨ Dashboard actualizat! Reîmprospătează pagina în browser (F5)."
echo ""

