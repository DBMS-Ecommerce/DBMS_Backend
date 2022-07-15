/*
    keys = [ name, description ]
    if(comma==true) s = "name=?, descripton=?"
    else    s = "name=? and descripton=?"
*/
equalSequenceString = (keys, comma) => {
    let s = "";
    let i = 0;
    keys.forEach(key => {
        s = s + `${key}=?`;
        if (i != keys.length - 1) {
            if (comma) s = s + ", ";
            else s = s + " and ";
        };
        i += 1;
    });
    return s;
}

module.exports = { equalSequenceString }