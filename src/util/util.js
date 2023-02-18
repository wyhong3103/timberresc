function timestampToTimeString(timestamp){
    const offset = new Date().getTimezoneOffset();
    console.log(offset);
    const date = (new Date(timestamp - offset*60*1000)).toUTCString();
    const re = /(.+) GMT/;
    const match = date.match(re);
    return match[1].slice(16, 25);
}

export{
    timestampToTimeString
};

