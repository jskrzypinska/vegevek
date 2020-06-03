const username = "asia";
const password = "ECXo IRKT VONb q3Es T4vy 1wtS";
const token = Buffer.from(`${username}:${password}`, "utf8").toString(
  "base64"
);
const url = "http://localhost/wordpress/wp-json/redirection/v1/redirect";

class RedirectionService  {
    
}
fetchRedirect = () => {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.items);
      })
      .catch((err) => {
        console.log("err", err);
      });
};

async postData (variationRedirect) {
    let data = {
      url: variationRedirect.redirect.url,
      match_url: "/",
      match_data: {
        source: {
          flag_query: "exact",
          flag_case: false,
          flag_trailing: false,
          flag_regex: false,
        },
      },
      action_code: 301,
      action_type: "url",
      action_data: {
        url: `http://localhost/wordpress/?add-to-cart=${variationRedirect.variationId}`,
      },
      match_type: "url",
      group_id: 3,
    };

    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  async editData(variationRedirect) {
      data = {
        url: variationRedirect.redirect.url,
        match_url: "/",
        match_data: {
          source: {
            flag_query: "exact",
            flag_case: false,
            flag_trailing: false,
            flag_regex: false,
          },
        },
        action_code: 301,
        action_type: "url",
        action_data: {
          url: `http://localhost/wordpress/?add-to-cart=${variationRedirect.variationId}`,
        },
        match_type: "url",
        group_id: 3,
      };

    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((err) => {
        console.log("err", err);
      });
    console.log(data);
  }