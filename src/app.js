import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import TasksRoutes from './routes/tasks.routes'
import config from './config'

const app = express()

//settings
app.set('port', config.port)

//middlewares
const corsOptions = {
 origin: config.corsOrigin
}
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
app.get('/', (req, res) => {
 res.json({ message: "welcome to my app" })
}
)

app.use('/api/tasks', TasksRoutes)

export default app