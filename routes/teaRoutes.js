// routes/teaRoutes.js

import express from 'express'
import TeaModel from '../models/TeaModel.js'
import logger from '../logger.js'

const router = express.Router()

// Add a new tea or multiple teas
router.post('/', (req, res) => {
    const teaData = req.body
    const result = TeaModel.addTea(teaData)
    if (Array.isArray(result)) {
        res.status(201).send({ message: 'Teas added successfully', teas: result })
    } else {
        res.status(201).send(result)
    }
})

// Get all teas
router.get('/', (req, res) => {
    logger.info('200', TeaModel.getAllTeas())
    res.status(200).send(TeaModel.getAllTeas())
})

// logger.info("This is an info message");
// logger.error("This is an error message");
// logger.warn("This is a warning message");
// logger.debug("This is a debug message");
// Get a tea by ID
router.get('/:id', (req, res) => {
    const tea = TeaModel.getTeaById(req.params.id)
    if (tea) {
        res.status(200).send(tea)
    } else {
        res.status(404).send('Tea not found')
    }
})

// Update a single tea by ID
router.put('/:id', (req, res) => {
    const updatedTea = TeaModel.updateTeaById(req.params.id, req.body)
    if (updatedTea) {
        res.status(200).send(updatedTea)
    } else {
        res.status(404).send('Tea not found')
    }
})

// Bulk Update Teas
router.put('/', (req, res) => {
    const teaUpdates = req.body
    if (!Array.isArray(teaUpdates)) {
        return res.status(400).send('Expected an array of tea updates')
    }
    const updatedTeas = TeaModel.bulkUpdateTeas(teaUpdates)
    if (updatedTeas.length === 0) {
        res.status(404).send('No teas updated. Check your IDs.')
    } else {
        res.status(200).send({ message: 'Teas updated successfully', teas: updatedTeas })
    }
})

// 🆕 Clear All Teas
router.delete('/delete_all', (req, res) => {
    const deletedCount = TeaModel.deleteAllTeas();
    res.status(200).send({
        message: 'All teas have been deleted successfully',
        deletedCount
    })
})
// Delete a single tea by ID
router.delete('/:id', (req, res) => {
    const deleted = TeaModel.deleteTeaById(req.params.id)
    if (deleted) {
        res.status(200).send('Tea deleted successfully')
    } else {
        res.status(404).send('Tea not found')
    }
})

// Bulk Delete Teas
router.delete('/', (req, res) => {
    const { ids } = req.body
    if (!Array.isArray(ids)) {
        return res.status(400).send('Expected an array of tea IDs')
    }
    const deletedCount = TeaModel.bulkDeleteTeas(ids)
    if (deletedCount === 0) {
        res.status(404).send('No teas deleted. Check your IDs.')
    } else {
        res.status(200).send({ message: 'Teas deleted successfully', deletedCount })
    }
})



export default router
