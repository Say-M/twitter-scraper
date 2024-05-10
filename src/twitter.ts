import axios from 'axios';

const apiRequest = axios.create({
  baseURL: 'https://twitter-api45.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': '26d680d24emsh15e5224cda17b80p1265adjsn6bac4110c86c',
    'X-RapidAPI-Host': 'twitter-api45.p.rapidapi.com',
  },
});

export const getInformation = async (screenname: string) => {
  try {
    const { data } = await apiRequest.get('timeline.php', {
      params: { screenname },
    });
    return { status: 'success', data };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      data: error?.toString() || 'An error occurred',
    };
  }
};
