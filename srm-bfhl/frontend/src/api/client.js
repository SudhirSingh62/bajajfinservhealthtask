// Name: Sudhir Singh
// Roll Number: YOURROLL

import axios from 'axios';

const SERVER_ENDPOINT = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const dispatchNetworkAnalysis = async (edgePayload) => {
  const serverResponse = await axios.post(`${SERVER_ENDPOINT}/bfhl`, { data: edgePayload });
  return serverResponse.data;
};
