export const generateUsername = (name: string, ): string => {
    const randomNumbers = Math.floor(1000 + Math.random() * 9000);
    return `${name.toLowerCase()}${randomNumbers}`;
  };