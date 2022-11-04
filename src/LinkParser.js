/**
 * Helper function to parse YouTube link and get video id.
 * If link is incorrect, return false.
 * @param {string} url
 * @returns {string|boolean}
 */
function linkParser(url) {
  // RegExp for matching YouTube links
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  let match = url.match(regExp);

  return match && match[7].length == 11 ? match[7] : false;
}

export default linkParser;
