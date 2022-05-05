const csv = require('csv-parser')
const fs = require('fs')
const results = [];

const addSum = (location, gradeId, callback) => {
     fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
    //  console.log(results);
    
    let r = '';
    let data = '';

    data = results.find((res) => {
        if(res.location == location ){
            // console.log(res.name);
            return res;
        }
    })
    const listingData = JSON.parse(data.listings);
    if(listingData.length > 0){
        r = listingData.find((l) => {
            if(l.gradeNumber == gradeId){
                // console.log(l.price);
                return l;
            } 
        })
    }
    callback(data, r);
    });
}

addSum('5c08cb6f54851e2170a044f4', 'F18A010UA', (n, p) => {
    if(n !== ''){
        console.log(n.name);
    }
    if(p !== ''){
        console.log(p.price)
    }
});


