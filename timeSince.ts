export function timeSince(date) {
  //@ts-ignore
  var seconds = Math.floor((Date.now() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return (
      Math.floor(interval) +
      (Math.floor(interval) === 1 ? " година" : " години")
    );
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return (
      Math.floor(interval) + (Math.floor(interval) === 1 ? " месец" : " месеца")
    );
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return (
      Math.floor(interval) + (Math.floor(interval) === 1 ? " ден" : " дни")
    );
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return (
      Math.floor(interval) + (Math.floor(interval) === 1 ? " час" : " часа")
    );
  }
  interval = seconds / 60;
  if (interval > 1) {
    return (
      Math.floor(interval) +
      (Math.floor(interval) === 1 ? " минута" : " минути")
    );
  }
  return (
    Math.floor(seconds) + (Math.floor(interval) === 1 ? " секунда" : " секунда")
  );
}