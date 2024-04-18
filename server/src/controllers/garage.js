import * as services from "../services/garage";

export const getInfor = async (req, res) => {
    try {
        const { id } = req.user

        const response = await services.getGarageInfor(id)
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller' + error
        })
    }

}