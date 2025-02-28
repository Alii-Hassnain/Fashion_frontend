import axios from "axios";

const BASE_URL = "http://localhost:8080/api"

export const getAllOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/order`);
      console.log(response);
      return response.data.orders; // Return the orders list
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  };