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

    let alliances = [
        { id: 'alliance1', name: 'The First Order', color: 'rgba(255, 100, 100, 0.5)', borderColor: 'rgb(200, 50, 50)' },
        { id: 'alliance2', name: 'Blue Squadron', color: 'rgba(100, 100, 255, 0.5)', borderColor: 'rgb(50, 50, 200)' },
        { id: 'alliance3', name: 'Green Guardians', color: 'rgba(100, 255, 100, 0.5)', borderColor: 'rgb(50, 200, 50)' },
    ];
    let nextAllianceId = alliances.length + 1;

    let selectedAllianceId = null;
    let cellAssignments = {}; // Stores { 'cell-rowIndex-colIndex': 'allianceId' }

    const allianceListElement = document.getElementById('alliance-list');
    const mapHeaderRowElement = document.getElementById('map-header-row');
    const mapBodyElement = document.getElementById('map-body');
    const addAllianceButton = document.getElementById('add-alliance-btn');

    function parseCellContent(contentString) {
        if (!contentString || contentString.trim() === '') return null;
        
        const pattern = /Lvl (\d+)\s+(.*?)\s+\(([\d\s,]+)\)\s+(\w+)/;
        const match = contentString.match(pattern);

        if (match) {
            return {
                level: match[1],
                type: match[2].trim(),
                coords: match[3].trim(),
                status: match[4]
            };
        }
        console.warn("Unparsed cell content:", contentString);
        return { type: contentString, level: '', coords: '', status: '' };
    }

    function renderAlliances() {
        allianceListElement.innerHTML = '';
        alliances.forEach((alliance, index) => {
            const li = document.createElement('li');
            // Inline styles for flex behavior, can be moved to CSS for #alliance-list li if preferred
            li.style.display = 'flex'; 
            li.style.justifyContent = 'space-between';
            li.style.alignItems = 'center';
            // CSS classes will handle most of the styling below, but some dynamic parts here
            // li.className = 'alliance-list-item'; // Add a class for base styling

            const nameSpan = document.createElement('span');
            nameSpan.textContent = alliance.name;
            nameSpan.className = 'alliance-name-span'; // Class for styling
            nameSpan.title = "Click to select, double click to edit name";
            nameSpan.style.flexGrow = '1'; // Allow name to take up space

            nameSpan.addEventListener('click', () => {
                selectedAllianceId = alliance.id;
                renderAlliances(); // Re-render to update selection style in list
                // updateMapColors(); // Map colors are updated when a cell is clicked, or initially
            });

            nameSpan.addEventListener('dblclick', () => {
                const newName = prompt("Enter new name for '" + alliance.name + "':", alliance.name);
                if (newName && newName.trim() !== "") {
                    alliances[index].name = newName.trim();
                    renderAlliances();
                    saveAlliancesToLocalStorage();
                }
            });
            
            li.appendChild(nameSpan);

            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'alliance-controls'; // Class for styling

            const colorInput = document.createElement('input');
            colorInput.type = 'color';
            colorInput.value = rgbToHex(alliance.borderColor); 
            colorInput.title = "Edit alliance color";
            colorInput.className = 'alliance-color-picker'; // Class for styling
            colorInput.addEventListener('input', (e) => {
                const newHexColor = e.target.value;
                alliances[index].color = hexToRgba(newHexColor, 0.5);
                alliances[index].borderColor = hexToRgba(newHexColor, 1).replace('rgba', 'rgb').replace(',1)', ')');
                renderAlliances();
                updateMapColors(); // Update map cells with new color
                saveAlliancesToLocalStorage();
            });
            controlsDiv.appendChild(colorInput);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'X';
            deleteBtn.title = "Delete alliance";
            deleteBtn.className = 'alliance-delete-btn'; // Class for styling
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent li click event
                if (confirm(`Are you sure you want to delete alliance "${alliance.name}"? This will unassign its cells.`)) {
                    alliances.splice(index, 1);
                    for (const cellId in cellAssignments) {
                        if (cellAssignments[cellId] === alliance.id) {
                            delete cellAssignments[cellId];
                        }
                    }
                    if (selectedAllianceId === alliance.id) {
                        selectedAllianceId = null;
                    }
                    renderAlliances();
                    updateMapColors();
                    saveAlliancesToLocalStorage();
                    saveAssignmentsToLocalStorage();
                }
            });
            controlsDiv.appendChild(deleteBtn);
            
            li.appendChild(controlsDiv);

            // Apply dynamic styles based on selection and alliance color
            const baseColorAlpha = alliance.id === selectedAllianceId ? '0.4' : '0.15'; // Slightly more pronounced selection
            li.style.backgroundColor = alliance.color.replace(/0\.\d+/, baseColorAlpha);
            li.style.borderColor = alliance.borderColor; // Use alliance border color always for consistency
            li.style.borderWidth = '1px';
            li.style.borderStyle = 'solid';
            li.style.borderRadius = '5px'; // Consistent with s3plan_styles.css
            li.style.padding = '10px 12px'; // Consistent with s3plan_styles.css

            if (alliance.id === selectedAllianceId) {
                li.classList.add('selected'); // For CSS : .selected { box-shadow: ...; }
                li.style.borderLeftColor = alliance.borderColor; // Prominent left border
                li.style.borderLeftWidth = '5px';
            } else {
                li.style.borderLeftColor = alliance.borderColor; // Still use alliance color but less prominent
                li.style.borderLeftWidth = '1px'; // Or make it thicker but same as others
            }
            
            allianceListElement.appendChild(li);
        });
    }

    if (addAllianceButton) {
        addAllianceButton.addEventListener('click', () => {
            const newName = prompt("Enter name for the new alliance:", `Alliance ${nextAllianceId}`);
            if (newName && newName.trim() !== "") {
                const r = Math.floor(Math.random() * 200) + 20; // Avoid very dark colors
                const g = Math.floor(Math.random() * 200) + 20;
                const b = Math.floor(Math.random() * 200) + 20;
                const newAlliance = {
                    id: `alliance${Date.now()}-${nextAllianceId}`, // More unique ID
                    name: newName.trim(),
                    color: `rgba(${r},${g},${b},0.5)`,
                    borderColor: `rgb(${r},${g},${b})`
                };
                alliances.push(newAlliance);
                nextAllianceId++;
                renderAlliances();
                saveAlliancesToLocalStorage();
            }
        });
    }


    function rgbToHex(rgbString) {
        if (!rgbString || typeof rgbString !== 'string') return '#FFFFFF';
        const match = rgbString.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
        if (!match) return '#FFFFFF'; // Default white if parse fails
        return "#" + ((1 << 24) + (parseInt(match[1]) << 16) + (parseInt(match[2]) << 8) + parseInt(match[3])).toString(16).slice(1).toUpperCase();
    }

    function hexToRgba(hex, alpha = 1) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    function saveAlliancesToLocalStorage() {
        localStorage.setItem('s3planAlliances', JSON.stringify(alliances));
    }

    function loadAlliancesFromLocalStorage() {
        const saved = localStorage.getItem('s3planAlliances');
        if (saved) {
            alliances = JSON.parse(saved);
            const maxIdNum = alliances.reduce((max, a) => {
                const idNumMatch = a.id.match(/-(\d+)$/); // Match trailing number after hyphen
                const idNum = idNumMatch ? parseInt(idNumMatch[1]) : 0;
                return idNum > max ? idNum : max;
            }, 0);
            nextAllianceId = maxIdNum + 1;
        }
    }

    function saveAssignmentsToLocalStorage() {
        localStorage.setItem('s3planAssignments', JSON.stringify(cellAssignments));
    }

    function loadAssignmentsFromLocalStorage() {
        const saved = localStorage.getItem('s3planAssignments');
        if (saved) {
            cellAssignments = JSON.parse(saved);
        }
    }

    function renderMap() {
        mapHeaderRowElement.innerHTML = '';
        mapBodyElement.innerHTML = '';

        const rows = csvData.split('\n');
        const headerCellsCSV = rows[0].split(',');

        const thCorner = document.createElement('th');
        mapHeaderRowElement.appendChild(thCorner); 
        
        let actualHeaderCount = 0;
        for(let i = 1; i < headerCellsCSV.length; i++) {
            if (headerCellsCSV[i].trim() !== '') {
                const th = document.createElement('th');
                th.textContent = headerCellsCSV[i];
                mapHeaderRowElement.appendChild(th);
                actualHeaderCount++;
            }
        }
        
        rows.slice(1).forEach((rowString, rowIndex) => {
            if (rowString.trim() === '' || /^(,+)$/.test(rowString.trim())) return;

            const tr = document.createElement('tr');
            const csvCellsInRow = [];
            let currentCell = '';
            let inQuotes = false;
            for (let char of rowString) {
                if (char === '"' && (currentCell === '' || currentCell.slice(-1) !== '\\')) { // Handle escaped quotes if needed
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    csvCellsInRow.push(currentCell);
                    currentCell = '';
                } else {
                    currentCell += char;
                }
            }
            csvCellsInRow.push(currentCell);

            const rowLetterTd = document.createElement('td');
            rowLetterTd.textContent = csvCellsInRow[0].replace(/^"/, '').replace(/"$/, '').trim();
            tr.appendChild(rowLetterTd);
            
            let displayColIndex = 0; 
            for (let csvDataCol = 1; csvDataCol < csvCellsInRow.length; csvDataCol +=2 ) {
                 if (displayColIndex >= actualHeaderCount) break; 

                const td = document.createElement('td');
                const cellId = `cell-${rowIndex}-${displayColIndex}`;
                td.id = cellId;
                // td.dataset.rowIndex = rowIndex; // Not strictly needed if using ID
                // td.dataset.colIndex = displayColIndex;

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
                        td.innerHTML = `<div class="map-cell-content"><span>${cellContentString}</span></div>`;
                    }
                    td.addEventListener('click', handleCellClick);
                } else {
                    td.classList.add('empty-cell'); // Cell from CSV was empty
                    td.innerHTML = `<div class="map-cell-content"></div>`; // Ensure structure for consistent styling
                    td.addEventListener('click', handleCellClick); // Make empty cells assignable
                }
                tr.appendChild(td);
                displayColIndex++;

                if (csvDataCol + 1 < csvCellsInRow.length && displayColIndex < actualHeaderCount) {
                    const spacerTd = document.createElement('td');
                    spacerTd.classList.add('empty-cell'); 
                    // spacerTd.innerHTML = `<div class="map-cell-content"></div>`; // No content for spacers
                    tr.appendChild(spacerTd);
                } else if (displayColIndex < actualHeaderCount && csvDataCol + 1 >= csvCellsInRow.length) {
                    // If CSV row ends but headers expect more columns (due to uneven spacer rendering)
                    // This case should ideally not happen if CSV structure is consistent with headers
                    const spacerTd = document.createElement('td');
                    spacerTd.classList.add('empty-cell');
                    tr.appendChild(spacerTd);
                }
            }
            mapBodyElement.appendChild(tr);
        });
        updateMapColors();
    }

    function handleCellClick(event) {
        if (!selectedAllianceId) {
            alert("Please select an alliance first!");
            return;
        }
        const cell = event.currentTarget;
        const cellId = cell.id;

        if (!cellId) return; // Should not happen if IDs are assigned

        if (cellAssignments[cellId] === selectedAllianceId) {
            delete cellAssignments[cellId]; 
        } else {
            cellAssignments[cellId] = selectedAllianceId; 
        }
        updateMapColors();
        saveAssignmentsToLocalStorage();
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
                    cell.style.border = `2px solid ${alliance.borderColor}`; // Make border more prominent for assigned
                } else { // Alliance might have been deleted
                    delete cellAssignments[cellId]; // Clean up assignment
                    cell.style.backgroundColor = ''; 
                    cell.style.border = ''; 
                }
            } else {
                // Reset to default styles (let CSS handle this)
                cell.style.backgroundColor = ''; 
                cell.style.border = ''; 
                // If it's an empty structural cell that isn't supposed to be colored
                // and has a specific .empty-cell style, this reset might need adjustment
                // or ensure your CSS for .empty-cell is specific enough.
            }
        });
    }

    // Initial Setup
    loadAlliancesFromLocalStorage();
    loadAssignmentsFromLocalStorage();
    renderAlliances();
    renderMap();
});
