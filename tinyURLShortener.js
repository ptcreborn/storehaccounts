
var tinyURLShortener = {
    shortenUrl: async function (url) {
        let new_url = '';
        let body = {
            url: url,
            domain: 'tinyurl.com' //domain: 'tiny.one'
        }

        let response = await fetch('https://api.tinyurl.com/create', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                authorization: 'Bearer 2nLQGpsuegHP8l8J0Uq1TsVkCzP3un3T23uQ5YovVf5lvvGOucGmFOYRVj6L',
                'content-type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        response = await response.json();

        return response.data.tiny_url;
    }
}
