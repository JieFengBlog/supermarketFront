function transferUtil(origin,data) {
    let newData = new Array();
    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < origin.length; j++){
            if(origin[j].id == data[i]){
                newData.push(origin[j]);
                break;
            }
        }
    }
    return newData;
}

export {
    transferUtil
}
