import db from "../models";
import { v4 } from "uuid";

// done
export const createFirebaseTokenServices = (user_id, firebaseToken) => new Promise(async (resolve, reject) => {
    try {
        // Tìm kiếm bản ghi với firebaseToken
        let existingTokenRecord = await db.FirebaseToken.findOne({ where: { firebaseToken } });

        if (existingTokenRecord) {
            if (existingTokenRecord.user_id !== user_id) {
                // Token thuộc về tài khoản khác, cập nhật user_id
                existingTokenRecord.user_id = user_id;
                await existingTokenRecord.save();
                resolve({
                    err: 0,
                    msg: "Device token reassigned to new user successfully",
                });
            } else {
                // Token đã tồn tại và thuộc về cùng user_id
                resolve({
                    err: 2,
                    msg: "Device token already exists for this user",
                });
            }
        } else {
            // Token chưa tồn tại, tạo mới bản ghi
            await db.FirebaseToken.create({
                id: v4(),
                user_id,
                firebaseToken
            });
            resolve({
                err: 0,
                msg: "Insert device token to db successfully",
            });
        }
    } catch (error) {
        reject(error);
    }
});
