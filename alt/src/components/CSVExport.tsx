import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import {
  BrowserRouter as Router, Link, Route, Routes,
} from 'react-router-dom';
import { auth } from '../../firebaseConfig'

import { FcGoogle } from 'react-icons/fc'
import { AiFillGoogleCircle } from 'react-icons/ai'

import LoginButton from '../components/SignInButton';
import { ExportToCsv } from 'export-to-csv';
import * as XLSX from 'xlsx'

import { createUser } from '../../db/projects'
import { utils, writeFile } from 'xlsx';

import { LuDownloadCloud } from 'react-icons/lu'

import './module.css'
// Import the functions you need from the SDKs you ne
// import { userAuth } from '../AuthContext'

const CSVExport = ({ items, project }) => {

  items = items || []

  const formatItems = (data) => {
    let vals = []

    for (let col of data) {
      const newData = {}
      const imageString = '=IMAGE("' + col.screenshot + '", 1)'
      newData.screenshot = col.screenshot === undefined ? '=IMAGE' : imageString
      newData.content = col.variations.length > 0 ? col.variations[0].text : ''
      newData.ui_component = col.ui_component.text
      newData.translation_string = col.translation_string.text
      vals.push(newData)
    }

    return vals
  }
  // bg-[#1C1E21]/90

  // const data = [
  //   {
  //     name: 'Test 1',
  //     age: 13,
  //     average: 8.2,
  //     approved: true,
  //     description: "using 'Content here, content here' "
  //   },
  //   {
  //     name: 'Test 2',
  //     age: 11,
  //     average: 8.2,
  //     approved: true,
  //     description: "using 'Content here, content here' "
  //   },
  //   {
  //     name: 'Test 4',
  //     age: 10,
  //     average: 8.2,
  //     approved: true,
  //     description: "using 'Content here, content here' "
  //   },
  // ];

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

  const handleClick = (e) => {
    e.preventDefault()
    csvExporter.generateCsv(formatItems(items));
    // genExcel()
  }

  return (
    <button
    type="submit"
    className=""
    onClick={handleClick} >
      <div className="btn gap-2 text-sm normal-case flex flex-row bg-[#65D072] border-2 border-[#1C1E21]/90 rounded-full px-4">
        Export to csv
        <LuDownloadCloud />
      </div>
  </button>

  )
}

export default CSVExport