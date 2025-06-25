(async () => {
    // get the url
    await initFunctions(['supabase', 'moment']);

    let url = window.location.href;
    url = new URL(url);
    url = url.pathname;

    const comments_container = document.getElementById('ptc_comments_container');
    if (!comments_container) return;

    // main core execution
    let websitepost_id = await getWebsitePostsId(url);
    let comments_lists = await getCommentsLists(websitepost_id);
    await buildCommentsData(comments_lists);


    async function buildCommentsData(comments_data) {
        if (!comments_data) return;
        let html = ``;
        let comment_header_html = `<br/><br/><h4 class="ui inverted horizontal divider header">
  <i class="comments icon"></i>
  ${comments_data.data.length} ${comments_data.data.length > 1 ? `Comments` : `Comment`}
</h4><br/>`;
        let comment_div = document.createElement('div');
        comment_div.innerHTML = comment_header_html;
        comments_container.appendChild(comment_div);

        for (const obj of comments_data.data) {
            // build user data
            let countryname;
            let rank_data = await supabase.from('ranks').select('rank_name, rank_image').eq('id', obj.users.rank_id);
            if (!handledErrorSupabase(rank_data)) return;

            let user_data = obj.users;
            let comments_data = obj.comments;

            if (obj.users.country != "Anonymous") {
                countryname = await fetch('https://restcountries.com/v3.1/alpha/' + obj.users.country);
                countryname = await countryname.json();
                countryname = countryname[0].name.official;
            }
            let div = document.createElement('div');
            html = `<div class="ui inverted attached floating segment">
            <img class="ui right small spaced bordered avatar image" style="margin-right: 0px !important;" src="${user_data.prof_img}"/>
            <a class="ui blue label">  
    ${user_data.username} <span id="action">said</span>...
</a>
   <div class="ui basic small blue label">
     <i class="hourglass half icon" style='margin-right: 0px !important;'></i>
    ${moment(new Date(comments_data.date)).fromNow()}
  </div>
  <div class="ui red basic image label">
  <img loading="lazy" src="${user_data.country == "Anonymous" ? `https://i.ebayimg.com/images/g/BbUAAOSwLYdf02f4/s-l1200.jpg` : `https://flagsapi.com/${user_data.country}/shiny/64.png`}">
        ${countryname}
</div> 
  <div class="ui red image label">
  <img loading="lazy" src="${rank_data.data[0].rank_image}">
  ${rank_data.data[0].rank_name}
</div>
  ${comments_data.content}`;
            div.innerHTML = html;
            comments_container.appendChild(div);
        }
    }

    async function getCommentsLists(websitepost_id) {
        if (!websitepost_id) return;
        const db = `websiteposts-comments`;
        let data = await supabase.from(db).select(`users(country, gender, username, rank_id, prof_img), comments(content, date)`).eq('websiteposts_id', websitepost_id).order('id', { ascending: true });
        if (!handledErrorSupabase(data)) return;
        return data;
    }

    async function getWebsitePostsId(url) {
        const db = `website-posts`;
        let data = await supabase.from(db).select('id').eq('url', `${url}`);
        if (!handledErrorSupabase(data)) return;
        return data.data[0].id;
    }

    function handleDataToArr(data) {
        if (data.data.length == 1)
            return data.data[0];
        else return data.data;
    }

    function handledErrorSupabase(data) {
        if (data.error) {
            window.alert(`${data.error.message}`);
            return;
        }
        if (data.data.length == 0)
            return;

        return `valid data`;
    }
})();
