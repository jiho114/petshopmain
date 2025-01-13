import React, {useState} from 'react';
import './Tabs.scss';

const Tabs = ({tabs, tabData}) => {
  const [activeTab, setActivTab] = useState(tabs[0].value);
  const handleTabClick = (tab) => {
    setActivTab(tab)
  }
  const filterData=tabData.filter((a)=>a.category === activeTab)
  return (
    <div className='tab'>
       <div className="tab-menu">
          {
            tabs.map((tab) => (
              <button key={tab.value} className={activeTab===tab.value?'active':''} onClick={()=>handleTabClick(tab.value)}>{tab.label}</button>
            ))
          }
       </div>
       <ul className="tabList">
          {
            filterData.map((tablist) => (
              <li key={tablist.id}>
                <span className="tab-img">
                  <img src={process.env.PUBLIC_URL + tablist.imageUrl} alt={tablist.description} />
                </span>
                <div className="tab-desc">{tablist.description}</div>
              </li>
            ))
          }
       </ul>
    </div>
  );
};

export default Tabs;