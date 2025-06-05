// assets/js/builder-logic.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("Builder page JavaScript loaded!");

    // --- CONFIGURATION ---
    const TILES_PER_MAP_X = 75;
    const TILES_PER_MAP_Y = 75;
    const NUM_MAPS_ACROSS = 3;
    const NUM_MAPS_DOWN = 3;
    const TOTAL_MAPS = NUM_MAPS_ACROSS * NUM_MAPS_DOWN;

    const SINGLE_MAP_COLS = TILES_PER_MAP_X;
    const SINGLE_MAP_ROWS = TILES_PER_MAP_Y;
    let currentTileSize = 10;
    const MAX_CUSTOM_ALLIANCES = 9; // Since you have 9 colored bases + 1 neutral

    const ALLIANCE_COLORS = ["blue", "brown", "green", "orange", "purple", "red", "white", "yellow", "black"];
    let availableColors = [...ALLIANCE_COLORS]; // Keep track of colors not yet assigned

    // --- DOM ELEMENTS ---
    const sidebarElement = document.getElementById('sidebar');
    const buildableItemsListContainer = document.getElementById('buildable-items-list');
    const mapsSuperContainer = document.getElementById('maps-super-container');
    const tileSizeSlider = document.getElementById('tile-size-slider');
    const tileSizeValueDisplay = document.getElementById('tile-size-value');
    const gridDimensionsDisplay = document.getElementById('grid-dimensions-display');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const newAllianceNameInput = document.getElementById('new-alliance-name'); // Keep if manual add is desired
    const addAllianceBtn = document.getElementById('add-alliance-btn'); // Keep if manual add is desired
    const allianceListUl = document.getElementById('alliance-list');
    const currentAllianceDisplay = document.getElementById('current-alliance-display');
    const distanceDisplay = document.getElementById('distance-display');

    // --- STATE ---
    let draggedItemData = null;
    let draggedPlacedItemData = null;
    let placedItems = [];
    let alliances = {}; // Object: { allianceName: "colorName", ... }
    let selectedAllianceName = "Neutral";
    let nextPlacedItemId = 0;
    let mapElements = [];
    let firstSelectedItemForDistance = null;

    // --- INITIALIZATION ---
    function init() {
        promptAndSetupAlliances();
        createMapContainers();
        setupBuildableItemDragListeners();
        addEventListeners();

        tileSizeSlider.value = currentTileSize;
        tileSizeValueDisplay.textContent = `${currentTileSize}px`;
        updateGridAppearance();
        currentAllianceDisplay.textContent = selectedAllianceName;
        distanceDisplay.textContent = "Distance: N/A";
    }

    // --- EVENT LISTENERS SETUP ---
    function addEventListeners() {
        tileSizeSlider.addEventListener('input', handleTileSizeChange);
        clearAllBtn.addEventListener('click', handleClearAll);

        if (addAllianceBtn && newAllianceNameInput) { // If manual add elements exist
            addAllianceBtn.addEventListener('click', handleAddAllianceManual);
            newAllianceNameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleAddAllianceManual();
            });
        }

        sidebarElement.addEventListener('dragover', handleSidebarDragOver);
        sidebarElement.addEventListener('dragleave', handleSidebarDragLeave);
        sidebarElement.addEventListener('drop', handleSidebarDrop);
    }

    // --- MAP/GRID FUNCTIONS ---
    function createMapContainers() {
        mapsSuperContainer.innerHTML = '';
        mapElements = [];
        mapsSuperContainer.style.setProperty('--num-maps-across', NUM_MAPS_ACROSS);
        mapsSuperContainer.style.setProperty('--num-maps-down', NUM_MAPS_DOWN);

        for (let i = 0; i < TOTAL_MAPS; i++) {
            const mapDiv = document.createElement('div');
            mapDiv.classList.add('individual-map-container');
            mapDiv.dataset.mapId = i;
            mapDiv.addEventListener('dragover', handleMapDragOver);
            mapDiv.addEventListener('drop', handleMapDrop);
            mapsSuperContainer.appendChild(mapDiv);
            mapElements.push(mapDiv);
        }
    }

    function updateGridAppearance() {
        mapElements.forEach(mapDiv => {
            mapDiv.style.width = `${SINGLE_MAP_COLS * currentTileSize}px`;
            mapDiv.style.height = `${SINGLE_MAP_ROWS * currentTileSize}px`;
            mapDiv.style.backgroundSize = `${currentTileSize}px ${currentTileSize}px`;
        });
        gridDimensionsDisplay.textContent = `${SINGLE_MAP_COLS}x${SINGLE_MAP_ROWS} (per map)`;
        placedItems.forEach(item => {
            if (item.element) {
                item.element.style.left = `${item.x * currentTileSize}px`;
                item.element.style.top = `${item.y * currentTileSize}px`;
                item.element.style.width = `${item.width * currentTileSize}px`;
                item.element.style.height = `${item.height * currentTileSize}px`;
            }
        });
    }

    // --- DRAGGABLE ITEMS FROM SIDEBAR ---
    function setupBuildableItemDragListeners() {
        const buildableItems = buildableItemsListContainer.querySelectorAll('.buildable-item');
        buildableItems.forEach(item => {
            item.addEventListener('dragstart', handleBuildableItemDragStart);
            item.addEventListener('dragend', handleBuildableItemDragEnd);
        });
    }

    function handleBuildableItemDragStart(event) {
        const target = event.currentTarget;
        const itemWidth = parseInt(target.dataset.width);
        const itemHeight = parseInt(target.dataset.height);

        if (isNaN(itemWidth) || isNaN(itemHeight)) {
            console.error("Buildable item missing valid data-width/height:", target.dataset.itemId);
            event.preventDefault(); return;
        }

        draggedItemData = {
            itemId: target.dataset.itemId || 'unknown',
            width: itemWidth,
            height: itemHeight,
            name: target.dataset.name || 'Unnamed Item',
            // For 'base', imageSrc is determined on drop. For others, it's from data-attribute.
            imageSrc: (target.dataset.itemId === 'base') ? null : target.dataset.imageSrc,
        };
        target.style.opacity = '0.5';
        event.dataTransfer.effectAllowed = 'copy';
    }

    function handleBuildableItemDragEnd(event) {
        event.currentTarget.style.opacity = '1';
        draggedItemData = null;
    }

    // --- ITEM PLACEMENT & MOVEMENT ON GRID ---
    function addPlacedItemToGrid(mapId, itemData, gridX, gridY, isMoving = false, existingItemToUpdate = null) {
        let currentItem;
        let itemElement;

        if (isMoving && existingItemToUpdate) {
            currentItem = existingItemToUpdate;
            itemElement = currentItem.element;
            const oldMapId = currentItem.mapId;
            currentItem.mapId = mapId;
            currentItem.x = gridX;
            currentItem.y = gridY;
            itemElement.style.left = `${gridX * currentTileSize}px`;
            itemElement.style.top = `${gridY * currentTileSize}px`;
            itemElement.style.opacity = '1';
            if (oldMapId !== mapId && mapElements[mapId]) {
                mapElements[mapId].appendChild(itemElement);
            }
        } else {
            const uniqueId = nextPlacedItemId++;
            let actualImageSrc = itemData.imageSrc; // From sidebar item
            let itemAllianceName = selectedAllianceName;

            if (itemData.itemId === 'base') {
                const colorForBase = alliances[itemAllianceName] || "neutral"; // Default to neutral if alliance not found
                actualImageSrc = `assets/images/base${colorForBase}.jpg`;
            }


            currentItem = {
                id: uniqueId, mapId: mapId, x: gridX, y: gridY,
                width: itemData.width, height: itemData.height,
                itemId: itemData.itemId, name: itemData.name,
                imageSrc: actualImageSrc, // Use the determined imageSrc
                allianceName: itemAllianceName,
                element: null
            };

            itemElement = document.createElement('div');
            itemElement.classList.add('placed-item-on-grid');
            // ... (set styles for position and size as before) ...
            itemElement.style.left = `${currentItem.x * currentTileSize}px`;
            itemElement.style.top = `${currentItem.y * currentTileSize}px`;
            itemElement.style.width = `${currentItem.width * currentTileSize}px`;
            itemElement.style.height = `${currentItem.height * currentTileSize}px`;
            itemElement.draggable = true;
            itemElement.dataset.placedId = uniqueId;

            const img = document.createElement('img');
            img.src = currentItem.imageSrc; // This is now specific, e.g., assets/images/baseblue.jpg
            img.alt = currentItem.name;
            img.onerror = function() { /* ... error handling as before ... */
                this.style.display = 'none';
                const parentDiv = this.parentNode;
                if (parentDiv) {
                    parentDiv.style.backgroundColor = 'lightcoral';
                    const errorText = document.createElement('span');
                    errorText.className = 'error-text-placeholder';
                    errorText.textContent = `Img Err: ${currentItem.name.substring(0,10)}`;
                    parentDiv.appendChild(errorText);
                }
                console.warn(`Image not loaded: ${this.src} for ${currentItem.name}`);
            };
            // No hue rotation needed anymore for base items
            itemElement.appendChild(img);

            const textOverlay = document.createElement('div');
            textOverlay.classList.add('placed-item-text-overlay');
            let overlayTextContent = `${currentItem.name}`;
            if (currentItem.allianceName && currentItem.allianceName !== "Neutral") {
                overlayTextContent += ` (${currentItem.allianceName})`;
            }
            textOverlay.textContent = overlayTextContent;
            itemElement.appendChild(textOverlay);

            itemElement.title = `Item: ${currentItem.name}\nAlliance: ${currentItem.allianceName}\nCoords: (${gridX},${gridY}) on Map ${mapId}\nDrag to move. Drag to sidebar to remove. Click for distance.`;
            currentItem.element = itemElement;
            placedItems.push(currentItem);
            if (mapElements[mapId]) mapElements[mapId].appendChild(itemElement);
            else console.error("Target map element not found for mapId:", mapId);
        }

        itemElement.removeEventListener('dragstart', handlePlacedItemDragStart);
        itemElement.addEventListener('dragstart', handlePlacedItemDragStart);
        itemElement.removeEventListener('dragend', handlePlacedItemDragEnd);
        itemElement.addEventListener('dragend', handlePlacedItemDragEnd);
        itemElement.removeEventListener('click', handlePlacedItemClickForDistance);
        itemElement.addEventListener('click', handlePlacedItemClickForDistance);
    }

    function removePlacedItem(placedId) {
        const itemIndex = placedItems.findIndex(p => p.id === placedId);
        if (itemIndex > -1) {
            // ... (rest of removePlacedItem logic as before, including distance calc reset) ...
            const itemToRemove = placedItems[itemIndex];
            if (itemToRemove.element && itemToRemove.element.parentNode) {
                itemToRemove.element.parentNode.removeChild(itemToRemove.element);
            }
            placedItems.splice(itemIndex, 1);

            if (firstSelectedItemForDistance && firstSelectedItemForDistance.id === placedId) {
                firstSelectedItemForDistance = null;
                distanceDisplay.textContent = "Distance: N/A (Selection removed)";
            }
        }
    }

    // --- DRAG AND DROP HANDLERS (largely same as before) ---
    function handlePlacedItemDragStart(event) {
        // ... (same as before) ...
        event.stopPropagation();
        const placedId = parseInt(event.currentTarget.dataset.placedId);
        const item = placedItems.find(p => p.id === placedId);
        if (item) {
            draggedPlacedItemData = { ...item };
            try { event.dataTransfer.setData('text/plain', item.id.toString()); }
            catch (e) { console.warn("Could not set drag data:", e); }
            event.currentTarget.style.opacity = '0.5';
            event.dataTransfer.effectAllowed = 'move';
        }
    }
    function handlePlacedItemDragEnd(event) {
        // ... (same as before) ...
        event.currentTarget.style.opacity = '1';
    }
    function handleMapDragOver(event) {
        // ... (same as before) ...
        if (draggedItemData || draggedPlacedItemData) {
            event.preventDefault();
            event.dataTransfer.dropEffect = (draggedItemData) ? "copy" : "move";
        }
    }
    function handleMapDrop(event) {
        // ... (same as before, boundary and collision checks are crucial) ...
        event.preventDefault();
        const targetMapElement = event.currentTarget;
        const targetMapId = parseInt(targetMapElement.dataset.mapId);
        const mapRect = targetMapElement.getBoundingClientRect();
        const dropXInMap = event.clientX - mapRect.left;
        const dropYInMap = event.clientY - mapRect.top;
        const gridCellX = Math.max(0, Math.floor(dropXInMap / currentTileSize));
        const gridCellY = Math.max(0, Math.floor(dropYInMap / currentTileSize));
        let itemToDropDetails, isMovingExisting = false;

        if (draggedPlacedItemData) {
            itemToDropDetails = { width: draggedPlacedItemData.width, height: draggedPlacedItemData.height, id: draggedPlacedItemData.id };
            isMovingExisting = true;
        } else if (draggedItemData) {
            itemToDropDetails = { width: draggedItemData.width, height: draggedItemData.height, id: -1 };
        } else { return; }

        if (gridCellX + itemToDropDetails.width > SINGLE_MAP_COLS || gridCellY + itemToDropDetails.height > SINGLE_MAP_ROWS) {
            alert('Item cannot be placed out of map bounds.');
            if (isMovingExisting && draggedPlacedItemData.element) draggedPlacedItemData.element.style.opacity = '1';
            draggedPlacedItemData = null; draggedItemData = null; return;
        }
        let collision = false;
        for (const existingItem of placedItems) {
            if (isMovingExisting && existingItem.id === itemToDropDetails.id) continue;
            if (existingItem.mapId === targetMapId) {
                if (gridCellX < existingItem.x + existingItem.width && gridCellX + itemToDropDetails.width > existingItem.x &&
                    gridCellY < existingItem.y + existingItem.height && gridCellY + itemToDropDetails.height > existingItem.y) {
                    collision = true; break;
                }
            }
        }
        if (collision) {
            alert('Cannot place/move item here, it overlaps.');
            if (isMovingExisting && draggedPlacedItemData.element) draggedPlacedItemData.element.style.opacity = '1';
            draggedPlacedItemData = null; draggedItemData = null; return;
        }
        if (isMovingExisting) {
            const itemToUpdate = placedItems.find(p => p.id === draggedPlacedItemData.id);
            if (itemToUpdate) addPlacedItemToGrid(targetMapId, null, gridCellX, gridCellY, true, itemToUpdate);
        } else {
            addPlacedItemToGrid(targetMapId, draggedItemData, gridCellX, gridCellY);
        }
        draggedPlacedItemData = null; draggedItemData = null;
    }

    // --- SIDEBAR DROP (DELETE ITEM) HANDLERS (same as before) ---
    function handleSidebarDragOver(event) { /* ... same ... */
        if (draggedPlacedItemData) {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
            sidebarElement.classList.add('drag-over-delete');
        }
    }
    function handleSidebarDragLeave() { /* ... same ... */
        sidebarElement.classList.remove('drag-over-delete');
    }
    function handleSidebarDrop(event) { /* ... same ... */
        event.preventDefault();
        sidebarElement.classList.remove('drag-over-delete');
        if (draggedPlacedItemData) {
            removePlacedItem(draggedPlacedItemData.id);
            draggedPlacedItemData = null;
        }
    }

    // --- ALLIANCE FUNCTIONS (Revised) ---
    function promptAndSetupAlliances() {
        alliances = { "Neutral": "neutral" }; // "Neutral" always exists, maps to "neutral" color for base image
        availableColors = [...ALLIANCE_COLORS]; // Reset available colors

        alert(`Please enter up to ${MAX_CUSTOM_ALLIANCES} alliance tags. Each will be assigned a unique color for their base.`);
        let customAllianceCount = 0;
        while (customAllianceCount < MAX_CUSTOM_ALLIANCES && availableColors.length > 0) {
            const name = prompt(`Enter name for Alliance ${customAllianceCount + 1} (or leave blank/cancel to stop):`);
            if (name === null || name.trim() === "") break;

            const trimmedName = name.trim();
            if (trimmedName && !alliances.hasOwnProperty(trimmedName)) {
                const assignedColor = availableColors.shift(); // Take the next available color
                alliances[trimmedName] = assignedColor;
                customAllianceCount++;
            } else if (alliances.hasOwnProperty(trimmedName)) {
                alert(`Alliance "${trimmedName}" already entered. Skipping.`);
            } else {
                // Empty name after trim, do nothing, loop continues
            }
        }
        // Set initial selected alliance
        const allianceNames = Object.keys(alliances);
        if (allianceNames.length > 1 && allianceNames[0] === "Neutral") {
            selectedAllianceName = allianceNames[1];
        } else if (allianceNames.length > 0 && allianceNames[0] !== "Neutral") {
            selectedAllianceName = allianceNames[0];
        } else {
            selectedAllianceName = "Neutral";
        }
        currentAllianceDisplay.textContent = selectedAllianceName;
        renderAllianceList();
    }

    function handleAddAllianceManual() { // If using the input field
        if (Object.keys(alliances).length -1 >= MAX_CUSTOM_ALLIANCES || availableColors.length === 0) { // -1 for Neutral
            alert(`Cannot add more alliances. Max ${MAX_CUSTOM_ALLIANCES} custom alliances reached or no more colors available.`);
            return;
        }
        const name = newAllianceNameInput.value.trim();
        if (name && !alliances.hasOwnProperty(name)) {
            const assignedColor = availableColors.shift();
            if (!assignedColor) { // Should not happen if previous check is correct
                alert("No more unique colors available for new alliances.");
                return;
            }
            alliances[name] = assignedColor;
            newAllianceNameInput.value = '';
            renderAllianceList();
        } else if (!name) alert("Please enter an alliance name.");
        else alert("Alliance name already exists.");
    }

    function renderAllianceList() {
        allianceListUl.innerHTML = '';
        for (const name in alliances) {
            const li = document.createElement('li');
            li.dataset.allianceName = name;

            const colorSwatch = document.createElement('span');
            colorSwatch.className = 'color-swatch';
            // Use the alliance's color to set swatch background
            // This requires a mapping from color name (e.g., "blue") to actual CSS color value for the swatch
            const colorValue = getColorValueForSwatch(alliances[name]); // Helper function needed
            colorSwatch.style.backgroundColor = colorValue;
            li.appendChild(colorSwatch);

            const nameSpan = document.createElement('span');
            nameSpan.className = 'alliance-name-span';
            nameSpan.textContent = name;
            li.appendChild(nameSpan);

            if (name === selectedAllianceName) li.classList.add('selected');

            li.addEventListener('click', (e) => {
                if (e.target.classList.contains('delete-alliance-btn') || e.target.parentNode.classList.contains('delete-alliance-btn')) return;
                selectedAllianceName = name;
                currentAllianceDisplay.textContent = selectedAllianceName;
                renderAllianceList();
            });

            if (name !== "Neutral") {
                const deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = '×';
                deleteBtn.classList.add('delete-alliance-btn');
                deleteBtn.title = `Delete alliance: ${name}`;
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (confirm(`Delete "${name}"? Items become "Neutral".`)) deleteAlliance(name);
                });
                li.appendChild(deleteBtn);
            }
            allianceListUl.appendChild(li);
        }
    }

    function getColorValueForSwatch(colorName) {
        // Simple map for swatch display. Adjust actual colors as needed.
        const colorMap = {
            "blue": "#3498db", "brown": "#8B4513", "green": "#2ecc71",
            "orange": "#e67e22", "purple": "#8e44ad", "red": "#e74c3c",
            "white": "#ecf0f1", "yellow": "#f1c40f", "black": "#34495e",
            "neutral": "#bdc3c7" // Color for Neutral swatch
        };
        return colorMap[colorName.toLowerCase()] || '#ccc'; // Fallback
    }

    function deleteAlliance(nameToDelete) {
        if (nameToDelete === "Neutral") return; // Cannot delete Neutral

        const colorToReturn = alliances[nameToDelete];
        delete alliances[nameToDelete];
        if (colorToReturn && !availableColors.includes(colorToReturn)) {
            availableColors.push(colorToReturn); // Make color available again
            availableColors.sort(); // Optional: keep it sorted
        }

        placedItems.forEach(item => {
            if (item.allianceName === nameToDelete) {
                item.allianceName = "Neutral";
                if (item.itemId === 'base') { // If it's a base, its image needs to change
                    item.imageSrc = 'assets/images/baseneutral.jpg';
                    if (item.element) {
                        const imgElement = item.element.querySelector('img');
                        if (imgElement) imgElement.src = item.imageSrc;
                    }
                }
                if (item.element) { // Update text overlay for all items
                    const textOverlay = item.element.querySelector('.placed-item-text-overlay');
                    if (textOverlay) textOverlay.textContent = `${item.name}`; // Remove old alliance from display
                    item.element.title = `Item: ${item.name}\nAlliance: Neutral\nCoords: (${item.x},${item.y}) on Map ${item.mapId}\nDrag to move. Drag to sidebar to remove. Click for distance.`;
                }
            }
        });
        if (selectedAllianceName === nameToDelete) {
            selectedAllianceName = "Neutral";
            currentAllianceDisplay.textContent = selectedAllianceName;
        }
        renderAllianceList();
    }

    // --- TOOLBAR ACTIONS (same as before) ---
    function handleTileSizeChange(event) { /* ... same ... */
        currentTileSize = parseInt(event.target.value);
        tileSizeValueDisplay.textContent = `${currentTileSize}px`;
        updateGridAppearance();
    }
    function handleClearAll() { /* ... same ... */
        if (confirm('Sure you want to clear ALL items?')) {
            placedItems.forEach(item => {
                if (item.element && item.element.parentNode) {
                    item.element.parentNode.removeChild(item.element);
                }
            });
            placedItems = [];
            nextPlacedItemId = 0;
            if (firstSelectedItemForDistance && firstSelectedItemForDistance.element) {
                firstSelectedItemForDistance.element.classList.remove('selected-for-distance-1');
            }
            firstSelectedItemForDistance = null;
            distanceDisplay.textContent = "Distance: N/A";
        }
    }

    // --- DISTANCE CALCULATION (same as before) ---
    function handlePlacedItemClickForDistance(event) { /* ... same as previous full version ... */
        event.stopPropagation();
        const clickedPlacedId = parseInt(event.currentTarget.dataset.placedId);
        const clickedItem = placedItems.find(p => p.id === clickedPlacedId);
        if (!clickedItem) return;
        document.querySelectorAll('.selected-for-distance-2').forEach(el => el.classList.remove('selected-for-distance-2'));
        if (!firstSelectedItemForDistance || firstSelectedItemForDistance.id === clickedItem.id) {
            if (firstSelectedItemForDistance && firstSelectedItemForDistance.id === clickedItem.id) {
                firstSelectedItemForDistance.element.classList.remove('selected-for-distance-1');
                firstSelectedItemForDistance = null;
                distanceDisplay.textContent = "Distance: N/A";
            } else {
                if(firstSelectedItemForDistance && firstSelectedItemForDistance.element) {
                    firstSelectedItemForDistance.element.classList.remove('selected-for-distance-1');
                }
                firstSelectedItemForDistance = clickedItem;
                firstSelectedItemForDistance.element.classList.add('selected-for-distance-1');
                distanceDisplay.textContent = `Selected: ${firstSelectedItemForDistance.name}. Click another.`;
            }
        } else {
            const secondItem = clickedItem;
            secondItem.element.classList.add('selected-for-distance-2');
            const center1 = { x: firstSelectedItemForDistance.x + Math.floor(firstSelectedItemForDistance.width / 2), y: firstSelectedItemForDistance.y + Math.floor(firstSelectedItemForDistance.height / 2), mapId: firstSelectedItemForDistance.mapId };
            const center2 = { x: secondItem.x + Math.floor(secondItem.width / 2), y: secondItem.y + Math.floor(secondItem.height / 2), mapId: secondItem.mapId };
            let distText = "";
            if (center1.mapId !== center2.mapId) {
                distText = "Items are on different maps.";
            } else {
                const deltaX = Math.abs(center1.x - center2.x);
                const deltaY = Math.abs(center1.y - center2.y);
                const euclideanDist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
                distText = `Distance: ~${euclideanDist.toFixed(1)} tiles (ΔX: ${deltaX}, ΔY: ${deltaY})`;
            }
            distanceDisplay.textContent = distText;
            setTimeout(() => {
                if (firstSelectedItemForDistance && firstSelectedItemForDistance.element) firstSelectedItemForDistance.element.classList.remove('selected-for-distance-1');
                if (secondItem.element) secondItem.element.classList.remove('selected-for-distance-2');
                firstSelectedItemForDistance = null;
            }, 3000);
        }
    }

    // --- START THE APPLICATION ---
    init();
});
