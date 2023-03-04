const cors = require('cors');
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config();

// middlewere
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('portfolio server is running')
})

// mongodb connection 



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jle6tre.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const projectsCollection = client.db('portfolio').collection('projects')

        app.get('/projects', async (req, res) => {
            const query = {}
            const result = await projectsCollection.find(query).toArray()
            res.send(result)
        })

        // app.get('/product/:id', async (req, res) => {
        //     const id = req.params.id

        //     const filter = { _id: ObjectId(id) }
        //     const result = projectsCollection.find(filter).toArray()
        //     res.send(result)
        // })
        app.get('/projects/details/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await projectsCollection.find(query).toArray()
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(err => console.log(err))


app.listen(port, () => {
    console.log(`server is runnig on port ${port}`)
})
