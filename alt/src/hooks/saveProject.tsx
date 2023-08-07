/* eslint-disable react-hooks/exhaustive-deps */


import { useState, useEffect } from 'react'
import { saveProject } from '../../db/projects.ts'

const useSaveProject = (user:string, project_id:string, dataState:[]) => {
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const saveUpdates = (projectData:[]) => {
    if (!projectData.length) return
    setSaving(true)
    saveProject(user, project_id, projectData)
      .then(() => {
        setTimeout(() => {
          setSaving(false)
        }, 5000)
      })
      .catch((err) => {
        console.log(err)
        setSaveError(err)
      })
  }

  useEffect(() => {

    if (!saving) {
      saveUpdates(dataState)
    } else {
      setTimeout(() => {
        saveUpdates(dataState)
      }, 5000)
    }

  }, [dataState]);

  return { saving, saveError };
};

export {
  useSaveProject
}