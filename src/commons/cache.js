function clear() {
    localStorage.removeItem("tempTableData");
    localStorage.removeItem("otherTransferDataRight");
    localStorage.removeItem("tempTableDataOut");
    localStorage.removeItem("otherTransferDataRightOut");
}

export {
    clear
}
