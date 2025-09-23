import React, { useEffect, useState, type JSX } from 'react'
import './MyProducts.css'
import { fetchInventory } from '../../services/inventoryService'
import { useSeller } from '../../contexts/SellerContext'
import type { InventoryProduct } from '../../types/inventory'
import { fetchToggleProductAvailability } from '../../services/productService'
import toast from 'react-hot-toast'
import reload from '../../assets/reload.svg'

const MyProducts: React.FC = (): JSX.Element => {
  const { seller, login } = useSeller();
  const [searchText, setSearchText] = useState("")
  const [products, setProducts] = useState<InventoryProduct[]>([])
const [toggleLoading, setToggleLoading] = useState<string | boolean>(false);


  const getInventoryProducts = async () => {
    try {
      const data = await fetchInventory(seller, login)
      setProducts(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getInventoryProducts()
  }, [])

  const handleToggleActive = async (id: string) => {
  try {
    setToggleLoading(id)
    const res = await fetchToggleProductAvailability(seller, login, id);
    setProducts(prev =>
      prev.map(product =>
        product._id === res.productId ? { ...product, isActive: res.isActive } : product
      )
    );
  } catch (err:any) {
    toast.error(err.message || "unable to toggle at the moment")
  }
  finally{
    setToggleLoading(false)
  }
};


  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase()) ||
    product._id.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div id="my-products">
      <header>
        <h2>My Products</h2>
      </header>
      <main>
        <input
          type="search"
          placeholder="Search by title or ID"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Product Images</th>
                <th>Product ID</th>
                <th>Title</th>
                <th>Pricing</th>
                <th>Availability</th>
                <th>Listing Date&Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <label id='active-status'>
                      <div className="active-input">
                        {toggleLoading===product._id?<img className='loading' src={reload} alt="" />:
                      <input
                        type="checkbox"
                        checked={product.isActive}
                        onChange={() => handleToggleActive(product._id)}
                      />}
                      </div>
                      <span className={product.isActive ? 'active' : 'inactive'}>
                        {product.isActive ? ' Available' : 'Not Available'}
                      </span>
                    </label>
                  </td>
                  <td>
                    {product.productImages.length > 0 && (
                      <img
                        src={product.productImages[0]}
                        alt={product.title}
                        className="product-img"
                      />
                    )}
                  </td>
                  <td><strong>{product._id}</strong></td>
                  <td className='title'>{product.title}</td>
                  <td>
                    {product.actualPrice !== product.price && <p className='actual-price'> ₹{product.actualPrice}</p>}
                    {product.discount > 0 && (
                      <span className="discount">
                        -{product.discount}% off
                      </span>
                    )}
                    <p className='price'>₹{product.price}</p>
                  </td>
                  <td className='availability'>
                    <strong>{product.stock}{" "}</strong>
                    <br />
                    <span>out of </span>
                    <strong>{product.initialStock} </strong> total
                  </td>
                  <td>
                    <p>
                      {new Date(product.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}{' '}
                    </p>
                    {new Date(product.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default MyProducts
