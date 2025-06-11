

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
        if (data.status != 200 && FB.tries < 10) {
            setTimeout(async () => {
                console.log('retrying access...');
                FB.tries++;
                data = await FB.fetchJSON(json_url);                
            }, 2000);
        }
        if(FB.tries == 10) {
            FB.tries = 1;
            return;
        }
        data = data.json();
        return JSON.parse(data);
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
