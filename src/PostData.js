export function PostData(type,userData){

    let BaseUrl = 'http://localhost:8080/';

    return new Promise((resolve, reject) => {

        fetch(BaseUrl+type, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then((response) => response.json())
        .then((Result) => {
            resolve(Result);
        })
        .catch((error) =>{
            reject(error);
        })
    })

}