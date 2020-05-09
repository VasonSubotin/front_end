import React from "react";
import turf from "@turf/distance";

import s from "./styles.module.scss";
// schedule_id
// Msoc
// Collection of intervals ids:
// Energy to charge
// Co2_impact
// Soc_achieved
// Cost_of_charging

// [
//   {
//     "intervals": [],
//     "savings": 0
//   },
//   {
//     "intervals": [
//       {
//         "charge_rate": 71,
//         "co2_impact": 1,
//         "cost_of_charging": 693,
//         "duration": 3211,
//         "economic_savings": 6,
//         "energy": 224.51298051998373,
//         "interval_type": "CHR",
//         "location": "Лос-Анджелес, Калифорния, США",
//         "price": 2,
//         "soc_achieved": 269.5129805199837,
//         "time_start": "2019-11-11 21:31:45.527760"
//       },
//       {
//         "charge_rate": 430,
//         "co2_impact": 2,
//         "cost_of_charging": 922,
//         "duration": 8741,
//         "economic_savings": 6,
//         "energy": 225.48701948001622,
//         "interval_type": "CHR",
//         "location": "СТЕЙПЛС Сентер, 1111 S Figueroa St, Los Angeles, CA 90015, США",
//         "price": 2,
//         "soc_achieved": 268.9870194800162,
//         "time_start": "2019-11-11 21:31:45.527760"
//       }
//     ],
//     "savings": 3.5,
//     "schedule_id": "guid",
//     "time_start": "2019-11-11 21:31:45.533393"
//   }
// ]

const round = (number, precision) => {
  const factor = Math.pow(10, precision);
  const tempNumber = number * factor;
  const roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
};

const withDistance = data =>
  data.reduce((acc, curr, i) => {
    if (i === 0) {
      return [{ ...curr, distance: null }];
    }

    const dist = turf(
      [curr.lat, curr.long],
      [acc[i - 1].lat, acc[i - 1].long],
      "miles"
    );

    return [...acc, { ...curr, distance: dist }];
  }, []);

const Interval = ({
  energy,
  price,
  cost_of_charging,
  charging_time,
  co2_impact,
  soc_achieved,
  current_soc,
  distance
}) => (
  <div style={{ paddingLeft: 10, paddingBottom: 5, paddingTop: 5 }}>
    {`Energy to charge: ${energy} kWh; Co2 impact: ${co2_impact}; Energy rate: ${price} $/MWh; 
    SOC at arravial: ${current_soc} kWh; Soc achieved: ${soc_achieved === null ? "Start point" : round(soc_achieved, 2)}kWh; 
    Charging time: ${charging_time === null ? 0 : round(charging_time, 2)} h; 
    Cost_of_charging: ${cost_of_charging === null ? 0 : round(cost_of_charging, 2)} $; 
    Distance: ${distance === null ? 0 : round(distance, 2)
    } m \n`}
  </div>
);

const Log = ({ schedule_id, msoc, intervals }) => {
  const distanced = withDistance(intervals);
  return (
    <div className={s.logContainer}>
      <div>{`Schedule Id: ${schedule_id};`}</div>
      <div>{`Msoc: ${msoc};`}</div>
      <div>Intervals: [</div>
      {distanced.map(interval => Interval(interval))}
      <div>]</div>
    </div>
  );
};

const Logs = ({ data }) => {
  console.log("data", data);
  if (data.length === 0) {
    return (
      <div className={s.containerLog}>
        <span>No results yet...</span>
      </div>
    );
  }

  return (
    <div className={s.logs}>
      {data.map((datum, i) => (
        <Log key={i} {...datum} />
      ))}
    </div>
  );
};

export default Logs;
