import axios from 'axios';

const CancelToken = axios.CancelToken
let cancel: any

export function getItems(urlPath: string, cancelPreviousRequest: boolean): Promise<any> {
    if (cancelPreviousRequest && cancel !== undefined) {
        cancel()
    }

    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: urlPath,
            cancelToken: new CancelToken((c) => {
                cancel = c
            })
        })
        .then((response) => {
            resolve(response.data)
        })
        .catch((response) => {
            reject(response)
        })
    })
}

export function deleteItem(urlPath: string, id: string, cancelPreviousRequest: boolean, payload = null): Promise<any> {
    if (cancelPreviousRequest && cancel !== undefined) {
        cancel()
    }
    return new Promise((resolve, reject) => {
        axios({
            method: 'delete',
            url: `${urlPath}/${id}`,
            cancelToken: new CancelToken((c) => {
                cancel = c
            }),
            data: payload
        })
            .then((response) => {
                resolve(response.data)
            })
            .catch((response) => {
                reject(response)
            })
    })
}

export function postItem(urlPath: string, item: any, cancelPreviousRequest: boolean): Promise<any> {
    if (cancelPreviousRequest && cancel !== undefined) {
        cancel()
    }

    return new Promise((resolve, reject) => {
        axios({
        method: 'post',
        url: urlPath,
        cancelToken: new CancelToken((c) => {
        cancel = c
        }),
        data: item
        })
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

export default {
    getItems,
    deleteItem,
    postItem
}