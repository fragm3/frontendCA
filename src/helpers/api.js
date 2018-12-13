import axios from 'axios';

const baseurl = "http://localhost:8000/";

export function api(url, filters) {
    var bodyFormData = new FormData();
    console.log(filters)
    for (var i = 0; i < filters.length; i++) {
        bodyFormData.set(filters[i][0], filters[i][1]);
    }
    return axios({
        method: 'post',
        baseURL: {
            baseurl
        }.baseurl,
        url: url,
        data: bodyFormData,
        config: {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    }).then(response => response.data)
}