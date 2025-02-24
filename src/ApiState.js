async function handleApiState(apiFunction) {
    try {
        let loading = true;
        console.log('Loading...');
        const res = await apiFunction();
        loading = false;
        return { data: res.data, error: res.error, loading };
    } catch (error) {
        return { data: null, error: error.message || 'An error occurred', loading: false };
    }
}
module.exports = { handleApiState };