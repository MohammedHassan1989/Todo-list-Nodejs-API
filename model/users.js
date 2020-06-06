const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt')

const usersPrivilegesSchema = new Schema({

    url: { type: String, require},
    method: { type: String, require },
}); 

const usersSchema = new Schema({

    username: { type: String, default: null },
    password: { type: String, default: null },
    privileges:[usersPrivilegesSchema],
    unsuccessfulLoginCount:{type:Number,default:0},
    unsuccessfulLoginInProgress:{type:Boolean,default:false},
    lastUnsuccessfulLoginDate:{type:Date,default:null},
    lastSuccessfulLoginDate:{type:Date,default:null},
    creationDate: { type: Date, default: Date.now }

}); 

usersSchema.pre('save', async function(next){

    if(!this.isModified("password")){
        return next();
    }
    try{
        // set username lowercase
        this.username = this.username.toLowerCase()
        let salt  = await bcrypt.genSalt(__staticVar.saltRoundsRang);
        this.password  =  await bcrypt.hash(this.password,salt);
        next();

    }
    catch(err){
        throw new Error(err);
    }
})

module.exports = mongoose.model('users', usersSchema);