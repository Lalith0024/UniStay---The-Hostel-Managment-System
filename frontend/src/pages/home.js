import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    // const [loggedInUser, setLoggedInUser] = useState('');
    const [stats, setStats] = useState({ projects: 0, tasks: 0, completed: 0 });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        // setLoggedInUser(user);
        fetchDashboardData();
    }, [navigate])

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('Logged out successfully');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    const fetchDashboardData = async () => {
        try {
            setTimeout(() => {
                setStats({ projects: 12, tasks: 48, completed: 32 });
                setLoading(false);
            }, 800);
        } catch (err) {
            handleError(err.message || 'Network error. Please try again.');
            setLoading(false);
        }
    }

    return (
        <div className='home-container'>
            <header className='home-header'>
                <div className='header-content'>
                    <div className='user-info'>
                        <h1>Dashboard</h1>
                        <p className='welcome-text'>Welcome back, {'User'}!</p>
                    </div>
                    <button onClick={handleLogout} className='btn-logout'>Logout</button>
                </div>
            </header>
            
            <main className='home-main'>
                <section className='stats-section'>
                    <div className='stat-card'>
                        <div className='stat-icon'>📊</div>
                        <div className='stat-content'>
                            <h3>{loading ? '...' : stats.projects}</h3>
                            <p>Active Projects</p>
                        </div>
                    </div>
                    <div className='stat-card'>
                        <div className='stat-icon'>📝</div>
                        <div className='stat-content'>
                            <h3>{loading ? '...' : stats.tasks}</h3>
                            <p>Total Tasks</p>
                        </div>
                    </div>
                    <div className='stat-card'>
                        <div className='stat-icon'>✅</div>
                        <div className='stat-content'>
                            <h3>{loading ? '...' : stats.completed}</h3>
                            <p>Completed</p>
                        </div>
                    </div>
                </section>
                <section className='wip-section'>
                    <div className='section-header'>
                        <h2>Work in Progress</h2>
                        <span className='badge'>Beta</span>
                    </div>
                    <div className='wip-content'>
                        <div className='wip-item'>
                            <div className='wip-icon'>🚧</div>
                            <div className='wip-text'>
                                <h3>Project Management</h3>
                                <p>We're building an advanced project management system. Stay tuned for updates!</p>
                                <span className='progress-bar'>
                                    <span className='progress-fill' style={{width: '65%'}}></span>
                                </span>
                                <span className='progress-text'>65% Complete</span>
                            </div>
                        </div>
                        <div className='wip-item'>
                            <div className='wip-icon'>⚡</div>
                            <div className='wip-text'>
                                <h3>Analytics Dashboard</h3>
                                <p>Real-time analytics and insights are coming soon. This feature will help you track your progress.</p>
                                <span className='progress-bar'>
                                    <span className='progress-fill' style={{width: '40%'}}></span>
                                </span>
                                <span className='progress-text'>40% Complete</span>
                            </div>
                        </div>
                        <div className='wip-item'>
                            <div className='wip-icon'>🔔</div>
                            <div className='wip-text'>
                                <h3>Notification System</h3>
                                <p>Get notified about important updates and milestones. Currently in development.</p>
                                <span className='progress-bar'>
                                    <span className='progress-fill' style={{width: '80%'}}></span>
                                </span>
                                <span className='progress-text'>80% Complete</span>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='quick-actions'>
                    <h2>Quick Actions</h2>
                    <div className='actions-grid'>
                        <button className='action-btn'>
                            <span className='action-icon'>➕</span>
                            <span>New Project</span>
                        </button>
                        <button className='action-btn'>
                            <span className='action-icon'>📋</span>
                            <span>Create Task</span>
                        </button>
                        <button className='action-btn'>
                            <span className='action-icon'>👥</span>
                            <span>Invite Team</span>
                        </button>
                        <button className='action-btn'>
                            <span className='action-icon'>⚙️</span>
                            <span>Settings</span>
                        </button>
                    </div>
                </section>
                <section className='recent-activity'>
                    <h2>Recent Activity</h2>
                    <div className='activity-list'>
                        <div className='activity-item'>
                            <div className='activity-dot'></div>
                            <div className='activity-content'>
                                <p><strong>You</strong> completed a task</p>
                                <span className='activity-time'>2 hours ago</span>
                            </div>
                        </div>
                        <div className='activity-item'>
                            <div className='activity-dot'></div>
                            <div className='activity-content'>
                                <p><strong>Project Alpha</strong> was updated</p>
                                <span className='activity-time'>5 hours ago</span>
                            </div>
                        </div>
                        <div className='activity-item'>
                            <div className='activity-dot'></div>
                            <div className='activity-content'>
                                <p><strong>New team member</strong> joined</p>
                                <span className='activity-time'>1 day ago</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <ToastContainer />
        </div>
    )
}

export default Home