// models/TeaModel.js

let teas = [];
let id = 0;

class TeaModel {
    // Add single or multiple teas
    static addTea(teaData) {
        if (Array.isArray(teaData)) {
            const newTeas = teaData.map(tea => {
                const { name, price, description, image } = tea;
                // Check if tea with the same name already exists
                if (teas.some(existingTea => existingTea.name === name)) {
                    return null; // Skip adding if the tea already exists
                }
                return { id: ++id, name, price, description, image };
            }).filter(tea => tea !== null); // Remove null values (duplicate entries)
            teas.push(...newTeas);
            return newTeas;
        } else {
            const { name, price, description, image } = teaData;
            // Check if tea with the same name already exists
            if (teas.some(existingTea => existingTea.name === name)) {
                return null; // Skip adding if the tea already exists
            }
            const newTea = { id: ++id, name, price, description, image };
            teas.push(newTea);
            return newTea;
        }
    }

    // Get all teas
    static getAllTeas() {
        return teas;
    }

    // Get a tea by ID
    static getTeaById(teaId) {
        return teas.find(tea => tea.id === parseInt(teaId));
    }

    // Update a single tea by ID
    static updateTeaById(teaId, updatedData) {
        const tea = teas.find(tea => tea.id === parseInt(teaId));
        if (tea) {
            tea.name = updatedData.name || tea.name;
            tea.price = updatedData.price || tea.price;
            tea.description = updatedData.description || tea.description;
            tea.image = updatedData.image || tea.image;
            return tea;
        }
        return null;
    }

    // Bulk Update Teas
    static bulkUpdateTeas(teaUpdates) {
        const updatedTeas = [];
        teaUpdates.forEach(update => {
            const tea = teas.find(t => t.id === update.id);
            if (tea) {
                tea.name = update.name || tea.name;
                tea.price = update.price || tea.price;
                tea.description = update.description || tea.description;
                tea.image = update.image || tea.image;
                updatedTeas.push(tea);
            }
        });
        return updatedTeas;
    }

    // Delete a single tea by ID
    static deleteTeaById(teaId) {
        const index = teas.findIndex(tea => tea.id === parseInt(teaId));
        if (index !== -1) {
            teas.splice(index, 1);
            return true;
        }
        return false;
    }

    // Bulk Delete Teas
    static bulkDeleteTeas(ids) {
        const initialLength = teas.length;
        teas = teas.filter(tea => !ids.includes(tea.id));
        return initialLength - teas.length;
    }

    // Delete All Teas
    static deleteAllTeas() {
        const initialLength = teas.length;
        teas = []; // Reset the array
        id = 0; // Reset the ID counter
        return initialLength; // Return the number of deleted teas
    }
}

export default TeaModel;
