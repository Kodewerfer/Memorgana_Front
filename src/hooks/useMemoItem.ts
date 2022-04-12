import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { getQueryURI } from '../helpers/URIHelper';
import IMemo from "../types/IMemo";

export default function useMemoItem(memo: IMemo) {

  // const hasChanged = useRef(false);
  const [item, setItem] = useState<IMemo>(memo);

  const fetchItem = useCallback(() => {
    queryItem(memo._id, (res: any) => {
      setItem(prev => (res));
    })
  }, [memo, setItem]);

  // const changeItem = useCallback((val) => {
  //   setItem(prev => {
  //     if (prev !== val && hasChanged.current === false)
  //       hasChanged.current = true;

  //     return val;
  //   })

  // }, [item, setItem]);

  const patchMemoItem = useCallback(async (callback: () => any) => {
    const URI = getQueryURI();

    //TODO: alert for error
    await axios.patch(`${URI}/${item._id}`, item);

    callback();
  }, [item, setItem]);

  // fallback
  useEffect(() => {
    if (memo) return;
    fetchItem();
  }, [])

  return [item, setItem, fetchItem, patchMemoItem] as const;

}

function queryItem(ID: string, callback: Function) {
  const URI = getQueryURI();
  axios.get(`${URI}/${ID}`)
    .then(res => {
      if (res.status !== 200) {
        throw res
      }
      callback(res.data)
    })
    .catch(e => {
      throw e;
    });
}