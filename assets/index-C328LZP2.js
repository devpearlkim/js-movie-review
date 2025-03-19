(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const _=()=>{const e=document.getElementById("header-container");if(!e)return null;const t=document.getElementById("header-template");return t?{render:()=>{if(!e||!t)return;const r=t.content.cloneNode(!0);e.innerHTML="",e.appendChild(r)},update:({title:r,rating:d,backdrop:c})=>{if(!e)return;const l=e.querySelector("header");if(!l)return;l.style.backgroundImage=`url('${c}')`;const p=l.querySelector(".top-rated-movie");if(!p)return;p.style.display="block";const f=p.querySelector(".rate-value");f&&(f.textContent=d);const v=p.querySelector(".title");v&&(v.textContent=r)},hideTopRated:()=>{if(!e)return;const r=e.querySelector("header");if(!r)return;const d=r.querySelector(".top-rated-movie");d&&(d.style.display="none")}}:null},J=768,V=3,N=9,O={SELECTED_CATEGORY:"selectedCategory"},D={USER_RATINGS:"userRatings"},I="popular",A=["now_playing","popular","top_rated","upcoming"],U=[{category:"now_playing",label:"상영 중"},{category:"popular",label:"인기순"},{category:"top_rated",label:"평점순"},{category:"upcoming",label:"상영 예정"}],k={2:"최악이에요",4:"별로예요",6:"보통이에요",8:"재미있어요",10:"명작이에요"},Z=()=>{const e=sessionStorage.getItem(O.SELECTED_CATEGORY);return e&&A.includes(e)?e:I},K=e=>{const t=document.getElementById("tab-container");let n=Z();const i=()=>{t&&(t.innerHTML=`
      <ul class="tab">
        ${U.map(({category:c,label:l})=>`
          <li data-category="${c}">
            <a href="#">
              <div class="tab-item">
                <h3>${l}</h3>
              </div>
            </a>
          </li>
        `).join("")}
      </ul>
    `,r())},o=c=>{c.preventDefault();const l=c.target.closest("li[data-category]");if(!l)return;const p=l.getAttribute("data-category");p&&A.includes(p)&&(n=p,sessionStorage.setItem(O.SELECTED_CATEGORY,n),r(),e(n))},r=()=>{t&&t.querySelectorAll("li[data-category]").forEach(c=>{const l=c.querySelector(".tab-item");l&&l.classList.toggle("selected",c.getAttribute("data-category")===n)})};return{init:()=>{t&&(i(),t.addEventListener("click",o),e(n))},getSelectedCategory:()=>n}},W=e=>{const{container:t,onLoadMore:n,hasMore:i,threshold:o=1}=e,r=new IntersectionObserver(l=>{l[0].isIntersecting&&i()&&n()},{threshold:o});return{observeLastItem:()=>{const l=t.querySelectorAll(".movie-item");if(!l.length)return;const p=l[l.length-1];r.observe(p)},disconnect:()=>r.disconnect()}},Q="https://api.themoviedb.org/3",X="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OThkMzNjYzk4MmU1MzRlMDk0ODM4NTUyNjZkNjE4MSIsIm5iZiI6MTc0MDgxMjYxMy44NzEsInN1YiI6IjY3YzJiMTQ1NTczYmViMTUyZjY2OWIwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fBfCjOse1kzZZ0446YiuFgZek9GVmZr3grmd2GyiEu4",ee=(e,t,n=5e3)=>Promise.race([fetch(e,t),new Promise((i,o)=>setTimeout(()=>o(new Error("요청 시간이 초과되었습니다.")),n))]),L=async({endpoint:e,params:t={},timeout:n=1e4,init:i})=>{const o=new URL(`${Q}/${e}`);Object.entries(t).forEach(([l,p])=>{p!==void 0&&o.searchParams.set(l,String(p))});const d={...{method:"GET",headers:{accept:"application/json",Authorization:`Bearer ${X}`}},...i},c=await ee(o.toString(),d,n);if(!c.ok){let l=`HTTP 요청 중 에러가 발생했습니다: ${c.status}`;throw c.status===404?l="리소스를 찾을 수 없습니다. (404)":c.status>=500&&(l="서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요. (5xx)"),new Error(l)}return c.json()},te=async(e,t=1)=>(await L({endpoint:`movie/${e}`,params:{language:"ko-KR",page:t}})).results,ne=async(e,t=1)=>(await L({endpoint:"search/movie",params:{language:"ko-KR",page:t,query:encodeURIComponent(e)}})).results,oe=async e=>L({endpoint:`movie/${e}`,params:{language:"ko-KR"}}),$=e=>JSON.parse(localStorage.getItem(e)||"{}"),re=(e,t,n)=>{const i=$(e);i[t]=n,localStorage.setItem(e,JSON.stringify(i))},x=e=>$(D.USER_RATINGS)[e]||null,se=(e,t)=>{const n={movieId:e,score:t,ratedAt:new Date().toISOString()};re(D.USER_RATINGS,e,n)},E=e=>{const{id:t,title:n,poster_path:i,vote_average:o,backdrop_path:r,release_date:d,genres:c,overview:l}=e;return{id:t,title:n,poster_path:i,vote_average:o,backdrop_path:r,release_date:d,genres:c,overview:l,getThumbnailUrl:()=>`https://image.tmdb.org/t/p/w500${i}`,getBackdropUrl:()=>`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${r}`,getFormattedVote:()=>o.toFixed(1),getYear:()=>d?d.split("-")[0]:"Unknown",getGenres:()=>(c==null?void 0:c.map(h=>h.name).join(", "))||"",getOverview:()=>l||"상세 정보 없음.",userRating:x(t)}},ae=()=>{let e=[],t=0,n=N;return{loadMovies:async f=>{e=(await te(f)).map(s=>E(s)),t=0},searchMovies:async f=>{e=(await ne(f)).map(s=>E(s)),t=0},getMovieDetails:async f=>{const v=await oe(f);return E(v)},getNextBatch:()=>{const f=t,v=e.length-t,s=Math.min(v,n);return t+=s,e.slice(f,t)},hasMore:()=>t<e.length,getFirstMovie:()=>e.length>0?e[0]:null,setMoviesPerLoad:f=>{n=f}}},ie=e=>alert(e);function ce(e,t){let n;return function(...o){n!==void 0&&clearTimeout(n),n=setTimeout(()=>{e.apply(this,o)},t)}}const w=e=>{const t=document.getElementById("tab-container");t&&(t.style.display=e==="search"?"none":"block")},le=()=>{const e=document.querySelector(".search-input");e&&(e.value="")},de=e=>{const t=document.querySelector(".search-input");t&&(t.value=e)},ue=e=>{var n;const t=e.getFirstMovie();t&&((n=_())==null||n.update({title:t.title,rating:t.getFormattedVote(),backdrop:t.getBackdropUrl()}))};function b(e,t){const n=document.querySelector(".section-title");if(n)if(e==="search")n.textContent=t&&t.trim()?`${t} 검색 결과`:"검색 결과";else{const i=t,o=U.find(d=>d.category===i),r=o?o.label:"영화";n.textContent=`${r} 영화`}}const me=e=>e?(w("search"),de(e),"search"):(w("category"),le(),"category"),ge=(e,t)=>{e.innerHTML="";const n=document.createElement("div");n.classList.add("movie-grid"),n.innerHTML=t.map(B).join(""),e.appendChild(n)},pe=(e,t)=>{const n=e.querySelector(".movie-grid");n&&n.insertAdjacentHTML("beforeend",t.map(B).join(""))},fe=e=>{const t=e.querySelector(".movie-grid");if(!t)return;const n=document.createElement("div");n.classList.add("skeleton-wrapper"),n.innerHTML=he(8),t.appendChild(n)},ve=e=>{const t=e.querySelector(".skeleton-wrapper");t&&t.remove()},B=e=>`
  <div class="movie-item">
    <div class="item" data-movie-id="${e.id}">
      <img class="thumbnail" src="https://image.tmdb.org/t/p/w500${e.poster_path}" 
           alt="${e.title}">
      <div class="item-desc">
        <p class="rate">
          <img class="star" src="./images/star_empty.png">
          <span>${e.vote_average.toFixed(1)}</span>
        </p>
        <strong>${e.title}</strong>
      </div>
    </div>
  </div>
`,he=e=>Array.from({length:e}).map(()=>`
        <div class="movie-item skeleton">
          <div class="item">
            <div class="skeleton skeleton-thumbnail"></div>
            <div class="item-desc">
              <div class="skeleton-star-row">
                <div class="skeleton skeleton-star"></div>
                <p class="skeleton skeleton-rate"></p>
              </div>
              <div class="skeleton-title-row">
                <strong class="skeleton skeleton-title"></strong>
              </div>
            </div>
          </div>
        </div>
      `).join("");function ye(){let e=null,t=null,n=null;const i=()=>{const s=document.createElement("div");return s.innerHTML=`
      <div class="modal-background">
        <div class="modal">
          <button class="close-modal">&times;</button>
          <div class="modal-container">
            <div class="modal-image">
              <img src="" alt="Movie Poster">
            </div>
            <div class="modal-description">
              <h2 class="movie-title"></h2>
              <p class="category"></p>
              <p class="rate"><strong>평점:</strong> <span class="average-rating"></span></p>
              <div class="user-rating">
                <p><strong>내 별점</strong></p>
                <div class="stars"></div>
                <p class="user-rating-text"></p>
              </div>
              <hr>
              <p class="detail"></p>
            </div>
          </div>
        </div>
      </div>
    `,s.firstElementChild},o=()=>{var s;e||(e=i(),document.body.appendChild(e),t=e.querySelector(".stars"),n=e.querySelector(".user-rating-text"),(s=e.querySelector(".close-modal"))==null||s.addEventListener("click",d),e.addEventListener("click",m=>{m.target===e&&d()}),document.addEventListener("keydown",m=>{m.key==="Escape"&&d()}),t==null||t.addEventListener("mouseover",f),t==null||t.addEventListener("mouseleave",v),t==null||t.addEventListener("click",p))},r=s=>{if(!e)return;e.dataset.movieId=s.id.toString(),e.querySelector(".movie-title").textContent=s.title;const m=e.querySelector(".category");m&&(m.textContent=`${s.getYear()} · ${s.getGenres()}`),e.querySelector(".average-rating").textContent=s.getFormattedVote(),e.querySelector(".modal-image img").src=s.getThumbnailUrl();const g=e.querySelector(".detail");g&&(g.textContent=s.getOverview()),c(s.id),e.classList.add("active"),document.body.classList.add("modal-open")},d=()=>{e==null||e.classList.remove("active"),document.body.classList.remove("modal-open")},c=s=>{const m=x(s),g=m?m.score:0;l(g)},l=s=>{if(!t)return;const m=document.createDocumentFragment();for(let g=2;g<=10;g+=2){const h=document.createElement("span");h.dataset.score=g.toString(),h.className="star",h.style.cursor="pointer",h.textContent=g<=s?"⭐":"☆",m.appendChild(h)}t.innerHTML="",t.appendChild(m),n&&(n.textContent=k[s]?`${k[s]} (${s}/10)`:"아직 평가하지 않았어요")},p=s=>{const m=s.target.closest(".star");if(!m)return;const g=Number(m.dataset.score),h=Number(e==null?void 0:e.dataset.movieId);!g||!h||(se(h,g),c(h))},f=s=>{const m=s.target,g=Number(m.dataset.score);g&&l(g)},v=()=>{const s=Number(e==null?void 0:e.dataset.movieId);s&&c(s)};return{render:o,open:r,close:d}}function Se(e){const t=document.getElementById(e);if(!t)return console.error(`document에서 ${e} id를 찾을 수 없습니다`),null;const n=t,i=ae(),o=ye(),r=W({container:n,onLoadMore:F,hasMore:()=>i.hasMore()});let d="category",c=null;function l(){i.setMoviesPerLoad(window.innerWidth<=J?V:N)}function p(){const a=ce(l,300);window.addEventListener("resize",a),l()}function f(a){o.render(),c=a,H(),s(),p(),window.addEventListener("popstate",s),n.addEventListener("click",v)}async function v(a){const y=a.target.closest(".item");if(!y)return;const{movieId:S}=y.dataset;if(S)try{const M=await i.getMovieDetails(Number(S));o.open(M)}catch{console.error(`영화 상세 정보를 불러오는 데 실패했습니다. (MovieID: ${S})`)}}function s(){const u=new URLSearchParams(location.search).get("search");if(d=me(u??""),b(d,u??((c==null?void 0:c.getSelectedCategory())||I)),d==="search"){R(u,!1);return}else T((c==null?void 0:c.getSelectedCategory())||I)}async function m(a){d!=="search"&&(b("category",a),await T(a))}async function g({category:a,query:u,isInitial:y=!0,pushState:S=!0}){fe(n),u&&b("search",u);try{const M=await h({category:a,query:u,isInitial:y});if(!M.length){j(u);return}ve(n),Y(M,y),i.hasMore()?r.observeLastItem():r.disconnect(),ue(i)}catch{q()}finally{z(u,S)}}async function h({category:a,query:u,isInitial:y}){return y?u?await G(u):await P(a):i.getNextBatch()}async function G(a){return w("search"),await i.searchMovies(a),i.getNextBatch()}async function P(a){return a&&await i.loadMovies(a),i.getNextBatch()}function j(a){n.innerHTML=a?`<p>${a} 검색 결과가 없습니다.</p>`:"<p>영화가 없습니다.</p>"}function Y(a,u){u?ge(n,a):pe(n,a)}function q(){ie(d==="search"?"검색 중 오류가 발생했습니다.":"영화를 불러오는 중 오류가 발생했습니다.")}function z(a,u=!0){const y=a?`?search=${encodeURIComponent(a)}`:location.pathname;u&&location.search!==y&&history.pushState({},"",y)}async function T(a){await g({category:a})}async function R(a,u=!0){a.trim()&&await g({query:a,pushState:u})}function F(){r.disconnect(),g({isInitial:!1,pushState:!1})}function H(){const a=document.querySelector(".search-bar");a&&a.addEventListener("submit",async u=>{u.preventDefault();const y=a.querySelector(".search-input");if(!y)return;const S=y.value.trim();S&&await R(S)})}return window.addEventListener("beforeunload",()=>{r.disconnect()}),{init:f,switchTab:m}}function C(){const e=_();e&&e.render();const t=Se("movie-list-container");if(!t){console.error("movie controller를 초기화하지 못했습니다.");return}const n=K(async i=>{await t.switchTab(i)});n.init(),t.init(n)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",C):C();
