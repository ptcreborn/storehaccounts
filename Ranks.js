var Ranks = {
    getRank: function (jsonData) {
        let threadsCount = 0;
        let commentsCount = 0;
        let upvotesCount = 0;
        let total = 0;

        let ranknames = {
            "ranks": [{
                    "name": "🥇Novice",
                    "color": "#669900",
                    "points": "500"
                }, {
                    "name": "🥈Apprentice",
                    "color": "#99cc33",
                    "points": "1000"
                }, {
                    "name": "🥉Rookie",
                    "color": "#7e3110",
                    "points": "1500"
                }, {
                    "name": "🎖️Beginner",
                    "color": "#006699",
                    "points": "2000"
                }, {
                    "name": "🏅Cadet",
                    "color": "#3399cc",
                    "points": "2500"
                }, {
                    "name": "🏆Recruit",
                    "color": "#990066",
                    "points": "3000"
                }, {
                    "name": "🎯Trainee",
                    "color": "#cc3399",
                    "points": "3500"
                }, {
                    "name": "🎰Challenger",
                    "color": "#ff6600",
                    "points": "4000"
                }, {
                    "name": "🚀Player",
                    "color": "#a47e1b",
                    "points": "4500"
                }, {
                    "name": "🏹Competitor",
                    "color": "#5c3324",
                    "points": "5000"
                }, {
                    "name": "⚔️Contender",
                    "color": "#0450b4",
                    "points": "5500"
                }, {
                    "name": "🛡️Warrior",
                    "color": "#046dc8",
                    "points": "6000"
                }, {
                    "name": "🎖️Gladiator",
                    "color": "#1184a7",
                    "points": "6500"
                }, {
                    "name": "🛡️Champion",
                    "color": "#15a2a2",
                    "points": "7000"
                }, {
                    "name": "🏆Hero",
                    "color": "#6fb1a0",
                    "points": "7500"
                }, {
                    "name": "🎖️Legend",
                    "color": "#b4418e",
                    "points": "8000"
                }, {
                    "name": "🎖️Mythic",
                    "color": "#d94a8c",
                    "points": "8500"
                }, {
                    "name": "🏅Supreme",
                    "color": "#ea515f",
                    "points": "9000"
                }, {
                    "name": "🥇Grandmaster",
                    "color": "#fe7434",
                    "points": "9500"
                }, {
                    "name": "🎗️Ultimate Champion",
                    "color": "#00a6fb",
                    "points": "10000"
                }, {
                    "name": "👑Owner",
                    "color": "#18435a",
                    "points": "invulnerable"
                }
            ]
        };

        if (jsonData.hasOwnProperty('threads'))
            threadsCount = Math.ceil(parseInt(jsonData["threads"]) * 2.5);
        if (jsonData.hasOwnProperty('comments'))
            commentsCount = Math.ceil(parseInt(jsonData["comments"]) * 1.5);
        if (jsonData.hasOwnProperty('upvotes'))
            upvotesCount = Math.ceil(parseInt(jsonData["upvotes"]) * 1);

        total = threadsCount + commentsCount + upvotesCount;

        let dataOut;

        for (i = 0; i < ranknames.ranks.length - 1; i++) {
            let points = parseInt(ranknames.ranks[i].points);
            let next_points = parseInt(ranknames.ranks[i + 1].points);
            if (i == 0 && totalCount <= points) {
                dataOut = ranknames.ranks[i];
                break;
            } else if (totalCount > points && totalCount <= next_points) {
                dataOut = ranknames.ranks[i + 1];
                break;
            }
        }
		
		return dataOut;
    }
}
