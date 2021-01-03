function getRandomID() {
    let min = Math.ceil(1);
    let max = Math.max(10000);
    return Math.floor(Math.random() * (max - min) + min);
}

exports.getRandomID = getRandomID;