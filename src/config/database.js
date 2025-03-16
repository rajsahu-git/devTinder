const mongoose = require("mongoose")

const connectionDb = async()=>{
    await mongoose.connect("mongodb+srv://rajkumarsahu8824:jzDGetMF62lGDsNl@devtinder.kla6f.mongodb.net/?retryWrites=true&w=majority&appName=devTinder")
}

module.exports = connectionDb