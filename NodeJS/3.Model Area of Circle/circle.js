const pi = 3.14

function circleArea(r) {
    console.log(pi*r*r)
}

function circleCircumference(r) {
    console.log(2*pi*r)
}

module.exports = {
    circleArea,
    circleCircumference
}