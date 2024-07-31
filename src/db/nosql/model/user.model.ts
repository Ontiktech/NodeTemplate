import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: String
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel