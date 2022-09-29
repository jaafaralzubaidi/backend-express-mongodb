
const print = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.log(`[${namespace}] ${message}`, object);
    } else {
        console.log(`[${namespace}] ${message}`);
    }
};

export default { print };