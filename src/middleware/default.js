function defaultEndpoint(req, res){
    res.status(404).send('404 NOT FOUND')
}

export { defaultEndpoint }