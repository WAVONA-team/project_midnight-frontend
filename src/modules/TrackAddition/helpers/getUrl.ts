/* eslint-disable indent */
const getUrl = (url: string) => {
  switch (true) {
    case url.includes('spotify'): {
      if (url.split(':').length === 3) {
        return url;
      }

      const urlId = url.match(/(?:spotify\.com\/track\/)([a-zA-Z0-9]+)/)?.[1];

      return `spotify:track:${urlId}`;
    }

    default: {
      return url;
    }
  }
};

export default getUrl;
