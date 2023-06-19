// jshint esversion: 6

module.exports = getDate();

function getDate() {
    var today = new Date();
    var options = {
        weekday: 'long',    // long, short, narrow
        day: 'numeric',     // numeric, 2-digit
        month: 'long',      // numeric, 2-digit, long, short, narrow
    }
    var day = today.toLocaleDateString("en-US", options);

    return day;
}
