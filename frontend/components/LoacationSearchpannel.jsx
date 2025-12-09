import React from "react";
import { useContext } from "react";
import { Usercontext } from "../src/context/Usecontext";
const LocationSearchPanel = ({
  setvechicle,
  vechicle,
  pannelopen,
  setpannelopen,
  panelTarget,
  setSet1cordinates,
  setSet2cordinates,
  setPickupname,
  setDropoffname,
}) => {
  const { droplocname, location, setDroplocname } =
    useContext(Usercontext);


  const addresses = [
    {
      name: "Bengaluru International Airport (BLR)",
      coordinates: [77.7102, 13.1986],
    },
    {
      name: "Majestic Bus Stand (Kempegowda Bus Station)",
      coordinates: [77.5726, 12.9781],
    },
    { name: "KR Market", coordinates: [77.5712, 12.9591] },
    { name: "Lalbagh Botanical Garden", coordinates: [77.5848, 12.9507] },
    { name: "Cubbon Park", coordinates: [77.595, 12.9763] },
    { name: "Vidhana Soudha", coordinates: [77.5924, 12.9796] },
    { name: "UB City Mall", coordinates: [77.5963, 12.9719] },
    { name: "MG Road", coordinates: [77.6069, 12.9756] },
    { name: "Brigade Road", coordinates: [77.6053, 12.9713] },
    { name: "Forum Mall Koramangala", coordinates: [77.6101, 12.9354] },
    { name: "Phoenix Marketcity Whitefield", coordinates: [77.6974, 12.995] },
    { name: "Orion Mall", coordinates: [77.5544, 13.011] },
    { name: "ISKCON Temple", coordinates: [77.551, 13.0093] },
    { name: "Bangalore Palace", coordinates: [77.5927, 12.9987] },
    { name: "Electronic City Phase 1", coordinates: [77.6731, 12.839] },
    { name: "Electronic City Phase 2", coordinates: [77.6844, 12.8434] },
    { name: "Marathahalli Bridge", coordinates: [77.699, 12.9568] },
    { name: "Silk Board Junction", coordinates: [77.622, 12.9172] },
    { name: "Hebbal Flyover", coordinates: [77.5995, 13.035] },
    { name: "Yeshwanthpur Railway Station", coordinates: [77.5562, 13.0176] },
    { name: "Whitefield Railway Station", coordinates: [77.7586, 12.9906] },
    { name: "BTM Layout", coordinates: [77.609, 12.9166] },
    { name: "HSR Layout", coordinates: [77.6412, 12.9118] },
    { name: "Indiranagar 100 Ft Road", coordinates: [77.6412, 12.971] },
    { name: "Koramangala 4th Block", coordinates: [77.6271, 12.935] },
    { name: "JP Nagar 7th Phase", coordinates: [77.5941, 12.8919] },
    { name: "Banashankari Temple", coordinates: [77.5678, 12.9181] },
  ];

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden p-4">
      {addresses.map((obj, index) => (
        <div
          className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm mb-3 hover:bg-gray-100 cursor-pointer transition-colors"
          key={index}
          onClick={() => {
            setvechicle(!vechicle);
            setpannelopen(!pannelopen);
            setDroplocname(obj.name);
            if (panelTarget === 'pickup') {
              if (typeof setPickupname === 'function') setPickupname(obj.name);
              if (typeof setSet1cordinates === 'function') {
                setSet1cordinates({
                  latitude: obj.coordinates[1],
                  longitude: obj.coordinates[0],
                });
              }
            } else {
              if (typeof setDropoffname === 'function') setDropoffname(obj.name);
              if (typeof setSet2cordinates === 'function') {
                setSet2cordinates({
                  latitude: obj.coordinates[1],
                  longitude: obj.coordinates[0],
                });
              }
            }
          }}
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#eee] shrink-0">
            <i className="ri-map-pin-fill text-xl text-gray-700"></i>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 leading-snug">
              {obj.name}
            </p>
            <p className="text-xs text-gray-500 mt-1">
             {obj.coordinates[0].toFixed(4)},{" "}
              {obj.coordinates[1].toFixed(4)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
