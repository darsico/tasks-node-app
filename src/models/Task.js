import { Schema, model } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const taskSchema = new Schema({
 title: {
  type: String,
  required: true,
  trim: true
 },
 description: {
  type: String,
  required: true,
  trim: true
 },
 done: {
  type: Boolean,
  default: false
 }
}, {
 timestamps: true,
 versionKey: false
})

taskSchema.plugin(mongoosePaginate)
export default model('Task', taskSchema)  
