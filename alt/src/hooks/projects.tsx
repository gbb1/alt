/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { getProjects } from '../../db/projects.ts'

const useGetProjects = (user:string, refresh:boolean) => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProjects(user)
    .then((res:any) => {
        res = res.sort((a:any, b:any) => b.accessed.seconds - a.accessed.seconds)
        setProjects(res)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
      })

  }, [user, refresh]);

  return { projects, loading, error };
};

export {
  useGetProjects
}