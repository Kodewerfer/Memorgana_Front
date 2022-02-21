import axios from "axios";
import { useEffect, useState, useDebugValue, } from "react";
import Logger from "../helpers/SimpleLogger";
import { getQueryURI } from '../helpers/URIHelper';
import IMemo from "../types/IMemo";

// to minimize fetching operation, 
// don't want to burn a hole in my pocket with server bill.
let memosRef: IMemo[];

export default function useMemoData() {
  const [memos, setMemos] = useState<IMemo[]>([]);

  useDebugValue(memos);

  useEffect(() => {
    if (memosRef) {
      setMemos(memosRef);
      return;
    }
    queryMemo((data: any) => {
      memosRef = data;
      setMemos(data);
    });
  }, [])


  function fetchMemos() {
    queryMemo((data: any) => {
      memosRef = data;
      setMemos(data);
    });
  }

  return [memos, fetchMemos] as const; //ts-2339
}

function queryMemo(callback: Function) {

  Logger.dev("Querying Memos")

  let URI = getQueryURI();

  axios.get(URI)
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