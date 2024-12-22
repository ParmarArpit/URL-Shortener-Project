const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, role: {
        type: String,
        required: true,
        default: "NORMAL"
    },

}, { timestamps: true });

const User = mongoose.model("User", userSchema)

module.exports = User




// // Original_url: {
// //     type: String,
// //     required: true,
// //     validate: {
// //         validator: function (v) {
// //             return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v);
// //         },
// //         message: props => `${props.value} is not a valid URL!`
// //     }
// // },
// // Shortened_url: {
// //     type: String,
// //     required: true,
// //     validate: {
// //         validator: function (v) {
// //             return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v);
// //         },
// //         message: props => `${props.value} is not a valid URL!`
// //     }

// },