

var FirebaseModule = {
    get: function (url) {
        return new Promise(function (resolve, reject) {
            let req = new XMLHttpRequest();

            req.onload = () => {
                if (req.readyState == 4)
                    if (req.status == 200)
                        resolve(req.response);
                    else
                        reject(req.response);
            }

            req.onerror = (err) => {
                window.alert("Error detected in FirebaseModule: " + req.statusText);
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
                    if (req.status == 200)
                        resolve(req.response);
                    else
                        reject(req.response);
            }

            req.onerror = (err) => {
                window.alert("Error detected in FirebaseModule: " + req.statusText);
            }

            req.open('PATCH', url, true);
            req.setRequestHeader('Content-Type', 'application/json');
            req.send(data);
        });
    },
	
	post: function (url, data) {
        return new Promise(function (resolve, reject) {
            let req = new XMLHttpRequest();

            req.onload = () => {
                if (req.readyState == 4)
                    if (req.status == 200)
                        resolve(req.response);
                    else
                        reject(req.response);
            }

            req.onerror = (err) => {
                window.alert("Error detected in FirebaseModule: " + req.statusText);
            }

            req.open('POST', url, true);
            req.setRequestHeader('Content-Type', 'application/json');
            req.send(data);
        });
    }
}
