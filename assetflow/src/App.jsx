import { useState, useEffect, useRef, useCallback } from "react";
import {
  LayoutDashboard, Package, Tag, Users, Building2, ArrowLeftRight,
  Wrench, FileText, Truck, MapPin, BarChart3, Bell, ClipboardList,
  Settings, ChevronDown, Search, Moon, Sun, Menu, X, Plus,
  AlertTriangle, CheckCircle, Clock, Zap, Shield, Download, Filter,
  MoreHorizontal, Eye, Edit, Trash2, QrCode, Calendar, ArrowUp,
  ArrowDown, RefreshCw, LogOut, User, ChevronRight, Activity,
  ChevronLeft, Info, Lock, Globe, TrendingUp,
  TrendingDown, Power, Layers,
  Mail, Phone, Briefcase, DollarSign, PieChart,
  BarChart2, SlidersHorizontal, Upload, Share2,
  Radio, HardHat, ExternalLink, ArrowRight,
  CheckSquare, Printer, FileDown, FileSpreadsheet
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart as RPie, Pie, Cell, RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine
} from "recharts";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS — Premium SaaS for African Power Utilities
   ═══════════════════════════════════════════════════════════════ */
const T = {
  // Surfaces (dark-first, light variants used in light mode)
  void:     "#030712",
  d0:       "#050D1A",
  d1:       "#081525",
  d2:       "#0C1E35",
  d3:       "#112546",
  d4:       "#1A3560",
  // Light mode surfaces
  l0:       "#F8FAFC",
  l1:       "#F1F5F9",
  l2:       "#E2E8F0",
  l3:       "#CBD5E1",
  lcard:    "#FFFFFF",
  // Brand
  sky:      "#0EA5E9",
  skyLt:    "#38BDF8",
  skyDim:   "#0369A1",
  arc:      "#00D4FF",   // The electric arc — accent only, used sparingly
  // Semantic
  emerald:  "#10B981",
  amber:    "#F59E0B",
  rose:     "#EF4444",
  violet:   "#8B5CF6",
  // Text
  hi:       "#F8FAFC",
  mid:      "#94A3B8",
  lo:       "#475569",
  // Chart palette
  chart:    ["#0EA5E9","#10B981","#F59E0B","#EF4444","#8B5CF6","#06B6D4"],
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', -apple-system, sans-serif; }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #1A3560; border-radius: 2px; }
  ::-webkit-scrollbar-thumb:hover { background: #0EA5E9; }
  .mono { font-family: 'JetBrains Mono', monospace; }
  @keyframes pulse-ring {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(14,165,233,0.4); }
    70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(14,165,233,0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(14,165,233,0); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes arc-draw {
    from { stroke-dashoffset: 502; }
    to { stroke-dashoffset: var(--target); }
  }
  @keyframes count-up {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .fade-up { animation: fadeUp 0.4s ease both; }
  .card-hover { transition: transform 0.18s ease, box-shadow 0.18s ease; }
  .card-hover:hover { transform: translateY(-2px); }
  .btn-glow:hover { box-shadow: 0 0 24px rgba(14,165,233,0.35); }
  .row-hover:hover { background: rgba(14,165,233,0.04) !important; }
  input:focus { outline: none; }
  button { font-family: 'Inter', sans-serif; }

  /* ── Responsive grid helpers ── */
  .rg-2 { display: grid; grid-template-columns: 1fr 340px; gap: 20px; }
  .rg-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
  .rg-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
  .rg-2c { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .rg-3c { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }

  /* ── Tablet: 768–1024px ── */
  @media (max-width: 1024px) {
    .rg-2  { grid-template-columns: 1fr 1fr; gap: 16px; }
    .rg-3  { grid-template-columns: 1fr 1fr; gap: 16px; }
    .rg-4  { grid-template-columns: 1fr 1fr; gap: 12px; }
    .rg-2c { grid-template-columns: 1fr 1fr; gap: 16px; }
    .rg-3c { grid-template-columns: 1fr 1fr; gap: 12px; }
    .page-content { padding: 24px 20px 32px !important; }
  }
  /* ── Mobile: < 768px ── */
  @media (max-width: 767px) {
    .rg-2  { grid-template-columns: 1fr; gap: 14px; }
    .rg-3  { grid-template-columns: 1fr; gap: 14px; }
    .rg-4  { grid-template-columns: 1fr 1fr; gap: 10px; }
    .rg-2c { grid-template-columns: 1fr; gap: 14px; }
    .rg-3c { grid-template-columns: 1fr; gap: 10px; }
    .hide-mobile { display: none !important; }
    .login-brand { display: none !important; }
    .login-form-panel { width: 100% !important; min-height: 100vh; padding: 40px 28px !important; }
    .page-content { padding: 16px 14px 28px !important; }
    .header-search { display: none !important; }
    .header-status { display: none !important; }
  }
`;

function useBreakpoint() {
  const get = () => {
    if (typeof window === "undefined") return "desktop";
    if (window.innerWidth < 768) return "mobile";
    if (window.innerWidth < 1024) return "tablet";
    return "desktop";
  };
  const [bp, setBp] = useState(get);
  useEffect(() => {
    const fn = () => setBp(get());
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return bp;
}
const useMobile = () => useBreakpoint() === "mobile";

/* ═══════════════════════════════════════════════════════════════  MOCK DATA  */
const kpis = [
  { id:"total",  label:"Total Assets",      value:4827,  fmt:"4,827",  delta:"+3.2%", up:true,  icon:Package,      color:T.sky,     spark:[40,55,45,60,52,70,65] },
  { id:"active", label:"Active",            value:3614,  fmt:"3,614",  delta:"+1.8%", up:true,  icon:CheckCircle,  color:T.emerald, spark:[30,40,35,50,42,55,53] },
  { id:"maint",  label:"In Maintenance",    value:312,   fmt:"312",    delta:"+12%",  up:false, icon:Wrench,       color:T.amber,   spark:[20,25,22,30,28,35,32] },
  { id:"avail",  label:"Available",         value:621,   fmt:"621",    delta:"-2.1%", up:false, icon:Layers,       color:T.violet,  spark:[60,55,58,50,54,48,50] },
  { id:"assign", label:"Assigned",          value:3401,  fmt:"3,401",  delta:"+4.5%", up:true,  icon:Users,        color:T.skyLt,   spark:[50,55,60,58,65,68,70] },
  { id:"warn",   label:"Warranty Alerts",   value:89,    fmt:"89",     delta:"+22%",  up:false, icon:AlertTriangle,color:T.rose,    spark:[5,8,10,12,9,15,18] },
];

const trendData = [
  { m:"Jan", active:3200, maint:280, available:580, cost:42 },
  { m:"Feb", active:3350, maint:295, available:590, cost:38 },
  { m:"Mar", active:3400, maint:270, available:600, cost:51 },
  { m:"Apr", active:3280, maint:310, available:610, cost:46 },
  { m:"May", active:3500, maint:290, available:615, cost:39 },
  { m:"Jun", active:3614, maint:312, available:621, cost:55 },
];

const categoryDist = [
  { name:"Transformers",  value:28, count:1352 },
  { name:"IT Systems",    value:22, count:1062 },
  { name:"Vehicles",      value:15, count:724  },
  { name:"Safety Gear",   value:12, count:579  },
  { name:"Substations",   value:10, count:483  },
  { name:"Office Assets", value:13, count:627  },
];

const deptData = [
  { dept:"Transmission Ops",      assets:1204, active:1102, util:92, budget:2.4 },
  { dept:"IT & Telecom",          assets:847,  active:790,  util:93, budget:1.8 },
  { dept:"Fleet & Logistics",     assets:312,  active:285,  util:91, budget:0.6 },
  { dept:"Substation Engineering",assets:589,  active:512,  util:87, budget:1.2 },
  { dept:"Safety & HSE",          assets:423,  active:380,  util:90, budget:0.8 },
  { dept:"Corporate Services",    assets:1452, active:545,  util:38, budget:0.5 },
];

const employeeRows = [
  { id:"EMP-001", name:"Kwame Mensah",      dept:"Transmission Ops",       role:"Senior Engineer",        email:"k.mensah@gridco.com.gh",      phone:"+233 24 123 4567", status:"Active",   assets:3, joined:"2019-03-15" },
  { id:"EMP-002", name:"Esi Asante",        dept:"IT & Telecom",            role:"IT Administrator",       email:"e.asante@gridco.com.gh",      phone:"+233 20 234 5678", status:"Active",   assets:2, joined:"2020-07-01" },
  { id:"EMP-003", name:"Patrick Agyemang",  dept:"Fleet & Logistics",       role:"Fleet Manager",          email:"p.agyemang@gridco.com.gh",    phone:"+233 27 345 6789", status:"Active",   assets:1, joined:"2018-11-20" },
  { id:"EMP-004", name:"Abena Osei",        dept:"Safety & HSE",            role:"HSE Officer",            email:"a.osei@gridco.com.gh",        phone:"+233 24 456 7890", status:"Active",   assets:5, joined:"2021-02-10" },
  { id:"EMP-005", name:"Samuel Boateng",    dept:"IT & Telecom",            role:"Network Engineer",       email:"s.boateng@gridco.com.gh",     phone:"+233 20 567 8901", status:"Active",   assets:1, joined:"2022-05-18" },
  { id:"EMP-006", name:"James Adu",         dept:"Substation Engineering",  role:"Substation Technician",  email:"j.adu@gridco.com.gh",         phone:"+233 27 678 9012", status:"Active",   assets:4, joined:"2017-09-03" },
  { id:"EMP-007", name:"Abena Kwame",       dept:"Transmission Ops",        role:"Transmission Engineer",  email:"ab.kwame@gridco.com.gh",      phone:"+233 24 789 0123", status:"Active",   assets:2, joined:"2020-01-15" },
  { id:"EMP-008", name:"Yaw Darko",         dept:"Substation Engineering",  role:"Electrical Engineer",    email:"y.darko@gridco.com.gh",       phone:"+233 20 890 1234", status:"On Leave", assets:0, joined:"2019-06-22" },
  { id:"EMP-009", name:"Ama Frimpong",      dept:"Safety & HSE",            role:"Safety Inspector",       email:"a.frimpong@gridco.com.gh",    phone:"+233 27 901 2345", status:"Active",   assets:3, joined:"2021-08-30" },
  { id:"EMP-010", name:"Kofi Boateng",      dept:"Fleet & Logistics",       role:"Driver / Technician",    email:"k.boateng@gridco.com.gh",     phone:"+233 24 012 3456", status:"Active",   assets:1, joined:"2023-03-01" },
  { id:"EMP-011", name:"Adjoa Mensah",      dept:"Corporate Services",      role:"Admin Assistant",        email:"adj.mensah@gridco.com.gh",    phone:"+233 20 123 4560", status:"Active",   assets:2, joined:"2022-09-12" },
  { id:"EMP-012", name:"Fiifi Acheampong",  dept:"Transmission Ops",        role:"Line Inspector",         email:"f.acheampong@gridco.com.gh",  phone:"+233 27 234 5601", status:"Inactive", assets:0, joined:"2016-04-08" },
];

const departmentRows = [
  { id:"DEPT-01", name:"Transmission Ops",       head:"Dr. Kweku Ansah",      employees:142, assets:1204, active:1102, util:92, budget:2.4, desc:"Manages the national high-voltage transmission network" },
  { id:"DEPT-02", name:"IT & Telecom",            head:"Ing. Akos Darko",      employees:68,  assets:847,  active:790,  util:93, budget:1.8, desc:"ICT infrastructure and telecommunications systems" },
  { id:"DEPT-03", name:"Fleet & Logistics",       head:"Mavis Osei-Bonsu",     employees:45,  assets:312,  active:285,  util:91, budget:0.6, desc:"Vehicle fleet management and logistics operations" },
  { id:"DEPT-04", name:"Substation Engineering",  head:"Ing. Joseph Quartey",  employees:89,  assets:589,  active:512,  util:87, budget:1.2, desc:"Substation design, construction and maintenance" },
  { id:"DEPT-05", name:"Safety & HSE",            head:"Nana Akua Asante",     employees:34,  assets:423,  active:380,  util:90, budget:0.8, desc:"Health, safety and environmental compliance" },
  { id:"DEPT-06", name:"Corporate Services",      head:"Patricia Mensah",      employees:112, assets:1452, active:545,  util:38, budget:0.5, desc:"Finance, HR, administration and corporate affairs" },
];

const supplierRows = [
  { id:"SUP-001", name:"ABB Ghana Ltd",          cat:"Electrical Equipment", contact:"David Nkrumah",   email:"d.nkrumah@abb.com",          phone:"+233 30 274 5000", status:"Active",   assets:342, contract:"2026-12-31", spend:"4,200,000" },
  { id:"SUP-002", name:"Siemens Energy GH",      cat:"Transformers",         contact:"Ama Serwaa",      email:"a.serwaa@siemens.com",        phone:"+233 30 261 7890", status:"Active",   assets:218, contract:"2025-09-30", spend:"6,800,000" },
  { id:"SUP-003", name:"Toyota Ghana Ltd",        cat:"Vehicles",             contact:"Kofi Asante",    email:"k.asante@toyota.com.gh",      phone:"+233 30 222 4400", status:"Active",   assets:87,  contract:"2027-03-15", spend:"1,100,000" },
  { id:"SUP-004", name:"Huawei Technologies GH", cat:"IT & Telecom",         contact:"Li Wei",          email:"l.wei@huawei.com",            phone:"+233 30 270 8800", status:"Active",   assets:156, contract:"2026-06-30", spend:"2,300,000" },
  { id:"SUP-005", name:"Mantrac Ghana Ltd",       cat:"Heavy Equipment",      contact:"Yaw Frimpong",   email:"y.frimpong@mantrac.com.gh",   phone:"+233 30 250 1234", status:"Active",   assets:43,  contract:"2025-12-31", spend:"900,000"   },
  { id:"SUP-006", name:"Dell Technologies GH",   cat:"IT & Telecom",         contact:"Sandra Boateng", email:"s.boateng@dell.com",          phone:"+233 30 260 5500", status:"Active",   assets:204, contract:"2026-08-31", spend:"1,700,000" },
  { id:"SUP-007", name:"Prysmian Cables GH",     cat:"Cables & Conductors",  contact:"Emmanuel Adu",   email:"e.adu@prysmian.com",          phone:"+233 30 266 7700", status:"Inactive", assets:0,   contract:"2024-06-30", spend:"500,000"   },
  { id:"SUP-008", name:"3M Safety GH",           cat:"Safety Equipment",     contact:"Rita Owusu",     email:"r.owusu@3m.com",              phone:"+233 30 228 9900", status:"Active",   assets:312, contract:"2027-01-31", spend:"400,000"   },
];

const locationRows = [
  { id:"LOC-001", name:"HQ — Electro Volta House", type:"Office",     region:"Greater Accra", address:"Electro Volta House, Accra",       assets:342, status:"Active",   manager:"Patricia Mensah"   },
  { id:"LOC-002", name:"Substation Achimota",       type:"Substation", region:"Greater Accra", address:"Achimota, Accra",                  assets:128, status:"Active",   manager:"James Adu"         },
  { id:"LOC-003", name:"Substation Tema",           type:"Substation", region:"Greater Accra", address:"Community 1, Tema",                assets:96,  status:"Active",   manager:"Yaw Darko"         },
  { id:"LOC-004", name:"Kumasi Regional Office",    type:"Office",     region:"Ashanti",       address:"Ashanti Regional Office, Kumasi",  assets:87,  status:"Active",   manager:"Kofi Boateng"      },
  { id:"LOC-005", name:"Substation Kumasi",         type:"Substation", region:"Ashanti",       address:"Adum, Kumasi",                     assets:74,  status:"Active",   manager:"Abena Kwame"       },
  { id:"LOC-006", name:"Vehicle Depot — Accra",    type:"Depot",      region:"Greater Accra", address:"Spintex Road, Accra",              assets:56,  status:"Active",   manager:"Patrick Agyemang"  },
  { id:"LOC-007", name:"Substation Takoradi",       type:"Substation", region:"Western",       address:"Sekondi-Takoradi",                 assets:63,  status:"Active",   manager:"Samuel Boateng"    },
  { id:"LOC-008", name:"Tamale Regional Office",    type:"Office",     region:"Northern",      address:"Tamale, Northern Region",          assets:42,  status:"Active",   manager:"Ama Frimpong"      },
  { id:"LOC-009", name:"Warehouse — Tema",         type:"Warehouse",  region:"Greater Accra", address:"Tema Industrial Area",             assets:189, status:"Active",   manager:"Adjoa Mensah"      },
  { id:"LOC-010", name:"Substation Ho",             type:"Substation", region:"Volta",         address:"Ho, Volta Region",                 assets:38,  status:"Inactive", manager:"Unassigned"        },
];

const activities = [
  { id:1, type:"assign",  icon:ArrowLeftRight, color:T.sky,     title:"Power Transformer PT-1042 assigned",     sub:"Kwame Mensah · Transmission Ops",          time:"9m ago"  },
  { id:2, type:"maint",   icon:Wrench,         color:T.amber,   title:"SCADA Workstation SW-201 in maintenance", sub:"Esi Asante · IT & Telecom",                 time:"47m ago" },
  { id:3, type:"add",     icon:Plus,           color:T.emerald, title:"10 safety helmets registered (SH-550→559)",sub:"Abena Osei · Safety & HSE",               time:"2h ago"  },
  { id:4, type:"alert",   icon:AlertTriangle,  color:T.rose,    title:"Warranty expiry: Distribution Panel DP-88",sub:"Auto-alert · 14 days remaining",           time:"3h ago"  },
  { id:5, type:"return",  icon:RefreshCw,      color:T.violet,  title:"Ford F-150 VH-11 returned to fleet",     sub:"Patrick Agyemang · Fleet & Logistics",      time:"5h ago"  },
];

const upcomingMaint = [
  { id:1, asset:"Substation SS-07",           date:"Jul 2",  tech:"James Adu",     priority:"critical", type:"Inspection"  },
  { id:2, asset:"Transmission Tower TT-29",   date:"Jul 4",  tech:"Abena Kwame",   priority:"high",     type:"Preventive"  },
  { id:3, asset:"Server Rack SR-03",          date:"Jul 6",  tech:"Yaw Darko",     priority:"medium",   type:"Routine"     },
  { id:4, asset:"HV Circuit Breaker CB-18",   date:"Jul 9",  tech:"Ama Frimpong",  priority:"critical", type:"Corrective"  },
  { id:5, asset:"Company Vehicle VH-04",      date:"Jul 11", tech:"Kofi Boateng",  priority:"low",      type:"Service"     },
];

const alerts = [
  { id:1, level:"critical", msg:"CB-18 abnormal load readings at SS-07",         loc:"Substation Zone A",        ago:"5m"  },
  { id:2, level:"critical", msg:"TT-29 inspection overdue by 8 days",            loc:"Transmission Line N-04",   ago:"12m" },
  { id:3, level:"warning",  msg:"DP-88 warranty expires in 14 days",             loc:"Distribution Yard A",      ago:"1h"  },
  { id:4, level:"warning",  msg:"Server room temperature 38°C (threshold: 35°C)",loc:"Data Center · HQ Accra",   ago:"2h"  },
  { id:5, level:"info",     msg:"Scheduled maintenance window starts Jul 2",     loc:"Substation SS-07",         ago:"3h"  },
];

const assetRows = [
  { id:"AST-001", name:"Power Transformer PT-1042", cat:"Transformers",  dept:"Transmission", emp:"K. Mensah",    status:"Active",      warranty:"2026-03-15", cond:"Excellent", val:"890,000" },
  { id:"AST-002", name:"SCADA Workstation SW-201",  cat:"IT Systems",   dept:"IT & Telecom", emp:"E. Asante",    status:"Maintenance", warranty:"2025-11-20", cond:"Fair",      val:"12,400"  },
  { id:"AST-003", name:"Ford F-150 Utility VH-03",  cat:"Vehicles",     dept:"Fleet",        emp:"P. Agyemang",  status:"Active",      warranty:"2027-06-01", cond:"Excellent", val:"68,000"  },
  { id:"AST-004", name:"Distribution Panel DP-88",  cat:"Substations",  dept:"Substation Eng",emp:"A. Osei",     status:"Critical",    warranty:"2024-01-10", cond:"Poor",      val:"24,500"  },
  { id:"AST-005", name:"Safety Helmet Batch SH-550", cat:"Safety Gear", dept:"Safety & HSE", emp:"Unassigned",   status:"Available",   warranty:"2028-09-30", cond:"Excellent", val:"3,200"   },
  { id:"AST-006", name:"Fiber Optic Switch FO-06",   cat:"IT Systems",  dept:"IT & Telecom", emp:"S. Boateng",   status:"Active",      warranty:"2026-08-14", cond:"Good",      val:"8,750"   },
  { id:"AST-007", name:"HV Circuit Breaker CB-18",   cat:"Substations", dept:"Substation Eng",emp:"J. Adu",      status:"Active",      warranty:"2025-12-31", cond:"Good",      val:"145,000" },
  { id:"AST-008", name:"Transmission Tower TT-29",   cat:"Infrastructure",dept:"Transmission",emp:"A. Kwame",    status:"Active",      warranty:"2030-01-01", cond:"Good",      val:"320,000" },
];

let _nextAsnId = 9;
const assignmentRows = [
  {id:"ASN-001",assetId:"AST-001",asset:"Power Transformer PT-1042", cat:"Transformers",   assignee:"K. Mensah",   dept:"Transmission Ops",      from:"2024-01-15",to:null,        status:"Active",  notes:"Primary custodian for this unit"},
  {id:"ASN-002",assetId:"AST-002",asset:"SCADA Workstation SW-201",  cat:"IT Systems",     assignee:"E. Asante",   dept:"IT & Telecom",           from:"2023-07-01",to:null,        status:"Active",  notes:"SCADA control room workstation"},
  {id:"ASN-003",assetId:"AST-003",asset:"Ford F-150 Utility VH-03",  cat:"Vehicles",       assignee:"P. Agyemang", dept:"Fleet & Logistics",      from:"2023-11-10",to:null,        status:"Active",  notes:"Daily field operations vehicle"},
  {id:"ASN-004",assetId:"AST-004",asset:"Distribution Panel DP-88",  cat:"Substations",    assignee:"A. Osei",     dept:"Substation Engineering", from:"2022-05-20",to:null,        status:"Active",  notes:"Critical panel — authorised access only"},
  {id:"ASN-005",assetId:"AST-006",asset:"Fiber Optic Switch FO-06",  cat:"IT Systems",     assignee:"S. Boateng",  dept:"IT & Telecom",           from:"2024-03-01",to:null,        status:"Active",  notes:"Core network switch"},
  {id:"ASN-006",assetId:"AST-007",asset:"HV Circuit Breaker CB-18",  cat:"Substations",    assignee:"J. Adu",      dept:"Substation Engineering", from:"2023-09-14",to:"2026-09-14",status:"Active",  notes:"SS-07 primary protection breaker"},
  {id:"ASN-007",assetId:"AST-008",asset:"Transmission Tower TT-29",  cat:"Infrastructure", assignee:"A. Kwame",    dept:"Transmission Ops",       from:"2022-01-01",to:null,        status:"Active",  notes:""},
  {id:"ASN-008",assetId:"AST-002",asset:"SCADA Workstation SW-201",  cat:"IT Systems",     assignee:"Y. Darko",    dept:"Fleet & Logistics",      from:"2023-01-15",to:"2023-06-30",status:"Returned",notes:"Temporary loan for Fleet project"},
];

/* ── WORK ORDERS ── */
let _nextWoId=7;
const workOrderRows=[
  {id:"WO-001",title:"Transformer PT-1042 oil sampling",asset:"AST-001",assetName:"Power Transformer PT-1042",type:"Preventive",priority:"High",  status:"Completed",tech:"James Adu",     dept:"Transmission Ops",      open:"2024-06-01",due:"2024-06-07",closed:"2024-06-06",estHrs:4, actHrs:3.5,estCost:1200,  actCost:980,   parts:"Transformer oil, gloves",  desc:"Annual oil sampling and dielectric test"},
  {id:"WO-002",title:"CB-18 protective relay calibration",asset:"AST-007",assetName:"HV Circuit Breaker CB-18",type:"Preventive",priority:"Critical",status:"In Progress",tech:"Ama Frimpong",dept:"Substation Engineering",open:"2024-06-10",due:"2024-06-17",closed:null,estHrs:8, actHrs:5,  estCost:3500,  actCost:null,  parts:"Relay test kit, PPE",       desc:"Quarterly relay calibration per IEC 60255"},
  {id:"WO-003",title:"Fleet VH-03 150k service",         asset:"AST-003",assetName:"Ford F-150 Utility VH-03",type:"Preventive",priority:"Medium", status:"Open",       tech:"Yaw Darko",    dept:"Fleet & Logistics",      open:"2024-06-12",due:"2024-06-20",closed:null,estHrs:6, actHrs:null,estCost:850,   actCost:null,  parts:"Oil filter, air filter, coolant",desc:"150,000 km scheduled service"},
  {id:"WO-004",title:"DP-88 busbar inspection",          asset:"AST-004",assetName:"Distribution Panel DP-88",type:"Corrective",priority:"Critical",status:"On Hold",    tech:"James Adu",    dept:"Substation Engineering",open:"2024-06-08",due:"2024-06-09",closed:null,estHrs:12,actHrs:3,  estCost:5000,  actCost:null,  parts:"Busbar clamps, thermal paste",desc:"Thermal anomaly detected during IR scan — on hold pending safety clearance"},
  {id:"WO-005",title:"SCADA SW-201 OS upgrade",          asset:"AST-002",assetName:"SCADA Workstation SW-201",type:"Preventive",priority:"Medium", status:"Completed",  tech:"E. Asante",    dept:"IT & Telecom",           open:"2024-05-20",due:"2024-05-25",closed:"2024-05-24",estHrs:3, actHrs:2.5,estCost:0,    actCost:0,     parts:"None",                      desc:"OS security patch and SCADA software upgrade to v4.2"},
  {id:"WO-006",title:"TT-29 structural integrity check",  asset:"AST-008",assetName:"Transmission Tower TT-29",type:"Inspection",priority:"High",  status:"Open",       tech:"Abena Kwame",  dept:"Transmission Ops",      open:"2024-06-14",due:"2024-06-28",closed:null,estHrs:10,actHrs:null,estCost:2200,  actCost:null,  parts:"Safety harness, torque wrench",desc:"Annual structural inspection after rainy season"},
];

/* ── ASSET REQUESTS ── */
let _nextReqId=7;
const requestRows=[
  {id:"REQ-001",title:"10× Safety Helmets",         cat:"Safety Gear",    qty:10,  requestor:"Nana Akua Asante",dept:"Safety & HSE",          priority:"High",  status:"Approved",  date:"2024-05-10",approver:"Prince Amoako Bannerman",approvalDate:"2024-05-12",cost:3200,  justify:"Replacement of expired batch SH-440"},
  {id:"REQ-002",title:"Dell Latitude 5540 Laptop",  cat:"IT Systems",     qty:2,   requestor:"Akosua Mensah",   dept:"IT & Telecom",           priority:"Medium",status:"Fulfilled", date:"2024-05-15",approver:"Prince Amoako Bannerman",approvalDate:"2024-05-16",cost:14800, justify:"New staff onboarding — 2 engineers joining July"},
  {id:"REQ-003",title:"Toyota Hilux Pick-Up",        cat:"Vehicles",       qty:1,   requestor:"Mavis Osei-Bonsu",dept:"Fleet & Logistics",      priority:"High",  status:"Pending",   date:"2024-06-01",approver:null,              approvalDate:null,           cost:98000, justify:"Replacement for VH-07 written off after accident"},
  {id:"REQ-004",title:"HV Testing Kit",              cat:"Test Equipment", qty:1,   requestor:"Joseph Quartey",  dept:"Substation Engineering", priority:"Critical",status:"Pending",  date:"2024-06-05",approver:null,              approvalDate:null,           cost:45000, justify:"Current kit out of calibration — cannot conduct HV tests"},
  {id:"REQ-005",title:"UPS Units 10KVA",             cat:"Power Systems",  qty:3,   requestor:"E. Asante",       dept:"IT & Telecom",           priority:"High",  status:"Rejected",  date:"2024-05-28",approver:"Prince Amoako Bannerman",approvalDate:"2024-05-30",cost:21000, justify:"Server room power backup — rejected: budget cycle Q3"},
  {id:"REQ-006",title:"Arc Flash PPE Sets",          cat:"Safety Gear",    qty:5,   requestor:"Nana Akua Asante",dept:"Safety & HSE",          priority:"Critical",status:"Approved", date:"2024-06-08",approver:"Joseph Quartey",   approvalDate:"2024-06-09",cost:8500,  justify:"Mandatory arc flash protection for HV work"},
];

/* ── INCIDENTS ── */
let _nextIncId=6;
const incidentRows=[
  {id:"INC-001",title:"Transformer PT-1042 oil leak",    asset:"AST-001",assetName:"Power Transformer PT-1042",type:"Equipment Failure",severity:"Major",   status:"Resolved",  location:"Achimota Substation",reporter:"K. Mensah",   date:"2024-05-22",resolved:"2024-05-24",desc:"Oil seepage detected at main tank gasket. Operations suspended for 6 hours.",resolution:"Gasket replaced, oil topped up, dielectric test passed."},
  {id:"INC-002",title:"CB-18 thermal overload trip",     asset:"AST-007",assetName:"HV Circuit Breaker CB-18", type:"Equipment Failure",severity:"Critical", status:"Under Investigation",location:"Tema Substation",reporter:"J. Adu",      date:"2024-06-08",resolved:null,          desc:"Breaker tripped on thermal overload during peak demand. Caused partial outage.",resolution:""},
  {id:"INC-003",title:"Near miss — live cable contact",  asset:null,     assetName:"None",                    type:"Safety Incident",  severity:"Critical", status:"Resolved",  location:"HQ Maintenance Yard", reporter:"Yaw Darko",   date:"2024-05-30",resolved:"2024-06-01",desc:"Technician came within 0.5m of live 33kV cable during unplanned maintenance.",resolution:"Toolbox talk issued, revised safe work procedure published."},
  {id:"INC-004",title:"SCADA SW-201 system crash",       asset:"AST-002",assetName:"SCADA Workstation SW-201",type:"Equipment Failure",severity:"Minor",    status:"Resolved",  location:"Control Room, HQ",   reporter:"E. Asante",   date:"2024-06-02",resolved:"2024-06-02",desc:"BSOD during peak monitoring hours. System restarted without data loss.",resolution:"Driver conflict resolved via OS update."},
  {id:"INC-005",title:"VH-03 minor collision",           asset:"AST-003",assetName:"Ford F-150 Utility VH-03",type:"Safety Incident",  severity:"Minor",    status:"Closed",    location:"Spintex Road, Accra", reporter:"P. Agyemang", date:"2024-06-05",resolved:"2024-06-07",desc:"Minor rear-end collision at low speed. No injuries. Vehicle damage: rear bumper.",resolution:"Insurance claim filed. Bumper repaired."},
];

/* ── SPARE PARTS / INVENTORY ── */
let _nextPartId=12;
const inventoryRows=[
  {id:"PRT-001",name:"Transformer Insulating Oil (25L)",   cat:"Consumables",    supplier:"ABB Ghana Ltd",      unitPrice:320,  stock:18, minStock:5,  unit:"drum",  location:"Warehouse — Tema",  lastRestock:"2024-04-10"},
  {id:"PRT-002",name:"HV Porcelain Insulators",            cat:"Electrical",     supplier:"ABB Ghana Ltd",      unitPrice:85,   stock:240,minStock:50, unit:"pcs",   location:"Warehouse — Tema",  lastRestock:"2024-03-15"},
  {id:"PRT-003",name:"Circuit Breaker Contact Sets (CB-18)",cat:"Electrical",    supplier:"Siemens Energy GH",  unitPrice:4200, stock:3,  minStock:2,  unit:"set",   location:"Achimota Substation",lastRestock:"2024-01-20"},
  {id:"PRT-004",name:"Engine Oil 10W-40 (5L)",             cat:"Consumables",    supplier:"Mantrac Ghana Ltd",  unitPrice:55,   stock:40, minStock:10, unit:"litre", location:"Vehicle Depot — Accra",lastRestock:"2024-05-01"},
  {id:"PRT-005",name:"Arc Flash Face Shield",              cat:"PPE",            supplier:"3M Safety GH",       unitPrice:380,  stock:12, minStock:5,  unit:"pcs",   location:"HQ — EVH Store",    lastRestock:"2024-02-28"},
  {id:"PRT-006",name:"Cat6 Ethernet Cable (305m roll)",    cat:"IT",             supplier:"Dell Technologies GH",unitPrice:290, stock:6,  minStock:3,  unit:"roll",  location:"IT & Telecom Store", lastRestock:"2024-04-22"},
  {id:"PRT-007",name:"Battery 12V 100Ah (Deep Cycle)",     cat:"Electrical",     supplier:"ABB Ghana Ltd",      unitPrice:620,  stock:2,  minStock:4,  unit:"pcs",   location:"Warehouse — Tema",  lastRestock:"2024-01-05"},
  {id:"PRT-008",name:"Overhead Line Conductors ACSR 150mm²",cat:"Infrastructure",supplier:"Prysmian Cables GH", unitPrice:185,  stock:0,  minStock:200,unit:"metre", location:"Warehouse — Tema",  lastRestock:"2023-11-10"},
  {id:"PRT-009",name:"Safety Gloves Class 4 HV",           cat:"PPE",            supplier:"3M Safety GH",       unitPrice:220,  stock:28, minStock:10, unit:"pairs", location:"HQ — EVH Store",    lastRestock:"2024-05-15"},
  {id:"PRT-010",name:"Fuse Links 11kV 100A",               cat:"Electrical",     supplier:"Siemens Energy GH",  unitPrice:42,   stock:150,minStock:50, unit:"pcs",   location:"Kumasi Regional Office",lastRestock:"2024-03-08"},
  {id:"PRT-011",name:"Lubricating Grease (1kg)",           cat:"Consumables",    supplier:"Mantrac Ghana Ltd",  unitPrice:35,   stock:22, minStock:10, unit:"tubs",  location:"Vehicle Depot — Accra",lastRestock:"2024-04-18"},
];

/* ── COMPLIANCE / INSPECTIONS ── */
let _nextCmpId=8;
const complianceRows=[
  {id:"CMP-001",asset:"AST-001",assetName:"Power Transformer PT-1042",type:"Electrical Safety",standard:"IEC 60076",frequency:"Annual",   last:"2024-01-15",next:"2025-01-15",status:"Compliant",   inspector:"James Adu",     notes:"All parameters within tolerance"},
  {id:"CMP-002",asset:"AST-007",assetName:"HV Circuit Breaker CB-18", type:"Protection Relay",  standard:"IEC 60255",frequency:"Quarterly",last:"2024-03-14",next:"2024-06-14",status:"Due Soon",    inspector:"Ama Frimpong",   notes:"Calibration WO-002 in progress"},
  {id:"CMP-003",asset:"AST-004",assetName:"Distribution Panel DP-88", type:"Thermal Imaging",   standard:"IEEE C37.20",frequency:"Biannual",last:"2023-12-01",next:"2024-06-01",status:"Overdue",     inspector:"Joseph Quartey", notes:"Overdue — CB trip incident ongoing"},
  {id:"CMP-004",asset:"AST-003",assetName:"Ford F-150 Utility VH-03", type:"Road Worthiness",   standard:"DVLA Ghana", frequency:"Annual",  last:"2024-02-20",next:"2025-02-20",status:"Compliant",   inspector:"DVLA Officer",   notes:"Road-worthy certificate valid until Feb 2025"},
  {id:"CMP-005",asset:"AST-006",assetName:"Fiber Optic Switch FO-06", type:"Network Security",  standard:"ISO 27001",  frequency:"Annual",  last:"2023-09-10",next:"2024-09-10",status:"Compliant",   inspector:"E. Asante",      notes:"Firmware updated, access log reviewed"},
  {id:"CMP-006",asset:"AST-008",assetName:"Transmission Tower TT-29", type:"Structural",        standard:"ASCE 10",    frequency:"Annual",  last:"2023-06-25",next:"2024-06-25",status:"Overdue",     inspector:"A. Kwame",       notes:"Inspection WO-006 scheduled"},
  {id:"CMP-007",asset:"AST-002",assetName:"SCADA Workstation SW-201", type:"Cyber Security",    standard:"NERC CIP",   frequency:"Annual",  last:"2024-04-01",next:"2025-04-01",status:"Compliant",   inspector:"S. Boateng",     notes:"Penetration test passed"},
];

/* ── DISPOSAL ── */
let _nextDspId=5;
const disposalRows=[
  {id:"DSP-001",assetId:"AST-099",assetName:"Old Control Panel CP-07",cat:"Substations",     type:"Scrapped",  reason:"End of Life",     bookVal:0,      proceeds:1200,  status:"Completed",requestor:"J. Adu",    approver:"Prince Amoako Bannerman",date:"2024-03-15",notes:"Stripped for copper; residual value recovered"},
  {id:"DSP-002",assetId:"AST-077",assetName:"Ford Transit Van VH-07", cat:"Vehicles",        type:"Written-off",reason:"Irreparable Damage",bookVal:12000, proceeds:4500,  status:"Completed",requestor:"M. Osei-Bonsu",approver:"Prince Amoako Bannerman",date:"2024-06-07",notes:"Accident damage — insurance claim settled"},
  {id:"DSP-003",assetId:"AST-004",assetName:"Distribution Panel DP-88",cat:"Substations",   type:"Decommission",reason:"Critical Condition",bookVal:18000, proceeds:null,  status:"Pending Approval",requestor:"J. Quartey",approver:null,date:"2024-06-10",notes:"Awaiting board approval — replacement ordered"},
  {id:"DSP-004",assetId:"AST-088",assetName:"HP Server SRV-04",       cat:"IT Systems",      type:"Donated",   reason:"Obsolete",         bookVal:500,    proceeds:0,     status:"Approved",requestor:"E. Asante", approver:"Prince Amoako Bannerman",date:"2024-05-20",notes:"Donated to GRIDCo Training Academy"},
];

/* ── WARRANTY CLAIMS ── */
let _nextWclId=5;
const warrantyRows=[
  {id:"WCL-001",assetId:"AST-001",assetName:"Power Transformer PT-1042",supplier:"ABB Ghana Ltd",     issue:"Gasket seal failure — oil leak",   date:"2024-05-22",status:"Settled",   value:8500,  resolution:"Replacement gasket and technician visit covered by ABB under warranty",resolved:"2024-05-28"},
  {id:"WCL-002",assetId:"AST-004",assetName:"Distribution Panel DP-88", supplier:"Siemens Energy GH", issue:"Busbar thermal anomaly — manufacturer defect",date:"2024-06-08",status:"Open",      value:45000, resolution:"",resolved:null},
  {id:"WCL-003",assetId:"AST-006",assetName:"Fiber Optic Switch FO-06", supplier:"Huawei Technologies GH",issue:"Port failure on 8 of 24 ports",date:"2024-03-01",status:"In Progress",value:3200,  resolution:"Replacement unit dispatched — awaiting delivery",resolved:null},
  {id:"WCL-004",assetId:"AST-002",assetName:"SCADA Workstation SW-201", supplier:"Dell Technologies GH",issue:"GPU failure — display artifacts",  date:"2023-11-10",status:"Settled",   value:1800,  resolution:"GPU replaced under 3-year hardware warranty",resolved:"2023-11-20"},
];

/* ── FINANCIALS / DEPRECIATION ── */
const financialRows=[
  {id:"AST-001",name:"Power Transformer PT-1042",cat:"Transformers",  cost:1200000,acquired:"2019-04-01",life:25,method:"Straight-line",residual:60000, bookVal:890000},
  {id:"AST-002",name:"SCADA Workstation SW-201",  cat:"IT Systems",   cost:18000,  acquired:"2020-08-15",life:5, method:"Straight-line",residual:500,   bookVal:12400},
  {id:"AST-003",name:"Ford F-150 Utility VH-03",  cat:"Vehicles",     cost:95000,  acquired:"2020-11-01",life:7, method:"Straight-line",residual:5000,  bookVal:68000},
  {id:"AST-004",name:"Distribution Panel DP-88",  cat:"Substations",  cost:42000,  acquired:"2016-03-20",life:20,method:"Straight-line",residual:2000,  bookVal:24500},
  {id:"AST-006",name:"Fiber Optic Switch FO-06",  cat:"IT Systems",   cost:11500,  acquired:"2021-02-14",life:5, method:"Straight-line",residual:500,   bookVal:8750},
  {id:"AST-007",name:"HV Circuit Breaker CB-18",  cat:"Substations",  cost:180000, acquired:"2018-06-30",life:20,method:"Straight-line",residual:9000,  bookVal:145000},
  {id:"AST-008",name:"Transmission Tower TT-29",  cat:"Infrastructure",cost:380000,acquired:"2014-01-01",life:40,method:"Straight-line",residual:0,     bookVal:320000},
];

/* ── AUDIT LOG ── */
const auditLogRows=[
  {id:"AUD-001",ts:"2024-06-14 09:12",user:"Prince Amoako Bannerman",role:"Administrator",module:"Assets",    action:"Update",  record:"AST-004",desc:"Updated condition: Good → Poor; added critical flag"},
  {id:"AUD-002",ts:"2024-06-14 08:47",user:"Akosua Mensah",         role:"Asset Manager", module:"Assignments",action:"Create",  record:"ASN-007",desc:"New assignment: AST-008 → A. Kwame, Transmission Ops"},
  {id:"AUD-003",ts:"2024-06-13 16:22",user:"E. Asante",             role:"Asset Manager", module:"Maintenance",action:"Update",  record:"MNT-005",desc:"Status changed: Scheduled → Completed"},
  {id:"AUD-004",ts:"2024-06-13 14:55",user:"Prince Amoako Bannerman",role:"Administrator",module:"Users",     action:"Create",  record:"USR-008",desc:"New user invited: Abena Kwame — Viewer role"},
  {id:"AUD-005",ts:"2024-06-13 11:30",user:"Joseph Quartey",        role:"Department Head",module:"Requests",  action:"Approve", record:"REQ-006",desc:"Asset request REQ-006 approved: 5× Arc Flash PPE Sets"},
  {id:"AUD-006",ts:"2024-06-12 15:10",user:"Prince Amoako Bannerman",role:"Administrator",module:"Disposal",  action:"Approve", record:"DSP-004",desc:"Disposal approved: HP Server SRV-04 donated to Training Academy"},
  {id:"AUD-007",ts:"2024-06-12 10:45",user:"Nana Akua Asante",      role:"Department Head",module:"Requests",  action:"Create",  record:"REQ-006",desc:"Asset request submitted: 5× Arc Flash PPE Sets — Critical priority"},
  {id:"AUD-008",ts:"2024-06-11 16:00",user:"Yaw Darko",             role:"Maintenance Engineer",module:"WorkOrders",action:"Update",record:"WO-003",desc:"Work order opened: Fleet VH-03 150k service"},
  {id:"AUD-009",ts:"2024-06-11 09:15",user:"Akosua Mensah",         role:"Asset Manager", module:"Suppliers", action:"Update",  record:"SUP-002",desc:"Contract updated: Siemens Energy GH expiry extended to 2026-12-31"},
  {id:"AUD-010",ts:"2024-06-10 14:32",user:"Prince Amoako Bannerman",role:"Administrator",module:"Settings",  action:"Update",  record:"PERM",   desc:"Permissions updated for role: Asset Manager — export enabled"},
  {id:"AUD-011",ts:"2024-06-10 11:20",user:"James Adu",             role:"Maintenance Engineer",module:"Incidents",action:"Create",record:"INC-002",desc:"Incident logged: CB-18 thermal overload trip — Critical severity"},
  {id:"AUD-012",ts:"2024-06-09 08:55",user:"Akosua Mensah",         role:"Asset Manager", module:"Assets",    action:"Create",  record:"AST-008",desc:"New asset registered: Transmission Tower TT-29"},
  {id:"AUD-013",ts:"2024-06-08 16:40",user:"Prince Amoako Bannerman",role:"Administrator",module:"Compliance",action:"Update",  record:"CMP-003",desc:"Compliance record updated: DP-88 thermal inspection status → Overdue"},
  {id:"AUD-014",ts:"2024-06-07 13:15",user:"Mavis Osei-Bonsu",      role:"Department Head",module:"Requests",  action:"Create",  record:"REQ-003",desc:"Asset request submitted: Toyota Hilux — replacement for VH-07"},
  {id:"AUD-015",ts:"2024-06-06 10:00",user:"Ama Frimpong",          role:"Maintenance Engineer",module:"WorkOrders",action:"Update",record:"WO-001",desc:"Work order closed: Transformer PT-1042 oil sampling — Completed"},
];

const notifs = [
  { id:1, type:"critical", title:"Critical Equipment Alert",   body:"Circuit Breaker CB-18 showing abnormal current draw at Substation SS-07. Immediate inspection required.",  time:"5 min ago",  read:false },
  { id:2, type:"warning",  title:"Warranty Expiring",          body:"Distribution Panel DP-88 warranty expires in 14 days. Initiate renewal process via Supplier ABB Ltd.",     time:"1 hr ago",   read:false },
  { id:3, type:"info",     title:"Request Approved",           body:"Asset request #REQ-2024-0892 for 20 units of safety equipment approved by Dept. Head Abena Osei.",         time:"3 hrs ago",  read:false },
  { id:4, type:"success",  title:"Maintenance Complete",       body:"Scheduled preventive maintenance for Transformer PT-1038 completed by James Adu. All systems nominal.",    time:"5 hrs ago",  read:true  },
  { id:5, type:"warning",  title:"Maintenance Reminder",       body:"Substation SS-07 quarterly maintenance due Jul 2, 2025. Technician: James Adu. Confirm attendance.",       time:"1 day ago",  read:true  },
  { id:6, type:"success",  title:"Assets Registered",          body:"10 safety helmets (SH-550 to SH-559) successfully registered by A. Osei, Safety & HSE department.",      time:"2 days ago", read:true  },
];

const navItems = [
  { id:"dashboard",     label:"Dashboard",       icon:LayoutDashboard, section:"main"    },
  { id:"assets",        label:"Assets",          icon:Package,         section:"main"    },
  { id:"maintenance",   label:"Maintenance",     icon:Wrench,          section:"main"    },
  { id:"assignments",   label:"Assignments",     icon:ArrowLeftRight,  section:"main"    },
  { id:"workorders",    label:"Work Orders",     icon:HardHat,         section:"main"    },
  { id:"requests",      label:"Asset Requests",  icon:FileText,        section:"main"    },
  { id:"incidents",     label:"Incidents",       icon:AlertTriangle,   section:"main"    },
  { id:"employees",     label:"Employees",       icon:Users,           section:"manage"  },
  { id:"departments",   label:"Departments",     icon:Building2,       section:"manage"  },
  { id:"suppliers",     label:"Suppliers",       icon:Truck,           section:"manage"  },
  { id:"locations",     label:"Locations",       icon:MapPin,          section:"manage"  },
  { id:"inventory",     label:"Spare Parts",     icon:Layers,          section:"manage"  },
  { id:"compliance",    label:"Compliance",      icon:CheckSquare,     section:"manage"  },
  { id:"disposal",      label:"Disposal",        icon:Power,           section:"manage"  },
  { id:"warranty",      label:"Warranty",        icon:Shield,          section:"manage"  },
  { id:"reports",       label:"Reports",         icon:BarChart3,       section:"insights"},
  { id:"financials",    label:"Financials",      icon:DollarSign,      section:"insights"},
  { id:"notifications", label:"Notifications",   icon:Bell,            section:"insights"},
  { id:"auditlogs",     label:"Audit Log",       icon:Radio,           section:"insights"},
  { id:"settings",      label:"Settings",        icon:Settings,        section:"system"  },
];

/* ═══════════════════════════════════════════════════════════════  UTILS  */
const useTheme = (dark) => ({
  bg:     dark ? T.d0      : T.l0,
  bg1:    dark ? T.d1      : T.l1,
  bg2:    dark ? T.d2      : T.l2,
  card:   dark ? T.d2      : T.lcard,
  cardHi: dark ? T.d3      : T.l0,
  border: dark ? T.d4      : T.l2,
  borderLo: dark ? "#112546" : T.l3,
  text:   dark ? T.hi      : "#0F172A",
  textMid:dark ? T.mid     : "#475569",
  textLo: dark ? "#475569" : "#94A3B8",
  gridLine:dark ? "#0F2040" : "#E2E8F0",
  tooltip: dark ? { background: T.d3, border: `1px solid ${T.d4}`, borderRadius: 10, padding: "10px 14px", color: T.hi }
                : { background: "#fff", border: `1px solid ${T.l2}`, borderRadius: 10, padding: "10px 14px", color: "#0F172A" },
});

const statusCfg = {
  Active:      { bg:"rgba(16,185,129,0.1)",  text:"#10B981", dot:T.emerald },
  Maintenance: { bg:"rgba(245,158,11,0.1)",  text:"#F59E0B", dot:T.amber   },
  Available:   { bg:"rgba(14,165,233,0.1)",  text:"#0EA5E9", dot:T.sky     },
  Critical:    { bg:"rgba(239,68,68,0.1)",   text:"#EF4444", dot:T.rose    },
  Inactive:    { bg:"rgba(100,116,139,0.1)", text:"#64748B", dot:"#64748B" },
};

const priorityCfg = {
  critical:{ bg:"rgba(239,68,68,0.12)",  text:"#EF4444", label:"Critical" },
  high:    { bg:"rgba(245,158,11,0.12)", text:"#F59E0B", label:"High"     },
  medium:  { bg:"rgba(14,165,233,0.12)", text:"#0EA5E9", label:"Medium"   },
  low:     { bg:"rgba(16,185,129,0.12)", text:"#10B981", label:"Low"      },
};

/* ═══════════════════════════════════════════════════════════════  MICRO COMPONENTS  */
function StatusPill({ status }) {
  const c = statusCfg[status] || statusCfg.Inactive;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 10px", borderRadius:20,
      background:c.bg, color:c.text, fontSize:11, fontWeight:600, letterSpacing:0.2 }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:c.dot,
        ...(status==="Active" ? {animation:"pulse-ring 2s ease-out infinite"} : {}) }} />
      {status}
    </span>
  );
}

function PriorityPill({ priority }) {
  const c = priorityCfg[priority] || priorityCfg[priority?.toLowerCase()] || priorityCfg.low;
  return (
    <span style={{ padding:"2px 8px", borderRadius:4, background:c.bg, color:c.text,
      fontSize:10, fontWeight:700, letterSpacing:0.8, textTransform:"uppercase", fontFamily:"'JetBrains Mono',monospace" }}>
      {c.label}
    </span>
  );
}

function Av({ initials, size=32, color=T.sky }) {
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", flexShrink:0, display:"flex",
      alignItems:"center", justifyContent:"center", fontWeight:700, color:"#fff",
      fontSize:size*0.35, background:`linear-gradient(135deg, ${color}cc, ${color}44)`,
      border:`1.5px solid ${color}44` }}>
      {initials}
    </div>
  );
}

/* Mini sparkline */
function Spark({ data, color }) {
  const w=64, h=28, max=Math.max(...data), min=Math.min(...data);
  const pts = data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v-min)/(max-min||1))*(h-4)-2}`).join(" ");
  return (
    <svg width={w} height={h} style={{overflow:"visible"}}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.8}/>
      <circle cx={pts.split(" ").pop().split(",")[0]} cy={pts.split(" ").pop().split(",")[1]} r={2.5} fill={color}/>
    </svg>
  );
}

/* Arc gauge — the signature instrument element */
function ArcGauge({ value=87, label="Grid Health", color=T.emerald, size=120 }) {
  const r=44, cx=60, cy=60, sw=8;
  const circum = 2*Math.PI*r;
  const arc = circum * 0.75; // 270° arc
  const filled = arc * (value/100);
  const start = 135; // degrees
  const dashOffset = arc - filled;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={sw}
        strokeDasharray={`${arc} ${circum}`}
        strokeDashoffset={0}
        strokeLinecap="round"
        transform={`rotate(${start} ${cx} ${cy})`}/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={sw}
        strokeDasharray={`${arc} ${circum}`}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform={`rotate(${start} ${cx} ${cy})`}
        style={{transition:"stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)", filter:`drop-shadow(0 0 6px ${color}80)`}}/>
      <text x={cx} y={cy-4} textAnchor="middle" fill={color} fontSize={20} fontWeight={800} fontFamily="'JetBrains Mono',monospace">{value}%</text>
      <text x={cx} y={cy+14} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize={9} fontWeight={500} letterSpacing={1}>{label.toUpperCase()}</text>
    </svg>
  );
}

/* Custom tooltip */
function ChartTip({ active, payload, label, dark }) {
  const th = useTheme(dark);
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: th.card, border:`1px solid ${th.border}`, borderRadius:10, padding:"10px 14px",
      boxShadow:"0 8px 32px rgba(0,0,0,0.3)" }}>
      <div style={{ fontSize:11, color:th.textMid, fontWeight:600, marginBottom:6, textTransform:"uppercase", letterSpacing:0.5 }}>{label}</div>
      {payload.map((p,i)=>(
        <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:i<payload.length-1?4:0 }}>
          <div style={{ width:8, height:8, borderRadius:2, background:p.color }}/>
          <span style={{ fontSize:12, color:th.textMid }}>{p.name}:</span>
          <span style={{ fontSize:12, color:th.text, fontWeight:700, fontFamily:"'JetBrains Mono',monospace" }}>
            {typeof p.value==="number" && p.value > 100 ? p.value.toLocaleString() : p.value}
          </span>
        </div>
      ))}
    </div>
  );
}

/* Section header */
function SectionHead({ title, sub, action, actionLabel, dark }) {
  const th = useTheme(dark);
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:20 }}>
      <div>
        <h2 style={{ fontSize:14, fontWeight:700, color:th.text, margin:0 }}>{title}</h2>
        {sub && <p style={{ fontSize:12, color:th.textMid, marginTop:3 }}>{sub}</p>}
      </div>
      {action && (
        <button onClick={action} style={{ fontSize:12, color:T.sky, background:"none", border:"none",
          cursor:"pointer", fontWeight:600, display:"flex", alignItems:"center", gap:4 }}>
          {actionLabel} <ArrowRight size={12}/>
        </button>
      )}
    </div>
  );
}

/* Ghost button */
function GhostBtn({ children, icon:Icon, onClick, dark, small }) {
  const th = useTheme(dark);
  return (
    <button onClick={onClick} style={{
      display:"flex", alignItems:"center", gap:6,
      padding: small ? "6px 12px" : "8px 14px",
      borderRadius:8, border:`1px solid ${th.border}`,
      background:"transparent", color:th.textMid, fontSize:12, fontWeight:600, cursor:"pointer",
      transition:"all 0.15s ease"
    }}
    onMouseEnter={e=>{e.currentTarget.style.borderColor=T.sky; e.currentTarget.style.color=T.sky;}}
    onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border; e.currentTarget.style.color=th.textMid;}}>
      {Icon && <Icon size={13}/>}{children}
    </button>
  );
}

/* Primary button */
function PrimaryBtn({ children, icon:Icon, onClick, size:btnSize="md" }) {
  const pad = btnSize==="sm" ? "7px 14px" : btnSize==="lg" ? "11px 22px" : "9px 18px";
  const fz  = btnSize==="sm" ? 12 : btnSize==="lg" ? 14 : 13;
  return (
    <button onClick={onClick} className="btn-glow" style={{
      display:"flex", alignItems:"center", gap:7, padding:pad,
      borderRadius:9, background:`linear-gradient(135deg, ${T.sky}, ${T.skyLt})`,
      color:"#fff", border:"none", fontSize:fz, fontWeight:700, cursor:"pointer",
      letterSpacing:0.1, transition:"box-shadow 0.2s ease"
    }}>
      {Icon && <Icon size={fz-1}/>}{children}
    </button>
  );
}

/* Card container */
function Card({ children, dark, style={}, className="" }) {
  const th = useTheme(dark);
  return (
    <div className={`card-hover ${className}`} style={{
      background: th.card, border:`1px solid ${th.border}`,
      borderRadius:16, ...style
    }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════  TOAST  */
function useToast() {
  const [toasts, setToasts] = useState([]);
  const toast = useCallback((msg, type="success") => {
    const id = Math.random();
    setToasts(t=>[...t,{id,msg,type}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),3200);
  },[]);
  return {toasts,toast};
}
function ToastStack({toasts}) {
  const cfg={success:{c:T.emerald,I:CheckCircle},error:{c:T.rose,I:AlertTriangle},info:{c:T.sky,I:Info},warning:{c:T.amber,I:AlertTriangle}};
  return (
    <div style={{position:"fixed",bottom:24,right:24,zIndex:1000,display:"flex",flexDirection:"column",gap:8,pointerEvents:"none"}}>
      {toasts.map(t=>{const {c,I}=cfg[t.type]||cfg.info; return (
        <div key={t.id} className="fade-up" style={{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",
          background:"#1e293b",border:`1px solid ${c}55`,borderRadius:12,
          boxShadow:"0 8px 32px rgba(0,0,0,0.4)",color:"#f8fafc",fontSize:13,fontWeight:500,minWidth:260,maxWidth:380}}>
          <I size={15} color={c} style={{flexShrink:0}}/>{t.msg}
        </div>);})}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════  MODAL BASE  */
function Modal({open,onClose,title,children,dark,width=540}) {
  const th=useTheme(dark);
  if(!open) return null;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",backdropFilter:"blur(4px)",
      zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}
      onClick={onClose}>
      <div style={{background:dark?T.d2:"#fff",border:`1px solid ${th.border}`,borderRadius:18,
        width:"100%",maxWidth:width,maxHeight:"90vh",overflow:"hidden",display:"flex",flexDirection:"column",
        boxShadow:"0 24px 64px rgba(0,0,0,0.5)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",
          padding:"18px 22px",borderBottom:`1px solid ${th.border}`,flexShrink:0}}>
          <span style={{fontSize:15,fontWeight:700,color:th.text}}>{title}</span>
          <button onClick={onClose} style={{width:28,height:28,borderRadius:7,border:`1px solid ${th.border}`,
            background:"transparent",cursor:"pointer",color:th.textMid,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <X size={13}/>
          </button>
        </div>
        <div style={{overflowY:"auto",flex:1}}>{children}</div>
      </div>
    </div>
  );
}

/* form helpers */
function FField({label,children}) {
  return <div style={{display:"flex",flexDirection:"column",gap:5}}>
    <label style={{fontSize:10,fontWeight:700,color:"#64748B",textTransform:"uppercase",letterSpacing:0.6}}>{label}</label>
    {children}
  </div>;
}
function FInput({value,onChange,placeholder,type="text",dark}) {
  const th=useTheme(dark);
  return <input value={value} onChange={e=>onChange(e.target.value)} type={type} placeholder={placeholder}
    style={{padding:"9px 12px",borderRadius:8,border:`1px solid ${th.border}`,background:dark?T.d1:T.l1,color:th.text,fontSize:13,width:"100%"}}
    onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=th.border}/>;
}
function FSelect({value,onChange,options,dark}) {
  const th=useTheme(dark);
  return <select value={value} onChange={e=>onChange(e.target.value)}
    style={{padding:"9px 12px",borderRadius:8,border:`1px solid ${th.border}`,background:dark?T.d1:T.l1,color:th.text,fontSize:13,width:"100%",cursor:"pointer"}}
    onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=th.border}>
    {options.map(o=><option key={o.value||o} value={o.value||o}>{o.label||o}</option>)}
  </select>;
}
function FTextarea({value,onChange,placeholder,rows=3,dark}) {
  const th=useTheme(dark);
  return <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows}
    style={{padding:"9px 12px",borderRadius:8,border:`1px solid ${th.border}`,background:dark?T.d1:T.l1,
      color:th.text,fontSize:13,width:"100%",resize:"vertical",fontFamily:"'Inter',sans-serif"}}
    onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=th.border}/>;
}

/* ═══════════════════════════════════════════════════════════════  DATA CONSTANTS  */
const CATEGORIES  = ["Transformers","IT Systems","Vehicles","Safety Gear","Substations","Infrastructure","Office Assets"];
const DEPARTMENTS = ["Transmission Ops","IT & Telecom","Fleet & Logistics","Substation Engineering","Safety & HSE","Corporate Services"];
const STATUSES    = ["Active","Available","Maintenance","Critical","Inactive"];
const CONDITIONS  = ["Excellent","Good","Fair","Poor"];
const EMPLOYEES   = ["K. Mensah","E. Asante","P. Agyemang","A. Osei","S. Boateng","J. Adu","A. Kwame","Y. Darko","Unassigned"];
const MAINT_TYPES = ["Preventive","Corrective","Routine","Inspection","Service"];
const TECHNICIANS = ["James Adu","Ama Frimpong","Yaw Darko","Abena Kwame","Esi Asante"];
let _nextId = 9;

function exportCSV(rows, filename) {
  const cols=["id","name","cat","dept","emp","status","warranty","val","cond"];
  const hdr="Asset ID,Name,Category,Department,Employee,Status,Warranty,Value (GHS),Condition\n";
  const body=rows.map(r=>cols.map(c=>`"${r[c]||""}"`).join(",")).join("\n");
  const blob=new Blob([hdr+body],{type:"text/csv"});
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=filename; a.click();
}

function exportTableCSV(columns, rows, filename) {
  const hdr = columns.map(c=>c.label).join(",") + "\n";
  const body = rows.map(r => columns.map(c => {
    const v = typeof c.get === "function" ? c.get(r) : (r[c.key] ?? "");
    return `"${String(v).replace(/"/g,'""')}"`;
  }).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([hdr+body],{type:"text/csv"}));
  a.download = filename; a.click();
}

function printPDF({ title, subtitle, columns, rows, filename }) {
  const date = new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
  const logoUrl = window.location.origin + "/gridco-logo.png";
  const tableRows = rows.map(r =>
    `<tr>${columns.map(c=>{
      const v = typeof c.get==="function" ? c.get(r) : (r[c.key]??'—');
      return `<td>${v===null||v===undefined||v===""?"—":v}</td>`;
    }).join('')}</tr>`
  ).join('');
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>${title} — GRIDCo</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Arial,sans-serif;color:#1a2740;background:#fff;padding:28px 32px;font-size:11px}
.hdr{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2.5px solid #0ea5e9;padding-bottom:14px;margin-bottom:20px}
.hdr-left{display:flex;align-items:flex-start;gap:14px}
.logo-wrap{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:6px 10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.logo-wrap img{height:32px;width:auto;display:block}
.hdr-text .brand{font-size:10px;font-weight:700;color:#0ea5e9;letter-spacing:1.2px;text-transform:uppercase;margin-bottom:4px}
.hdr-text .ttl{font-size:19px;font-weight:800;color:#0f172a;line-height:1.2}
.hdr-text .sub{font-size:11px;color:#64748b;margin-top:3px}
.hdr-right{text-align:right;font-size:10px;color:#64748b;line-height:1.8;flex-shrink:0}
.hdr-right strong{color:#0f172a;font-size:12px;font-weight:700}
.divider{height:3px;border-radius:2px;background:linear-gradient(90deg,#0ea5e9 0%,#38bdf8 60%,#e0f2fe 100%);margin-bottom:20px}
table{width:100%;border-collapse:collapse}
th{background:#f1f5f9;color:#475569;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;padding:8px 10px;text-align:left;border-bottom:2px solid #cbd5e1;font-size:9px}
td{padding:7px 10px;border-bottom:1px solid #f1f5f9;color:#1e293b;vertical-align:top;word-break:break-word}
tr:nth-child(even) td{background:#f8fafc}
.foot{margin-top:20px;font-size:9px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:10px;display:flex;justify-content:space-between;align-items:center}
.foot-logo img{height:18px;width:auto;opacity:0.45}
@media print{@page{size:A4 landscape;margin:12mm}body{padding:0}.no-print{display:none}}
</style></head><body>
<div class="hdr">
  <div class="hdr-left">
    <div class="logo-wrap"><img src="${logoUrl}" alt="GRIDCo" onerror="this.style.display='none'"/></div>
    <div class="hdr-text">
      <div class="brand">Ghana Grid Company Limited · Enterprise Asset Management</div>
      <div class="ttl">${title}</div>
      <div class="sub">${subtitle||''}</div>
    </div>
  </div>
  <div class="hdr-right">
    <strong>CONFIDENTIAL</strong><br/>
    Generated: ${date}<br/>
    Total records: ${rows.length}
  </div>
</div>
<div class="divider"></div>
<table><thead><tr>${columns.map(c=>`<th>${c.label}</th>`).join('')}</tr></thead>
<tbody>${tableRows}</tbody></table>
<div class="foot">
  <span>GRIDCo Enterprise Asset Management System &mdash; For internal use only</span>
  <div class="foot-logo"><img src="${logoUrl}" alt="GRIDCo" onerror="this.style.display='none'"/></div>
  <span>${filename}</span>
</div>
<script>setTimeout(()=>{window.print();},600);<\/script>
</body></html>`;
  const w = window.open("","_blank","width=1100,height=750");
  w.document.write(html); w.document.close(); w.focus();
}

function exportExcel(columns, rows, filename, title, subtitle) {
  const date = new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
  const esc = v => String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const colCount = columns.length - 1;
  const headerCells = columns.map(c=>`<Cell ss:StyleID="hdr"><Data ss:Type="String">${esc(c.label)}</Data></Cell>`).join('');
  const dataRows = rows.map((r,i)=>{
    const cells = columns.map(c=>{
      const v = typeof c.get==="function" ? c.get(r) : (r[c.key]??'');
      return `<Cell ss:StyleID="${i%2===0?'even':'odd'}"><Data ss:Type="String">${esc(String(v))}</Data></Cell>`;
    }).join('');
    return `<Row>${cells}</Row>`;
  }).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office">
<Styles>
  <Style ss:ID="t1"><Font ss:Bold="1" ss:Size="14" ss:Color="#0f172a"/><Alignment ss:WrapText="0"/></Style>
  <Style ss:ID="t2"><Font ss:Bold="1" ss:Size="9" ss:Color="#0ea5e9"/></Style>
  <Style ss:ID="t3"><Font ss:Size="9" ss:Color="#64748b"/></Style>
  <Style ss:ID="hdr"><Font ss:Bold="1" ss:Size="9" ss:Color="#ffffff"/><Interior ss:Color="#0ea5e9" ss:Pattern="Solid"/><Alignment ss:WrapText="0"/><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2" ss:Color="#0284c7"/></Borders></Style>
  <Style ss:ID="even"><Interior ss:Color="#ffffff" ss:Pattern="Solid"/><Font ss:Size="10" ss:Color="#1e293b"/><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#f1f5f9"/></Borders></Style>
  <Style ss:ID="odd"><Interior ss:Color="#f8fafc" ss:Pattern="Solid"/><Font ss:Size="10" ss:Color="#1e293b"/><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#f1f5f9"/></Borders></Style>
</Styles>
<Worksheet ss:Name="${esc(title.slice(0,31))}">
<Table>
  <Row><Cell ss:StyleID="t1" ss:MergeAcross="${colCount}"><Data ss:Type="String">GRIDCo — ${esc(title)}</Data></Cell></Row>
  <Row><Cell ss:StyleID="t2" ss:MergeAcross="${colCount}"><Data ss:Type="String">Ghana Grid Company Limited · Enterprise Asset Management</Data></Cell></Row>
  ${subtitle?`<Row><Cell ss:StyleID="t3" ss:MergeAcross="${colCount}"><Data ss:Type="String">${esc(subtitle)}</Data></Cell></Row>`:''}
  <Row><Cell ss:StyleID="t3" ss:MergeAcross="${colCount}"><Data ss:Type="String">Generated: ${date} · ${rows.length} records</Data></Cell></Row>
  <Row/>
  <Row>${headerCells}</Row>
  ${dataRows}
</Table>
</Worksheet>
</Workbook>`;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([xml],{type:'application/vnd.ms-excel;charset=utf-8'}));
  a.download = filename + '.xls'; a.click();
}

function ExportBtns({ columns, rows, filename, title, subtitle, csvOverride, dark }) {
  const doCSV = csvOverride || (() => exportTableCSV(columns, rows, filename + '.csv'));
  const doExcel = () => exportExcel(columns, rows, filename, title, subtitle);
  const doPDF = () => printPDF({ title, subtitle, columns, rows, filename: filename + '.pdf' });
  return (
    <div style={{display:"flex",gap:8}}>
      <GhostBtn icon={FileDown} onClick={doCSV} dark={dark}>CSV</GhostBtn>
      <GhostBtn icon={FileSpreadsheet} onClick={doExcel} dark={dark}>Excel</GhostBtn>
      <GhostBtn icon={Printer} onClick={doPDF} dark={dark}>PDF</GhostBtn>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════  ASSET MODAL (create / edit)  */
function AssetModal({open,onClose,asset=null,onSave,dark}) {
  const th=useTheme(dark);
  const editing=!!asset;
  const empty={name:"",cat:CATEGORIES[0],dept:DEPARTMENTS[0],emp:"Unassigned",
    status:"Available",warranty:"",val:"",cond:"Good",serial:"",location:"",notes:""};
  const [form,setForm]=useState(empty);
  useEffect(()=>{
    if(open) setForm(asset?{name:asset.name,cat:asset.cat,dept:asset.dept,emp:asset.emp,
      status:asset.status,warranty:asset.warranty,val:(asset.val||"").replace(/,/g,""),
      cond:asset.cond,serial:asset.serial||"",location:asset.location||"",notes:asset.notes||""}:empty);
  },[open,asset]);
  const set=k=>v=>setForm(f=>({...f,[k]:v}));
  const valid=form.name.trim().length>2;
  const handleSave=()=>{
    if(!valid) return;
    const id=editing?asset.id:`AST-${String(_nextId++).padStart(3,"0")}`;
    onSave({...form,id,val:Number(form.val||0).toLocaleString()});
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose} dark={dark} width={620} title={editing?`Edit · ${asset?.id}`:"Register New Asset"}>
      <div style={{padding:"22px",display:"flex",flexDirection:"column",gap:14}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <FField label="Asset Name *"><FInput value={form.name} onChange={set("name")} placeholder="e.g. Power Transformer PT-1043" dark={dark}/></FField>
          <FField label="Category *"><FSelect value={form.cat} onChange={set("cat")} options={CATEGORIES} dark={dark}/></FField>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <FField label="Department *"><FSelect value={form.dept} onChange={set("dept")} options={DEPARTMENTS} dark={dark}/></FField>
          <FField label="Assigned Employee"><FSelect value={form.emp} onChange={set("emp")} options={EMPLOYEES} dark={dark}/></FField>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
          <FField label="Status *"><FSelect value={form.status} onChange={set("status")} options={STATUSES} dark={dark}/></FField>
          <FField label="Condition"><FSelect value={form.cond} onChange={set("cond")} options={CONDITIONS} dark={dark}/></FField>
          <FField label="Value (GHS)"><FInput value={form.val} onChange={set("val")} placeholder="0" type="number" dark={dark}/></FField>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <FField label="Warranty Expiry"><FInput value={form.warranty} onChange={set("warranty")} type="date" dark={dark}/></FField>
          <FField label="Serial Number"><FInput value={form.serial} onChange={set("serial")} placeholder="SN-XXXX" dark={dark}/></FField>
        </div>
        <FField label="Location"><FInput value={form.location} onChange={set("location")} placeholder="e.g. Substation Zone A, Accra" dark={dark}/></FField>
        <FField label="Notes"><FTextarea value={form.notes} onChange={set("notes")} placeholder="Additional details…" dark={dark}/></FField>
        <div style={{display:"flex",justifyContent:"flex-end",gap:10,paddingTop:14,borderTop:`1px solid ${th.border}`}}>
          <GhostBtn dark={dark} onClick={onClose}>Cancel</GhostBtn>
          <PrimaryBtn onClick={handleSave} icon={editing?CheckCircle:Plus}>{editing?"Save changes":"Register asset"}</PrimaryBtn>
        </div>
      </div>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════════════════  ASSET DETAIL MODAL  */
function AssetDetailModal({open,onClose,asset,dark,onEdit,onAssign}) {
  const th=useTheme(dark);
  if(!asset) return null;
  const rows=[["Asset ID",asset.id],["Category",asset.cat],["Department",asset.dept],
    ["Assigned To",asset.emp],["Condition",asset.cond],["Value (GHS)",`₵${asset.val}`],
    ["Warranty Expiry",asset.warranty||"—"],["Serial No.",asset.serial||"—"],["Location",asset.location||"—"]];
  return (
    <Modal open={open} onClose={onClose} dark={dark} width={560} title="Asset Details">
      <div style={{padding:"22px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <div><div style={{fontSize:16,fontWeight:800,color:th.text,marginBottom:6}}>{asset.name}</div><StatusPill status={asset.status}/></div>
          <div style={{display:"flex",gap:8}}>
            <GhostBtn dark={dark} icon={ArrowLeftRight} onClick={()=>{onClose();onAssign(asset);}}>Assign</GhostBtn>
            <PrimaryBtn icon={Edit} onClick={()=>{onClose();onEdit(asset);}}>Edit</PrimaryBtn>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",border:`1px solid ${th.border}`,borderRadius:12,overflow:"hidden"}}>
          {rows.map(([k,v],i)=>(
            <div key={k} style={{padding:"11px 14px",
              borderBottom:i<rows.length-2?`1px solid ${th.border}`:"none",
              borderRight:i%2===0?`1px solid ${th.border}`:"none",
              background:i%2===0?(dark?T.d1:"#f8fafc"):"transparent"}}>
              <div style={{fontSize:10,fontWeight:700,color:th.textLo,textTransform:"uppercase",letterSpacing:0.6,marginBottom:3}}>{k}</div>
              <div style={{fontSize:13,fontWeight:600,color:th.text}}>{v}</div>
            </div>
          ))}
        </div>
        {asset.notes&&<div style={{marginTop:12,padding:"11px 14px",background:dark?T.d1:T.l1,borderRadius:10,border:`1px solid ${th.border}`}}>
          <div style={{fontSize:10,fontWeight:700,color:th.textLo,textTransform:"uppercase",letterSpacing:0.6,marginBottom:4}}>Notes</div>
          <div style={{fontSize:13,color:th.textMid,lineHeight:1.6}}>{asset.notes}</div>
        </div>}
        <div style={{marginTop:16,display:"flex",justifyContent:"flex-end"}}><GhostBtn dark={dark} onClick={onClose}>Close</GhostBtn></div>
      </div>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════════════════  CONFIRM MODAL  */
function ConfirmModal({open,onClose,onConfirm,title,body,dark,danger=true}) {
  const th=useTheme(dark);
  return (
    <Modal open={open} onClose={onClose} dark={dark} width={420} title={title}>
      <div style={{padding:"22px"}}>
        <p style={{fontSize:14,color:th.textMid,lineHeight:1.65,marginBottom:24}}>{body}</p>
        <div style={{display:"flex",justifyContent:"flex-end",gap:10}}>
          <GhostBtn dark={dark} onClick={onClose}>Cancel</GhostBtn>
          <button onClick={()=>{onConfirm();onClose();}} style={{display:"flex",alignItems:"center",gap:7,padding:"9px 18px",
            borderRadius:9,background:danger?T.rose:T.emerald,color:"#fff",border:"none",fontSize:13,fontWeight:700,cursor:"pointer"}}>
            {danger?<Trash2 size={13}/>:<CheckCircle size={13}/>}{danger?"Delete":"Confirm"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════════════════  ASSIGN MODAL  */
function AssignModal({open,onClose,asset,onSave,dark}) {
  const th=useTheme(dark);
  const [emp,setEmp]=useState("Unassigned");
  const [dept,setDept]=useState(DEPARTMENTS[0]);
  const [notes,setNotes]=useState("");
  useEffect(()=>{if(open&&asset){setEmp(asset.emp||"Unassigned");setDept(asset.dept||DEPARTMENTS[0]);setNotes("");}}, [open,asset]);
  if(!asset) return null;
  return (
    <Modal open={open} onClose={onClose} dark={dark} width={460} title={`Assign · ${asset.id}`}>
      <div style={{padding:"22px",display:"flex",flexDirection:"column",gap:14}}>
        <FField label="Assign to Employee"><FSelect value={emp} onChange={setEmp} options={EMPLOYEES} dark={dark}/></FField>
        <FField label="Department"><FSelect value={dept} onChange={setDept} options={DEPARTMENTS} dark={dark}/></FField>
        <FField label="Notes"><FTextarea value={notes} onChange={setNotes} placeholder="Reason for assignment, handover notes…" dark={dark}/></FField>
        <div style={{display:"flex",justifyContent:"flex-end",gap:10,paddingTop:14,borderTop:`1px solid ${th.border}`}}>
          <GhostBtn dark={dark} onClick={onClose}>Cancel</GhostBtn>
          <PrimaryBtn icon={ArrowLeftRight} onClick={()=>{onSave(asset.id,emp,dept);onClose();}}>Assign asset</PrimaryBtn>
        </div>
      </div>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════════════════  MAINTENANCE MODAL  */
function MaintenanceModal({open,onClose,onSave,dark,asset=null}) {
  const th=useTheme(dark);
  const empty={assetName:asset?.name||"",date:"",type:MAINT_TYPES[0],priority:"medium",tech:TECHNICIANS[0],notes:""};
  const [form,setForm]=useState(empty);
  useEffect(()=>{if(open) setForm({...empty,assetName:asset?.name||""});},[open,asset]);
  const set=k=>v=>setForm(f=>({...f,[k]:v}));
  const valid=form.assetName.trim()&&form.date;
  return (
    <Modal open={open} onClose={onClose} dark={dark} width={520} title="Schedule Maintenance Job">
      <div style={{padding:"22px",display:"flex",flexDirection:"column",gap:14}}>
        <FField label="Asset Name *"><FInput value={form.assetName} onChange={set("assetName")} placeholder="e.g. Substation SS-07" dark={dark}/></FField>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <FField label="Scheduled Date *"><FInput value={form.date} onChange={set("date")} type="date" dark={dark}/></FField>
          <FField label="Job Type"><FSelect value={form.type} onChange={set("type")} options={MAINT_TYPES} dark={dark}/></FField>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <FField label="Priority"><FSelect value={form.priority} onChange={set("priority")}
            options={[{value:"critical",label:"Critical"},{value:"high",label:"High"},{value:"medium",label:"Medium"},{value:"low",label:"Low"}]} dark={dark}/></FField>
          <FField label="Technician"><FSelect value={form.tech} onChange={set("tech")} options={TECHNICIANS} dark={dark}/></FField>
        </div>
        <FField label="Notes"><FTextarea value={form.notes} onChange={set("notes")} placeholder="Job description, safety notes…" dark={dark}/></FField>
        <div style={{display:"flex",justifyContent:"flex-end",gap:10,paddingTop:14,borderTop:`1px solid ${th.border}`}}>
          <GhostBtn dark={dark} onClick={onClose}>Cancel</GhostBtn>
          <PrimaryBtn icon={Wrench} onClick={()=>{if(valid){onSave(form);onClose();}}}>Schedule job</PrimaryBtn>
        </div>
      </div>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════════════════  IMPORT MODAL  */
function ImportModal({open,onClose,dark,onImport}) {
  const th=useTheme(dark);
  const [dragging,setDragging]=useState(false);
  const [file,setFile]=useState(null);
  const ref=useRef();
  const handleFile=f=>{if(f&&(f.name.endsWith(".csv")||f.name.endsWith(".xlsx"))) setFile(f);};
  useEffect(()=>{if(!open) setFile(null);},[open]);
  return (
    <Modal open={open} onClose={onClose} dark={dark} width={480} title="Import Assets">
      <div style={{padding:"22px",display:"flex",flexDirection:"column",gap:16}}>
        <div onDragOver={e=>{e.preventDefault();setDragging(true);}} onDragLeave={()=>setDragging(false)}
          onDrop={e=>{e.preventDefault();setDragging(false);handleFile(e.dataTransfer.files[0]);}}
          onClick={()=>ref.current.click()}
          style={{border:`2px dashed ${dragging?T.sky:th.border}`,borderRadius:14,padding:"36px 24px",
            textAlign:"center",cursor:"pointer",background:dragging?`${T.sky}08`:(dark?T.d1:T.l1),transition:"all 0.15s"}}>
          <input ref={ref} type="file" accept=".csv,.xlsx" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>
          <Upload size={28} color={dragging?T.sky:th.textLo} style={{marginBottom:10}}/>
          {file
            ? <div><div style={{fontSize:13,fontWeight:700,color:T.emerald}}>{file.name}</div>
                <div style={{fontSize:11,color:th.textMid,marginTop:4}}>{(file.size/1024).toFixed(1)} KB · ready to import</div></div>
            : <div><div style={{fontSize:13,fontWeight:600,color:th.text}}>Drop CSV or Excel file here</div>
                <div style={{fontSize:11,color:th.textMid,marginTop:4}}>or click to browse</div></div>}
        </div>
        <div style={{padding:"12px 14px",background:dark?T.d1:T.l1,borderRadius:10,border:`1px solid ${th.border}`,
          display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:12,fontWeight:600,color:th.text}}>Download import template</div>
            <div style={{fontSize:11,color:th.textMid}}>GRIDCo_Asset_Import_Template.csv</div>
          </div>
          <GhostBtn dark={dark} icon={Download} onClick={()=>{
            const hdr="Asset Name,Category,Department,Employee,Status,Warranty Expiry,Value (GHS),Condition,Serial No.,Location,Notes\n";
            const blob=new Blob([hdr],{type:"text/csv"}); const a=document.createElement("a");
            a.href=URL.createObjectURL(blob); a.download="GRIDCo_Asset_Import_Template.csv"; a.click();
          }}>Template</GhostBtn>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",gap:10,paddingTop:8,borderTop:`1px solid ${th.border}`}}>
          <GhostBtn dark={dark} onClick={onClose}>Cancel</GhostBtn>
          <PrimaryBtn icon={Upload} onClick={()=>{if(file){onImport(file);onClose();}}}>{file?"Import file":"Select file first"}</PrimaryBtn>
        </div>
      </div>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════════════════  FILTER PANEL  */
function FilterPanel({open,onClose,onApply,dark}) {
  const th=useTheme(dark);
  const [cat,setCat]=useState([]);
  const [dept,setDept]=useState([]);
  const [cond,setCond]=useState([]);
  const toggle=(arr,setArr,val)=>setArr(a=>a.includes(val)?a.filter(x=>x!==val):[...a,val]);
  const ChipRow=({label,items,sel,onToggle})=>(
    <div style={{marginBottom:18}}>
      <div style={{fontSize:10,fontWeight:800,color:th.textLo,textTransform:"uppercase",letterSpacing:0.8,marginBottom:8}}>{label}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {items.map(item=>{const on=sel.includes(item); return(
          <button key={item} onClick={()=>onToggle(item)} style={{padding:"5px 11px",borderRadius:20,fontSize:12,fontWeight:600,cursor:"pointer",
            border:`1px solid ${on?T.sky:th.border}`,background:on?`${T.sky}18`:"transparent",color:on?T.sky:th.textMid,transition:"all 0.12s"}}>{item}</button>
        );})}
      </div>
    </div>
  );
  if(!open) return null;
  return (
    <div style={{position:"fixed",inset:0,zIndex:500,display:"flex",justifyContent:"flex-end"}} onClick={onClose}>
      <div style={{width:340,background:dark?T.d1:"#fff",borderLeft:`1px solid ${th.border}`,
        height:"100%",display:"flex",flexDirection:"column",boxShadow:"-8px 0 40px rgba(0,0,0,0.3)"}}
        onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",
          padding:"18px 20px",borderBottom:`1px solid ${th.border}`}}>
          <span style={{fontSize:15,fontWeight:700,color:th.text}}>Filter Assets</span>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>{setCat([]);setDept([]);setCond([]);}}
              style={{fontSize:12,color:T.sky,background:"none",border:"none",cursor:"pointer",fontWeight:600}}>Clear all</button>
            <button onClick={onClose} style={{width:28,height:28,borderRadius:7,border:`1px solid ${th.border}`,
              background:"transparent",cursor:"pointer",color:th.textMid,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <X size={13}/>
            </button>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"20px"}}>
          <ChipRow label="Category"   items={CATEGORIES}  sel={cat}  onToggle={v=>toggle(cat,setCat,v)}/>
          <ChipRow label="Department" items={DEPARTMENTS} sel={dept} onToggle={v=>toggle(dept,setDept,v)}/>
          <ChipRow label="Condition"  items={CONDITIONS}  sel={cond} onToggle={v=>toggle(cond,setCond,v)}/>
        </div>
        <div style={{padding:"16px 20px",borderTop:`1px solid ${th.border}`,display:"flex",gap:10}}>
          <GhostBtn dark={dark} onClick={onClose}>Cancel</GhostBtn>
          <PrimaryBtn onClick={()=>{onApply({cat,dept,cond});onClose();}}>Apply filters</PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════  KPI CARD  */
function KpiCard({ item, dark, idx }) {
  const th = useTheme(dark);
  const Icon = item.icon;
  return (
    <div className="card-hover fade-up" style={{
      background: th.card, border:`1px solid ${th.border}`,
      borderRadius:16, padding:"20px 22px", cursor:"default",
      animationDelay:`${idx*60}ms`,
      position:"relative", overflow:"hidden"
    }}>
      {/* Subtle top-edge color bar */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2,
        background:`linear-gradient(90deg, ${item.color}00, ${item.color}, ${item.color}00)`, borderRadius:"16px 16px 0 0" }}/>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
        <div style={{ width:38, height:38, borderRadius:10, background:`${item.color}16`,
          display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon size={18} color={item.color}/>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:3, fontSize:11, fontWeight:600,
          color: item.up ? T.emerald : T.rose }}>
          {item.up ? <ArrowUp size={11}/> : <ArrowDown size={11}/>}
          {item.delta}
        </div>
      </div>

      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:28, fontWeight:700,
        color:th.text, lineHeight:1, marginBottom:4 }}>
        {item.fmt}
      </div>
      <div style={{ fontSize:12, color:th.textMid, fontWeight:500, marginBottom:14 }}>{item.label}</div>

      <Spark data={item.spark} color={item.color}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════  DASHBOARD  */
function Dashboard({ dark, setPage, toast }) {
  const th = useTheme(dark);
  const bp = useBreakpoint();
  const mobile = bp === "mobile";
  const [gridHealth] = useState(94);
  const [uptime] = useState(99.7);
  const [capacityUtil] = useState(78);
  const [showNewAsset, setShowNewAsset] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(()=>{ setRefreshing(false); toast("Dashboard data refreshed","info"); }, 1200);
  };

  return (
    <div className="page-content" style={{ padding:"32px 36px", background:th.bg, minHeight:"100vh" }}>

      <AssetModal open={showNewAsset} onClose={()=>setShowNewAsset(false)} dark={dark}
        onSave={()=>toast("Asset registered successfully","success")}/>

      {/* Page header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:32, flexWrap:"wrap", gap:16 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:T.emerald, animation:"pulse-ring 2s ease-out infinite" }}/>
            <span style={{ fontSize:11, color:T.emerald, fontWeight:600, textTransform:"uppercase", letterSpacing:1 }}>Live · GRIDCo Network</span>
          </div>
          <h1 style={{ fontSize:24, fontWeight:800, color:th.text, letterSpacing:-0.5 }}>Operations Dashboard</h1>
          <p style={{ fontSize:13, color:th.textMid, marginTop:4 }}>
            Sunday 29 June 2025 · Q2 FY2025 · National Transmission Network
          </p>
        </div>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          <GhostBtn icon={Download} dark={dark} onClick={()=>{ exportCSV(assetRows,"GRIDCo_Dashboard_Export.csv"); toast("Report exported","success"); }}>Export report</GhostBtn>
          <GhostBtn icon={RefreshCw} dark={dark} onClick={handleRefresh}>
            <span style={{ display:"flex", alignItems:"center", gap:6 }}>
              <RefreshCw size={13} style={{ animation: refreshing?"spin 1s linear infinite":"none" }}/> Refresh
            </span>
          </GhostBtn>
          <PrimaryBtn icon={Plus} onClick={()=>setShowNewAsset(true)}>New asset</PrimaryBtn>
        </div>
      </div>

      {/* ── Grid Health Strip ─────────────────────────────────── */}
      <div className={mobile ? "hide-mobile" : ""} style={{ background:`linear-gradient(135deg, ${T.d2} 0%, ${T.d3} 100%)`,
        border:`1px solid ${T.d4}`, borderRadius:18, padding:"24px 32px", marginBottom:28,
        display:"flex", alignItems:"center", gap:40, flexWrap:"wrap",
        boxShadow:"0 4px 40px rgba(14,165,233,0.08), inset 0 1px 0 rgba(255,255,255,0.04)" }}>

        {/* Arc gauges */}
        {[
          { label:"Grid Health", value:gridHealth,    color:T.emerald },
          { label:"System Uptime", value:Math.round(uptime), color:T.sky    },
          { label:"Capacity Util", value:capacityUtil,color:T.amber  },
        ].map(g=>(
          <ArcGauge key={g.label} value={g.value} label={g.label} color={g.color} size={120}/>
        ))}

        <div style={{ width:1, height:80, background:"rgba(255,255,255,0.06)", flexShrink:0 }}/>

        {/* Live metrics */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px 40px", flex:1, minWidth:280 }}>
          {[
            { label:"Total Substations",   value:"47",      unit:"active" },
            { label:"Transmission Lines",  value:"2,340",   unit:"km monitored" },
            { label:"Peak Load (Today)",   value:"1,847",   unit:"MW" },
            { label:"Incidents (30d)",     value:"3",       unit:"resolved" },
            { label:"MTTR",                value:"4.2",     unit:"hrs avg" },
            { label:"Assets Audited (Q2)", value:"98.4%",   unit:"coverage" },
          ].map(m=>(
            <div key={m.label}>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.35)", textTransform:"uppercase",
                letterSpacing:0.8, fontWeight:600, marginBottom:3 }}>{m.label}</div>
              <div style={{ display:"flex", alignItems:"baseline", gap:5 }}>
                <span style={{ fontSize:20, fontWeight:800, color:T.hi, fontFamily:"'JetBrains Mono',monospace" }}>{m.value}</span>
                <span style={{ fontSize:10, color:"rgba(255,255,255,0.35)", fontWeight:500 }}>{m.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── KPI Cards ─────────────────────────────────────────── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:14, marginBottom:28 }}>
        {kpis.map((k,i)=><KpiCard key={k.id} item={k} dark={dark} idx={i}/>)}
      </div>

      {/* ── Row: Trend + Distribution ─────────────────────────── */}
      <div className="rg-2" style={{ marginBottom:20 }}>

        {/* Area Trend */}
        <Card dark={dark} style={{ padding:"24px 26px" }}>
          <SectionHead title="Asset status over time" sub="6-month trend · all departments" dark={dark}/>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trendData} margin={{top:4,right:4,left:-20,bottom:0}}>
              <defs>
                {[[T.emerald,"ga"],[T.amber,"gb"],[T.violet,"gc"]].map(([c,id])=>(
                  <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={c} stopOpacity={0.25}/>
                    <stop offset="95%" stopColor={c} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={th.gridLine} vertical={false}/>
              <XAxis dataKey="m" stroke={th.textLo} tick={{fontSize:11,fontFamily:"'JetBrains Mono',monospace"}} axisLine={false} tickLine={false}/>
              <YAxis stroke={th.textLo} tick={{fontSize:11,fontFamily:"'JetBrains Mono',monospace"}} axisLine={false} tickLine={false}/>
              <Tooltip content={<ChartTip dark={dark}/>}/>
              <Legend iconType="circle" iconSize={7} wrapperStyle={{fontSize:11,paddingTop:8}}/>
              <Area type="monotone" dataKey="active"    name="Active"      stroke={T.emerald} fill="url(#ga)" strokeWidth={2}/>
              <Area type="monotone" dataKey="maint"     name="Maintenance" stroke={T.amber}   fill="url(#gb)" strokeWidth={2}/>
              <Area type="monotone" dataKey="available" name="Available"   stroke={T.violet}  fill="url(#gc)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Category donut */}
        <Card dark={dark} style={{ padding:"24px 26px" }}>
          <SectionHead title="By category" sub="Asset count distribution" dark={dark}/>
          <ResponsiveContainer width="100%" height={170}>
            <RPie>
              <Pie data={categoryDist} dataKey="value" cx="50%" cy="50%"
                outerRadius={70} innerRadius={44} paddingAngle={2} startAngle={90} endAngle={-270}>
                {categoryDist.map((_,i)=><Cell key={i} fill={T.chart[i%T.chart.length]}/>)}
              </Pie>
              <Tooltip content={<ChartTip dark={dark}/>}/>
            </RPie>
          </ResponsiveContainer>
          <div style={{ display:"flex", flexDirection:"column", gap:7, marginTop:4 }}>
            {categoryDist.map((c,i)=>(
              <div key={c.name} style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:8, height:8, borderRadius:2, background:T.chart[i%T.chart.length], flexShrink:0 }}/>
                <span style={{ fontSize:12, color:th.textMid, flex:1 }}>{c.name}</span>
                <span style={{ fontSize:11, color:th.textLo, fontFamily:"'JetBrains Mono',monospace" }}>{c.count.toLocaleString()}</span>
                <span style={{ fontSize:11, fontWeight:700, color:th.text, fontFamily:"'JetBrains Mono',monospace", minWidth:28, textAlign:"right" }}>{c.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Row: Activity + Maintenance + Alerts ──────────────── */}
      <div className="rg-3" style={{ marginBottom:20 }}>

        {/* Recent Activity */}
        <Card dark={dark} style={{ padding:"22px 24px" }}>
          <SectionHead title="Recent activity" sub="Live event stream" action={()=>setPage("auditlogs")} actionLabel="View log" dark={dark}/>
          <div>
            {activities.map((a,i)=>{
              const Icon = a.icon;
              return (
                <div key={a.id} className="row-hover" style={{
                  display:"flex", gap:12, alignItems:"flex-start",
                  borderBottom: i<activities.length-1 ? `1px solid ${th.borderLo}` : "none",
                  cursor:"pointer", borderRadius:6, margin:"0 -6px", padding:"10px 6px"
                }}>
                  <div style={{ width:30, height:30, borderRadius:8, background:`${a.color}18`,
                    display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Icon size={13} color={a.color}/>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12, fontWeight:600, color:th.text, lineHeight:1.4 }}>{a.title}</div>
                    <div style={{ fontSize:11, color:th.textMid, marginTop:2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.sub}</div>
                  </div>
                  <span style={{ fontSize:10, color:th.textLo, whiteSpace:"nowrap", fontFamily:"'JetBrains Mono',monospace" }}>{a.time}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Upcoming Maintenance */}
        <Card dark={dark} style={{ padding:"22px 24px" }}>
          <SectionHead title="Upcoming maintenance" sub="Next 14 days" action={()=>setPage("maintenance")} actionLabel="Full schedule" dark={dark}/>
          <div>
            {upcomingMaint.map((m,i)=>(
              <div key={m.id} style={{
                display:"flex", gap:12, alignItems:"center",
                padding:"10px 0", borderBottom:i<upcomingMaint.length-1?`1px solid ${th.borderLo}`:"none"
              }}>
                <div style={{ background:th.cardHi, border:`1px solid ${th.border}`, borderRadius:8,
                  padding:"5px 9px", textAlign:"center", flexShrink:0, minWidth:44 }}>
                  <div style={{ fontSize:9, fontWeight:800, color:T.sky, letterSpacing:0.5, textTransform:"uppercase" }}>
                    {m.date.split(" ")[0]}
                  </div>
                  <div style={{ fontSize:18, fontWeight:800, color:th.text, lineHeight:1, fontFamily:"'JetBrains Mono',monospace" }}>
                    {m.date.split(" ")[1]}
                  </div>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:th.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{m.asset}</div>
                  <div style={{ fontSize:11, color:th.textMid, marginTop:1 }}>{m.tech} · {m.type}</div>
                </div>
                <PriorityPill priority={m.priority}/>
              </div>
            ))}
          </div>
        </Card>

        {/* Alerts */}
        <Card dark={dark} style={{ padding:"22px 24px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <div>
              <h2 style={{ fontSize:14, fontWeight:700, color:th.text, margin:0 }}>Active alerts</h2>
              <p style={{ fontSize:12, color:th.textMid, marginTop:3 }}>Requires attention</p>
            </div>
            <div style={{ display:"flex", gap:6 }}>
              <span style={{ padding:"2px 8px", borderRadius:20, background:"rgba(239,68,68,0.12)", color:T.rose, fontSize:10, fontWeight:700 }}>2 Critical</span>
              <span style={{ padding:"2px 8px", borderRadius:20, background:"rgba(245,158,11,0.12)", color:T.amber, fontSize:10, fontWeight:700 }}>2 Warning</span>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {alerts.map(a=>{
              const lcfg = { critical:{c:T.rose, bg:"rgba(239,68,68,0.08)"}, warning:{c:T.amber, bg:"rgba(245,158,11,0.08)"}, info:{c:T.sky, bg:"rgba(14,165,233,0.08)"} };
              const lc = lcfg[a.level] || lcfg.info;
              return (
                <div key={a.id} style={{ padding:"10px 12px", borderRadius:10, background:lc.bg,
                  borderLeft:`3px solid ${lc.c}`, cursor:"pointer" }}
                  onMouseEnter={e=>e.currentTarget.style.opacity="0.8"}
                  onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                  <div style={{ fontSize:12, fontWeight:600, color:lc.c, lineHeight:1.4 }}>{a.msg}</div>
                  <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
                    <span style={{ fontSize:11, color:th.textMid }}>{a.loc}</span>
                    <span style={{ fontSize:10, color:th.textLo, fontFamily:"'JetBrains Mono',monospace" }}>{a.ago} ago</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* ── Dept Utilization ──────────────────────────────────── */}
      <Card dark={dark} style={{ padding:"24px 28px", marginBottom:20 }}>
        <SectionHead title="Department utilization" sub="Asset allocation and utilization by department" action={()=>setPage("reports")} actionLabel="Full report" dark={dark}/>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr>
                {["Department","Total Assets","Active","Utilization","Budget (GHS M)"].map(h=>(
                  <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:10,
                    fontWeight:700, color:th.textLo, textTransform:"uppercase", letterSpacing:0.8,
                    borderBottom:`1px solid ${th.border}`, whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {deptData.map((d,i)=>(
                <tr key={d.dept} className="row-hover" style={{ borderBottom:`1px solid ${th.borderLo}`, cursor:"pointer" }}>
                  <td style={{ padding:"13px 16px", fontSize:13, fontWeight:600, color:th.text }}>{d.dept}</td>
                  <td style={{ padding:"13px 16px", fontSize:12, color:th.textMid, fontFamily:"'JetBrains Mono',monospace" }}>{d.assets.toLocaleString()}</td>
                  <td style={{ padding:"13px 16px", fontSize:12, color:th.textMid, fontFamily:"'JetBrains Mono',monospace" }}>{d.active.toLocaleString()}</td>
                  <td style={{ padding:"13px 16px", minWidth:180 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ flex:1, height:5, background:th.bg2, borderRadius:3, overflow:"hidden" }}>
                        <div style={{ height:"100%", width:`${d.util}%`, borderRadius:3, transition:"width 0.8s ease",
                          background: d.util>85 ? T.emerald : d.util>60 ? T.sky : T.amber }}/>
                      </div>
                      <span style={{ fontSize:11, fontWeight:700, color:th.text, minWidth:32,
                        fontFamily:"'JetBrains Mono',monospace" }}>{d.util}%</span>
                    </div>
                  </td>
                  <td style={{ padding:"13px 16px", fontSize:12, color:th.textMid, fontFamily:"'JetBrains Mono',monospace" }}>₵{d.budget}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Maintenance Cost Bar ──────────────────────────────── */}
      <Card dark={dark} style={{ padding:"24px 28px" }}>
        <SectionHead title="Maintenance expenditure" sub="Monthly cost in GHS · FY2025" dark={dark}/>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={trendData} margin={{top:4,right:4,left:-20,bottom:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke={th.gridLine} vertical={false}/>
            <XAxis dataKey="m" stroke={th.textLo} tick={{fontSize:11,fontFamily:"'JetBrains Mono',monospace"}} axisLine={false} tickLine={false}/>
            <YAxis stroke={th.textLo} tick={{fontSize:11,fontFamily:"'JetBrains Mono',monospace"}} axisLine={false} tickLine={false} tickFormatter={v=>`₵${v}k`}/>
            <Tooltip content={<ChartTip dark={dark}/>}/>
            <Bar dataKey="cost" name="Cost (₵k)" radius={[5,5,0,0]}>
              {trendData.map((_,i)=><Cell key={i} fill={i===trendData.length-1 ? T.sky : `${T.sky}55`}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════  ASSETS PAGE  */
function AssetsPage({ dark, toast }) {
  const th = useTheme(dark);
  const [rows, setRows] = useState(assetRows);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(new Set());
  const [sort, setSort] = useState({ col:"id", dir:"asc" });
  const [filters, setFilters] = useState({ cat:[], dept:[], cond:[] });

  /* modal state */
  const [showNew,    setShowNew]    = useState(false);
  const [showEdit,   setShowEdit]   = useState(false);
  const [showView,   setShowView]   = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [activeAsset, setActiveAsset] = useState(null);

  const filtered = rows.filter(a=>
    (statusFilter==="All" || a.status===statusFilter) &&
    (a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase())) &&
    (!filters.cat.length  || filters.cat.includes(a.cat)) &&
    (!filters.dept.length || filters.dept.includes(a.dept)) &&
    (!filters.cond.length || filters.cond.includes(a.cond))
  );

  const toggleSelect = (id) => setSelected(s=>{
    const n=new Set(s); n.has(id)?n.delete(id):n.add(id); return n;
  });

  const handleSaveAsset = (data) => {
    setRows(r => {
      const idx = r.findIndex(x=>x.id===data.id);
      if(idx>=0){ const n=[...r]; n[idx]={...n[idx],...data}; return n; }
      return [...r, data];
    });
    toast(showEdit ? "Asset updated" : "Asset registered","success");
  };

  const handleDelete = () => {
    setRows(r=>r.filter(x=>!selected.has(x.id)));
    toast(`${selected.size} asset${selected.size>1?"s":""} deleted`,"error");
    setSelected(new Set());
  };

  const handleDeleteSingle = (id) => {
    setRows(r=>r.filter(x=>x.id!==id));
    toast("Asset deleted","error");
  };

  const handleAssign = (id, emp, dept) => {
    setRows(r=>r.map(x=>x.id===id?{...x,emp,dept}:x));
    toast(`Asset assigned to ${emp}`,"success");
  };

  const handleBulkExport = () => {
    const toExport = rows.filter(r=>selected.has(r.id));
    exportCSV(toExport,"GRIDCo_Selected_Assets.csv");
    toast(`Exported ${toExport.length} assets`,"success");
  };

  const colHeader = (label, col) => (
    <th onClick={()=>setSort(s=>({col,dir:s.col===col&&s.dir==="asc"?"desc":"asc"}))}
      style={{ padding:"11px 16px", textAlign:"left", fontSize:10, fontWeight:700,
        color: sort.col===col ? T.sky : th.textLo, textTransform:"uppercase", letterSpacing:0.8,
        borderBottom:`1px solid ${th.border}`, whiteSpace:"nowrap", cursor:"pointer", userSelect:"none" }}>
      {label}{sort.col===col&&(sort.dir==="asc"?<ArrowUp size={10} style={{marginLeft:3}}/>:<ArrowDown size={10} style={{marginLeft:3}}/>)}
    </th>
  );

  return (
    <div className="page-content" style={{ padding:"32px 36px", background:th.bg, minHeight:"100vh" }}>

      {/* Modals */}
      <AssetModal     open={showNew}    onClose={()=>setShowNew(false)}    dark={dark} onSave={handleSaveAsset}/>
      <AssetModal     open={showEdit}   onClose={()=>setShowEdit(false)}   dark={dark} asset={activeAsset} onSave={handleSaveAsset}/>
      <AssetDetailModal open={showView} onClose={()=>setShowView(false)}   dark={dark} asset={activeAsset}
        onEdit={a=>{setActiveAsset(a);setShowEdit(true);}} onAssign={a=>{setActiveAsset(a);setShowAssign(true);}}/>
      <AssignModal    open={showAssign} onClose={()=>setShowAssign(false)} dark={dark} asset={activeAsset} onSave={handleAssign}/>
      <ImportModal    open={showImport} onClose={()=>setShowImport(false)} dark={dark}
        onImport={()=>toast("Assets imported successfully","success")}/>
      <FilterPanel    open={showFilter} onClose={()=>setShowFilter(false)} dark={dark} onApply={f=>{ setFilters(f); toast("Filters applied","info"); }}/>
      <ConfirmModal   open={showDelete} onClose={()=>setShowDelete(false)} dark={dark}
        title="Delete assets" danger
        body={`Permanently delete ${selected.size} selected asset${selected.size>1?"s":""}? This cannot be undone.`}
        onConfirm={handleDelete}/>

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28, flexWrap:"wrap", gap:16 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:800, color:th.text, letterSpacing:-0.5 }}>Asset Registry</h1>
          <p style={{ fontSize:13, color:th.textMid, marginTop:4 }}>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", color:T.sky }}>{rows.length.toLocaleString()}</span> assets across all departments · last synced 2 min ago
          </p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <GhostBtn icon={Upload} dark={dark} onClick={()=>setShowImport(true)}>Import</GhostBtn>
          <ExportBtns dark={dark} title="Asset Registry" subtitle="All registered GRIDCo assets" filename="GRIDCo_Assets"
            columns={[{label:"ID",key:"id"},{label:"Name",key:"name"},{label:"Category",key:"cat"},{label:"Department",key:"dept"},{label:"Status",key:"status"},{label:"Condition",key:"cond"},{label:"Value (GHS)",key:"val"},{label:"Warranty",key:"warranty"},{label:"Employee",key:"emp"}]}
            rows={rows}/>
          <PrimaryBtn icon={Plus} onClick={()=>setShowNew(true)}>Register asset</PrimaryBtn>
        </div>
      </div>

      {/* Filter bar */}
      <Card dark={dark} style={{ padding:"14px 18px", marginBottom:18, display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, background:th.bg1,
          border:`1px solid ${th.border}`, borderRadius:9, padding:"8px 14px", flex:"1 1 220px", maxWidth:340 }}>
          <Search size={14} color={th.textLo}/>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Search by name, ID, category…"
            style={{ border:"none", background:"transparent", color:th.text, fontSize:13, flex:1 }}/>
          {search && <button onClick={()=>setSearch("")} style={{ background:"none",border:"none",cursor:"pointer",color:th.textLo,display:"flex" }}><X size={12}/></button>}
        </div>

        <div style={{ display:"flex", gap:4 }}>
          {["All","Active","Maintenance","Available","Critical"].map(f=>(
            <button key={f} onClick={()=>setStatusFilter(f)} style={{
              padding:"7px 13px", borderRadius:7, fontSize:12, fontWeight:600, cursor:"pointer",
              border: statusFilter===f ? `1px solid ${T.sky}` : `1px solid ${th.border}`,
              background: statusFilter===f ? `${T.sky}14` : "transparent",
              color: statusFilter===f ? T.sky : th.textMid,
              transition:"all 0.15s"
            }}>{f}</button>
          ))}
        </div>

        <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
          <GhostBtn icon={Filter} dark={dark} small onClick={()=>setShowFilter(true)}>
            Filters{(filters.cat.length+filters.dept.length+filters.cond.length)>0
              ? <span style={{background:T.sky,color:"#fff",borderRadius:10,padding:"1px 6px",fontSize:10,marginLeft:4,fontWeight:700}}>
                  {filters.cat.length+filters.dept.length+filters.cond.length}
                </span> : null}
          </GhostBtn>
          <GhostBtn icon={SlidersHorizontal} dark={dark} small onClick={()=>toast("Column customisation coming soon","info")}>Columns</GhostBtn>
        </div>
      </Card>

      {/* Bulk actions */}
      {selected.size>0 && (
        <div style={{ background:`${T.sky}18`, border:`1px solid ${T.sky}44`, borderRadius:10,
          padding:"10px 18px", marginBottom:14, display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
          <span style={{ fontSize:13, color:T.sky, fontWeight:600 }}>{selected.size} asset{selected.size>1?"s":""} selected</span>
          <div style={{ display:"flex", gap:8 }}>
            {[
              {l:"Assign", fn:()=>{ const a=rows.find(r=>selected.has(r.id)); setActiveAsset(a); setShowAssign(true); }},
              {l:"Export", fn:handleBulkExport},
              {l:"Print labels", fn:()=>toast("Print job sent to printer","info")},
              {l:"Delete", fn:()=>setShowDelete(true), danger:true},
            ].map(a=>(
              <button key={a.l} onClick={a.fn} style={{ fontSize:12, color:a.danger?T.rose:T.sky, background:"none",
                border:`1px solid ${a.danger?T.rose+"44":T.sky+"44"}`, borderRadius:6, padding:"4px 12px", cursor:"pointer", fontWeight:600 }}>{a.l}</button>
            ))}
          </div>
          <button onClick={()=>setSelected(new Set())} style={{ marginLeft:"auto", background:"none", border:"none", cursor:"pointer", color:th.textMid }}><X size={14}/></button>
        </div>
      )}

      {/* Table */}
      <Card dark={dark} style={{ overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background: dark ? T.d3 : T.l1 }}>
                <th style={{ padding:"11px 16px", textAlign:"left", borderBottom:`1px solid ${th.border}` }}>
                  <input type="checkbox" checked={selected.size===filtered.length&&filtered.length>0}
                    onChange={e=>setSelected(e.target.checked?new Set(filtered.map(a=>a.id)):new Set())}
                    style={{ accentColor:T.sky, cursor:"pointer" }}/>
                </th>
                {colHeader("Asset ID","id")}
                {colHeader("Name","name")}
                {colHeader("Department","dept")}
                <th style={{ padding:"11px 16px", textAlign:"left", fontSize:10, fontWeight:700, color:th.textLo, textTransform:"uppercase", letterSpacing:0.8, borderBottom:`1px solid ${th.border}` }}>Employee</th>
                {colHeader("Status","status")}
                {colHeader("Warranty","warranty")}
                <th style={{ padding:"11px 16px", textAlign:"left", fontSize:10, fontWeight:700, color:th.textLo, textTransform:"uppercase", letterSpacing:0.8, borderBottom:`1px solid ${th.border}` }}>Value (GHS)</th>
                {colHeader("Condition","cond")}
                <th style={{ padding:"11px 16px", borderBottom:`1px solid ${th.border}` }}/>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a,i)=>(
                <tr key={a.id} className="row-hover" style={{ borderBottom:`1px solid ${th.borderLo}`, cursor:"pointer" }}>
                  <td style={{ padding:"13px 16px" }}>
                    <input type="checkbox" checked={selected.has(a.id)} onChange={()=>toggleSelect(a.id)} style={{ accentColor:T.sky, cursor:"pointer" }}/>
                  </td>
                  <td style={{ padding:"13px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <QrCode size={12} color={th.textLo}/>
                      <span style={{ fontSize:12, fontWeight:700, color:T.sky, fontFamily:"'JetBrains Mono',monospace" }}>{a.id}</span>
                    </div>
                  </td>
                  <td style={{ padding:"13px 16px" }}>
                    <div style={{ fontSize:13, fontWeight:600, color:th.text }}>{a.name}</div>
                    <div style={{ fontSize:11, color:th.textMid, marginTop:1 }}>{a.cat}</div>
                  </td>
                  <td style={{ padding:"13px 16px", fontSize:12, color:th.textMid }}>{a.dept}</td>
                  <td style={{ padding:"13px 16px" }}>
                    {a.emp==="Unassigned"
                      ? <span style={{ fontSize:12, color:th.textLo, fontStyle:"italic" }}>Unassigned</span>
                      : <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                          <Av initials={a.emp.split(" ").map(p=>p[0]).join("")} size={24}/>
                          <span style={{ fontSize:12, color:th.text, fontWeight:500 }}>{a.emp}</span>
                        </div>
                    }
                  </td>
                  <td style={{ padding:"13px 16px" }}><StatusPill status={a.status}/></td>
                  <td style={{ padding:"13px 16px", fontSize:12, color:th.textMid, fontFamily:"'JetBrains Mono',monospace" }}>{a.warranty}</td>
                  <td style={{ padding:"13px 16px", fontSize:12, color:th.text, fontFamily:"'JetBrains Mono',monospace", fontWeight:600 }}>₵{a.val}</td>
                  <td style={{ padding:"13px 16px" }}>
                    <span style={{ fontSize:11, fontWeight:600, fontFamily:"'JetBrains Mono',monospace",
                      color: a.cond==="Excellent"?T.emerald:a.cond==="Good"?T.sky:a.cond==="Fair"?T.amber:T.rose }}>{a.cond}</span>
                  </td>
                  <td style={{ padding:"13px 16px" }}>
                    <div style={{ display:"flex", gap:4 }}>
                      {[
                        {Ic:Eye,    fn:()=>{ setActiveAsset(a); setShowView(true); }},
                        {Ic:Edit,   fn:()=>{ setActiveAsset(a); setShowEdit(true); }},
                        {Ic:Trash2, fn:()=>{ setSelected(new Set([a.id])); setShowDelete(true); }},
                      ].map(({Ic,fn},j)=>(
                        <button key={j} onClick={fn} style={{ width:28, height:28, borderRadius:6, border:`1px solid ${th.border}`,
                          background:"transparent", cursor:"pointer", color:j===2?T.rose+"88":th.textMid, display:"flex",
                          alignItems:"center", justifyContent:"center", transition:"all 0.15s" }}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor=j===2?T.rose:T.sky;e.currentTarget.style.color=j===2?T.rose:T.sky;}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.color=j===2?T.rose+"88":th.textMid;}}>
                          <Ic size={12}/>
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"13px 20px", borderTop:`1px solid ${th.border}` }}>
          <span style={{ fontSize:12, color:th.textMid }}>
            Showing <span style={{ fontFamily:"'JetBrains Mono',monospace", color:th.text, fontWeight:600 }}>{filtered.length}</span> of <span style={{ fontFamily:"'JetBrains Mono',monospace", color:th.text, fontWeight:600 }}>4,827</span> assets
          </span>
          <div style={{ display:"flex", gap:4 }}>
            <button style={{ padding:"5px 10px", borderRadius:6, border:`1px solid ${th.border}`, background:"transparent", color:th.textMid, fontSize:12, cursor:"pointer" }}><ChevronLeft size={13}/></button>
            {[1,2,3,"…",96].map((p,i)=>(
              <button key={i} style={{ width:30, height:30, borderRadius:6, border:`1px solid ${p===1?T.sky:th.border}`,
                background:p===1?T.sky:"transparent", color:p===1?"#fff":th.textMid,
                fontSize:12, cursor:"pointer", fontWeight:600 }}>{p}</button>
            ))}
            <button style={{ padding:"5px 10px", borderRadius:6, border:`1px solid ${th.border}`, background:"transparent", color:th.textMid, fontSize:12, cursor:"pointer" }}><ChevronRight size={13}/></button>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════  MAINTENANCE  */
function MaintenancePage({ dark, toast }) {
  const th = useTheme(dark);
  const [tab, setTab] = useState("upcoming");
  const [showMaint, setShowMaint] = useState(false);
  const days=Array.from({length:31},(_,i)=>i+1);
  const maintDays=[2,4,6,9,11,15,19,23,27,30];

  return (
    <div className="page-content" style={{ padding:"32px 36px", background:th.bg, minHeight:"100vh" }}>
      <MaintenanceModal open={showMaint} onClose={()=>setShowMaint(false)} dark={dark}
        onSave={()=>toast("Maintenance job scheduled","success")}/>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28, flexWrap:"wrap", gap:16 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:800, color:th.text, letterSpacing:-0.5 }}>Maintenance</h1>
          <p style={{ fontSize:13, color:th.textMid, marginTop:4 }}>July 2025 · 12 scheduled jobs · 3 overdue</p>
        </div>
        <div style={{display:"flex",gap:10}}>
          <ExportBtns dark={dark} title="Maintenance Schedule" subtitle="Upcoming and scheduled maintenance jobs — July 2025" filename="GRIDCo_Maintenance"
            columns={[{label:"Asset",key:"asset"},{label:"Date",key:"date"},{label:"Technician",key:"tech"},{label:"Priority",key:"priority"},{label:"Type",key:"type"}]}
            rows={upcomingMaint}/>
          <PrimaryBtn icon={Plus} onClick={()=>setShowMaint(true)}>Schedule job</PrimaryBtn>
        </div>
      </div>

      {/* Stat strip */}
      <div className="rg-4" style={{ marginBottom:24 }}>
        {[
          { l:"Scheduled",      v:"12", c:T.sky     },
          { l:"In Progress",    v:"4",  c:T.amber   },
          { l:"Completed (Jun)",v:"28", c:T.emerald },
          { l:"Overdue",        v:"3",  c:T.rose    },
        ].map(s=>(
          <Card key={s.l} dark={dark} style={{ padding:"18px 22px" }}>
            <div style={{ fontSize:28, fontWeight:800, color:s.c, fontFamily:"'JetBrains Mono',monospace" }}>{s.v}</div>
            <div style={{ fontSize:12, color:th.textMid, marginTop:4 }}>{s.l}</div>
          </Card>
        ))}
      </div>

      <div className="rg-2" style={{ gap:22 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          {/* Calendar */}
          <Card dark={dark} style={{ padding:"24px 26px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h2 style={{ fontSize:14, fontWeight:700, color:th.text }}>July 2025</h2>
              <div style={{ display:"flex", gap:6 }}>
                <button style={{ width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",color:th.textMid,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}><ChevronLeft size={13}/></button>
                <button style={{ width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",color:th.textMid,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}><ChevronRight size={13}/></button>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4, marginBottom:8 }}>
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>(
                <div key={d} style={{ textAlign:"center",fontSize:10,fontWeight:700,color:th.textLo,padding:"4px 0",letterSpacing:0.5 }}>{d}</div>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4 }}>
              {Array.from({length:2}).map((_,i)=><div key={`e${i}`}/>)}
              {days.map(d=>{
                const hasMaint=maintDays.includes(d), isToday=d===29;
                return (
                  <div key={d} style={{
                    textAlign:"center", padding:"7px 4px", borderRadius:8, fontSize:12, cursor:"pointer",
                    fontWeight:isToday||hasMaint?700:400, position:"relative",
                    background:isToday?T.sky:hasMaint?`${T.sky}14`:"transparent",
                    color:isToday?"#fff":hasMaint?T.sky:th.text,
                    transition:"background 0.15s"
                  }}
                  onMouseEnter={e=>{ if(!isToday) e.currentTarget.style.background=hasMaint?`${T.sky}22`:`${T.sky}08`; }}
                  onMouseLeave={e=>{ if(!isToday) e.currentTarget.style.background=hasMaint?`${T.sky}14`:"transparent"; }}>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace" }}>{d}</span>
                    {hasMaint&&!isToday&&<div style={{ position:"absolute",bottom:2,left:"50%",transform:"translateX(-50%)",width:3,height:3,borderRadius:"50%",background:T.sky }}/>}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Cost chart */}
          <Card dark={dark} style={{ padding:"24px 26px" }}>
            <SectionHead title="Maintenance cost" sub="Monthly expenditure · GHS" dark={dark}/>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={trendData} margin={{top:4,right:4,left:-20,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={th.gridLine} vertical={false}/>
                <XAxis dataKey="m" stroke={th.textLo} tick={{fontSize:11,fontFamily:"'JetBrains Mono',monospace"}} axisLine={false} tickLine={false}/>
                <YAxis stroke={th.textLo} tick={{fontSize:11,fontFamily:"'JetBrains Mono',monospace"}} axisLine={false} tickLine={false} tickFormatter={v=>`₵${v}k`}/>
                <Tooltip content={<ChartTip dark={dark}/>}/>
                <Bar dataKey="cost" name="₵k" radius={[5,5,0,0]}>
                  {trendData.map((_,i)=><Cell key={i} fill={i===trendData.length-1?T.sky:`${T.sky}55`}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Jobs panel */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <Card dark={dark} style={{ padding:"22px 22px" }}>
            <div style={{ display:"flex", gap:4, marginBottom:18, background:th.bg1, borderRadius:9, padding:4 }}>
              {["upcoming","completed"].map(t=>(
                <button key={t} onClick={()=>setTab(t)} style={{
                  flex:1, padding:"7px 0", borderRadius:7, border:"none", cursor:"pointer", fontSize:12, fontWeight:600, textTransform:"capitalize",
                  background:tab===t?th.card:"transparent",
                  color:tab===t?th.text:th.textMid,
                  boxShadow:tab===t?"0 1px 4px rgba(0,0,0,0.15)":"none",
                  transition:"all 0.15s"
                }}>{t}</button>
              ))}
            </div>
            {tab==="upcoming" && upcomingMaint.map((m,i)=>(
              <div key={m.id} style={{ display:"flex", gap:12, alignItems:"flex-start",
                padding:"12px 0", borderBottom:i<upcomingMaint.length-1?`1px solid ${th.borderLo}`:"none" }}>
                <div style={{ background:th.bg1, borderRadius:8, padding:"6px 10px", textAlign:"center", flexShrink:0, minWidth:46, border:`1px solid ${th.border}` }}>
                  <div style={{ fontSize:9, fontWeight:800, color:T.sky, letterSpacing:0.5, textTransform:"uppercase" }}>{m.date.split(" ")[0]}</div>
                  <div style={{ fontSize:17, fontWeight:800, color:th.text, fontFamily:"'JetBrains Mono',monospace", lineHeight:1.2 }}>{m.date.split(" ")[1]}</div>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:th.text }}>{m.asset}</div>
                  <div style={{ fontSize:11, color:th.textMid, marginTop:2 }}>{m.tech}</div>
                  <div style={{ marginTop:6 }}><PriorityPill priority={m.priority}/></div>
                </div>
              </div>
            ))}
            {tab==="completed" && [
              { asset:"Transformer PT-1038", date:"Jun 28", tech:"James Adu",   type:"Preventive" },
              { asset:"Server Rack SR-01",   date:"Jun 25", tech:"Esi Asante",  type:"Corrective" },
              { asset:"Vehicle VH-07",       date:"Jun 22", tech:"P. Agyemang", type:"Routine"    },
              { asset:"HV Cable HC-14",      date:"Jun 18", tech:"Yaw Darko",   type:"Inspection" },
            ].map((m,i,arr)=>(
              <div key={i} style={{ display:"flex", gap:10, alignItems:"center",
                padding:"12px 0", borderBottom:i<arr.length-1?`1px solid ${th.borderLo}`:"none" }}>
                <CheckCircle size={16} color={T.emerald} style={{ flexShrink:0 }}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:th.text }}>{m.asset}</div>
                  <div style={{ fontSize:11, color:th.textMid }}>{m.tech} · {m.type} · {m.date}</div>
                </div>
              </div>
            ))}
          </Card>

          {/* Technician workload */}
          <Card dark={dark} style={{ padding:"22px 22px" }}>
            <SectionHead title="Technician load" sub="July assignments" dark={dark}/>
            {[
              { name:"James Adu",    jobs:4, cap:6 },
              { name:"Ama Frimpong", jobs:3, cap:6 },
              { name:"Yaw Darko",    jobs:5, cap:6 },
              { name:"Abena Kwame",  jobs:2, cap:6 },
            ].map(t=>(
              <div key={t.name} style={{ marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <span style={{ fontSize:12, color:th.text, fontWeight:500 }}>{t.name}</span>
                  <span style={{ fontSize:11, color:th.textMid, fontFamily:"'JetBrains Mono',monospace" }}>{t.jobs}/{t.cap}</span>
                </div>
                <div style={{ height:5, background:th.bg1, borderRadius:3, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${(t.jobs/t.cap)*100}%`, borderRadius:3,
                    background:t.jobs/t.cap>0.75?T.rose:t.jobs/t.cap>0.5?T.amber:T.emerald, transition:"width 0.8s" }}/>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════  REPORTS  */
function ReportsPage({ dark, toast }) {
  const th = useTheme(dark);
  const acqData=[{m:"Jan",acq:45,dis:12},{m:"Feb",acq:38,dis:8},{m:"Mar",acq:62,dis:15},{m:"Apr",acq:51,dis:9},{m:"May",acq:44,dis:11},{m:"Jun",acq:70,dis:18}];

  return (
    <div className="page-content" style={{ padding:"32px 36px", background:th.bg, minHeight:"100vh" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28, flexWrap:"wrap", gap:16 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:800, color:th.text, letterSpacing:-0.5 }}>Reports & Analytics</h1>
          <p style={{ fontSize:13, color:th.textMid, marginTop:4 }}>Q2 FY2025 · April 1 – June 30, 2025 · GRIDCo National Network</p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <ExportBtns dark={dark} title="Q2 FY2025 Report" subtitle="April 1 – June 30, 2025 · GRIDCo National Network" filename="GRIDCo_Q2_Report"
            columns={[{label:"ID",key:"id"},{label:"Asset",key:"name"},{label:"Category",key:"cat"},{label:"Department",key:"dept"},{label:"Status",key:"status"},{label:"Condition",key:"cond"},{label:"Value (GHS)",key:"val"},{label:"Employee",key:"emp"}]}
            rows={assetRows}/>
        </div>
      </div>

      {/* Summary row */}
      <div className="rg-4" style={{ marginBottom:24 }}>
        {[
          { l:"Total Asset Value",   v:"₵2.84B",  d:"+5.2% vs Q1", up:true  },
          { l:"Maintenance Spend",   v:"₵231.5k", d:"+8.1% vs Q1", up:false },
          { l:"New Acquisitions",    v:"₵310",    d:"+28% vs Q1",  up:true  },
          { l:"Assets Disposed",     v:"₵63",     d:"-12% vs Q1",  up:true  },
        ].map(s=>(
          <Card key={s.l} dark={dark} style={{ padding:"18px 22px" }}>
            <div style={{ fontSize:10, color:th.textLo, textTransform:"uppercase", letterSpacing:0.8, fontWeight:600, marginBottom:8 }}>{s.l}</div>
            <div style={{ fontSize:24, fontWeight:800, color:th.text, fontFamily:"'JetBrains Mono',monospace" }}>{s.v}</div>
            <div style={{ fontSize:11, color:s.up?T.emerald:T.rose, fontWeight:600, marginTop:5, display:"flex", alignItems:"center", gap:3 }}>
              {s.up?<ArrowUp size={10}/>:<ArrowDown size={10}/>}{s.d}
            </div>
          </Card>
        ))}
      </div>

      <div className="rg-2c" style={{ marginBottom:20 }}>
        <Card dark={dark} style={{ padding:"24px 26px" }}>
          <SectionHead title="Asset value by category" sub="GHS millions" dark={dark}/>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart layout="vertical" data={[
              {cat:"Transformers",v:42.8},{cat:"Infrastructure",v:38.5},{cat:"Substations",v:22.1},
              {cat:"Vehicles",v:6.7},{cat:"IT Systems",v:8.2},{cat:"Safety",v:1.4},
            ]} margin={{top:0,right:16,left:10,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={th.gridLine} horizontal={false}/>
              <XAxis type="number" stroke={th.textLo} tick={{fontSize:10,fontFamily:"'JetBrains Mono',monospace"}} axisLine={false} tickLine={false} tickFormatter={v=>`₵${v}M`}/>
              <YAxis type="category" dataKey="cat" stroke={th.textLo} tick={{fontSize:11}} width={100} axisLine={false} tickLine={false}/>
              <Tooltip content={<ChartTip dark={dark}/>}/>
              <Bar dataKey="v" name="Value (₵M)" radius={[0,5,5,0]}>
                {[T.sky,T.skyLt,T.violet,T.emerald,T.amber,T.rose].map((c,i)=><Cell key={i} fill={c}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card dark={dark} style={{ padding:"24px 26px" }}>
          <SectionHead title="Status distribution" sub="All 4,827 assets" dark={dark}/>
          <ResponsiveContainer width="100%" height={220}>
            <RPie>
              <Pie data={[
                {name:"Active",value:3614},{name:"Maintenance",value:312},
                {name:"Available",value:621},{name:"Critical",value:280},
              ]} dataKey="value" cx="50%" cy="50%" outerRadius={90} innerRadius={55}
                paddingAngle={3} startAngle={90} endAngle={-270}
                label={({name,percent})=>`${(percent*100).toFixed(0)}%`} labelLine={false}>
                {[T.emerald,T.amber,T.sky,T.rose].map((c,i)=><Cell key={i} fill={c}/>)}
              </Pie>
              <Tooltip content={<ChartTip dark={dark}/>}/>
              <Legend iconType="circle" iconSize={7} wrapperStyle={{fontSize:11,paddingTop:8}}/>
            </RPie>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card dark={dark} style={{ padding:"24px 26px", marginBottom:20 }}>
        <SectionHead title="Acquisition vs. disposal trend" sub="Monthly count · Q2 FY2025" dark={dark}/>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={acqData} margin={{top:4,right:4,left:-20,bottom:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke={th.gridLine} vertical={false}/>
            <XAxis dataKey="m" stroke={th.textLo} tick={{fontSize:11,fontFamily:"'JetBrains Mono',monospace"}} axisLine={false} tickLine={false}/>
            <YAxis stroke={th.textLo} tick={{fontSize:11,fontFamily:"'JetBrains Mono',monospace"}} axisLine={false} tickLine={false}/>
            <Tooltip content={<ChartTip dark={dark}/>}/>
            <Legend iconType="circle" iconSize={7} wrapperStyle={{fontSize:11}}/>
            <Line type="monotone" dataKey="acq" name="Acquired" stroke={T.emerald} strokeWidth={2.5} dot={{fill:T.emerald,r:4,strokeWidth:0}}/>
            <Line type="monotone" dataKey="dis" name="Disposed" stroke={T.rose}    strokeWidth={2.5} dot={{fill:T.rose,r:4,strokeWidth:0}}/>
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="rg-3c" style={{ gap:14 }}>
        {[
          { t:"Asset Utilization Report",  d:"Full breakdown by dept & category", i:PieChart,     date:"Jun 30" },
          { t:"Warranty Expiry Report",    d:"89 assets expiring within 90 days", i:AlertTriangle,date:"Jun 28" },
          { t:"Maintenance Cost Summary",  d:"Total Q2 spend: ₵231,500",         i:DollarSign,   date:"Jun 30" },
          { t:"Depreciation Schedule",     d:"Asset value by class & age",        i:TrendingDown, date:"Jun 30" },
          { t:"Department Inventory",      d:"Per-dept asset count and status",   i:Building2,    date:"Jun 25" },
          { t:"Compliance Audit Trail",    d:"Full Q2 log for ISO 55001 review",  i:ClipboardList,date:"Jun 30" },
        ].map(r=>{
          const Icon = r.i;
          return (
            <Card key={r.t} dark={dark} style={{ padding:"18px 20px", cursor:"pointer" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor=T.sky}
              onMouseLeave={e=>e.currentTarget.style.borderColor=th.border}>
              <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:12 }}>
                <div style={{ width:34, height:34, borderRadius:9, background:`${T.sky}14`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Icon size={16} color={T.sky}/>
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:th.text }}>{r.t}</div>
                  <div style={{ fontSize:11, color:th.textMid, marginTop:2 }}>{r.d}</div>
                </div>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:10, color:th.textLo, fontFamily:"'JetBrains Mono',monospace" }}>{r.date} 2025</span>
                <div style={{ display:"flex", gap:6 }}>
                  {["PDF","XLSX"].map(f=>(
                    <button key={f} onClick={()=>{ exportCSV(assetRows,`GRIDCo_${r.t.replace(/ /g,"_")}.csv`); toast(`${r.t} exported`,"success"); }}
                      style={{ padding:"3px 9px", borderRadius:5, border:`1px solid ${th.border}`,
                      background:"transparent", color:th.textMid, fontSize:10, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace", fontWeight:600 }}>{f}</button>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════  NOTIFICATIONS  */
function NotificationsPage({ dark }) {
  const th = useTheme(dark);
  const [items, setItems] = useState(notifs);
  const [filterType, setFilterType] = useState("all");
  const unread = items.filter(n=>!n.read).length;
  const typeCfg = {
    critical:{ c:T.rose,    bg:"rgba(239,68,68,0.1)",   Icon:AlertTriangle },
    warning: { c:T.amber,   bg:"rgba(245,158,11,0.1)",  Icon:AlertTriangle },
    info:    { c:T.sky,     bg:"rgba(14,165,233,0.1)",  Icon:Info          },
    success: { c:T.emerald, bg:"rgba(16,185,129,0.1)",  Icon:CheckCircle   },
  };
  const filtered = filterType==="all" ? items : filterType==="unread" ? items.filter(n=>!n.read) : items.filter(n=>n.type===filterType);

  return (
    <div className="page-content" style={{ padding:"32px 36px", background:th.bg, minHeight:"100vh" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28, flexWrap:"wrap", gap:16 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:800, color:th.text, letterSpacing:-0.5 }}>Notifications</h1>
          <p style={{ fontSize:13, color:th.textMid, marginTop:4 }}>
            {unread>0 ? <><span style={{ fontFamily:"'JetBrains Mono',monospace", color:T.rose, fontWeight:700 }}>{unread}</span> unread notifications requiring attention</> : "All caught up"}
          </p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <GhostBtn dark={dark} icon={CheckSquare} onClick={()=>setItems(n=>n.map(x=>({...x,read:true})))}>Mark all read</GhostBtn>
        </div>
      </div>

      <div style={{ display:"flex", gap:6, marginBottom:20 }}>
        {[["all","All"],["unread","Unread"],["critical","Critical"],["warning","Warning"],["info","Info"],["success","Success"]].map(([val,lbl])=>(
          <button key={val} onClick={()=>setFilterType(val)} style={{
            padding:"6px 13px", borderRadius:7, fontSize:12, fontWeight:600, cursor:"pointer",
            border:`1px solid ${filterType===val?T.sky:th.border}`,
            background:filterType===val?`${T.sky}14`:"transparent",
            color:filterType===val?T.sky:th.textMid, transition:"all 0.15s"
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ maxWidth:760, display:"flex", flexDirection:"column", gap:10 }}>
        {filtered.map(n=>{
          const cfg=typeCfg[n.type]||typeCfg.info;
          const NIcon=cfg.Icon;
          return (
            <div key={n.id} onClick={()=>setItems(it=>it.map(x=>x.id===n.id?{...x,read:true}:x))}
              style={{ background:th.card, border:`1px solid ${n.read?th.border:cfg.c+"44"}`,
                borderRadius:13, padding:"16px 20px", display:"flex", gap:14, alignItems:"flex-start",
                cursor:"pointer", opacity:n.read?0.72:1, transition:"all 0.2s",
                animation:!n.read?"fadeUp 0.3s ease both":undefined }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=cfg.c+"66"; e.currentTarget.style.opacity="1"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor=n.read?th.border:cfg.c+"44"; e.currentTarget.style.opacity=n.read?"0.72":"1"; }}>
              <div style={{ width:36, height:36, borderRadius:10, background:cfg.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <NIcon size={16} color={cfg.c}/>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", justifyContent:"space-between", gap:12, marginBottom:4 }}>
                  <span style={{ fontSize:14, fontWeight:700, color:th.text }}>{n.title}</span>
                  <span style={{ fontSize:11, color:th.textLo, whiteSpace:"nowrap", fontFamily:"'JetBrains Mono',monospace" }}>{n.time}</span>
                </div>
                <p style={{ fontSize:13, color:th.textMid, lineHeight:1.55, margin:0 }}>{n.body}</p>
              </div>
              {!n.read&&<div style={{ width:8,height:8,borderRadius:"50%",background:T.sky,flexShrink:0,marginTop:4 }}/>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════  SETTINGS  */
const SYSTEM_ROLES = ["Administrator","Asset Manager","Department Head","Maintenance Engineer","Auditor","Viewer"];

const PERMS_DEF = [
  {id:"view_assets",   label:"View Assets",          desc:"Browse and search the asset registry",          group:"Assets"},
  {id:"edit_assets",   label:"Add / Edit Assets",    desc:"Register new assets and modify records",        group:"Assets"},
  {id:"delete_assets", label:"Delete Assets",        desc:"Permanently remove asset records",              group:"Assets"},
  {id:"maintenance",   label:"Manage Maintenance",   desc:"Schedule and update maintenance jobs",          group:"Operations"},
  {id:"reports",       label:"View Reports",         desc:"Access analytics and generate reports",         group:"Operations"},
  {id:"export",        label:"Export Data",          desc:"Download CSV exports from any module",          group:"Operations"},
  {id:"employees",     label:"Manage Employees",     desc:"Add, edit and deactivate staff records",        group:"Team"},
  {id:"suppliers",     label:"Manage Suppliers",     desc:"Manage vendor and supplier relationships",      group:"Team"},
  {id:"locations",     label:"Manage Locations",     desc:"Add and configure site locations",              group:"Team"},
  {id:"departments",   label:"Manage Departments",   desc:"Create and edit department structure",          group:"Team"},
  {id:"user_mgmt",     label:"User Management",      desc:"Invite users, assign roles, deactivate accounts",group:"Administration"},
  {id:"settings",      label:"System Settings",      desc:"Modify system-wide configuration",              group:"Administration"},
];

const _defaultPerms = {
  "Administrator":        {view_assets:true, edit_assets:true, delete_assets:true, maintenance:true, reports:true, export:true, employees:true, suppliers:true, locations:true, departments:true, user_mgmt:true, settings:true},
  "Asset Manager":        {view_assets:true, edit_assets:true, delete_assets:false,maintenance:true, reports:true, export:true, employees:false,suppliers:true, locations:true, departments:false,user_mgmt:false,settings:false},
  "Department Head":      {view_assets:true, edit_assets:true, delete_assets:false,maintenance:true, reports:true, export:true, employees:true, suppliers:false,locations:false,departments:false,user_mgmt:false,settings:false},
  "Maintenance Engineer": {view_assets:true, edit_assets:false,delete_assets:false,maintenance:true, reports:true, export:false,employees:false,suppliers:false,locations:false,departments:false,user_mgmt:false,settings:false},
  "Auditor":              {view_assets:true, edit_assets:false,delete_assets:false,maintenance:false,reports:true, export:true, employees:false,suppliers:false,locations:false,departments:false,user_mgmt:false,settings:false},
  "Viewer":               {view_assets:true, edit_assets:false,delete_assets:false,maintenance:false,reports:false,export:false,employees:false,suppliers:false,locations:false,departments:false,user_mgmt:false,settings:false},
};

const _sysUsers = [
  {id:"USR-001",name:"Prince Amoako Bannerman",email:"p.bannerman@gridco.com.gh",role:"Administrator",       dept:"IT & Telecom",          status:"Active",  last:"Just now",initials:"PB"},
  {id:"USR-002",name:"Akosua Mensah",    email:"a.mensah@gridco.com.gh",   role:"Asset Manager",       dept:"Transmission Ops",      status:"Active",  last:"2h ago",  initials:"AM"},
  {id:"USR-003",name:"Joseph Quartey",   email:"j.quartey@gridco.com.gh",  role:"Department Head",     dept:"Substation Engineering",status:"Active",  last:"1d ago",  initials:"JQ"},
  {id:"USR-004",name:"Nana Akua Asante", email:"n.asante@gridco.com.gh",   role:"Department Head",     dept:"Safety & HSE",          status:"Active",  last:"3h ago",  initials:"NA"},
  {id:"USR-005",name:"Yaw Darko",        email:"y.darko@gridco.com.gh",    role:"Maintenance Engineer",dept:"Fleet & Logistics",     status:"Active",  last:"5h ago",  initials:"YD"},
  {id:"USR-006",name:"Patricia Mensah",  email:"p.mensah@gridco.com.gh",   role:"Asset Manager",       dept:"Corporate Services",    status:"Active",  last:"2d ago",  initials:"PM"},
  {id:"USR-007",name:"Kofi Boateng",     email:"k.boateng@gridco.com.gh",  role:"Auditor",             dept:"Corporate Services",    status:"Active",  last:"1w ago",  initials:"KB"},
  {id:"USR-008",name:"Abena Kwame",      email:"a.kwame@gridco.com.gh",    role:"Viewer",              dept:"Transmission Ops",      status:"Inactive",last:"2w ago",  initials:"AK"},
];
let _nextUsrId = 9;

function UserModal({open,onClose,user=null,onSave,dark}) {
  const th=useTheme(dark);
  const editing=!!user;
  const empty={name:"",email:"",role:SYSTEM_ROLES[1],dept:DEPARTMENTS[0],status:"Active"};
  const [form,setForm]=useState(empty);
  useEffect(()=>{if(open) setForm(user?{name:user.name,email:user.email,role:user.role,dept:user.dept,status:user.status}:empty);},[open,user]);
  const set=k=>v=>setForm(f=>({...f,[k]:v}));
  const valid=form.name.trim().length>1&&form.email.includes("@");
  const handleSave=()=>{
    if(!valid) return;
    const initials=form.name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
    const id=editing?user.id:`USR-${String(_nextUsrId++).padStart(3,"0")}`;
    onSave({...user,...form,id,initials,last:editing?user.last:"Just now"});
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose} dark={dark} width={520} title={editing?`Edit · ${user?.id}`:"Invite User"}>
      <div style={{padding:"22px",display:"flex",flexDirection:"column",gap:14}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <FField label="Full Name *"><FInput value={form.name} onChange={set("name")} placeholder="e.g. Kofi Asante" dark={dark}/></FField>
          <FField label="System Role *"><FSelect value={form.role} onChange={set("role")} options={SYSTEM_ROLES} dark={dark}/></FField>
        </div>
        <FField label="Work Email *"><FInput value={form.email} onChange={set("email")} type="email" placeholder="name@gridco.com.gh" dark={dark}/></FField>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <FField label="Department"><FSelect value={form.dept} onChange={set("dept")} options={DEPARTMENTS} dark={dark}/></FField>
          <FField label="Status"><FSelect value={form.status} onChange={set("status")} options={["Active","Inactive"]} dark={dark}/></FField>
        </div>
        {!editing&&(
          <div style={{padding:"10px 14px",borderRadius:8,background:`${T.sky}0d`,border:`1px solid ${T.sky}33`,fontSize:12,color:T.sky}}>
            An invitation email will be sent to the provided address (demo — no email sent).
          </div>
        )}
        <div style={{display:"flex",justifyContent:"flex-end",gap:10,paddingTop:14,borderTop:`1px solid ${th.border}`}}>
          <GhostBtn dark={dark} onClick={onClose}>Cancel</GhostBtn>
          <PrimaryBtn icon={editing?CheckCircle:Plus} onClick={handleSave}>{editing?"Save changes":"Send invitation"}</PrimaryBtn>
        </div>
      </div>
    </Modal>
  );
}

function SettingsPage({ dark, onToggleDark, toast, onAdminUpdate }) {
  const th = useTheme(dark);
  const [tab, setTab] = useState("company");
  const [users, setUsers] = useState(_sysUsers);
  const [showInvite, setShowInvite] = useState(false);
  const [showEditUsr, setShowEditUsr] = useState(false);
  const [showDelUsr, setShowDelUsr] = useState(false);
  const [activeUsr, setActiveUsr] = useState(null);
  const [usrSearch, setUsrSearch] = useState("");
  const [perms, setPerms] = useState(_defaultPerms);
  const [selRole, setSelRole] = useState("Asset Manager");
  const ROLE_CLR = {"Administrator":T.rose,"Asset Manager":T.sky,"Department Head":T.violet,"Maintenance Engineer":T.emerald,"Auditor":T.amber,"Viewer":"#64748B"};
  const handleSaveUser = data => {
    setUsers(r=>{const i=r.findIndex(x=>x.id===data.id);if(i>=0){const n=[...r];n[i]={...n[i],...data};return n;}return[...r,data];});
    if(data.id==="USR-001"&&onAdminUpdate) onAdminUpdate({name:data.name,initials:data.initials||data.name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2)});
  };
  const tabs=[
    {id:"company",     l:"Company Profile",    i:Building2  },
    {id:"users",       l:"User Management",    i:Users       },
    {id:"roles",       l:"Roles & Permissions",i:Shield      },
    {id:"preferences", l:"Preferences",        i:SlidersHorizontal     },
    {id:"integrations",l:"API Integrations",   i:Globe       },
  ];
  const Toggle = ({on=true, onClick}) => (
    <button onClick={onClick} style={{ width:44,height:24,borderRadius:12,border:"none",cursor:"pointer",position:"relative",
      background:on?T.sky:th.bg2, transition:"background 0.2s" }}>
      <div style={{ position:"absolute",top:2,left:on?22:2,width:20,height:20,borderRadius:"50%",background:"#fff",
        transition:"left 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }}/>
    </button>
  );

  return (
    <div className="page-content" style={{ padding:"32px 36px", background:th.bg, minHeight:"100vh" }}>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontSize:22, fontWeight:800, color:th.text, letterSpacing:-0.5 }}>Settings</h1>
        <p style={{ fontSize:13, color:th.textMid, marginTop:4 }}>Manage system configuration, users, and preferences</p>
      </div>
      <div className="rg-2c" style={{ gap:22 }}>
        <Card dark={dark} style={{ padding:10, alignSelf:"start" }}>
          {tabs.map(t=>{
            const Icon=t.i;
            const active=tab===t.id;
            return (
              <button key={t.id} onClick={()=>setTab(t.id)} style={{
                width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 12px",
                borderRadius:9, border:"none", background:active?`${T.sky}14`:"transparent",
                color:active?T.sky:th.textMid, fontSize:13, fontWeight:active?700:500, cursor:"pointer",
                textAlign:"left", marginBottom:2, transition:"all 0.15s"
              }}>
                <Icon size={14}/>{t.l}
                {active&&<div style={{ marginLeft:"auto",width:3,height:14,borderRadius:2,background:T.sky }}/>}
              </button>
            );
          })}
        </Card>
        <Card dark={dark} style={{ padding:28 }}>
          {tab==="company"&&(
            <div>
              <h2 style={{ fontSize:16,fontWeight:700,color:th.text,marginBottom:24 }}>Company Profile</h2>
              <div style={{ display:"flex",gap:18,alignItems:"center",marginBottom:28,padding:18,
                background:th.bg1,borderRadius:12,border:`1px solid ${th.border}` }}>
                <div style={{ height:60,borderRadius:12,
                  background:"#fff",border:`1px solid ${th.border}`,
                  display:"flex",alignItems:"center",justifyContent:"center",padding:"8px 16px",flexShrink:0 }}>
                  <img src="/gridco-logo.png" alt="GRIDCo" style={{ height:38,width:"auto" }}/>
                </div>
                <div>
                  <div style={{ fontSize:17,fontWeight:800,color:th.text }}>Ghana Grid Company Limited</div>
                  <div style={{ fontSize:12,color:th.textMid,marginTop:2 }}>GRIDCo · National Power Transmission Utility</div>
                  <button style={{ marginTop:8,fontSize:12,color:T.sky,background:"none",border:"none",cursor:"pointer",padding:0,fontWeight:600 }}>Change logo</button>
                </div>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
                {[
                  {l:"Company Name",v:"Ghana Grid Company Limited"},
                  {l:"Short Name",v:"GRIDCo"},
                  {l:"Industry",v:"Power Transmission & Distribution"},
                  {l:"Registration No.",v:"CS-2006-7892"},
                  {l:"Headquarters",v:"Electro Volta House, Accra, Ghana"},
                  {l:"Contact Email",v:"info@gridco.com.gh"},
                ].map(f=>(
                  <div key={f.l}>
                    <label style={{ display:"block",fontSize:11,fontWeight:700,color:th.textLo,
                      marginBottom:6,textTransform:"uppercase",letterSpacing:0.5 }}>{f.l}</label>
                    <input defaultValue={f.v} style={{ width:"100%",padding:"9px 12px",borderRadius:8,
                      border:`1px solid ${th.border}`,background:th.bg1,color:th.text,fontSize:13,
                      transition:"border-color 0.15s",boxSizing:"border-box" }}
                      onFocus={e=>e.target.style.borderColor=T.sky}
                      onBlur={e=>e.target.style.borderColor=th.border}/>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:24 }}>
                <PrimaryBtn onClick={()=>toast("Company profile saved","success")}>Save changes</PrimaryBtn>
              </div>
            </div>
          )}
          {tab==="preferences"&&(
            <div>
              <h2 style={{ fontSize:16,fontWeight:700,color:th.text,marginBottom:24 }}>Preferences</h2>
              <div style={{ display:"flex",flexDirection:"column",gap:4 }}>
                {[
                  {l:"Dark mode",d:"Switch between light and dark interface",on:dark,fn:onToggleDark},
                  {l:"Email notifications",d:"Receive system alerts and reports via email",on:true},
                  {l:"Warranty alerts (90-day window)",d:"Alert when asset warranties expire within 90 days",on:true},
                  {l:"Maintenance reminders",d:"7-day advance notice before scheduled jobs",on:true},
                  {l:"Auto asset numbering",d:"Automatically assign sequential AST-XXXX IDs",on:true},
                  {l:"Two-factor authentication",d:"Require 2FA for all user logins",on:false},
                ].map((p,i)=>(
                  <div key={p.l} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",
                    padding:"16px 18px",borderRadius:10,border:`1px solid ${th.border}`,marginBottom:8,
                    background:th.bg1 }}>
                    <div>
                      <div style={{ fontSize:13,fontWeight:600,color:th.text }}>{p.l}</div>
                      <div style={{ fontSize:12,color:th.textMid,marginTop:2 }}>{p.d}</div>
                    </div>
                    <Toggle on={p.on} onClick={p.fn}/>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab==="users"&&(
            <div>
              <UserModal open={showInvite} onClose={()=>setShowInvite(false)} dark={dark}
                onSave={d=>{handleSaveUser(d);toast("Invitation sent","success");}}/>
              <UserModal open={showEditUsr} onClose={()=>setShowEditUsr(false)} dark={dark} user={activeUsr}
                onSave={d=>{handleSaveUser(d);toast("User updated","success");}}/>
              <ConfirmModal open={showDelUsr} onClose={()=>setShowDelUsr(false)} dark={dark} title="Remove user" danger
                body={`Remove ${activeUsr?.name}? They will lose all system access immediately.`}
                onConfirm={()=>{setUsers(r=>r.filter(x=>x.id!==activeUsr?.id));toast("User removed","error");}}/>

              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
                <h2 style={{fontSize:16,fontWeight:700,color:th.text,margin:0}}>User Management</h2>
                <PrimaryBtn icon={Plus} onClick={()=>setShowInvite(true)}>Invite user</PrimaryBtn>
              </div>

              <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:9,
                background:`${T.rose}0d`,border:`1px solid ${T.rose}30`,marginBottom:18,fontSize:12}}>
                <Shield size={13} color={T.rose} style={{flexShrink:0}}/>
                <span style={{color:T.rose}}>Signed in as <strong>Administrator</strong> — unrestricted access to all modules and settings.</span>
              </div>

              <div className="rg-4" style={{marginBottom:18}}>
                {[
                  {l:"Total Users",   v:users.length,                               c:T.sky},
                  {l:"Active",        v:users.filter(u=>u.status==="Active").length, c:T.emerald},
                  {l:"Admins",        v:users.filter(u=>u.role==="Administrator").length,c:T.rose},
                  {l:"Roles Defined", v:SYSTEM_ROLES.length,                        c:T.violet},
                ].map(s=>(
                  <div key={s.l} style={{padding:"14px 16px",borderRadius:10,border:`1px solid ${th.border}`,background:th.bg1}}>
                    <div style={{fontSize:22,fontWeight:800,color:s.c,fontFamily:"'JetBrains Mono',monospace"}}>{s.v}</div>
                    <div style={{fontSize:11,color:th.textMid,marginTop:3}}>{s.l}</div>
                  </div>
                ))}
              </div>

              <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",borderRadius:9,
                border:`1px solid ${th.border}`,background:th.bg1,marginBottom:14}}>
                <Search size={14} color={th.textLo}/>
                <input value={usrSearch} onChange={e=>setUsrSearch(e.target.value)}
                  placeholder="Search by name, email or role…"
                  style={{border:"none",background:"transparent",color:th.text,fontSize:13,flex:1}}/>
                {usrSearch&&<button onClick={()=>setUsrSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:th.textLo,display:"flex"}}><X size={12}/></button>}
              </div>

              <div style={{border:`1px solid ${th.border}`,borderRadius:12,overflow:"hidden"}}>
                {users.filter(u=>!usrSearch||(u.name+u.email+u.role).toLowerCase().includes(usrSearch.toLowerCase())).map((u,i,arr)=>{
                  const rc=ROLE_CLR[u.role]||"#64748B";
                  const isAdmin=u.role==="Administrator";
                  return (
                    <div key={u.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",
                      borderBottom:i<arr.length-1?`1px solid ${th.borderLo}`:"none",
                      background:isAdmin?`${T.rose}05`:"transparent",transition:"background 0.12s"}}>
                      <div style={{width:36,height:36,borderRadius:9,background:`${rc}20`,border:`1.5px solid ${rc}40`,
                        display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:rc,flexShrink:0}}>
                        {u.initials}
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:600,color:th.text,display:"flex",alignItems:"center",gap:6}}>
                          {u.name}
                          {isAdmin&&<span style={{fontSize:9,fontWeight:800,padding:"1px 6px",borderRadius:4,background:T.rose,color:"#fff",textTransform:"uppercase",letterSpacing:0.5}}>You</span>}
                        </div>
                        <div style={{fontSize:11,color:th.textMid,marginTop:1}}>{u.email}</div>
                      </div>
                      <span style={{padding:"3px 10px",borderRadius:6,fontSize:11,fontWeight:700,background:`${rc}15`,color:rc,whiteSpace:"nowrap",flexShrink:0}}>{u.role}</span>
                      <span style={{fontSize:11,color:th.textMid,flexShrink:0,display:"none"}} className="hide-tablet">{u.dept}</span>
                      <span onClick={()=>{if(!isAdmin){setUsers(r=>r.map(x=>x.id===u.id?{...x,status:x.status==="Active"?"Inactive":"Active"}:x));toast(u.status==="Active"?"User deactivated":"User activated",u.status==="Active"?"error":"success");}}}
                        style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:600,flexShrink:0,
                          cursor:isAdmin?"default":"pointer",userSelect:"none",
                          background:u.status==="Active"?"rgba(16,185,129,0.1)":"rgba(100,116,139,0.1)",
                          color:u.status==="Active"?T.emerald:"#64748B",
                          border:"1px dashed transparent",transition:"border-color 0.15s"}}
                        onMouseEnter={e=>{if(!isAdmin)e.currentTarget.style.borderColor=u.status==="Active"?"#94A3B8":T.emerald;}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor="transparent";}}>
                        {u.status}
                      </span>
                      <span style={{fontSize:11,color:th.textLo,minWidth:60,textAlign:"right",flexShrink:0}}>{u.last}</span>
                      <div style={{display:"flex",gap:4,flexShrink:0,width:60,justifyContent:"flex-end"}}>
                        <button onClick={()=>{setActiveUsr(u);setShowEditUsr(true);}}
                          style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",
                            color:th.textMid,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor=T.sky;e.currentTarget.style.color=T.sky;}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.color=th.textMid;}}>
                          <Edit size={12}/>
                        </button>
                        {!isAdmin&&(
                          <button onClick={()=>{setActiveUsr(u);setShowDelUsr(true);}}
                            style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",
                              color:`${T.rose}88`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}
                            onMouseEnter={e=>{e.currentTarget.style.borderColor=T.rose;e.currentTarget.style.color=T.rose;}}
                            onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.color=`${T.rose}88`;}}>
                            <Trash2 size={12}/>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {tab==="roles"&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
                <div>
                  <h2 style={{fontSize:16,fontWeight:700,color:th.text,margin:0,marginBottom:3}}>Roles & Permissions</h2>
                  <p style={{fontSize:12,color:th.textMid,margin:0}}>{SYSTEM_ROLES.length} roles · {PERMS_DEF.length} permission categories</p>
                </div>
                <PrimaryBtn icon={CheckCircle} onClick={()=>toast("Permissions saved","success")}>Save changes</PrimaryBtn>
              </div>

              <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:9,
                background:`${T.rose}0d`,border:`1px solid ${T.rose}30`,marginBottom:20,fontSize:12}}>
                <Shield size={13} color={T.rose} style={{flexShrink:0}}/>
                <span style={{color:T.rose}}><strong>Administrator</strong> always has full, unrestricted access to all modules. These permissions are locked.</span>
              </div>

              <div style={{display:"flex",gap:6,marginBottom:22,flexWrap:"wrap"}}>
                {SYSTEM_ROLES.map(r=>{
                  const rc=ROLE_CLR[r]||"#64748B";
                  const isActive=selRole===r;
                  const uCount=users.filter(u=>u.role===r).length;
                  return (
                    <button key={r} onClick={()=>setSelRole(r)}
                      style={{padding:"7px 14px",borderRadius:8,border:`1.5px solid ${isActive?rc:th.border}`,
                        background:isActive?`${rc}15`:"transparent",color:isActive?rc:th.textMid,
                        fontSize:12,fontWeight:isActive?700:500,cursor:"pointer",transition:"all 0.15s",
                        display:"flex",alignItems:"center",gap:6}}>
                      {r==="Administrator"&&<Shield size={11}/>}{r}
                      <span style={{fontSize:10,fontFamily:"'JetBrains Mono',monospace",opacity:0.65}}>{uCount}</span>
                    </button>
                  );
                })}
              </div>

              {selRole==="Administrator"?(
                <div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
                    {PERMS_DEF.map(p=>(
                      <div key={p.id} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px",
                        borderRadius:9,border:`1px solid ${T.rose}25`,background:`${T.rose}06`}}>
                        <div style={{width:18,height:18,borderRadius:"50%",background:T.rose,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          <CheckCircle size={11} color="#fff"/>
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:12,fontWeight:600,color:th.text}}>{p.label}</div>
                          <div style={{fontSize:10,color:th.textMid,marginTop:1}}>{p.desc}</div>
                        </div>
                        <Lock size={10} color={`${T.rose}70`} style={{flexShrink:0}}/>
                      </div>
                    ))}
                  </div>
                  <div style={{fontSize:12,color:th.textLo,textAlign:"center",paddingTop:8}}>All permissions are locked for the Administrator role.</div>
                </div>
              ):(
                <div>
                  {["Assets","Operations","Team","Administration"].map(group=>{
                    const gPerms=PERMS_DEF.filter(p=>p.group===group);
                    const rc=ROLE_CLR[selRole]||"#64748B";
                    return (
                      <div key={group} style={{marginBottom:20}}>
                        <div style={{fontSize:10,fontWeight:800,color:th.textLo,textTransform:"uppercase",letterSpacing:0.8,
                          marginBottom:8,paddingBottom:6,borderBottom:`1px solid ${th.border}`}}>{group}</div>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                          {gPerms.map(p=>{
                            const checked=!!(perms[selRole]?.[p.id]);
                            return (
                              <div key={p.id}
                                onClick={()=>setPerms(prev=>({...prev,[selRole]:{...prev[selRole],[p.id]:!checked}}))}
                                style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px",borderRadius:9,cursor:"pointer",
                                  border:`1px solid ${checked?rc+"45":th.border}`,background:checked?`${rc}09`:"transparent",transition:"all 0.15s"}}>
                                <div style={{width:17,height:17,borderRadius:5,border:`2px solid ${checked?rc:th.border}`,
                                  background:checked?rc:"transparent",display:"flex",alignItems:"center",justifyContent:"center",
                                  flexShrink:0,transition:"all 0.15s"}}>
                                  {checked&&<CheckCircle size={10} color="#fff"/>}
                                </div>
                                <div style={{minWidth:0}}>
                                  <div style={{fontSize:12,fontWeight:600,color:checked?th.text:th.textMid}}>{p.label}</div>
                                  <div style={{fontSize:10,color:th.textLo,marginTop:1}}>{p.desc}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:14,borderTop:`1px solid ${th.border}`}}>
                    <span style={{fontSize:12,color:th.textMid}}>
                      <span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:ROLE_CLR[selRole]||"#64748B"}}>
                        {Object.values(perms[selRole]||{}).filter(Boolean).length}
                      </span> of {PERMS_DEF.length} permissions enabled for <strong style={{color:th.text}}>{selRole}</strong>
                    </span>
                    <PrimaryBtn icon={CheckCircle} onClick={()=>toast(`Permissions saved for ${selRole}`,"success")}>Save role</PrimaryBtn>
                  </div>
                </div>
              )}
            </div>
          )}
          {tab==="integrations"&&(
            <div>
              <div style={{marginBottom:22}}>
                <h2 style={{fontSize:16,fontWeight:700,color:th.text,margin:0,marginBottom:4}}>API Integrations</h2>
                <p style={{fontSize:12,color:th.textMid,margin:0}}>Connect GRIDCo Asset Management to external systems</p>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                {[
                  {name:"SCADA Integration",  sub:"Real-time telemetry from grid control systems",       Ic:Activity,          color:T.emerald,status:"Connected",     action:"Disconnect"},
                  {name:"Email / SMTP",        sub:"Send alerts, reports and notifications via email",    Ic:Mail,              color:T.sky,    status:"Connected",     action:"Configure"},
                  {name:"CMMS Sync",           sub:"Sync maintenance records with SAP / IBM Maximo",      Ic:RefreshCw,         color:T.violet, status:"Not configured",action:"Connect"},
                  {name:"SMS Gateway",         sub:"Send SMS alerts via Hubtel or a similar provider",    Ic:Bell,              color:T.amber,  status:"Not configured",action:"Connect"},
                  {name:"Active Directory",    sub:"Authenticate users via LDAP / Microsoft AD",          Ic:Shield,            color:T.arc,    status:"Not configured",action:"Connect"},
                  {name:"GIS / Map Service",   sub:"Visualise asset locations on a live Ghana grid map",  Ic:MapPin,            color:T.rose,   status:"Not configured",action:"Connect"},
                ].map(int=>{
                  const connected=int.status==="Connected";
                  const Ic=int.Ic;
                  return (
                    <div key={int.name} style={{padding:"18px",borderRadius:12,
                      border:`1px solid ${connected?int.color+"40":th.border}`,
                      background:connected?`${int.color}06`:th.bg1}}>
                      <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:14}}>
                        <div style={{width:40,height:40,borderRadius:10,background:`${int.color}18`,
                          border:`1px solid ${int.color}30`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          <Ic size={18} color={int.color}/>
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:13,fontWeight:700,color:th.text,marginBottom:3}}>{int.name}</div>
                          <div style={{fontSize:11,color:th.textMid,lineHeight:1.5}}>{int.sub}</div>
                        </div>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <span style={{fontSize:11,fontWeight:600,padding:"3px 9px",borderRadius:20,
                          background:connected?"rgba(16,185,129,0.1)":"rgba(100,116,139,0.08)",
                          color:connected?T.emerald:"#64748B"}}>
                          {connected?"● Connected":"○ Not configured"}
                        </span>
                        <button onClick={()=>toast(`${int.name}: ${connected?"disconnected":"connection wizard opening…"}`,connected?"error":"info")}
                          style={{padding:"5px 12px",borderRadius:7,fontSize:11,fontWeight:600,cursor:"pointer",
                            border:`1px solid ${connected?T.rose+"60":int.color+"50"}`,
                            background:connected?`${T.rose}08`:`${int.color}0a`,
                            color:connected?T.rose:int.color,transition:"all 0.15s"}}>
                          {int.action}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════  LOGIN  */
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPass, setFocusPass] = useState(false);

  const submit = () => {
    setLoading(true);
    setTimeout(()=>{ setLoading(false); onLogin(); }, 1400);
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", background:T.d0, fontFamily:"'Inter',-apple-system,sans-serif", overflow:"hidden" }}>
      <style>{css}</style>

      {/* Left — brand panel */}
      <div className="login-brand" style={{ flex:1, position:"relative", display:"flex", flexDirection:"column", justifyContent:"center", padding:"36px 72px", overflow:"hidden" }}>
        {/* Animated grid */}
        <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.05 }}>
          <defs>
            <pattern id="pg" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke={T.sky} strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pg)"/>
        </svg>
        {/* Glow orbs */}
        <div style={{ position:"absolute",top:"25%",left:"40%",width:360,height:360,borderRadius:"50%",background:`radial-gradient(circle,${T.sky}20 0%,transparent 70%)`,pointerEvents:"none" }}/>
        <div style={{ position:"absolute",bottom:"20%",right:"5%",width:240,height:240,borderRadius:"50%",background:`radial-gradient(circle,${T.violet}15 0%,transparent 70%)`,pointerEvents:"none" }}/>

        <div style={{ position:"relative",zIndex:1 }}>
          {/* Logo */}
          <div style={{ display:"flex",alignItems:"center",marginBottom:32 }}>
            <div style={{ background:"#fff",borderRadius:10,padding:"8px 16px",display:"inline-flex",alignItems:"center" }}>
              <img src="/gridco-logo.png" alt="GRIDCo" style={{ height:32,width:"auto" }}/>
            </div>
          </div>

          {/* Live instrument strip */}
          <div style={{ display:"flex",gap:24,marginBottom:24 }}>
            {[
              {l:"Grid Health",  v:94,  c:T.emerald},
              {l:"System Uptime",v:100, c:T.sky    },
              {l:"Capacity Util",v:78,  c:T.amber  },
            ].map(g=><ArcGauge key={g.l} value={g.v} label={g.l} color={g.c} size={95}/>)}
          </div>

          <h1 style={{ fontSize:44,fontWeight:900,color:T.hi,lineHeight:1.12,letterSpacing:-1.5,marginBottom:16,maxWidth:520 }}>
            The asset platform<br/>
            <span style={{ background:`linear-gradient(90deg,${T.sky},${T.arc})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>
              Backbone to Power Delivery.
            </span>
          </h1>
          <p style={{ fontSize:15,color:"rgba(255,255,255,0.45)",lineHeight:1.75,maxWidth:440,marginBottom:24 }}>
            GRIDCo's enterprise asset management platform gives Ghana's national transmission utility real-time visibility over every transformer, substation, vehicle, and safety asset across the network.
          </p>

          {/* Metric row */}
          <div style={{ display:"flex",gap:40 }}>
            {[["4,827","Assets tracked"],["12","Departments"],["99.7%","System uptime"],["₵2.84B","Portfolio value"]].map(([v,l])=>(
              <div key={l}>
                <div style={{ fontSize:22,fontWeight:900,color:T.sky,fontFamily:"'JetBrains Mono',monospace" }}>{v}</div>
                <div style={{ fontSize:11,color:"rgba(255,255,255,0.35)",marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="login-form-panel" style={{ width:460,background:"#ffffff",display:"flex",flexDirection:"column",justifyContent:"center",padding:"60px 50px",position:"relative" }}>
        <div style={{ position:"absolute",top:0,left:0,bottom:0,width:1,background:`linear-gradient(180deg,transparent,${T.sky}44,transparent)` }}/>

        <div style={{ marginBottom:44 }}>
          <img src="/gridco-logo.png" alt="GRIDCo" style={{ height:36,width:"auto" }}/>
        </div>

        <h2 style={{ fontSize:26,fontWeight:800,color:T.d0,letterSpacing:-0.5,marginBottom:6 }}>Sign in</h2>
        <p style={{ fontSize:14,color:"#64748B",marginBottom:36 }}>Access your asset management portal</p>

        {/* Email */}
        <div style={{ marginBottom:16 }}>
          <label style={{ display:"block",fontSize:11,fontWeight:700,color:"#475569",marginBottom:7,textTransform:"uppercase",letterSpacing:0.6 }}>Work email</label>
          <div style={{ display:"flex",alignItems:"center",gap:10,border:`1.5px solid ${focusEmail?T.sky:"#E2E8F0"}`,
            borderRadius:10,padding:"11px 14px",transition:"border-color 0.15s",background:focusEmail?"#F8FBFF":"#fff" }}>
            <Mail size={15} color={focusEmail?T.sky:"#94A3B8"}/>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email"
              placeholder="you@gridco.com.gh"
              onFocus={()=>setFocusEmail(true)} onBlur={()=>setFocusEmail(false)}
              style={{ border:"none",background:"transparent",fontSize:14,color:T.d0,flex:1 }}/>
          </div>
        </div>

        {/* Password */}
        <div style={{ marginBottom:10 }}>
          <label style={{ display:"block",fontSize:11,fontWeight:700,color:"#475569",marginBottom:7,textTransform:"uppercase",letterSpacing:0.6 }}>Password</label>
          <div style={{ display:"flex",alignItems:"center",gap:10,border:`1.5px solid ${focusPass?T.sky:"#E2E8F0"}`,
            borderRadius:10,padding:"11px 14px",transition:"border-color 0.15s",background:focusPass?"#F8FBFF":"#fff" }}>
            <Lock size={15} color={focusPass?T.sky:"#94A3B8"}/>
            <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••"
              onFocus={()=>setFocusPass(true)} onBlur={()=>setFocusPass(false)}
              style={{ border:"none",background:"transparent",fontSize:14,color:T.d0,flex:1 }}/>
          </div>
        </div>

        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28 }}>
          <label style={{ display:"flex",alignItems:"center",gap:7,cursor:"pointer",fontSize:13,color:"#64748B" }}>
            <input type="checkbox" style={{ accentColor:T.sky }}/> Remember this device
          </label>
          <button style={{ fontSize:13,color:T.sky,background:"none",border:"none",cursor:"pointer",fontWeight:600 }}>Forgot password?</button>
        </div>

        <button onClick={submit} disabled={loading} className="btn-glow" style={{
          width:"100%",padding:"13px 0",borderRadius:10,
          background:loading?"#E2E8F0":`linear-gradient(135deg,${T.sky},${T.skyLt})`,
          color:loading?"#94A3B8":"#fff",border:"none",fontSize:15,fontWeight:800,cursor:loading?"not-allowed":"pointer",
          letterSpacing:0.2,display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"all 0.2s"
        }}>
          {loading?<><RefreshCw size={16} style={{ animation:"spin 1s linear infinite" }}/> Authenticating…</>:"Sign in →"}
        </button>

        {/* Demo note */}
        <div style={{ marginTop:28,padding:"14px 16px",background:"#F8FAFC",borderRadius:10,border:"1px solid #E2E8F0" }}>
          <div style={{ fontSize:11,color:"#64748B",fontWeight:700,marginBottom:4,textTransform:"uppercase",letterSpacing:0.5 }}>Demo access</div>
          <div style={{ fontSize:12,color:"#64748B" }}>Email: <span style={{ fontFamily:"'JetBrains Mono',monospace",color:T.d0 }}>admin@gridco.com.gh</span></div>
          <div style={{ fontSize:12,color:"#64748B",marginTop:2 }}>Password: any value</div>
        </div>

        <p style={{ marginTop:28,fontSize:11,color:"#94A3B8",textAlign:"center",lineHeight:1.7 }}>
          Authorized GRIDCo personnel only.<br/>
          © 2025 Ghana Grid Company Limited · ISO 55001 Certified
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════  EMPLOYEE MODAL  */
const empStatusCfg = {
  "Active":   { bg:"rgba(16,185,129,0.1)",  text:"#10B981", dot:T.emerald },
  "On Leave": { bg:"rgba(245,158,11,0.1)",  text:"#F59E0B", dot:T.amber   },
  "Inactive": { bg:"rgba(100,116,139,0.1)", text:"#64748B", dot:"#64748B" },
};
function EmpStatusPill({ status }) {
  const c = empStatusCfg[status] || empStatusCfg.Inactive;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 10px",
      borderRadius:20, background:c.bg, color:c.text, fontSize:11, fontWeight:600 }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:c.dot }}/>
      {status}
    </span>
  );
}

let _nextEmpId = 13;
const EMP_STATUSES = ["Active","On Leave","Inactive"];
const EMP_ROLES = ["Senior Engineer","Engineer","IT Administrator","Network Engineer","Fleet Manager",
  "Driver / Technician","Substation Technician","Electrical Engineer","Transmission Engineer",
  "Line Inspector","HSE Officer","Safety Inspector","Admin Assistant","Manager","Director"];

function EmployeeModal({ open, onClose, employee=null, onSave, dark }) {
  const th = useTheme(dark);
  const editing = !!employee;
  const empty = { name:"", dept:DEPARTMENTS[0], role:EMP_ROLES[0], email:"", phone:"", status:"Active", joined:"" };
  const [form, setForm] = useState(empty);
  useEffect(() => {
    if (open) setForm(employee ? {
      name:employee.name, dept:employee.dept, role:employee.role,
      email:employee.email, phone:employee.phone, status:employee.status, joined:employee.joined
    } : empty);
  }, [open, employee]);
  const set = k => v => setForm(f => ({...f,[k]:v}));
  const valid = form.name.trim().length > 2 && form.email.includes("@");
  const handleSave = () => {
    if (!valid) return;
    const id = editing ? employee.id : `EMP-${String(_nextEmpId++).padStart(3,"0")}`;
    onSave({ ...form, id, assets: employee?.assets || 0 });
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose} dark={dark} width={580} title={editing ? `Edit · ${employee?.id}` : "Add New Employee"}>
      <div style={{ padding:"22px", display:"flex", flexDirection:"column", gap:14 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <FField label="Full Name *"><FInput value={form.name} onChange={set("name")} placeholder="e.g. Kwame Mensah" dark={dark}/></FField>
          <FField label="Role / Position *"><FSelect value={form.role} onChange={set("role")} options={EMP_ROLES} dark={dark}/></FField>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <FField label="Department *"><FSelect value={form.dept} onChange={set("dept")} options={DEPARTMENTS} dark={dark}/></FField>
          <FField label="Status"><FSelect value={form.status} onChange={set("status")} options={EMP_STATUSES} dark={dark}/></FField>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <FField label="Work Email *"><FInput value={form.email} onChange={set("email")} placeholder="name@gridco.com.gh" type="email" dark={dark}/></FField>
          <FField label="Phone"><FInput value={form.phone} onChange={set("phone")} placeholder="+233 24 000 0000" dark={dark}/></FField>
        </div>
        <FField label="Date Joined"><FInput value={form.joined} onChange={set("joined")} type="date" dark={dark}/></FField>
        <div style={{ display:"flex", justifyContent:"flex-end", gap:10, paddingTop:14, borderTop:`1px solid ${th.border}` }}>
          <GhostBtn dark={dark} onClick={onClose}>Cancel</GhostBtn>
          <PrimaryBtn onClick={handleSave} icon={editing ? CheckCircle : Plus}>{editing ? "Save changes" : "Add employee"}</PrimaryBtn>
        </div>
      </div>
    </Modal>
  );
}

function EmployeeDetailModal({ open, onClose, employee, dark, onEdit, onDelete }) {
  const th = useTheme(dark);
  if (!employee) return null;
  const initials = employee.name.split(" ").map(p=>p[0]).join("").slice(0,2);
  const colors = [T.sky, T.emerald, T.violet, T.amber];
  const color = colors[employee.id?.charCodeAt(4) % colors.length] || T.sky;
  return (
    <Modal open={open} onClose={onClose} dark={dark} width={500} title="Employee Profile">
      <div style={{ padding:"22px" }}>
        {/* Avatar + name */}
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:24,
          padding:"20px", background:dark?T.d1:T.l1, borderRadius:14, border:`1px solid ${th.border}` }}>
          <div style={{ width:60, height:60, borderRadius:"50%", background:`linear-gradient(135deg,${color}cc,${color}44)`,
            border:`2px solid ${color}44`, display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:20, fontWeight:800, color:"#fff", flexShrink:0 }}>{initials}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:18, fontWeight:800, color:th.text }}>{employee.name}</div>
            <div style={{ fontSize:13, color:th.textMid, marginTop:2 }}>{employee.role}</div>
            <div style={{ marginTop:8 }}><EmpStatusPill status={employee.status}/></div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:24, fontWeight:800, color:T.sky, fontFamily:"'JetBrains Mono',monospace" }}>{employee.assets}</div>
            <div style={{ fontSize:11, color:th.textMid }}>assets assigned</div>
          </div>
        </div>

        {/* Detail rows */}
        <div style={{ display:"flex", flexDirection:"column", gap:0, border:`1px solid ${th.border}`, borderRadius:12, overflow:"hidden", marginBottom:16 }}>
          {[
            ["Employee ID", employee.id],
            ["Department",  employee.dept],
            ["Work Email",  employee.email],
            ["Phone",       employee.phone || "—"],
            ["Date Joined", employee.joined || "—"],
          ].map(([k,v],i,arr) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"11px 16px", borderBottom:i<arr.length-1?`1px solid ${th.border}`:"none",
              background:i%2===0?(dark?T.d1:"#f8fafc"):"transparent" }}>
              <span style={{ fontSize:11, fontWeight:700, color:th.textLo, textTransform:"uppercase", letterSpacing:0.6 }}>{k}</span>
              <span style={{ fontSize:13, fontWeight:600, color:th.text, fontFamily: k==="Employee ID"?"'JetBrains Mono',monospace":"inherit",
                color: k==="Employee ID"?T.sky:th.text }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", justifyContent:"space-between" }}>
          <button onClick={()=>{ onClose(); onDelete(employee.id); }} style={{
            display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:8,
            border:`1px solid ${T.rose}44`, background:"transparent", color:T.rose, fontSize:12, fontWeight:600, cursor:"pointer" }}>
            <Trash2 size={12}/>Remove employee
          </button>
          <div style={{ display:"flex", gap:8 }}>
            <GhostBtn dark={dark} onClick={onClose}>Close</GhostBtn>
            <PrimaryBtn icon={Edit} onClick={()=>{ onClose(); onEdit(employee); }}>Edit</PrimaryBtn>
          </div>
        </div>
      </div>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════════════════  EMPLOYEES PAGE  */
function EmployeesPage({ dark, toast }) {
  const th = useTheme(dark);
  const [emps, setEmps] = useState(employeeRows);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState({ col:"name", dir:"asc" });
  const [showAdd,    setShowAdd]    = useState(false);
  const [showEdit,   setShowEdit]   = useState(false);
  const [showView,   setShowView]   = useState(false);
  const [showDel,    setShowDel]    = useState(false);
  const [active,     setActive]     = useState(null);

  const filtered = emps
    .filter(e =>
      (deptFilter === "All" || e.dept === deptFilter) &&
      (statusFilter === "All" || e.status === statusFilter) &&
      (e.name.toLowerCase().includes(search.toLowerCase()) ||
       e.id.toLowerCase().includes(search.toLowerCase()) ||
       e.role.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a,b) => {
      const av = a[sort.col]||"", bv = b[sort.col]||"";
      return sort.dir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });

  const handleSave = data => {
    setEmps(r => {
      const idx = r.findIndex(x=>x.id===data.id);
      if (idx>=0) { const n=[...r]; n[idx]={...n[idx],...data}; return n; }
      return [...r, data];
    });
    toast(showEdit ? "Employee updated" : "Employee added", "success");
  };

  const handleDelete = id => {
    setEmps(r => r.filter(x=>x.id!==id));
    toast("Employee removed", "error");
  };

  const colHdr = (label, col) => (
    <th onClick={()=>setSort(s=>({col,dir:s.col===col&&s.dir==="asc"?"desc":"asc"}))}
      style={{ padding:"11px 16px", textAlign:"left", fontSize:10, fontWeight:700,
        color:sort.col===col?T.sky:th.textLo, textTransform:"uppercase", letterSpacing:0.8,
        borderBottom:`1px solid ${th.border}`, whiteSpace:"nowrap", cursor:"pointer", userSelect:"none" }}>
      {label}{sort.col===col&&(sort.dir==="asc"?<ArrowUp size={10} style={{marginLeft:3}}/>:<ArrowDown size={10} style={{marginLeft:3}}/>)}
    </th>
  );

  const stats = [
    { l:"Total Employees",  v:emps.length,                              c:T.sky     },
    { l:"Active",           v:emps.filter(e=>e.status==="Active").length,  c:T.emerald },
    { l:"On Leave",         v:emps.filter(e=>e.status==="On Leave").length,c:T.amber   },
    { l:"Departments",      v:new Set(emps.map(e=>e.dept)).size,        c:T.violet  },
  ];

  return (
    <div className="page-content" style={{ padding:"32px 36px", background:th.bg, minHeight:"100vh" }}>

      <EmployeeModal    open={showAdd}  onClose={()=>setShowAdd(false)}  dark={dark} onSave={handleSave}/>
      <EmployeeModal    open={showEdit} onClose={()=>setShowEdit(false)} dark={dark} employee={active} onSave={handleSave}/>
      <EmployeeDetailModal open={showView} onClose={()=>setShowView(false)} dark={dark} employee={active}
        onEdit={e=>{setActive(e);setShowEdit(true);}} onDelete={id=>{setShowDel(true); setActive(emps.find(e=>e.id===id));}}/>
      <ConfirmModal     open={showDel}  onClose={()=>setShowDel(false)}  dark={dark}
        title="Remove employee" danger
        body={`Remove ${active?.name} from the system? Their assigned assets will be unassigned.`}
        onConfirm={()=>handleDelete(active?.id)}/>

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28, flexWrap:"wrap", gap:16 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:800, color:th.text, letterSpacing:-0.5 }}>Employees</h1>
          <p style={{ fontSize:13, color:th.textMid, marginTop:4 }}>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", color:T.sky }}>{emps.length}</span> staff members across {new Set(emps.map(e=>e.dept)).size} departments
          </p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <ExportBtns dark={dark} title="Employee Directory" subtitle="GRIDCo staff and personnel" filename="GRIDCo_Employees"
            columns={[{label:"ID",key:"id"},{label:"Name",key:"name"},{label:"Role",key:"role"},{label:"Department",key:"dept"},{label:"Email",key:"email"},{label:"Phone",key:"phone"},{label:"Status",key:"status"},{label:"Assets",key:"assets"},{label:"Joined",key:"joined"}]}
            rows={emps}/>
          <PrimaryBtn icon={Plus} onClick={()=>setShowAdd(true)}>Add employee</PrimaryBtn>
        </div>
      </div>

      {/* Stat cards */}
      <div className="rg-4" style={{ marginBottom:24 }}>
        {stats.map(s=>(
          <Card key={s.l} dark={dark} style={{ padding:"18px 22px" }}>
            <div style={{ fontSize:28, fontWeight:800, color:s.c, fontFamily:"'JetBrains Mono',monospace" }}>{s.v}</div>
            <div style={{ fontSize:12, color:th.textMid, marginTop:4 }}>{s.l}</div>
          </Card>
        ))}
      </div>

      {/* Search + filters */}
      <Card dark={dark} style={{ padding:"14px 18px", marginBottom:18, display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, background:th.bg1,
          border:`1px solid ${th.border}`, borderRadius:9, padding:"8px 14px", flex:"1 1 200px", maxWidth:320 }}>
          <Search size={14} color={th.textLo}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, ID, role…"
            style={{ border:"none", background:"transparent", color:th.text, fontSize:13, flex:1 }}/>
          {search && <button onClick={()=>setSearch("")} style={{ background:"none",border:"none",cursor:"pointer",color:th.textLo,display:"flex" }}><X size={12}/></button>}
        </div>

        {/* Dept filter */}
        <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
          {["All",...DEPARTMENTS].map(d=>(
            <button key={d} onClick={()=>setDeptFilter(d)} style={{
              padding:"6px 12px", borderRadius:7, fontSize:11, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap",
              border:`1px solid ${deptFilter===d?T.sky:th.border}`,
              background:deptFilter===d?`${T.sky}14`:"transparent",
              color:deptFilter===d?T.sky:th.textMid, transition:"all 0.13s"
            }}>{d==="All"?"All Depts":d.replace(" & ","/").split(" ").slice(0,2).join(" ")}</button>
          ))}
        </div>

        {/* Status filter */}
        <div style={{ display:"flex", gap:4, marginLeft:"auto" }}>
          {["All","Active","On Leave","Inactive"].map(s=>(
            <button key={s} onClick={()=>setStatusFilter(s)} style={{
              padding:"6px 12px", borderRadius:7, fontSize:11, fontWeight:600, cursor:"pointer",
              border:`1px solid ${statusFilter===s?T.sky:th.border}`,
              background:statusFilter===s?`${T.sky}14`:"transparent",
              color:statusFilter===s?T.sky:th.textMid, transition:"all 0.13s"
            }}>{s}</button>
          ))}
        </div>
      </Card>

      {/* Table */}
      <Card dark={dark} style={{ overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:dark?T.d3:T.l1 }}>
                {colHdr("Employee ID","id")}
                {colHdr("Name","name")}
                {colHdr("Role","role")}
                {colHdr("Department","dept")}
                <th style={{ padding:"11px 16px", textAlign:"left", fontSize:10, fontWeight:700, color:th.textLo,
                  textTransform:"uppercase", letterSpacing:0.8, borderBottom:`1px solid ${th.border}` }}>Contact</th>
                {colHdr("Status","status")}
                {colHdr("Assets","assets")}
                {colHdr("Joined","joined")}
                <th style={{ padding:"11px 16px", borderBottom:`1px solid ${th.border}` }}/>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} style={{ padding:"48px", textAlign:"center", color:th.textMid, fontSize:13 }}>
                  No employees match your search.
                </td></tr>
              ) : filtered.map((e,i) => {
                const initials = e.name.split(" ").map(p=>p[0]).join("").slice(0,2);
                const avatarColors = [T.sky,T.emerald,T.violet,T.amber,T.rose];
                const ac = avatarColors[i % avatarColors.length];
                return (
                  <tr key={e.id} className="row-hover" style={{ borderBottom:`1px solid ${th.borderLo}`, cursor:"pointer" }}>
                    <td style={{ padding:"13px 16px" }}>
                      <span style={{ fontSize:12, fontWeight:700, color:T.sky, fontFamily:"'JetBrains Mono',monospace" }}>{e.id}</span>
                    </td>
                    <td style={{ padding:"13px 16px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ width:32, height:32, borderRadius:"50%", flexShrink:0,
                          background:`linear-gradient(135deg,${ac}cc,${ac}44)`,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:11, fontWeight:800, color:"#fff" }}>{initials}</div>
                        <span style={{ fontSize:13, fontWeight:600, color:th.text, whiteSpace:"nowrap" }}>{e.name}</span>
                      </div>
                    </td>
                    <td style={{ padding:"13px 16px", fontSize:12, color:th.textMid, whiteSpace:"nowrap" }}>{e.role}</td>
                    <td style={{ padding:"13px 16px", fontSize:12, color:th.textMid, whiteSpace:"nowrap" }}>{e.dept}</td>
                    <td style={{ padding:"13px 16px" }}>
                      <div style={{ fontSize:11, color:th.textMid }}>{e.email}</div>
                      <div style={{ fontSize:11, color:th.textLo, marginTop:2 }}>{e.phone}</div>
                    </td>
                    <td style={{ padding:"13px 16px" }}><EmpStatusPill status={e.status}/></td>
                    <td style={{ padding:"13px 16px" }}>
                      <span style={{ fontSize:13, fontWeight:700, color:e.assets>0?T.sky:th.textLo,
                        fontFamily:"'JetBrains Mono',monospace" }}>{e.assets}</span>
                    </td>
                    <td style={{ padding:"13px 16px", fontSize:12, color:th.textMid, fontFamily:"'JetBrains Mono',monospace", whiteSpace:"nowrap" }}>{e.joined}</td>
                    <td style={{ padding:"13px 16px" }}>
                      <div style={{ display:"flex", gap:4 }}>
                        {[
                          {Ic:Eye,  fn:()=>{setActive(e);setShowView(true);}},
                          {Ic:Edit, fn:()=>{setActive(e);setShowEdit(true);}},
                          {Ic:Trash2,fn:()=>{setActive(e);setShowDel(true);}},
                        ].map(({Ic,fn},j)=>(
                          <button key={j} onClick={fn} style={{ width:28,height:28,borderRadius:6,
                            border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",
                            color:j===2?`${T.rose}88`:th.textMid,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s" }}
                            onMouseEnter={e=>{e.currentTarget.style.borderColor=j===2?T.rose:T.sky;e.currentTarget.style.color=j===2?T.rose:T.sky;}}
                            onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.color=j===2?`${T.rose}88`:th.textMid;}}>
                            <Ic size={12}/>
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"13px 20px", borderTop:`1px solid ${th.border}` }}>
          <span style={{ fontSize:12, color:th.textMid }}>
            Showing <span style={{ fontFamily:"'JetBrains Mono',monospace", color:th.text, fontWeight:600 }}>{filtered.length}</span> of <span style={{ fontFamily:"'JetBrains Mono',monospace", color:th.text, fontWeight:600 }}>{emps.length}</span> employees
          </span>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════  DEPARTMENTS PAGE  */
const SUP_CATEGORIES = ["Electrical Equipment","Transformers","Vehicles","IT & Telecom","Heavy Equipment","Cables & Conductors","Safety Equipment","Office Supplies","Fuel & Energy","Consulting Services"];
const LOC_TYPES      = ["Office","Substation","Warehouse","Depot","Site","Data Center"];
const REGIONS        = ["Greater Accra","Ashanti","Western","Eastern","Central","Volta","Northern","Upper East","Upper West","Bono","Bono East","Ahafo","Oti","Savannah","North East","Western North"];
let _nextDeptId=7, _nextSupId=9, _nextLocId=11;

/* shared helpers */
function SupStatus({status}) {
  const c={Active:{bg:"rgba(16,185,129,0.1)",text:"#10B981"},Inactive:{bg:"rgba(100,116,139,0.1)",text:"#64748B"},Pending:{bg:"rgba(245,158,11,0.1)",text:"#F59E0B"}}[status]||{bg:"rgba(100,116,139,0.1)",text:"#64748B"};
  return <span style={{padding:"3px 10px",borderRadius:20,background:c.bg,color:c.text,fontSize:11,fontWeight:600}}>{status}</span>;
}
function LocTypePill({type}) {
  const c={Office:T.violet,Substation:T.sky,Warehouse:T.amber,Depot:T.emerald,Site:T.rose,"Data Center":T.arc}[type]||T.mid;
  return <span style={{padding:"3px 10px",borderRadius:6,background:`${c}18`,color:c,fontSize:11,fontWeight:700,letterSpacing:0.3}}>{type}</span>;
}

/* ─── DEPARTMENTS ─────────────────────────────────────────────── */
function DeptModal({open,onClose,dept=null,onSave,dark}) {
  const th=useTheme(dark);
  const editing=!!dept;
  const empty={name:"",head:"",budget:"",desc:""};
  const [form,setForm]=useState(empty);
  useEffect(()=>{if(open) setForm(dept?{name:dept.name,head:dept.head,budget:String(dept.budget),desc:dept.desc||""}:empty);},[open,dept]);
  const set=k=>v=>setForm(f=>({...f,[k]:v}));
  const handleSave=()=>{
    if(!form.name.trim()) return;
    const id=editing?dept.id:`DEPT-${String(_nextDeptId++).padStart(2,"0")}`;
    onSave({...dept,...form,id,budget:parseFloat(form.budget)||0,employees:dept?.employees||0,assets:dept?.assets||0,active:dept?.active||0,util:dept?.util||0});
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose} dark={dark} width={540} title={editing?`Edit · ${dept?.id}`:"Add Department"}>
      <div style={{padding:"22px",display:"flex",flexDirection:"column",gap:14}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <FField label="Department Name *"><FInput value={form.name} onChange={set("name")} placeholder="e.g. Grid Operations" dark={dark}/></FField>
          <FField label="Head of Department"><FInput value={form.head} onChange={set("head")} placeholder="e.g. Ing. Kwame Asante" dark={dark}/></FField>
        </div>
        <FField label="Annual Budget (GHS M)"><FInput value={form.budget} onChange={set("budget")} type="number" placeholder="0.0" dark={dark}/></FField>
        <FField label="Description"><FTextarea value={form.desc} onChange={set("desc")} placeholder="Department mandate and responsibilities…" dark={dark}/></FField>
        <div style={{display:"flex",justifyContent:"flex-end",gap:10,paddingTop:14,borderTop:`1px solid ${th.border}`}}>
          <GhostBtn dark={dark} onClick={onClose}>Cancel</GhostBtn>
          <PrimaryBtn icon={editing?CheckCircle:Plus} onClick={handleSave}>{editing?"Save changes":"Add department"}</PrimaryBtn>
        </div>
      </div>
    </Modal>
  );
}

function DepartmentsPage({dark,toast}) {
  const th=useTheme(dark);
  const [rows,setRows]=useState(departmentRows);
  const [search,setSearch]=useState("");
  const [showAdd,setShowAdd]=useState(false);
  const [showEdit,setShowEdit]=useState(false);
  const [showDel,setShowDel]=useState(false);
  const [active,setActive]=useState(null);

  const filtered=rows.filter(d=>d.name.toLowerCase().includes(search.toLowerCase())||d.head.toLowerCase().includes(search.toLowerCase()));

  const handleSave=data=>{
    setRows(r=>{const i=r.findIndex(x=>x.id===data.id);if(i>=0){const n=[...r];n[i]={...n[i],...data};return n;}return [...r,data];});
    toast(showEdit?"Department updated":"Department added","success");
  };

  const totals={employees:rows.reduce((s,d)=>s+d.employees,0),assets:rows.reduce((s,d)=>s+d.assets,0),budget:rows.reduce((s,d)=>s+d.budget,0).toFixed(1)};

  return (
    <div className="page-content" style={{padding:"32px 36px",background:th.bg,minHeight:"100vh"}}>
      <DeptModal open={showAdd} onClose={()=>setShowAdd(false)} dark={dark} onSave={handleSave}/>
      <DeptModal open={showEdit} onClose={()=>setShowEdit(false)} dark={dark} dept={active} onSave={handleSave}/>
      <ConfirmModal open={showDel} onClose={()=>setShowDel(false)} dark={dark} title="Delete department" danger
        body={`Delete ${active?.name}? All associated data will be unlinked.`}
        onConfirm={()=>{setRows(r=>r.filter(x=>x.id!==active?.id));toast("Department deleted","error");}}/>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:28,flexWrap:"wrap",gap:16}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:800,color:th.text,letterSpacing:-0.5}}>Departments</h1>
          <p style={{fontSize:13,color:th.textMid,marginTop:4}}><span style={{fontFamily:"'JetBrains Mono',monospace",color:T.sky}}>{rows.length}</span> departments · {totals.employees.toLocaleString()} staff · ₵{totals.budget}M total budget</p>
        </div>
        <div style={{display:"flex",gap:10}}>
          <ExportBtns dark={dark} title="Departments" subtitle="GRIDCo department overview" filename="GRIDCo_Departments"
            columns={[{label:"ID",key:"id"},{label:"Name",key:"name"},{label:"Head",key:"head"},{label:"Employees",key:"employees"},{label:"Assets",key:"assets"},{label:"Active Assets",key:"active"},{label:"Utilization",get:r=>`${r.util}%`},{label:"Budget (GHS M)",get:r=>`₵${r.budget}M`}]}
            rows={rows}/>
          <PrimaryBtn icon={Plus} onClick={()=>setShowAdd(true)}>Add department</PrimaryBtn>
        </div>
      </div>

      {/* Stats */}
      <div className="rg-4" style={{marginBottom:24}}>
        {[{l:"Departments",v:rows.length,c:T.sky},{l:"Total Staff",v:totals.employees.toLocaleString(),c:T.emerald},{l:"Total Assets",v:rows.reduce((s,d)=>s+d.assets,0).toLocaleString(),c:T.violet},{l:"Total Budget",v:`₵${totals.budget}M`,c:T.amber}].map(s=>(
          <Card key={s.l} dark={dark} style={{padding:"18px 22px"}}>
            <div style={{fontSize:26,fontWeight:800,color:s.c,fontFamily:"'JetBrains Mono',monospace"}}>{s.v}</div>
            <div style={{fontSize:12,color:th.textMid,marginTop:4}}>{s.l}</div>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card dark={dark} style={{padding:"14px 18px",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
        <Search size={14} color={th.textLo}/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by department name or head…"
          style={{border:"none",background:"transparent",color:th.text,fontSize:13,flex:1}}/>
        {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:th.textLo,display:"flex"}}><X size={12}/></button>}
      </Card>

      {/* Cards grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:16}}>
        {filtered.map((d,i)=>(
          <Card key={d.id} dark={dark} style={{padding:"22px",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${T.chart[i%T.chart.length]},${T.chart[i%T.chart.length]}00)`}}/>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div>
                <div style={{fontSize:14,fontWeight:800,color:th.text,marginBottom:3}}>{d.name}</div>
                <div style={{fontSize:11,color:th.textMid,fontFamily:"'JetBrains Mono',monospace"}}>{d.id}</div>
              </div>
              <div style={{display:"flex",gap:4}}>
                <button onClick={()=>{setActive(d);setShowEdit(true);}} style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:th.textMid,display:"flex",alignItems:"center",justifyContent:"center"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=T.sky;e.currentTarget.style.color=T.sky;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.color=th.textMid;}}><Edit size={12}/></button>
                <button onClick={()=>{setActive(d);setShowDel(true);}} style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:`${T.rose}88`,display:"flex",alignItems:"center",justifyContent:"center"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=T.rose;e.currentTarget.style.color=T.rose;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.color=`${T.rose}88`;}}><Trash2 size={12}/></button>
              </div>
            </div>
            <div style={{fontSize:12,color:th.textMid,marginBottom:14,lineHeight:1.5}}>{d.desc}</div>
            <div style={{fontSize:12,color:th.textMid,marginBottom:16}}>
              <span style={{fontWeight:600,color:th.text}}>{d.head}</span> · Head of Department
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
              {[{l:"Staff",v:d.employees},{l:"Assets",v:d.assets.toLocaleString()},{l:"Budget",v:`₵${d.budget}M`}].map(m=>(
                <div key={m.l} style={{background:th.bg1,borderRadius:8,padding:"10px 12px",border:`1px solid ${th.border}`}}>
                  <div style={{fontSize:15,fontWeight:800,color:th.text,fontFamily:"'JetBrains Mono',monospace"}}>{m.v}</div>
                  <div style={{fontSize:10,color:th.textLo,marginTop:2,textTransform:"uppercase",letterSpacing:0.5}}>{m.l}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                <span style={{fontSize:11,color:th.textMid}}>Asset utilization</span>
                <span style={{fontSize:11,fontWeight:700,color:d.util>85?T.emerald:d.util>60?T.sky:T.amber,fontFamily:"'JetBrains Mono',monospace"}}>{d.util}%</span>
              </div>
              <div style={{height:5,background:th.bg2,borderRadius:3,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${d.util}%`,borderRadius:3,background:d.util>85?T.emerald:d.util>60?T.sky:T.amber,transition:"width 0.8s"}}/>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─── SUPPLIERS ────────────────────────────────────────────────── */
function SupplierModal({open,onClose,supplier=null,onSave,dark}) {
  const th=useTheme(dark);
  const editing=!!supplier;
  const empty={name:"",cat:SUP_CATEGORIES[0],contact:"",email:"",phone:"",status:"Active",contract:"",notes:""};
  const [form,setForm]=useState(empty);
  useEffect(()=>{if(open) setForm(supplier?{name:supplier.name,cat:supplier.cat,contact:supplier.contact,email:supplier.email,phone:supplier.phone,status:supplier.status,contract:supplier.contract,notes:supplier.notes||""}:empty);},[open,supplier]);
  const set=k=>v=>setForm(f=>({...f,[k]:v}));
  const handleSave=()=>{
    if(!form.name.trim()) return;
    const id=editing?supplier.id:`SUP-${String(_nextSupId++).padStart(3,"0")}`;
    onSave({...supplier,...form,id,assets:supplier?.assets||0,spend:supplier?.spend||"0"});
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose} dark={dark} width={600} title={editing?`Edit · ${supplier?.id}`:"Add Supplier"}>
      <div style={{padding:"22px",display:"flex",flexDirection:"column",gap:14}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <FField label="Company Name *"><FInput value={form.name} onChange={set("name")} placeholder="e.g. ABB Ghana Ltd" dark={dark}/></FField>
          <FField label="Category *"><FSelect value={form.cat} onChange={set("cat")} options={SUP_CATEGORIES} dark={dark}/></FField>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <FField label="Contact Person"><FInput value={form.contact} onChange={set("contact")} placeholder="Full name" dark={dark}/></FField>
          <FField label="Status"><FSelect value={form.status} onChange={set("status")} options={["Active","Inactive","Pending"]} dark={dark}/></FField>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <FField label="Email"><FInput value={form.email} onChange={set("email")} type="email" placeholder="contact@supplier.com" dark={dark}/></FField>
          <FField label="Phone"><FInput value={form.phone} onChange={set("phone")} placeholder="+233 30 000 0000" dark={dark}/></FField>
        </div>
        <FField label="Contract Expiry Date"><FInput value={form.contract} onChange={set("contract")} type="date" dark={dark}/></FField>
        <FField label="Notes"><FTextarea value={form.notes} onChange={set("notes")} placeholder="Contract details, terms, remarks…" dark={dark}/></FField>
        <div style={{display:"flex",justifyContent:"flex-end",gap:10,paddingTop:14,borderTop:`1px solid ${th.border}`}}>
          <GhostBtn dark={dark} onClick={onClose}>Cancel</GhostBtn>
          <PrimaryBtn icon={editing?CheckCircle:Plus} onClick={handleSave}>{editing?"Save changes":"Add supplier"}</PrimaryBtn>
        </div>
      </div>
    </Modal>
  );
}

function SupplierDetailModal({open,onClose,supplier,dark,onEdit}) {
  const th=useTheme(dark);
  if(!supplier) return null;
  return (
    <Modal open={open} onClose={onClose} dark={dark} width={500} title="Supplier Details">
      <div style={{padding:"22px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <div>
            <div style={{fontSize:16,fontWeight:800,color:th.text,marginBottom:6}}>{supplier.name}</div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <SupStatus status={supplier.status}/>
              <span style={{fontSize:12,color:th.textMid}}>{supplier.cat}</span>
            </div>
          </div>
          <PrimaryBtn icon={Edit} onClick={()=>{onClose();onEdit(supplier);}}>Edit</PrimaryBtn>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",border:`1px solid ${th.border}`,borderRadius:12,overflow:"hidden",marginBottom:16}}>
          {[["Supplier ID",supplier.id],["Contact",supplier.contact],["Email",supplier.email],["Phone",supplier.phone||"—"],["Contract Expiry",supplier.contract||"—"],["Assets Supplied",supplier.assets],["Total Spend",`₵${Number(supplier.spend.replace(/,/g,"")||0).toLocaleString()}`]].map(([k,v],i,arr)=>(
            <div key={k} style={{padding:"11px 14px",borderBottom:i<arr.length-2?`1px solid ${th.border}`:"none",borderRight:i%2===0?`1px solid ${th.border}`:"none",background:i%2===0?(dark?T.d1:"#f8fafc"):"transparent"}}>
              <div style={{fontSize:10,fontWeight:700,color:th.textLo,textTransform:"uppercase",letterSpacing:0.6,marginBottom:3}}>{k}</div>
              <div style={{fontSize:13,fontWeight:600,color:k==="Supplier ID"?T.sky:th.text,fontFamily:k==="Supplier ID"?"'JetBrains Mono',monospace":"inherit"}}>{v}</div>
            </div>
          ))}
        </div>
        {supplier.notes&&<div style={{padding:"11px 14px",background:dark?T.d1:T.l1,borderRadius:10,border:`1px solid ${th.border}`,marginBottom:16}}>
          <div style={{fontSize:10,fontWeight:700,color:th.textLo,textTransform:"uppercase",letterSpacing:0.6,marginBottom:4}}>Notes</div>
          <div style={{fontSize:13,color:th.textMid,lineHeight:1.6}}>{supplier.notes}</div>
        </div>}
        <div style={{display:"flex",justifyContent:"flex-end"}}><GhostBtn dark={dark} onClick={onClose}>Close</GhostBtn></div>
      </div>
    </Modal>
  );
}

function SuppliersPage({dark,toast}) {
  const th=useTheme(dark);
  const [rows,setRows]=useState(supplierRows);
  const [search,setSearch]=useState("");
  const [catFilter,setCatFilter]=useState("All");
  const [statusFilter,setStatusFilter]=useState("All");
  const [showAdd,setShowAdd]=useState(false);
  const [showEdit,setShowEdit]=useState(false);
  const [showView,setShowView]=useState(false);
  const [showDel,setShowDel]=useState(false);
  const [active,setActive]=useState(null);
  const [sort,setSort]=useState({col:"name",dir:"asc"});

  const filtered=rows
    .filter(s=>(catFilter==="All"||s.cat===catFilter)&&(statusFilter==="All"||s.status===statusFilter)&&(s.name.toLowerCase().includes(search.toLowerCase())||s.id.toLowerCase().includes(search.toLowerCase())||s.contact.toLowerCase().includes(search.toLowerCase())))
    .sort((a,b)=>sort.dir==="asc"?String(a[sort.col]).localeCompare(String(b[sort.col])):String(b[sort.col]).localeCompare(String(a[sort.col])));

  const handleSave=data=>{
    setRows(r=>{const i=r.findIndex(x=>x.id===data.id);if(i>=0){const n=[...r];n[i]={...n[i],...data};return n;}return [...r,data];});
    toast(showEdit?"Supplier updated":"Supplier added","success");
  };

  const colHdr=(label,col)=>(
    <th onClick={()=>setSort(s=>({col,dir:s.col===col&&s.dir==="asc"?"desc":"asc"}))}
      style={{padding:"11px 16px",textAlign:"left",fontSize:10,fontWeight:700,color:sort.col===col?T.sky:th.textLo,textTransform:"uppercase",letterSpacing:0.8,borderBottom:`1px solid ${th.border}`,whiteSpace:"nowrap",cursor:"pointer",userSelect:"none"}}>
      {label}{sort.col===col&&(sort.dir==="asc"?<ArrowUp size={10} style={{marginLeft:3}}/>:<ArrowDown size={10} style={{marginLeft:3}}/>)}
    </th>
  );

  const totalSpend=rows.reduce((s,r)=>s+Number((r.spend||"0").replace(/,/g,"")),0);

  return (
    <div className="page-content" style={{padding:"32px 36px",background:th.bg,minHeight:"100vh"}}>
      <SupplierModal open={showAdd} onClose={()=>setShowAdd(false)} dark={dark} onSave={handleSave}/>
      <SupplierModal open={showEdit} onClose={()=>setShowEdit(false)} dark={dark} supplier={active} onSave={handleSave}/>
      <SupplierDetailModal open={showView} onClose={()=>setShowView(false)} dark={dark} supplier={active} onEdit={s=>{setActive(s);setShowEdit(true);}}/>
      <ConfirmModal open={showDel} onClose={()=>setShowDel(false)} dark={dark} title="Remove supplier" danger
        body={`Remove ${active?.name} from the supplier list? This cannot be undone.`}
        onConfirm={()=>{setRows(r=>r.filter(x=>x.id!==active?.id));toast("Supplier removed","error");}}/>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:28,flexWrap:"wrap",gap:16}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:800,color:th.text,letterSpacing:-0.5}}>Suppliers</h1>
          <p style={{fontSize:13,color:th.textMid,marginTop:4}}><span style={{fontFamily:"'JetBrains Mono',monospace",color:T.sky}}>{rows.length}</span> suppliers · ₵{(totalSpend/1000000).toFixed(1)}M total spend</p>
        </div>
        <div style={{display:"flex",gap:10}}>
          <ExportBtns dark={dark} title="Suppliers" subtitle="GRIDCo vendor and supplier register" filename="GRIDCo_Suppliers"
            columns={[{label:"ID",key:"id"},{label:"Name",key:"name"},{label:"Category",key:"cat"},{label:"Contact",key:"contact"},{label:"Email",key:"email"},{label:"Phone",key:"phone"},{label:"Status",key:"status"},{label:"Assets",key:"assets"},{label:"Contract Expiry",key:"contract"},{label:"Spend (GHS)",key:"spend"}]}
            rows={rows}/>
          <PrimaryBtn icon={Plus} onClick={()=>setShowAdd(true)}>Add supplier</PrimaryBtn>
        </div>
      </div>

      <div className="rg-4" style={{marginBottom:24}}>
        {[{l:"Total Suppliers",v:rows.length,c:T.sky},{l:"Active",v:rows.filter(r=>r.status==="Active").length,c:T.emerald},{l:"Total Assets Supplied",v:rows.reduce((s,r)=>s+r.assets,0).toLocaleString(),c:T.violet},{l:"Total Spend",v:`₵${(totalSpend/1000000).toFixed(1)}M`,c:T.amber}].map(s=>(
          <Card key={s.l} dark={dark} style={{padding:"18px 22px"}}>
            <div style={{fontSize:26,fontWeight:800,color:s.c,fontFamily:"'JetBrains Mono',monospace"}}>{s.v}</div>
            <div style={{fontSize:12,color:th.textMid,marginTop:4}}>{s.l}</div>
          </Card>
        ))}
      </div>

      <Card dark={dark} style={{padding:"14px 18px",marginBottom:18,display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,background:th.bg1,border:`1px solid ${th.border}`,borderRadius:9,padding:"8px 14px",flex:"1 1 200px",maxWidth:300}}>
          <Search size={14} color={th.textLo}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search suppliers…" style={{border:"none",background:"transparent",color:th.text,fontSize:13,flex:1}}/>
          {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:th.textLo,display:"flex"}}><X size={12}/></button>}
        </div>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          {["All",...SUP_CATEGORIES.slice(0,5)].map(c=>(
            <button key={c} onClick={()=>setCatFilter(c)} style={{padding:"6px 11px",borderRadius:7,fontSize:11,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",border:`1px solid ${catFilter===c?T.sky:th.border}`,background:catFilter===c?`${T.sky}14`:"transparent",color:catFilter===c?T.sky:th.textMid,transition:"all 0.12s"}}>{c==="All"?"All Types":c}</button>
          ))}
        </div>
        <div style={{display:"flex",gap:4,marginLeft:"auto"}}>
          {["All","Active","Inactive","Pending"].map(s=>(
            <button key={s} onClick={()=>setStatusFilter(s)} style={{padding:"6px 11px",borderRadius:7,fontSize:11,fontWeight:600,cursor:"pointer",border:`1px solid ${statusFilter===s?T.sky:th.border}`,background:statusFilter===s?`${T.sky}14`:"transparent",color:statusFilter===s?T.sky:th.textMid,transition:"all 0.12s"}}>{s}</button>
          ))}
        </div>
      </Card>

      <Card dark={dark} style={{overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:dark?T.d3:T.l1}}>
                {colHdr("Supplier ID","id")}{colHdr("Company","name")}{colHdr("Category","cat")}
                <th style={{padding:"11px 16px",textAlign:"left",fontSize:10,fontWeight:700,color:th.textLo,textTransform:"uppercase",letterSpacing:0.8,borderBottom:`1px solid ${th.border}`}}>Contact</th>
                {colHdr("Status","status")}{colHdr("Assets","assets")}{colHdr("Contract Expiry","contract")}
                <th style={{padding:"11px 16px",textAlign:"left",fontSize:10,fontWeight:700,color:th.textLo,textTransform:"uppercase",letterSpacing:0.8,borderBottom:`1px solid ${th.border}`}}>Total Spend</th>
                <th style={{padding:"11px 16px",borderBottom:`1px solid ${th.border}`}}/>
              </tr>
            </thead>
            <tbody>
              {filtered.length===0?<tr><td colSpan={9} style={{padding:"48px",textAlign:"center",color:th.textMid,fontSize:13}}>No suppliers match your search.</td></tr>
              :filtered.map((s,i)=>(
                <tr key={s.id} className="row-hover" style={{borderBottom:`1px solid ${th.borderLo}`,cursor:"pointer"}}>
                  <td style={{padding:"13px 16px"}}><span style={{fontSize:12,fontWeight:700,color:T.sky,fontFamily:"'JetBrains Mono',monospace"}}>{s.id}</span></td>
                  <td style={{padding:"13px 16px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:32,height:32,borderRadius:8,background:`${T.chart[i%T.chart.length]}22`,border:`1px solid ${T.chart[i%T.chart.length]}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:T.chart[i%T.chart.length],flexShrink:0}}>
                        {s.name.charAt(0)}
                      </div>
                      <div><div style={{fontSize:13,fontWeight:600,color:th.text}}>{s.name}</div></div>
                    </div>
                  </td>
                  <td style={{padding:"13px 16px",fontSize:12,color:th.textMid,whiteSpace:"nowrap"}}>{s.cat}</td>
                  <td style={{padding:"13px 16px"}}>
                    <div style={{fontSize:12,fontWeight:500,color:th.text}}>{s.contact}</div>
                    <div style={{fontSize:11,color:th.textMid,marginTop:1}}>{s.email}</div>
                  </td>
                  <td style={{padding:"13px 16px"}}><SupStatus status={s.status}/></td>
                  <td style={{padding:"13px 16px",fontSize:13,fontWeight:700,color:s.assets>0?T.sky:th.textLo,fontFamily:"'JetBrains Mono',monospace"}}>{s.assets}</td>
                  <td style={{padding:"13px 16px",fontSize:12,color:th.textMid,fontFamily:"'JetBrains Mono',monospace",whiteSpace:"nowrap"}}>{s.contract||"—"}</td>
                  <td style={{padding:"13px 16px",fontSize:12,fontWeight:600,color:th.text,fontFamily:"'JetBrains Mono',monospace"}}>₵{Number((s.spend||"0").replace(/,/g,"")).toLocaleString()}</td>
                  <td style={{padding:"13px 16px"}}>
                    <div style={{display:"flex",gap:4}}>
                      {[{Ic:Eye,fn:()=>{setActive(s);setShowView(true);}},{Ic:Edit,fn:()=>{setActive(s);setShowEdit(true);}},{Ic:Trash2,fn:()=>{setActive(s);setShowDel(true);}}].map(({Ic,fn},j)=>(
                        <button key={j} onClick={fn} style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:j===2?`${T.rose}88`:th.textMid,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor=j===2?T.rose:T.sky;e.currentTarget.style.color=j===2?T.rose:T.sky;}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.color=j===2?`${T.rose}88`:th.textMid;}}><Ic size={12}/></button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 20px",borderTop:`1px solid ${th.border}`}}>
          <span style={{fontSize:12,color:th.textMid}}>Showing <span style={{fontFamily:"'JetBrains Mono',monospace",color:th.text,fontWeight:600}}>{filtered.length}</span> of <span style={{fontFamily:"'JetBrains Mono',monospace",color:th.text,fontWeight:600}}>{rows.length}</span> suppliers</span>
        </div>
      </Card>
    </div>
  );
}

/* ─── LOCATIONS ────────────────────────────────────────────────── */
function LocationModal({open,onClose,location=null,onSave,dark}) {
  const th=useTheme(dark);
  const editing=!!location;
  const empty={name:"",type:LOC_TYPES[0],region:REGIONS[0],address:"",manager:"Unassigned",status:"Active"};
  const [form,setForm]=useState(empty);
  useEffect(()=>{if(open) setForm(location?{name:location.name,type:location.type,region:location.region,address:location.address,manager:location.manager,status:location.status}:empty);},[open,location]);
  const set=k=>v=>setForm(f=>({...f,[k]:v}));
  const handleSave=()=>{
    if(!form.name.trim()) return;
    const id=editing?location.id:`LOC-${String(_nextLocId++).padStart(3,"0")}`;
    onSave({...location,...form,id,assets:location?.assets||0});
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose} dark={dark} width={560} title={editing?`Edit · ${location?.id}`:"Add Location"}>
      <div style={{padding:"22px",display:"flex",flexDirection:"column",gap:14}}>
        <FField label="Location Name *"><FInput value={form.name} onChange={set("name")} placeholder="e.g. Substation Achimota" dark={dark}/></FField>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <FField label="Type *"><FSelect value={form.type} onChange={set("type")} options={LOC_TYPES} dark={dark}/></FField>
          <FField label="Region *"><FSelect value={form.region} onChange={set("region")} options={REGIONS} dark={dark}/></FField>
        </div>
        <FField label="Address"><FInput value={form.address} onChange={set("address")} placeholder="Full address" dark={dark}/></FField>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <FField label="Site Manager"><FSelect value={form.manager} onChange={set("manager")} options={["Unassigned",...EMPLOYEES.filter(e=>e!=="Unassigned")]} dark={dark}/></FField>
          <FField label="Status"><FSelect value={form.status} onChange={set("status")} options={["Active","Inactive","Under Construction"]} dark={dark}/></FField>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",gap:10,paddingTop:14,borderTop:`1px solid ${th.border}`}}>
          <GhostBtn dark={dark} onClick={onClose}>Cancel</GhostBtn>
          <PrimaryBtn icon={editing?CheckCircle:Plus} onClick={handleSave}>{editing?"Save changes":"Add location"}</PrimaryBtn>
        </div>
      </div>
    </Modal>
  );
}

function LocationsPage({dark,toast}) {
  const th=useTheme(dark);
  const [rows,setRows]=useState(locationRows);
  const [search,setSearch]=useState("");
  const [typeFilter,setTypeFilter]=useState("All");
  const [regionFilter,setRegionFilter]=useState("All");
  const [showAdd,setShowAdd]=useState(false);
  const [showEdit,setShowEdit]=useState(false);
  const [showDel,setShowDel]=useState(false);
  const [active,setActive]=useState(null);
  const [sort,setSort]=useState({col:"name",dir:"asc"});

  const filtered=rows
    .filter(l=>(typeFilter==="All"||l.type===typeFilter)&&(regionFilter==="All"||l.region===regionFilter)&&(l.name.toLowerCase().includes(search.toLowerCase())||l.id.toLowerCase().includes(search.toLowerCase())||l.region.toLowerCase().includes(search.toLowerCase())))
    .sort((a,b)=>sort.dir==="asc"?String(a[sort.col]).localeCompare(String(b[sort.col])):String(b[sort.col]).localeCompare(String(a[sort.col])));

  const handleSave=data=>{
    setRows(r=>{const i=r.findIndex(x=>x.id===data.id);if(i>=0){const n=[...r];n[i]={...n[i],...data};return n;}return [...r,data];});
    toast(showEdit?"Location updated":"Location added","success");
  };

  const colHdr=(label,col)=>(
    <th onClick={()=>setSort(s=>({col,dir:s.col===col&&s.dir==="asc"?"desc":"asc"}))}
      style={{padding:"11px 16px",textAlign:"left",fontSize:10,fontWeight:700,color:sort.col===col?T.sky:th.textLo,textTransform:"uppercase",letterSpacing:0.8,borderBottom:`1px solid ${th.border}`,whiteSpace:"nowrap",cursor:"pointer",userSelect:"none"}}>
      {label}{sort.col===col&&(sort.dir==="asc"?<ArrowUp size={10} style={{marginLeft:3}}/>:<ArrowDown size={10} style={{marginLeft:3}}/>)}
    </th>
  );

  const uniqueRegions=[...new Set(rows.map(l=>l.region))];

  return (
    <div className="page-content" style={{padding:"32px 36px",background:th.bg,minHeight:"100vh"}}>
      <LocationModal open={showAdd} onClose={()=>setShowAdd(false)} dark={dark} onSave={handleSave}/>
      <LocationModal open={showEdit} onClose={()=>setShowEdit(false)} dark={dark} location={active} onSave={handleSave}/>
      <ConfirmModal open={showDel} onClose={()=>setShowDel(false)} dark={dark} title="Remove location" danger
        body={`Remove ${active?.name}? All assets at this location will be unlinked.`}
        onConfirm={()=>{setRows(r=>r.filter(x=>x.id!==active?.id));toast("Location removed","error");}}/>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:28,flexWrap:"wrap",gap:16}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:800,color:th.text,letterSpacing:-0.5}}>Locations</h1>
          <p style={{fontSize:13,color:th.textMid,marginTop:4}}><span style={{fontFamily:"'JetBrains Mono',monospace",color:T.sky}}>{rows.length}</span> sites across <span style={{fontFamily:"'JetBrains Mono',monospace",color:T.sky}}>{uniqueRegions.length}</span> regions</p>
        </div>
        <div style={{display:"flex",gap:10}}>
          <ExportBtns dark={dark} title="Locations" subtitle="GRIDCo operational sites and substations" filename="GRIDCo_Locations"
            columns={[{label:"ID",key:"id"},{label:"Name",key:"name"},{label:"Type",key:"type"},{label:"Region",key:"region"},{label:"Address",key:"address"},{label:"Manager",key:"manager"},{label:"Assets",key:"assets"},{label:"Status",key:"status"}]}
            rows={rows}/>
          <PrimaryBtn icon={Plus} onClick={()=>setShowAdd(true)}>Add location</PrimaryBtn>
        </div>
      </div>

      <div className="rg-4" style={{marginBottom:24}}>
        {[{l:"Total Sites",v:rows.length,c:T.sky},{l:"Active",v:rows.filter(r=>r.status==="Active").length,c:T.emerald},{l:"Total Assets",v:rows.reduce((s,r)=>s+r.assets,0).toLocaleString(),c:T.violet},{l:"Regions Covered",v:uniqueRegions.length,c:T.amber}].map(s=>(
          <Card key={s.l} dark={dark} style={{padding:"18px 22px"}}>
            <div style={{fontSize:26,fontWeight:800,color:s.c,fontFamily:"'JetBrains Mono',monospace"}}>{s.v}</div>
            <div style={{fontSize:12,color:th.textMid,marginTop:4}}>{s.l}</div>
          </Card>
        ))}
      </div>

      <Card dark={dark} style={{padding:"14px 18px",marginBottom:18,display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,background:th.bg1,border:`1px solid ${th.border}`,borderRadius:9,padding:"8px 14px",flex:"1 1 200px",maxWidth:280}}>
          <Search size={14} color={th.textLo}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search locations…" style={{border:"none",background:"transparent",color:th.text,fontSize:13,flex:1}}/>
          {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:th.textLo,display:"flex"}}><X size={12}/></button>}
        </div>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          {["All",...LOC_TYPES].map(t=>(
            <button key={t} onClick={()=>setTypeFilter(t)} style={{padding:"6px 11px",borderRadius:7,fontSize:11,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",border:`1px solid ${typeFilter===t?T.sky:th.border}`,background:typeFilter===t?`${T.sky}14`:"transparent",color:typeFilter===t?T.sky:th.textMid,transition:"all 0.12s"}}>{t==="All"?"All Types":t}</button>
          ))}
        </div>
        <div style={{display:"flex",gap:4,marginLeft:"auto",flexWrap:"wrap"}}>
          {["All",...uniqueRegions].map(r=>(
            <button key={r} onClick={()=>setRegionFilter(r)} style={{padding:"6px 11px",borderRadius:7,fontSize:11,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",border:`1px solid ${regionFilter===r?T.violet:th.border}`,background:regionFilter===r?`${T.violet}14`:"transparent",color:regionFilter===r?T.violet:th.textMid,transition:"all 0.12s"}}>{r==="All"?"All Regions":r}</button>
          ))}
        </div>
      </Card>

      <Card dark={dark} style={{overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:dark?T.d3:T.l1}}>
                {colHdr("Location ID","id")}{colHdr("Name","name")}{colHdr("Type","type")}{colHdr("Region","region")}
                <th style={{padding:"11px 16px",textAlign:"left",fontSize:10,fontWeight:700,color:th.textLo,textTransform:"uppercase",letterSpacing:0.8,borderBottom:`1px solid ${th.border}`}}>Address</th>
                {colHdr("Manager","manager")}{colHdr("Assets","assets")}
                <th style={{padding:"11px 16px",textAlign:"left",fontSize:10,fontWeight:700,color:th.textLo,textTransform:"uppercase",letterSpacing:0.8,borderBottom:`1px solid ${th.border}`}}>Status</th>
                <th style={{padding:"11px 16px",borderBottom:`1px solid ${th.border}`}}/>
              </tr>
            </thead>
            <tbody>
              {filtered.length===0?<tr><td colSpan={9} style={{padding:"48px",textAlign:"center",color:th.textMid,fontSize:13}}>No locations match your search.</td></tr>
              :filtered.map(l=>(
                <tr key={l.id} className="row-hover" style={{borderBottom:`1px solid ${th.borderLo}`,cursor:"pointer"}}>
                  <td style={{padding:"13px 16px"}}><span style={{fontSize:12,fontWeight:700,color:T.sky,fontFamily:"'JetBrains Mono',monospace"}}>{l.id}</span></td>
                  <td style={{padding:"13px 16px",fontSize:13,fontWeight:600,color:th.text,whiteSpace:"nowrap"}}>{l.name}</td>
                  <td style={{padding:"13px 16px"}}><LocTypePill type={l.type}/></td>
                  <td style={{padding:"13px 16px",fontSize:12,color:th.textMid,whiteSpace:"nowrap"}}>{l.region}</td>
                  <td style={{padding:"13px 16px",fontSize:12,color:th.textMid,maxWidth:200}}>{l.address}</td>
                  <td style={{padding:"13px 16px",fontSize:12,color:th.textMid,whiteSpace:"nowrap"}}>{l.manager}</td>
                  <td style={{padding:"13px 16px",fontSize:13,fontWeight:700,color:l.assets>0?T.sky:th.textLo,fontFamily:"'JetBrains Mono',monospace"}}>{l.assets}</td>
                  <td style={{padding:"13px 16px"}}>
                    <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:l.status==="Active"?"rgba(16,185,129,0.1)":l.status==="Inactive"?"rgba(100,116,139,0.1)":"rgba(245,158,11,0.1)",color:l.status==="Active"?T.emerald:l.status==="Inactive"?"#64748B":T.amber}}>{l.status}</span>
                  </td>
                  <td style={{padding:"13px 16px"}}>
                    <div style={{display:"flex",gap:4}}>
                      {[{Ic:Edit,fn:()=>{setActive(l);setShowEdit(true);}},{Ic:Trash2,fn:()=>{setActive(l);setShowDel(true);}}].map(({Ic,fn},j)=>(
                        <button key={j} onClick={fn} style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:j===1?`${T.rose}88`:th.textMid,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor=j===1?T.rose:T.sky;e.currentTarget.style.color=j===1?T.rose:T.sky;}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.color=j===1?`${T.rose}88`:th.textMid;}}><Ic size={12}/></button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 20px",borderTop:`1px solid ${th.border}`}}>
          <span style={{fontSize:12,color:th.textMid}}>Showing <span style={{fontFamily:"'JetBrains Mono',monospace",color:th.text,fontWeight:600}}>{filtered.length}</span> of <span style={{fontFamily:"'JetBrains Mono',monospace",color:th.text,fontWeight:600}}>{rows.length}</span> locations</span>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════  ASSIGNMENTS PAGE  */
const ASN_STATUSES = ["Active","Returned","Pending"];

function AsnStatusPill({status}) {
  const c={Active:{bg:"rgba(16,185,129,0.1)",text:"#10B981",dot:T.emerald},Returned:{bg:"rgba(100,116,139,0.1)",text:"#64748B",dot:"#64748B"},Pending:{bg:"rgba(245,158,11,0.1)",text:"#F59E0B",dot:T.amber}}[status]||{bg:"rgba(100,116,139,0.1)",text:"#64748B",dot:"#64748B"};
  return <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:20,background:c.bg,color:c.text,fontSize:11,fontWeight:600}}>
    <span style={{width:5,height:5,borderRadius:"50%",background:c.dot}}/>{status}
  </span>;
}

function AssignmentModal({open,onClose,assignment=null,onSave,dark}) {
  const th=useTheme(dark);
  const editing=!!assignment;
  const empty={assetId:assetRows[0]?.id||"",assignee:EMPLOYEES[0],dept:DEPARTMENTS[0],from:"",to:"",status:"Active",notes:""};
  const [form,setForm]=useState(empty);
  useEffect(()=>{
    if(open) setForm(assignment?{assetId:assignment.assetId,assignee:assignment.assignee,dept:assignment.dept,from:assignment.from||"",to:assignment.to||"",status:assignment.status,notes:assignment.notes||""}:empty);
  },[open,assignment]);
  const set=k=>v=>setForm(f=>({...f,[k]:v}));
  const assetOpts=assetRows.map(a=>`${a.id} — ${a.name}`);
  const handleSave=()=>{
    if(!form.from) return;
    const id=editing?assignment.id:`ASN-${String(_nextAsnId++).padStart(3,"0")}`;
    const selAsset=assetRows.find(a=>a.id===form.assetId)||assetRows[0];
    onSave({...assignment,...form,id,asset:selAsset.name,cat:selAsset.cat});
    onClose();
  };
  const selAsset=assetRows.find(a=>a.id===form.assetId)||assetRows[0];
  return (
    <Modal open={open} onClose={onClose} dark={dark} width={560} title={editing?`Edit · ${assignment?.id}`:"New Assignment"}>
      <div style={{padding:"22px",display:"flex",flexDirection:"column",gap:14}}>
        <FField label="Asset *">
          <FSelect value={assetOpts.find(o=>o.startsWith(form.assetId))||assetOpts[0]}
            onChange={v=>{const id=v.split(" — ")[0];set("assetId")(id);}}
            options={assetOpts} dark={dark}/>
          {selAsset&&<div style={{marginTop:5,fontSize:11,color:T.sky,fontFamily:"'JetBrains Mono',monospace"}}>{selAsset.cat} · {selAsset.dept}</div>}
        </FField>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <FField label="Assign to *"><FSelect value={form.assignee} onChange={set("assignee")} options={EMPLOYEES.filter(e=>e!=="Unassigned")} dark={dark}/></FField>
          <FField label="Department *"><FSelect value={form.dept} onChange={set("dept")} options={DEPARTMENTS} dark={dark}/></FField>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <FField label="Date Assigned *"><FInput value={form.from} onChange={set("from")} type="date" dark={dark}/></FField>
          <FField label="Expected Return (optional)"><FInput value={form.to} onChange={set("to")} type="date" dark={dark}/></FField>
        </div>
        <FField label="Status"><FSelect value={form.status} onChange={set("status")} options={ASN_STATUSES} dark={dark}/></FField>
        <FField label="Notes"><FTextarea value={form.notes} onChange={set("notes")} placeholder="Reason for assignment, handover conditions…" dark={dark}/></FField>
        <div style={{display:"flex",justifyContent:"flex-end",gap:10,paddingTop:14,borderTop:`1px solid ${th.border}`}}>
          <GhostBtn dark={dark} onClick={onClose}>Cancel</GhostBtn>
          <PrimaryBtn icon={editing?CheckCircle:ArrowLeftRight} onClick={handleSave}>{editing?"Save changes":"Create assignment"}</PrimaryBtn>
        </div>
      </div>
    </Modal>
  );
}

function AssignmentsPage({dark,toast}) {
  const th=useTheme(dark);
  const [rows,setRows]=useState(assignmentRows);
  const [search,setSearch]=useState("");
  const [statusFilter,setStatusFilter]=useState("All");
  const [showAdd,setShowAdd]=useState(false);
  const [showEdit,setShowEdit]=useState(false);
  const [showReturn,setShowReturn]=useState(false);
  const [showDel,setShowDel]=useState(false);
  const [active,setActive]=useState(null);
  const [sort,setSort]=useState({col:"from",dir:"desc"});

  const filtered=rows
    .filter(r=>(statusFilter==="All"||r.status===statusFilter)&&
      (r.asset+r.assignee+r.dept+r.id).toLowerCase().includes(search.toLowerCase()))
    .sort((a,b)=>{
      const va=a[sort.col]||"",vb=b[sort.col]||"";
      return sort.dir==="asc"?String(va).localeCompare(String(vb)):String(vb).localeCompare(String(va));
    });

  const handleSave=data=>{
    setRows(r=>{const i=r.findIndex(x=>x.id===data.id);if(i>=0){const n=[...r];n[i]={...n[i],...data};return n;}return[...r,data];});
    toast(showEdit?"Assignment updated":"Assignment created","success");
  };

  const colHdr=(label,col)=>(
    <th onClick={()=>setSort(s=>({col,dir:s.col===col&&s.dir==="asc"?"desc":"asc"}))}
      style={{padding:"11px 16px",textAlign:"left",fontSize:10,fontWeight:700,color:sort.col===col?T.sky:th.textLo,
        textTransform:"uppercase",letterSpacing:0.8,borderBottom:`1px solid ${th.border}`,whiteSpace:"nowrap",cursor:"pointer",userSelect:"none"}}>
      {label}{sort.col===col&&(sort.dir==="asc"?<ArrowUp size={10} style={{marginLeft:3}}/>:<ArrowDown size={10} style={{marginLeft:3}}/>)}
    </th>
  );

  const activeCount=rows.filter(r=>r.status==="Active").length;
  const returnedCount=rows.filter(r=>r.status==="Returned").length;
  const pendingCount=rows.filter(r=>r.status==="Pending").length;
  const withReturn=rows.filter(r=>r.status==="Active"&&r.to).length;

  return (
    <div className="page-content" style={{padding:"32px 36px",background:th.bg,minHeight:"100vh"}}>
      <AssignmentModal open={showAdd} onClose={()=>setShowAdd(false)} dark={dark} onSave={handleSave}/>
      <AssignmentModal open={showEdit} onClose={()=>setShowEdit(false)} dark={dark} assignment={active} onSave={handleSave}/>
      <ConfirmModal open={showReturn} onClose={()=>setShowReturn(false)} dark={dark} title="Mark as returned"
        body={`Mark assignment ${active?.id} as returned? Asset "${active?.asset}" will be unlinked from ${active?.assignee}.`}
        onConfirm={()=>{setRows(r=>r.map(x=>x.id===active?.id?{...x,status:"Returned",to:new Date().toISOString().slice(0,10)}:x));toast("Asset marked as returned","success");}}/>
      <ConfirmModal open={showDel} onClose={()=>setShowDel(false)} dark={dark} title="Delete assignment record" danger
        body={`Permanently delete assignment ${active?.id}? This cannot be undone.`}
        onConfirm={()=>{setRows(r=>r.filter(x=>x.id!==active?.id));toast("Assignment deleted","error");}}/>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:28,flexWrap:"wrap",gap:16}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:800,color:th.text,letterSpacing:-0.5}}>Assignments</h1>
          <p style={{fontSize:13,color:th.textMid,marginTop:4}}>
            <span style={{fontFamily:"'JetBrains Mono',monospace",color:T.sky}}>{rows.length}</span> records ·{" "}
            <span style={{fontFamily:"'JetBrains Mono',monospace",color:T.emerald}}>{activeCount}</span> active ·{" "}
            <span style={{fontFamily:"'JetBrains Mono',monospace",color:T.amber}}>{withReturn}</span> with scheduled return
          </p>
        </div>
        <div style={{display:"flex",gap:10}}>
          <ExportBtns dark={dark} title="Asset Assignments" subtitle="Asset assignment and custody records" filename="GRIDCo_Assignments"
            columns={[{label:"ID",key:"id"},{label:"Asset ID",key:"assetId"},{label:"Asset",key:"asset"},{label:"Category",key:"cat"},{label:"Assigned To",key:"assignee"},{label:"Department",key:"dept"},{label:"Date Assigned",key:"from"},{label:"Return Date",get:r=>r.to||"—"},{label:"Status",key:"status"},{label:"Notes",key:"notes"}]}
            rows={rows}/>
          <PrimaryBtn icon={ArrowLeftRight} onClick={()=>setShowAdd(true)}>New assignment</PrimaryBtn>
        </div>
      </div>

      {/* Stats */}
      <div className="rg-4" style={{marginBottom:24}}>
        {[
          {l:"Total Records",    v:rows.length,    c:T.sky,     sub:"all time"},
          {l:"Active",           v:activeCount,    c:T.emerald, sub:"currently assigned"},
          {l:"Returned",         v:returnedCount,  c:"#64748B", sub:"completed"},
          {l:"Pending",          v:pendingCount,   c:T.amber,   sub:"awaiting effective date"},
        ].map(s=>(
          <Card key={s.l} dark={dark} style={{padding:"18px 22px"}}>
            <div style={{fontSize:26,fontWeight:800,color:s.c,fontFamily:"'JetBrains Mono',monospace"}}>{s.v}</div>
            <div style={{fontSize:12,color:th.textMid,marginTop:3}}>{s.l}</div>
            <div style={{fontSize:10,color:th.textLo,marginTop:2}}>{s.sub}</div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card dark={dark} style={{padding:"14px 18px",marginBottom:18,display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,background:th.bg1,border:`1px solid ${th.border}`,borderRadius:9,padding:"8px 14px",flex:"1 1 200px",maxWidth:320}}>
          <Search size={14} color={th.textLo}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search asset, assignee, department…"
            style={{border:"none",background:"transparent",color:th.text,fontSize:13,flex:1}}/>
          {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:th.textLo,display:"flex"}}><X size={12}/></button>}
        </div>
        <div style={{display:"flex",gap:4}}>
          {["All","Active","Pending","Returned"].map(s=>(
            <button key={s} onClick={()=>setStatusFilter(s)}
              style={{padding:"6px 12px",borderRadius:7,fontSize:11,fontWeight:600,cursor:"pointer",
                border:`1px solid ${statusFilter===s?T.sky:th.border}`,
                background:statusFilter===s?`${T.sky}14`:"transparent",
                color:statusFilter===s?T.sky:th.textMid,transition:"all 0.12s"}}>{s}</button>
          ))}
        </div>
        <span style={{marginLeft:"auto",fontSize:12,color:th.textMid}}>
          <span style={{fontFamily:"'JetBrains Mono',monospace",color:th.text,fontWeight:600}}>{filtered.length}</span> shown
        </span>
      </Card>

      {/* Table */}
      <Card dark={dark} style={{overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:dark?T.d3:T.l1}}>
                {colHdr("ID","id")}
                <th style={{padding:"11px 16px",textAlign:"left",fontSize:10,fontWeight:700,color:th.textLo,textTransform:"uppercase",letterSpacing:0.8,borderBottom:`1px solid ${th.border}`}}>Asset</th>
                {colHdr("Assigned To","assignee")}
                {colHdr("Department","dept")}
                {colHdr("Date Assigned","from")}
                {colHdr("Return Date","to")}
                {colHdr("Status","status")}
                <th style={{padding:"11px 16px",borderBottom:`1px solid ${th.border}`}}/>
              </tr>
            </thead>
            <tbody>
              {filtered.length===0
                ?<tr><td colSpan={8} style={{padding:"56px",textAlign:"center",color:th.textMid,fontSize:13}}>No assignments match your search.</td></tr>
                :filtered.map((r,i)=>{
                  const isActive=r.status==="Active";
                  return (
                    <tr key={r.id} className="row-hover" style={{borderBottom:`1px solid ${th.borderLo}`}}>
                      <td style={{padding:"13px 16px"}}>
                        <span style={{fontSize:12,fontWeight:700,color:T.sky,fontFamily:"'JetBrains Mono',monospace"}}>{r.id}</span>
                      </td>
                      <td style={{padding:"13px 16px"}}>
                        <div style={{fontSize:13,fontWeight:600,color:th.text,maxWidth:220}}>{r.asset}</div>
                        <div style={{fontSize:11,color:th.textMid,marginTop:1}}>{r.cat}</div>
                      </td>
                      <td style={{padding:"13px 16px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <div style={{width:28,height:28,borderRadius:7,background:`${T.sky}18`,border:`1px solid ${T.sky}30`,
                            display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:T.sky,flexShrink:0}}>
                            {r.assignee.split(" ").map(w=>w[0]).join("").slice(0,2)}
                          </div>
                          <span style={{fontSize:13,fontWeight:500,color:th.text,whiteSpace:"nowrap"}}>{r.assignee}</span>
                        </div>
                      </td>
                      <td style={{padding:"13px 16px",fontSize:12,color:th.textMid,whiteSpace:"nowrap"}}>{r.dept}</td>
                      <td style={{padding:"13px 16px",fontSize:12,color:th.textMid,fontFamily:"'JetBrains Mono',monospace",whiteSpace:"nowrap"}}>{r.from}</td>
                      <td style={{padding:"13px 16px",fontSize:12,color:r.to?th.textMid:th.textLo,fontFamily:"'JetBrains Mono',monospace",whiteSpace:"nowrap"}}>
                        {r.to||<span style={{color:th.textLo,fontFamily:"inherit",fontSize:11}}>No return date</span>}
                      </td>
                      <td style={{padding:"13px 16px"}}><AsnStatusPill status={r.status}/></td>
                      <td style={{padding:"13px 16px"}}>
                        <div style={{display:"flex",gap:4}}>
                          <button onClick={()=>{setActive(r);setShowEdit(true);}}
                            style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:th.textMid,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}
                            onMouseEnter={e=>{e.currentTarget.style.borderColor=T.sky;e.currentTarget.style.color=T.sky;}}
                            onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.color=th.textMid;}}>
                            <Edit size={12}/>
                          </button>
                          {isActive&&(
                            <button onClick={()=>{setActive(r);setShowReturn(true);}}
                              style={{padding:"0 8px",height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:th.textMid,display:"flex",alignItems:"center",gap:4,fontSize:10,fontWeight:600,transition:"all 0.15s",whiteSpace:"nowrap"}}
                              onMouseEnter={e=>{e.currentTarget.style.borderColor=T.amber;e.currentTarget.style.color=T.amber;}}
                              onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.color=th.textMid;}}>
                              <ArrowLeftRight size={10}/>Return
                            </button>
                          )}
                          <button onClick={()=>{setActive(r);setShowDel(true);}}
                            style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:`${T.rose}88`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}
                            onMouseEnter={e=>{e.currentTarget.style.borderColor=T.rose;e.currentTarget.style.color=T.rose;}}
                            onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.color=`${T.rose}88`;}}>
                            <Trash2 size={12}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Notes expandable section for last active row — footer summary */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 20px",borderTop:`1px solid ${th.border}`}}>
          <span style={{fontSize:12,color:th.textMid}}>
            Showing <span style={{fontFamily:"'JetBrains Mono',monospace",color:th.text,fontWeight:600}}>{filtered.length}</span> of{" "}
            <span style={{fontFamily:"'JetBrains Mono',monospace",color:th.text,fontWeight:600}}>{rows.length}</span> assignment records
          </span>
          <span style={{fontSize:11,color:th.textLo}}>Click <strong style={{color:th.textMid}}>Return</strong> to log an asset as returned</span>
        </div>
      </Card>

      {/* Active assignment cards — quick overview */}
      {filtered.filter(r=>r.status==="Active"&&r.notes).length>0&&(
        <div style={{marginTop:24}}>
          <div style={{fontSize:12,fontWeight:700,color:th.textMid,textTransform:"uppercase",letterSpacing:0.8,marginBottom:12}}>Assignment notes</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
            {filtered.filter(r=>r.status==="Active"&&r.notes).map(r=>(
              <div key={r.id} style={{padding:"14px 16px",borderRadius:10,border:`1px solid ${th.border}`,background:th.bg1}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <span style={{fontSize:11,fontWeight:700,color:T.sky,fontFamily:"'JetBrains Mono',monospace"}}>{r.id}</span>
                  <AsnStatusPill status={r.status}/>
                </div>
                <div style={{fontSize:12,fontWeight:600,color:th.text,marginBottom:3}}>{r.asset}</div>
                <div style={{fontSize:11,color:th.textMid,marginBottom:8}}>{r.assignee} · {r.dept}</div>
                <div style={{fontSize:11,color:th.textLo,lineHeight:1.5,fontStyle:"italic"}}>"{r.notes}"</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════  WORK ORDERS  ══════════════════════════════════ */
function WoStatusPill({ status }) {
  const map = { "Open":{bg:"#0ea5e920",color:"#0ea5e9"}, "In Progress":{bg:"#f59e0b20",color:"#f59e0b"},
    "Completed":{bg:"#10b98120",color:"#10b981"}, "On Hold":{bg:"#94a3b820",color:"#94a3b8"} };
  const s = map[status]||{bg:"#94a3b820",color:"#94a3b8"};
  return <span style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,background:s.bg,color:s.color,whiteSpace:"nowrap"}}>{status}</span>;
}
function WorkOrderModal({ open, onClose, wo=null, onSave, dark }) {
  const th = useTheme(dark);
  const blank = { title:"",asset:"",assetName:"",type:"Preventive",priority:"Medium",status:"Open",tech:"",dept:"",open:"",due:"",estHrs:"",estCost:"",parts:"",desc:"" };
  const [f,setF] = useState(blank);
  useEffect(()=>{ setF(wo ? {...wo} : blank); },[wo,open]);
  const set = k => v => setF(p=>({...p,[k]:v}));
  const save = () => {
    if (!f.title.trim()||!f.tech.trim()) return;
    onSave(f); onClose();
  };
  return (
    <Modal open={open} onClose={onClose} title={wo?"Edit Work Order":"New Work Order"} dark={dark} width={600}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div style={{gridColumn:"1/-1"}}><FField label="Work Order Title"><FInput value={f.title} onChange={set("title")} placeholder="Describe the task..." dark={dark}/></FField></div>
        <FField label="Asset ID"><FInput value={f.asset} onChange={set("asset")} placeholder="AST-001" dark={dark}/></FField>
        <FField label="Asset Name"><FInput value={f.assetName} onChange={set("assetName")} placeholder="Power Transformer PT-1042" dark={dark}/></FField>
        <FField label="Type"><FSelect value={f.type} onChange={set("type")} options={["Preventive","Corrective","Inspection","Emergency"]} dark={dark}/></FField>
        <FField label="Priority"><FSelect value={f.priority} onChange={set("priority")} options={["Critical","High","Medium","Low"]} dark={dark}/></FField>
        <FField label="Status"><FSelect value={f.status} onChange={set("status")} options={["Open","In Progress","On Hold","Completed"]} dark={dark}/></FField>
        <FField label="Assigned Technician"><FInput value={f.tech} onChange={set("tech")} placeholder="Technician name" dark={dark}/></FField>
        <FField label="Department"><FInput value={f.dept} onChange={set("dept")} placeholder="e.g. Transmission Ops" dark={dark}/></FField>
        <FField label="Date Opened"><FInput value={f.open} onChange={set("open")} type="date" dark={dark}/></FField>
        <FField label="Due Date"><FInput value={f.due} onChange={set("due")} type="date" dark={dark}/></FField>
        <FField label="Est. Hours"><FInput value={f.estHrs} onChange={set("estHrs")} type="number" placeholder="0" dark={dark}/></FField>
        <FField label="Est. Cost (GHS)"><FInput value={f.estCost} onChange={set("estCost")} type="number" placeholder="0" dark={dark}/></FField>
        <div style={{gridColumn:"1/-1"}}><FField label="Parts / Materials"><FInput value={f.parts} onChange={set("parts")} placeholder="List of parts required" dark={dark}/></FField></div>
        <div style={{gridColumn:"1/-1"}}><FField label="Description"><FTextarea value={f.desc} onChange={set("desc")} placeholder="Detailed description of work..." dark={dark}/></FField></div>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20}}>
        <GhostBtn onClick={onClose} dark={dark}>Cancel</GhostBtn>
        <PrimaryBtn onClick={save}>{wo?"Save Changes":"Create Work Order"}</PrimaryBtn>
      </div>
    </Modal>
  );
}
function WorkOrdersPage({ dark, toast }) {
  const th = useTheme(dark);
  const [rows,setRows] = useState(()=>workOrderRows.map(r=>({...r})));
  const [search,setSearch] = useState("");
  const [statusF,setStatusF] = useState("All");
  const [sort,setSort] = useState({col:"id",dir:"asc"});
  const [showAdd,setShowAdd] = useState(false);
  const [showEdit,setShowEdit] = useState(false);
  const [showDel,setShowDel] = useState(false);
  const [active,setActive] = useState(null);

  const total=rows.length, open=rows.filter(r=>r.status==="Open").length,
    inProg=rows.filter(r=>r.status==="In Progress").length,
    critical=rows.filter(r=>r.priority==="Critical").length,
    completed=rows.filter(r=>r.status==="Completed").length;

  const filtered = rows.filter(r=>{
    const q=search.toLowerCase();
    const match = !q || r.title.toLowerCase().includes(q)||r.id.toLowerCase().includes(q)||r.tech.toLowerCase().includes(q)||r.assetName.toLowerCase().includes(q);
    return match && (statusF==="All"||r.status===statusF);
  }).sort((a,b)=>{
    const v = String(a[sort.col]||"").localeCompare(String(b[sort.col]||""));
    return sort.dir==="asc"?v:-v;
  });

  const colHdr = (label,col) => (
    <th onClick={()=>setSort(s=>({col,dir:s.col===col&&s.dir==="asc"?"desc":"asc"}))}
      style={{padding:"11px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:th.textLo,textTransform:"uppercase",letterSpacing:0.8,borderBottom:`1px solid ${th.border}`,cursor:"pointer",userSelect:"none",whiteSpace:"nowrap"}}>
      <span style={{display:"inline-flex",alignItems:"center",gap:4}}>{label}
        {sort.col===col ? (sort.dir==="asc"?<ArrowUp size={10}/>:<ArrowDown size={10}/>):<ArrowUp size={10} style={{opacity:0.2}}/>}
      </span>
    </th>
  );

  const handleSave = f => {
    if (f.id) { setRows(r=>r.map(x=>x.id===f.id?f:x)); toast("Work order updated"); }
    else { const id=`WO-00${++_nextWoId}`; setRows(r=>[{...f,id},,...r]); toast("Work order created"); }
  };
  const handleDel = () => { setRows(r=>r.filter(x=>x.id!==active.id)); toast("Work order deleted"); setShowDel(false); };

  const exportCSV = () => {
    const h="ID,Title,Asset,Type,Priority,Status,Technician,Department,Open Date,Due Date,Est Hours,Est Cost\n";
    const body=rows.map(r=>[r.id,`"${r.title}"`,`"${r.assetName}"`,r.type,r.priority,r.status,r.tech,r.dept,r.open,r.due,r.estHrs,r.estCost].join(",")).join("\n");
    const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([h+body],{type:"text/csv"})); a.download="work_orders.csv"; a.click();
  };

  return (
    <div style={{padding:"28px 32px",background:th.bg,minHeight:"100vh"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:22,fontWeight:800,color:th.text,letterSpacing:-0.5}}>Work Orders</div>
          <div style={{fontSize:13,color:th.textMid,marginTop:2}}>Manage maintenance and inspection work orders</div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <ExportBtns dark={dark} title="Work Orders" subtitle="Maintenance and inspection work orders" filename="GRIDCo_WorkOrders"
            columns={[{label:"ID",key:"id"},{label:"Title",key:"title"},{label:"Asset",key:"assetName"},{label:"Type",key:"type"},{label:"Priority",key:"priority"},{label:"Status",key:"status"},{label:"Technician",key:"tech"},{label:"Department",key:"dept"},{label:"Date Opened",key:"open"},{label:"Due Date",key:"due"},{label:"Est. Hours",key:"estHrs"},{label:"Est. Cost (GHS)",key:"estCost"},{label:"Parts / Materials",key:"parts"}]}
            rows={filtered}/>
          <PrimaryBtn icon={Plus} onClick={()=>setShowAdd(true)}>New Work Order</PrimaryBtn>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14,marginBottom:24}}>
        {[{label:"Total",value:total,color:th.text},{label:"Open",value:open,color:T.sky},{label:"In Progress",value:inProg,color:T.amber},{label:"Completed",value:completed,color:T.emerald},{label:"Critical",value:critical,color:T.rose}].map(s=>(
          <Card key={s.label} dark={dark} style={{padding:"16px 18px"}}>
            <div style={{fontSize:24,fontWeight:800,color:s.color}}>{s.value}</div>
            <div style={{fontSize:12,color:th.textMid,marginTop:4}}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card dark={dark} style={{padding:"14px 18px",marginBottom:18,display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{position:"relative",flex:1,minWidth:200}}>
          <Search size={14} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:th.textLo}}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search work orders..."
            style={{width:"100%",paddingLeft:32,paddingRight:12,height:36,borderRadius:8,border:`1px solid ${th.border}`,background:th.bg1,color:th.text,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
        </div>
        {["All","Open","In Progress","On Hold","Completed"].map(s=>(
          <button key={s} onClick={()=>setStatusF(s)} style={{padding:"6px 14px",borderRadius:20,border:`1px solid ${statusF===s?T.sky:th.border}`,background:statusF===s?`${T.sky}18`:"transparent",color:statusF===s?T.sky:th.textMid,fontSize:12,fontWeight:600,cursor:"pointer"}}>
            {s}
          </button>
        ))}
      </Card>

      {/* Table */}
      <Card dark={dark} style={{overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:dark?T.d3:T.l1}}>
                {colHdr("ID","id")}{colHdr("Title / Asset","title")}{colHdr("Type","type")}
                {colHdr("Priority","priority")}{colHdr("Status","status")}{colHdr("Technician","tech")}{colHdr("Due","due")}
                <th style={{padding:"11px 14px",borderBottom:`1px solid ${th.border}`}}/>
              </tr>
            </thead>
            <tbody>
              {filtered.length===0
                ?<tr><td colSpan={8} style={{padding:"56px",textAlign:"center",color:th.textMid}}>No work orders match your search.</td></tr>
                :filtered.map(r=>(
                  <tr key={r.id} className="row-hover" style={{borderBottom:`1px solid ${th.borderLo}`}}>
                    <td style={{padding:"13px 14px"}}><span style={{fontSize:12,fontWeight:700,color:T.sky,fontFamily:"monospace"}}>{r.id}</span></td>
                    <td style={{padding:"13px 14px",maxWidth:240}}>
                      <div style={{fontSize:13,fontWeight:600,color:th.text,marginBottom:2}}>{r.title}</div>
                      <div style={{fontSize:11,color:th.textMid}}>{r.assetName}</div>
                    </td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.textMid,whiteSpace:"nowrap"}}>{r.type}</td>
                    <td style={{padding:"13px 14px"}}><PriorityPill priority={r.priority}/></td>
                    <td style={{padding:"13px 14px"}}><WoStatusPill status={r.status}/></td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.text,whiteSpace:"nowrap"}}>{r.tech}</td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.textMid,fontFamily:"monospace",whiteSpace:"nowrap"}}>{r.due||"—"}</td>
                    <td style={{padding:"13px 14px"}}>
                      <div style={{display:"flex",gap:4}}>
                        <button onClick={()=>{setActive(r);setShowEdit(true);}} style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:th.textMid,display:"flex",alignItems:"center",justifyContent:"center"}}><Edit size={12}/></button>
                        <button onClick={()=>{setActive(r);setShowDel(true);}} style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:`${T.rose}88`,display:"flex",alignItems:"center",justifyContent:"center"}}><Trash2 size={12}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div style={{padding:"13px 18px",borderTop:`1px solid ${th.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:12,color:th.textMid}}>Showing <strong style={{color:th.text}}>{filtered.length}</strong> of <strong style={{color:th.text}}>{rows.length}</strong> work orders</span>
        </div>
      </Card>

      <WorkOrderModal open={showAdd} onClose={()=>setShowAdd(false)} onSave={handleSave} dark={dark}/>
      <WorkOrderModal open={showEdit} onClose={()=>setShowEdit(false)} wo={active} onSave={handleSave} dark={dark}/>
      <ConfirmModal open={showDel} onClose={()=>setShowDel(false)} onConfirm={handleDel} title="Delete Work Order" body={`Delete "${active?.title}"? This cannot be undone.`} dark={dark}/>
    </div>
  );
}

/* ══════════════════════════════════  ASSET REQUESTS  ══════════════════════════════════ */
function ReqStatusPill({ status }) {
  const map = { Pending:{bg:"#f59e0b20",color:"#f59e0b"}, Approved:{bg:"#10b98120",color:"#10b981"},
    Fulfilled:{bg:"#0ea5e920",color:"#0ea5e9"}, Rejected:{bg:"#f43f5e20",color:"#f43f5e"}, Critical:{bg:"#f43f5e30",color:"#f43f5e"} };
  const s = map[status]||{bg:"#94a3b820",color:"#94a3b8"};
  return <span style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,background:s.bg,color:s.color,whiteSpace:"nowrap"}}>{status}</span>;
}
function RequestModal({ open, onClose, req=null, onSave, dark }) {
  const th = useTheme(dark);
  const blank = { title:"",cat:"Safety Gear",qty:1,requestor:"",dept:"",priority:"Medium",status:"Pending",date:"",cost:"",justify:"" };
  const [f,setF] = useState(blank);
  useEffect(()=>{ setF(req ? {...req} : blank); },[req,open]);
  const set = k => v => setF(p=>({...p,[k]:v}));
  const save = () => { if (!f.title.trim()) return; onSave(f); onClose(); };
  return (
    <Modal open={open} onClose={onClose} title={req?"Edit Request":"New Asset Request"} dark={dark} width={580}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div style={{gridColumn:"1/-1"}}><FField label="Request Title"><FInput value={f.title} onChange={set("title")} placeholder="e.g. 10× Safety Helmets" dark={dark}/></FField></div>
        <FField label="Category"><FSelect value={f.cat} onChange={set("cat")} options={["Safety Gear","IT Systems","Vehicles","Test Equipment","Power Systems","PPE","Furniture","Other"]} dark={dark}/></FField>
        <FField label="Quantity"><FInput value={f.qty} onChange={set("qty")} type="number" placeholder="1" dark={dark}/></FField>
        <FField label="Requestor"><FInput value={f.requestor} onChange={set("requestor")} placeholder="Full name" dark={dark}/></FField>
        <FField label="Department"><FInput value={f.dept} onChange={set("dept")} placeholder="e.g. Safety & HSE" dark={dark}/></FField>
        <FField label="Priority"><FSelect value={f.priority} onChange={set("priority")} options={["Critical","High","Medium","Low"]} dark={dark}/></FField>
        <FField label="Status"><FSelect value={f.status} onChange={set("status")} options={["Pending","Approved","Fulfilled","Rejected"]} dark={dark}/></FField>
        <FField label="Date Submitted"><FInput value={f.date} onChange={set("date")} type="date" dark={dark}/></FField>
        <FField label="Estimated Cost (GHS)"><FInput value={f.cost} onChange={set("cost")} type="number" placeholder="0" dark={dark}/></FField>
        <div style={{gridColumn:"1/-1"}}><FField label="Justification"><FTextarea value={f.justify} onChange={set("justify")} placeholder="Business justification for this request..." dark={dark}/></FField></div>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20}}>
        <GhostBtn onClick={onClose} dark={dark}>Cancel</GhostBtn>
        <PrimaryBtn onClick={save}>{req?"Save Changes":"Submit Request"}</PrimaryBtn>
      </div>
    </Modal>
  );
}
function RequestsPage({ dark, toast }) {
  const th = useTheme(dark);
  const [rows,setRows] = useState(()=>requestRows.map(r=>({...r})));
  const [search,setSearch] = useState("");
  const [statusF,setStatusF] = useState("All");
  const [sort,setSort] = useState({col:"id",dir:"asc"});
  const [showAdd,setShowAdd] = useState(false);
  const [showEdit,setShowEdit] = useState(false);
  const [showDel,setShowDel] = useState(false);
  const [active,setActive] = useState(null);

  const pending=rows.filter(r=>r.status==="Pending").length;
  const approved=rows.filter(r=>r.status==="Approved").length;
  const critical=rows.filter(r=>r.priority==="Critical").length;
  const totalCost=rows.reduce((s,r)=>s+(Number(r.cost)||0),0);

  const filtered = rows.filter(r=>{
    const q=search.toLowerCase();
    const m = !q||r.title.toLowerCase().includes(q)||r.id.toLowerCase().includes(q)||r.requestor.toLowerCase().includes(q)||r.dept.toLowerCase().includes(q);
    return m&&(statusF==="All"||r.status===statusF);
  }).sort((a,b)=>{
    const v=String(a[sort.col]||"").localeCompare(String(b[sort.col]||""));
    return sort.dir==="asc"?v:-v;
  });

  const colHdr=(label,col)=>(
    <th onClick={()=>setSort(s=>({col,dir:s.col===col&&s.dir==="asc"?"desc":"asc"}))}
      style={{padding:"11px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:th.textLo,textTransform:"uppercase",letterSpacing:0.8,borderBottom:`1px solid ${th.border}`,cursor:"pointer",userSelect:"none",whiteSpace:"nowrap"}}>
      <span style={{display:"inline-flex",alignItems:"center",gap:4}}>{label}
        {sort.col===col?(sort.dir==="asc"?<ArrowUp size={10}/>:<ArrowDown size={10}/>):<ArrowUp size={10} style={{opacity:0.2}}/>}
      </span>
    </th>
  );

  const handleSave = f => {
    if (f.id) { setRows(r=>r.map(x=>x.id===f.id?f:x)); toast("Request updated"); }
    else { const id=`REQ-00${++_nextReqId}`; setRows(r=>[{...f,id},...r]); toast("Request submitted"); }
  };
  const handleDel = () => { setRows(r=>r.filter(x=>x.id!==active.id)); toast("Request deleted"); setShowDel(false); };

  return (
    <div style={{padding:"28px 32px",background:th.bg,minHeight:"100vh"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:22,fontWeight:800,color:th.text,letterSpacing:-0.5}}>Asset Requests</div>
          <div style={{fontSize:13,color:th.textMid,marginTop:2}}>Track and manage procurement and asset acquisition requests</div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <ExportBtns dark={dark} title="Asset Requests" subtitle="Procurement and acquisition requests" filename="GRIDCo_AssetRequests"
            columns={[{label:"ID",key:"id"},{label:"Title",key:"title"},{label:"Category",key:"cat"},{label:"Qty",key:"qty"},{label:"Requestor",key:"requestor"},{label:"Department",key:"dept"},{label:"Priority",key:"priority"},{label:"Status",key:"status"},{label:"Date Submitted",key:"date"},{label:"Cost (GHS)",key:"cost"},{label:"Justification",key:"justify"}]}
            rows={filtered}/>
          <PrimaryBtn icon={Plus} onClick={()=>setShowAdd(true)}>New Request</PrimaryBtn>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14,marginBottom:24}}>
        {[{label:"Total",value:rows.length,color:th.text},{label:"Pending",value:pending,color:T.amber},{label:"Approved",value:approved,color:T.emerald},{label:"Critical",value:critical,color:T.rose},{label:"Total Value (GHS)",value:`${(totalCost/1000).toFixed(0)}k`,color:T.violet}].map(s=>(
          <Card key={s.label} dark={dark} style={{padding:"16px 18px"}}>
            <div style={{fontSize:22,fontWeight:800,color:s.color}}>{s.value}</div>
            <div style={{fontSize:12,color:th.textMid,marginTop:4}}>{s.label}</div>
          </Card>
        ))}
      </div>

      <Card dark={dark} style={{padding:"14px 18px",marginBottom:18,display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{position:"relative",flex:1,minWidth:200}}>
          <Search size={14} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:th.textLo}}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search requests..."
            style={{width:"100%",paddingLeft:32,paddingRight:12,height:36,borderRadius:8,border:`1px solid ${th.border}`,background:th.bg1,color:th.text,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
        </div>
        {["All","Pending","Approved","Fulfilled","Rejected"].map(s=>(
          <button key={s} onClick={()=>setStatusF(s)} style={{padding:"6px 14px",borderRadius:20,border:`1px solid ${statusF===s?T.sky:th.border}`,background:statusF===s?`${T.sky}18`:"transparent",color:statusF===s?T.sky:th.textMid,fontSize:12,fontWeight:600,cursor:"pointer"}}>
            {s}
          </button>
        ))}
      </Card>

      <Card dark={dark} style={{overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:dark?T.d3:T.l1}}>
                {colHdr("ID","id")}{colHdr("Title","title")}{colHdr("Category","cat")}
                {colHdr("Requestor","requestor")}{colHdr("Dept","dept")}{colHdr("Priority","priority")}
                {colHdr("Status","status")}{colHdr("Date","date")}
                <th style={{padding:"11px 14px",borderBottom:`1px solid ${th.border}`}}/>
              </tr>
            </thead>
            <tbody>
              {filtered.length===0
                ?<tr><td colSpan={9} style={{padding:"56px",textAlign:"center",color:th.textMid}}>No requests match your search.</td></tr>
                :filtered.map(r=>(
                  <tr key={r.id} className="row-hover" style={{borderBottom:`1px solid ${th.borderLo}`}}>
                    <td style={{padding:"13px 14px"}}><span style={{fontSize:12,fontWeight:700,color:T.sky,fontFamily:"monospace"}}>{r.id}</span></td>
                    <td style={{padding:"13px 14px",maxWidth:220}}>
                      <div style={{fontSize:13,fontWeight:600,color:th.text}}>{r.title}</div>
                      <div style={{fontSize:11,color:th.textMid}}>Qty: {r.qty}</div>
                    </td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.textMid,whiteSpace:"nowrap"}}>{r.cat}</td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.text,whiteSpace:"nowrap"}}>{r.requestor}</td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.textMid,whiteSpace:"nowrap"}}>{r.dept}</td>
                    <td style={{padding:"13px 14px"}}><PriorityPill priority={r.priority}/></td>
                    <td style={{padding:"13px 14px"}}><ReqStatusPill status={r.status}/></td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.textMid,fontFamily:"monospace",whiteSpace:"nowrap"}}>{r.date||"—"}</td>
                    <td style={{padding:"13px 14px"}}>
                      <div style={{display:"flex",gap:4}}>
                        <button onClick={()=>{setActive(r);setShowEdit(true);}} style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:th.textMid,display:"flex",alignItems:"center",justifyContent:"center"}}><Edit size={12}/></button>
                        <button onClick={()=>{setActive(r);setShowDel(true);}} style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:`${T.rose}88`,display:"flex",alignItems:"center",justifyContent:"center"}}><Trash2 size={12}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div style={{padding:"13px 18px",borderTop:`1px solid ${th.border}`}}>
          <span style={{fontSize:12,color:th.textMid}}>Showing <strong style={{color:th.text}}>{filtered.length}</strong> of <strong style={{color:th.text}}>{rows.length}</strong> requests</span>
        </div>
      </Card>

      <RequestModal open={showAdd} onClose={()=>setShowAdd(false)} onSave={handleSave} dark={dark}/>
      <RequestModal open={showEdit} onClose={()=>setShowEdit(false)} req={active} onSave={handleSave} dark={dark}/>
      <ConfirmModal open={showDel} onClose={()=>setShowDel(false)} onConfirm={handleDel} title="Delete Request" body={`Delete "${active?.title}"? This cannot be undone.`} dark={dark}/>
    </div>
  );
}

/* ══════════════════════════════════  INCIDENTS  ══════════════════════════════════ */
function SeverityPill({ severity }) {
  const map = { Critical:{bg:"#f43f5e20",color:"#f43f5e"}, Major:{bg:"#f59e0b20",color:"#f59e0b"}, Minor:{bg:"#10b98120",color:"#10b981"} };
  const s = map[severity]||{bg:"#94a3b820",color:"#94a3b8"};
  return <span style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,background:s.bg,color:s.color}}>{severity}</span>;
}
function IncStatusPill({ status }) {
  const map = { Resolved:{bg:"#10b98120",color:"#10b981"}, "Under Investigation":{bg:"#f59e0b20",color:"#f59e0b"}, Closed:{bg:"#94a3b820",color:"#94a3b8"}, Open:{bg:"#f43f5e20",color:"#f43f5e"} };
  const s = map[status]||{bg:"#94a3b820",color:"#94a3b8"};
  return <span style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,background:s.bg,color:s.color,whiteSpace:"nowrap"}}>{status}</span>;
}
function IncidentModal({ open, onClose, inc=null, onSave, dark }) {
  const th = useTheme(dark);
  const blank = { title:"",asset:"",assetName:"None",type:"Equipment Failure",severity:"Minor",status:"Open",location:"",reporter:"",date:"",desc:"",resolution:"" };
  const [f,setF] = useState(blank);
  useEffect(()=>{ setF(inc ? {...inc} : blank); },[inc,open]);
  const set = k => v => setF(p=>({...p,[k]:v}));
  const save = () => { if (!f.title.trim()) return; onSave(f); onClose(); };
  return (
    <Modal open={open} onClose={onClose} title={inc?"Edit Incident":"Log New Incident"} dark={dark} width={600}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div style={{gridColumn:"1/-1"}}><FField label="Incident Title"><FInput value={f.title} onChange={set("title")} placeholder="Brief description of incident" dark={dark}/></FField></div>
        <FField label="Asset ID (if applicable)"><FInput value={f.asset} onChange={set("asset")} placeholder="AST-001 or leave blank" dark={dark}/></FField>
        <FField label="Asset Name"><FInput value={f.assetName} onChange={set("assetName")} placeholder="Name or None" dark={dark}/></FField>
        <FField label="Incident Type"><FSelect value={f.type} onChange={set("type")} options={["Equipment Failure","Safety Incident","Cyber Incident","Environmental","Near Miss","Other"]} dark={dark}/></FField>
        <FField label="Severity"><FSelect value={f.severity} onChange={set("severity")} options={["Critical","Major","Minor"]} dark={dark}/></FField>
        <FField label="Status"><FSelect value={f.status} onChange={set("status")} options={["Open","Under Investigation","Resolved","Closed"]} dark={dark}/></FField>
        <FField label="Location"><FInput value={f.location} onChange={set("location")} placeholder="e.g. Achimota Substation" dark={dark}/></FField>
        <FField label="Reporter"><FInput value={f.reporter} onChange={set("reporter")} placeholder="Name of person reporting" dark={dark}/></FField>
        <FField label="Date of Incident"><FInput value={f.date} onChange={set("date")} type="date" dark={dark}/></FField>
        <div style={{gridColumn:"1/-1"}}><FField label="Description"><FTextarea value={f.desc} onChange={set("desc")} placeholder="Detailed description of what happened..." rows={3} dark={dark}/></FField></div>
        <div style={{gridColumn:"1/-1"}}><FField label="Resolution / Actions Taken"><FTextarea value={f.resolution} onChange={set("resolution")} placeholder="Steps taken to resolve the incident..." rows={2} dark={dark}/></FField></div>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20}}>
        <GhostBtn onClick={onClose} dark={dark}>Cancel</GhostBtn>
        <PrimaryBtn onClick={save}>{inc?"Save Changes":"Log Incident"}</PrimaryBtn>
      </div>
    </Modal>
  );
}
function IncidentsPage({ dark, toast }) {
  const th = useTheme(dark);
  const [rows,setRows] = useState(()=>incidentRows.map(r=>({...r})));
  const [search,setSearch] = useState("");
  const [sevF,setSevF] = useState("All");
  const [sort,setSort] = useState({col:"id",dir:"desc"});
  const [showAdd,setShowAdd] = useState(false);
  const [showEdit,setShowEdit] = useState(false);
  const [showDel,setShowDel] = useState(false);
  const [active,setActive] = useState(null);

  const critical=rows.filter(r=>r.severity==="Critical").length;
  const investigating=rows.filter(r=>r.status==="Under Investigation").length;
  const resolved=rows.filter(r=>r.status==="Resolved"||r.status==="Closed").length;

  const filtered = rows.filter(r=>{
    const q=search.toLowerCase();
    const m = !q||r.title.toLowerCase().includes(q)||r.id.toLowerCase().includes(q)||r.location.toLowerCase().includes(q)||r.reporter.toLowerCase().includes(q);
    return m&&(sevF==="All"||r.severity===sevF);
  }).sort((a,b)=>{ const v=String(a[sort.col]||"").localeCompare(String(b[sort.col]||"")); return sort.dir==="asc"?v:-v; });

  const colHdr=(label,col)=>(
    <th onClick={()=>setSort(s=>({col,dir:s.col===col&&s.dir==="asc"?"desc":"asc"}))}
      style={{padding:"11px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:th.textLo,textTransform:"uppercase",letterSpacing:0.8,borderBottom:`1px solid ${th.border}`,cursor:"pointer",userSelect:"none",whiteSpace:"nowrap"}}>
      <span style={{display:"inline-flex",alignItems:"center",gap:4}}>{label}
        {sort.col===col?(sort.dir==="asc"?<ArrowUp size={10}/>:<ArrowDown size={10}/>):<ArrowUp size={10} style={{opacity:0.2}}/>}
      </span>
    </th>
  );

  const handleSave = f => {
    if (f.id) { setRows(r=>r.map(x=>x.id===f.id?f:x)); toast("Incident updated"); }
    else { const id=`INC-00${++_nextIncId}`; setRows(r=>[{...f,id},...r]); toast("Incident logged"); }
  };
  const handleDel = () => { setRows(r=>r.filter(x=>x.id!==active.id)); toast("Incident deleted"); setShowDel(false); };

  return (
    <div style={{padding:"28px 32px",background:th.bg,minHeight:"100vh"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:22,fontWeight:800,color:th.text,letterSpacing:-0.5}}>Incidents</div>
          <div style={{fontSize:13,color:th.textMid,marginTop:2}}>Track equipment failures, safety incidents, and near misses</div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <ExportBtns dark={dark} title="Incidents" subtitle="Equipment failures, safety incidents, and near misses" filename="GRIDCo_Incidents"
            columns={[{label:"ID",key:"id"},{label:"Title",key:"title"},{label:"Asset",key:"assetName"},{label:"Type",key:"type"},{label:"Severity",key:"severity"},{label:"Status",key:"status"},{label:"Location",key:"location"},{label:"Reporter",key:"reporter"},{label:"Date",key:"date"},{label:"Description",key:"desc"},{label:"Resolution",key:"resolution"}]}
            rows={filtered}/>
          <PrimaryBtn icon={Plus} onClick={()=>setShowAdd(true)}>Log Incident</PrimaryBtn>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14,marginBottom:24}}>
        {[{label:"Total",value:rows.length,color:th.text},{label:"Critical",value:critical,color:T.rose},{label:"Investigating",value:investigating,color:T.amber},{label:"Resolved",value:resolved,color:T.emerald}].map(s=>(
          <Card key={s.label} dark={dark} style={{padding:"16px 18px"}}>
            <div style={{fontSize:24,fontWeight:800,color:s.color}}>{s.value}</div>
            <div style={{fontSize:12,color:th.textMid,marginTop:4}}>{s.label}</div>
          </Card>
        ))}
      </div>

      <Card dark={dark} style={{padding:"14px 18px",marginBottom:18,display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{position:"relative",flex:1,minWidth:200}}>
          <Search size={14} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:th.textLo}}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search incidents..."
            style={{width:"100%",paddingLeft:32,paddingRight:12,height:36,borderRadius:8,border:`1px solid ${th.border}`,background:th.bg1,color:th.text,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
        </div>
        {["All","Critical","Major","Minor"].map(s=>(
          <button key={s} onClick={()=>setSevF(s)} style={{padding:"6px 14px",borderRadius:20,border:`1px solid ${sevF===s?T.sky:th.border}`,background:sevF===s?`${T.sky}18`:"transparent",color:sevF===s?T.sky:th.textMid,fontSize:12,fontWeight:600,cursor:"pointer"}}>{s}</button>
        ))}
      </Card>

      <Card dark={dark} style={{overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:dark?T.d3:T.l1}}>
                {colHdr("ID","id")}{colHdr("Incident","title")}{colHdr("Type","type")}
                {colHdr("Severity","severity")}{colHdr("Status","status")}{colHdr("Location","location")}{colHdr("Date","date")}
                <th style={{padding:"11px 14px",borderBottom:`1px solid ${th.border}`}}/>
              </tr>
            </thead>
            <tbody>
              {filtered.length===0
                ?<tr><td colSpan={8} style={{padding:"56px",textAlign:"center",color:th.textMid}}>No incidents match your search.</td></tr>
                :filtered.map(r=>(
                  <tr key={r.id} className="row-hover" style={{borderBottom:`1px solid ${th.borderLo}`}}>
                    <td style={{padding:"13px 14px"}}><span style={{fontSize:12,fontWeight:700,color:T.rose,fontFamily:"monospace"}}>{r.id}</span></td>
                    <td style={{padding:"13px 14px",maxWidth:240}}>
                      <div style={{fontSize:13,fontWeight:600,color:th.text}}>{r.title}</div>
                      <div style={{fontSize:11,color:th.textMid}}>{r.assetName!=="None"?r.assetName:""}</div>
                    </td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.textMid,whiteSpace:"nowrap"}}>{r.type}</td>
                    <td style={{padding:"13px 14px"}}><SeverityPill severity={r.severity}/></td>
                    <td style={{padding:"13px 14px"}}><IncStatusPill status={r.status}/></td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.textMid,maxWidth:160}}>{r.location}</td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.textMid,fontFamily:"monospace",whiteSpace:"nowrap"}}>{r.date||"—"}</td>
                    <td style={{padding:"13px 14px"}}>
                      <div style={{display:"flex",gap:4}}>
                        <button onClick={()=>{setActive(r);setShowEdit(true);}} style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:th.textMid,display:"flex",alignItems:"center",justifyContent:"center"}}><Edit size={12}/></button>
                        <button onClick={()=>{setActive(r);setShowDel(true);}} style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:`${T.rose}88`,display:"flex",alignItems:"center",justifyContent:"center"}}><Trash2 size={12}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div style={{padding:"13px 18px",borderTop:`1px solid ${th.border}`}}>
          <span style={{fontSize:12,color:th.textMid}}>Showing <strong style={{color:th.text}}>{filtered.length}</strong> of <strong style={{color:th.text}}>{rows.length}</strong> incidents</span>
        </div>
      </Card>

      <IncidentModal open={showAdd} onClose={()=>setShowAdd(false)} onSave={handleSave} dark={dark}/>
      <IncidentModal open={showEdit} onClose={()=>setShowEdit(false)} inc={active} onSave={handleSave} dark={dark}/>
      <ConfirmModal open={showDel} onClose={()=>setShowDel(false)} onConfirm={handleDel} title="Delete Incident" body={`Delete "${active?.title}"?`} dark={dark}/>
    </div>
  );
}

/* ══════════════════════════════════  SPARE PARTS / INVENTORY  ══════════════════════════════════ */
function StockPill({ stock, minStock }) {
  if (stock===0) return <span style={{padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:700,background:"#f43f5e20",color:"#f43f5e"}}>Out of Stock</span>;
  if (stock<=minStock) return <span style={{padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:700,background:"#f59e0b20",color:"#f59e0b"}}>Low Stock</span>;
  return <span style={{padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:700,background:"#10b98120",color:"#10b981"}}>In Stock</span>;
}
function InventoryModal({ open, onClose, part=null, onSave, dark }) {
  const th = useTheme(dark);
  const blank = { name:"",cat:"Electrical",supplier:"",unitPrice:"",stock:"",minStock:"",unit:"pcs",location:"",lastRestock:"" };
  const [f,setF] = useState(blank);
  useEffect(()=>{ setF(part ? {...part} : blank); },[part,open]);
  const set = k => v => setF(p=>({...p,[k]:v}));
  const save = () => { if (!f.name.trim()) return; onSave(f); onClose(); };
  return (
    <Modal open={open} onClose={onClose} title={part?"Edit Part / Item":"Add Spare Part"} dark={dark} width={580}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div style={{gridColumn:"1/-1"}}><FField label="Part Name"><FInput value={f.name} onChange={set("name")} placeholder="e.g. Transformer Insulating Oil" dark={dark}/></FField></div>
        <FField label="Category"><FSelect value={f.cat} onChange={set("cat")} options={["Electrical","Consumables","PPE","IT","Mechanical","Infrastructure","Other"]} dark={dark}/></FField>
        <FField label="Supplier"><FInput value={f.supplier} onChange={set("supplier")} placeholder="Supplier name" dark={dark}/></FField>
        <FField label="Unit Price (GHS)"><FInput value={f.unitPrice} onChange={set("unitPrice")} type="number" placeholder="0" dark={dark}/></FField>
        <FField label="Unit"><FInput value={f.unit} onChange={set("unit")} placeholder="pcs / litre / roll..." dark={dark}/></FField>
        <FField label="Current Stock"><FInput value={f.stock} onChange={set("stock")} type="number" placeholder="0" dark={dark}/></FField>
        <FField label="Minimum Stock Level"><FInput value={f.minStock} onChange={set("minStock")} type="number" placeholder="0" dark={dark}/></FField>
        <FField label="Location"><FInput value={f.location} onChange={set("location")} placeholder="e.g. Warehouse — Tema" dark={dark}/></FField>
        <FField label="Last Restocked"><FInput value={f.lastRestock} onChange={set("lastRestock")} type="date" dark={dark}/></FField>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20}}>
        <GhostBtn onClick={onClose} dark={dark}>Cancel</GhostBtn>
        <PrimaryBtn onClick={save}>{part?"Save Changes":"Add Part"}</PrimaryBtn>
      </div>
    </Modal>
  );
}
function InventoryPage({ dark, toast }) {
  const th = useTheme(dark);
  const [rows,setRows] = useState(()=>inventoryRows.map(r=>({...r})));
  const [search,setSearch] = useState("");
  const [catF,setCatF] = useState("All");
  const [sort,setSort] = useState({col:"name",dir:"asc"});
  const [showAdd,setShowAdd] = useState(false);
  const [showEdit,setShowEdit] = useState(false);
  const [showDel,setShowDel] = useState(false);
  const [active,setActive] = useState(null);

  const lowStock=rows.filter(r=>r.stock<=r.minStock&&r.stock>0).length;
  const outOfStock=rows.filter(r=>r.stock===0).length;
  const totalValue=rows.reduce((s,r)=>s+(Number(r.unitPrice)||0)*(Number(r.stock)||0),0);
  const cats=["All",...new Set(rows.map(r=>r.cat))];

  const filtered = rows.filter(r=>{
    const q=search.toLowerCase();
    const m=!q||r.name.toLowerCase().includes(q)||r.id.toLowerCase().includes(q)||r.supplier.toLowerCase().includes(q)||r.location.toLowerCase().includes(q);
    return m&&(catF==="All"||r.cat===catF);
  }).sort((a,b)=>{ const v=String(a[sort.col]||"").localeCompare(String(b[sort.col]||"")); return sort.dir==="asc"?v:-v; });

  const colHdr=(label,col)=>(
    <th onClick={()=>setSort(s=>({col,dir:s.col===col&&s.dir==="asc"?"desc":"asc"}))}
      style={{padding:"11px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:th.textLo,textTransform:"uppercase",letterSpacing:0.8,borderBottom:`1px solid ${th.border}`,cursor:"pointer",userSelect:"none",whiteSpace:"nowrap"}}>
      <span style={{display:"inline-flex",alignItems:"center",gap:4}}>{label}
        {sort.col===col?(sort.dir==="asc"?<ArrowUp size={10}/>:<ArrowDown size={10}/>):<ArrowUp size={10} style={{opacity:0.2}}/>}
      </span>
    </th>
  );

  const handleSave = f => {
    const n = {...f, stock:Number(f.stock)||0, minStock:Number(f.minStock)||0, unitPrice:Number(f.unitPrice)||0 };
    if (n.id) { setRows(r=>r.map(x=>x.id===n.id?n:x)); toast("Part updated"); }
    else { const id=`PRT-0${++_nextPartId}`; setRows(r=>[{...n,id},...r]); toast("Part added to inventory"); }
  };
  const handleDel = () => { setRows(r=>r.filter(x=>x.id!==active.id)); toast("Part removed"); setShowDel(false); };

  const exportCSV = () => {
    const h="ID,Name,Category,Supplier,Unit Price,Stock,Min Stock,Unit,Location\n";
    const body=rows.map(r=>[r.id,`"${r.name}"`,r.cat,`"${r.supplier}"`,r.unitPrice,r.stock,r.minStock,r.unit,`"${r.location}"`].join(",")).join("\n");
    const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([h+body],{type:"text/csv"})); a.download="inventory.csv"; a.click();
  };

  return (
    <div style={{padding:"28px 32px",background:th.bg,minHeight:"100vh"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:22,fontWeight:800,color:th.text,letterSpacing:-0.5}}>Spare Parts & Inventory</div>
          <div style={{fontSize:13,color:th.textMid,marginTop:2}}>Track stock levels, reorder points, and part locations</div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <ExportBtns dark={dark} title="Spare Parts & Inventory" subtitle="Stock levels, reorder points, and part locations" filename="GRIDCo_Inventory"
            columns={[{label:"ID",key:"id"},{label:"Part Name",key:"name"},{label:"Category",key:"cat"},{label:"Supplier",key:"supplier"},{label:"Current Stock",key:"stock"},{label:"Min Stock Level",key:"minStock"},{label:"Unit",key:"unit"},{label:"Unit Price (GHS)",key:"unitPrice"},{label:"Location",key:"location"},{label:"Last Restocked",key:"lastRestock"}]}
            rows={filtered}/>
          <PrimaryBtn icon={Plus} onClick={()=>setShowAdd(true)}>Add Part</PrimaryBtn>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14,marginBottom:24}}>
        {[{label:"Total Parts",value:rows.length,color:th.text},{label:"Low Stock",value:lowStock,color:T.amber},{label:"Out of Stock",value:outOfStock,color:T.rose},{label:"Total Value (GHS)",value:`${(totalValue/1000).toFixed(0)}k`,color:T.emerald}].map(s=>(
          <Card key={s.label} dark={dark} style={{padding:"16px 18px"}}>
            <div style={{fontSize:22,fontWeight:800,color:s.color}}>{s.value}</div>
            <div style={{fontSize:12,color:th.textMid,marginTop:4}}>{s.label}</div>
          </Card>
        ))}
      </div>

      {(lowStock>0||outOfStock>0)&&(
        <Card dark={dark} style={{padding:"14px 18px",marginBottom:18,borderLeft:`3px solid ${T.amber}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <AlertTriangle size={16} color={T.amber}/>
            <span style={{fontSize:13,fontWeight:600,color:T.amber}}>{outOfStock>0?`${outOfStock} item(s) out of stock — `:""}
            {lowStock>0?`${lowStock} item(s) below minimum stock level`:""}</span>
          </div>
        </Card>
      )}

      <Card dark={dark} style={{padding:"14px 18px",marginBottom:18,display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{position:"relative",flex:1,minWidth:200}}>
          <Search size={14} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:th.textLo}}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search parts..."
            style={{width:"100%",paddingLeft:32,paddingRight:12,height:36,borderRadius:8,border:`1px solid ${th.border}`,background:th.bg1,color:th.text,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
        </div>
        {cats.map(c=>(
          <button key={c} onClick={()=>setCatF(c)} style={{padding:"6px 14px",borderRadius:20,border:`1px solid ${catF===c?T.sky:th.border}`,background:catF===c?`${T.sky}18`:"transparent",color:catF===c?T.sky:th.textMid,fontSize:12,fontWeight:600,cursor:"pointer"}}>{c}</button>
        ))}
      </Card>

      <Card dark={dark} style={{overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:dark?T.d3:T.l1}}>
                {colHdr("ID","id")}{colHdr("Part Name","name")}{colHdr("Category","cat")}
                {colHdr("Supplier","supplier")}{colHdr("Stock","stock")}{colHdr("Unit Price","unitPrice")}{colHdr("Location","location")}
                <th style={{padding:"11px 14px",borderBottom:`1px solid ${th.border}`}}/>
              </tr>
            </thead>
            <tbody>
              {filtered.length===0
                ?<tr><td colSpan={8} style={{padding:"56px",textAlign:"center",color:th.textMid}}>No parts match your search.</td></tr>
                :filtered.map(r=>(
                  <tr key={r.id} className="row-hover" style={{borderBottom:`1px solid ${th.borderLo}`,background:r.stock===0?(dark?"#f43f5e08":"#fff5f5"):r.stock<=r.minStock?(dark?"#f59e0b08":"#fffbf0"):"transparent"}}>
                    <td style={{padding:"13px 14px"}}><span style={{fontSize:12,fontWeight:700,color:T.emerald,fontFamily:"monospace"}}>{r.id}</span></td>
                    <td style={{padding:"13px 14px",maxWidth:240}}>
                      <div style={{fontSize:13,fontWeight:600,color:th.text}}>{r.name}</div>
                      <div style={{fontSize:11,color:th.textMid}}>{r.unit}</div>
                    </td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.textMid}}>{r.cat}</td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.textMid,whiteSpace:"nowrap"}}>{r.supplier}</td>
                    <td style={{padding:"13px 14px"}}>
                      <div style={{fontSize:13,fontWeight:700,color:th.text}}>{r.stock} <span style={{fontSize:11,fontWeight:400,color:th.textLo}}>/ min {r.minStock}</span></div>
                      <div style={{marginTop:4}}><StockPill stock={r.stock} minStock={r.minStock}/></div>
                    </td>
                    <td style={{padding:"13px 14px",fontSize:13,fontWeight:600,color:th.text,whiteSpace:"nowrap"}}>GHS {Number(r.unitPrice).toLocaleString()}</td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.textMid}}>{r.location}</td>
                    <td style={{padding:"13px 14px"}}>
                      <div style={{display:"flex",gap:4}}>
                        <button onClick={()=>{setActive(r);setShowEdit(true);}} style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:th.textMid,display:"flex",alignItems:"center",justifyContent:"center"}}><Edit size={12}/></button>
                        <button onClick={()=>{setActive(r);setShowDel(true);}} style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:`${T.rose}88`,display:"flex",alignItems:"center",justifyContent:"center"}}><Trash2 size={12}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div style={{padding:"13px 18px",borderTop:`1px solid ${th.border}`}}>
          <span style={{fontSize:12,color:th.textMid}}>Showing <strong style={{color:th.text}}>{filtered.length}</strong> of <strong style={{color:th.text}}>{rows.length}</strong> parts &mdash; Total inventory value: <strong style={{color:th.text}}>GHS {totalValue.toLocaleString()}</strong></span>
        </div>
      </Card>

      <InventoryModal open={showAdd} onClose={()=>setShowAdd(false)} onSave={handleSave} dark={dark}/>
      <InventoryModal open={showEdit} onClose={()=>setShowEdit(false)} part={active} onSave={handleSave} dark={dark}/>
      <ConfirmModal open={showDel} onClose={()=>setShowDel(false)} onConfirm={handleDel} title="Remove Part" body={`Remove "${active?.name}" from inventory?`} dark={dark}/>
    </div>
  );
}

/* ══════════════════════════════════  COMPLIANCE  ══════════════════════════════════ */
function CmpStatusPill({ status }) {
  const map = { Compliant:{bg:"#10b98120",color:"#10b981"}, "Due Soon":{bg:"#f59e0b20",color:"#f59e0b"}, Overdue:{bg:"#f43f5e20",color:"#f43f5e"}, Scheduled:{bg:"#0ea5e920",color:"#0ea5e9"} };
  const s = map[status]||{bg:"#94a3b820",color:"#94a3b8"};
  return <span style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,background:s.bg,color:s.color,whiteSpace:"nowrap"}}>{status}</span>;
}
function ComplianceModal({ open, onClose, item=null, onSave, dark }) {
  const th = useTheme(dark);
  const blank = { asset:"",assetName:"",type:"Electrical Safety",standard:"",frequency:"Annual",last:"",next:"",status:"Compliant",inspector:"",notes:"" };
  const [f,setF] = useState(blank);
  useEffect(()=>{ setF(item ? {...item} : blank); },[item,open]);
  const set = k => v => setF(p=>({...p,[k]:v}));
  const save = () => { if (!f.assetName.trim()) return; onSave(f); onClose(); };
  return (
    <Modal open={open} onClose={onClose} title={item?"Edit Compliance Record":"New Compliance Record"} dark={dark} width={580}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <FField label="Asset ID"><FInput value={f.asset} onChange={set("asset")} placeholder="AST-001" dark={dark}/></FField>
        <FField label="Asset Name"><FInput value={f.assetName} onChange={set("assetName")} placeholder="Asset full name" dark={dark}/></FField>
        <FField label="Compliance Type"><FSelect value={f.type} onChange={set("type")} options={["Electrical Safety","Protection Relay","Thermal Imaging","Structural","Road Worthiness","Network Security","Cyber Security","Environmental","Fire Safety"]} dark={dark}/></FField>
        <FField label="Standard / Regulation"><FInput value={f.standard} onChange={set("standard")} placeholder="e.g. IEC 60076, NERC CIP" dark={dark}/></FField>
        <FField label="Frequency"><FSelect value={f.frequency} onChange={set("frequency")} options={["Monthly","Quarterly","Biannual","Annual","Biennial"]} dark={dark}/></FField>
        <FField label="Status"><FSelect value={f.status} onChange={set("status")} options={["Compliant","Due Soon","Overdue","Scheduled"]} dark={dark}/></FField>
        <FField label="Last Inspection Date"><FInput value={f.last} onChange={set("last")} type="date" dark={dark}/></FField>
        <FField label="Next Due Date"><FInput value={f.next} onChange={set("next")} type="date" dark={dark}/></FField>
        <div style={{gridColumn:"1/-1"}}><FField label="Inspector / Authority"><FInput value={f.inspector} onChange={set("inspector")} placeholder="Inspector name or certification body" dark={dark}/></FField></div>
        <div style={{gridColumn:"1/-1"}}><FField label="Notes"><FTextarea value={f.notes} onChange={set("notes")} placeholder="Additional compliance notes..." dark={dark}/></FField></div>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20}}>
        <GhostBtn onClick={onClose} dark={dark}>Cancel</GhostBtn>
        <PrimaryBtn onClick={save}>{item?"Save Changes":"Add Record"}</PrimaryBtn>
      </div>
    </Modal>
  );
}
function CompliancePage({ dark, toast }) {
  const th = useTheme(dark);
  const [rows,setRows] = useState(()=>complianceRows.map(r=>({...r})));
  const [search,setSearch] = useState("");
  const [statusF,setStatusF] = useState("All");
  const [sort,setSort] = useState({col:"next",dir:"asc"});
  const [showAdd,setShowAdd] = useState(false);
  const [showEdit,setShowEdit] = useState(false);
  const [showDel,setShowDel] = useState(false);
  const [active,setActive] = useState(null);

  const compliant=rows.filter(r=>r.status==="Compliant").length;
  const dueSoon=rows.filter(r=>r.status==="Due Soon").length;
  const overdue=rows.filter(r=>r.status==="Overdue").length;

  const filtered = rows.filter(r=>{
    const q=search.toLowerCase();
    const m=!q||r.assetName.toLowerCase().includes(q)||r.id.toLowerCase().includes(q)||r.type.toLowerCase().includes(q)||r.standard.toLowerCase().includes(q);
    return m&&(statusF==="All"||r.status===statusF);
  }).sort((a,b)=>{ const v=String(a[sort.col]||"").localeCompare(String(b[sort.col]||"")); return sort.dir==="asc"?v:-v; });

  const colHdr=(label,col)=>(
    <th onClick={()=>setSort(s=>({col,dir:s.col===col&&s.dir==="asc"?"desc":"asc"}))}
      style={{padding:"11px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:th.textLo,textTransform:"uppercase",letterSpacing:0.8,borderBottom:`1px solid ${th.border}`,cursor:"pointer",userSelect:"none",whiteSpace:"nowrap"}}>
      <span style={{display:"inline-flex",alignItems:"center",gap:4}}>{label}
        {sort.col===col?(sort.dir==="asc"?<ArrowUp size={10}/>:<ArrowDown size={10}/>):<ArrowUp size={10} style={{opacity:0.2}}/>}
      </span>
    </th>
  );

  const handleSave = f => {
    if (f.id) { setRows(r=>r.map(x=>x.id===f.id?f:x)); toast("Compliance record updated"); }
    else { const id=`CMP-00${++_nextCmpId}`; setRows(r=>[{...f,id},...r]); toast("Compliance record added"); }
  };
  const handleDel = () => { setRows(r=>r.filter(x=>x.id!==active.id)); toast("Record deleted"); setShowDel(false); };

  return (
    <div style={{padding:"28px 32px",background:th.bg,minHeight:"100vh"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:22,fontWeight:800,color:th.text,letterSpacing:-0.5}}>Compliance & Inspections</div>
          <div style={{fontSize:13,color:th.textMid,marginTop:2}}>Track regulatory compliance, inspection schedules, and certifications</div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <ExportBtns dark={dark} title="Compliance & Inspections" subtitle="Regulatory compliance and inspection schedule" filename="GRIDCo_Compliance"
            columns={[{label:"ID",key:"id"},{label:"Asset",key:"assetName"},{label:"Asset ID",key:"asset"},{label:"Type",key:"type"},{label:"Standard",key:"standard"},{label:"Frequency",key:"frequency"},{label:"Last Check",key:"last"},{label:"Next Due",key:"next"},{label:"Status",key:"status"},{label:"Inspector",key:"inspector"},{label:"Notes",key:"notes"}]}
            rows={filtered}/>
          <PrimaryBtn icon={Plus} onClick={()=>setShowAdd(true)}>Add Record</PrimaryBtn>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14,marginBottom:24}}>
        {[{label:"Total Records",value:rows.length,color:th.text},{label:"Compliant",value:compliant,color:T.emerald},{label:"Due Soon",value:dueSoon,color:T.amber},{label:"Overdue",value:overdue,color:T.rose}].map(s=>(
          <Card key={s.label} dark={dark} style={{padding:"16px 18px"}}>
            <div style={{fontSize:24,fontWeight:800,color:s.color}}>{s.value}</div>
            <div style={{fontSize:12,color:th.textMid,marginTop:4}}>{s.label}</div>
          </Card>
        ))}
      </div>

      <Card dark={dark} style={{padding:"14px 18px",marginBottom:18,display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{position:"relative",flex:1,minWidth:200}}>
          <Search size={14} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:th.textLo}}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search compliance records..."
            style={{width:"100%",paddingLeft:32,paddingRight:12,height:36,borderRadius:8,border:`1px solid ${th.border}`,background:th.bg1,color:th.text,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
        </div>
        {["All","Compliant","Due Soon","Overdue","Scheduled"].map(s=>(
          <button key={s} onClick={()=>setStatusF(s)} style={{padding:"6px 14px",borderRadius:20,border:`1px solid ${statusF===s?T.sky:th.border}`,background:statusF===s?`${T.sky}18`:"transparent",color:statusF===s?T.sky:th.textMid,fontSize:12,fontWeight:600,cursor:"pointer"}}>{s}</button>
        ))}
      </Card>

      <Card dark={dark} style={{overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:dark?T.d3:T.l1}}>
                {colHdr("ID","id")}{colHdr("Asset","assetName")}{colHdr("Type","type")}
                {colHdr("Standard","standard")}{colHdr("Frequency","frequency")}{colHdr("Last Check","last")}{colHdr("Next Due","next")}{colHdr("Status","status")}
                <th style={{padding:"11px 14px",borderBottom:`1px solid ${th.border}`}}/>
              </tr>
            </thead>
            <tbody>
              {filtered.length===0
                ?<tr><td colSpan={9} style={{padding:"56px",textAlign:"center",color:th.textMid}}>No compliance records match your search.</td></tr>
                :filtered.map(r=>(
                  <tr key={r.id} className="row-hover" style={{borderBottom:`1px solid ${th.borderLo}`}}>
                    <td style={{padding:"13px 14px"}}><span style={{fontSize:12,fontWeight:700,color:T.violet,fontFamily:"monospace"}}>{r.id}</span></td>
                    <td style={{padding:"13px 14px",maxWidth:200}}>
                      <div style={{fontSize:13,fontWeight:600,color:th.text}}>{r.assetName}</div>
                      <div style={{fontSize:11,color:th.textMid}}>{r.asset}</div>
                    </td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.textMid,whiteSpace:"nowrap"}}>{r.type}</td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.textMid,fontFamily:"monospace",whiteSpace:"nowrap"}}>{r.standard}</td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.textMid,whiteSpace:"nowrap"}}>{r.frequency}</td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.textMid,fontFamily:"monospace",whiteSpace:"nowrap"}}>{r.last||"—"}</td>
                    <td style={{padding:"13px 14px",fontSize:12,fontFamily:"monospace",color:r.status==="Overdue"?T.rose:r.status==="Due Soon"?T.amber:th.textMid,fontWeight:r.status!=="Compliant"?700:400,whiteSpace:"nowrap"}}>{r.next||"—"}</td>
                    <td style={{padding:"13px 14px"}}><CmpStatusPill status={r.status}/></td>
                    <td style={{padding:"13px 14px"}}>
                      <div style={{display:"flex",gap:4}}>
                        <button onClick={()=>{setActive(r);setShowEdit(true);}} style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:th.textMid,display:"flex",alignItems:"center",justifyContent:"center"}}><Edit size={12}/></button>
                        <button onClick={()=>{setActive(r);setShowDel(true);}} style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:`${T.rose}88`,display:"flex",alignItems:"center",justifyContent:"center"}}><Trash2 size={12}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div style={{padding:"13px 18px",borderTop:`1px solid ${th.border}`}}>
          <span style={{fontSize:12,color:th.textMid}}>Showing <strong style={{color:th.text}}>{filtered.length}</strong> of <strong style={{color:th.text}}>{rows.length}</strong> records</span>
        </div>
      </Card>

      <ComplianceModal open={showAdd} onClose={()=>setShowAdd(false)} onSave={handleSave} dark={dark}/>
      <ComplianceModal open={showEdit} onClose={()=>setShowEdit(false)} item={active} onSave={handleSave} dark={dark}/>
      <ConfirmModal open={showDel} onClose={()=>setShowDel(false)} onConfirm={handleDel} title="Delete Record" body={`Delete compliance record for "${active?.assetName}"?`} dark={dark}/>
    </div>
  );
}

/* ══════════════════════════════════  DISPOSAL  ══════════════════════════════════ */
function DspStatusPill({ status }) {
  const map = { Completed:{bg:"#10b98120",color:"#10b981"}, "Pending Approval":{bg:"#f59e0b20",color:"#f59e0b"}, Approved:{bg:"#0ea5e920",color:"#0ea5e9"}, Rejected:{bg:"#f43f5e20",color:"#f43f5e"} };
  const s = map[status]||{bg:"#94a3b820",color:"#94a3b8"};
  return <span style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,background:s.bg,color:s.color,whiteSpace:"nowrap"}}>{status}</span>;
}
function DisposalModal({ open, onClose, item=null, onSave, dark }) {
  const th = useTheme(dark);
  const blank = { assetId:"",assetName:"",cat:"",type:"Scrapped",reason:"End of Life",bookVal:"",proceeds:"",status:"Pending Approval",requestor:"",approver:"",date:"",notes:"" };
  const [f,setF] = useState(blank);
  useEffect(()=>{ setF(item ? {...item} : blank); },[item,open]);
  const set = k => v => setF(p=>({...p,[k]:v}));
  const save = () => { if (!f.assetName.trim()) return; onSave(f); onClose(); };
  return (
    <Modal open={open} onClose={onClose} title={item?"Edit Disposal Record":"New Disposal Request"} dark={dark} width={580}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <FField label="Asset ID"><FInput value={f.assetId} onChange={set("assetId")} placeholder="AST-001" dark={dark}/></FField>
        <FField label="Asset Name"><FInput value={f.assetName} onChange={set("assetName")} placeholder="Asset full name" dark={dark}/></FField>
        <FField label="Category"><FInput value={f.cat} onChange={set("cat")} placeholder="e.g. Vehicles, IT Systems" dark={dark}/></FField>
        <FField label="Disposal Type"><FSelect value={f.type} onChange={set("type")} options={["Scrapped","Written-off","Donated","Auctioned","Decommission","Transferred"]} dark={dark}/></FField>
        <FField label="Reason"><FSelect value={f.reason} onChange={set("reason")} options={["End of Life","Irreparable Damage","Obsolete","Critical Condition","Surplus","Policy"]} dark={dark}/></FField>
        <FField label="Status"><FSelect value={f.status} onChange={set("status")} options={["Pending Approval","Approved","Completed","Rejected"]} dark={dark}/></FField>
        <FField label="Book Value (GHS)"><FInput value={f.bookVal} onChange={set("bookVal")} type="number" placeholder="0" dark={dark}/></FField>
        <FField label="Proceeds / Recovery (GHS)"><FInput value={f.proceeds} onChange={set("proceeds")} type="number" placeholder="0" dark={dark}/></FField>
        <FField label="Requestor"><FInput value={f.requestor} onChange={set("requestor")} placeholder="Name" dark={dark}/></FField>
        <FField label="Date"><FInput value={f.date} onChange={set("date")} type="date" dark={dark}/></FField>
        <div style={{gridColumn:"1/-1"}}><FField label="Notes"><FTextarea value={f.notes} onChange={set("notes")} placeholder="Additional details..." dark={dark}/></FField></div>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20}}>
        <GhostBtn onClick={onClose} dark={dark}>Cancel</GhostBtn>
        <PrimaryBtn onClick={save}>{item?"Save Changes":"Submit Request"}</PrimaryBtn>
      </div>
    </Modal>
  );
}
function DisposalPage({ dark, toast }) {
  const th = useTheme(dark);
  const [rows,setRows] = useState(()=>disposalRows.map(r=>({...r})));
  const [search,setSearch] = useState("");
  const [sort,setSort] = useState({col:"id",dir:"desc"});
  const [showAdd,setShowAdd] = useState(false);
  const [showEdit,setShowEdit] = useState(false);
  const [showDel,setShowDel] = useState(false);
  const [active,setActive] = useState(null);

  const pending=rows.filter(r=>r.status==="Pending Approval").length;
  const approved=rows.filter(r=>r.status==="Approved"||r.status==="Completed").length;
  const totalRecovery=rows.reduce((s,r)=>s+(Number(r.proceeds)||0),0);

  const filtered = rows.filter(r=>{
    const q=search.toLowerCase();
    return !q||r.assetName.toLowerCase().includes(q)||r.id.toLowerCase().includes(q)||r.type.toLowerCase().includes(q)||r.requestor.toLowerCase().includes(q);
  }).sort((a,b)=>{ const v=String(a[sort.col]||"").localeCompare(String(b[sort.col]||"")); return sort.dir==="asc"?v:-v; });

  const colHdr=(label,col)=>(
    <th onClick={()=>setSort(s=>({col,dir:s.col===col&&s.dir==="asc"?"desc":"asc"}))}
      style={{padding:"11px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:th.textLo,textTransform:"uppercase",letterSpacing:0.8,borderBottom:`1px solid ${th.border}`,cursor:"pointer",userSelect:"none",whiteSpace:"nowrap"}}>
      <span style={{display:"inline-flex",alignItems:"center",gap:4}}>{label}
        {sort.col===col?(sort.dir==="asc"?<ArrowUp size={10}/>:<ArrowDown size={10}/>):<ArrowUp size={10} style={{opacity:0.2}}/>}
      </span>
    </th>
  );

  const handleSave = f => {
    const n={...f,bookVal:Number(f.bookVal)||0,proceeds:f.proceeds===null||f.proceeds===""?null:Number(f.proceeds)};
    if (n.id) { setRows(r=>r.map(x=>x.id===n.id?n:x)); toast("Disposal record updated"); }
    else { const id=`DSP-00${++_nextDspId}`; setRows(r=>[{...n,id},...r]); toast("Disposal request submitted"); }
  };
  const handleDel = () => { setRows(r=>r.filter(x=>x.id!==active.id)); toast("Record deleted"); setShowDel(false); };

  return (
    <div style={{padding:"28px 32px",background:th.bg,minHeight:"100vh"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:22,fontWeight:800,color:th.text,letterSpacing:-0.5}}>Asset Disposal</div>
          <div style={{fontSize:13,color:th.textMid,marginTop:2}}>Manage asset write-offs, decommissions, donations, and disposals</div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <ExportBtns dark={dark} title="Asset Disposal" subtitle="Write-offs, decommissions, donations, and disposals" filename="GRIDCo_Disposal"
            columns={[{label:"ID",key:"id"},{label:"Asset ID",key:"assetId"},{label:"Asset Name",key:"assetName"},{label:"Category",key:"cat"},{label:"Disposal Type",key:"type"},{label:"Reason",key:"reason"},{label:"Book Value (GHS)",get:r=>Number(r.bookVal||0).toLocaleString()},{label:"Proceeds (GHS)",get:r=>r.proceeds!=null?Number(r.proceeds).toLocaleString():"—"},{label:"Status",key:"status"},{label:"Requestor",key:"requestor"},{label:"Date",key:"date"},{label:"Notes",key:"notes"}]}
            rows={filtered}/>
          <PrimaryBtn icon={Plus} onClick={()=>setShowAdd(true)}>New Disposal</PrimaryBtn>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14,marginBottom:24}}>
        {[{label:"Total",value:rows.length,color:th.text},{label:"Pending Approval",value:pending,color:T.amber},{label:"Approved / Done",value:approved,color:T.emerald},{label:"Total Recovery (GHS)",value:totalRecovery.toLocaleString(),color:T.sky}].map(s=>(
          <Card key={s.label} dark={dark} style={{padding:"16px 18px"}}>
            <div style={{fontSize:s.label.includes("GHS")?18:24,fontWeight:800,color:s.color}}>{s.value}</div>
            <div style={{fontSize:12,color:th.textMid,marginTop:4}}>{s.label}</div>
          </Card>
        ))}
      </div>

      <Card dark={dark} style={{padding:"14px 18px",marginBottom:18}}>
        <div style={{position:"relative"}}>
          <Search size={14} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:th.textLo}}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search disposal records..."
            style={{width:"100%",paddingLeft:32,paddingRight:12,height:36,borderRadius:8,border:`1px solid ${th.border}`,background:th.bg1,color:th.text,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
        </div>
      </Card>

      <Card dark={dark} style={{overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:dark?T.d3:T.l1}}>
                {colHdr("ID","id")}{colHdr("Asset","assetName")}{colHdr("Category","cat")}
                {colHdr("Type","type")}{colHdr("Reason","reason")}{colHdr("Book Value","bookVal")}{colHdr("Proceeds","proceeds")}{colHdr("Status","status")}
                <th style={{padding:"11px 14px",borderBottom:`1px solid ${th.border}`}}/>
              </tr>
            </thead>
            <tbody>
              {filtered.length===0
                ?<tr><td colSpan={9} style={{padding:"56px",textAlign:"center",color:th.textMid}}>No disposal records found.</td></tr>
                :filtered.map(r=>(
                  <tr key={r.id} className="row-hover" style={{borderBottom:`1px solid ${th.borderLo}`}}>
                    <td style={{padding:"13px 14px"}}><span style={{fontSize:12,fontWeight:700,color:T.amber,fontFamily:"monospace"}}>{r.id}</span></td>
                    <td style={{padding:"13px 14px",maxWidth:200}}>
                      <div style={{fontSize:13,fontWeight:600,color:th.text}}>{r.assetName}</div>
                      <div style={{fontSize:11,color:th.textMid}}>{r.assetId}</div>
                    </td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.textMid}}>{r.cat}</td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.textMid,whiteSpace:"nowrap"}}>{r.type}</td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.textMid,whiteSpace:"nowrap"}}>{r.reason}</td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.text,fontFamily:"monospace",whiteSpace:"nowrap"}}>GHS {Number(r.bookVal||0).toLocaleString()}</td>
                    <td style={{padding:"13px 14px",fontSize:12,color:r.proceeds?T.emerald:th.textLo,fontFamily:"monospace",fontWeight:r.proceeds?600:400,whiteSpace:"nowrap"}}>{r.proceeds!=null?"GHS "+Number(r.proceeds).toLocaleString():"—"}</td>
                    <td style={{padding:"13px 14px"}}><DspStatusPill status={r.status}/></td>
                    <td style={{padding:"13px 14px"}}>
                      <div style={{display:"flex",gap:4}}>
                        <button onClick={()=>{setActive(r);setShowEdit(true);}} style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:th.textMid,display:"flex",alignItems:"center",justifyContent:"center"}}><Edit size={12}/></button>
                        <button onClick={()=>{setActive(r);setShowDel(true);}} style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:`${T.rose}88`,display:"flex",alignItems:"center",justifyContent:"center"}}><Trash2 size={12}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div style={{padding:"13px 18px",borderTop:`1px solid ${th.border}`}}>
          <span style={{fontSize:12,color:th.textMid}}>Showing <strong style={{color:th.text}}>{filtered.length}</strong> of <strong style={{color:th.text}}>{rows.length}</strong> records</span>
        </div>
      </Card>

      <DisposalModal open={showAdd} onClose={()=>setShowAdd(false)} onSave={handleSave} dark={dark}/>
      <DisposalModal open={showEdit} onClose={()=>setShowEdit(false)} item={active} onSave={handleSave} dark={dark}/>
      <ConfirmModal open={showDel} onClose={()=>setShowDel(false)} onConfirm={handleDel} title="Delete Disposal Record" body={`Delete disposal record for "${active?.assetName}"?`} dark={dark}/>
    </div>
  );
}

/* ══════════════════════════════════  WARRANTY CLAIMS  ══════════════════════════════════ */
function WclStatusPill({ status }) {
  const map = { Open:{bg:"#0ea5e920",color:"#0ea5e9"}, "In Progress":{bg:"#f59e0b20",color:"#f59e0b"}, Settled:{bg:"#10b98120",color:"#10b981"}, Rejected:{bg:"#f43f5e20",color:"#f43f5e"} };
  const s = map[status]||{bg:"#94a3b820",color:"#94a3b8"};
  return <span style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,background:s.bg,color:s.color,whiteSpace:"nowrap"}}>{status}</span>;
}
function WarrantyModal({ open, onClose, item=null, onSave, dark }) {
  const th = useTheme(dark);
  const blank = { assetId:"",assetName:"",supplier:"",issue:"",date:"",status:"Open",value:"",resolution:"",resolved:"" };
  const [f,setF] = useState(blank);
  useEffect(()=>{ setF(item ? {...item} : blank); },[item,open]);
  const set = k => v => setF(p=>({...p,[k]:v}));
  const save = () => { if (!f.assetName.trim()||!f.issue.trim()) return; onSave(f); onClose(); };
  return (
    <Modal open={open} onClose={onClose} title={item?"Edit Warranty Claim":"New Warranty Claim"} dark={dark} width={580}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <FField label="Asset ID"><FInput value={f.assetId} onChange={set("assetId")} placeholder="AST-001" dark={dark}/></FField>
        <FField label="Asset Name"><FInput value={f.assetName} onChange={set("assetName")} placeholder="Asset full name" dark={dark}/></FField>
        <div style={{gridColumn:"1/-1"}}><FField label="Supplier"><FInput value={f.supplier} onChange={set("supplier")} placeholder="Supplier / manufacturer name" dark={dark}/></FField></div>
        <div style={{gridColumn:"1/-1"}}><FField label="Issue / Defect Description"><FInput value={f.issue} onChange={set("issue")} placeholder="Describe the defect or failure" dark={dark}/></FField></div>
        <FField label="Date Filed"><FInput value={f.date} onChange={set("date")} type="date" dark={dark}/></FField>
        <FField label="Status"><FSelect value={f.status} onChange={set("status")} options={["Open","In Progress","Settled","Rejected"]} dark={dark}/></FField>
        <FField label="Claim Value (GHS)"><FInput value={f.value} onChange={set("value")} type="number" placeholder="0" dark={dark}/></FField>
        <FField label="Date Resolved"><FInput value={f.resolved} onChange={set("resolved")} type="date" dark={dark}/></FField>
        <div style={{gridColumn:"1/-1"}}><FField label="Resolution"><FTextarea value={f.resolution} onChange={set("resolution")} placeholder="How was the claim resolved?" dark={dark}/></FField></div>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20}}>
        <GhostBtn onClick={onClose} dark={dark}>Cancel</GhostBtn>
        <PrimaryBtn onClick={save}>{item?"Save Changes":"File Claim"}</PrimaryBtn>
      </div>
    </Modal>
  );
}
function WarrantyPage({ dark, toast }) {
  const th = useTheme(dark);
  const [rows,setRows] = useState(()=>warrantyRows.map(r=>({...r})));
  const [search,setSearch] = useState("");
  const [sort,setSort] = useState({col:"date",dir:"desc"});
  const [showAdd,setShowAdd] = useState(false);
  const [showEdit,setShowEdit] = useState(false);
  const [showDel,setShowDel] = useState(false);
  const [active,setActive] = useState(null);

  const openClaims=rows.filter(r=>r.status==="Open").length;
  const inProgress=rows.filter(r=>r.status==="In Progress").length;
  const settled=rows.filter(r=>r.status==="Settled").length;
  const totalValue=rows.reduce((s,r)=>s+(Number(r.value)||0),0);

  const filtered = rows.filter(r=>{
    const q=search.toLowerCase();
    return !q||r.assetName.toLowerCase().includes(q)||r.id.toLowerCase().includes(q)||r.supplier.toLowerCase().includes(q)||r.issue.toLowerCase().includes(q);
  }).sort((a,b)=>{ const v=String(a[sort.col]||"").localeCompare(String(b[sort.col]||"")); return sort.dir==="asc"?v:-v; });

  const colHdr=(label,col)=>(
    <th onClick={()=>setSort(s=>({col,dir:s.col===col&&s.dir==="asc"?"desc":"asc"}))}
      style={{padding:"11px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:th.textLo,textTransform:"uppercase",letterSpacing:0.8,borderBottom:`1px solid ${th.border}`,cursor:"pointer",userSelect:"none",whiteSpace:"nowrap"}}>
      <span style={{display:"inline-flex",alignItems:"center",gap:4}}>{label}
        {sort.col===col?(sort.dir==="asc"?<ArrowUp size={10}/>:<ArrowDown size={10}/>):<ArrowUp size={10} style={{opacity:0.2}}/>}
      </span>
    </th>
  );

  const handleSave = f => {
    const n={...f,value:Number(f.value)||0};
    if (n.id) { setRows(r=>r.map(x=>x.id===n.id?n:x)); toast("Warranty claim updated"); }
    else { const id=`WCL-00${++_nextWclId}`; setRows(r=>[{...n,id},...r]); toast("Warranty claim filed"); }
  };
  const handleDel = () => { setRows(r=>r.filter(x=>x.id!==active.id)); toast("Claim deleted"); setShowDel(false); };

  return (
    <div style={{padding:"28px 32px",background:th.bg,minHeight:"100vh"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:22,fontWeight:800,color:th.text,letterSpacing:-0.5}}>Warranty Claims</div>
          <div style={{fontSize:13,color:th.textMid,marginTop:2}}>Track warranty defects, supplier claims, and resolutions</div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <ExportBtns dark={dark} title="Warranty Claims" subtitle="Warranty defects, supplier claims, and resolutions" filename="GRIDCo_Warranty"
            columns={[{label:"ID",key:"id"},{label:"Asset ID",key:"assetId"},{label:"Asset Name",key:"assetName"},{label:"Supplier",key:"supplier"},{label:"Issue / Defect",key:"issue"},{label:"Date Filed",key:"date"},{label:"Claim Value (GHS)",get:r=>Number(r.value||0).toLocaleString()},{label:"Status",key:"status"},{label:"Resolution",key:"resolution"},{label:"Date Resolved",get:r=>r.resolved||"—"}]}
            rows={filtered}/>
          <PrimaryBtn icon={Plus} onClick={()=>setShowAdd(true)}>File Claim</PrimaryBtn>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14,marginBottom:24}}>
        {[{label:"Total Claims",value:rows.length,color:th.text},{label:"Open",value:openClaims,color:T.sky},{label:"In Progress",value:inProgress,color:T.amber},{label:"Settled",value:settled,color:T.emerald},{label:"Total Value (GHS)",value:totalValue.toLocaleString(),color:T.violet}].map(s=>(
          <Card key={s.label} dark={dark} style={{padding:"16px 18px"}}>
            <div style={{fontSize:s.label.includes("GHS")?16:24,fontWeight:800,color:s.color}}>{s.value}</div>
            <div style={{fontSize:12,color:th.textMid,marginTop:4}}>{s.label}</div>
          </Card>
        ))}
      </div>

      <Card dark={dark} style={{padding:"14px 18px",marginBottom:18}}>
        <div style={{position:"relative"}}>
          <Search size={14} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:th.textLo}}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search warranty claims..."
            style={{width:"100%",paddingLeft:32,paddingRight:12,height:36,borderRadius:8,border:`1px solid ${th.border}`,background:th.bg1,color:th.text,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
        </div>
      </Card>

      <Card dark={dark} style={{overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:dark?T.d3:T.l1}}>
                {colHdr("ID","id")}{colHdr("Asset","assetName")}{colHdr("Supplier","supplier")}
                {colHdr("Issue","issue")}{colHdr("Date Filed","date")}{colHdr("Claim Value","value")}{colHdr("Status","status")}
                <th style={{padding:"11px 14px",borderBottom:`1px solid ${th.border}`}}/>
              </tr>
            </thead>
            <tbody>
              {filtered.length===0
                ?<tr><td colSpan={8} style={{padding:"56px",textAlign:"center",color:th.textMid}}>No warranty claims found.</td></tr>
                :filtered.map(r=>(
                  <tr key={r.id} className="row-hover" style={{borderBottom:`1px solid ${th.borderLo}`}}>
                    <td style={{padding:"13px 14px"}}><span style={{fontSize:12,fontWeight:700,color:T.violet,fontFamily:"monospace"}}>{r.id}</span></td>
                    <td style={{padding:"13px 14px",maxWidth:180}}>
                      <div style={{fontSize:13,fontWeight:600,color:th.text}}>{r.assetName}</div>
                      <div style={{fontSize:11,color:th.textMid}}>{r.assetId}</div>
                    </td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.textMid,whiteSpace:"nowrap"}}>{r.supplier}</td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.text,maxWidth:200}}>{r.issue}</td>
                    <td style={{padding:"13px 14px",fontSize:12,color:th.textMid,fontFamily:"monospace",whiteSpace:"nowrap"}}>{r.date||"—"}</td>
                    <td style={{padding:"13px 14px",fontSize:13,fontWeight:600,color:th.text,fontFamily:"monospace",whiteSpace:"nowrap"}}>GHS {Number(r.value||0).toLocaleString()}</td>
                    <td style={{padding:"13px 14px"}}><WclStatusPill status={r.status}/></td>
                    <td style={{padding:"13px 14px"}}>
                      <div style={{display:"flex",gap:4}}>
                        <button onClick={()=>{setActive(r);setShowEdit(true);}} style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:th.textMid,display:"flex",alignItems:"center",justifyContent:"center"}}><Edit size={12}/></button>
                        <button onClick={()=>{setActive(r);setShowDel(true);}} style={{width:28,height:28,borderRadius:6,border:`1px solid ${th.border}`,background:"transparent",cursor:"pointer",color:`${T.rose}88`,display:"flex",alignItems:"center",justifyContent:"center"}}><Trash2 size={12}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div style={{padding:"13px 18px",borderTop:`1px solid ${th.border}`}}>
          <span style={{fontSize:12,color:th.textMid}}>Showing <strong style={{color:th.text}}>{filtered.length}</strong> of <strong style={{color:th.text}}>{rows.length}</strong> claims</span>
        </div>
      </Card>

      <WarrantyModal open={showAdd} onClose={()=>setShowAdd(false)} onSave={handleSave} dark={dark}/>
      <WarrantyModal open={showEdit} onClose={()=>setShowEdit(false)} item={active} onSave={handleSave} dark={dark}/>
      <ConfirmModal open={showDel} onClose={()=>setShowDel(false)} onConfirm={handleDel} title="Delete Claim" body={`Delete warranty claim "${active?.id}"?`} dark={dark}/>
    </div>
  );
}

/* ══════════════════════════════════  FINANCIALS / DEPRECIATION  ══════════════════════════════════ */
function FinancialsPage({ dark, toast }) {
  const th = useTheme(dark);
  const [search,setSearch] = useState("");
  const [sort,setSort] = useState({col:"cost",dir:"desc"});

  const rows = financialRows.map(r => {
    const yearsOwned = (new Date().getFullYear()) - new Date(r.acquired).getFullYear();
    const annualDep = r.method==="Straight-line" ? (r.cost - r.residual) / r.life : 0;
    const accDep = Math.min(annualDep * yearsOwned, r.cost - r.residual);
    const currentBV = Math.max(r.cost - accDep, r.residual);
    const depPct = r.cost > 0 ? Math.round((accDep / r.cost) * 100) : 0;
    return {...r, annualDep, accDep, currentBV, depPct, yearsOwned};
  });

  const totalCost = rows.reduce((s,r)=>s+r.cost,0);
  const totalBV = rows.reduce((s,r)=>s+r.currentBV,0);
  const totalDep = rows.reduce((s,r)=>s+r.accDep,0);
  const totalAnnualDep = rows.reduce((s,r)=>s+r.annualDep,0);

  const catTotals = {};
  rows.forEach(r=>{ catTotals[r.cat]=(catTotals[r.cat]||0)+r.currentBV; });
  const pieData = Object.entries(catTotals).map(([name,value])=>({name,value}));
  const PIE_COLORS = [T.sky, T.emerald, T.amber, T.violet, T.rose, "#f97316"];

  const filtered = rows.filter(r=>{
    const q=search.toLowerCase();
    return !q||r.name.toLowerCase().includes(q)||r.id.toLowerCase().includes(q)||r.cat.toLowerCase().includes(q);
  }).sort((a,b)=>{
    const av=a[sort.col], bv=b[sort.col];
    if (typeof av==="number") return sort.dir==="asc"?av-bv:bv-av;
    return sort.dir==="asc"?String(av).localeCompare(String(bv)):String(bv).localeCompare(String(av));
  });

  const colHdr=(label,col)=>(
    <th onClick={()=>setSort(s=>({col,dir:s.col===col&&s.dir==="asc"?"desc":"asc"}))}
      style={{padding:"11px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:th.textLo,textTransform:"uppercase",letterSpacing:0.8,borderBottom:`1px solid ${th.border}`,cursor:"pointer",userSelect:"none",whiteSpace:"nowrap"}}>
      <span style={{display:"inline-flex",alignItems:"center",gap:4}}>{label}
        {sort.col===col?(sort.dir==="asc"?<ArrowUp size={10}/>:<ArrowDown size={10}/>):<ArrowUp size={10} style={{opacity:0.2}}/>}
      </span>
    </th>
  );

  const exportCSV = () => {
    const h="ID,Asset Name,Category,Acquisition Cost,Acquired,Useful Life,Method,Residual,Annual Depreciation,Book Value,Depreciated %\n";
    const body=filtered.map(r=>[r.id,`"${r.name}"`,r.cat,r.cost,r.acquired,r.life,r.method,r.residual,r.annualDep.toFixed(0),r.currentBV.toFixed(0),r.depPct+"%"].join(",")).join("\n");
    const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([h+body],{type:"text/csv"})); a.download="financials.csv"; a.click();
  };

  const fmt = n => n>=1000000?`GHS ${(n/1000000).toFixed(2)}M`:n>=1000?`GHS ${(n/1000).toFixed(0)}k`:`GHS ${n.toLocaleString()}`;

  return (
    <div style={{padding:"28px 32px",background:th.bg,minHeight:"100vh"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:22,fontWeight:800,color:th.text,letterSpacing:-0.5}}>Financials & Depreciation</div>
          <div style={{fontSize:13,color:th.textMid,marginTop:2}}>Asset valuations, depreciation schedules, and book values</div>
        </div>
        <ExportBtns dark={dark} title="Financials & Depreciation" subtitle="Asset valuations and depreciation schedules" filename="GRIDCo_Financials"
          columns={[{label:"ID",key:"id"},{label:"Asset Name",key:"name"},{label:"Category",key:"cat"},{label:"Acquisition Cost (GHS)",get:r=>r.cost.toLocaleString()},{label:"Acquired",key:"acquired"},{label:"Useful Life (yrs)",key:"life"},{label:"Method",key:"method"},{label:"Residual (GHS)",get:r=>r.residual.toLocaleString()},{label:"Annual Depreciation (GHS)",get:r=>Math.round(r.annualDep).toLocaleString()},{label:"Book Value (GHS)",get:r=>Math.round(r.currentBV).toLocaleString()},{label:"Depreciated %",get:r=>`${r.depPct}%`}]}
          rows={filtered}/>
      </div>

      {/* Summary Cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14,marginBottom:24}}>
        {[
          {label:"Total Acquisition Cost",value:fmt(totalCost),color:th.text,sub:"Original purchase value"},
          {label:"Total Book Value",value:fmt(totalBV),color:T.emerald,sub:"Current net asset value"},
          {label:"Total Depreciation",value:fmt(totalDep),color:T.amber,sub:"Accumulated to date"},
          {label:"Annual Depreciation",value:fmt(totalAnnualDep),color:T.sky,sub:"Charged per year"},
        ].map(s=>(
          <Card key={s.label} dark={dark} style={{padding:"18px 20px"}}>
            <div style={{fontSize:10,fontWeight:700,color:th.textLo,textTransform:"uppercase",letterSpacing:0.8,marginBottom:8}}>{s.label}</div>
            <div style={{fontSize:20,fontWeight:800,color:s.color,marginBottom:4}}>{s.value}</div>
            <div style={{fontSize:11,color:th.textLo}}>{s.sub}</div>
          </Card>
        ))}
      </div>

      {/* Chart + Category breakdown */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:14,marginBottom:24}}>
        <Card dark={dark} style={{padding:"20px"}}>
          <div style={{fontSize:13,fontWeight:700,color:th.text,marginBottom:16}}>Book Value vs Acquisition Cost by Asset</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={rows} margin={{top:0,right:0,left:10,bottom:40}}>
              <CartesianGrid strokeDasharray="3 3" stroke={th.border} vertical={false}/>
              <XAxis dataKey="id" tick={{fill:th.textMid,fontSize:10}} angle={-35} textAnchor="end"/>
              <YAxis tick={{fill:th.textMid,fontSize:10}} tickFormatter={v=>v>=1000000?`${(v/1000000).toFixed(1)}M`:v>=1000?`${(v/1000).toFixed(0)}k`:v}/>
              <Tooltip formatter={(v,n)=>[`GHS ${Number(v).toLocaleString()}`,n==="currentBV"?"Book Value":"Acquisition Cost"]} contentStyle={{background:th.card,border:`1px solid ${th.border}`,borderRadius:8,fontSize:12}}/>
              <Bar dataKey="cost" fill={`${T.sky}40`} radius={[4,4,0,0]} name="Acquisition Cost"/>
              <Bar dataKey="currentBV" fill={T.emerald} radius={[4,4,0,0]} name="Book Value"/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card dark={dark} style={{padding:"20px"}}>
          <div style={{fontSize:13,fontWeight:700,color:th.text,marginBottom:12}}>Book Value by Category</div>
          <ResponsiveContainer width="100%" height={160}>
            <RPie>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                {pieData.map((_,i)=><Cell key={i} fill={PIE_COLORS[i%PIE_COLORS.length]}/>)}
              </Pie>
              <Tooltip formatter={v=>`GHS ${Number(v).toLocaleString()}`} contentStyle={{background:th.card,border:`1px solid ${th.border}`,borderRadius:8,fontSize:12}}/>
            </RPie>
          </ResponsiveContainer>
          <div style={{marginTop:8}}>
            {pieData.map((d,i)=>(
              <div key={d.name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"3px 0",borderBottom:`1px solid ${th.borderLo}`}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{width:8,height:8,borderRadius:2,background:PIE_COLORS[i%PIE_COLORS.length],flexShrink:0}}/>
                  <span style={{fontSize:11,color:th.textMid}}>{d.name}</span>
                </div>
                <span style={{fontSize:11,fontWeight:700,color:th.text}}>GHS {(d.value/1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card dark={dark} style={{padding:"14px 18px",marginBottom:14}}>
        <div style={{position:"relative"}}>
          <Search size={14} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:th.textLo}}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search assets..."
            style={{width:"100%",paddingLeft:32,paddingRight:12,height:36,borderRadius:8,border:`1px solid ${th.border}`,background:th.bg1,color:th.text,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
        </div>
      </Card>
      <Card dark={dark} style={{overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:dark?T.d3:T.l1}}>
                {colHdr("ID","id")}{colHdr("Asset Name","name")}{colHdr("Category","cat")}
                {colHdr("Acq. Cost","cost")}{colHdr("Life (yrs)","life")}{colHdr("Annual Dep.","annualDep")}
                {colHdr("Book Value","currentBV")}{colHdr("Dep. %","depPct")}
              </tr>
            </thead>
            <tbody>
              {filtered.map(r=>(
                <tr key={r.id} className="row-hover" style={{borderBottom:`1px solid ${th.borderLo}`}}>
                  <td style={{padding:"13px 14px"}}><span style={{fontSize:12,fontWeight:700,color:T.sky,fontFamily:"monospace"}}>{r.id}</span></td>
                  <td style={{padding:"13px 14px",maxWidth:220}}>
                    <div style={{fontSize:13,fontWeight:600,color:th.text}}>{r.name}</div>
                    <div style={{fontSize:11,color:th.textMid}}>{r.method} · Acquired {r.acquired}</div>
                  </td>
                  <td style={{padding:"13px 14px",fontSize:12,color:th.textMid,whiteSpace:"nowrap"}}>{r.cat}</td>
                  <td style={{padding:"13px 14px",fontSize:12,color:th.text,fontFamily:"monospace",whiteSpace:"nowrap"}}>GHS {r.cost.toLocaleString()}</td>
                  <td style={{padding:"13px 14px",fontSize:12,color:th.textMid,textAlign:"center"}}>{r.life}</td>
                  <td style={{padding:"13px 14px",fontSize:12,color:T.amber,fontFamily:"monospace",whiteSpace:"nowrap"}}>GHS {r.annualDep.toLocaleString("en-GH",{maximumFractionDigits:0})}</td>
                  <td style={{padding:"13px 14px",fontSize:13,fontWeight:700,color:T.emerald,fontFamily:"monospace",whiteSpace:"nowrap"}}>GHS {Math.round(r.currentBV).toLocaleString()}</td>
                  <td style={{padding:"13px 14px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{flex:1,height:6,borderRadius:3,background:dark?T.d3:T.l2,overflow:"hidden",minWidth:60}}>
                        <div style={{height:"100%",borderRadius:3,background:r.depPct>75?T.rose:r.depPct>50?T.amber:T.sky,width:`${r.depPct}%`,transition:"width 0.3s"}}/>
                      </div>
                      <span style={{fontSize:11,fontWeight:700,color:th.textMid,minWidth:28}}>{r.depPct}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{padding:"13px 18px",borderTop:`1px solid ${th.border}`}}>
          <span style={{fontSize:12,color:th.textMid}}>
            {filtered.length} assets · Total book value: <strong style={{color:T.emerald}}>GHS {Math.round(totalBV).toLocaleString()}</strong> · Annual depreciation: <strong style={{color:T.amber}}>GHS {Math.round(totalAnnualDep).toLocaleString()}</strong>
          </span>
        </div>
      </Card>
    </div>
  );
}

/* ══════════════════════════════════  AUDIT LOG  ══════════════════════════════════ */
function AuditLogPage({ dark }) {
  const th = useTheme(dark);
  const [search,setSearch] = useState("");
  const [moduleF,setModuleF] = useState("All");
  const [actionF,setActionF] = useState("All");

  const actionColor = { Create:T.emerald, Update:T.amber, Delete:T.rose, Approve:T.sky, Reject:T.rose };
  const actionBg = { Create:`${T.emerald}18`, Update:`${T.amber}18`, Delete:`${T.rose}18`, Approve:`${T.sky}18`, Reject:`${T.rose}18` };

  const modules = ["All",...new Set(auditLogRows.map(r=>r.module))];
  const actions = ["All",...new Set(auditLogRows.map(r=>r.action))];

  const filtered = auditLogRows.filter(r=>{
    const q=search.toLowerCase();
    const m=!q||r.user.toLowerCase().includes(q)||r.desc.toLowerCase().includes(q)||r.record.toLowerCase().includes(q)||r.module.toLowerCase().includes(q);
    return m&&(moduleF==="All"||r.module===moduleF)&&(actionF==="All"||r.action===actionF);
  });

  return (
    <div style={{padding:"28px 32px",background:th.bg,minHeight:"100vh"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:22,fontWeight:800,color:th.text,letterSpacing:-0.5}}>Audit Log</div>
          <div style={{fontSize:13,color:th.textMid,marginTop:2}}>Immutable record of all system actions and changes</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"6px 14px",borderRadius:8,background:dark?`${T.emerald}18`:`${T.emerald}10`,border:`1px solid ${T.emerald}30`}}>
            <Shield size={14} color={T.emerald}/>
            <span style={{fontSize:12,fontWeight:600,color:T.emerald}}>Tamper-evident — read only</span>
          </div>
          <ExportBtns dark={dark} title="Audit Log" subtitle="Immutable record of all system actions and changes" filename="GRIDCo_AuditLog"
            columns={[{label:"Timestamp",key:"ts"},{label:"User",key:"user"},{label:"Role",key:"role"},{label:"Module",key:"module"},{label:"Action",key:"action"},{label:"Record",key:"record"},{label:"Description",key:"desc"}]}
            rows={filtered}/>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:14,marginBottom:24}}>
        {[
          {label:"Total Events",value:auditLogRows.length,color:th.text},
          {label:"Creates",value:auditLogRows.filter(r=>r.action==="Create").length,color:T.emerald},
          {label:"Updates",value:auditLogRows.filter(r=>r.action==="Update").length,color:T.amber},
          {label:"Approvals",value:auditLogRows.filter(r=>r.action==="Approve").length,color:T.sky},
          {label:"Users",value:new Set(auditLogRows.map(r=>r.user)).size,color:T.violet},
        ].map(s=>(
          <Card key={s.label} dark={dark} style={{padding:"14px 16px"}}>
            <div style={{fontSize:22,fontWeight:800,color:s.color}}>{s.value}</div>
            <div style={{fontSize:11,color:th.textMid,marginTop:3}}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card dark={dark} style={{padding:"14px 18px",marginBottom:18,display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{position:"relative",flex:1,minWidth:200}}>
          <Search size={14} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:th.textLo}}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search log entries..."
            style={{width:"100%",paddingLeft:32,paddingRight:12,height:36,borderRadius:8,border:`1px solid ${th.border}`,background:th.bg1,color:th.text,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
        </div>
        <select value={moduleF} onChange={e=>setModuleF(e.target.value)} style={{height:36,padding:"0 10px",borderRadius:8,border:`1px solid ${th.border}`,background:th.bg1,color:th.text,fontSize:13,outline:"none",cursor:"pointer"}}>
          {modules.map(m=><option key={m} value={m}>{m==="All"?"All Modules":m}</option>)}
        </select>
        <select value={actionF} onChange={e=>setActionF(e.target.value)} style={{height:36,padding:"0 10px",borderRadius:8,border:`1px solid ${th.border}`,background:th.bg1,color:th.text,fontSize:13,outline:"none",cursor:"pointer"}}>
          {actions.map(a=><option key={a} value={a}>{a==="All"?"All Actions":a}</option>)}
        </select>
      </Card>

      {/* Log Entries */}
      <Card dark={dark} style={{overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:dark?T.d3:T.l1}}>
                {["Timestamp","User / Role","Module","Action","Record","Description"].map(h=>(
                  <th key={h} style={{padding:"11px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:th.textLo,textTransform:"uppercase",letterSpacing:0.8,borderBottom:`1px solid ${th.border}`,whiteSpace:"nowrap"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length===0
                ?<tr><td colSpan={6} style={{padding:"56px",textAlign:"center",color:th.textMid}}>No log entries match your filters.</td></tr>
                :filtered.map(r=>(
                  <tr key={r.id} className="row-hover" style={{borderBottom:`1px solid ${th.borderLo}`}}>
                    <td style={{padding:"12px 14px",fontSize:11,color:th.textMid,fontFamily:"monospace",whiteSpace:"nowrap"}}>{r.ts}</td>
                    <td style={{padding:"12px 14px"}}>
                      <div style={{fontSize:12,fontWeight:600,color:th.text,whiteSpace:"nowrap"}}>{r.user}</div>
                      <div style={{fontSize:10,color:th.textLo,marginTop:1}}>{r.role}</div>
                    </td>
                    <td style={{padding:"12px 14px",fontSize:12,color:th.textMid,whiteSpace:"nowrap"}}>{r.module}</td>
                    <td style={{padding:"12px 14px"}}>
                      <span style={{padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:700,background:actionBg[r.action]||"#94a3b818",color:actionColor[r.action]||th.textMid,whiteSpace:"nowrap"}}>{r.action}</span>
                    </td>
                    <td style={{padding:"12px 14px"}}>
                      <span style={{fontSize:11,fontWeight:700,color:T.sky,fontFamily:"monospace"}}>{r.record}</span>
                    </td>
                    <td style={{padding:"12px 14px",fontSize:12,color:th.text,maxWidth:340}}>{r.desc}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div style={{padding:"13px 18px",borderTop:`1px solid ${th.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:12,color:th.textMid}}>Showing <strong style={{color:th.text}}>{filtered.length}</strong> of <strong style={{color:th.text}}>{auditLogRows.length}</strong> log entries</span>
          <span style={{fontSize:11,color:th.textLo}}>Entries are append-only and cannot be edited or deleted</span>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════  PLACEHOLDER  */
function PlaceholderPage({ label, dark }) {
  const th = useTheme(dark);
  return (
    <div style={{ background:th.bg, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:16 }}>
      <div style={{ width:64, height:64, borderRadius:16, background:th.card, border:`1px solid ${th.border}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <Package size={28} color={th.textLo}/>
      </div>
      <div style={{ fontSize:18, fontWeight:800, color:th.text }}>{label}</div>
      <div style={{ fontSize:13, color:th.textMid }}>This module is in your deployment package</div>
      <PrimaryBtn>Request early access</PrimaryBtn>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════  ROOT APP  */
export default function App() {
  const bp = useBreakpoint();
  const mobile = bp === "mobile";
  const tablet = bp === "tablet";
  const [loggedIn, setLoggedIn] = useState(false);
  const [dark, setDark] = useState(true);
  const [adminProfile, setAdminProfile] = useState({name:"Prince Amoako Bannerman",initials:"PB"});
  const [page, setPage] = useState("dashboard");
  const [sideOpen, setSideOpen] = useState(bp === "desktop");
  const [notifPanel, setNotifPanel] = useState(false);
  const [profilePanel, setProfilePanel] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState("");
  const unread = notifs.filter(n=>!n.read).length;
  const {toasts, toast} = useToast();

  useEffect(() => {
    if (mobile) setSideOpen(false);
    if (tablet) setSideOpen(false);
  }, [bp]);

  useEffect(()=>{
    const handler = e => { if (e.key==="k"&&(e.metaKey||e.ctrlKey)) { e.preventDefault(); setCmdOpen(o=>!o); }};
    window.addEventListener("keydown", handler);
    return ()=>window.removeEventListener("keydown",handler);
  },[]);

  if (!loggedIn) return <><style>{css}</style><LoginPage onLogin={()=>setLoggedIn(true)}/></>;

  const th = useTheme(dark);

  const pageMap = {
    dashboard:     <Dashboard       dark={dark} setPage={setPage} toast={toast}/>,
    assets:        <AssetsPage      dark={dark} toast={toast}/>,
    maintenance:   <MaintenancePage  dark={dark} toast={toast}/>,
    assignments:   <AssignmentsPage dark={dark} toast={toast}/>,
    employees:     <EmployeesPage    dark={dark} toast={toast}/>,
    departments:   <DepartmentsPage dark={dark} toast={toast}/>,
    suppliers:     <SuppliersPage   dark={dark} toast={toast}/>,
    locations:     <LocationsPage   dark={dark} toast={toast}/>,
    reports:       <ReportsPage     dark={dark} toast={toast}/>,
    notifications: <NotificationsPage dark={dark}/>,
    settings:      <SettingsPage    dark={dark} onToggleDark={()=>setDark(d=>!d)} toast={toast} onAdminUpdate={setAdminProfile}/>,
    workorders:    <WorkOrdersPage  dark={dark} toast={toast}/>,
    requests:      <RequestsPage    dark={dark} toast={toast}/>,
    incidents:     <IncidentsPage   dark={dark} toast={toast}/>,
    inventory:     <InventoryPage   dark={dark} toast={toast}/>,
    compliance:    <CompliancePage  dark={dark} toast={toast}/>,
    disposal:      <DisposalPage    dark={dark} toast={toast}/>,
    warranty:      <WarrantyPage    dark={dark} toast={toast}/>,
    financials:    <FinancialsPage  dark={dark} toast={toast}/>,
    auditlogs:     <AuditLogPage    dark={dark}/>,
  };
  const pageEl = pageMap[page] || <PlaceholderPage label={navItems.find(n=>n.id===page)?.label||page} dark={dark}/>;

  const sections = [
    { id:"main",    label:"Operations",  items: navItems.filter(n=>n.section==="main")    },
    { id:"manage",  label:"Manage",      items: navItems.filter(n=>n.section==="manage")  },
    { id:"insights",label:"Insights",    items: navItems.filter(n=>n.section==="insights")},
    { id:"system",  label:"System",      items: navItems.filter(n=>n.section==="system")  },
  ];

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden", background:th.bg }}>
      <style>{css}</style>

      {/* Mobile overlay backdrop */}
      {mobile && sideOpen && (
        <div onClick={()=>setSideOpen(false)} style={{
          position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", zIndex:19,
          backdropFilter:"blur(2px)"
        }}/>
      )}

      {/* ── SIDEBAR ───────────────────────────────────────────── */}
      <aside style={{
        width: mobile
          ? (sideOpen ? 232 : 0)           // mobile: off-canvas overlay
          : (sideOpen ? 232 : 60),          // tablet/desktop: icon-only collapse
        flexShrink:0,
        background: dark ? T.d1 : T.lcard,
        borderRight:`1px solid ${th.border}`,
        display:"flex", flexDirection:"column",
        transition:"width 0.22s cubic-bezier(0.4,0,0.2,1)",
        overflow:"hidden", zIndex:20,
        ...(mobile ? { position:"fixed", top:0, left:0, height:"100vh" } : {})
      }}>
        {/* Logo */}
        <div style={{ height:58, display:"flex", alignItems:"center", padding: sideOpen ? "0 16px" : "0 8px",
          borderBottom:`1px solid ${th.border}`, flexShrink:0, justifyContent: sideOpen ? "flex-start" : "center" }}>
          {sideOpen ? (
            <div style={{ background:"#fff", borderRadius:8, padding:"4px 10px", display:"inline-flex", alignItems:"center" }}>
              <img src="/gridco-logo.png" alt="GRIDCo" style={{ height:26, width:"auto", display:"block" }}/>
            </div>
          ) : (
            <div style={{ width:36, height:36, borderRadius:8, background:"#fff",
              overflow:"hidden", flexShrink:0, display:"flex", alignItems:"center" }}>
              <img src="/gridco-logo.png" alt="GRIDCo" style={{ height:30, width:"auto", flexShrink:0 }}/>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex:1, overflowY:"auto", overflowX:"hidden", padding:"8px 6px" }}>
          {sections.map(sec=>(
            <div key={sec.id} style={{ marginBottom:4 }}>
              {sideOpen && (
                <div style={{ fontSize:9, fontWeight:800, color:th.textLo, textTransform:"uppercase",
                  letterSpacing:1.2, padding:"10px 10px 5px" }}>{sec.label}</div>
              )}
              {sec.items.map(item=>{
                const Icon=item.icon;
                const active=page===item.id;
                const hasAlert=item.id==="notifications"&&unread>0;
                return (
                  <button key={item.id} onClick={()=>{ setPage(item.id); if(mobile) setSideOpen(false); }} style={{
                    width:"100%", display:"flex", alignItems:"center",
                    gap: sideOpen ? 10 : 0, justifyContent: sideOpen ? "flex-start" : "center",
                    padding: sideOpen ? "8px 10px" : "9px 0",
                    borderRadius:9, border:"none", cursor:"pointer", textAlign:"left", marginBottom:1,
                    background: active ? (dark?`${T.sky}18`:`${T.sky}12`) : "transparent",
                    color: active ? T.sky : th.textMid,
                    fontSize:13, fontWeight:active?700:500, transition:"all 0.13s",
                    position:"relative", whiteSpace:"nowrap"
                  }}
                  onMouseEnter={e=>{ if(!active){ e.currentTarget.style.background=dark?`rgba(255,255,255,0.04)`:`rgba(14,165,233,0.06)`; e.currentTarget.style.color=th.text; }}}
                  onMouseLeave={e=>{ if(!active){ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=th.textMid; }}}>
                    {active && <div style={{ position:"absolute", left:0, top:6, bottom:6, width:3, borderRadius:2, background:T.sky }}/>}
                    <div style={{ position:"relative", flexShrink:0 }}>
                      <Icon size={15}/>
                      {hasAlert && <div style={{ position:"absolute",top:-3,right:-3,width:6,height:6,borderRadius:"50%",background:T.rose,border:`1.5px solid ${dark?T.d1:T.lcard}` }}/>}
                    </div>
                    {sideOpen && <span>{item.label}</span>}
                    {sideOpen && hasAlert && (
                      <span style={{ marginLeft:"auto",fontSize:10,fontWeight:800,color:"#fff",background:T.rose,
                        padding:"1px 6px",borderRadius:10,fontFamily:"'JetBrains Mono',monospace" }}>{unread}</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: sideOpen ? "12px 12px" : "12px 6px", borderTop:`1px solid ${th.border}`, flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, justifyContent: sideOpen ? "flex-start" : "center" }}>
            <Av initials={adminProfile.initials} size={32} color={T.sky}/>
            {sideOpen && (
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12,fontWeight:700,color:th.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{adminProfile.name}</div>
                <div style={{ fontSize:10,color:th.textLo }}>Administrator</div>
              </div>
            )}
            {sideOpen && (
              <button onClick={()=>setLoggedIn(false)} style={{ background:"none",border:"none",cursor:"pointer",color:th.textLo,display:"flex",padding:4,borderRadius:6,transition:"color 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.color=T.rose}
                onMouseLeave={e=>e.currentTarget.style.color=th.textLo}>
                <LogOut size={13}/>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ── MAIN ──────────────────────────────────────────────── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

        {/* Header */}
        <header style={{
          height:58, background:dark?T.d1:T.lcard, borderBottom:`1px solid ${th.border}`,
          display:"flex", alignItems:"center", padding:"0 24px", gap:12, flexShrink:0,
          backdropFilter:"blur(8px)"
        }}>
          <button onClick={()=>setSideOpen(o=>!o)} style={{
            width:34,height:34,borderRadius:8,border:`1px solid ${th.border}`,
            background:"transparent",cursor:"pointer",color:th.textMid,
            display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"
          }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=T.sky;e.currentTarget.style.color=T.sky;}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.color=th.textMid;}}>
            <Menu size={15}/>
          </button>

          {/* Breadcrumb */}
          <div style={{ display:"flex",alignItems:"center",gap:5,fontSize:13 }}>
            <span style={{ color:th.textLo }}>GRIDCo</span>
            <ChevronRight size={11} color={th.textLo}/>
            <span style={{ color:th.text,fontWeight:700 }}>{navItems.find(n=>n.id===page)?.label||"Dashboard"}</span>
          </div>

          {/* Command palette trigger */}
          <button className="header-search" onClick={()=>setCmdOpen(true)} style={{
            display:"flex",alignItems:"center",gap:10,padding:"7px 14px",
            borderRadius:9,border:`1px solid ${th.border}`,background:dark?T.d2:T.l1,
            color:th.textLo,fontSize:12,cursor:"pointer",width:220,textAlign:"left",
            transition:"all 0.15s"
          }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=T.sky;}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;}}>
            <Search size={13}/>
            <span style={{ flex:1 }}>Search everything…</span>
            <kbd style={{ fontSize:10,color:th.textLo,background:th.bg2,borderRadius:4,padding:"1px 5px",border:`1px solid ${th.border}`,fontFamily:"'JetBrains Mono',monospace" }}>⌘K</kbd>
          </button>

          <div style={{ flex:1 }}/>

          {/* Live status pill */}
          <div className="header-status" style={{ display:"flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:20,
            background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.2)" }}>
            <div style={{ width:6,height:6,borderRadius:"50%",background:T.emerald,animation:"pulse-ring 2s ease-out infinite" }}/>
            <span style={{ fontSize:11,color:T.emerald,fontWeight:700,letterSpacing:0.3 }}>All systems operational</span>
          </div>

          {/* Dark toggle */}
          <button onClick={()=>setDark(d=>!d)} style={{
            width:34,height:34,borderRadius:8,border:`1px solid ${th.border}`,
            background:"transparent",cursor:"pointer",color:th.textMid,
            display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"
          }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=T.sky;e.currentTarget.style.color=T.sky;}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.color=th.textMid;}}>
            {dark?<Sun size={15}/>:<Moon size={15}/>}
          </button>

          {/* Bell */}
          <div style={{ position:"relative" }}>
            <button onClick={()=>{setNotifPanel(o=>!o);setProfilePanel(false);}} style={{
              width:34,height:34,borderRadius:8,border:`1px solid ${notifPanel?T.sky:th.border}`,
              background:notifPanel?`${T.sky}10`:"transparent",cursor:"pointer",color:notifPanel?T.sky:th.textMid,
              display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",position:"relative"
            }}>
              <Bell size={15}/>
              {unread>0&&<span style={{ position:"absolute",top:5,right:5,width:7,height:7,borderRadius:"50%",background:T.rose,border:`1.5px solid ${dark?T.d1:T.lcard}` }}/>}
            </button>
            {notifPanel&&(
              <div style={{ position:"absolute",right:0,top:"calc(100% + 8px)",width:360,
                background:dark?T.d2:T.lcard,border:`1px solid ${th.border}`,borderRadius:16,
                boxShadow:"0 16px 48px rgba(0,0,0,0.35)",zIndex:200,overflow:"hidden" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",borderBottom:`1px solid ${th.border}` }}>
                  <span style={{ fontWeight:700,fontSize:14,color:th.text }}>Notifications</span>
                  <div style={{ display:"flex",gap:8 }}>
                    {unread>0&&<span style={{ fontSize:10,fontWeight:800,color:"#fff",background:T.rose,padding:"2px 7px",borderRadius:10 }}>{unread} new</span>}
                    <button style={{ fontSize:11,color:T.sky,background:"none",border:"none",cursor:"pointer",fontWeight:600 }} onClick={()=>setPage("notifications")}>View all</button>
                  </div>
                </div>
                {notifs.slice(0,5).map((n,i)=>{
                  const lcfg={critical:T.rose,warning:T.amber,info:T.sky,success:T.emerald};
                  return (
                    <div key={n.id} style={{ padding:"12px 18px",borderBottom:i<4?`1px solid ${th.borderLo}`:"none",
                      display:"flex",gap:10,opacity:n.read?0.65:1,cursor:"pointer" }}
                      onMouseEnter={e=>e.currentTarget.style.background=dark?`${T.sky}08`:`${T.sky}05`}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <div style={{ width:7,height:7,borderRadius:"50%",background:lcfg[n.type],marginTop:6,flexShrink:0 }}/>
                      <div style={{ flex:1,minWidth:0 }}>
                        <div style={{ fontSize:12,fontWeight:600,color:th.text }}>{n.title}</div>
                        <div style={{ fontSize:11,color:th.textMid,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{n.body}</div>
                      </div>
                      <span style={{ fontSize:10,color:th.textLo,whiteSpace:"nowrap",fontFamily:"'JetBrains Mono',monospace",marginTop:2 }}>{n.time}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Profile */}
          <div style={{ position:"relative" }}>
            <button onClick={()=>{setProfilePanel(o=>!o);setNotifPanel(false);}} style={{
              display:"flex",alignItems:"center",gap:8,padding:"4px 10px 4px 4px",
              borderRadius:10,border:`1px solid ${profilePanel?T.sky:th.border}`,
              background:profilePanel?`${T.sky}08`:"transparent",cursor:"pointer",transition:"all 0.15s"
            }}>
              <Av initials={adminProfile.initials} size={28} color={T.sky}/>
              <div style={{ textAlign:"left" }}>
                <div style={{ fontSize:12,fontWeight:700,color:th.text }}>{adminProfile.name}</div>
                <div style={{ fontSize:10,color:th.textLo }}>Administrator</div>
              </div>
              <ChevronDown size={11} color={th.textLo}/>
            </button>
            {profilePanel&&(
              <div style={{ position:"absolute",right:0,top:"calc(100% + 8px)",width:200,
                background:dark?T.d2:T.lcard,border:`1px solid ${th.border}`,borderRadius:12,
                boxShadow:"0 8px 32px rgba(0,0,0,0.3)",zIndex:200,overflow:"hidden" }}>
                {[{l:"My Profile",i:User},{l:"Settings",i:Settings},{l:"Sign out",i:LogOut,danger:true}].map((m,i)=>{
                  const Ic=m.i;
                  return (
                    <button key={m.l} onClick={()=>{
                      if(m.l==="Sign out")setLoggedIn(false);
                      if(m.l==="Settings")setPage("settings");
                      setProfilePanel(false);
                    }} style={{
                      width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 14px",
                      background:"transparent",border:"none",color:m.danger?T.rose:th.textMid,
                      fontSize:13,cursor:"pointer",textAlign:"left",
                      borderTop:i>0?`1px solid ${th.borderLo}`:"none",
                      transition:"all 0.12s"
                    }}
                    onMouseEnter={e=>{e.currentTarget.style.background=dark?`rgba(255,255,255,0.04)`:`rgba(0,0,0,0.03)`;e.currentTarget.style.color=m.danger?T.rose:th.text;}}
                    onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=m.danger?T.rose:th.textMid;}}>
                      <Ic size={13}/>{m.l}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </header>

        {/* Page */}
        <main style={{ flex:1,overflowY:"auto" }} onClick={()=>{setNotifPanel(false);setProfilePanel(false);}}>
          {pageEl}
        </main>
      </div>

      <ToastStack toasts={toasts}/>

      {/* ── COMMAND PALETTE ───────────────────────────────────── */}
      {cmdOpen&&(
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:500,
          display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"15vh 20px" }}
          onClick={()=>setCmdOpen(false)}>
          <div style={{ width:"100%",maxWidth:580,background:dark?T.d2:T.lcard,
            border:`1px solid ${th.border}`,borderRadius:16,
            boxShadow:"0 24px 64px rgba(0,0,0,0.5)",overflow:"hidden" }}
            onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:`1px solid ${th.border}` }}>
              <Search size={16} color={th.textLo}/>
              <input autoFocus value={cmdQuery} onChange={e=>setCmdQuery(e.target.value)}
                placeholder="Search assets, employees, reports…"
                style={{ flex:1,border:"none",background:"transparent",fontSize:14,color:th.text }}/>
              <kbd onClick={()=>setCmdOpen(false)} style={{ fontSize:10,color:th.textLo,background:th.bg1,borderRadius:5,
                padding:"2px 7px",border:`1px solid ${th.border}`,cursor:"pointer",fontFamily:"'JetBrains Mono',monospace" }}>ESC</kbd>
            </div>
            <div style={{ padding:"8px 8px" }}>
              {[
                {g:"Pages", items:navItems.map(n=>({l:n.label,fn:()=>{setPage(n.id);setCmdOpen(false);},i:n.icon}))},
                {g:"Quick actions", items:[
                  {l:"Register new asset",   i:Plus,       fn:()=>setCmdOpen(false)},
                  {l:"Schedule maintenance", i:Wrench,     fn:()=>{setPage("maintenance");setCmdOpen(false);}},
                  {l:"Export Q2 report",     i:Download,   fn:()=>setCmdOpen(false)},
                  {l:"View audit log",       i:ClipboardList,fn:()=>{setPage("auditlogs");setCmdOpen(false);}},
                ]},
              ].map(group=>{
                const filtered2=group.items.filter(x=>!cmdQuery||x.l.toLowerCase().includes(cmdQuery.toLowerCase()));
                if(!filtered2.length) return null;
                return (
                  <div key={group.g} style={{ marginBottom:4 }}>
                    <div style={{ fontSize:10,fontWeight:800,color:th.textLo,textTransform:"uppercase",letterSpacing:1.2,padding:"8px 10px 4px" }}>{group.g}</div>
                    {filtered2.slice(0,6).map(item=>{
                      const Ic=item.i;
                      return (
                        <button key={item.l} onClick={item.fn} style={{
                          width:"100%",display:"flex",alignItems:"center",gap:10,padding:"9px 10px",
                          borderRadius:8,border:"none",background:"transparent",color:th.textMid,
                          fontSize:13,cursor:"pointer",textAlign:"left",transition:"all 0.12s"
                        }}
                        onMouseEnter={e=>{e.currentTarget.style.background=`${T.sky}12`;e.currentTarget.style.color=T.sky;}}
                        onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=th.textMid;}}>
                          <Ic size={14}/>{item.l}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
