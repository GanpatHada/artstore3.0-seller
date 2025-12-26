import React, { useEffect, useState, type JSX } from 'react'
import './MyProducts.css'
import { fetchInventory } from '../../services/inventoryService'
import { useSeller } from '../../contexts/SellerContext'
import type { InventoryProduct } from '../../types/inventory'
import { fetchToggleProductAvailability } from '../../services/productService'
import toast from 'react-hot-toast'
import reload from '../../assets/reload.svg'
import { FaRegEdit } from 'react-icons/fa'
import { FaRegEye } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { AuthError } from '../../services/tokenService'

const MyProducts: React.FC = (): JSX.Element => {
  const { seller, login } = useSeller();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState<InventoryProduct[]>([]);
  const [toggleLoading, setToggleLoading] = useState<string | boolean>(false);
  const [sortOrder, setSortOrder] = useState<'latest' | 'mostSold'>('latest');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [loading, setLoading] = useState<boolean>(false)


  const getInventoryProducts = async () => {
    try {
      setLoading(true)
      const data = await fetchInventory(seller, login);
      setProducts(data);
    } catch (err: any) {
      if (err instanceof AuthError) {
        toast.error("Session expired. Please login again.");
        navigate("/login", { replace: true });
        return;
      }
      toast.error(err?.message || "Failed to load products");
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getInventoryProducts();
  }, []);

  const handleToggleActive = async (id: string) => {
    try {
      setToggleLoading(id);
      const res = await fetchToggleProductAvailability(seller, login, id);
      setProducts(prev =>
        prev.map(product =>
          product._id === res.productId ? { ...product, isActive: res.isActive } : product
        )
      );
    } catch (err: any) {
      if (err instanceof AuthError) {
        toast.error("Session expired. Please login again.");
        navigate("/login", { replace: true });
        return;
      }
      toast.error(err.message || "unable to toggle at the moment");
    }
    finally {
      setToggleLoading(false);
    }
  };


  const getSortedAndFilteredProducts = () => {
    let currentProducts = [...products];

    if (availabilityFilter === 'active') {
      currentProducts = currentProducts.filter(product => product.isActive);
    } else if (availabilityFilter === 'inactive') {
      currentProducts = currentProducts.filter(product => !product.isActive);
    }

    currentProducts = currentProducts.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase()) ||
      product._id.toLowerCase().includes(searchText.toLowerCase())
    );

    if (sortOrder === 'latest') {
      currentProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortOrder === 'mostSold') {
      currentProducts.sort((a, b) => (b.stock - b.stockSold) - (a.stock - a.stockSold));
    }

    return currentProducts;
  };

  const displayedProducts = getSortedAndFilteredProducts();

  return (
    <div id="my-products">
      <header>
        <h2>My Products</h2>
      </header>
      <main>
        <header className="filters-header">

          <input
            type="search"
            placeholder="Search by title or ID"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <strong>showing {displayedProducts.length} out of total {products.length} Products</strong>

          <div className="filters">
            <div className="sort-options">
              <label><strong>Sort by:</strong></label>
              <label>
                <input
                  type="radio"
                  name="sortOrder"
                  value="latest"
                  checked={sortOrder === 'latest'}
                  onChange={() => setSortOrder('latest')}
                />
                Latest Added
              </label>
              <label>
                <input
                  type="radio"
                  name="sortOrder"
                  value="mostSold"
                  checked={sortOrder === 'mostSold'}
                  onChange={() => setSortOrder('mostSold')}
                />
                Most Sold
              </label>
            </div>
            <span>|</span>
            <div className="availability-options">
              <label><strong>Availability:</strong></label>
              <label>
                <input
                  type="radio"
                  name="availabilityFilter"
                  value="all"
                  checked={availabilityFilter === 'all'}
                  onChange={() => setAvailabilityFilter('all')}
                />
                All
              </label>
              <label>
                <input
                  type="radio"
                  name="availabilityFilter"
                  value="active"
                  checked={availabilityFilter === 'active'}
                  onChange={() => setAvailabilityFilter('active')}
                />
                Active
              </label>
              <label>
                <input
                  type="radio"
                  name="availabilityFilter"
                  value="inactive"
                  checked={availabilityFilter === 'inactive'}
                  onChange={() => setAvailabilityFilter('inactive')}
                />
                Inactive
              </label>
            </div>
          </div>
        </header>
        <div className="table-container">
          {loading ? 'Loading ...' : <table className="product-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Product Images</th>
                <th>Title</th>
                <th>Pricing</th>
                <th>Stock</th>
                <th>Listing Date&Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <label id='active-status'>
                      <div className="active-input">
                        {toggleLoading === product._id ? <img className='loading' src={reload} alt="" /> :
                          <input
                            type="checkbox"
                            checked={product.isActive}
                            onChange={() => handleToggleActive(product._id)}
                          />}
                      </div>
                      <span className={product.isActive ? 'active' : 'inactive'}>
                        {product.isActive ? (
                          'Available'
                        ) : (
                          <>
                            Not <br /> Available
                          </>
                        )}
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

                  <td className='title'>
                    <strong>{product.title}</strong>
                    <span>{product.surface}</span> |
                    <span> {product.medium}</span>
                  </td>
                  <td className='pricing'>
                    {product.actualPrice !== product.price && <p className='actual-price'> ₹{product.actualPrice}</p>}
                    {product.discount > 0 && (
                      <span className="discount">
                        -{product.discount}% off
                      </span>
                    )}
                    <p className='price'>₹{product.price}</p>
                  </td>
                  <td className='availability'>
                    <span><strong>Total stock : </strong>{product.stock}</span>
                    <span><strong>Stock sold : </strong>{product.stockSold}</span>
                    <span> <strong>stock left : </strong>{product.stock - product.stockSold}</span>
                  </td>
                  <td className='date-time'>
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
                  <td>
                    <button onClick={() => toast("Comming soon, under progress", {
                      icon: "🚀",
                    })} title='edit' className="action"><FaRegEdit /></button>
                    <a target='blank' href={`https://artstoreonline.vercel.app/products/${product._id}`} title='view' className="action"><FaRegEye /></a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>}
        </div>
      </main>
    </div>
  )
}

export default MyProducts
