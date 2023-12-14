export const createMarkap = photo => {
  return photo
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
    <a class="link-photo" href="${largeImageURL}">
    <img class="gallery-photo" src="${webformatURL}" alt="${tags}" width=400  loading="lazy" />
    </a>
    <div class="info">
      <p>
        <b>Likes</b>
        ${likes}
      </p>
      <p>
        <b>Views</b>
        ${views}
      </p>
      <p>
        <b>Comments</b>
        ${comments}
      </p>
      <p>
        <b>Downloads</b>
      ${downloads}
        </p>
    </div>
    </div>
  `;
      }
    )
    .join('');
};
