/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */


import { useState, useEffect } from 'react'
import { saveProject } from '../../db/projects.ts'

const useSaveProject = (user:string, project_id:string, dataState:Array<any>) => {
  const [saving, setSaving] = useState(true);
  const [saveError, setSaveError] = useState(null);

  const saveUpdates = (projectData:Array<any>) => {
    if (!projectData || !projectData.length) return
    setSaving(true)
    saveProject(user, project_id, projectData)
      .then(() => {
        setTimeout(() => {
          setSaving(false)
        }, 1000)
      })
      .catch((err) => {
        console.log('SaveError', err)
        setSaveError(err)
      })
  }

  useEffect(() => {

    if (!saving) {
      saveUpdates(dataState)
    } else {
      setTimeout(() => {
        saveUpdates(dataState)
      }, 1000)
    }

  }, [dataState]);

  return { saving, saveError };
};

export {
  useSaveProject
}