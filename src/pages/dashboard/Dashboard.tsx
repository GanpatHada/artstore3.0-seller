import React, { useEffect, useState, type JSX } from 'react';
import './Dashboard.css';
import { useSeller } from '../../contexts/SellerContext';
import { fetchSellerStats } from '../../services/sellerService';
import { IoIosStarOutline } from 'react-icons/io';
import DashboardLoader from './components/DashboardLoader';
import toast from 'react-hot-toast';
import News from './components/news/News';
import Tutorial from './components/tutorial/Tutorial';
import { CiUnlock, CiLock } from 'react-icons/ci';
import BetaBadge from '../../components/common/BetaBadge';
import StockChart from './components/StockChart';
import SellerForums from './components/seller_forums/SellerForums';

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import { useNavigate } from 'react-router-dom';
import { AuthError } from '../../services/tokenService';

/* ===================== TYPES ===================== */
interface StatsData {
  totalProducts: number;
  totalStockAdded: number;
  totalSold: number;
  remainingStock: number;
  availableProducts: number;
  unavailableProducts: number;
}

interface HighlightProps {
  title: string | JSX.Element;
  value?: number | string | JSX.Element;
}

/* ===================== COMPONENTS ===================== */
const Highlight: React.FC<HighlightProps> = ({ title, value }): JSX.Element => (
  <div className="highlight">
    <header>
      <h5>{title}</h5>
    </header>
    <main>{value}</main>
  </div>
);

const BetaHighlights: React.FC<HighlightProps> = ({
  title,
  value,
}): JSX.Element => (
  <div className="beta-highlight">
    <header>
      <h5>{title}</h5>
    </header>
    <main>{value}</main>
  </div>
);

/* ===================== DASHBOARD ===================== */
const Dashboard: React.FC = (): JSX.Element => {
  const { seller, login } = useSeller();
  const navigate = useNavigate();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [highlights, setHighlights] = useState<HighlightProps[]>([]);
  const [customise, setCustomise] = useState<boolean>(false);

  /* ===================== FETCH STATS ===================== */
  useEffect(() => {
    const getStats = async () => {
      setLoading(true);
      try {
        const data = await fetchSellerStats(seller, login);
        setStats(data);

        setHighlights([
          { title: 'Total Products', value: data.totalProducts },
          { title: 'Total Stock Added', value: data.totalStockAdded },
          { title: 'Total Sold Products', value: data.totalSold },
          { title: 'Remaining Stock', value: data.remainingStock },
          { title: 'Available Products', value: data.availableProducts },
          { title: 'Unavailable Products', value: data.unavailableProducts },
        ]);
      } catch (err: any) {
        if (err instanceof AuthError) {
          toast.error('Session expired. Please login again.');
          navigate('/login', { replace: true });
          return;
        }
        toast.error(err?.message || 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, [seller, login, navigate]);

  const betaHightlights = [
    {
      title: (
        <>
          Account Health <BetaBadge />
        </>
      ),
      value: 'Good',
    },
    {
      title: (
        <>
          Customer Feedback <BetaBadge />
        </>
      ),
      value: (
        <span style={{ color: 'gray' }}>
          <IoIosStarOutline />
          <IoIosStarOutline />
          <IoIosStarOutline />
          <IoIosStarOutline />
          <IoIosStarOutline />
        </span>
      ),
    },
    {
      title: (
        <>
          Buyer Messages <BetaBadge />
        </>
      ),
      value: 5,
    },
  ];

  const chartData = [
    { name: 'Total Sold', value: stats?.totalSold ?? 0 },
    { name: 'Remaining Stock', value: stats?.remainingStock ?? 0 },
  ];

  /* ===================== REACT DND HANDLER ===================== */
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedHighlights = Array.from(highlights);
    const [removed] = updatedHighlights.splice(result.source.index, 1);
    updatedHighlights.splice(result.destination.index, 0, removed);
    setHighlights(updatedHighlights);
  };

  /* ===================== RENDER ===================== */
  return (
    <div id="dashboard">
      {loading ? (
        <DashboardLoader />
      ) : (
        <>
          <nav>
            <h2>My Dashboard</h2>
            <button onClick={() => setCustomise((prev) => !prev)}>
              <span>{customise ? 'Lock Layout' : 'Customise Layout'}</span>{' '}
              <i>{customise ? <CiLock /> : <CiUnlock />}</i>
            </button>
          </nav>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="highlights" direction="horizontal">
              {(provided) => (
                <header
                  className="highlights-container"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {highlights.map((item, index) => (
                    <Draggable
                      key={index}
                      draggableId={index.toString()}
                      index={index}
                      isDragDisabled={!customise}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`draggable-item ${customise ? 'draggable-active' : ''}`}
                        >
                          <Highlight title={item.title} value={item.value} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </header>
              )}
            </Droppable>
          </DragDropContext>

          <header className="beta-highlights-container">
            {betaHightlights.map((item, index) => (
              <BetaHighlights
                key={index}
                title={item.title}
                value={item.value}
              />
            ))}
          </header>

          <main>
            <StockChart data={chartData} />
            <Tutorial />
            <News />
            <SellerForums />
          </main>
        </>
      )}
    </div>
  );
};

export default Dashboard;
