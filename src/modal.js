import { downloadSheet } from "./utils/sheetUtils.js";
import { showMultiSelectModal } from "./multiSelectModal.js";

const showDownloadModal = () => {
  // Remove existing modal if any
  const existingModal = document.querySelector(".sheet-downloader-modal");
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement("div");
  modal.className = "sheet-downloader-modal";
  modal.innerHTML = `
    <div class="sheet-downloader-modal-content">
      <h3>Download Options</h3>
      <div class="radio-group">
        <div class="radio-option">
          <input type="radio" id="single-sheet" name="download-type" value="single" checked>
          <label for="single-sheet">Single Sheet Download</label>
        </div>
        <div class="radio-option">
          <input type="radio" id="multi-sheet" name="download-type" value="multi">
          <label for="multi-sheet">Multi-Sheet Download</label>
        </div>
      </div>
      <div class="warning-note" style="display: none;">
        <p><strong>Note:</strong> Multi-sheet downloads may have formatting issues and compatibility problems in some browsers. We recommend using Google Chrome for the best experience.</p>
      </div>
      <div class="button-group">
        <button class="cancel-btn">Cancel</button>
        <button class="confirm-btn">Confirm</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Add event listeners to buttons
  const cancelBtn = modal.querySelector(".cancel-btn");
  const confirmBtn = modal.querySelector(".confirm-btn");

  cancelBtn.addEventListener("click", closeDownloadModal);
  confirmBtn.addEventListener("click", confirmDownload);

  // Add event listeners to radio buttons to show/hide warning note
  const singleRadio = modal.querySelector("#single-sheet");
  const multiRadio = modal.querySelector("#multi-sheet");
  const warningNote = modal.querySelector(".warning-note");

  singleRadio.addEventListener("change", () => {
    warningNote.style.display = "none";
  });

  multiRadio.addEventListener("change", () => {
    warningNote.style.display = "block";
  });

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

const confirmDownload = () => {
  const selectedType = document.querySelector("input[name=\"download-type\"]:checked").value;

  if (selectedType === "single") {
    downloadSheet();
    closeDownloadModal();
  } else if (selectedType === "multi") {
    closeDownloadModal();
    showMultiSelectModal();
  }
};

export { showDownloadModal };