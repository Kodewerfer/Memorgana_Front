let hasURISet = false;
let URI: string;


export function setQueryURI(uri: string) {
  if (hasURISet) {
    console.warn("No resetting query URI");
    return;
  }
  URI = uri;
}

export function getQueryURI(): string {
  if (!URI) {
    console.error('No URI set');
    return '';
  }

  return URI;
}


