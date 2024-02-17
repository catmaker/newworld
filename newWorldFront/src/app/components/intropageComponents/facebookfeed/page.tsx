import { useState, useEffect } from "react";

type FacebookData = {
  data: {
    picture: string;
    name: string;
    link: string;
  }[];
};

const FacebookFeed = () => {
  const [facebookData, setFacebookData] = useState<FacebookData | null>(null);
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리하는 상태를 추가합니다.

  useEffect(() => {
    fetch(
      "https://graph.facebook.com/v18.0/4780344565524119/feed?fields=attachments%2Cmessage%2Cpicture%2Clink%2Cname%2Ccaption%2Cdescription%2Csource&limit=5&access_token=EAAKqjJo7xBEBO2GJWGjGDZCrjPiBk3eYOv18E14juf6or9eGZC1kdXpZC0smHkQKbFZBu66UH8Ps2rZAx6qJ5hYr849l1w1DmZB42zZCcVxKsfQbW3ztj1Ge2ctyPndkPD86WUn539I2cQifxZAd9xbbQmUEJgY4vHBCu1OH5ehjqZCsLJSYK0zC1tAPFtRBDHtbDjzO1hUsdoLoYoOiToBjEcr0GBmy1ryBvYz8ZC39qQwDJXujBVwZCb3eIXiewp2sbZCfiwZDZD"
    )
      .then((response) => response.json())
      .then((data) => {
        setFacebookData(data); // 데이터를 상태에 저장
        setLoading(false); // 데이터를 불러온 후 로딩 상태를 false로 설정합니다.
      });
  }, []);

  // 로딩 중이거나 facebookData가 null이거나 facebookData.data가 undefined이면 로딩 메시지를, 그렇지 않으면 데이터를 표시합니다.
  return (
    <div>
      {loading || !facebookData || !facebookData.data ? (
        <p>Loading...</p>
      ) : (
        facebookData.data.map((item, index) => (
          <div key={index}>
            <img src={item.picture} alt={item.name} />
            <a href={item.link}>{item.name}</a>
          </div>
        ))
      )}
    </div>
  );
};

export default FacebookFeed;
