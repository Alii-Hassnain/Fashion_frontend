import React from 'react'

const EidSale = () => {
  return (
    <div className="align-elements relative bg-gradient-to-r from-gray-400 to-purple-900 text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between">
    {/* Sale Details */}
    <div className="flex-1 text-center md:text-left">
      <h2 className="text-4xl font-bold">FashionVista Mega Sale</h2>
      <p className="mt-2 text-lg">Up to <span className="font-bold text-yellow-300">30% OFF</span> on trending fashion!</p>
      <p className="mt-2 text-sm bg-green-600 px-4 py-1 inline-block rounded-md">🚚 Free Delivery on All Orders</p>
    </div>

    {/* Featured Products */}
    <div className="flex items-center mt-4 md:mt-0">
      <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHVzYzF0cGtwZjZyc3N1YjJsNnZtZ3AzdmtnaTE4bGR2MHY1eDkxeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FcdEfMJAw60cSFNGA9/giphy.gif" alt="Dress" className="w-24 h-24 object-contain" />
      <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWpiaTk3enZmc2g4djloZWJyOG1hMjFpN240YWxqcnh1dHAwZWtoayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JmCiYqkghG9zMJCouy/giphy.gif" alt="Shoes" className="w-24 h-24 object-contain" />
      {/* <img src="/images/bag.png" alt="Bag" className="w-24 h-24 object-contain" /> */}
    </div>

    {/* Call-to-Action */}
    <div className="mt-4 md:mt-0 ml-5">
      <a href="/shop" className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold shadow-lg hover:bg-yellow-500">Shop Now</a>
    </div>
  </div>
  )
}

export default EidSale