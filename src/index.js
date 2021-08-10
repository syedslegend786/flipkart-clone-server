import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
//
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//

//routers...
import userAuthRoute from './routes/userAuth.js'
import adminAuthRoute from './routes/admin/adminAuth.js'
import catagoryRoute from './routes/catagory.js'
import productRoute from './routes/product.js'
import initialDataRoute from './routes/admin/initialData.js'
import pageRoute from './routes/admin/page.js'
import cartRoute from './routes/cart.js';
import addressRouter from './routes/address.js';
import orderRouter from './routes/order.js'
import adminOrderRoute from './routes/admin/order.admin.js'
import productAdminRoute from './routes/admin/product.js'
//app config...
const app = express();
dotenv.config();
//db config...
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}
).then(() => {
    console.log('db is connected')
})

//middlewares...
app.use(cors())
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use('/api', userAuthRoute)
app.use('/api', adminAuthRoute)
app.use('/api', catagoryRoute)
app.use('/api', productRoute)
app.use('/api', initialDataRoute)
app.use('/api', pageRoute)
app.use('/api', cartRoute)
app.use('/api', addressRouter)
app.use('/api', orderRouter)
app.use('/api', adminOrderRoute)
app.use('/api', productAdminRoute)
//listener...

app.listen(process.env.PORT, () => console.log(`server is running at ${process.env.PORT}`))