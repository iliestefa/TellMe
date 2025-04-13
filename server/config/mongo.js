const mongoose = require("mongoose");

const connectToMongo = async () => {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/whatsapp-sessions";

    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conexión a MongoDB exitosa");
    } catch (error) {
        console.error("Error conectando a MongoDB:", error);
        process.exit(1); // Finaliza el proceso si no se puede conectar
    }
};

module.exports = connectToMongo;