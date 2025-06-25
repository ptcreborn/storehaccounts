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

            if (obj.users.country != "Anonymous") {
                countryname = await fetch('https://restcountries.com/v3.1/alpha/' + obj.users.country);
                countryname = await countryname.json();
                countryname = countryname[0].name.official;
            }
            let div = document.createElement('div');
            html = `<div class='ui attached inverted segment' style='width: 100%; overflow: hidden;'>
  <div class="ui ${obj.users.gender == "M" ? `blue` : `red`} image pointing below label"> <!--Gender Color -->
  <img style='margin-right: 0px !important; margin-left: 0px !important; width: 26px !important; height: 26px !important; object-fit: cover;' src="${obj.users.prof_img}"> <!--Profile Image-->
    ${obj.users.username}
</div>
    <div class="ui red image label">
  <img src="${rank_data.data[0].rank_image}">
  ${rank_data.data[0].rank_name}
</div>
      <div class="ui red mini basic image label"> <!--Flag-->
  <img src="${obj.users.country == "Anonymous" ? `https://i.ebayimg.com/images/g/BbUAAOSwLYdf02f4/s-l1200.jpg` : `https://flagsapi.com/${obj.users.country}/shiny/64.png`}">
        ${obj.users.country == "Anonymous" ? `Homeless` : `${countryname}`} <!--Country Name-->
</div>
  <br/>
  <div class='ui inverted message' style='margin: 0 auto !important;'>
   ${obj.comments.content}
    <br/>
  <span class='ui blue basic label'>${moment(new Date(obj.comments.date)).fromNow()}</span> <!--Time-->
  </div>
</div>`;
            div.innerHTML = html;
            comments_container.appendChild(div);
        }
    }

    async function getCommentsLists(websitepost_id) {
        if (!websitepost_id) return;
        const db = `websiteposts-comments`;
        let data = await supabase.from(db).select(`users(country, gender, username, rank_id, prof_img), comments(content, date)`).eq('websiteposts_id', websitepost_id).order('id', { ascending: false });
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
