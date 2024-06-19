import db from "../models";
import { v4 } from "uuid";

// done
export const createFirebaseTokenServices = (user_id, firebaseToken) => new Promise(async (resolve, reject) => {
    try {
        // Tìm kiếm bản ghi với user_id
        let existingTokenRecord = await db.FirebaseToken.findOne({ where: { user_id } });

        if (existingTokenRecord) {
            if (existingTokenRecord.firebaseToken !== firebaseToken) {
                // cập nhật token cho user
                existingTokenRecord.firebaseToken = firebaseToken;
                await existingTokenRecord.save();
                resolve({
                    err: 0,
                    msg: "Device token reassigned to successfully",
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
