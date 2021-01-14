function p(s) {
    switch (typeof(s)) {
    case 'object':
        console.log(JSON.stringify(s, null, 4));
        return;
    default:
        console.log(s);
    }
}


module.exports = p;
