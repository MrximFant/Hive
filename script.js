document.addEventListener('DOMContentLoaded', () => {
    const csvData = `
,1,,2,3,,4,5,,6,7,,8,9,,10,11,,12,13,,14,15,,16,17,,18,19,,20,21,,22,23,,24,25
A,"Lvl 1 Digging Stronghold (29,965) OPEN",,,"Lvl 1 Digging Stronghold (112,965) OPEN",,,"Lvl 1 Digging Stronghold (187,965) OPEN",,,"Lvl 1 Digging Stronghold (262,965) OPEN",,,"Lvl 1 Digging Stronghold (337,965) OPEN",,,"Lvl 1 Digging Stronghold (412,965) OPEN",,,"Lvl 1 Digging Stronghold (499,965) OPEN",,,"Lvl 1 Digging Stronghold (587,965) OPEN",,,"Lvl 1 Digging Stronghold (662,965) OPEN",,,"Lvl 1 Digging Stronghold (737,965) OPEN",,,"Lvl 1 Digging Stronghold (812,965) OPEN",,,"Lvl 1 Digging Stronghold (887,965) OPEN",,,"Lvl 1 Digging Stronghold (969,965) OPEN"
B,,,"Lvl 1 Trade Post (74,924) OPEN",,,"Lvl 1 Village (149,924) OPEN",,,"Lvl 1 Village (224,924) OPEN",,,"Lvl 1 Village (299,924) OPEN",,,"Lvl 1 Village (374,924) OPEN",,,"Lvl 1 Village (449,924) OPEN",,,"Lvl 1 Village (549,924) OPEN",,,"Lvl 1 Village (624,924) OPEN",,,"Lvl 1 Village (699,924) OPEN",,,"Lvl 1 Village (774,924) OPEN",,,"Lvl 1 Village (849,924) OPEN",,,"Lvl 1 Trade Post (924,924) OPEN",
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
C,"Lvl 1 Digging Stronghold (29,887) OPEN",,,"Lvl 2 Digging Stronghold (112,887) OPEN",,,"Lvl 2 Digging Stronghold (187,887) OPEN",,,"Lvl 2 Digging Stronghold (262,887) OPEN",,,"Lvl 2 Digging Stronghold (337,887) OPEN",,,"Lvl 2 Digging Stronghold (412,887) OPEN",,,"Lvl 2 Digging Stronghold (499,887) OPEN",,,"Lvl 2 Digging Stronghold (587,887) OPEN",,,"Lvl 2 Digging Stronghold (662,887) OPEN",,,"Lvl 2 Digging Stronghold (737,887) OPEN",,,"Lvl 2 Digging Stronghold (812,887) OPEN",,,"Lvl 2 Digging Stronghold (887,887) OPEN",,,"Lvl 1 Digging Stronghold (969,887) OPEN"
D,,,"Lvl 1 VIllage (74,849) OPEN",,,"Lvl 2 Trade Post (149,849) OPEN",,,"Lvl 2 Altar (224,849) OPEN",,,"Lvl 2 Altar (299,849) OPEN",,,"Lvl 2 Altar (374,849) OPEN",,,"Lvl 2 Altar (449,849) OPEN",,,"Lvl 2 Altar (549,849) OPEN",,,"Lvl 2 Altar (624,849) OPEN",,,"Lvl 2 Altar (699,849) OPEN",,,"Lvl 2 Altar (774,849) OPEN",,,"Lvl 2 Trade Post (849,849) OPEN",,,"Lvl 1 Village (924,849) OPEN",
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
E,"Lvl 1 Digging Stronghold (29,812) OPEN",,,"Lvl 2 Digging Stronghold (112,812) OPEN",,,"Lvl 3 Digging Stronghold (187,812) OPEN",,,"Lvl 3 Digging Stronghold (262,812) OPEN",,,"Lvl 3 Digging Stronghold (337,812) OPEN",,,"Lvl 3 Digging Stronghold (412,812) OPEN",,,"Lvl 3 Digging Stronghold (499,812) OPEN",,,"Lvl 3 Digging Stronghold (587,812) OPEN",,,"Lvl 3 Digging Stronghold (662,812) OPEN",,,"Lvl 3 Digging Stronghold (737,812) OPEN",,,"Lvl 3 Digging Stronghold (812,812) OPEN",,,"Lvl 2 Digging Stronghold (887,812) OPEN",,,"Lvl 1 Digging Stronghold (969,812) OPEN"
F,,,"Lvl 1 Village (74,774) OPEN",,,"Lvl 2 Altar (149,774) OPEN",,,"Lvl 3 Trade Post (224,774) OPEN",,,"Lvl 3 Town (299,774) OPEN",,,"Lvl 3 Town (374,774) OPEN",,,"Lvl 3 Town (449,774) OPEN",,,"Lvl 3 Town (549,774) OPEN",,,"Lvl 3 Town (624,774) OPEN",,,"Lvl 3 Town (699,774) OPEN",,,"Lvl 3 Trade Post (774,774) OPEN",,,"Lvl 2 Altar (849,774) OPEN",,,"Lvl 1 Vilalge (924,774) OPEN",
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
G,"Lvl 1 Digging Stronghold (29,737) OPEN",,,"Lvl 2 Digging Stronghold (112,737) OPEN",,,"Lvl 3 Digging Stronghold (187,737) OPEN",,,"Lvl 4 Digging Stronghold (262,737) OPEN",,,"Lvl 4 Digging Stronghold (337,737) OPEN",,,"Lvl 4 Digging Stronghold (412,737) OPEN",,,"Lvl 4 Digging Stronghold (499,737) OPEN",,,"Lvl 4 Digging Stronghold (587,737) OPEN",,,"Lvl 4 Digging Stronghold (662,737) OPEN",,,"Lvl 4 Digging Stronghold (737,737) OPEN",,,"Lvl 3 Digging Stronghold (812,737) OPEN",,,"Lvl 2 Digging Stronghold (887,737) OPEN",,,"Lvl 1 Digging Stronghold (969,737) OPEN"
H,,,"Lvl 1 Village (74,699) OPEN",,,"Lvl 2 Altar (149,699) OPEN",,,"Lvl 3 Town (224,699) OPEN",,,"Lvl 4 Trade Post (299,699) OPEN",,,"Lvl 4 Temple of the Sun (374,699) OPEN",,,"Lvl 4 Temple of the Sun (449,699) OPEN",,,"Lvl 4 Temple of the Sun (549,699) OPEN",,,"Lvl 4 Temple of the Sun (624,699) OPEN",,,"Lvl 4 Trade Post (699,699) OPEN",,,"Lvl 3 Town (774,699) OPEN",,,"Lvl 2 Altar (849,699) OPEN",,,"Lvl 1 Village (924,699) OPEN",
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
I,"Lvl 1 Digging Stronghold (29,662) OPEN",,,"Lvl 2 Digging Stronghold (112,662) OPEN",,,"Lvl 3 Digging Stronghold (187,662) OPEN",,,"Lvl 4 Digging Stronghold (262,662) OPEN",,,"Lvl 5 Digging Stronghold (337,662) OPEN",,,"Lvl 5 Digging Stronghold (412,662) OPEN",,,"Lvl 5 Digging Stronghold (499,662) OPEN",,,"Lvl 5 Digging Stronghold (587,662) OPEN",,,"Lvl 5 Digging Stronghold (662,662) OPEN",,,"Lvl 4 Digging Stronghold (737,662) OPEN",,,"Lvl 3 Digging Stronghold (812,662) OPEN",,,"Lvl 2 Digging Stronghold (887,662) OPEN",,,"Lvl 1 Digging Stronghold (969,662) OPEN"
J,,,"Lvl 1 Village (74,624) OPEN",,,"Lvl 2 Altar (149,624) OPEN",,,"Lvl 3 Town (224,624) OPEN",,,"Lvl 4 Temple of the Sun (299,624) OPEN",,,"Lvl 5 Trade Post (374,624) OPEN",,,"Lvl 5 Ancient Tombs (449,624) OPEN",,,"Lvl 5 Ancient Tombs (549,624) OPEN",,,"Lvl 5 Trade Post (624,624) OPEN",,,"Lvl 4 Temple of the Sun (699,624) OPEN",,,"Lvl 3 Town (774,624) OPEN",,,"Lvl 2 Altar (849,624) OPEN",,,"Lvl 1 Village (924,624) OPEN",
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
K,"Lvl 1 Digging Stronghold (29,587) OPEN",,,"Lvl 2 Digging Stronghold (112,587) OPEN",,,"Lvl 3 Digging Stronghold (187,587) OPEN",,,"Lvl 4 Digging Stronghold (262,587) OPEN",,,"Lvl 5 Digging Stronghold (337,587) OPEN",,,"Lvl 6 Digging Stronghold (412,587) OPEN",,,"Lvl 6 Digging Stronghold (499,587) OPEN",,,"Lvl 6 Digging Stronghold (587,587) OPEN",,,"Lvl 5 Digging Stronghold (662,587) OPEN",,,"Lvl 4 Digging Stronghold (737,587) OPEN",,,"Lvl 3 Digging Stronghold (812,587) OPEN",,,"Lvl 2 Digging Stronghold (887,587) OPEN",,,"Lvl 1 Digging Stronghold (969,587) OPEN"
L,,,"Lvl 1 Village (74,549) OPEN",,,"Lvl 2 Altar (149,549) OPEN",,,"Lvl 3 Town (224,549) OPEN",,,"Lvl 4 Temple of the Sun (299,549) OPEN",,,"Lvl 5 Ancient Tombs (374,549) OPEN",,,"Lvl 6 Square of Judgment (Construction) (449,549) OPEN",,,"Lvl 6 Square of Judgment (Healing) (549,549) OPEN",,,"Lvl 5 Ancient Tombs (624,549) OPEN",,,"Lvl 4 Temple of the Sun (699,549) OPEN",,,"Lvl 3 Town (774,549) OPEN",,,"Lvl 2 Altar (849,549) OPEN",,,"Lvl 1 Village (924,549) OPEN",
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
M,"Lvl 1 Digging Stronghold (29,499) OPEN",,,"Lvl 2 Digging Stronghold (112,499) OPEN",,,"Lvl 3 Digging Stronghold (187,499) OPEN",,,"Lvl 4 Digging Stronghold (262,499) OPEN",,,"Lvl 5 Digging Stronghold (337,499) OPEN",,,"Lvl 6 Digging Stronghold (412,499) OPEN",,,"Lvl 7 Great Pyramid (499,499) OPEN",,,"Lvl 6 Digging Stronghold (587,499) OPEN",,,"Lvl 5 Digging Stronghold (662,499) OPEN",,,"Lvl 4 Digging Stronghold (737,499) OPEN",,,"Lvl 3 Digging Stronghold (812,499) OPEN",,,"Lvl 2 Digging Stronghold (887,499) OPEN",,,"Lvl 1 Digging Stronghold (969,499) OPEN"
N,,,"Lvl 1 Village (74,449) OPEN",,,"Lvl 2 Altar (149,449) OPEN",,,"Lvl 3 Town (224,449) OPEN",,,"Lvl 4 Temple of the Sun (299,449) OPEN",,,"Lvl 5 Ancient Tombs (374,449) OPEN",,,"Lvl 6 Square of Judgment (Research) (449,449) OPEN",,,"Lvl 6 Square of Judgment (Training) (549,449) OPEN",,,"Lvl 5 Ancient Tombs (624,449) OPEN",,,"Lvl 4 Temple of the Sun (699,449) OPEN",,,"Lvl 3 Town (774,449) OPEN",,,"Lvl 2 Altar (849,449) OPEN",,,"Lvl 1 Village (924,449) OPEN",
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
O,"Lvl 1 Digging Stronghold (29,412) OPEN",,,"Lvl 2 Digging Stronghold (112,412) OPEN",,,"Lvl 3 Digging Stronghold (187,412) OPEN",,,"Lvl 4 Digging Stronghold (262,412) OPEN",,,"Lvl 5 Digging Stronghold (337,412) OPEN",,,"Lvl 6 Digging Stronghold (412,412) OPEN",,,"Lvl 6 Digging Stronghold (499,412) OPEN",,,"Lvl 6 Digging Stronghold (587,412) OPEN",,,"Lvl 5 Digging Stronghold (662,412) OPEN",,,"Lvl 4 Digging Stronghold (737,412) OPEN",,,"Lvl 3 Digging Stronghold (812,412) OPEN",,,"Lvl 2 Digging Stronghold (887,412) OPEN",,,"Lvl 1 Digging Stronghold (969,412) OPEN"
P,,,"Lvl 1 Village (74,374) OPEN",,,"Lvl 2 Altar (149,374) OPEN",,,"Lvl 3 Town (224,374) OPEN",,,"Lvl 4 Temple of the Sun (299,374) OPEN",,,"Lvl 5 Trade Post (374,374) OPEN",,,"Lvl 5 Ancient Tombs (449,374) OPEN",,,"Lvl 5 Ancient Tombs (549,374) OPEN",,,"Lvl 5 Trade Post (624,374) OPEN",,,"Lvl 4 Temple of the Sun (699,374) OPEN",,,"Lvl 3 Town (774,374) OPEN",,,"Lvl 2 Altar (849,374) OPEN",,,"Lvl 1 Village (924,374) OPEN",
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
Q,"Lvl 1 Digging Stronghold (29,336) OPEN",,,"Lvl 2 Digging Stronghold (112,336) OPEN",,,"Lvl 3 Digging Stronghold (187,336) OPEN",,,"Lvl 4 Digging Stronghold (262,336) OPEN",,,"Lvl 5 Digging Stronghold (337,336) OPEN",,,"Lvl 5 Digging Stronghold (412,336) OPEN",,,"Lvl 5 Digging Stronghold (499,336) OPEN",,,"Lvl 5 Digging Stronghold (587,336) OPEN",,,"Lvl 5 Digging Stronghold (662,336) OPEN",,,"Lvl 4 Digging Stronghold (737,336) OPEN",,,"Lvl 3 Digging Stronghold (812,336) OPEN",,,"Lvl 2 Digging Stronghold (887,336) OPEN",,,"Lvl 1 Digging Stronghold (969,336) OPEN"
R,,,"Lvl 1 Village (74,299) OPEN",,,"Lvl 2 Altar (149,299) OPEN",,,"Lvl 3 Town (224,299) OPEN",,,"Lvl 4 Trade Post (299,299) OPEN",,,"Lvl 4 Temple of the Sun (374,299) OPEN",,,"Lvl 4 Temple of the Sun (449,299) OPEN",,,"Lvl 4 Temple of the Sun (549,299) OPEN",,,"Lvl 4 Temple of the Sun (624,299) OPEN",,,"Lvl 4 Trade Post (699,299) OPEN",,,"Lvl 3 Town (774,299) OPEN",,,"Lvl 2 Altar (849,299) OPEN",,,"Lvl 1 Village (924,299) OPEN",
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
S,"Lvl 1 Digging Stronghold (29,261) OPEN",,,"Lvl 2 Digging Stronghold (112,261) OPEN",,,"Lvl 3 Digging Stronghold (187,261) OPEN",,,"Lvl 4 Digging Stronghold (262,261) OPEN",,,"Lvl 4 Digging Stronghold (337,261) OPEN",,,"Lvl 4 Digging Stronghold (412,261) OPEN",,,"Lvl 4 Digging Stronghold (499,261) OPEN",,,"Lvl 4 Digging Stronghold (587,261) OPEN",,,"Lvl 4 Digging Stronghold (662,261) OPEN",,,"Lvl 4 Digging Stronghold (737,261) OPEN",,,"Lvl 3 Digging Stronghold (812,261) OPEN",,,"Lvl 2 Digging Stronghold (887,261) OPEN",,,"Lvl 1 Digging Stronghold (969,261) OPEN"
T,,,"Lvl 1 Village (74,224) OPEN",,,"Lvl 2 Altar (149,224) OPEN",,,"Lvl 3 Trade Post (224,224) OPEN",,,"Lvl 3 Town (299,224) OPEN",,,"Lvl 3 Town (374,224) OPEN",,,"Lvl 3 Town (449,224) OPEN",,,"Lvl 3 Town (549,224) OPEN",,,"Lvl 3 Town (624,224) OPEN",,,"Lvl 3 Town (699,224) OPEN",,,"Lvl 3 Trade Post (774,224) OPEN",,,"Lvl 2 Altar (849,224) OPEN",,,"Lvl 1 Vilalge (924,224) OPEN",
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
U,"Lvl 1 Digging Stronghold (29,186) OPEN",,,"Lvl 2 Digging Stronghold (112,186) OPEN",,,"Lvl 3 Digging Stronghold (187,186) OPEN",,,"Lvl 3 Digging Stronghold (262,186) OPEN",,,"Lvl 3 Digging Stronghold (337,186) OPEN",,,"Lvl 3 Digging Stronghold (412,186) OPEN",,,"Lvl 3 Digging Stronghold (499,186) OPEN",,,"Lvl 3 Digging Stronghold (587,186) OPEN",,,"Lvl 3 Digging Stronghold (662,186) OPEN",,,"Lvl 3 Digging Stronghold (737,186) OPEN",,,"Lvl 3 Digging Stronghold (812,186) OPEN",,,"Lvl 2 Digging Stronghold (887,186) OPEN",,,"Lvl 1 Digging Stronghold (969,186) OPEN"
V,,,"Lvl 1 VIllage (74,149) OPEN",,,"Lvl 2 Trade Post (149,149) OPEN",,,"Lvl 2 Altar (224,149) OPEN",,,"Lvl 2 Altar (299,149) OPEN",,,"Lvl 2 Altar (374,149) OPEN",,,"Lvl 2 Altar (449,149) OPEN",,,"Lvl 2 Altar (549,149) OPEN",,,"Lvl 2 Altar (624,149) OPEN",,,"Lvl 2 Altar (699,149) OPEN",,,"Lvl 2 Altar (774,149) OPEN",,,"Lvl 2 Trade Post (849,149) OPEN",,,"Lvl 1 Village (924,149) OPEN",
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
W,"Lvl 1 Digging Stronghold (29,112) OPEN",,,"Lvl 2 Digging Stronghold (112,112) OPEN",,,"Lvl 2 Digging Stronghold (187,112) OPEN",,,"Lvl 2 Digging Stronghold (262,112) OPEN",,,"Lvl 2 Digging Stronghold (337,112) OPEN",,,"Lvl 2 Digging Stronghold (412,112) OPEN",,,"Lvl 2 Digging Stronghold (499,112) OPEN",,,"Lvl 2 Digging Stronghold (587,112) OPEN",,,"Lvl 2 Digging Stronghold (662,112) OPEN",,,"Lvl 2 Digging Stronghold (737,112) OPEN",,,"Lvl 2 Digging Stronghold (812,112) OPEN",,,"Lvl 2 Digging Stronghold (887,112) OPEN",,,"Lvl 1 Digging Stronghold (969,112) OPEN"
X,,,"Lvl 1 Trade Post (74,74) OPEN",,,"Lvl 1 Village (149,74) OPEN",,,"Lvl 1 Village (224,74) OPEN",,,"Lvl 1 Village (299,74) OPEN",,,"Lvl 1 Village (374,74) OPEN",,,"Lvl 1 Village (449,74) OPEN",,,"Lvl 1 Village (549,74) OPEN",,,"Lvl 1 Village (624,74) OPEN",,,"Lvl 1 Village (699,74) OPEN",,,"Lvl 1 Village (774,74) OPEN",,,"Lvl 1 Village (849,74) OPEN",,,"Lvl 1 Trade Post (924,74) OPEN",
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
Y,"Lvl 1 Digging Stronghold (29,29) OPEN",,,"Lvl 1 Digging Stronghold (112,29) OPEN",,,"Lvl 1 Digging Stronghold (187,29) OPEN",,,"Lvl 1 Digging Stronghold (262,29) OPEN",,,"Lvl 1 Digging Stronghold (337,29) OPEN",,,"Lvl 1 Digging Stronghold (412,29) OPEN",,,"Lvl 1 Digging Stronghold (499,29) OPEN",,,"Lvl 1 Digging Stronghold (587,29) OPEN",,,"Lvl 1 Digging Stronghold (662,29) OPEN",,,"Lvl 1 Digging Stronghold (737,29) OPEN",,,"Lvl 1 Digging Stronghold (812,29) OPEN",,,"Lvl 1 Digging Stronghold (887,29) OPEN",,,"Lvl 1 Digging Stronghold (969,29) OPEN"
`.trim();

    const alliances = [
        { id: 'alliance1', name: 'The First Order', color: 'rgba(255, 100, 100, 0.5)', borderColor: 'rgb(200, 50, 50)' },
        { id: 'alliance2', name: 'Blue Squadron', color: 'rgba(100, 100, 255, 0.5)', borderColor: 'rgb(50, 50, 200)' },
        { id: 'alliance3', name: 'Green Guardians', color: 'rgba(100, 255, 100, 0.5)', borderColor: 'rgb(50, 200, 50)' },
        { id: 'alliance4', name: 'Golden Empire', color: 'rgba(255, 215, 0, 0.5)', borderColor: 'rgb(204, 172, 0)' },
        { id: 'alliance5', name: 'Purple Haze', color: 'rgba(180, 100, 220, 0.5)', borderColor: 'rgb(120, 50, 160)' },
        // Add more alliances as needed: { id: 'uniqueID', name: 'Alliance Name', color: 'rgba(...)', borderColor: 'rgb(...)' },
    ];

    let selectedAllianceId = null;
    let cellAssignments = {}; // Stores { 'cell-rowIndex-colIndex': 'allianceId' }

    const allianceListElement = document.getElementById('alliance-list');
    const mapHeaderRowElement = document.getElementById('map-header-row');
    const mapBodyElement = document.getElementById('map-body');

    function parseCellContent(contentString) {
        if (!contentString || contentString.trim() === '') return null;
        
        const pattern = /Lvl (\d+)\s+(.*?)\s+\(([\d\s,]+)\)\s+(\w+)/;
        const match = contentString.match(pattern);

        if (match) {
            return {
                level: match[1],
                type: match[2].trim(), // Ensure type is trimmed
                coords: match[3].trim(),
                status: match[4]
            };
        }
        // Fallback for content that doesn't match the Lvl pattern
        // e.g. if a cell just contains "Empty" or some other note.
        // For now, if it's not strictly empty but doesn't match, we'll show it as raw text.
        // You might want to handle this differently.
        console.warn("Unparsed cell content:", contentString);
        return { type: contentString, level: '', coords: '', status: '' };
    }

    function renderAlliances() {
        allianceListElement.innerHTML = '';
        alliances.forEach(alliance => {
            const li = document.createElement('li');
            li.textContent = alliance.name;
            li.dataset.allianceId = alliance.id;
            
            // Subtle background for unselected items, more pronounced for selected
            li.style.backgroundColor = alliance.id === selectedAllianceId ? alliance.color.replace(/0\.\d+/, '0.3') : alliance.color.replace(/0\.\d+/, '0.1');
            li.style.borderColor = alliance.id === selectedAllianceId ? alliance.borderColor : '#ddd';
            li.style.borderLeftWidth = '5px';
            li.style.borderLeftColor = alliance.id === selectedAllianceId ? alliance.borderColor : 'transparent';


            if (alliance.id === selectedAllianceId) {
                li.classList.add('selected');
            }

            li.addEventListener('click', () => {
                selectedAllianceId = alliance.id;
                renderAlliances(); // Re-render to update selection style
            });
            allianceListElement.appendChild(li);
        });
    }

    function renderMap() {
        mapHeaderRowElement.innerHTML = '';
        mapBodyElement.innerHTML = '';

        const rows = csvData.split('\n');
        const headerCells = rows[0].split(',');

        // Create header row (empty first cell for row letters)
        const thCorner = document.createElement('th');
        mapHeaderRowElement.appendChild(thCorner); 
        
        let actualHeaderIndex = 0;
        for(let i = 1; i < headerCells.length; i++) { // Start from 1 to skip first empty col header
            if (headerCells[i].trim() !== '') { // Only add non-empty headers
                const th = document.createElement('th');
                th.textContent = headerCells[i];
                mapHeaderRowElement.appendChild(th);
                actualHeaderIndex++;
            }
        }
        const numberOfDisplayColumns = actualHeaderIndex;


        rows.slice(1).forEach((rowString, rowIndex) => { // rowIndex is 0-based for data rows
            if (rowString.trim() === '' || /^(,+)$/.test(rowString.trim())) return; // Skip empty/separator lines

            const tr = document.createElement('tr');
            // More robust CSV cell splitting:
            // This regex handles quoted cells that may contain commas.
            // It splits by comma, but not if the comma is inside quotes.
            const csvCellsInRow = [];
            let currentCell = '';
            let inQuotes = false;
            for (let char of rowString) {
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    csvCellsInRow.push(currentCell);
                    currentCell = '';
                } else {
                    currentCell += char;
                }
            }
            csvCellsInRow.push(currentCell); // Add the last cell

            // First cell is the row letter
            const rowLetterTd = document.createElement('td');
            rowLetterTd.textContent = csvCellsInRow[0].replace(/^"/, '').replace(/"$/, '').trim(); // Clean quotes
            tr.appendChild(rowLetterTd);
            
            let displayColIndex = 0; // For unique cell IDs and data attributes
            // Iterate through expected data columns based on header
            for (let csvDataCol = 1; csvDataCol < csvCellsInRow.length; csvDataCol +=2 ) { // Data is in 1, 3, 5...
                 if (displayColIndex >= numberOfDisplayColumns) break; // Don't create more cells than headers

                const td = document.createElement('td');
                const cellId = `cell-${rowIndex}-${displayColIndex}`;
                td.id = cellId;
                td.dataset.rowIndex = rowIndex;
                td.dataset.colIndex = displayColIndex;

                let cellContentString = csvCellsInRow[csvDataCol] ? csvCellsInRow[csvDataCol].replace(/^"/, '').replace(/"$/, '').trim() : "";

                if (cellContentString) {
                    const parsedContent = parseCellContent(cellContentString);
                    if (parsedContent) {
                        td.innerHTML = `
                            <div class="map-cell-content">
                                <span class="cell-level-type">${parsedContent.level ? 'Lvl ' + parsedContent.level : ''} ${parsedContent.type}</span>
                                <span class="cell-coords">${parsedContent.coords ? '('+parsedContent.coords+')' : ''}</span>
                                <span class="cell-status">${parsedContent.status}</span>
                            </div>
                        `;
                    } else {
                        // If parseCellContent returns null (truly empty) or minimal object
                        td.innerHTML = `<div class="map-cell-content"><span>${cellContentString}</span></div>`;
                    }
                    td.addEventListener('click', handleCellClick);
                } else {
                    td.classList.add('empty-cell'); // CSV cell was empty or just quotes
                     // Make empty cells clickable too if you want to assign them
                    td.addEventListener('click', handleCellClick);
                }
                tr.appendChild(td);
                displayColIndex++;

                // Add spacer cell if there's another column in CSV and we're not at the end
                if (csvDataCol + 1 < csvCellsInRow.length && displayColIndex < numberOfDisplayColumns) {
                    const spacerTd = document.createElement('td');
                    spacerTd.classList.add('empty-cell'); // This is a visual spacer
                    tr.appendChild(spacerTd);
                }
            }
            mapBodyElement.appendChild(tr);
        });
        updateMapColors(); // Apply initial colors (e.g., if loaded from localStorage)
    }

    function handleCellClick(event) {
        if (!selectedAllianceId) {
            alert("Please select an alliance first!");
            return;
        }

        const cell = event.currentTarget;
        const cellId = cell.id;

        // If cell is an empty-cell placeholder and not intended to be claimable, do nothing.
        // However, the current logic attaches click handlers to all td with an ID.
        // If you want to differentiate, check for a specific class or lack of content.
        // For now, all cells with an ID are claimable.

        if (cellAssignments[cellId] === selectedAllianceId) {
            delete cellAssignments[cellId]; // Unassign if already belongs to current alliance
        } else {
            cellAssignments[cellId] = selectedAllianceId; // Assign/reassign
        }
        updateMapColors();
        // Optional: Save to localStorage
        // localStorage.setItem('s3planAssignments', JSON.stringify(cellAssignments));
    }

    function updateMapColors() {
        const allMapCells = mapBodyElement.querySelectorAll('td[id^="cell-"]');
        allMapCells.forEach(cell => {
            const cellId = cell.id;
            const assignedAllianceId = cellAssignments[cellId];

            if (assignedAllianceId) {
                const alliance = alliances.find(a => a.id === assignedAllianceId);
                if (alliance) {
                    cell.style.backgroundColor = alliance.color;
                    cell.style.border = `2px solid ${alliance.borderColor}`;
                }
            } else {
                // Reset to default styles (as defined in CSS)
                cell.style.backgroundColor = ''; // Let CSS handle default
                cell.style.border = ''; // Let CSS handle default
                // Ensure empty-cell class styling is not overridden if it's an empty structural cell
                if (cell.classList.contains('empty-cell') && !cell.querySelector('.map-cell-content')) {
                     cell.style.backgroundColor = '#f5f5f5'; // From s3plan_styles.css
                     cell.style.border = '1px solid #ccc'; // From s3plan_styles.css
                } else if (cell.querySelector('.map-cell-content') || cell.classList.contains('empty-cell')) {
                    // It's a content cell or a clickable empty cell, reset to default content cell style
                     cell.style.backgroundColor = '#fff'; // From s3plan_styles.css for td
                     cell.style.border = '1px solid #ccc'; // From s3plan_styles.css for td
                }
            }
        });
    }
    
    // Optional: Load from localStorage
    // function loadAssignments() {
    //    const saved = localStorage.getItem('s3planAssignments');
    //    if (saved) {
    //        cellAssignments = JSON.parse(saved);
    //    }
    // }

    // Initial Setup
    // loadAssignments(); // Optional: load saved state
    renderAlliances();
    renderMap();
});
