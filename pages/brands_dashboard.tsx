import React, { useState, useEffect } from "react";
import { useAsync } from "react-use";
import { useOvermind } from "stores/Overmind";
//import BrandsTable from "components/analytics/brands";
import DataCard from "components/analytics/cards";
import DataTable from "components/analytics/brandsTable";
// import Custom404 from "pages/404.js";

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function dashboard() {
  const { state: ostate, actions } = useOvermind();

  const brandInfoObj = useAsync(async () => {
    let url = `${TPP}/api/v2/brand/domains/list?jwt=${ostate.user.jwt}`;
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  }, [ostate.user.jwt]);

  const brandInfo = brandInfoObj.value;

  //console.log("brandInfo2", brandInfo);

  const totalDomains = brandInfo?.length.toString();
  const verifiedDomains = brandInfo?.filter(function (item) {
    return item[4] == "true";
  });
  const numberVerified = verifiedDomains?.length.toString();
  const noSetupDomains = brandInfo?.filter(function (item) {
    return item[4] == "false";
  });
  const numberNoSetup = noSetupDomains?.length.toString();

  const domainStats = [
    { name: "Total Domains", value: totalDomains },
    { name: "Number of Verified Domains", value: numberVerified },
    { name: "Number of Non-Verified Domains", value: numberNoSetup },
  ];

  return (
    <div>
      {brandInfo && ostate.user.creator && (
        <div className="flex flex-col mt-24">
          <div className="flex mb-8 items-center mx-auto">
            <DataCard stats={domainStats}></DataCard>
          </div>
          <div className="flex mx-auto">
            {/*<BrandsTable brandInfo={brandInfo}></BrandsTable>*/}
            <DataTable data={brandInfo}></DataTable>
          </div>
        </div>
      )}
    </div>
  );
}
