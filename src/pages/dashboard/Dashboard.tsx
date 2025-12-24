import React, { useEffect, useRef, useState, type JSX } from "react";
import "./Dashboard.css";
import { useSeller } from "../../contexts/SellerContext";
import { fetchSellerStats } from "../../services/sellerService";
import { IoIosStarOutline } from "react-icons/io";
import DashboardLoader from "./components/DashboardLoader";
import toast from "react-hot-toast";
import News from "./components/news/News";
import Tutorial from "./components/tutorial/Tutorial";
import { CiUnlock, CiLock } from "react-icons/ci";
import BetaBadge from "../../components/common/BetaBadge";

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

/* ===================== DASHBOARD ===================== */

const Dashboard: React.FC = (): JSX.Element => {
  const { seller, login } = useSeller();

  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [order, setOrder] = useState<number[]>([]);
  const [dragItem, setDragItem] = useState<number | null>(null);
  const [customise, setCustomise] = useState<boolean>(false);
  const [canDrag, setCanDrag] = useState<boolean>(false);

  const pressTimer = useRef<number | null>(null);

  /* ===================== FETCH STATS ===================== */

  useEffect(() => {
    const getStats = async () => {
      setLoading(true);
      try {
        const data = await fetchSellerStats(seller, login);
        setStats(data);
      } catch (err: any) {
        toast.error(err?.message || "Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, [seller, login]);

  /* ===================== HIGHLIGHTS ===================== */

  const highlights = [
    { title: "Total Products", value: stats?.totalProducts },
    { title: "Total Stock Added", value: stats?.totalStockAdded },
    { title: "Total Sold", value: stats?.totalSold },
    { title: "Remaining Stock", value: stats?.remainingStock },
    { title: "Available Products", value: stats?.availableProducts },
    { title: "Unavailable Products", value: stats?.unavailableProducts },
    { title: <>Account Health<BetaBadge /></>, value: "Good" },
    {
      title: <>Customer Feedback<BetaBadge /></>,
      value: (
        <span style={{ color: "gray" }}>
          <IoIosStarOutline />
          <IoIosStarOutline />
          <IoIosStarOutline />
          <IoIosStarOutline />
          <IoIosStarOutline />
        </span>
      ),
    },
  ];


  useEffect(() => {
    setOrder(highlights.map((_, i) => i));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ===================== DRAG LOGIC ===================== */

  const handleMouseDown = () => {
    if (!customise) return;

    pressTimer.current = window.setTimeout(() => {
      setCanDrag(true);
    }, 350);
  };

  const clearPressTimer = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    setCanDrag(false);
  };

  const handleDragStart = (index: number) => {
    if (!customise || !canDrag) return;
    setDragItem(index);
  };

  const handleDragEnter = (index: number) => {
    if (dragItem === null || dragItem === index) return;

    const newOrder = [...order];
    const dragged = newOrder[dragItem];

    newOrder.splice(dragItem, 1);
    newOrder.splice(index, 0, dragged);

    setOrder(newOrder);
    setDragItem(index);
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
              {customise ? "Lock Layout" : "Customise Layout"}{" "}
              <span>{customise ? <CiLock /> : <CiUnlock />}</span>
            </button>
          </nav>


          <header className="highlights-container">
            {order.map((itemIndex, position) => (
              <div
                key={itemIndex}
                draggable={customise && canDrag}
                onMouseDown={handleMouseDown}
                onMouseUp={clearPressTimer}
                onMouseLeave={clearPressTimer}
                onDragStart={() => handleDragStart(position)}
                onDragEnter={() => handleDragEnter(position)}
                className={`draggable-item ${customise ? "draggable-active" : ""
                  }`}
              >
                <Highlight
                  title={highlights[itemIndex].title}
                  value={highlights[itemIndex].value}
                />
              </div>
            ))}
          </header>

          <main>
            <News />
            <Tutorial />
          </main>
        </>
      )}
    </div>
  );
};

export default Dashboard;
