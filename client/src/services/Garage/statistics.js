import axiosConfig from "../../axiosConfig";

export const apiStatTask = (garageId, options) => new Promise(async (resolve, reject) => {
    try {
        let url = `/api/v1/stat/${garageId}`;
        let params = {};

        if (options.mechanicId) {
            params.mechanicId = options.mechanicId;
        }
        if (options.startTime) {
            params.startTime = options.startTime;
        }
        if (options.endTime) {
            params.endTime = options.endTime;
        }

        const response = await axiosConfig({
            method: 'get',
            url: url,
            params: params
        });

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetRankingMechanic = (garageId) => new Promise(async (resolve, reject) => {
    try {
        let url = `/api/v1/stat/${garageId}/ranking`;
    
        const response = await axiosConfig({
            method: 'get',
            url: url
        });

        resolve(response)
    } catch (error) {
        reject(error)
    }
})