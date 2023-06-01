import "./style.css";

let device;

window.onload = () => {
  const request = async () => {
    try {
      device = await navigator.usb.requestDevice({ filters: [] });
      await device.open();
      await device.selectConfiguration(1);
      await device.claimInterface(1);
      console.log(device);
      device.transfer;
    } catch (e) {
      document.querySelector("div").innerText = e;
    }
  };
  document.querySelector("button").onclick = request;
};
