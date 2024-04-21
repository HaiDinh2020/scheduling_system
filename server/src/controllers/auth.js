import { loginService, registerService } from "../services/auth"

export const login = async (req, res) => {
    const { email, password} = req.body
    try {
        if( !email || !password) {
            return res.status(400).json({
                err:1,
                msg:"Missing input!"
            })
        }
        
        const response = await loginService(req.body)
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller' + error
        })
    }

}

export const register = async (req, res) => {
    const {name, email, password, role} = req.body
    console.log(req)
    try {    
        if(!name || !email || !password) {
            return res.status(400).json({
                err:1,
                msg:"Missing input!"
            })
        }

        if(role === 'garage') {
            const {garageName, introduce, address, services, businessHours} = req.body
            if(!garageName || !introduce || !services || !businessHours ) {
                return res.status(400).json({
                    err:1,
                    msg:"Missing input!"
                })
            }
        }

        const response = await registerService(req.body)
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller' + error
        })
    }

}

