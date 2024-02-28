import { useEffect, useState, PureComponent } from "react";
import papa from "papaparse";
import "./App.css";
import type { CrashData, PieDataRow } from "./types";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

import CrashChart from "./TownGraph";



const App = () => {
  const [csvData, setCsvData] = useState<CrashData[]>([]);
  const [pieData, setPieData] = useState<PieDataRow[]>([]);
  const [filteredData, setFilteredData] = useState<CrashData[]>([]);
  const csvFileUrl = "/data/busReport.csv";

  const getData = async () => {
    let response = await fetch(csvFileUrl);
    let text = await response.text();
    let parsed = await papa.parse<CrashData>(text, { header: true });
    console.log("Successfully parsed data:", parsed); // Log to make it easy to inspect shape of our data in the inspector
    setCsvData(parsed.data.filter((row) => row["City Town Name"])); // Only keep rows that have a name, so we avoid blank row at end of file
    setFilteredData(parsed.data.filter((row)=>row["City Town Name"][0] === 'T')) // starts with W
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // Update whenever data changes...
    let newPieCounts: { [key: string]: number } = {};
    let newPieData: PieDataRow[] = [];
    filteredData.forEach((row) => {
      if (!newPieCounts[row["City Town Name"]]) {
        newPieCounts[row["City Town Name"]] = 0; // initialize if not there...
      }
      newPieCounts[row["City Town Name"]]++; // Add one!
    });
    for (let key in newPieCounts) {
      newPieData.push({ name: key, crashes: newPieCounts[key] });
    }
    setPieData(newPieData);
    console.log("Set new pie data!", newPieData);
  }, [filteredData]);

  const barnstableCounty = [
    "BARNSTABLE", "BOURNE", "BREWSTER", "CHATHAM", "DENNIS", "EASTHAM",
    "FALMOUTH", "HARWICH", "MASHPEE", "ORLEANS", "PROVINCETOWN", "SANDWICH",
    "TRURO", "WELLFLEET", "YARMOUTH"
  ];
  
  const berkshireCounty = [
    "ADAMS", "ALFORD", "BECKET", "CHESHIRE", "CLARKSBURG", "DALTON", "EGREMONT",
    "FLORIDA", "GREAT BARRINGTON", "HANCOCK", "HINSDALE", "LANESBOROUGH", "LEE",
    "LENOX", "MONTEREY", "MT. WASHINGTON", "NEW ASHFORD", "NEW MARLBOROUGH",
    "NORTH ADAMS", "OTIS", "PERU", "PITTSFIELD", "RICHMOND", "SANDISFIELD",
    "SAVOY", "SHEFFIELD", "STOCKBRIDGE", "TYRINGHAM", "WASHINGTON",
    "WEST STOCKBRIDGE", "WILLIAMSTOWN", "WINDSOR"
  ];
  
  const bristolCounty = [
    "ACUSHNET", "ATTLEBORO", "BERKLEY", "DARTMOUTH", "DIGHTON", "EASTON",
    "FAIRHAVEN", "FALL RIVER", "FREETOWN", "MANSFIELD", "NEW BEDFORD",
    "NORTH ATTLEBOROUGH", "NORTON", "RAYNHAM", "REHOBOTH", "SEEKONK",
    "SOMERSET", "SWANSEA", "TAUNTON", "WESTPORT"
  ];
  
  const dukesCounty = [
    "AQUINNAH", "CHILMARK", "EDGARTOWN", "GOSNOLD", "OAK BLUFFS",
    "TISBURY", "WEST TISBURY"
  ];
  
  const essexCounty = [
    "AMESBURY", "ANDOVER", "BEVERLY", "BOXFORD", "DANVERS", "ESSEX",
    "GEORGETOWN", "GLOUCESTER", "GROVELAND", "HAMILTON", "HAVERHILL", "IPSWICH",
    "LAWRENCE", "LYNN", "LYNNFIELD", "MANCHESTER BY THE SEA", "MARBLEHEAD",
    "MERRIMAC", "METHUEN", "MIDDLETON", "NAHANT", "NEWBURY", "NEWBURYPORT",
    "NORTH ANDOVER", "PEABODY", "ROCKPORT", "ROWLEY", "SALEM", "SALISBURY",
    "SAUGUS", "SWAMPSCOTT", "TOPSFIELD", "WENHAM", "WEST NEWBURY"
  ];
  
  const franklinCounty = [
    "ASHFIELD", "BERNARDSTON", "BUCKLAND", "CHARLEMONT", "COLRAIN", "CONWAY",
    "DEERFIELD", "ERVING", "GILL", "GREENFIELD", "HAWLEY", "HEATH", "LEVERETT",
    "LEYDEN", "MONROE", "MONTAGUE", "NEW SALEM", "NORTHFIELD", "ORANGE", "ROWE",
    "SHELBURNE", "SHUTESBURY", "SUNDERLAND", "WARWICK", "WENDELL", "WHATELY"
  ];
  
  const hampdenCounty = [
    "AGAWAM", "BLANDFORD", "BRIMFIELD", "CHESTER", "CHICOPEE", "EAST LONGMEADOW",
    "GRANVILLE", "HAMPDEN", "HOLLAND", "HOLYOKE", "LONGMEADOW", "LUDLOW",
    "MONSON", "MONTGOMERY", "PALMER", "RUSSELL", "SOUTHWICK", "SPRINGFIELD",
    "TOLLAND", "WALES", "WEST SPRINGFIELD", "WESTFIELD", "WILBRAHAM"
  ];
  
  const hampshireCounty = [
    "AMHERST", "BELCHERTOWN", "CHESTERFIELD", "CUMMINGTON", "EASTHAMPTON",
    "GOSHEN", "GRANBY", "HADLEY", "HATFIELD", "HUNTINGTON", "MIDDLEFIELD",
    "NORTHAMPTON", "PELHAM", "PLAINFIELD", "SOUTH HADLEY", "SOUTHAMPTON",
    "WARE", "WESTHAMPTON", "WILLIAMSBURG", "WORTHINGTON"
  ];
  
  const middlesexCounty = [
    "ACTON", "ARLINGTON", "ASHBY", "ASHLAND", "AYER", "BEDFORD", "BELMONT",
    "BILLERICA", "BOXBOROUGH", "BURLINGTON", "CAMBRIDGE", "CARLISLE", "CHELMSFORD",
    "CONCORD", "DRACUT", "DUNSTABLE", "EVERETT", "FRAMINGHAM", "GROTON",
    "HOLLISTON", "HOPKINTON", "HUDSON", "LEXINGTON", "LINCOLN", "LITTLETON",
    "LOWELL", "MALDEN", "MARLBOROUGH", "MAYNARD", "MEDFORD", "MELROSE", "NATICK",
    "NEWTON", "NORTH READING", "PEPPERELL", "READING", "SHERBORN", "SHIRLEY",
    "SOMERVILLE", "STONEHAM", "STOW", "SUDBURY", "TEWKSBURY", "TOWNSEND",
    "TYNGSBOROUGH", "WAKEFIELD", "WALTHAM", "WATERTOWN", "WAYLAND", "WESTFORD",
    "WESTON", "WILMINGTON", "WINCHESTER", "WOBURN"
  ];
  
  const nantucketCounty = [
    "NANTUCKET"
  ];
  
  const norfolkCounty = [
    "AVON", "BELLINGHAM", "BRAINTREE", "BROOKLINE", "CANTON", "COHASSET",
    "DEDHAM", "DOVER", "FOXBOROUGH", "FRANKLIN", "HOLBROOK", "MEDFIELD",
    "MEDWAY", "MILLIS", "MILTON", "NEEDHAM", "NORFOLK", "NORWOOD", "PLAINVILLE",
    "QUINCY", "RANDOLPH", "SHARON", "STOUGHTON", "WALPOLE", "WELLESLEY",
    "WEYMOUTH", "WRENTHAM"
  ];

  const plymouthCounty = [
    "ABINGTON", "BRIDGEWATER", "BROCKTON", "CARVER", "DUXBURY", "EAST BRIDGEWATER",
    "HALIFAX", "HANOVER", "HANSON", "HINGHAM", "HULL", "KINGSTON", "LAKEVILLE",
    "MARION", "MARSHFIELD", "MATTAPOISETT", "MIDDLEBOROUGH", "NORWELL", "PEMBROKE",
    "PLYMOUTH", "PLYMPTON", "ROCHESTER", "ROCKLAND", "SCITUATE", "WAREHAM",
    "WEST BRIDGEWATER", "WHITMAN"
  ];
  
  const suffolkCounty = [
    "BOSTON", "CHELSEA", "REVERE", "WINTHROP"
  ];
  
  const worcesterCounty = [
    "ASHBURNHAM", "ATHOL", "AUBURN", "BARRE", "BERLIN", "BLACKSTONE", "BOLTON",
    "BOYLSTON", "BROOKFIELD", "CHARLTON", "CLINTON", "DOUGLAS", "DUDLEY",
    "EAST BROOKFIELD", "FITCHBURG", "GARDNER", "GRAFTON", "HARDWICK", "HARVARD",
    "HOLDEN", "HOPEDALE", "HUBBARDSTON", "LANCASTER", "LEICESTER", "LEOMINSTER",
    "LUNENBURG", "MENDON", "MILFORD", "MILLBURY", "MILLVILLE", "NEW BRAINTREE",
    "NORTH BROOKFIELD", "NORTHBOROUGH", "NORTHBRIDGE", "OAKHAM", "OXFORD",
    "PAXTON", "PETERSHAM", "PHILLIPSTON", "PRINCETON", "ROYALSTON", "RUTLAND",
    "SHREWSBURY", "SOUTHBOROUGH", "SOUTHBRIDGE", "SPENCER", "STERLING", "STURBRIDGE",
    "SUTTON", "TEMPLETON", "UPTON", "UXBRIDGE", "WARREN", "WEBSTER", "WEST BOYLSTON",
    "WEST BROOKFIELD", "WESTBOROUGH", "WESTMINSTER", "WINCHENDON", "WORCESTER"
  ];

  const handleDropdownChange = (event) => {
    const selectedOption = event.target.value;
    // You can implement your custom filtering logic here based on the selected option
    // For example, if you want to filter by a specific county, you can call a corresponding filtering function
    // setMiddlesexCounty(), setSomersetCounty(), etc.
    if (selectedOption === 'Middlesex County') {
      setFilteredData(csvData.filter(
        (row)=>row['City Town Name'][0]==='M'
      ))
    }
    console.log("Selected Option:", selectedOption);
  };

  return (
    <main style={{ maxWidth: 800, margin: "auto" }}>

      <h1>Hello Data Visualization</h1>
        {/* Dropdown menu */}
        <select onChange={handleDropdownChange}>
        <option value="">Select an option</option>
        <option value="Middlesex County">Barnstable County</option>
        <option value="Somerset County">Berkshire County</option>
        <option value="Somerset County">Bristol County</option>
        <option value="Somerset County">Dukes County</option>
        <option value="Somerset County">Essex County</option>
        <option value="Somerset County">Franklin County</option>
        <option value="Somerset County">Hampden County</option>
        <option value="Somerset County">Hampshire County</option>
        <option value="Somerset County">Middlesex County</option>
        <option value="Somerset County">Nantucket County</option>
        <option value="Somerset County">Norfolk County</option>
        <option value="Somerset County">Plymouth County</option>
        <option value="Somerset County">Suffolk County</option>
        <option value="Somerset County">Worcester County</option>
        {/* Add more options as needed */}
      </select>
      <p>Loaded {csvData.length} rows of CSV Data!</p>
      <h2>Favorite Colors:</h2>
      <PieChart width={300} height={300}>
        <Pie data={pieData} dataKey="value" nameKey="name" label fill="yellow">
          <LabelList dataKey="name" position="middle" />
          {pieData.map((entry) => (
            <Cell key={entry.name} fill={entry.name.toLowerCase()} />
          ))}
        </Pie>
      </PieChart>



      <CrashChart crashPlace={pieData}/>
         
      {csvData.map((row, idx) => (
        <div key={idx}>
          {row.AgeDriver} driver age (youngest) {row.AgeOther}'s is {row["Age of Driver - Youngest Known"]}{" "}
          and other driver is {row["Age of Vulnerable User - Youngest Known"]}
        </div>
      ))}
    </main>
  );
};


export default App;
