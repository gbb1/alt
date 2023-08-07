/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { getProject } from '../../db/projects.ts'


const useGetProject = (user:string, project_id:number, refresh:boolean) => {
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true)
    getProject(user, project_id)
      .then((res) => {
        //@ts-ignore
        setProject(res)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
      })

  }, [user, refresh]);

  return { project, loading, error };
};

export {
  useGetProject
}