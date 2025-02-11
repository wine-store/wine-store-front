import axios from "axios";
import { useStoreForWine } from "../store/storeForWine";
const setWine = useStoreForWine(state => state.setWine);
export const fetchData = async () => {
  try {
    const queryString = window.location.search; 
    const response = await axios.get(`/wines?${queryString}`);
    setWine(response.data);
  } catch (error) {
    console.error('Error fetching wines:', error);
  }
};
