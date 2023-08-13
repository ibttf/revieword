const mongoose=require('mongoose')

const essaySchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    reviewerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    prompt:{
        type: String,
        required: [true, "Please enter a prompt"]
    },
    content:{
        type: String,
        required: [true, "Please enter an essay"]
    },
    reviewProcess:{
        type: String,
        default: 'false'
    },
    comments:{
        type:String,
        default: ""
    },
    flowComments:{
        type:String,
        default: ""
    },
    toneComments:{
        type:String,
        default: ""
    },
    length: {
        type: String,
        default: "Long"
    }
})

module.exports=mongoose.model("Essay",essaySchema)