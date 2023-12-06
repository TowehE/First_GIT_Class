const requestInfo = (req,res,next) => {
    req.date = Date()
    console.log(`This API was called on ${req.reqTime} , with a method of ${req.method} , and the URL is ${req.url}`)
    next()
}
module.exports = requestInfo 