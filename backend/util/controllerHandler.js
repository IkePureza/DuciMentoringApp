const controllerHandler = (promise, params) => async (req, res, next) => {
    const boundParams = params ? params(req, res, next) : [];
    try {
      const result = await promise(...boundParams);
      return res.ok(result || { message: 'OK' });
    } catch (e) {
      return res.handleError(e);
    }
};
export default controllerHandler;