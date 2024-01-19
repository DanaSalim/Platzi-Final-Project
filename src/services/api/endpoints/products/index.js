import api, {API_ENDPOINTS} from "../../api";
import { createPathWithId, createPathWithParams } from "../../../../helpers/URLHelper";

/**
 * @param {Object<string, string | number>} params
 * @return {Promise<Array<Object>>}
 */
async function getAllProducts(params = {}) {
    if(params.limit !== undefined && params.offset === undefined){
        params.offset = 0;
    }
    const {data} = await api.get(createPathWithParams(API_ENDPOINTS.PRODUCT, params));
    return data;
}

/**
 * @param {Object<string, string | number>} params
 * @return {Promise<Array<Object>>}
 */
async function getProductById(id) {
    const {data} = await api.get(createPathWithId(API_ENDPOINTS.PRODUCT, id));
    return data;
}

export {
    getAllProducts,
    getProductById
};