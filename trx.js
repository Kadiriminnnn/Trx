let intervalId;
let checkedCount = 0;
const targetCount = 1082828199999999919919191919191919919191919191999191919199191919191910;
let startClicked = false;
const words = ["crypto", "blockchain", "wallet", "bitcoin", "ethereum", "node", "transaction", "address", "hash", "token", "mining", "ledger", "decentralized", "altcoin", "consensus", "proof", "stake", "chain", "smart", "contract", "fitness", "training", "exercise", "health", "strength", "muscle", "reps", "sets", "gym", "workout", "diet", "nutrition", "cardio", "endurance", "performance", "recovery", "sweat", "lift", "bulk", "cut", "stamina", "flex", "stretch", "soccer", "basketball", "baseball", "tennis", "golf", "swimming", "cycling", "running", "hockey", "volleyball", "football", "rugby", "boxing", "wrestling", "badminton", "skiing", "snowboarding", "surfing", "skateboarding", "rowing", "yoga", "pilates", "martial", "climbing", "gymnastics", "diving", "track", "field", "archery", "fencing", "tabletennis", "cricket", "lacrosse", "softball", "billiards", "bowling", "triathlon", "canoeing", "kayaking", "riding", "trekking", "skating", "judo", "kickboxing", "shooting", "darts", "speed", "motocross", "sledding", "crossfit", "lifting", "synchronized", "snowshoeing", "wrestling", "taekwondo", "sailing", "windsurfing", "freestyle", "artistic", "biathlon", "handball", "paddle", "ski", "bobsled", "luge", "skeleton", "cheerleading", "polevault", "high", "long", "discus", "hammer", "decathlon", "heptathlon", "ball", "bat", "racket", "stick", "glove", "helmet", "shirt", "shoes", "bag", "net", "mask", "paddle", "board", "mallet", "jersey", "trophy", "mat", "rope", "wheels", "saddle", "puck", "belt", "goggles", "tee", "caps", "jacket", "cage", "boots", "hurdles", "wheel", "cart", "cup", "cane", "vest", "gun", "bridle", "shinguard", "mouthguard", "uniform", "holster", "hoop", "sweater", "gloves", "shorts", "pad", "ring", "score", "skate", "disc", "towel"];

// Random kelime üretme fonksiyonu (12 kelime)
function generateRandomWords() {
    let usedWords = new Set();
    let randomWords = [];
    while (randomWords.length < 12) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const word = words[randomIndex];
        if (!usedWords.has(word)) {
            usedWords.add(word);
            randomWords.push(word);
        }
    }
    return randomWords.join(' ');
}

// Tarama başlatma fonksiyonu
function startScan() {
    if (startClicked) return;  // Start tuşuna sadece 1 kez basılabilsin
    startClicked = true;

    intervalId = setInterval(() => {
        checkedCount++;
        const scanResults = document.getElementById('scan-results');
        const newScan = document.createElement('p');
        newScan.style.fontSize = '10px';  // Yazı boyutu küçültüldü
        const walletText = document.createElement('span');
        walletText.textContent = 'wallet|trx: ';
        walletText.style.color = "green";

        const randomWords = generateRandomWords();
        newScan.appendChild(walletText);
        newScan.append(document.createTextNode(randomWords));

        if (checkedCount === targetCount) {
            newScan.style.color = "red";
            const foundAmount = (Math.random() * (0.01 - 0.001) + 0.001).toFixed(6);
            const foundBox = document.querySelector('.found-box');
            const foundAmountSpan = document.getElementById('found-amount');
            const foundWordsDiv = document.getElementById('found-words');
            const foundLogo = document.getElementById('found-logo');
            
            // Kazanç miktarını found-box kutucuğuna ekle
            foundAmountSpan.textContent = `${foundAmount} TRX`;
            foundLogo.style.display = 'inline';
            foundLogo.src = 'trx.png';
            
            // Kazancı found.txt dosyasına yaz
            saveFoundAmount(foundAmount);
            
            // Kazanç ve kelimeleri found-words kutusuna ekle
            foundWordsDiv.textContent = randomWords; // Aynı kelimeleri ekle
            
            clearInterval(intervalId);  // Tarama kazanç geldiğinde otomatik dursun
        } else {
            newScan.style.color = "white";
        }

        scanResults.appendChild(newScan);
        scanResults.scrollTop = scanResults.scrollHeight; // Otomatik kaydırma eklendi
        document.getElementById('checked').textContent = `Checked: ${checkedCount}`;
    }, 70); // Tarama hızı 10 katına çıkarıldı (0.5 ms)
}

// Tarama durdurma fonksiyonu
function stopScan() {
    clearInterval(intervalId);
    startClicked = false;
}

// Kazancı found.txt dosyasına kaydetme fonksiyonu
function saveFoundAmount(amount) {
    const file = new Blob([`"btc = ${amount}"\n`], { type: 'text/plain' });
    const a = document.createElement("a");
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = "found.txt";
    a.click();
    URL.revokeObjectURL(url);
}

// Event listener ekleme
document.getElementById('startBtn').addEventListener('click', startScan);
document.getElementById('stopBtn').addEventListener('click', stopScan);