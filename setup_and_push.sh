#!/bin/bash

echo "🚀 Setup GitHub SSH și Push pentru Dashboard Mirai Dojo"
echo "=================================================="
echo ""

# Start SSH agent
echo "1️⃣ Pornesc SSH agent..."
eval "$(ssh-agent -s)"

# Add SSH key
echo "2️⃣ Adaug SSH key..."
ssh-add ~/.ssh/id_ed25519_github 2>/dev/null

# Configure SSH for GitHub
echo "3️⃣ Configurez SSH pentru GitHub..."
mkdir -p ~/.ssh
cat >> ~/.ssh/config << 'EOF'

# GitHub SSH Configuration
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_github
    AddKeysToAgent yes
EOF

# Test SSH connection
echo "4️⃣ Testez conexiunea SSH cu GitHub..."
ssh -T git@github.com 2>&1 | grep -q "successfully authenticated" && echo "✅ SSH funcționează!" || echo "⚠️ Verifică că ai adăugat cheia SSH pe GitHub!"

# Change remote from HTTPS to SSH
echo "5️⃣ Schimb remote de la HTTPS la SSH..."
cd ~/Desktop/Dashboard_prezente
git remote remove origin 2>/dev/null
git remote add origin git@github.com:SilviuLCF/dashboard-prezente-mirai.git

# Push to GitHub
echo "6️⃣ Fac push la GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ =================================================="
    echo "✅ SUCCESS! Repository-ul a fost publicat pe GitHub!"
    echo "✅ =================================================="
    echo ""
    echo "🌐 Link repository: https://github.com/SilviuLCF/dashboard-prezente-mirai"
    echo ""
    
    # Open repository in browser
    echo "7️⃣ Deschid repository-ul în browser..."
    open "https://github.com/SilviuLCF/dashboard-prezente-mirai" 2>/dev/null || \
    xdg-open "https://github.com/SilviuLCF/dashboard-prezente-mirai" 2>/dev/null
    
    echo ""
    echo "🎯 Next steps:"
    echo "   1. Verifică repository-ul pe GitHub"
    echo "   2. Deploy pe Netlify: https://app.netlify.com/start"
    echo "   3. Connect to GitHub și selectează repository-ul"
    echo ""
else
    echo ""
    echo "❌ Eroare la push!"
    echo "Verifică că:"
    echo "  1. Ai adăugat cheia SSH pe GitHub: https://github.com/settings/keys"
    echo "  2. Repository-ul există: https://github.com/SilviuLCF/dashboard-prezente-mirai"
    echo "  3. Ai acces de write la repository"
    echo ""
fi

