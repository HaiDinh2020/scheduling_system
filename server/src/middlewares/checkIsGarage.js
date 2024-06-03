
const checkIsGarage = (req, res, next) => {

    const role = req.user.role;
    
    if (role === "garage")
        return res.status(403).json({
            err: 1,
            msg: "Your account is not authorized to perform this action"
        })
    else {
        next()
    }
}

export default checkIsGarage;