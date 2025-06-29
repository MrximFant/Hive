// Global variables
let panStartCoords = { x: 0, y: 0 };
let wasDragging = false;
const PAN_THRESHOLD = 5; 
let mapData = [];
let tileDataMap = {};
let alliances = {};
let activeAllianceId = null;
let nextAllianceId = 0;
const vibrantColors = ["#E6194B", "#3CB44B", "#FFE119", "#4363D8", "#F58231", "#911EB4", "#46F0F0", "#F032E6", "#BCF60C", "#FABEBE", "#008080", "#E6BEFF", "#9A6324", "#FFFAC8", "#800000", "#AAFFC3"];
const dom = { mainContainer: document.getElementById("main-container"), mapGrid: document.getElementById("map-grid"), allianceList: document.getElementById("alliance-list"), addAllianceBtn: document.getElementById("add-alliance-btn"), allianceNameInput: document.getElementById("alliance-name-input"), allianceColorInput: document.getElementById("alliance-color-input"), exportBtn: document.getElementById("export-btn"), importBtn: document.getElementById("import-btn"), importFileInput: document.getElementById("import-file-input"), mapContainer: document.getElementById("map-container"), sidebarToggleBtn: document.getElementById('sidebar-toggle-btn') };

// --- DATA PROCESSING FUNCTIONS ---
function buildTileDataMap(data) { const map = {}; for (const id in data) { const territory = data[id]; for (const tileId of territory.tiles) { map[tileId] = territory.name; } } return map; }
function parseTileInfo(dataString) { if (!dataString) dataString = "Land / None"; const parts = dataString.split(' / '); const infoPart = parts[0]; let type = infoPart.trim(); let level = 0; const levelMatch = infoPart.match(/(.+) Lvl (\d+)/); if (levelMatch) { type = levelMatch[1].trim(); level = parseInt(levelMatch[2], 10); } return { type, level, buff: dataString }; }
function parseBuff(buffString) { if (!buffString) return { type: 'None', value: 0 }; const parts = buffString.split(' / '); if (parts.length < 2) return { type: 'None', value: 0 }; const buffPart = parts[1]; const match = buffPart.match(/([\d.,]+)%\s*(.*)/); if (!match) return { type: 'None', value: 0 }; try { const value = parseFloat(match[1].replace(',', '.')); const type = match[2].trim(); if (isNaN(value) || !type) return { type: 'None', value: 0 }; return { type, value }; } catch (e) { return { type: 'None', value: 0 }; } }
function createMapData() {
    const data = []; let tileIdCounter = 0;
    for (let y = 0; y < 13; y++) { for (let x = 0; x < 13; x++) { const dataString = tileDataMap[tileIdCounter] || 'Land / None 0%'; const tileInfo = parseTileInfo(dataString); data.push({ id: tileIdCounter++, kind: 'big', x, y, type: tileInfo.type, level: tileInfo.level, buff: tileInfo.buff }); } }
    for (let y = 0; y < 12; y++) { for (let x = 0; x < 12; x++) { const dataString = tileDataMap[tileIdCounter] || 'Node / None 0%'; const tileInfo = parseTileInfo(dataString); data.push({ id: tileIdCounter++, kind: 'small', x, y, type: tileInfo.type, level: tileInfo.level, buff: tileInfo.buff }); } }
    return data;
}

// --- UI RENDERING FUNCTIONS ---
function generateMap() {
    dom.mapGrid.innerHTML = '';
    const GRID_SIZE = 13;
    const gridLineContainer = document.createElement('div');
    gridLineContainer.className = 'grid-line-container';
    for (let i = 1; i < GRID_SIZE; i++) {
        const hLine = document.createElement('div'); hLine.className = 'grid-line'; hLine.style.width = '100%'; hLine.style.height = '1px'; hLine.style.top = `calc(${i} / ${GRID_SIZE} * 100% - 0.5px)`; gridLineContainer.appendChild(hLine);
        const vLine = document.createElement('div'); vLine.className = 'grid-line'; vLine.style.height = '100%'; vLine.style.width = '1px'; vLine.style.left = `calc(${i} / ${GRID_SIZE} * 100% - 0.5px)`; gridLineContainer.appendChild(vLine);
    }
    dom.mapGrid.appendChild(gridLineContainer);
    mapData.forEach(tile => {
        const cell = document.createElement('div');
        cell.className = `grid-cell ${tile.kind}-territory`; cell.dataset.tileId = tile.id;
        const size = 100 / GRID_SIZE;
        if (tile.kind === 'big') { cell.style.width = `${size}%`; cell.style.height = `${size}%`; cell.style.left = `${tile.x * size}%`; cell.style.top = `${tile.y * size}%`; }
        else { const smallSize = size * 0.5; cell.style.width = `${smallSize}%`; cell.style.height = `${smallSize}%`; cell.style.left = `${(tile.x + 1) * size}%`; cell.style.top = `${(tile.y + 1) * size}%`; cell.style.transform = 'translate(-50%, -50%)'; }
        cell.addEventListener('click', () => handleCellClick(tile.id));
        cell.appendChild(createOverlay());
        cell.appendChild(createTooltip(tile));
        cell.appendChild(createTileLabel(tile));
        dom.mapGrid.appendChild(cell);
    });
}
function createOverlay() { const o = document.createElement('div'); o.className = 'grid-cell-overlay'; return o; }
function createTileLabel(tile) { const label = document.createElement('div'); label.className = 'tile-label'; const parsed = parseBuff(tile.buff); if (parsed.type !== 'None' && parsed.value > 0) { label.textContent = `+${parsed.value.toLocaleString()}%`; } return label; }
function createTooltip(tile) { const t = document.createElement('div'); t.className = 'tooltip'; let title = tile.level > 0 ? `${tile.type} (Lvl ${tile.level})` : tile.type; const parsed = parseBuff(tile.buff); let buffText = 'No Buff'; if (parsed.type !== 'None') { buffText = `+${parsed.value.toLocaleString()}% ${parsed.type}`; } t.innerHTML = `<strong>${title}</strong><br>${buffText}`; return t; }
function renderMap() {
    const tileOwners = {};
    for (const id in alliances) { alliances[id].tiles.forEach(tileId => { tileOwners[tileId] = alliances[id].color; }); }
    dom.mapGrid.querySelectorAll('.grid-cell').forEach(cell => { const tileId = cell.dataset.tileId; const overlay = cell.querySelector('.grid-cell-overlay'); if (overlay) { overlay.style.backgroundColor = tileOwners[tileId] || 'transparent'; } });
}
function renderAlliances() {
    dom.allianceList.innerHTML = '';
    Object.values(alliances).forEach(alliance => {
        const item = document.createElement('li');
        item.className = 'alliance-item';
        item.dataset.id = alliance.id;
        item.style.borderColor = alliance.color;
        if (alliance.id === activeAllianceId) item.classList.add('active');
        item.innerHTML = `
            <div class="alliance-header">
                <span class="alliance-name">${alliance.name}</span>
                <div class="alliance-buttons">
                    <button class="alliance-edit-btn" title="Edit Alliance">Edit</button>
                    <button class="alliance-delete-btn" title="Delete Alliance">×</button>
                </div>
            </div>
            <div class="alliance-buffs">
                <strong>Buff Summary:</strong>
                <ul class="buff-summary-list"></ul>
            </div>
            <form class="alliance-edit-form" onsubmit="event.preventDefault();">
                <div class="form-group"><label>Alliance Name:</label><input type="text" class="edit-name-input"></div>
                <div class="form-group"><label>Alliance Color:</label><input type="color" class="edit-color-input"></div>
                <div class="edit-form-buttons">
                    <button type="button" class="button save-edit-btn">Save</button>
                    <button type="button" class="button secondary cancel-edit-btn">Cancel</button>
                </div>
            </form>`;
        item.addEventListener('click', () => setActiveAlliance(alliance.id));
        item.querySelector('.alliance-edit-btn').addEventListener('click', (e) => { e.stopPropagation(); toggleEditMode(alliance.id); });
        item.querySelector('.alliance-delete-btn').addEventListener('click', (e) => { e.stopPropagation(); deleteAlliance(alliance.id); });
        item.querySelector('.save-edit-btn').addEventListener('click', (e) => { e.stopPropagation(); saveAllianceChanges(alliance.id); });
        item.querySelector('.cancel-edit-btn').addEventListener('click', (e) => { e.stopPropagation(); toggleEditMode(alliance.id); });
        item.querySelector('.alliance-edit-form').addEventListener('click', (e) => { e.stopPropagation(); });
        dom.allianceList.appendChild(item);
    });
    updateAllBuffs();
}

// --- STATE & LOGIC FUNCTIONS ---
function handleCellClick(territoryId) {  if (wasDragging) return; if (activeAllianceId === null) { alert('Please select an active alliance from the list on the left first!'); return; } const tileIsOwned = alliances[activeAllianceId].tiles.includes(Number(territoryId)); for (const id in alliances) { alliances[id].tiles = alliances[id].tiles.filter(tId => tId !== Number(territoryId)); } if (!tileIsOwned) { alliances[activeAllianceId].tiles.push(Number(territoryId)); } updateAllBuffs(); renderMap(); }
function addAlliance() { const name = dom.allianceNameInput.value.trim(); if (!name) return; const id = nextAllianceId++; alliances[id] = { id: id, name: name, color: dom.allianceColorInput.value, tiles: [] }; dom.allianceNameInput.value = ''; dom.allianceColorInput.value = vibrantColors[nextAllianceId % vibrantColors.length]; setActiveAlliance(id); }
function deleteAlliance(idToDelete) { if (!confirm(`Are you sure you want to delete the alliance "${alliances[idToDelete].name}"?`)) { return; } delete alliances[idToDelete]; if (activeAllianceId === idToDelete) { activeAllianceId = null; } renderAlliances(); renderMap(); }
function setActiveAlliance(id) { activeAllianceId = id; renderAlliances(); }
function toggleEditMode(id) { const item = document.querySelector(`.alliance-item[data-id='${id}']`); if (!item) return; item.classList.toggle('editing'); if (item.classList.contains('editing')) { item.querySelector('.edit-name-input').value = alliances[id].name; item.querySelector('.edit-color-input').value = alliances[id].color; } }
function saveAllianceChanges(id) { const item = document.querySelector(`.alliance-item[data-id='${id}']`); const newName = item.querySelector('.edit-name-input').value.trim(); const newColor = item.querySelector('.edit-color-input').value; if (newName) { alliances[id].name = newName; alliances[id].color = newColor; toggleEditMode(id); renderAlliances(); renderMap(); } else { alert("Alliance name cannot be empty."); } }
function calculateBuffsForAlliance(alliance) { const totalBuffs = {}; alliance.tiles.forEach(tileId => { const tileData = mapData.find(t => t.id == tileId); if (tileData && tileData.buff) { const parsed = parseBuff(tileData.buff); if (parsed.type !== 'None') { totalBuffs[parsed.type] = (totalBuffs[parsed.type] || 0) + parsed.value; } } }); return totalBuffs; }
function updateAllBuffs() { for (const id in alliances) { const alliance = alliances[id]; const buffs = calculateBuffsForAlliance(alliance); const buffListElem = document.querySelector(`.alliance-item[data-id='${id}'] .buff-summary-list`); if (buffListElem) { let html = ''; const sortedBuffs = Object.keys(buffs).sort(); html = sortedBuffs.length === 0 ? '<li>No buffs yet.</li>' : sortedBuffs.map(type => `<li><span class="buff-type">${type}:</span> <span class="buff-value">+${buffs[type].toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%</span></li>`).join(''); buffListElem.innerHTML = html; } } }
function exportState() { if (Object.keys(alliances).length === 0) { alert("Nothing to export."); return; } const stateString = JSON.stringify(alliances, null, 2); const blob = new Blob([stateString], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `golden-realm-plan-${new Date().toISOString().slice(0, 10)}.json`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url); }
function importState(event) { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = e => { if (!confirm('Importing a new file will overwrite your current plan. Are you sure?')) { event.target.value = ''; return; } try { const data = JSON.parse(e.target.result); if (typeof data !== 'object' || data === null || Array.isArray(data)) throw new Error("Invalid format."); alliances = {}; Object.values(data).forEach(ally => { alliances[ally.id] = { ...ally, tiles: ally.tiles.map(Number) }; }); nextAllianceId = Math.max(-1, ...Object.keys(alliances).map(Number)) + 1; activeAllianceId = null; renderAlliances(); renderMap(); alert('Plan loaded!'); } catch (err) { alert('Failed to load file.\n' + err.message); } }; reader.readAsText(file); event.target.value = ''; }
function toggleSidebar() { dom.mainContainer.classList.toggle('sidebar-collapsed'); }

// --- INITIALIZATION ---
async function init() {
    try {
        const response = await fetch('map_data.json');
        if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
        const providedData = await response.json();
        tileDataMap = buildTileDataMap(providedData);
        mapData = createMapData();
        generateMap();
        dom.allianceColorInput.value = vibrantColors[0];

        // Smart Scaling Logic (this part is the same)
        const wrapperRect = dom.mapContainer.parentElement.getBoundingClientRect();
        const mapWidth = 900;
        const mapHeight = 900;
        const scaleX = wrapperRect.width / mapWidth;
        const scaleY = wrapperRect.height / mapHeight;
        const startScale = Math.min(scaleX, scaleY);
        const startX = (wrapperRect.width - (mapWidth * startScale)) / 2;
        const startY = (wrapperRect.height - (mapHeight * startScale)) / 2;

        const panzoom = Panzoom(dom.mapContainer, {
            maxScale: 30,
            minScale: 0.1,
            startScale: startScale,
            startX: startX,
            startY: startY,
        });

        // --- NEW DRAG-DETECTION LOGIC ---

        // When a pan starts, reset our state and record the start position.
        dom.mapContainer.addEventListener('panzoomstart', (e) => {
            wasDragging = false;
            panStartCoords = { x: e.detail.x, y: e.detail.y };
        });

        // As the user pans, check if they've moved past our threshold.
        dom.mapContainer.addEventListener('panzoompan', (e) => {
            const dx = Math.abs(e.detail.x - panStartCoords.x);
            const dy = Math.abs(e.detail.y - panStartCoords.y);
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > PAN_THRESHOLD) {
                wasDragging = true;
            }
        });

        // --- Standard Event Listeners (the rest are the same) ---
        dom.mapContainer.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);
        dom.addAllianceBtn.addEventListener('click', addAlliance);
        dom.exportBtn.addEventListener('click', exportState);
        dom.importBtn.addEventListener('click', () => dom.importFileInput.click());
        dom.importFileInput.addEventListener('change', importState);
        dom.sidebarToggleBtn.addEventListener('click', toggleSidebar);

    } catch (error) {
        console.error("Failed to initialize the planner:", error);
        alert("Error: Could not load map data. Please check the console for details.");
    }
}

// Make sure to call the function at the end
init();
