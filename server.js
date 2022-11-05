
let express = require('express')
let app = express()
 app.use(express.static('./dist/vuexy'))

 app.get('/*',(req,res) =>{
    res.sendFile('index.html', {root: 'dist/vuexy/'})
 })
 app.listen(process.env.PORT || 8080)