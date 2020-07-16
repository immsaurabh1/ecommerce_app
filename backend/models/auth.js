const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const authSchema = new mongoose.Schema({
    password: {
        type: String
    },
    lastLogin: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId
    }
}, { timestamps: true });


authSchema.pre('save', function () {
    if (this.password) {
        return bcrypt.hash(this.password, 10)
            .then(hash => {
                this.password = hash;
                return true;
            })
    }
    return true;
});

module.exports = mongoose.model('Auth', authSchema);