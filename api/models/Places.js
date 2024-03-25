const mongoose=require('mongoose');
const {Schema}= mongoose;

const PlaceSchema=new Schema({
    owner:{type:Schema.Types.ObjectId,ref:'User'},
    title: String,
    address:String,
    photos:[String],
    description:String,
    perks:[String],
    extraInfo:String,
    checkIn:Date,
    checkOut:Date,
    maxGuest: Number,
    prices:Number,

});

const placeModel = mongoose.model('Place',PlaceSchema);

module.exports=placeModel;