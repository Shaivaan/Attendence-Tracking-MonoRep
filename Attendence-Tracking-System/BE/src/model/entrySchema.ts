const mongoose = require('mongoose');

const entryTrackingSchema = new mongoose.Schema({
  email: {
    type: String,
    unique:true,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  photo: {
    type: String,
    required: [true, 'Photo is required']
  },
  entryType : {
    type: String,
    required: [true, 'Photo is required']
  },
},{
  timestamps:true
});

export const EntrySchema = mongoose.model('EntrySchema', entryTrackingSchema);
