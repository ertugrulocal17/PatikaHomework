import {writeFile, readFile, appendFile, unlink} from 'fs'


// //Create employees.json File
// writeFile('employees.json', '{"name": "Employee 1 Name", "salary": 2000}', (err) => {
//     if (err) console.log(err)
//     console.log('Json File Created!')

// })

// //Read employees.json File
// readFile('./employees.json', 'utf8', (err, data) => {
//     if (err) console.log(err)
//     console.log(data)

// })

// //Update employees.json File
// appendFile('employees.json','{"name": "Employee 2 Name", "salary": 3000}', (err) => {
//     if (err) console.log(err)
//     console.log('File Updated!')
// } )

// //Delete employees.json File
// unlink('employees.json', (err) => {
//     if (err) console.log(err)
//     console.log('File Deleted!')
// } )