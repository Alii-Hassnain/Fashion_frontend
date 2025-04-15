import axios from "axios";

const BASE_URL = "https://fashionbackendfork.up.railway.app/api";

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get-Order`);
    // console.log("order response from backend in order servces : ",response);
    return response.data.orders; // Return the orders list
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const updateOrder = async (orderId, updatedData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/update-Order/${orderId}`,
      updatedData
    );
    console.log(
      "updatedorder response from backend in order servces : ",
      response.data.orders
    );
    return response.data.orders; // Return the updated order data
  } catch (error) {
    console.error("Error updating order:", error);
    return null;
  }
};
export const getOrdersByUserId = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-Order/${userId}`);
    console.log(
      "order by id response from backend in order servces : ",
      response
    );
    return response.data.orders; // Return the orders list
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
