import { PiHandWavingBold } from "react-icons/pi";
import { Link } from "react-router-dom";


const Dashboard = () => {

  return (
    <div className="dashboard-container" style={{ marginTop: '150px' }}>
      <h2 style={{ marginTop: '25px' }}>
        <span>Hi <PiHandWavingBold size={'50px'} style={{ marginTop: '5px' }} /></span> User</h2>
      <Link to="/login">
        <button type="submit" style={{ marginTop: '10px' }}>Log out</button>
      </Link>
    </div>
  );
};

export default Dashboard;
