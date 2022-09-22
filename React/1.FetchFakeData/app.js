import getData from './jsonData.js'

(async () => {
    const data = await getData(1)
    console.log(data)
    
})();