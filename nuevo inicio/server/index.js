const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3977;
const {API_VERSION, IP_SERVER, PORT_DB} = require("./config");

// mongoose.set("useFindAndModify", false);

mongoose.connect(
    `mongodb+srv://Brauliorg23:Bra23rg@cluster0.1l5zc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, 
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err, res) =>{
        if(err){
            throw err;
        }else{
            console.log("la conexion a la base es correcta");

            app.listen(port, () => {
                console.log("#####API REST#####");
                console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`);
            })
        }
    });

