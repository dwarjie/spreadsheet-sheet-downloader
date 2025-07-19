import * as XLSX from "xlsx";
import { showLoadingOverlay, hideLoadingOverlay, updateLoadingMessage } from "./loadingUtils.js";

const combineSheetsFromGids = async (sheetKey, gidSheetMap) => {
    try {
        // Show loading overlay
        showLoadingOverlay("Preparing to combine sheets...");

        // Get the Google Sheet name from the page title
        const sheetName = document.title.replace(" - Google Sheets", "").trim();
        const fileName = sheetName ? `${sheetName}.xlsx` : "Combined_Sheets.xlsx";

        // Create a new workbook with enhanced options
        const workbook = XLSX.utils.book_new();

        // Process each sheet
        const sheetEntries = Array.from(gidSheetMap.entries());
        for (let i = 0; i < sheetEntries.length; i++) {
            const [sheetName, gid] = sheetEntries[i];
            const progress = Math.round(((i + 1) / sheetEntries.length) * 100);

            updateLoadingMessage(`Processing sheet: "${sheetName}" (${progress}%)`);
            console.log(`Processing sheet: "${sheetName}" with GID: ${gid}`);

            // Download the sheet
            const url = `https://docs.google.com/spreadsheets/d/${sheetKey}/export?format=xlsx&gid=${gid}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    console.warn(`Failed to download sheet "${sheetName}": ${response.status}`);
                    continue;
                }

                const arrayBuffer = await response.arrayBuffer();

                // Enhanced reading options to preserve more formatting
                const sheetWorkbook = XLSX.read(arrayBuffer, {
                    type: "array",
                    cellStyles: true,
                    cellDates: true,
                    cellNF: true,
                    cellHTML: true
                });

                // Get the first sheet from the downloaded workbook
                const sheetNameFromWorkbook = sheetWorkbook.SheetNames[0];
                const worksheet = sheetWorkbook.Sheets[sheetNameFromWorkbook];

                // Add the sheet to our combined workbook with the original sheet name
                XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

                console.log(`Successfully added sheet: "${sheetName}"`);

            } catch (error) {
                console.error(`Error processing sheet "${sheetName}":`, error);
            }
        }

        updateLoadingMessage("Generating combined file...");

        // Generate the combined file with enhanced writing options
        const combinedArrayBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
            compression: true,
            bookSST: false
        });

        updateLoadingMessage("Preparing download...");

        // Create download link
        const blob = new Blob([combinedArrayBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });

        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);

        // Hide loading overlay
        hideLoadingOverlay();

        console.log("Combined spreadsheet downloaded successfully!");
        return true;

    } catch (error) {
        // Hide loading overlay on error
        hideLoadingOverlay();
        console.error("Error combining sheets:", error);
        return false;
    }
};

export { combineSheetsFromGids }; 