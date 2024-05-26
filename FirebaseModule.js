var FirebaseModule = {
    get: function (url) {
        return new Promise(function (resolve, reject) {
            let req = new XMLHttpRequest();

            req.onload = () => {
                if (req.readyState == 4)
                    if (req.status == 200) {
                        if (callback)
                            resolve(req.response);
                        else
                            reject(req.response);
                    } else
                        reject(req.response);
            }

            req.onerror = (err) => {
                window.alert('Error encountered!');
                window.alert(err);
            }

            req.open('GET', url, true);
            req.setRequestHeader('Content-Type', 'application/json');
            req.send();
        });
    },

    patch: function (url, data) {
        return new Promise(function (resolve, reject) {
            let req = new XMLHttpRequest();

            req.onload = () => {
                if (req.readyState == 4)
                    if (req.status == 200) {
                        if (callback)
                            resolve(req.response);
                        else
                            reject(req.response);
                    } else
                        reject(req.response);
            }

            req.onerror = (err) => {
                window.alert('Error encountered! ' + err);
            }

            req.open('PATCH', url, true);
            req.setRequestHeader('Content-Type', 'application/json');
            req.send(data);
        });
    }
}
