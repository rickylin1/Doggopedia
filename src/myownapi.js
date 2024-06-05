// const express = require('express');
// const app = express();
// app.use(express.json())

// const PORT = 8000;

// app.listen(
//     PORT, () =>{
//         console.log('port is alive')
//     }
// )

// app.get('/woof', (req, res) => {
//     res.status(200).send({
//         bob: 'is fluffy'
//     })

// });

// app.post('/woof/:id',(req,res) => {
//     const {id} = req.params;
//     const {pic} = req.body;

//     if(!pic){
//         res.status(420).send({message: 'Wheres the pic!'})
//     }

//     res.send({
//         dog: `fluffy ${id} doggy with this pic ${pic}`,
//     });

// })