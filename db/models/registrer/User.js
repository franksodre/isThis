const { Schema, model } = require('mongoose');
const uuid = require('uuidv4')

const UserSchema = Schema({
    name:{
        type: String,
        required: true,
        min: 3,
        max: 29,
    },
    email: {
        type: String,
        required: true,
        min: 12,
        max: 32,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min: 8,
        max: 27,
    },
    token:{
        type: String,

    },
    date:{
        type: Date,
        default: Date.now,
    }
})

// UserSchema.pre('save', function(next) {
//     this._id = uuid();
//     next();
// });

const User = model('User2', UserSchema)

module.exports = User;