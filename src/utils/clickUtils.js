const simulateTabClick = async (targetTab) => {
    if (!targetTab) return null;

    // Activate the target tab using mousedown + mouseup + click
    const gidBefore = getCurrentGid();
    targetTab.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    targetTab.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    targetTab.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 500));
    const gidAfter = getCurrentGid();

    return gidAfter;
};

const getCurrentGid = () => {
    const match = window.location.href.match(/[#&]gid=(\d+)/);
    return match ? match[1] : null;
};

export { simulateTabClick, getCurrentGid }; 