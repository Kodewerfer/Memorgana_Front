import IMemo from "../types/IMemo";

type ISearchParams = { input: string, flat?: boolean }
export default function filterData(dataset: IMemo[], params: ISearchParams) {

  const input = params.input.toLowerCase().trim();

  if (!input) return dataset;

  let dataSetFiltered: IMemo[] = [];

  dataset.forEach(memo => {
    const { keyword, description } = memo;

    const incKeyword = keyword.toLocaleLowerCase().includes(input)
    const incDesc = description.toLocaleLowerCase().includes(input)
    let incRelated = false;

    if (!params.flat && memo.entries_related.length) {
      // search for related
      for (let related of memo.entries_related) {
        const { keyword } = related;
        if (keyword.toLocaleLowerCase().includes(input)) {
          incRelated = true;
          break;
        }
      }
    }

    if (incKeyword || incDesc || incRelated) {
      dataSetFiltered.push(memo);
    }
  })

  return dataSetFiltered;
}