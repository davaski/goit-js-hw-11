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
      <p class="info-item">
        <b>Likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${comments}
      </p>
      <p class="info-item">
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
