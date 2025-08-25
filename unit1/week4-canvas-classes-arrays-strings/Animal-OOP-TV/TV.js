class TV {
  constructor(channel) {
    this.channel = channel;
    this.isOn = false;
    this.currentChannel = null;
    this.id =
      Math.floor(Math.random() * 100 + 1).toString() +
      Math.floor(Math.random() * 100 + 1).toString();
  }
  togglePower() {
    this.isOn = !this.isOn;
  }
}

export default TV;
