import React, { useEffect, useState, type JSX } from 'react'
import './MyProducts.css'
import { fetchInventory } from '../../services/inventoryService'
import { useSeller } from '../../contexts/SellerContext'
import type { InventoryProduct } from '../../types/inventory'

const MyProducts: React.FC = (): JSX.Element => {
  const { seller, login } = useSeller();
  const [searchText, setSearchText] = useState("")
  const [products, setProducts] = useState<InventoryProduct[]>([])

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

  // Filter products by title or product id
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
                  <td>{product.isActive ? 'active' : 'inactive'}</td>
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
