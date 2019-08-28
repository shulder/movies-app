// parse movie attribute from a line
// attributes can occur in a random order
const parseAttribute = (str, attr) => {
  // regexp matches everything between `{attr}:` and newline/endline
  const attrRegexp = new RegExp(`(?<=${attr}:)(.*)(?=\n|$)`, 'gi');
  return str
    .match(attrRegexp)
    .join()
    .trim();
};
// There are two opposite cases in the example file
// 1) Eva Marie Saint, name consists of two words divided by space
// 2) James Earl Jones, surname consists of two words divided by space.
// There's no proper way to handle those situations, but we can assume
// that star name will always appear before first whitespace
// (could be divided by dash in case of Eva-Marie)
const parseName = name => ({
  name: name.substr(0, name.indexOf(' ')),
  surname: name.substr(name.indexOf(' ') + 1),
});
const parseTitle = str => parseAttribute(str, 'title');
const parseYear = str => Number(parseAttribute(str, 'year'));
const parseFormat = str => parseAttribute(str, 'format').toUpperCase();
// split stars names by comma + whitespace, then divide full name into parts
const parseStars = str => parseAttribute(str, 'stars').split(/,\s/).map(parseName);

const parseMovieInfo = (textFile) => {
  const movies = textFile
    .split('\n\n') // split file into paragraphs by whitespaced lines
    .filter(movieString => movieString) // remove empty lines
    .map(movieString => ({
      title: parseTitle(movieString),
      releaseYear: parseYear(movieString),
      format: {
        type: parseFormat(movieString),
      },
      stars: parseStars(movieString),
    }));
  return movies;
};

module.exports = {
  parseMovieInfo,
};
