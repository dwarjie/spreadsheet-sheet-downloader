import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
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

                // Use arrayBuffer directly
                const arrayBuffer = await response.arrayBuffer();
                console.log(`Downloaded sheet "${sheetName}": ${arrayBuffer.byteLength} bytes`);

                // Try using arrayBuffer directly without conversion
                const sheetWorkbook = XLSX.read(arrayBuffer, {
                    type: "array"
                });

                // Get the first sheet from the downloaded workbook
                const sheetNameFromWorkbook = sheetWorkbook.SheetNames[0];
                const worksheet = sheetWorkbook.Sheets[sheetNameFromWorkbook];

                console.log(`Processing worksheet: "${sheetNameFromWorkbook}" with ${Object.keys(worksheet).length} cells`);

                // Add the sheet to our combined workbook with the original sheet name
                XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

                console.log(`Successfully added sheet: "${sheetName}"`);

            } catch (error) {
                console.error(`Error processing sheet "${sheetName}":`, error);
                console.error(`Error details:`, error.message);
                console.error(`Error stack:`, error.stack);
            }
        }

        updateLoadingMessage("Generating combined file...");

        // Generate the combined file using array type with styling options
        const combinedArray = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
            cellStyles: true,
            cellDates: true,
            cellNF: true
        });

        updateLoadingMessage("Preparing download...");

        // Use FileSaver for better browser compatibility
        const blob = new Blob([combinedArray], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });

        saveAs(blob, fileName);

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