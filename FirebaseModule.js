

var FirebaseModule = {
    tries: 1,
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
                window.alert("Error detected in FirebaseModule: " + req.statusText + ". Please reload the page and try again!");
            }

            req.open('GET', url, true);
            req.setRequestHeader('Content-Type', 'application/json');
            req.send();
        });
    },


    fetchJSON: async function (json_url) {
        let data = await fetch(json_url);        
        if (data.status != 200 && FirebaseModule.tries < 5) {
            setTimeout(async () => {
                FirebaseModule.tries++;
                data = await FirebaseModule.fetchJSON(json_url);                
            }, 2500);
        }
        if(FirebaseModule.tries == 5) {
            FirebaseModule.tries = 1;
            return;
        }
        data = await data.json();
        return (data == "" ? data : JSON.parse(data));
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
                window.alert("Error detected in FirebaseModule: " + req.statusText + ". Please reload the page and try again!");
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
                window.alert("Error detected in FirebaseModule: " + req.statusText + ". Please reload the page and try again!");
            }

            req.open('POST', url, true);
            req.setRequestHeader('Content-Type', 'application/json');
            req.send(data);
        });
    }
}
