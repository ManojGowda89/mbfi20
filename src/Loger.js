const logRequest = (req, res, next) => {
    const start = Date.now();
    res.on('finish', async () => {
        const duration = Date.now() - start;
        const log = {
            timestamp: new Date().toISOString(),
            method: req.method,
            path: req.path,
            query: req.query,
            status: res.statusCode,
            duration: `${duration}ms`,
            userAgent: req.headers['user-agent'],
            ip: req.ip,
            owner: req.tokenDetails?.owner || 'anonymous'
        };

       

        try {
            console.log(log)
      
        } catch (error) {
            console.error('Error saving log to database:', error);
        }
    });
    next();
};

module.exports = {logRequest};