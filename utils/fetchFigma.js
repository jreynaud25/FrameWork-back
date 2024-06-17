"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFigmaApi = void 0;
const fetchFigmaApi = async (url) => {
    try {
        return await fetch(`https://api.figma.com/v1/images/${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Figma-Token': process.env.FIGMA_TOKEN || '',
            },
        });
    }
    catch (error) {
        throw error;
    }
};
exports.fetchFigmaApi = fetchFigmaApi;
