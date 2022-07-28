import React, { Component } from 'react';
import ZingTouch from 'zingtouch';
import '../css/main.css'
import games from "../images/games.png";
import settings from "../images/settings.png";
import cover from "../images/cover.png";
import music from "../images/music.png";
import {trackDragEvent} from "../utils/util";


class Menu extends Component {
    constructor(props) {
        super();

        this.state = {
            highlighted: "",
            showL1Menu: true,
            showBaseCover: false,
            showMusicCover: false,
            showGamesCover: false,
            showSettingsCover: false
        }
        
        this.handleBack = this.handleBack.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        let myRegion = new ZingTouch.Region(document.body);
        let myElement = document.getElementById('region');
        let _this = this;
        window.menuArray = ["Cover", "Music", "Games", "Settings"];

        myRegion.bind(myElement, 'pan', function(e) {
            window._e = e;
        });

        document.addEventListener('mousedown', function(e) {
            trackDragEvent(_this);
        });
        document.addEventListener('touchstart', function(e) {
            trackDragEvent(_this);
        });
        document.addEventListener('mouseup', function(e) {
            clearInterval(window.interval);
        });
        document.addEventListener('touchend', function(e) {
            clearInterval(window.interval);
        });
    }

    handleSelect() {
        const {highlighted} = this.state;
        this.handleOnSelection(highlighted);
    }

    handleBack() {
        this.setState({
            showL1Menu: true,
            showBaseCover: false,
            showMusicCover: false,
            showGamesCover: false,
            showSettingsCover: false,
        });
    }

    handleOnSelection(type) {
        this.setState({
            showL1Menu: false,
            showBaseCover: false,
            showMusicCover: false,
            showGamesCover: false,
            showSettingsCover: false
        });
        switch(type) {
            case 'Cover': 
                this.setState({showBaseCover: true,});
            break;
            case 'Music': 
                this.setState({showMusicCover: true,});
            break;
            case 'Games': 
                this.setState({showGamesCover: true,});
            break;
            case 'Settings': 
                this.setState({showSettingsCover: true,});
            break;
            default: break;
        }
    }

    render() {
        const {showL1Menu, showBaseCover, showMusicCover, showGamesCover, showSettingsCover, highlighted} = this.state;
        return (
            <div className="menu">
                <div class="ipod-bg">
                    {
                        showL1Menu && <h3>Ipod</h3>
                    }
                    {
                        showL1Menu &&
                        <ul>
                            <li className={highlighted === "Cover" ? "highlight" : ""} >Cover</li>
                            <li className={highlighted === "Music" ? "highlight" : ""} >Music</li>
                            <li className={highlighted === "Games" ? "highlight" : ""} >Games</li>
                            <li className={highlighted === "Settings" ? "highlight" : ""} >Settings</li>
                        </ul>
                    }
                    {
                        showBaseCover &&
                        <div className="img-cover">
                            <img src={cover} />
                        </div>
                    }
                    {
                        showMusicCover &&
                        <div className="img-cover">
                            <img src={music} />
                        </div>
                    }
                    {
                        showGamesCover &&
                        <div className="img-cover">
                            <img src={games} />
                        </div>
                    }
                    {
                        showSettingsCover &&
                        <div className="img-cover">
                            <img src={settings} />
                        </div>
                    }
                </div>
                <div id="region" className="touch-region">
                    <i onTouchStart={this.handleBack} onClick={this.handleBack}></i>
                    <span onTouchStart={this.handleSelect} onClick={this.handleSelect}>
                    </span>
                </div>
            </div>
        );
    }
}

export default Menu;