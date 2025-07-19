const showLoadingOverlay = (message = "Processing sheets...") => {
    // Remove existing overlay if any
    const existingOverlay = document.querySelector(".sheet-downloader-loading-overlay");
    if (existingOverlay) {
        existingOverlay.remove();
    }

    const overlay = document.createElement("div");
    overlay.className = "sheet-downloader-loading-overlay";
    overlay.innerHTML = `
    <div class="sheet-downloader-loading-content">
      <div class="sheet-downloader-spinner"></div>
      <div class="sheet-downloader-loading-text">${message}</div>
    </div>
  `;

    document.body.appendChild(overlay);
};

const hideLoadingOverlay = () => {
    const overlay = document.querySelector(".sheet-downloader-loading-overlay");
    if (overlay) {
        overlay.remove();
    }
};

const updateLoadingMessage = (message) => {
    const loadingText = document.querySelector(".sheet-downloader-loading-text");
    if (loadingText) {
        loadingText.textContent = message;
    }
};

export { showLoadingOverlay, hideLoadingOverlay, updateLoadingMessage }; 