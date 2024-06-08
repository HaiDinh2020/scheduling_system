import * as services from "../services/user";
import pool from "../config/connectDB";

export const getCurrentProfile = async (req, res) => {
    try {
        const { id } = req.user

        const response = await services.getCurrentProfileServices(id)
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller' + error
        })
    }

}


export const updateProfile = async (req, res) => {
    try {
        const { id, name, phone, email, avatar } = req.body
        const response = await services.updateProfileServices(id, name, phone, email, avatar)
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller' + error
        })
    }

}


/// draf
export const getUsers = async (req, res) => {
    try {
        const { id, name, phone, password, email, avatar } = req.body
        console.log(id, name, phone, password, email, avatar)
        const sql = `UPDATE users SET name = '${name}', phone = '${phone}', password = '${password}', email = '${email}', avatar = '${avatar}' WHERE id = '${id}'`;


        const response = await pool.execute(sql, (err, result) => {
            if (err) {
                return res.status(400).json({ msg: "err " + err })
            }
            return res.status(200).json({
                msg: "update success",
                data: result
            })
        })

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller' + error
        })
    }
}

export const getAllGarageHaveBeenRepair = async (req, res) => {
    try {
        const userId = req.user.id;

        const response = await services.getAllGarageHaveBeenRepairServices(userId)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: "Fail to update status: " + error
        })
    }
}