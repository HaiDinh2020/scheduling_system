
export const authorizeRoles =(...roles) => (req, res, next) => {
    let userRole = req.user.role;
    if(!matchRoles(roles, userRole)) {
        return res.status(403).json({ message: 'Không có quyền truy cập' });
    }
    next();
}

const matchRoles = (roles, userRole) => {
    return roles.includes(userRole);
}