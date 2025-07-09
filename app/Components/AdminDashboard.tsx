"use client";
import { useState } from "react";
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

type Tab = "Leads" | "Users" | "Backoffice" | "Configuration";

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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("Leads");
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Customer": return "#10b981";
      case "Qualified": return "#f59e0b";
      case "Working": return "#3b82f6";
      case "Contacted": return "#8b5cf6";
      case "Proposal Sent": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const handleActionClick = (leadId: string, action: string) => {
    console.log(`Action ${action} clicked for lead ${leadId}`);
    setShowActionMenu(null);
    // Handle the action logic here
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
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Leads</div>
          <div className={styles.statValue}>1,247</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Progressing Leads</div>
          <div className={styles.statValue}>892</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Completed Leads</div>
          <div className={styles.statValue}>355</div>
        </div>
      </div>

      <div className={styles.tableControls}>
        <div className={styles.leftControls}>
          <button className={styles.filterBtn}>⚙ Filter</button>
          <button className={styles.bulkBtn}>☐ Bulk Actions</button>
          <button className={styles.refreshBtn}>↻</button>
        </div>
        <div className={styles.rightControls}>
          <input type="text" placeholder="Search" className={styles.searchInput} />
          <button className={styles.viewBtn}>⊞ View</button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.leadsTable}>
          <thead>
            <tr>
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
    <div className={styles.tabContent}>
      <h2>Users Management</h2>
      <p>Manage user accounts, permissions, and access levels.</p>
      <div className={styles.placeholder}>
        <p>Users management interface will be implemented here.</p>
      </div>
    </div>
  );

  const renderBackofficeTab = () => (
    <div className={styles.tabContent}>
      <h2>Back Office</h2>
      <p>Handle administrative tasks and internal operations.</p>
      <div className={styles.placeholder}>
        <p>Back office management interface will be implemented here.</p>
      </div>
    </div>
  );

  const renderConfigurationTab = () => (
    <div className={styles.tabContent}>
      <h2>Configuration</h2>
      <p>System settings and configuration options.</p>
      <div className={styles.placeholder}>
        <p>Configuration interface will be implemented here.</p>
      </div>
    </div>
  );

  return (
    <div className={styles.dashboard}>
      <div className={styles.sidebar}>
        <div className={styles.logo}>Admin Panel</div>
        <nav className={styles.nav}>
          {(["Leads", "Users", "Backoffice", "Configuration"] as Tab[]).map((tab) => (
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
        {activeTab === "Configuration" && renderConfigurationTab()}
      </div>
    </div>
  );
}