import "./index.css";
import { showDownloadModal } from "./modal.js";

const showDownloadSheet = () => {
    const sheetTabs = document.querySelectorAll(".docs-sheet-tab");
    const wrapperId = "sheet-downloader-btn-wrapper";
    const existingWrapper = document.getElementById(wrapperId);
    const buttonBar = document.querySelector(".docs-sheet-button-bar");

    if (sheetTabs.length > 1) {
        if (!existingWrapper && buttonBar) {
            const wrapper = document.createElement("td");
            wrapper.id = wrapperId;
            wrapper.classList.add("sheet-downloader-btn-wrapper");
            const button = document.createElement("button");
            button.id = "sheet-downloader-btn";
            button.title = "Download";
            button.classList.add("sheet-downloader-btn");
            button.innerHTML = "<img src='" + chrome.runtime.getURL("file-arrow-down-solid.svg") + "' alt='Download' style='width:16px;height:16px;filter:invert(1);'>";
            button.addEventListener("click", showDownloadModal);
            wrapper.appendChild(button);
            buttonBar.parentElement.insertAdjacentElement("beforebegin", wrapper);
        }
    } else {
        if (existingWrapper) {
            existingWrapper.remove();
        }
    }
};

showDownloadSheet();
const observer = new MutationObserver(showDownloadSheet);
observer.observe(document.body, { childList: true, subtree: true });
