import 'dotenv/config'
import express from 'express'
import userRoutes from './routes/userRoutes.js'
import teaRoutes from './routes/teaRoutes.js'

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

let teas = []
let id = 0

app.get('/', (req, res) => {
    res.send(`Hello Tea World!`)
})

// // Add a new tea or multiple teas
// app.post('/teas', (req, res) => {
//     const teaData = req.body

//     if (Array.isArray(teaData)) {
//         const newTeas = teaData.map(tea => {
//             const { name, price, description, image } = tea
//             return { id: ++id, name, price, description, image }
//         })
//         teas.push(...newTeas)
//         res.status(201).send({ message: 'Teas added successfully', teas: newTeas })
//     } else {
//         const { name, price, description, image } = teaData
//         const newTea = { id: ++id, name, price, description, image }
//         teas.push(newTea)
//         res.status(201).send(newTea)
//     }
// })

// // Get all teas
// app.get('/teas', (req, res) => {
//     res.status(200).send(teas)
// })

// // Get a tea by id
// app.get('/teas/:id', (req, res) => {
//     const tea = teas.find(tea => tea.id === parseInt(req.params.id))
//     if (tea) {
//         res.status(200).send(tea)
//     } else {
//         res.status(404).send('Tea not found')
//     }
// })

// // Update a single tea by id
// app.put('/teas/:id', (req, res) => {
//     const tea = teas.find(tea => tea.id === parseInt(req.params.id))
//     if (tea) {
//         tea.name = req.body.name
//         tea.price = req.body.price
//         tea.description = req.body.description
//         tea.image = req.body.image
//         res.status(200).send(tea)
//     } else {
//         res.status(404).send('Tea not found')
//     }
// })

// // 🛠️ Bulk Update Teas
// app.put('/teas', (req, res) => {
//     const teaUpdates = req.body // Expecting an array of tea objects with id
//     if (!Array.isArray(teaUpdates)) {
//         return res.status(400).send('Expected an array of tea updates')
//     }

//     const updatedTeas = []

//     teaUpdates.forEach(update => {
//         const tea = teas.find(t => t.id === update.id)
//         if (tea) {
//             tea.name = update.name || tea.name
//             tea.price = update.price || tea.price
//             tea.description = update.description || tea.description
//             tea.image = update.image || tea.image
//             updatedTeas.push(tea)
//         }
//     })

//     if (updatedTeas.length === 0) {
//         return res.status(404).send('No teas updated. Check your IDs.')
//     }

//     res.status(200).send({ message: 'Teas updated successfully', teas: updatedTeas })
// })

// // 🛠️ Bulk Delete Teas
// app.delete('/teas', (req, res) => {
//     const { ids } = req.body // Expecting an array of tea IDs
//     if (!Array.isArray(ids)) {
//         return res.status(400).send('Expected an array of tea IDs')
//     }

//     const initialLength = teas.length
//     teas = teas.filter(tea => !ids.includes(tea.id))
//     const deletedCount = initialLength - teas.length

//     if (deletedCount === 0) {
//         return res.status(404).send('No teas deleted. Check your IDs.')
//     }

//     res.status(200).send({ message: 'Teas deleted successfully', deletedCount })
// })

// // Delete a single tea by id
// app.delete('/teas/:id', (req, res) => {
//     const index = teas.findIndex(tea => tea.id === parseInt(req.params.id))
//     if (index !== -1) {
//         teas.splice(index, 1)
//         res.status(200).send('Tea deleted successfully')
//     } else {
//         res.status(404).send('Tea not found')
//     }
// })


// Tea Routes
app.use('/teas', teaRoutes)
// User Routes
app.use('/users', userRoutes)

app.listen(port, () => {
    console.log(`Server is running at app listening on port ${port}...`)
})
