
const baseAPI = 'http://localhost:8080/api/v1';

export const loginResponse = async (username, password) => {
  const response = await fetch(`${baseAPI}/user/login?username=${username}&password=${password}`);
  return response;
};

export const getLaptopData = async () => {
  const response = await fetch(`${baseAPI}/product`);
  return await response.json();
};

export const getLaptopById = async (id) => {
  const response = await fetch(`${baseAPI}/product/${id}`);
  return await response.json();
};

export const getCartsData = async () => {
  const response = await fetch(`${baseAPI}/cart`);
  return await response.json();
};


export const placeYourOrder = async (orderData) => {
  const response = await fetch(`${baseAPI}/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...orderData }),
  });
  return await response.json();
};

export const addLaptopToCart = async (userId, productId, qty) => {
  const response = await fetch(`${baseAPI}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: userId, product: productId, quantity: qty }),
  });
  return await response.json();
};

export const deleteLaptopFromCart = async (cartItemId) => {
  const response = await fetch(`${baseAPI}/cart/${cartItemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

export const deleteEntireCart = async () => {
  const response = await fetch(`${baseAPI}/cart`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

// 
export const addLaptop = async (productData) => {
  const response = await fetch(`${baseAPI}/product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...productData }),
  });
  return await response.json();
};

export const updateLaptop = async (productId, productData) => {
  const response = await fetch(`${baseAPI}/product/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...productData }),
  });
  return await response.json();
};

export const deleteLaptop = async (productItemId) => {
  const response = await fetch(`${baseAPI}/product/${productItemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};