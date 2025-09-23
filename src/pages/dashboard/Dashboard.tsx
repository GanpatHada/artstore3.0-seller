import React, { useEffect, useState, type JSX } from 'react'
import './Dashboard.css'
import { useSeller } from '../../contexts/SellerContext'
import { fetchSellerStats } from '../../services/sellerService'
import { IoIosStarOutline } from 'react-icons/io'
import DashboardLoader from './components/DashboardLoader'
import toast from 'react-hot-toast'

interface StatsData {
  totalProducts: number
  totalQuantity: number
  soldProducts: number
  unsoldProducts: number
  availableProducts: number
  unavailableProducts: number
}

interface HighlightProps {
 title: string
value?: number | string | JSX.Element
}

const Highlight: React.FC<HighlightProps> = ({ title, value }): JSX.Element => (
  <div className="highlight">
    <header>
      <h5>{title}</h5>
    </header>
    <main>
        {value}
    </main>
  </div>
)

const Dashboard: React.FC = (): JSX.Element => {
  const { seller, login } = useSeller()
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading,setLoading]=useState<Boolean>(false)

  useEffect(() => {
    const getStats = async () => {
        setLoading(true);
      try {
        const data = await fetchSellerStats(seller, login)
        setStats(data)
      } catch (err:any) {
        toast.error(err)
      }
      finally{
        setLoading(false)
      }
    }
    getStats()
  }, [seller, login])

  const highlights = [
    { title: 'Total Products', value: stats?.totalProducts },
    { title: 'Total Quantity', value: stats?.totalQuantity },
    { title: 'Sold Products', value: stats?.soldProducts },
    { title: 'Unsold Products', value: stats?.unsoldProducts },
    { title: 'Available Products', value: stats?.availableProducts },
    { title: 'Unavailable Products', value: stats?.unavailableProducts },
    // Dummy columns that appear after loading
    { title: 'Account Health', value: (
       <div className="health-wrapper">
          <div className="health-status">

          </div>
          <span>Good</span>
       </div> 
    ) },
    { 
      title: 'Customer Feedback', 
      value: (
        <span style={{color:'gray'}}>
          <IoIosStarOutline />
          <IoIosStarOutline />
          <IoIosStarOutline />
          <IoIosStarOutline />
          <IoIosStarOutline />
        </span>
      ) 
    },
  ]

  return (
    <div id="dashboard">
  {loading ? (
    <DashboardLoader/>
  ) : (
    <>
      <header className="highlights-container">
        {highlights.map((h, idx) => (
          <Highlight key={idx} title={h.title} value={h.value} />
        ))}
      </header>
      <main>
        {/* Add other dashboard content here */}
      </main>
    </>
  )}
</div>
  )
}

export default Dashboard
