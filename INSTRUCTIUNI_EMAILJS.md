# 📧 Configurare Google Apps Script - Trimitere Automată Email cu PDF

## ⚡ Pași Rapizi (5 minute) - 100% GRATUIT!

### 1️⃣ Deschide Google Apps Script

Mergi la: **https://script.google.com/**
- Autentifică-te cu contul Google: `miraidojoaikidoaikikai@gmail.com`
- ✅ **100% GRATUIT - FĂRĂ LIMITE!**

---

### 2️⃣ Creează Proiect Nou

1. Click **"New project"** (buton albastru în stânga sus)
2. Se deschide un editor de cod
3. Șterge tot codul existent (care zice `function myFunction() {...}`)

---

### 3️⃣ Copiază Codul

1. Deschide fișierul **`google-apps-script.js`** de pe Desktop
2. **Copiază TOT codul** (Ctrl+A, Ctrl+C)
3. **Lipește** în Google Apps Script editor (Ctrl+V)
4. Click pe **"Untitled project"** (sus) și redenumește în **"Mirai Dojo Email Sender"**
5. Click **"Save"** (iconița disc sau Ctrl+S)

---

### 4️⃣ Deploy ca Web App

1. Click pe **"Deploy"** (sus, în toolbar)
2. Alege **"New deployment"**
3. Click pe **iconița rotițată** ⚙️ lângă "Select type"
4. Alege **"Web app"**
5. Configurează:
   - **Description**: "Mirai Dojo Email Service"
   - **Execute as**: Alege **"Me"** (contul tău)
   - **Who has access**: Alege **"Anyone"** (IMPORTANT!)
6. Click **"Deploy"**
7. **Autorizează aplicația**:
   - Click "Review permissions"
   - Alege contul `miraidojoaikidoaikikai@gmail.com`
   - Click "Advanced" -> "Go to Mirai Dojo Email Sender (unsafe)"
   - Click "Allow"
8. **COPIAZĂ URL-ul** care apare (arată ca: `https://script.google.com/macros/s/ABC123.../exec`)

---

### 5️⃣ Actualizează `cotizatie.html`

1. Deschide `cotizatie.html` în editor text (Cursor, VS Code, Notepad++, etc.)
2. Caută **linia ~165** (sau caută `YOUR_GOOGLE_SCRIPT_URL_HERE`)
3. Găsești:

```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
```

4. **Înlocuiește** cu URL-ul tău:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/ABC123.../exec';
```

5. **Salvează fișierul**

---

### 6️⃣ GATA! Testează

1. Deschide `cotizatie.html` în browser
2. Completează formularele
3. Semnează cu mouse/deget
4. Click **"💾 Salvează Documentul"**
5. **AUTOMAT**:
   - ✅ Email trimis la Dojo Cho (cu PDF atașat)
   - ✅ Email trimis la Reprezentant FRAA (cu PDF atașat)
   - ✅ Email trimis la miraidojoaikidoaikikai@gmail.com (cu PDF atașat)
   - ✅ PDF descărcat local ca backup

---

## 📊 Ce Face Google Apps Script Automat:

✅ Trimite email la **3 adrese** simultan
✅ Atașează **PDF-ul** automat la fiecare email
✅ Email-uri trimise din **contul tău Gmail**
✅ **100% GRATUIT - FĂRĂ LIMITE!**
✅ **FĂRĂ SUBSCRIPȚIE** necesară

---

## ❓ Probleme?

### Email-urile nu se trimit?

1. Verifică că ai **înlocuit URL-ul** în `cotizatie.html`
2. Verifică că deployment-ul are acces **"Anyone"**
3. Verifică că ai **autorizat aplicația** (pas 4.7)
4. Verifică **spam/junk folder** - uneori ajung acolo prima dată
5. Deschide **Console** (F12 în browser) pentru detalii eroare

### "Authorization required" error?

- Click pe **"Deploy" -> "Manage deployments"** în Google Apps Script
- Click pe **iconița creion** ✏️ la deployment
- Verifică că "Who has access" este **"Anyone"**
- Click **"Deploy"** din nou

### Email-urile ajung fără PDF?

- Verifică că ai copiat **TOT codul** din `google-apps-script.js`
- Verifică că funcția `doPost` există în script
- Verifică că nu ai șters nimic din cod

---

## 🎯 De ce Google Apps Script (nu EmailJS)?

| Feature | Google Apps Script | EmailJS |
|---------|-------------------|---------|
| **Preț** | 100% GRATUIT | Attachments necesită subscripție |
| **Attachments** | ✅ Incluse | ❌ Doar cu subscripție |
| **Limite** | Fără limite | 200 email-uri/lună (gratuit) |
| **Configurare** | 5 minute | 5 minute |
| **Reliability** | Google Cloud | Serviciu terță-parte |

**Google Apps Script = Soluția perfectă GRATUITĂ!** 🚀

---

## 📸 Exemplu Vizual

### Google Apps Script Editor:
```javascript
// Codul din google-apps-script.js trebuie copiat aici
function doPost(e) {
  // ... cod pentru trimitere email cu attachment
}
```

### URL-ul în cotizatie.html:
```javascript
// Caută în jurul liniei 165
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/ABC123.../exec';
```

### Deployment Settings:
- Execute as: **Me**
- Who has access: **Anyone** ⚠️ IMPORTANT!

---

## 💡 Bonus: Verifică Email-urile Trimise

1. Mergi la Gmail: https://mail.google.com/
2. Deschide **"Sent"** (Email-uri trimise)
3. Vei vedea toate email-urile trimise automat cu PDF atașat

---

## 🔐 Securitate

**Este sigur?**
- ✅ DA! Script-ul rulează cu contul tău Google
- ✅ Doar TU poți vedea/edita script-ul
- ✅ Email-urile se trimit din contul tău Gmail
- ✅ Nimeni altcineva nu are acces la date

**"Anyone" access înseamnă?**
- Dashboard-ul TĂU poate apela script-ul
- Script-ul trimite email-uri din contul TĂU
- Nimeni nu poate vedea codul sau datele

---

**Need help?** Deschide Console (F12) în browser pentru instrucțiuni complete!

**Made with ❤️ for Mirai Dojo Aikido Aikikai**

