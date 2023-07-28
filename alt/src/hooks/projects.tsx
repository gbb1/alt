import { useState, useEffect, useMemo } from 'react'
import { createUser, addProject, getProjects } from '../../db/projects.ts'


const useGetProjects = (user:string, refresh:boolean) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    getProjects(user)
      .then((res) => {
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