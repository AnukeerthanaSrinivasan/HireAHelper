import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyTaskPage.css';
import { Badge } from '../ui/button';
import '../ui/button.css';

const MyTaskPage = () => {
  // State for the selected date in calendar and active navigation item
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeNav, setActiveNav] = useState('myTasks');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Navigation hook
  const navigate = useNavigate();
  
  // Ref for profile dropdown
  const profileRef = useRef(null);
  
  // Handle click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileRef]);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
    // Here you would typically filter tasks or make an API call
  };
  
  // Sample task data with images matching the screenshot
  const myTasks = [
    {
      id: 7,
      title: 'Sample Task 7',
      description: 'Need help moving furniture from my apartment to a new house. Heavy lifting required. Will provide...',
      location: 'Downtown Seattle, WA',
      startDate: 'Jul 5, 2024',
      endDate: '6:00 PM',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      status: 'Active'
    },
    {
      id: 8,
      title: 'Sample Task 8',
      description: 'Need help moving furniture from my apartment to a new house. Heavy lifting required. Will provide...',
      location: 'Downtown Seattle, WA',
      startDate: 'Jul 5, 2024',
      endDate: '6:00 PM',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      status: 'In Progress'
    },
    {
      id: 9,
      title: 'Sample Task 9',
      description: 'Need help moving furniture from my apartment to a new house. Heavy lifting required. Will provide...',
      location: 'Downtown Seattle, WA',
      startDate: 'Jul 5, 2024',
      endDate: '6:00 PM',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      status: 'Active'
    }
  ];

  // Calendar functionality
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  
  // Get month name
  const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    const days = [];
    
    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        currentMonth: false,
        selected: false
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        currentMonth: true,
        selected: i === selectedDate.getDate() && 
                 currentMonth === selectedDate.getMonth() && 
                 currentYear === selectedDate.getFullYear()
      });
    }
    
    // Next month days (to fill the grid)
    const remainingDays = 42 - days.length; // 6 rows x 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        currentMonth: false,
        selected: false
      });
    }
    
    return days;
  };
  
  // Handle month navigation
  const handlePrevMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 0) {
        setCurrentYear(prevYear => prevYear - 1);
        return 11;
      }
      return prev - 1;
    });
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 11) {
        setCurrentYear(prevYear => prevYear + 1);
        return 0;
      }
      return prev + 1;
    });
  };
  
  // Handle date selection
  const handleDateSelect = (day, isCurrentMonth) => {
    if (isCurrentMonth) {
      setSelectedDate(new Date(currentYear, currentMonth, day));
    }
  };

  return (
    <div className="feed-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">Hire A Helper</div>
        
        <nav className="sidebar-nav">
          <ul>
            <li 
              className={activeNav === 'feed' ? 'active' : ''}
              onClick={() => {
                setActiveNav('feed');
                navigate('/feed');
              }}
            >
              <span>Feed</span><span className="count">128</span>
            </li>
            <li 
              className={activeNav === 'myTasks' ? 'active' : ''}
              onClick={() => setActiveNav('myTasks')}
            >
              <span>My Tasks</span><span className="count">9</span>
            </li>
            <li 
              className={activeNav === 'requests' ? 'active' : ''}
              onClick={() => setActiveNav('requests')}
            >
              <span>Requests</span>
            </li>
            <li 
              className={activeNav === 'myRequests' ? 'active' : ''}
              onClick={() => setActiveNav('myRequests')}
            >
              <span>My Requests</span><span className="count">23</span>
            </li>
            <li 
              className={activeNav === 'addTask' ? 'active' : ''}
              onClick={() => setActiveNav('addTask')}
            >
              <span>Add Task</span>
            </li>
            <li 
              className={activeNav === 'settings' ? 'active' : ''}
              onClick={() => setActiveNav('settings')}
            >
              <span>Settings</span>
            </li>
          </ul>
        </nav>
        
        {/* Calendar */}
        <div className="calendar-widget">
          <div className="calendar-header">
            <button className="prev-month" onClick={handlePrevMonth}>&lt;</button>
            <div className="current-month">{monthName} {currentYear}</div>
            <button className="next-month" onClick={handleNextMonth}>&gt;</button>
          </div>
          
          <div className="calendar-days">
            <div className="weekday">Su</div>
            <div className="weekday">Mo</div>
            <div className="weekday">Tu</div>
            <div className="weekday">We</div>
            <div className="weekday">Th</div>
            <div className="weekday">Fr</div>
            <div className="weekday">Sa</div>
            
            {generateCalendarDays().map((day, index) => (
              <div 
                key={index} 
                className={`day ${!day.currentMonth ? 'prev-month' : ''} ${day.selected ? 'selected' : ''}`}
                onClick={() => handleDateSelect(day.day, day.currentMonth)}
              >
                {day.day}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        {/* Header with search and user profile */}
        <div className="header">
          <form className="search-bar" onSubmit={handleSearchSubmit}>
            <button type="submit" className="search-icon">
              <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </i>
            </button>
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form>
          <div className="user-profile" ref={profileRef}>
            <div 
              className="profile-container" 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="user-avatar">
                <img src="https://ui-avatars.com/api/?name=S&background=6c5ce7&color=fff" alt="User" />
              </div>
              <div className="user-info">
                <div className="user-name">shadcn</div>
                <div className="user-email">m@example.com</div>
              </div>
            </div>
            {showProfileMenu && (
              <div className="profile-dropdown">
                <ul>
                  <li>My Profile</li>
                  <li>Account Settings</li>
                  <li>Help Center</li>
                  <li onClick={() => alert('Logging out...')}>Logout</li>
                </ul>
              </div>
            )}  
          </div>
        </div>
        
        {/* Add New Task Button */}
        <div className="add-task-button-container">
          <button className="add-task-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
              <path d="M12 5v14M5 12h14"></path>
            </svg>
            Add New Task
          </button>
        </div>
        
        {/* Task Grid */}
        <div className="task-grid">
          {myTasks.map(task => (
            <div className="task-card" key={task.id}>
              <div className="task-image">
                <img src={task.image} alt={task.title} />
              </div>
              <h3 className="task-title">{task.title}</h3>
              <p className="task-description">{task.description}</p>
              <div className="task-details">
                <p className="task-location">
                  <i className="location-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </i> 
                  {task.location}
                </p>
                <p className="task-dates">
                  <i className="calendar-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </i>
                  <span>{task.startDate} • 2:00 PM - {task.endDate}</span>
                </p>
              </div>
              <div className="task-status-container">
                <Badge variant={task.status.toLowerCase().replace(' ', '-')}>
                  {task.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTaskPage;