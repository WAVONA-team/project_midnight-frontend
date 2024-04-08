const format = (seconds: number) => {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());

  return hh ? `${hh}:${pad(mm)}:${ss}` : `${mm}:${ss}`;
};

const pad = (param: number) => ('0' + param).slice(-2);

export default format;
