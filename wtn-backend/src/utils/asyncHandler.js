// This function is used to handle try/catch error in controllers.
const asynHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

export default asynHandler;
