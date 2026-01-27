# 🥋 Dashboard Prezențe Mirai 2024-2025

Dashboard interactiv pentru monitorizarea prezențelor la Mirai Dojo.

## 🚀 Deploy pe Netlify (SIMPLU - fără configurări!)

### Pasul 1: Verifică că Google Sheets e Public

1. Deschide Google Sheets: https://docs.google.com/spreadsheets/d/1DZZLXB6rm0lXSqLtMdfFXNRWi9Gh9N8oKbXMM63FwQA/edit
2. Click **Share** (butonul din dreapta sus)
3. Setează: **Anyone with the link** → **Viewer**
4. Gata! ✅

### Pasul 2: Deploy pe Netlify

#### Opțiunea A: Drag & Drop (cel mai rapid - 2 minute!)

1. Mergi la https://app.netlify.com/drop
2. Drag & Drop **DOAR fișierul `index.html`** din Desktop/Dashboard_prezente
3. Gata! 🎉 Dashboard-ul va citi automat din Google Sheets!

#### Opțiunea B: Deploy prin Git

1. Creează un repository pe GitHub
2. Urcă fișierul:
   ```bash
   cd ~/Desktop/Dashboard_prezente
   git init
   git add index.html README.md
   git commit -m "Dashboard Prezente Mirai"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```
3. Pe Netlify:
   - Click **Add new site** → **Import an existing project**
   - Alege GitHub și selectează repository-ul
   - Deploy! 🚀

## ✨ Cum Funcționează?

Dashboard-ul folosește **Google Visualization API** care:
- ✅ **NU necesită configurări** (nu trebuie Google Apps Script!)
- ✅ **NU are probleme CORS** pe Netlify/hosting
- ✅ Citește direct din Google Sheets
- ✅ Se actualizează automat la fiecare 5 minute
- ✅ Funcționează instant după deploy!

**Singura cerință:** Sheet-ul trebuie să fie public (View).

## 📊 Caracteristici

### Carduri Statistice:
- 🎯 **Total Înscriși** - Numărul total de membri activi (27)
- 👶 **Copii** - Membri cu grad începând cu "C" (8)
- 👨 **Adulți** - Membri cu grad începând cu "A" (19)
- 📊 **Procente** - Distribuția automată Copii vs Adulți

### Funcționalități:
- ✅ Actualizare automată la fiecare 5 minute
- ✅ Buton de sincronizare manuală
- ✅ Design responsive (mobil + desktop)
- ✅ Date live din Google Sheets (fără configurări!)
- ✅ Timestamp ultimei actualizări
- ✅ Fallback la fișier local pentru development

## 🛠️ Mod Development Local

Pentru development local (testare înainte de Netlify):

```bash
# 1. Actualizează datele (opțional, pentru testare offline)
cd ~/Desktop/Dashboard_prezente
./update_dashboard.sh

# 2. Pornește server local
python3 -m http.server 8080

# 3. Deschide în browser
open http://localhost:8080
```

## 📁 Fișiere Necesare pentru Netlify

Pentru deploy pe Netlify ai nevoie DOAR de:
- ✅ `index.html` - Dashboard-ul (conține tot codul necesar!)

Fișiere opționale (doar pentru development local):
- `update_dashboard.sh` - Script pentru actualizare locală
- `process_prezente.js` - Script Node.js pentru procesare locală
- `dashboard_data.json` - Date procesate local (fallback)
- `google-apps-script.js` - Nu mai e necesar!

## 🔄 Actualizare Date

### Pe Netlify (Automat):
- Dashboard-ul citește automat din Google Sheets
- Se actualizează la fiecare 5 minute
- Sau apasă butonul "🔄 Sincronizare Date"
- **NU trebuie să faci nimic!** ✨

### Local (pentru testare):
```bash
./update_dashboard.sh
```

## ⚙️ Configurare (dacă schimbi Sheet-ul)

Dacă vrei să folosești alt Google Sheet, modifică în `index.html`:

```javascript
const SHEET_ID = '1DZZLXB6rm0lXSqLtMdfFXNRWi9Gh9N8oKbXMM63FwQA'; // ID-ul sheet-ului
const GID = '1161792968'; // GID-ul tab-ului specific
```

**Cum găsești GID-ul?**
URL-ul sheet-ului arată așa:
```
https://docs.google.com/spreadsheets/d/SHEET_ID/edit#gid=GID
                                          ^^^^^^^^           ^^^
```

## 🐛 Troubleshooting

### Eroare: "Nu s-au putut încărca datele"
1. ✅ Verifică că sheet-ul e **public** (Share → Anyone with link → Viewer)
2. ✅ Verifică că `SHEET_ID` și `GID` sunt corecte în `index.html`
3. ✅ Deschide Console (F12) în browser pentru detalii

### Dashboard arată 0 participanți
1. ✅ Verifică că datele sunt în coloanele **A** (Grad) și **B** (Nume)
2. ✅ Verifică că există un rând cu "Prezenti" care marchează sfârșitul datelor
3. ✅ Verifică că GID-ul corespunde tab-ului corect (Prezente2026)

### Pe local funcționează, pe Netlify nu
- Netlify are nevoie de câteva secunde după deploy
- Reîmprospătează pagina (Ctrl+F5 sau Cmd+Shift+R)
- Verifică Console pentru erori

## 📞 Debug

Pentru debug, deschide Console (F12) și vei vedea:
```
📥 Încerc să citesc din Google Sheets...
✅ Date primite de la Google Sheets
✋ Am găsit "Prezenti" la rândul 41 - stop

=== REZULTATE ===
✅ Total înscriși: 27
👶 Copii: 8
👨 Adulți: 19
```

---

Made with 🥋 for Mirai Dojo

**TL;DR pentru Netlify:**
1. Share sheet-ul ca public (View)
2. Drag & drop `index.html` pe netlify.com/drop
3. Done! 🎉


