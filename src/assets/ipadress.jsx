// ipaddress.jsx

async function getIPAddress() {
  const response = await fetch("https://api.ipify.org?format=json");
  const data = await response.json();
  return data.ip;
}

const token = "3aafd0fa14f59d";

async function getIPData() {
  const ip = await getIPAddress();
  const url = `https://ipinfo.io/${ip}?token=${token}`;
  const response = await fetch(url);
  const data = await response.json();
  return {
    ip,
    ipData: data
  };
}

// Since you can't use top-level await, export the function itself
// and handle the resolution wherever you import this module.
export { getIPData };
