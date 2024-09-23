import axiosInstance from './axios-config';

export const totalItemsPerPage = 5;

export const fetchCategories = async () => {
  try {
    const { data } = await axiosInstance.get('getAllCategories');
    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export const fetchPaginatedData = async (page, category) => {
  try {
    const { data } = await axiosInstance.get(
      category ? 'getAllNewsBy' : 'getAllBlogs',
      {
        params: {
          ...(category && { category }),
          page,
          size: totalItemsPerPage,
        },
      }
    );

    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export const fetchNewsById = async ({ news }) => {
  try {
    const { data } = await axiosInstance.get('blog', {
      params: {
        id: news,
      },
      // baseURL: 'https://thehit.rototransindia.com/admin/api/',
    });

    return data.details;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export const fetchSingleShort = async () => {
  try {
    const { data } = await axiosInstance.get('getAllShorts', {
      params: {
        page: 0,
        size: 1,
      },
    });

    const shortsList = data.filter((item) => item.status !== 'Inactive');

    return shortsList[0];
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export const fetchShorts = async (page) => {
  try {
    const { data } = await axiosInstance.get('getAllShorts', {
      params: {
        page,
        size: totalItemsPerPage,
      },
    });

    console.log(data);

    return data.filter((item) => item.status !== 'Inactive').map((i) => i.link);
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export const fetchBanners = async () => {
  try {
    const { data } = await axiosInstance.get('getAllBanners');

    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};
