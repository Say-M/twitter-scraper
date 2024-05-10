import './index.css';
import { getInformation } from './twitter';

const form = document.getElementById('search-form') as HTMLFormElement;
const loading = document.getElementById('loading-card') as HTMLDivElement;
const information = document.getElementById(
  'information-card'
) as HTMLDivElement;
const errorCard = document.getElementById('error-card') as HTMLDivElement;
const headerName = document.getElementById('header-name') as HTMLHeadingElement;
const headerUsernameLink = document.getElementById(
  'header-username-link'
) as HTMLAnchorElement;
const banner = document.getElementById('banner') as HTMLImageElement;
const avatar = document.getElementById('avatar') as HTMLImageElement;
const name = document.getElementById('name') as HTMLHeadingElement;
const usernameLink = document.getElementById(
  'username-link'
) as HTMLAnchorElement;
const description = document.getElementById(
  'description'
) as HTMLParagraphElement;
const stats = document.getElementById('stats') as HTMLDivElement;
const tweets = document.getElementById('tweets') as HTMLUListElement;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  loading.classList.remove('hidden');
  information.classList.add('hidden');
  errorCard.classList.add('hidden');
  tweets.innerHTML = '';
  try {
    const formData = new FormData(form);
    const screenname = formData.get('screenname') as string;
    if (!screenname) return;
    const { status, data } = await getInformation(screenname);

    if (status === 'error') throw new Error(data);

    information.classList.remove('hidden');

    const _username = data?.user?.profile;
    const _name = data?.user?.name;
    const _description = data?.user?.desc;
    const _blue_verified = data?.user?.blue_verified;
    const _banner = data?.user?.header_image;
    const _avatar = data?.user?.avatar;
    const _following = data?.user?.friends;
    const _followers = data?.user?.sub_count;
    const _pinned = data?.pinned;
    const timeline = data?.timeline;

    headerName.innerHTML = `${_name}${
      _blue_verified
        ? `<svg viewBox="0 0 22 22" class="w-4 h-4 fill-blue-500"><g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>`
        : ''
    }`;
    headerUsernameLink.href = `https://twitter.com/${_username}`;
    headerUsernameLink.innerHTML = `@${_username}`;
    banner.src = _banner;
    banner.alt = `${_name}'s banner`;
    avatar.src = _avatar;
    avatar.alt = `${_name}'s avatar`;
    name.innerHTML = `${_name}${
      _blue_verified
        ? `<svg viewBox="0 0 22 22" class="w-4 h-4 fill-blue-500"><g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>`
        : ''
    }`;
    usernameLink.href = `https://twitter.com/${_username}`;
    usernameLink.innerHTML = `@${_username}`;
    description.innerHTML = _description?.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank">$1</a>'
    );
    stats.innerHTML = `<span><strong class="font-semibold text-black">${new Intl.NumberFormat(
      'en-US',
      {
        notation: 'compact',
      }
    ).format(
      _following
    )}</strong> Following</span><span><strong class="font-semibold text-black">${new Intl.NumberFormat(
      'en-US',
      {
        notation: 'compact',
      }
    ).format(_followers)}</strong> Followers</span>`;

    if (_pinned) {
      tweets.innerHTML = `<li class="px-3 py-2 border border-t-0">
        <small class="flex items-center gap-x-1 mb-1.5 text-slate-500">
          <svg
            class="w-3 h-3 fill-slate-500"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <g>
              <path
                d="M7 4.5C7 3.12 8.12 2 9.5 2h5C15.88 2 17 3.12 17 4.5v5.26L20.12 16H13v5l-1 2-1-2v-5H3.88L7 9.76V4.5z"
              ></path>
            </g>
          </svg>
          Pinned
        </small>
        <div class="flex gap-x-2">
          <a href="https://twitter.com/${
            _pinned?.retweeted_tweet?.author?.name || _pinned?.author?.name
          }" target="_blank" class="w-10 h-10 flex-shrink-0">
            <img
              src=${
                _pinned?.retweeted_tweet?.author?.avatar ||
                _pinned?.author?.avatar
              }
              alt=${
                _pinned?.retweeted_tweet?.author?.name || _pinned?.author?.name
              }
              class="w-full h-full rounded-full object-cover"
            />
          </a>
          <a href="https://twitter.com/${
            _pinned?.retweeted_tweet?.author?.name || _pinned?.author?.name
          }/status/${
        _pinned?.retweeted_tweet?.tweet_id || _pinned?.tweet_id
      }" target="_blank" class="flex-1">
            <h1 class="flex items-center flex-wrap whitespace-nowrap gap-x-1">
              <strong class="font-semibold">${
                _pinned?.retweeted_tweet?.author?.name || _pinned?.author?.name
              }</strong>
              ${
                _pinned?.retweeted_tweet?.author?.blue_verified ||
                _pinned?.author?.blue_verified
                  ? `<svg viewBox="0 0 22 22" class="w-4 h-4 fill-blue-500">
                      <g>
                        <path
                          d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                        ></path>
                      </g>
                    </svg>`
                  : ''
              }
              <span class="text-slate-500">·</span>
              <span class="text-slate-500">${
                _pinned?.created_at &&
                new Intl.DateTimeFormat('en-US', {
                  dateStyle: 'long',
                }).format(
                  new Date(
                    _pinned?.retweeted_tweet?.created_at || _pinned?.created_at
                  )
                )
              }</span>
            </h1>
            <p class="mt-0.5 text-sm">
              ${
                _pinned?.retweeted_tweet?.text ||
                _pinned?.text?.replace(/RT @\w*: /, '')
                // ?.replace(
                //   /(https?:\/\/[^\s]+)/g,
                //   "<a href='$1' target='_blank'>$1</a>"
                // )
                // ?.replace(
                //   /(@\w+)/g,
                //   (match: string) =>
                //     `<a href="https://twitter.com/${match.slice(
                //       1
                //     )}" target="_blank">${match}</a>`
                // )
              }
            </p>
            ${
              _pinned?.quoted
                ? `<div class="border rounded-2xl px-3 py-2 mt-2">
                    <div class="flex items-center gap-x-2">
                      <img
                        src="https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_normal.jpg"
                        class="w-5 h-5 rounded-full flex-shrink-0"
                      />
                      <h1 class="flex items-center flex-wrap whitespace-nowrap gap-x-1">
                        <strong class="font-semibold">${
                          _pinned?.quoted?.author?.name
                        }</strong>
                        ${
                          _pinned?.quoted?.author?.blue_verified
                            ? `<svg viewBox="0 0 22 22" class="w-4 h-4 fill-blue-500">
                                <g>
                                  <path
                                    d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                                  ></path>
                                </g>
                              </svg>`
                            : ''
                        }
                        <span class="text-slate-500">${
                          _pinned?.quoted?.author?.screen_name
                        }</span>
                        <span class="text-slate-500">·</span>
                        <span class="text-slate-500">${
                          _pinned?.created_at &&
                          new Intl.DateTimeFormat('en-US', {
                            dateStyle: 'long',
                          }).format(new Date(_pinned?.quoted?.created_at))
                        }</span>
                      </h1>
                    </div>
                    <p class="mt-0.5 text-sm">${_pinned?.quoted?.text}</p>
                    ${
                      (
                        _pinned?.quoted?.media?.photo ||
                        _pinned?.quote?.media?.video
                      )?.length
                        ? `<img
                        src=${
                          (_pinned?.quoted?.media?.photo ||
                            _pinned?.quote?.media?.video)?.[0]?.media_url_https
                        }
                        class="w-full mt-2 border rounded-lg"
                      />`
                        : ''
                    }
                  </div>`
                : ''
            }
            ${
              (
                _pinned?.retweeted_tweet?.media?.photo ||
                _pinned?.retweeted_tweet?.media?.video ||
                _pinned?.media?.photo ||
                _pinned?.media?.video
              )?.length
                ? `<img
                    src=${
                      (_pinned?.retweeted_tweet?.media?.photo ||
                        _pinned?.retweeted_tweet?.media?.video ||
                        _pinned?.media?.photo ||
                        _pinned?.media?.video)?.[0]?.media_url_https
                    }
                    class="w-full mt-2 border rounded-lg"
                  />`
                : ''
            }
            <div
              class="mt-2 flex justify-between text-slate-500 text-sm"
            >
              <span class="flex items-center gap-x-1">
                <svg
                  class="w-4 h-4 fill-slate-500"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <g>
                    <path
                      d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
                    ></path>
                  </g>
                </svg>
                ${new Intl.NumberFormat('en-US', {
                  notation: 'compact',
                }).format(
                  _pinned?.quoted?.replies ||
                    _pinned?.retweeted_tweet?.replies ||
                    _pinned?.replies
                )}
              </span>
              <span class="flex items-center gap-x-1">
                <svg
                  class="w-4 h-4 fill-slate-500"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <g>
                    <path
                      d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
                    ></path>
                  </g>
                </svg>
                ${new Intl.NumberFormat('en-US', {
                  notation: 'compact',
                }).format(
                  _pinned?.quoted
                    ? _pinned?.quoted?.retweets + _pinned?.quoted?.quotes
                    : _pinned?.retweeted_tweet
                    ? _pinned?.retweeted_tweet?.retweets +
                      _pinned?.retweeted_tweet?.quotes
                    : _pinned?.retweets + _pinned?.quotes
                )}
              </span>
              <span class="flex items-center gap-x-1">
                <svg
                  class="w-4 h-4 fill-slate-500"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <g>
                    <path
                      d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
                    ></path>
                  </g>
                </svg>
                ${new Intl.NumberFormat('en-US', {
                  notation: 'compact',
                }).format(
                  _pinned?.quoted?.favorites ||
                    _pinned?.retweeted_tweet?.favorites ||
                    _pinned?.favorites
                )}
              </span>
              <span class="flex items-center gap-x-1">
                <svg
                  class="w-4 h-4 fill-slate-500"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <g>
                    <path
                      d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"
                    ></path>
                  </g>
                </svg>
                ${new Intl.NumberFormat('en-US', {
                  notation: 'compact',
                }).format(
                  _pinned?.quoted?.bookmarks ||
                    _pinned?.retweeted_tweet?.bookmarks ||
                    _pinned?.bookmarks
                )}
              </span>
            </div>
          </a>
        </div>
      </li>
      `;
    }
    timeline?.forEach((tweet: any) => {
      tweets.innerHTML += `
      <li class="px-3 py-2 border border-t-0">
        <small class="flex items-center gap-x-1 mb-1.5 text-slate-500">
            ${
              tweet?.retweeted_tweet
                ? `<svg
              class="w-3 h-3 fill-slate-500"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <g>
                <path
                  d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"
                ></path>
              </g>
            </svg>
           ${tweet?.author?.name} retweeted`
                : ''
            }
        </small>
        <div class="flex gap-x-2">
          <a href="https://twitter.com/${
            tweet?.retweeted_tweet?.author?.name || tweet?.author?.name
          }" target="_blank" class="w-10 h-10 flex-shrink-0">
            <img
              src=${
                tweet?.retweeted_tweet?.author?.avatar || tweet?.author?.avatar
              }
              alt=${tweet?.retweeted_tweet?.author?.name || tweet?.author?.name}
              class="w-full h-full rounded-full object-cover"
            />
          </a>
          <a href="https://twitter.com/${
            tweet?.retweeted_tweet?.author?.name || tweet?.author?.name
          }/status/${
        tweet?.retweeted_tweet?.tweet_id || tweet?.tweet_id
      }" target="_blank" class="flex-1">
            <h1 class="flex items-center flex-wrap whitespace-nowrap gap-x-1">
              <strong class="font-semibold">${
                tweet?.retweeted_tweet?.author?.name || tweet?.author?.name
              }</strong>
              ${
                tweet?.retweeted_tweet?.author?.blue_verified ||
                tweet?.author?.blue_verified
                  ? `<svg viewBox="0 0 22 22" class="w-4 h-4 fill-blue-500">
                      <g>
                        <path
                          d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                        ></path>
                      </g>
                    </svg>`
                  : ''
              }
              <span class="text-slate-500">·</span>
              <span class="text-slate-500">${
                tweet?.created_at &&
                new Intl.DateTimeFormat('en-US', {
                  dateStyle: 'long',
                }).format(
                  new Date(
                    tweet?.retweeted_tweet?.created_at || tweet?.created_at
                  )
                )
              }</span>
            </h1>
            <p class="mt-0.5 text-sm">
              ${
                tweet?.retweeted_tweet?.text ||
                tweet?.text?.replace(/RT @\w*: /, '')
                // ?.replace(
                //   /(https?:\/\/[^\s]+)/g,
                //   "<a href='$1' target='_blank'>$1</a>"
                // )
                // ?.replace(
                //   /(@\w+)/g,
                //   (match: string) =>
                //     `<a href="https://twitter.com/${match.slice(
                //       1
                //     )}" target="_blank">${match}</a>`
                // )
              }
            </p>
            ${
              tweet?.quoted
                ? `<div class="border rounded-2xl px-3 py-2 mt-2">
                    <div class="flex items-center gap-x-2">
                      <img
                        src=${
                          tweet?.quoted?.author?.avatar || tweet?.author?.avatar
                        }
                        alt=${
                          tweet?.quoted?.author?.name || tweet?.author?.name
                        }
                        class="w-5 h-5 rounded-full flex-shrink-0"
                      />
                      <h1 class="flex items-center flex-wrap whitespace-nowrap gap-x-1">
                        <strong class="font-semibold">${
                          tweet?.quoted?.author?.name
                        }</strong>
                        ${
                          tweet?.quoted?.author?.blue_verified
                            ? `<svg viewBox="0 0 22 22" class="w-4 h-4 fill-blue-500">
                                <g>
                                  <path
                                    d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                                  ></path>
                                </g>
                              </svg>`
                            : ''
                        }
                        <span class="text-slate-500">${
                          tweet?.quoted?.author?.screen_name
                        }</span>
                        <span class="text-slate-500">·</span>
                        <span class="text-slate-500">${
                          tweet?.created_at &&
                          new Intl.DateTimeFormat('en-US', {
                            dateStyle: 'long',
                          }).format(new Date(tweet?.quoted?.created_at))
                        }</span>
                      </h1>
                    </div>
                    <p class="mt-0.5 text-sm">${tweet?.quoted?.text}</p>
                    ${
                      (
                        tweet?.quoted?.media?.photo ||
                        tweet?.quoted?.media?.video
                      )?.length
                        ? `<img
                            src=${
                              (tweet?.quoted?.media?.photo ||
                                tweet?.quoted?.media?.video)?.[0]
                                ?.media_url_https
                            }
                            class="w-full mt-2 border rounded-lg"
                          />`
                        : ''
                    }
                  </div>`
                : ''
            }
            ${
              (
                tweet?.media?.photo ||
                tweet?.media?.video ||
                tweet?.retweeted_tweet?.media?.photo ||
                tweet?.retweeted_tweet?.media?.video
              )?.length
                ? `<img
                    src=${
                      (tweet?.media?.photo ||
                        tweet?.media?.video ||
                        tweet?.retweeted_tweet?.media?.photo ||
                        tweet?.retweeted_tweet?.media?.video)?.[0]
                        ?.media_url_https
                    }
                    class="w-full mt-2 border rounded-lg"
                  />`
                : ''
            }
            <div
              class="mt-2 flex justify-between text-slate-500 text-sm"
            >
              <span class="flex items-center gap-x-1">
                <svg
                  class="w-4 h-4 fill-slate-500"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <g>
                    <path
                      d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
                    ></path>
                  </g>
                </svg>
                ${new Intl.NumberFormat('en-US', {
                  notation: 'compact',
                }).format(
                  tweet?.quoted?.replies ||
                    tweet?.retweeted_tweet?.replies ||
                    tweet?.replies
                )}
              </span>
              <span class="flex items-center gap-x-1">
                <svg
                  class="w-4 h-4 fill-slate-500"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <g>
                    <path
                      d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
                    ></path>
                  </g>
                </svg>
                ${new Intl.NumberFormat('en-US', {
                  notation: 'compact',
                }).format(
                  tweet?.quoted
                    ? tweet?.quoted?.retweets + tweet?.quoted?.quotes
                    : tweet?.retweeted_tweet
                    ? tweet?.retweeted_tweet?.retweets +
                      tweet?.retweeted_tweet?.quotes
                    : tweet?.retweets + tweet?.quotes
                )}
              </span>
              <span class="flex items-center gap-x-1">
                <svg
                  class="w-4 h-4 fill-slate-500"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <g>
                    <path
                      d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
                    ></path>
                  </g>
                </svg>
                ${new Intl.NumberFormat('en-US', {
                  notation: 'compact',
                }).format(
                  tweet?.quoted?.favorites ||
                    tweet?.retweeted_tweet?.favorites ||
                    tweet?.favorites
                )}
              </span>
              <span class="flex items-center gap-x-1">
                <svg
                  class="w-4 h-4 fill-slate-500"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <g>
                    <path
                      d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"
                    ></path>
                  </g>
                </svg>
                ${new Intl.NumberFormat('en-US', {
                  notation: 'compact',
                }).format(
                  tweet?.quoted?.bookmarks ||
                    tweet?.retweeted_tweet?.bookmarks ||
                    tweet?.bookmarks
                )}
              </span>
            </div>
          </a>
        </div>
      </li>
      `;
    });
  } catch (error) {
    console.error(error);
    errorCard.classList.remove('hidden');
  } finally {
    loading.classList.add('hidden');
  }
});
