"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AuthManager from "./AuthManager";
import styles from "./AdminDashboard.module.css";

type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  assigned: string;
  status: "Customer" | "Qualified" | "Working" | "Contacted" | "Proposal Sent";
  created: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  assigned: string;
  status: "Active" | "Inactive" | "Pending" | "Suspended" | "Verified";
  created: string;
};

type BackofficeItem = {
  id: string;
  name: string;
  email: string;
  phone: string;
  assigned: string;
  status: "Completed" | "In Progress" | "Pending" | "On Hold" | "Cancelled";
  created: string;
};

type Tab = "Leads" | "Users" | "Backoffice";

const mockLeads: Lead[] = [
  {
    id: "#3066",
    name: "Olivia Rhye",
    company: "Empire Mark",
    email: "rhye@empiremark.io",
    phone: "+1 (318) 698-3149",
    assigned: "OL",
    status: "Customer",
    created: "Just now"
  },
  {
    id: "#3065",
    name: "Phoenix Baker",
    company: "Wit Ventures",
    email: "baker@witventures.com",
    phone: "+1 (320) 507-6709",
    assigned: "PB",
    status: "Qualified",
    created: "44 mins ago"
  },
  {
    id: "#3064",
    name: "Lana Steiner",
    company: "Factor Four",
    email: "steiner@factorfour.com",
    phone: "+1 (208) 608-6292",
    assigned: "LS",
    status: "Working",
    created: "3 hr ago"
  },
  {
    id: "#3063",
    name: "Demi Wilkinson",
    company: "Market Square",
    email: "wilkinson@marketsq.com",
    phone: "+1 (317) 234-6462",
    assigned: "DW",
    status: "Contacted",
    created: "7 hr ago"
  },
  {
    id: "#3062",
    name: "Candice Wu",
    company: "Voice Firm",
    email: "candice@voicefirm.com",
    phone: "+1 (860) 539-7061",
    assigned: "CW",
    status: "Qualified",
    created: "12 hr ago"
  },
  {
    id: "#3061",
    name: "Natali Craig",
    company: "Maxus Media",
    email: "natali@maxusmedia.net",
    phone: "+1 (540) 683-1441",
    assigned: "NC",
    status: "Proposal Sent",
    created: "Yesterday"
  }
];

const mockUsers: User[] = [
  {
    id: "#U3066",
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    assigned: "JS",
    status: "Active",
    created: "Just now"
  },
  {
    id: "#U3065",
    name: "Sarah Johnson",
    email: "sarah.j@business.com",
    phone: "+1 (555) 987-6543",
    assigned: "SJ",
    status: "Verified",
    created: "2 hrs ago"
  },
  {
    id: "#U3064",
    name: "Mike Wilson",
    email: "mike.wilson@corp.com",
    phone: "+1 (555) 456-7890",
    assigned: "MW",
    status: "Pending",
    created: "5 hrs ago"
  },
  {
    id: "#U3063",
    name: "Emily Davis",
    email: "emily.davis@firm.com",
    phone: "+1 (555) 321-0987",
    assigned: "ED",
    status: "Inactive",
    created: "1 day ago"
  },
  {
    id: "#U3062",
    name: "Robert Brown",
    email: "robert.brown@office.com",
    phone: "+1 (555) 654-3210",
    assigned: "RB",
    status: "Suspended",
    created: "2 days ago"
  }
];

const mockBackoffice: BackofficeItem[] = [
  {
    id: "#B3066",
    name: "Document Processing",
    email: "admin@processing.com",
    phone: "+1 (555) 111-2222",
    assigned: "DP",
    status: "Completed",
    created: "Just now"
  },
  {
    id: "#B3065",
    name: "Invoice Management",
    email: "invoice@finance.com",
    phone: "+1 (555) 333-4444",
    assigned: "IM",
    status: "In Progress",
    created: "1 hr ago"
  },
  {
    id: "#B3064",
    name: "Data Analysis",
    email: "data@analytics.com",
    phone: "+1 (555) 555-6666",
    assigned: "DA",
    status: "Pending",
    created: "3 hrs ago"
  },
  {
    id: "#B3063",
    name: "Report Generation",
    email: "reports@system.com",
    phone: "+1 (555) 777-8888",
    assigned: "RG",
    status: "On Hold",
    created: "6 hrs ago"
  },
  {
    id: "#B3062",
    name: "System Maintenance",
    email: "maintenance@tech.com",
    phone: "+1 (555) 999-0000",
    assigned: "SM",
    status: "Cancelled",
    created: "Yesterday"
  }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("Leads");
  const [mounted, setMounted] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedBackoffice, setSelectedBackoffice] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Customer": return "#10b981";
      case "Qualified": return "#f59e0b";
      case "Working": return "#3b82f6";
      case "Contacted": return "#8b5cf6";
      case "Proposal Sent": return "#ef4444";
      case "Active": return "#10b981";
      case "Verified": return "#059669";
      case "Inactive": return "#6b7280";
      case "Pending": return "#f59e0b";
      case "Suspended": return "#ef4444";
      case "Completed": return "#10b981";
      case "In Progress": return "#3b82f6";
      case "On Hold": return "#f59e0b";
      case "Cancelled": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const handleActionClick = (leadId: string, action: string) => {
    console.log(`Action ${action} clicked for lead ${leadId}`);
    setShowActionMenu(null);
    // Handle the action logic here
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(mockLeads.map(lead => lead.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectLead = (leadId: string) => {
    if (selectedLeads.includes(leadId)) {
      setSelectedLeads(selectedLeads.filter(id => id !== leadId));
    } else {
      setSelectedLeads([...selectedLeads, leadId]);
    }
  };

  const handleSelectAllUsers = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(mockUsers.map(user => user.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSelectAllBackoffice = () => {
    if (selectAll) {
      setSelectedBackoffice([]);
    } else {
      setSelectedBackoffice(mockBackoffice.map(item => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectBackoffice = (itemId: string) => {
    if (selectedBackoffice.includes(itemId)) {
      setSelectedBackoffice(selectedBackoffice.filter(id => id !== itemId));
    } else {
      setSelectedBackoffice([...selectedBackoffice, itemId]);
    }
  };

  const renderLeadsTab = () => (
    <div className={styles.leadsContainer}>
      <div className={styles.leadsHeader}>
        <div className={styles.headerLeft}>
          <h2>Leads Management</h2>
          <p>Organize leads and track their progress effectively here</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.exportBtn}>↓ Export</button>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statCard} style={{ backgroundColor: '#f0f9ff' }}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>LEADS</span>
          </div>
          <div className={styles.statMainValue}>1,200</div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>LAST 30 DAYS:</span>
            <span className={styles.statSubValue}>1,200</span>
          </div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>THIS WEEK:</span>
            <span className={styles.statSubValue}>320</span>
          </div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>TOTAL LEADS:</span>
            <span className={styles.statSubValue}>1,200</span>
          </div>
        </div>
        
        <div className={styles.statCard} style={{ backgroundColor: '#fefce8' }}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>PENDING</span>
          </div>
          <div className={styles.statMainValue}>600</div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>THIS WEEK:</span>
            <span className={styles.statSubValue}>150</span>
          </div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>THIS MONTH:</span>
            <span className={styles.statSubValue}>450</span>
          </div>
        </div>
        
        <div className={styles.statCard} style={{ backgroundColor: '#f0fdf4' }}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>ASSIGNED</span>
          </div>
          <div className={styles.statMainValue}>1,100</div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>THIS WEEK:</span>
            <span className={styles.statSubValue}>275</span>
          </div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>THIS MONTH:</span>
            <span className={styles.statSubValue}>825</span>
          </div>
        </div>
        
        <div className={styles.statCard} style={{ backgroundColor: '#fef2f2' }}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>REJECTED</span>
          </div>
          <div className={styles.statMainValue}>100</div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>THIS WEEK:</span>
            <span className={styles.statSubValue}>15</span>
          </div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>THIS MONTH:</span>
            <span className={styles.statSubValue}>85</span>
          </div>
        </div>
      </div>

      <div className={styles.tableControls}>
        <div className={styles.leftControls}>
          <button className={styles.bulkBtn}>Bulk Actions</button>
          <button className={styles.refreshBtn}>↻</button>
        </div>
        <div className={styles.rightControls}>
          <input type="text" placeholder="Search text" className={styles.searchInput} />
          <button className={styles.filterBtn}>⚙ Filter</button>
          <button className={styles.viewBtn}>⊞ View</button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.leadsTable}>
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className={styles.checkbox}
                />
              </th>
              <th>Lead ID</th>
              <th>Customer</th>
              <th>Company</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Assigned</th>
              <th>Status</th>
              <th>Created ↑</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockLeads.map((lead) => (
              <tr key={lead.id}>
                <td>
                  <input 
                    type="checkbox" 
                    checked={selectedLeads.includes(lead.id)}
                    onChange={() => handleSelectLead(lead.id)}
                    className={styles.checkbox}
                  />
                </td>
                <td>{lead.id}</td>
                <td className={styles.customerCell}>
                  <div className={styles.avatar}>{lead.assigned}</div>
                  {lead.name}
                </td>
                <td>{lead.company}</td>
                <td className={styles.emailCell}>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>
                  <div className={styles.avatar}>{lead.assigned}</div>
                </td>
                <td>
                  <span 
                    className={styles.status}
                    style={{ color: getStatusColor(lead.status) }}
                  >
                    {lead.status}
                  </span>
                </td>
                <td>{lead.created}</td>
                <td>
                  <div style={{ position: 'relative' }}>
                    <button 
                      className={styles.moreBtn}
                      onClick={() => setShowActionMenu(showActionMenu === lead.id ? null : lead.id)}
                    >
                      ⋮
                    </button>
                    {showActionMenu === lead.id && (
                      <div className={styles.actionMenu}>
                        <button 
                          className={styles.actionItem}
                          onClick={() => handleActionClick(lead.id, 'lost')}
                        >
                          Mark as Lost
                        </button>
                        <button 
                          className={styles.actionItem}
                          onClick={() => handleActionClick(lead.id, 'progress')}
                        >
                          In Progress
                        </button>
                        <button 
                          className={styles.actionItem}
                          onClick={() => handleActionClick(lead.id, 'follow-up')}
                        >
                          Follow Up
                        </button>
                        <button 
                          className={styles.actionItem}
                          onClick={() => handleActionClick(lead.id, 'edit')}
                        >
                          Edit Lead
                        </button>
                        <button 
                          className={styles.actionItem}
                          onClick={() => handleActionClick(lead.id, 'delete')}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button className={styles.paginationBtn}>← Previous</button>
        <div className={styles.pageNumbers}>
          <span className={styles.activePage}>1</span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
        </div>
        <button className={styles.paginationBtn}>Next →</button>
      </div>
    </div>
  );

  const renderUsersTab = () => (
    <div className={styles.leadsContainer}>
      <div className={styles.leadsHeader}>
        <div className={styles.headerLeft}>
          <h2>Users Management</h2>
          <p>Manage user accounts, permissions, and access levels</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.exportBtn}>↓ Export</button>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statCard} style={{ backgroundColor: '#f8fafc' }}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>TOTAL USERS</span>
          </div>
          <div className={styles.statMainValue}>45,892</div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>NEW TODAY:</span>
            <span className={styles.statSubValue}>23</span>
          </div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>ACTIVE:</span>
            <span className={styles.statSubValue}>42,156</span>
          </div>
        </div>
        
        <div className={styles.statCard} style={{ backgroundColor: '#f0f9ff' }}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>VERIFIED USERS</span>
          </div>
          <div className={styles.statMainValue}>38,245</div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>PENDING:</span>
            <span className={styles.statSubValue}>3,647</span>
          </div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>REJECTED:</span>
            <span className={styles.statSubValue}>4,000</span>
          </div>
        </div>
        
        <div className={styles.statCard} style={{ backgroundColor: '#fefce8' }}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>USER ACTIVITY</span>
          </div>
          <div className={styles.statMainValue}>89%</div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>DAILY:</span>
            <span className={styles.statSubValue}>15,234</span>
            <span className={styles.statPercentage}>+12%</span>
          </div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>WEEKLY:</span>
            <span className={styles.statSubValue}>28,567</span>
            <span className={styles.statPercentage}>+8%</span>
          </div>
        </div>
        
        <div className={styles.statCard} style={{ backgroundColor: '#f0fdf4' }}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>PERMISSIONS</span>
          </div>
          <div className={styles.statMainValue}>12</div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>ADMIN:</span>
            <span className={styles.statSubValue}>5</span>
          </div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>MODERATOR:</span>
            <span className={styles.statSubValue}>7</span>
          </div>
        </div>
      </div>

      <div className={styles.tableControls}>
        <div className={styles.leftControls}>
          <button className={styles.bulkBtn}>Bulk Actions</button>
          <button className={styles.refreshBtn}>↻</button>
        </div>
        <div className={styles.rightControls}>
          <input type="text" placeholder="Search text" className={styles.searchInput} />
          <button className={styles.filterBtn}>⚙ Filter</button>
          <button className={styles.viewBtn}>⊞ View</button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.leadsTable}>
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  checked={selectAll}
                  onChange={handleSelectAllUsers}
                  className={styles.checkbox}
                />
              </th>
              <th>User ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Assigned</th>
              <th>Status</th>
              <th>Created ↑</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <input 
                    type="checkbox" 
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                    className={styles.checkbox}
                  />
                </td>
                <td>{user.id}</td>
                <td className={styles.customerCell}>
                  <div className={styles.avatar}>{user.assigned}</div>
                  {user.name}
                </td>
                <td className={styles.emailCell}>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <div className={styles.avatar}>{user.assigned}</div>
                </td>
                <td>
                  <span 
                    className={styles.status}
                    style={{ color: getStatusColor(user.status) }}
                  >
                    {user.status}
                  </span>
                </td>
                <td>{user.created}</td>
                <td>
                  <div style={{ position: 'relative' }}>
                    <button 
                      className={styles.moreBtn}
                      onClick={() => setShowActionMenu(showActionMenu === user.id ? null : user.id)}
                    >
                      ⋮
                    </button>
                    {showActionMenu === user.id && (
                      <div className={styles.actionMenu}>
                        <button 
                          className={styles.actionItem}
                          onClick={() => handleActionClick(user.id, 'activate')}
                        >
                          Activate User
                        </button>
                        <button 
                          className={styles.actionItem}
                          onClick={() => handleActionClick(user.id, 'suspend')}
                        >
                          Suspend User
                        </button>
                        <button 
                          className={styles.actionItem}
                          onClick={() => handleActionClick(user.id, 'permissions')}
                        >
                          Edit Permissions
                        </button>
                        <button 
                          className={styles.actionItem}
                          onClick={() => handleActionClick(user.id, 'reset-password')}
                        >
                          Reset Password
                        </button>
                        <button 
                          className={styles.actionItem}
                          onClick={() => handleActionClick(user.id, 'delete')}
                        >
                          Delete User
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button className={styles.paginationBtn}>← Previous</button>
        <div className={styles.pageNumbers}>
          <span className={styles.activePage}>1</span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
        </div>
        <button className={styles.paginationBtn}>Next →</button>
      </div>
    </div>
  );

  const renderBackofficeTab = () => (
    <div className={styles.leadsContainer}>
      <div className={styles.leadsHeader}>
        <div className={styles.headerLeft}>
          <h2>Back Office</h2>
          <p>Handle administrative tasks and internal operations</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.exportBtn}>↓ Export</button>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statCard} style={{ backgroundColor: '#f8fafc' }}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>TOTAL TASKS</span>
          </div>
          <div className={styles.statMainValue}>1,247</div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>NEW TODAY:</span>
            <span className={styles.statSubValue}>18</span>
          </div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>OVERDUE:</span>
            <span className={styles.statSubValue}>7</span>
          </div>
        </div>
        
        <div className={styles.statCard} style={{ backgroundColor: '#f0f9ff' }}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>IN PROGRESS</span>
          </div>
          <div className={styles.statMainValue}>342</div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>HIGH PRIORITY:</span>
            <span className={styles.statSubValue}>45</span>
          </div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>MEDIUM:</span>
            <span className={styles.statSubValue}>297</span>
          </div>
        </div>
        
        <div className={styles.statCard} style={{ backgroundColor: '#fefce8' }}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>COMPLETED</span>
          </div>
          <div className={styles.statMainValue}>856</div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>THIS WEEK:</span>
            <span className={styles.statSubValue}>124</span>
            <span className={styles.statPercentage}>+15%</span>
          </div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>THIS MONTH:</span>
            <span className={styles.statSubValue}>456</span>
            <span className={styles.statPercentage}>+8%</span>
          </div>
        </div>
        
        <div className={styles.statCard} style={{ backgroundColor: '#f0fdf4' }}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>EFFICIENCY</span>
          </div>
          <div className={styles.statMainValue}>94%</div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>AVG TIME:</span>
            <span className={styles.statSubValue}>2.4h</span>
          </div>
          <div className={styles.statSubInfo}>
            <span className={styles.statSubLabel}>SUCCESS RATE:</span>
            <span className={styles.statSubValue}>98%</span>
          </div>
        </div>
      </div>

      <div className={styles.tableControls}>
        <div className={styles.leftControls}>
          <button className={styles.bulkBtn}>Bulk Actions</button>
          <button className={styles.refreshBtn}>↻</button>
        </div>
        <div className={styles.rightControls}>
          <input type="text" placeholder="Search text" className={styles.searchInput} />
          <button className={styles.filterBtn}>⚙ Filter</button>
          <button className={styles.viewBtn}>⊞ View</button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.leadsTable}>
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  checked={selectAll}
                  onChange={handleSelectAllBackoffice}
                  className={styles.checkbox}
                />
              </th>
              <th>Task ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Assigned</th>
              <th>Status</th>
              <th>Created ↑</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockBackoffice.map((item) => (
              <tr key={item.id}>
                <td>
                  <input 
                    type="checkbox" 
                    checked={selectedBackoffice.includes(item.id)}
                    onChange={() => handleSelectBackoffice(item.id)}
                    className={styles.checkbox}
                  />
                </td>
                <td>{item.id}</td>
                <td className={styles.customerCell}>
                  <div className={styles.avatar}>{item.assigned}</div>
                  {item.name}
                </td>
                <td className={styles.emailCell}>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <div className={styles.avatar}>{item.assigned}</div>
                </td>
                <td>
                  <span 
                    className={styles.status}
                    style={{ color: getStatusColor(item.status) }}
                  >
                    {item.status}
                  </span>
                </td>
                <td>{item.created}</td>
                <td>
                  <div style={{ position: 'relative' }}>
                    <button 
                      className={styles.moreBtn}
                      onClick={() => setShowActionMenu(showActionMenu === item.id ? null : item.id)}
                    >
                      ⋮
                    </button>
                    {showActionMenu === item.id && (
                      <div className={styles.actionMenu}>
                        <button 
                          className={styles.actionItem}
                          onClick={() => handleActionClick(item.id, 'complete')}
                        >
                          Mark Complete
                        </button>
                        <button 
                          className={styles.actionItem}
                          onClick={() => handleActionClick(item.id, 'hold')}
                        >
                          Put On Hold
                        </button>
                        <button 
                          className={styles.actionItem}
                          onClick={() => handleActionClick(item.id, 'reassign')}
                        >
                          Reassign Task
                        </button>
                        <button 
                          className={styles.actionItem}
                          onClick={() => handleActionClick(item.id, 'priority')}
                        >
                          Change Priority
                        </button>
                        <button 
                          className={styles.actionItem}
                          onClick={() => handleActionClick(item.id, 'cancel')}
                        >
                          Cancel Task
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button className={styles.paginationBtn}>← Previous</button>
        <div className={styles.pageNumbers}>
          <span className={styles.activePage}>1</span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
        </div>
        <button className={styles.paginationBtn}>Next →</button>
      </div>
    </div>
  );


  return (
    <div className={styles.dashboard}>
      <div className={styles.sidebar}>
        <div className={styles.profileSection}>
          <div className={styles.profileIcon}>
            👤
          </div>
          <div className={styles.profileName}>Admin User</div>
          <div className={styles.profileEmail}>admin@company.com</div>
          <div className={styles.profileButtons}>
            <Link href="/" className={styles.profileBtn}>
              🏠 Home
            </Link>
            <button 
              className={`${styles.profileBtn} ${styles.logoutBtn}`}
              onClick={() => setShowAuthPopup(true)}
            >
              🚪 Logout
            </button>
          </div>
        </div>
        <nav className={styles.nav}>
          {(["Leads", "Users", "Backoffice"] as Tab[]).map((tab) => (
            <button
              key={tab}
              className={`${styles.navItem} ${activeTab === tab ? styles.active : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      
      <div className={styles.content}>
        {activeTab === "Leads" && renderLeadsTab()}
        {activeTab === "Users" && renderUsersTab()}
        {activeTab === "Backoffice" && renderBackofficeTab()}
      </div>
      
      <AuthManager 
        isOpen={showAuthPopup} 
        onClose={() => setShowAuthPopup(false)} 
      />
    </div>
  );
}