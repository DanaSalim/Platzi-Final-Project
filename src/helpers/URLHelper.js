/**
 * @param {string} segment
 * @param {number} id
 * @return {string}
 */
export function createPathWithId(segment, id) {
    return `${segment}/${id}`;
}

/**
 * @param {string} segment
 * @param {Object<string, string | number>} params
 * @return {string}
 */
export function createPathWithParams(segment, params) {
    const searchParams = new URLSearchParams();

    for(let [name, value] of Object.entries(params)){
        searchParams.append(name, value);
    }
    
    return `${segment}?${searchParams.toString()}`;
}