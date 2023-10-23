import React, { useState, useEffect } from 'react';
import { useOvermind } from 'stores/Overmind';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function Access({ link }) {
  const { state: ostate, actions } = useOvermind();
  const [mixpanelData, setMixpanelData] = useState<any>();
  const [chartData, setChartData] = useState<any>();
  const [chartLabels, setChartLabels] = useState<any>();

  const newDate = new Date();
  const dateNow = newDate.toISOString().split('T')[0];

  const linkDate = link?.created;
  const linkCreateDate = linkDate.split('T')[0];

  const [fromDate, setFromDate] = useState(linkCreateDate.toString());
  const [toDate, setToDate] = useState(dateNow.toString());
  const [newEvent, setEvent] = useState('tpp_server_page_served');
  const [time, setTime] = useState('week');

  const handleSubmit = async (e) => {
    e.preventDefault();

    var params = {
      from_date: fromDate,
      to_date: toDate,
      event: newEvent,
      name: 'tid',
      tpp: `${link.id}`,
      type: 'unique',
      unit: time,
      interval: 1,
    };

    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    };

    const url: URL = new URL(`${TPP}/api/v2/data/eventData`);
    url.searchParams.set('jwt', ostate.user.jwt);

    const result = await fetch(url.href, requestOptions).then((response) =>
      response.json()
    );
    setMixpanelData(result);
    if (result.data?.values?.[`${link.id}`]) {
      setChartLabels(Object.keys(result.data?.values?.[`${link.id}`]));
      setChartData(Object.values(result.data?.values?.[`${link.id}`]));
    } else {
      alert(
        'No data available for this duration. Please choose another type or time period'
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} method="POST">
        <div className="flex flex-col space-y-2">
          <h1 className="font-bold text-base-content tracking-wide text-lg">
            Create a Usage Graph
          </h1>
          <div className="mt-2 flex flex-row">
            <label
              htmlFor="from_date"
              className="w-1/3 tracking-wide block text-sm text-base-content mb-1"
            >
              From Date
            </label>
            <input
              id="from_date"
              name="from_date"
              defaultValue={linkCreateDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="input input-bordered input-primary w-2/3"
            ></input>
          </div>
          <div className="flex flex-row">
            <label
              htmlFor="from_date"
              className="w-1/3 tracking-wide block text-sm text-base-content mb-1"
            >
              To Date
            </label>
            <input
              id="from_date"
              name="from_date"
              defaultValue={dateNow}
              onChange={(e) => setToDate(e.target.value)}
              className="input input-bordered input-primary w-2/3"
            ></input>
          </div>
          <div className="flex flex-row">
            <label
              htmlFor="from_date"
              className="w-1/3 tracking-wide block text-sm text-base-content mb-1"
            >
              Time Interval
            </label>
            <select
              name={time}
              defaultValue={'week'}
              id="event"
              onChange={(e) => setTime(e.target.value)}
              className="input input-bordered input-primary font-body"
            >
              <option value={'day'}>By Day</option>
              <option value={'week'}>By Week</option>
            </select>
          </div>
          <div className="flex flex-row">
            <label
              htmlFor="from_date"
              className="w-1/3 tracking-wide block text-sm text-base-content mb-1"
            >
              Type of Data
            </label>
            <select
              name={newEvent}
              id="event"
              onChange={(e) => setEvent(e.target.value)}
              className="input input-bordered input-primary font-body"
            >
              <option value={'tpp_server_page_served'}>Number of Views</option>
              <option value={'tpp_server_not_enough'}>
                Number of Not Enough
              </option>
            </select>
          </div>
          <div className="flex">
            <button
              type="submit"
              className="flex mx-auto btn bg-primary tracking-wider text-primary-content mt-4 mb-2 py-1 text-xl w-2/3"
            >
              Generate Table
            </button>
          </div>
        </div>
      </form>
      {mixpanelData && chartData && chartLabels && (
        <table className="table-normal w-full text-left">
          <thead>
            <tr>
              <th>Data</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {chartLabels.map((x, i) => (
              <tr>
                <td>{x}</td>
                <td>{chartData[i]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
