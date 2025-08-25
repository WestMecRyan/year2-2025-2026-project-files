class TV {
  constructor(elementId, channels) {
    this.elementId = elementId;
    this.channels = channels;
    this.isOn = false;
    this.currentChannel = null;
    this.channelIndex = 0;
    this.channelList = Object.keys(channels);

    // Get DOM references
    this.screenElement = document.getElementById(`screen-${elementId.split('-')[1]}`);
    this.powerButton = this.screenElement.parentElement.querySelector('.tv-power');

    this.init();
  }

  init() {
    this.updateDisplay();
    this.attachEventListeners();
  }

  togglePower() {
    this.isOn = !this.isOn;
    if (this.isOn && !this.currentChannel) {
      this.currentChannel = this.channelList[0];
    }
    this.updateDisplay();
  }

  changeChannel() {
    if (!this.isOn) return;

    this.channelIndex = (this.channelIndex + 1) % this.channelList.length;
    this.currentChannel = this.channelList[this.channelIndex];
    this.updateDisplay();
  }

  updateDisplay() {
    if (this.isOn && this.currentChannel) {
      this.screenElement.src = this.channels[this.currentChannel];
      this.screenElement.alt = `Currently watching: ${this.currentChannel}`;
    } else {
      this.screenElement.src = "https://images.pexels.com/videos/6923433/pexels-photo-6923433.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
      this.screenElement.alt = "TV is off";
    }
  }

  attachEventListeners() {
    this.powerButton.addEventListener('click', () => this.togglePower());
    this.screenElement.addEventListener('click', () => this.changeChannel());
  }
}