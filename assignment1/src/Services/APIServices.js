
const baseAPI = 'http://localhost:8080/api/v1';

export const loginResponse = async (username, password) => {
  try {
    const response = await fetch(`${baseAPI}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    return response;
  } catch (e) {
    console.log(e);
    alert('Something went wrong..');
    return {};
  }
};

export const getLaptopData = async () => {
  try {
    const response = await fetch(`${baseAPI}/product`);
    return await response.json();
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getLaptopById = async (id) => {
  try {
    const response = await fetch(`${baseAPI}/product/${id}`);
    return await response.json();
  } catch (e) {
    console.log(e);
    alert('Something went wrong..');
    return {};
  }
};

export const getCartsData = async () => {
  try {
    const response = await fetch(`${baseAPI}/cart`);
    return await response.json();
  } catch (e) {
    console.log(e);
    return [];
  }
};


export const placeYourOrder = async (orderData) => {
  try {
    const response = await fetch(`${baseAPI}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...orderData }),
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    return;
  }
};

export const addLaptopToCart = async (userId, productId, qty) => {
  try {
    const response = await fetch(`${baseAPI}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: userId, product: productId, quantity: qty }),
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    return;
  }
};

export const deleteLaptopFromCart = async (cartItemId) => {
  try {
    const response = await fetch(`${baseAPI}/cart/${cartItemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    return;
  }
};

export const deleteEntireCart = async () => {
  try {
    const response = await fetch(`${baseAPI}/cart`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    return;
  }
};

// 
export const addLaptop = async (productData) => {
  try {
    const response = await fetch(`${baseAPI}/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...productData }),
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    return;
  }
};

export const updateLaptop = async (productId, productData) => {
  try {
    const response = await fetch(`${baseAPI}/product/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...productData }),
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    return;
  }
};

export const deleteLaptop = async (productItemId) => {
  try {
    const response = await fetch(`${baseAPI}/product/${productItemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    return;
  }
};