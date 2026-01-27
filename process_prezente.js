const fs = require('fs');

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }

    result.push(current);
    return result;
}

function processData() {
    console.log('📊 Procesare date prezențe Mirai...\n');

    // Citește CSV-ul descărcat
    const csvContent = fs.readFileSync('prezente_data.csv', 'utf-8');
    const lines = csvContent.trim().split('\n');

    console.log(`Total linii CSV: ${lines.length}`);

    // Header-ul poate fi pe multiple linii din cauza wrapping-ului
    // Găsește prima linie care conține date (începe cu grad de tip A sau C)
    let headerEndIndex = 0;
    for (let i = 0; i < lines.length; i++) {
        const firstChar = lines[i].trim().charAt(0);
        if (firstChar === 'A' || firstChar === 'C') {
            headerEndIndex = i;
            break;
        }
    }

    // Combină toate liniile de header într-una singură
    const fullHeader = lines.slice(0, headerEndIndex).join('');
    console.log(`Header combinat (primele 200 chars): ${fullHeader.substring(0, 200)}...\n`);

    // Parse header pentru a găsi coloanele cu date
    const headerValues = parseCSVLine(fullHeader);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let lastTrainingColumnIndex = -1;
    let lastTrainingDate = null;

    // Caută ultima dată înainte de azi (începând de la coloana M = index 12)
    for (let colIndex = 12; colIndex < headerValues.length; colIndex++) {
        const headerValue = (headerValues[colIndex] || '').trim();
        
        // Încearcă să parseze data (format: DD-MMM-YYYY sau DD-Mon-YYYY)
        const dateMatch = headerValue.match(/(\d{2})-(\w{3})-(\d{4})/);
        if (dateMatch) {
            const [_, day, monthStr, year] = dateMatch;
            const monthMap = {
                'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
                'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
            };
            const month = monthMap[monthStr];
            
            if (month !== undefined) {
                const columnDate = new Date(parseInt(year), month, parseInt(day));
                columnDate.setHours(0, 0, 0, 0);
                
                // Verifică dacă data e înainte de azi
                if (columnDate < today) {
                    lastTrainingDate = columnDate;
                    lastTrainingColumnIndex = colIndex;
                }
            }
        }
    }

    if (lastTrainingColumnIndex === -1) {
        console.log('⚠️  Nu s-a găsit nicio dată de antrenament înainte de azi\n');
    } else {
        console.log(`✅ Ultimul antrenament: ${lastTrainingDate.toLocaleDateString('ro-RO')} (coloana ${lastTrainingColumnIndex})\n`);
    }

    let totalInscrisi = 0;
    let totalCopii = 0;
    let totalAdulti = 0;
    let nssmSemnat = 0;
    let nssmNesemnat = 0;
    let cotiziePlatita = 0;
    let cotizieNeplatita = 0;
    let adeverintaValabila = 0;
    let adeverintaLipsa = 0;
    let readyForExam = 0;
    let notReadyForExam = 0;
    let prezentiUltimulAntrenament = 0;
    let motivatiUltimulAntrenament = 0;
    const participanti = [];

    // Skip header lines și procesează datele
    for (let i = headerEndIndex; i < lines.length; i++) {
        if (!lines[i].trim()) continue;

        const values = parseCSVLine(lines[i]);
        const grad = (values[0] || '').trim();
        const nume = (values[1] || '').trim();
        const cotiz = (values[2] || '').trim().toUpperCase(); // Coloana C - Cotizație FRAA (index 2)
        const nssm = (values[3] || '').trim().toUpperCase(); // Coloana D - NSSM (index 3)
        const adeverinta = (values[4] || '').trim().toUpperCase(); // Coloana E - Adeverință Medicală (index 4)
        const readyExam = (values[11] || '').trim().toUpperCase(); // Coloana L - Ready for Exam (index 11)
        
        // Verifică prezența la ultimul antrenament
        let lastTrainingStatus = '';
        if (lastTrainingColumnIndex !== -1) {
            lastTrainingStatus = (values[lastTrainingColumnIndex] || '').trim().toUpperCase();
        }

        // Oprește când găsești "Prezenti" în coloana Nume
        if (nume.toLowerCase().includes('prezent')) {
            console.log(`✋ Am găsit "Prezenti" la linia ${i + 1} - stop\n`);
            break;
        }

        // Ignoră rândurile goale
        if (nume === '' || grad === '') {
            continue;
        }

        // Numără participanții
        totalInscrisi++;
        
        const participant = {
            grad: grad,
            nume: nume,
            cotiz: cotiz,
            nssm: nssm,
            adeverinta: adeverinta,
            readyExam: readyExam,
            lastTraining: lastTrainingStatus
        };

        if (grad.startsWith('C') || grad.startsWith('c')) {
            totalCopii++;
            participant.categorie = 'Copil';
        } else if (grad.startsWith('A') || grad.startsWith('a')) {
            totalAdulti++;
            participant.categorie = 'Adult';
        } else {
            participant.categorie = 'Necunoscut';
        }

        // Numără Cotizație FRAA
        if (cotiz === 'Y') {
            cotiziePlatita++;
            participant.cotizStatus = 'Plătită';
        } else if (cotiz === 'N') {
            cotizieNeplatita++;
            participant.cotizStatus = 'Neplătită';
        } else {
            participant.cotizStatus = 'Necunoscut';
        }

        // Numără NSSM
        if (nssm === 'Y') {
            nssmSemnat++;
            participant.nssmStatus = 'Semnat';
        } else if (nssm === 'N') {
            nssmNesemnat++;
            participant.nssmStatus = 'Nesemnat';
        } else {
            participant.nssmStatus = 'Necunoscut';
        }

        // Numără Adeverință Medicală
        if (adeverinta === 'Y') {
            adeverintaValabila++;
            participant.adeverintaStatus = 'Valabilă';
        } else if (adeverinta === 'N') {
            adeverintaLipsa++;
            participant.adeverintaStatus = 'Lipsă';
        } else {
            participant.adeverintaStatus = 'Necunoscut';
        }

        // Numără Ready for Exam
        if (readyExam === 'Y') {
            readyForExam++;
            participant.readyExamStatus = 'Pregătit';
        } else if (readyExam === 'N') {
            notReadyForExam++;
            participant.readyExamStatus = 'Nepregătit';
        } else {
            participant.readyExamStatus = 'Necunoscut';
        }

        // Numără prezența la ultimul antrenament
        if (lastTrainingStatus === 'P') {
            prezentiUltimulAntrenament++;
            participant.lastTrainingStatus = 'Prezent';
        } else if (lastTrainingStatus === 'M') {
            motivatiUltimulAntrenament++;
            participant.lastTrainingStatus = 'Motivat';
        } else {
            participant.lastTrainingStatus = 'Absent';
        }

        participanti.push(participant);
        
        if (i <= 10) {
            console.log(`${totalInscrisi}. ${participant.categorie} - ${grad} - ${nume} - Ultimul ant: ${participant.lastTrainingStatus}`);
        }
    }

    console.log(`\n=== REZULTATE ===`);
    console.log(`✅ Total înscriși: ${totalInscrisi}`);
    console.log(`👶 Copii: ${totalCopii}`);
    console.log(`👨 Adulți: ${totalAdulti}`);
    console.log(`💰 Cotizație Plătită: ${cotiziePlatita}`);
    console.log(`⏳ Cotizație Neplătită: ${cotizieNeplatita}`);
    console.log(`📝 NSSM Semnat: ${nssmSemnat}`);
    console.log(`⏳ NSSM Nesemnat: ${nssmNesemnat}`);
    console.log(`🏥 Adeverință Valabilă: ${adeverintaValabila}`);
    console.log(`⚠️  Adeverință Lipsă: ${adeverintaLipsa}`);
    console.log(`✅ Pregătiți Examen: ${readyForExam}`);
    console.log(`❌ Nepregătiți Examen: ${notReadyForExam}`);
    if (lastTrainingDate) {
        console.log(`\n📅 Ultimul antrenament: ${lastTrainingDate.toLocaleDateString('ro-RO')}`);
        console.log(`✅ Prezenți (P): ${prezentiUltimulAntrenament}`);
        console.log(`📝 Motivați (M): ${motivatiUltimulAntrenament}`);
    }

    const stats = {
        totalInscrisi,
        totalCopii,
        totalAdulti,
        cotiziePlatita,
        cotizieNeplatita,
        nssmSemnat,
        nssmNesemnat,
        adeverintaValabila,
        adeverintaLipsa,
        readyForExam,
        notReadyForExam,
        prezentiUltimulAntrenament,
        motivatiUltimulAntrenament,
        lastTrainingDate: lastTrainingDate ? lastTrainingDate.toISOString() : null,
        percentCopii: totalInscrisi > 0 ? ((totalCopii / totalInscrisi) * 100).toFixed(1) : 0,
        percentAdulti: totalInscrisi > 0 ? ((totalAdulti / totalInscrisi) * 100).toFixed(1) : 0,
        percentCotiziePlatita: totalInscrisi > 0 ? ((cotiziePlatita / totalInscrisi) * 100).toFixed(1) : 0,
        percentCotizieNeplatita: totalInscrisi > 0 ? ((cotizieNeplatita / totalInscrisi) * 100).toFixed(1) : 0,
        percentNssmSemnat: totalInscrisi > 0 ? ((nssmSemnat / totalInscrisi) * 100).toFixed(1) : 0,
        percentNssmNesemnat: totalInscrisi > 0 ? ((nssmNesemnat / totalInscrisi) * 100).toFixed(1) : 0,
        percentAdeverintaValabila: totalInscrisi > 0 ? ((adeverintaValabila / totalInscrisi) * 100).toFixed(1) : 0,
        percentAdeverintaLipsa: totalInscrisi > 0 ? ((adeverintaLipsa / totalInscrisi) * 100).toFixed(1) : 0,
        percentReadyForExam: totalInscrisi > 0 ? ((readyForExam / totalInscrisi) * 100).toFixed(1) : 0,
        percentNotReadyForExam: totalInscrisi > 0 ? ((notReadyForExam / totalInscrisi) * 100).toFixed(1) : 0,
        percentPrezentiUltimul: totalInscrisi > 0 ? ((prezentiUltimulAntrenament / totalInscrisi) * 100).toFixed(1) : 0,
        lastUpdate: new Date().toISOString(),
        participanti: participanti
    };

    // Salvează datele procesate
    fs.writeFileSync('dashboard_data.json', JSON.stringify(stats, null, 2));
    console.log(`\n💾 Date salvate în dashboard_data.json`);
}

processData();

