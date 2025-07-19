import { simulateTabClick } from "./clickUtils.js";

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
    return activeTab ? cleanSheetName(activeTab.textContent) : null;
};

const getGidBySheetName = async (sheetName, originalTab) => {
    const sheetTabs = document.querySelectorAll(".docs-sheet-tab");
    const targetTab = Array.from(sheetTabs).find(tab => cleanSheetName(tab.textContent) === sheetName);

    if (!targetTab) return null;

    return await simulateTabClick(targetTab);
};

const downloadMultipleSheets = async (selectedSheetNames, originalTab) => {
    if (!selectedSheetNames || selectedSheetNames.length === 0) {
        alert("Please select at least one sheet to download.");
        return;
    }

    for (const sheetName of selectedSheetNames) {
        const gid = await getGidBySheetName(sheetName, originalTab);
        if (gid) {
            console.log(`Sheet: "${sheetName}" - GID: ${gid}`);
        } else {
            console.warn(`Could not get GID for sheet: ${sheetName}`);
        }
    }
};

export {
    getSheetKeyAndGid,
    downloadSheet,
    getAllSheetNames,
    getCurrentSheetName,
    getGidBySheetName,
    downloadMultipleSheets
};