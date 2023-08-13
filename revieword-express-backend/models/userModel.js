const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please add your username"],
        unique: [true, "Username has been taken"]
    },
    password: {
        type: String,
        required: [true, "Please add your password"]
    },
    reviewingEssayId: {
        type: String,
        default: ""
    },
    points: {
        type: Number,
        default: 5
    }
},{
    timestamps: true
}
)
module.exports=mongoose.model("User", userSchema)