import express from 'express';
import TeaModel from '../models/TeaModel.js';
import logger from '../logger.js';

const router = express.Router();

// Add a new tea or multiple teas
router.post('/', (req, res) => {
    try {
        const teaData = req.body;
        const result = TeaModel.addTea(teaData);
        if (Array.isArray(result)) {
            logger.info('Teas added successfully', { teas: result });
            res.status(201).send({ message: 'Teas added successfully', teas: result });
        } else {
            logger.info('Tea added successfully', result);
            res.status(201).send(result);
        }
    } catch (error) {
        logger.error('Error adding tea(s)', error);
        res.status(500).send('An error occurred while adding tea(s).');
    }
});

// Get all teas
router.get('/', (req, res) => {
    try {
        const teas = TeaModel.getAllTeas();
        logger.info('Fetched all teas', { teas });
        res.status(200).send(teas);
    } catch (error) {
        logger.error('Error fetching teas', error);
        res.status(500).send('An error occurred while fetching teas.');
    }
});

// Get a tea by ID
router.get('/:id', (req, res) => {
    try {
        const tea = TeaModel.getTeaById(req.params.id);
        if (tea) {
            logger.info('Fetched tea by ID', { id: req.params.id, tea });
            res.status(200).send(tea);
        } else {
            logger.warn('Tea not found', { id: req.params.id });
            res.status(404).send('Tea not found');
        }
    } catch (error) {
        logger.error('Error fetching tea by ID', error);
        res.status(500).send('An error occurred while fetching the tea.');
    }
});

// Update a single tea by ID
router.put('/:id', (req, res) => {
    try {
        const updatedTea = TeaModel.updateTeaById(req.params.id, req.body);
        if (updatedTea) {
            logger.info('Tea updated successfully', { id: req.params.id, updatedTea });
            res.status(200).send(updatedTea);
        } else {
            logger.warn('Tea not found for update', { id: req.params.id });
            res.status(404).send('Tea not found');
        }
    } catch (error) {
        logger.error('Error updating tea', error);
        res.status(500).send('An error occurred while updating the tea.');
    }
});

// Bulk Update Teas
router.put('/', (req, res) => {
    try {
        const teaUpdates = req.body;
        if (!Array.isArray(teaUpdates)) {
            logger.warn('Invalid bulk update request', { body: req.body });
            return res.status(400).send('Expected an array of tea updates');
        }
        const updatedTeas = TeaModel.bulkUpdateTeas(teaUpdates);
        if (updatedTeas.length === 0) {
            logger.warn('No teas updated', { teaUpdates });
            res.status(404).send('No teas updated. Check your IDs.');
        } else {
            logger.info('Teas updated successfully', { updatedTeas });
            res.status(200).send({ message: 'Teas updated successfully', teas: updatedTeas });
        }
    } catch (error) {
        logger.error('Error in bulk updating teas', error);
        res.status(500).send('An error occurred while updating teas.');
    }
});

// Clear All Teas
router.delete('/delete_all', (req, res) => {
    try {
        const deletedCount = TeaModel.deleteAllTeas();
        logger.info('All teas deleted', { deletedCount });
        res.status(200).send({
            message: 'All teas have been deleted successfully',
            deletedCount
        });
    } catch (error) {
        logger.error('Error clearing all teas', error);
        res.status(500).send('An error occurred while clearing all teas.');
    }
});

// Delete a single tea by ID
router.delete('/:id', (req, res) => {
    try {
        const deleted = TeaModel.deleteTeaById(req.params.id);
        if (deleted) {
            logger.info('Tea deleted successfully', { id: req.params.id });
            res.status(200).send('Tea deleted successfully');
        } else {
            logger.warn('Tea not found for deletion', { id: req.params.id });
            res.status(404).send('Tea not found');
        }
    } catch (error) {
        logger.error('Error deleting tea by ID', error);
        res.status(500).send('An error occurred while deleting the tea.');
    }
});

// Bulk Delete Teas
router.delete('/', (req, res) => {
    try {
        const { ids } = req.body;
        if (!Array.isArray(ids)) {
            logger.warn('Invalid bulk delete request', { body: req.body });
            return res.status(400).send('Expected an array of tea IDs');
        }
        const deletedCount = TeaModel.bulkDeleteTeas(ids);
        if (deletedCount === 0) {
            logger.warn('No teas deleted', { ids });
            res.status(404).send('No teas deleted. Check your IDs.');
        } else {
            logger.info('Teas deleted successfully', { deletedCount });
            res.status(200).send({ message: 'Teas deleted successfully', deletedCount });
        }
    } catch (error) {
        logger.error('Error in bulk deleting teas', error);
        res.status(500).send('An error occurred while deleting teas.');
    }
});

export default router;
