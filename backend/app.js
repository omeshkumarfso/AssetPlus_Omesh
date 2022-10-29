var express = require('express')
var mongoose = require('mongoose');


const app = express()
const port = 8000
const cors = require('cors')

// mongoose.connect("mongodb://localhost:27017/assignment");
// mongoose.connect('mongodb+srv://omeshkumar:<Asset@plus>@cluster0.jyfgs30.mongodb.net/?retryWrites=true&w=majority',
//     { useNewUrlParser: true, useUnifiedTopology: true }, err => {
//         console.log('connected')
//     });
mongoose.connect("mongodb+srv://omeshkumar:gIgFEhy3DymwZFEd@cluster0.jyfgs30.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("DB CONNECTED");
    });
app.use(cors());
app.use(express.json());

app.use(require("./routes"));

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})

process.on('SIGINT', async function () {
    await mongoose.disconnect();
    process.exit(0)
});