const mongoose = require('mongoose')

//tworzenie modelu , czyli Schema

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true
		},
		date: {
			type: Date,
			default: Date.now
		},
		bestWPM15: {
			type: Number,
			default: 0,
		},
		bestWPM60: {
			type: Number,
			default: 0,
		},
		accuracy15: {
			type: Number,
			default: 0
		},
		accuracy60: {
			type: Number,
			default: 0
		},
		date: {
			type: Date,
			default: Date.now
		}

	},

)

const model = mongoose.model('User', UserSchema)

module.exports = model