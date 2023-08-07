/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ExportToCsv } from 'export-to-csv';

import { LuDownloadCloud } from 'react-icons/lu'

import './module.css'

const CSVExport = ({ items, project }:any) => {

  items = items || []

  interface stored_text {
    text: string;
  }

  interface column {
    screenshot: string;
    variations: Array<stored_text>;
    ui_component: stored_text;
    translation_string: stored_text;
  }

  interface csv_data {
    Screenshot: string,
    Content: string,
    'UI Component': string,
    'Translation String': string,
  }

  const formatItems = (data:column[]) => {
    const vals = []

    for (const col of data) {
      const newData:csv_data = {
        Screenshot: '',
        Content: '',
        'UI Component': '',
        'Translation String': '',
      }
      const imageString = '=IMAGE("' + col.screenshot + '", 1)'
      newData.Screenshot = col.screenshot === undefined ? '' : imageString

      if (col.variations.length > 0) {
        newData.Content = col.variations[0].text
      }
      newData['UI Component'] = col.ui_component.text
      newData['Translation String'] = col.translation_string.text
      vals.push(newData)
    }

    return vals
  }

    const options = {
      fieldSeparator: ',',
      filename: project.name,
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: project.name,
      useTextFile: false,
      useBom: false,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };

  // console.log(options)

  const csvExporter = new ExportToCsv(options);

  // const genExcel = () => {
  //   const rows = formatItems(items)
  //   const worksheet = XLSX.utils.json_to_sheet(rows);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, project.name);

  //   /* fix headers */
  //   // XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Birthday"]], { origin: "A1" });

  //   /* calculate column width */
  //   const max_width = rows.reduce((w, r) => {
  //     let max = 0
  //     for (const key in r) {
  //       max = Math.max(r[key].length, max)
  //     }
  //     return Math.max(w, max)
  //   }, 10);
  //   worksheet["!cols"] = [ { wch: max_width } ];

  //   /* create an XLSX file and try to save to Presidents.xlsx */
  //   XLSX.writeFile(workbook, "Presidents.xlsx", { compression: true });
  // }

  const handleClick = (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    csvExporter.generateCsv(formatItems(items));
    // genExcel()
  }

  return (

    <div>
      <button className="" onClick={() =>
          // @ts-ignore
        window.my_modal_3.showModal()
      }>
        <div className="btn gap-2 text-sm normal-case flex flex-row bg-[#65D072] border-2 border-[#1C1E21]/90 rounded-full px-4">
          Export to csv
          <LuDownloadCloud />
        </div>
      </button>
      <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="font-normal text-lg text-gray-400">Export to csv</h3>
          <h1 className="font-bold text-3xl">Here's how it works:</h1>
          <div className="flex flex-col gap-4 py-4">
            <p className=" ">• Upload your csv to Excel or Google Sheets.</p>
            <p className="">• All your main variations, UI labels, and translation strings will be formatted automatically.</p>
            <p className="">• To view your screenshots, delete the ' character at the beginning of the text in the screenshots column.</p>
            <p className="">• Note that any screenshots will no longer be visible if this project is deleted.</p>
          </div>
          <div className="flex flex-row w-full justify-end">
            <button
              type="submit"
              className=""
              onClick={handleClick} >
                <div className="btn gap-2 text-sm normal-case flex flex-row bg-[#65D072] border-2 border-[#1C1E21]/90 rounded-full px-4">
                  Export
                </div>
            </button>
          </div>
        </form>
      </dialog>
    </div>


  )
}

export default CSVExport