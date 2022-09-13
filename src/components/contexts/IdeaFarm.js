import axios from 'axios'
import React,{useState,createContext, useEffect} from 'react';
import config from "../../config.json";

export const IdeaContext = createContext()
const IdeaFarmProvider = ({children}) => {
    useEffect(() => {
    getIdeaFarm()
    },[])
  const url = config.server_url
    const [ideaFarm,setIdeaFarm] = useState([])

    const getIdeaFarm = async () => {
        const res = await axios.get(`${url}/show-idea-farms`)
        setIdeaFarm(res.data.data)
    }
  return (
    <IdeaContext.Provider value={{ideaFarm, setIdeaFarm}}>{children}</IdeaContext.Provider>

  )
}

export default IdeaFarmProvider;