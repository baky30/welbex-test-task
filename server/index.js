const express = require('express');
const recordRouter = require('./routes/record.routes')
const cors = require('cors')

const PORT = 8080;

const app = express();

app.use(cors())
app.use(express.json())
app.use('/api', recordRouter)



app.listen(PORT, () => console.log(`server started on port: ${PORT}`))
