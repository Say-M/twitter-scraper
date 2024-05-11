import axios from 'axios';

const apiRequest = axios.create({
  baseURL: 'https://twitter-api45.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_X_RAPIDAPI_KEY!,
    'X-RapidAPI-Host': import.meta.env.VITE_X_RAPIDAPI_HOST!,
  },
});

export const getInformation = async (screenname: string) => {
  try {
    const { data } = await apiRequest.get('timeline.php', {
      params: { screenname },
    });
    if (data?.user?.status === 'error') throw new Error('User not found');
    return { status: 'success', data };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      data: error?.toString() || 'An error occurred',
    };
  }
};
