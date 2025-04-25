import express from 'express'

const app = express()

// Routing
app.get('/', (req, res) => {
    res.send('Hello World')
})

export default app