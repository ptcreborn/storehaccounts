

// this requires JBLOBFunctions.js !!


var RecordUserLogs = {
    create: function (blobLink, thumb, action, title, date, link) {
        return new Promise(function (resolve, reject) {
            JBLOBFunctions.PUTRecordBlob(blobLink, function (new_data) {
                let logs_data = {
                    "thumbnail": thumb,
                    "action": action,
                    "title": title,
                    "link": link,
                    "date": date
                };

                if (new_data.hasOwnProperty('logs')) {
                    new_data.logs.push(logs_data);
                } else {
                    new_data["logs"] = [logs_data];
                }

                return new_data;
            }, function (new_data) {
                resolve(new_data);
            });
        });
    }
}
