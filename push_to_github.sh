#!/bin/bash

# Script pentru push la GitHub
# Repository: dashboard-prezente-mirai
# User: SilviuLCF

cd /Users/sghimpos/Desktop/Dashboard_prezente

echo "🔗 Adaugare remote GitHub..."
git remote add origin https://github.com/SilviuLCF/dashboard-prezente-mirai.git

echo "📤 Push la GitHub..."
git branch -M main
git push -u origin main

echo "✅ Gata! Repository-ul a fost publicat pe GitHub!"
echo "🌐 Link: https://github.com/SilviuLCF/dashboard-prezente-mirai"

