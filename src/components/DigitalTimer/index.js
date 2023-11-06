// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    plusMinusNumber: 25,
    timeInSeconds: 0,
    isTimerRunning: false,
  }

  onClickPlusButton = () => {
    this.setState(prevState => ({
      plusMinusNumber: prevState.plusMinusNumber + 1,
    }))
  }

  onClickMinusButton = () => {
    this.setState(prevState => ({
      plusMinusNumber: prevState.plusMinusNumber - 1,
    }))
  }

  updateTime = () => {
    this.setState(prevState => ({
      timeInSeconds: prevState.timeInSeconds + 1,
    }))
  }

  onClickStartButton = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning) {
      clearInterval(this.timeInterval)
      this.setState({isTimerRunning: false})
    } else {
      this.timeInterval = setInterval(this.updateTime, 1000)
      this.setState({isTimerRunning: true})
    }
  }

  onClickResetButton = () => {
    clearInterval(this.timeInterval)
    this.setState({
      timeInSeconds: 0,
      plusMinusNumber: 25,
      isTimerRunning: false,
    })
  }

  onRenderMinutes = () => {
    const {plusMinusNumber, timeInSeconds} = this.state
    const totalRemainingSeconds = plusMinusNumber * 60 - timeInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)

    if (minutes < 10) {
      return `0${minutes}`
    }
    return minutes
  }

  onRenderSeconds = () => {
    const {plusMinusNumber, timeInSeconds} = this.state
    const totalRemainingSeconds = plusMinusNumber * 60 - timeInSeconds
    const seconds = Math.floor(totalRemainingSeconds % 60)

    if (seconds < 10) {
      return `0${seconds}`
    }
    return seconds
  }

  render() {
    const {plusMinusNumber, isTimerRunning} = this.state
    const time = `${this.onRenderMinutes()}:${this.onRenderSeconds()}`
    let timerStatus
    let buttonStatus
    if (isTimerRunning) {
      timerStatus = 'Running'
      buttonStatus = 'Pause'
    } else {
      timerStatus = 'Paused'
      buttonStatus = 'Start'
    }
    let imageStatus
    if (isTimerRunning) {
      imageStatus =
        'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    } else {
      imageStatus = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    }
    let iconStatus
    if (isTimerRunning) {
      iconStatus = 'pause icon'
    } else {
      iconStatus = 'play icon'
    }
    return (
      <div className="bg-container">
        <h1 className="digital-heading">Digital Timer</h1>
        <div className="center-container">
          <div className="image-container">
            <div className="timer-container">
              <h1 className="timer-heading">{time}</h1>
              <p className="timer-paragraph">{timerStatus}</p>
            </div>
          </div>
          <div className="right-container">
            <div className="button-container">
              <div className="start-button-container">
                <button
                  className="start-button"
                  type="button"
                  onClick={this.onClickStartButton}
                >
                  <img
                    className="pause-or-play"
                    alt={iconStatus}
                    src={imageStatus}
                  />
                  {buttonStatus}
                </button>
              </div>
              <div className="reset-button-container">
                <button
                  className="start-button"
                  type="button"
                  onClick={this.onClickResetButton}
                >
                  <img
                    className="pause-or-play"
                    alt="reset icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  />
                  Reset
                </button>
              </div>
            </div>
            <p className="time-limit">Set Timer limit</p>
            <div className="plus-minus-container">
              <button
                className="minus-button"
                type="button"
                onClick={this.onClickMinusButton}
                disabled={isTimerRunning}
              >
                -
              </button>
              <div className="twenty-five-container">
                <p className="time-limit">{plusMinusNumber}</p>
              </div>
              <button
                className="minus-button"
                type="button"
                onClick={this.onClickPlusButton}
                disabled={isTimerRunning}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
