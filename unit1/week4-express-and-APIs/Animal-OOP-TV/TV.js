class TV () {
    constructor() {
        this.isOn = false;
        this.currentChannel = null;
    }
    togglePower() {
        this.isOn = !this.isOn;
    }
}