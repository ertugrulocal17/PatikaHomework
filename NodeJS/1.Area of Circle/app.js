const pi = 3.14

const cirlceCalculate = (r) => {
    const result = pi*(r*r)
    console.log(`The circle area of ${r} is = ${result}`)
}

const value = process.argv.slice(2)[0]

cirlceCalculate(value)