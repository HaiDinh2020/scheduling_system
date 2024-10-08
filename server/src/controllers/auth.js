import { getNewAccessToken, loginService, registerService } from "../services/auth"
import { validateEmail, validatePhone, validateExactAdrress } from "../validators/Validator"

export const login = async (req, res) => {
    const { email, password } = req.body
    try {

        const isValidEmail = validateEmail(email);

        if (!email || !password) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input!"
            })
        }

        if (!isValidEmail) {
            return res.status(400).json({
                err: 1,
                msg: "Invalid email"
            });
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
    const { name, email, password, role } = req.body
    // console.log(req)
    // try {
    if (!name || !email || !password) {
        return res.status(400).json({
            err: 1,
            msg: "Missing input!"
        })
    }

    if (role === 'garage') {
        const { garageName, introduce, exactAddress, services, businessHours } = req.body
        if (!garageName || !introduce || !services || !businessHours || !exactAddress) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input!"
            })
        }
        console.log(exactAddress, exactAddress.split(", "))
        // validate garage 
        if (!validateExactAdrress(exactAddress)) {
            return res.status(400).json({
                err: 1,
                msg: "Invalid exactAddress"
            });
        }

    } else if (role === 'mechanic') {
        const { garage_id, major } = req.body
        if (!garage_id || !major) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input"
            })
        }
    }

    // throw new Error("error check")
    const response = await registerService(req.body)
    // console.log("aaa")
    return res.status(200).json(response);
    // } catch (error) {
    //     console.log("catch throw")
    //     return res.status(500).json({
    //         err: -1,
    //         msg: 'Fail at auth controller' + error
    //     })
    // }
}

export const refreshToken = async (req, res) => {

    const refreshToken = req.body.refreshToken;

    getNewAccessToken(refreshToken)
        .then(accessToken => res.json({ accessToken }))
        .catch(err => {
            console.log(err)
            return res.status(403).json({ error: err })
        });

}
