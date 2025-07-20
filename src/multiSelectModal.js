import { getAllSheetNames, getCurrentSheetName, downloadMultipleSheets } from "./utils/sheetUtils.js";

const showMultiSelectModal = () => {
  // Remove existing modal if any
  const existingModal = document.querySelector(".sheet-downloader-modal");
  if (existingModal) {
    existingModal.remove();
  }

  const sheetNames = getAllSheetNames();
  const currentSheetName = getCurrentSheetName();
  const originalTab = document.querySelector(".docs-sheet-tab.docs-sheet-active-tab");

  if (!sheetNames || sheetNames.length === 0) {
    alert("No sheets found.");
    return;
  }

  const modal = document.createElement("div");
  modal.className = "sheet-downloader-modal";
  modal.innerHTML = `
    <div class="sheet-downloader-modal-content">
      <h3>Select Sheets to Download</h3>
      <div class="checkbox-group">
        ${sheetNames.map(sheetName => `
          <div class="checkbox-option">
            <input type="checkbox" id="sheet-${sheetName.replace(/\s+/g, "-")}" 
                   value="${sheetName}" 
                   ${sheetName === currentSheetName ? "checked" : ""}>
            <label for="sheet-${sheetName.replace(/\s+/g, "-")}">${sheetName}</label>
          </div>
        `).join("")}
      </div>
      <div class="button-group">
        <button class="cancel-btn">Cancel</button>
        <button class="download-btn">Download</button>
      </div>
      <div class="warning-note">
        <p><strong>Note:</strong> Multi-sheet downloads may have formatting issues and compatibility problems in some browsers. We recommend using Google Chrome for the best experience.</p>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Add event listeners to buttons
  const cancelBtn = modal.querySelector(".cancel-btn");
  const downloadBtn = modal.querySelector(".download-btn");

  cancelBtn.addEventListener("click", closeDownloadModal);
  downloadBtn.addEventListener("click", () => handleMultiDownload(originalTab));

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeDownloadModal();
    }
  });
};

const closeDownloadModal = () => {
  const modal = document.querySelector(".sheet-downloader-modal");
  if (modal) {
    modal.remove();
  }
};

const handleMultiDownload = async (originalTab) => {
  const selectedCheckboxes = document.querySelectorAll("input[type=\"checkbox\"]:checked");
  const selectedSheetNames = Array.from(selectedCheckboxes).map(checkbox => checkbox.value);

  if (selectedSheetNames.length === 0) {
    alert("Please select at least one sheet to download.");
    return;
  }

  closeDownloadModal();
  await downloadMultipleSheets(selectedSheetNames, originalTab);
};

export { showMultiSelectModal }; 