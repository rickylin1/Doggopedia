console.log('woof')

//in fetch arguement, if its a post statement then will need a body and json stringify to send in data 

fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => {
        if(res.ok){
            console.log("success")
            return res.json()
        }
        else{
            console.log("error")
        }
    }
        
        
    )
    .then(dat => {
        console.log(typeof dat)
        console.log()
        return dat
    })
    .then(data => {
        const jsonString = JSON.stringify(data)
        const jsonObject = JSON.parse(jsonString).message;
        for (let breed in jsonObject){
            console.log(breed)
            console.log()
        }
        // console.log(jsonObject)
        console.log(typeof jsonObject)
    })