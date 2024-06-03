
const checkGarage = (req, res, next) => {

    const role = req.user.role;
    
    if (role === "garage")
        next()
    else {
        return res.status(403).json({
            err: 1,
            msg: "Your account is not authorized to perform this action"
        })
    }
}

export default checkGarage;