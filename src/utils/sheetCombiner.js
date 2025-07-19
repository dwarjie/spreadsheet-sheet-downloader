import * as XLSX from "xlsx";

const combineSheetsFromGids = async (sheetKey, gidSheetMap) => {
    try {
        // Create a new workbook with enhanced options
        const workbook = XLSX.utils.book_new();

        // Process each sheet
        for (const [sheetName, gid] of gidSheetMap) {
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

        // Generate the combined file with enhanced writing options
        const combinedArrayBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
            compression: true,
            bookSST: false
        });

        // Create download link
        const blob = new Blob([combinedArrayBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });

        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "combined_sheets.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);

        console.log("Combined spreadsheet downloaded successfully!");
        return true;

    } catch (error) {
        console.error("Error combining sheets:", error);
        return false;
    }
};

export { combineSheetsFromGids }; 