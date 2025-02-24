const fs = require("fs");
const filePath = "./state.json";

let functionRegistry = {}; // Store functions separately

// Read state from file
const readState = () => {
    try {
        if (!fs.existsSync(filePath)) return {};
        const data = fs.readFileSync(filePath, "utf8");
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error("Error reading state file:", error);
        return {};
    }
};

// Write to file only if the state has changed
const writeState = (newState) => {
    try {
        const currentState = readState();
        if (JSON.stringify(currentState) !== JSON.stringify(newState)) {
            fs.writeFileSync(filePath, JSON.stringify(newState, null, 2), "utf8");
        }
    } catch (error) {
        console.error("Error writing to state file:", error);
    }
};

// Set state function (handles both data & functions)
const setState = (newState) => {
    if (typeof newState === "object" && newState !== null) {
        const currentState = readState();
        const updatedState = { ...currentState };

        Object.entries(newState).forEach(([key, value]) => {
            if (typeof value === "function") {
                functionRegistry[key] = value; // Store functions separately
                updatedState[key] = key; // Store function name as string
            } else {
                updatedState[key] = value;
            }
        });

        writeState(updatedState);
    } else {
        throw new Error("setState requires an object as input");
    }
};

// Get state functions
const getState = (key) => {
    const state = readState();
    return functionRegistry[key] || state[key] || null; // Return function from registry if exists
};

// Get all state
const getAllState = () => {
    const state = readState();
    return { ...state, ...functionRegistry }; // Merge stored data with function registry
};

module.exports = { setState, getState, getAllState };
