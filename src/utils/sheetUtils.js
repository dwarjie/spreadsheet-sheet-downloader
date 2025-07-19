const getSheetKeyAndGid = () => {
    // Example URL: https://docs.google.com/spreadsheets/d/<KEY>/edit#gid=<GID>
    const match = window.location.href.match(/\/d\/([a-zA-Z0-9-_]+)\/.*[#&]gid=(\d+)/);
    if (match) {
        return { key: match[1], gid: match[2] };
    }
    return null;
};

const downloadSheet = () => {
    const ids = getSheetKeyAndGid();
    if (ids) {
        const url = `https://docs.google.com/spreadsheets/d/${ids.key}/export?format=xlsx&gid=${ids.gid}`;
        window.open(url, "_blank");
    } else {
        alert("Could not determine sheet KEY and GID.");
    }
};

const cleanSheetName = (name) => name.replace(/^\d+/, "").trim();

const getAllSheetNames = () => {
    const sheetTabs = document.querySelectorAll(".docs-sheet-tab");
    return Array.from(sheetTabs)
        .filter(tab => tab.getAttribute("tabindex") === "0")
        .map(tab => cleanSheetName(tab.textContent));
};

const getCurrentSheetName = () => {
    const activeTab = document.querySelector(".docs-sheet-tab.docs-sheet-active-tab");
    console.log(activeTab);
    return activeTab ? cleanSheetName(activeTab.textContent) : null;
};

const getGidBySheetName = async (sheetName, originalTab) => {
    const sheetTabs = document.querySelectorAll(".docs-sheet-tab");
    const targetTab = Array.from(sheetTabs).find(tab => cleanSheetName(tab.textContent) === sheetName);

    if (!targetTab) return null;

    // Method 2: mousedown + mouseup + click
    const gidBefore = getCurrentGid();
    targetTab.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    targetTab.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    targetTab.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 500));
    const gidAfter = getCurrentGid();
    if (gidBefore !== gidAfter) {
        console.log("Method 2 (mousedown + mouseup + click) worked for tab activation");
    }
    return gidAfter;
};

const getCurrentGid = () => {
    const match = window.location.href.match(/[#&]gid=(\d+)/);
    return match ? match[1] : null;
};

const downloadMultipleSheets = async (selectedSheetNames, originalTab) => {
    if (!selectedSheetNames || selectedSheetNames.length === 0) {
        alert("Please select at least one sheet to download.");
        return;
    }

    console.log("Selected sheet names:", selectedSheetNames);

    for (let i = 0; i < selectedSheetNames.length; i++) {
        const sheetName = selectedSheetNames[i];
        console.log(`\n--- Processing sheet ${i + 1}/${selectedSheetNames.length}: "${sheetName}" ---`);
        console.log(`Current URL before processing: ${window.location.href}`);

        const gid = await getGidBySheetName(sheetName, originalTab);
        console.log(`Sheet: "${sheetName}" - GID: ${gid}`);
        console.log(`URL after activation: ${window.location.href}`);
    }

    console.log("GID logging complete!");
};

export {
    getSheetKeyAndGid,
    downloadSheet,
    getAllSheetNames,
    getCurrentSheetName,
    getGidBySheetName,
    getCurrentGid,
    downloadMultipleSheets
};