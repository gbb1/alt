import { useState, useEffect, useMemo } from 'react'
import { getProject } from '../../db/projects.ts'


const useGetProject = (user:string, project_id:number, refresh:boolean) => {
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log(user, project_id, refresh)

  useEffect(() => {
    setLoading(true)
    getProject(user, project_id)
      .then((res) => {
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