import connectDB from "./DB/connection.js";
import userRouter from './src/modules/user/user.router.js'
const initApp=(app , express)=>{
connectDB();
app.use(express.json());
app.use('/users',userRouter)
}

export default initApp;