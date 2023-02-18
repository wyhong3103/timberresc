function timestampToTimeString(timestamp){
    const date = (new Date(timestamp)).toUTCString();
    const re = /(.+) GMT/;
    const match = date.match(re);
    return match[1].slice(16, 25);
}

export{
    timestampToTimeString
};

