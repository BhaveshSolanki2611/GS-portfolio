export const projects = [
  {
    id: 1,
    title: 'New York AirBnb Listings Analysis',
    description:
      'Python-driven EDA of NYC AirBnb data — uncovering pricing patterns, neighbourhood demand, and host performance using Pandas and Matplotlib visualizations.',
    tech: ['Python', 'Pandas', 'EDA', 'Matplotlib'],
    github: 'https://github.com/GracySingh2003/Python-New-York-AirBnb-listings',
    image: '/projects/airbnb.png',
    category: ['Python'],
    color: '#6366F1',
  },
  {
    id: 2,
    title: 'Walmart Sales Analysis',
    description:
      'Analyzed 10,000+ Walmart transactions across multiple branches using SQL CTEs and Window Functions to identify top product categories, busiest days, and branch-level revenue decline.',
    tech: ['SQL', 'MySQL', 'Python', 'Pandas'],
    github: 'https://github.com/GracySingh2003/Walmart-Data-Analysis',
    image: '/projects/walmart.png',
    category: ['SQL', 'Python'],
    color: '#06B6D4',
  },
  {
    id: 3,
    title: 'Customer Shopping Behavior Analysis',
    description:
      'Analyzed 3,900+ customer records with SQL CTEs and Python EDA — segmented into New/Returning/Loyal cohorts, identified top products per category, and revealed discount overuse by repeat customers.',
    tech: ['SQL', 'Python', 'Power BI', 'Pandas'],
    github: 'https://github.com/GracySingh2003/Customer-trends-Data-Analysis',
    image: '/projects/customer.png',
    category: ['SQL', 'Python', 'Power BI'],
    color: '#A855F7',
  },
  {
    id: 4,
    title: 'Library Management System',
    description:
      'Designed and implemented a full relational database with normalized schema for books, members, and employees. SQL queries track issuance, returns, overdue records, and branch operations.',
    tech: ['SQL', 'MySQL'],
    github: 'https://github.com/GracySingh2003/Library-System-Management-Using-SQL-',
    image: '/projects/library.png',
    category: ['SQL'],
    color: '#F59E0B',
  },
  {
    id: 5,
    title: 'Retail Sales SQL Analysis',
    description:
      'Deep-dive SQL analysis of retail sales data — customer segmentation, product performance, revenue trends, and time-based sales patterns using advanced query techniques.',
    tech: ['SQL', 'MySQL'],
    github: 'https://github.com/GracySingh2003/Retail-Sales-SQL-Analysis-Project',
    image: '/projects/retail.png',
    category: ['SQL'],
    color: '#10B981',
  },
  {
    id: 6,
    title: 'Excel Sales Dashboard',
    description:
      'Interactive Excel dashboard featuring Pivot Tables, XLOOKUP, INDEX-MATCH, slicers, and conditional formatting to visualize sales KPIs and regional performance.',
    tech: ['Excel', 'Pivot Tables', 'Power Query'],
    github: 'https://github.com/GracySingh2003/EXCEL-SALES-DASHBOARD',
    image: '/projects/excel.png',
    category: ['Excel'],
    color: '#22C55E',
  },
  {
    id: 7,
    title: 'Motorola Sales Analytics Dashboard',
    description:
      'Power BI dashboard analyzing Motorola product sales — DAX measures for YoY growth, regional breakdowns, and product-line performance using dynamic slicers.',
    tech: ['Power BI', 'DAX', 'Power Query'],
    github: 'https://github.com/GracySingh2003/Motorola-Sales-Analytics-Dashboard',
    image: '/projects/motorola.png',
    category: ['Power BI'],
    color: '#EF4444',
  },
  {
    id: 8,
    title: 'HR Analytics Dashboard',
    description:
      'Power BI HR dashboard tracking attrition, department headcount, performance ratings, and satisfaction scores — enabling data-driven HR strategy.',
    tech: ['Power BI', 'DAX', 'Excel'],
    github: 'https://github.com/GracySingh2003/HR-Analytics-Dashboard',
    image: '/projects/hr.png',
    category: ['Power BI'],
    color: '#F97316',
  },
  {
    id: 9,
    title: 'Ecommerce Sales Dashboard',
    description:
      'Comprehensive Power BI ecommerce dashboard with sales trends, category performance, customer geography, and profit margin analysis across product lines.',
    tech: ['Power BI', 'DAX', 'Power Query'],
    github: 'https://github.com/GracySingh2003/Ecommerce-Sales-Dashboard',
    image: '/projects/ecommerce.png',
    category: ['Power BI'],
    color: '#8B5CF6',
  },
  {
    id: 10,
    title: 'Blinkit Sales Analytics Dashboard',
    description:
      'Power BI dashboard for Blinkit quick-commerce data — outlet performance, item-type revenue, fat-content analysis, and location-tier breakdowns with interactive filters.',
    tech: ['Power BI', 'DAX', 'Power Query'],
    github: 'https://github.com/GracySingh2003/Blinkit-Sales-Analytics-Dashboard',
    image: '/projects/blinkit.png',
    category: ['Power BI'],
    color: '#84CC16',
  },
];

export type Project = (typeof projects)[number];
