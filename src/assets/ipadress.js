async function getIPAddress() {
  const response = await fetch("https://api.ipify.org?format=json");
  const data = await response.json();
  return data.ip;
}

getIPAddress().then((ip) => console.log(ip));

const ip = await getIPAddress();
const token = "3aafd0fa14f59d";

const url = `https://ipinfo.io/${ip}?token=${token}`;

const getIP = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const ipData = await getIP();

export default ipData;
