export const fetchFigmaApi = async (url: string): Promise<any> => {
  try {
    return await fetch(`https://api.figma.com/v1/images/${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Figma-Token': process.env.FIGMA_TOKEN || '',
      },
    });
  } catch (error) {
    throw error;
  }
};

export interface ReturnFromFigma {
  images: {
    [id: string]: string; // Typing `url` as a string
  };
}
