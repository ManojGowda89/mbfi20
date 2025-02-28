const fs = require("fs");
const crypto = require("crypto");
const filePath = "./state.json";

let schemaRegistry = {}; // Store schema definitions
let functionRegistry = {}; // Store functions separately

// Read state from file
const readState = () => {
    try {
        if (!fs.existsSync(filePath)) return { documents: [], functions: {} };
        const data = fs.readFileSync(filePath, "utf8");
        return data ? JSON.parse(data) : { documents: [], functions: {} };
    } catch (error) {
        console.error("Error reading state file:", error);
        return { documents: [], functions: {} };
    }
};

// Write state to file
const writeState = (newState) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(newState, null, 2), "utf8");
    } catch (error) {
        console.error("Error writing to state file:", error);
    }
};

// Generate a random unique ID
const generateId = () => crypto.randomUUID();

// Define a schema
const defineSchema = (schemaName, schema) => {
    schemaRegistry[schemaName] = schema;
};

// Validate data against schema
const validateSchema = (schemaName, data) => {
    const schema = schemaRegistry[schemaName];
    if (!schema) {
        throw new Error(`Schema "${schemaName}" is not defined.`);
    }
    for (const key in schema) {
        if (!data.hasOwnProperty(key)) {
            throw new Error(`Missing required field: "${key}"`);
        }
        if (typeof data[key] !== schema[key]) {
            throw new Error(`Invalid type for "${key}". Expected ${schema[key]}, got ${typeof data[key]}`);
        }
    }
};

// Create a document (Prevent Duplicates)
const createDocument = (schemaName, data) => {
    validateSchema(schemaName, data);
    const state = readState();

    // Check for existing document
    const exists = state.documents.some(doc =>
        doc.schema === schemaName &&
        Object.keys(data).every(key => doc[key] === data[key])
    );

    if (exists) {
        console.log("Document already exists:", data);
        return null;
    }

    const newDocument = { id: generateId(), ...data, schema: schemaName };
    state.documents.push(newDocument);
    writeState(state);
    return newDocument;
};

// Find all documents
const findAllDocuments = (schemaName) => {
    const state = readState();
    return state.documents.filter(doc => doc.schema === schemaName);
};

// Find a document by multiple fields
const findOneDocument = (schemaName, query) => {
    const state = readState();
    return state.documents.find(doc =>
        doc.schema === schemaName &&
        Object.keys(query).every(key => doc[key] === query[key])
    ) || null;
};

// Find by ID
const findById = (schemaName, id) => {
    const state = readState();
    return state.documents.find(doc => doc.schema === schemaName && doc.id === id) || null;
};

// Update by multiple fields
const updateDocument = (schemaName, query, newData) => {
    const state = readState();
    const index = state.documents.findIndex(doc =>
        doc.schema === schemaName &&
        Object.keys(query).every(key => doc[key] === query[key])
    );

    if (index === -1) return null;

    state.documents[index] = { ...state.documents[index], ...newData };
    writeState(state);
    return state.documents[index];
};

// Update by ID
const updateById = (schemaName, id, newData) => {
    const state = readState();
    const index = state.documents.findIndex(doc => doc.schema === schemaName && doc.id === id);
    if (index === -1) return null;

    state.documents[index] = { ...state.documents[index], ...newData };
    writeState(state);
    return state.documents[index];
};

// Delete by multiple fields
const deleteDocument = (schemaName, query) => {
    const state = readState();
    const filteredDocs = state.documents.filter(doc =>
        !(doc.schema === schemaName &&
        Object.keys(query).every(key => doc[key] === query[key]))
    );

    if (filteredDocs.length === state.documents.length) return false;

    state.documents = filteredDocs;
    writeState(state);
    return true;
};

// Delete by ID
const deleteById = (schemaName, id) => {
    const state = readState();
    const filteredDocs = state.documents.filter(doc => doc.schema !== schemaName || doc.id !== id);
    if (filteredDocs.length === state.documents.length) return false;

    state.documents = filteredDocs;
    writeState(state);
    return true;
};

// ✅ Store a function
const storeFunction = (name, fn) => {
    if (typeof fn !== "function") {
        throw new Error("Only functions can be stored.");
    }

    const state = readState();
    functionRegistry[name] = fn.toString(); // Store function as string
    state.functions[name] = fn.toString();
    writeState(state);
};

// ✅ Fetch a stored function
const fetchFunction = (name) => {
    const state = readState();
    if (!state.functions[name]) return null;

    return new Function(`return ${state.functions[name]}`)();
};

// ✅ Execute a stored function
const executeFunction = (name, ...args) => {
    const fn = fetchFunction(name);
    if (!fn) throw new Error(`Function "${name}" not found.`);
    return fn(...args);
};

// ✅ Get all stored functions
const getAllFunctions = () => {
    const state = readState();
    return Object.keys(state.functions);
};

// ✅ Delete a stored function
const deleteFunction = (name) => {
    const state = readState();
    if (!state.functions[name]) return false;

    delete state.functions[name];
    writeState(state);
    return true;
};

// Export functions
module.exports = {
    defineSchema,
    createDocument,
    findAllDocuments,
    findOneDocument,
    findById,
    updateDocument,
    updateById,
    deleteDocument,
    deleteById,
    storeFunction,
    fetchFunction,
    executeFunction,
    getAllFunctions,
    deleteFunction
};
