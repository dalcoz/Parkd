import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';

import './PhotoDetail.css';

import Footer from '../../components/Footer/Footer';
import TransparentNav from '../../components/TransparentNav/TransparentNav';
import ReactGoogleMap from '../../components/GoogleMap/ReactGoogleMap';

import imgFood from '../../images/food/food1.png';

const localData = [
    '808 grinds'
    , 'I don\'t just eat cookies all day! This heap of meat is the kalua pig from @808grinds and it\'s delicious! their habanero teriyaki sauce is delicious too!'
    , '815 SW Park Ave, Portland, OR 97205, USA'
    , 'M - F\n11:30 am - 2:00 pm\n5:00 pm - 9:00 pm\nSA - SU\n5:00 pm - 9:00 pm'
    , [45.5186898, -122.6814688]
    , [ imgFood, 0 ]        // image and id
    , ['Director Park', '../parks/detail?id=-1']
    , ['808 grinds', '../trucks/detail?id=-1']
    , 8
];


export default class PhotoDetail extends Component {
    constructor(props) {
        super(props);

        //read truck id from the query parameter, default is -1
        const queryString = props.location.search;
        const params = new URLSearchParams(queryString);
        let photoId = params.get('id');
        if(photoId === null) photoId = -1;

        // load data
        let data = null;
        if(photoId === -1 || data === null) data = localData;

        this.state = {
            data: data,
            photoId: photoId,
        };
    }

    getBasicDescription(){
        return(
            <div className={"photo-tag-info"}>
                <h1>{'# ' + this.state.data[0]}</h1>
                <br/>
                <p>{this.state.data[1]}</p>
            </div>
        );
    }

    getHourInfo(){
        let strHours = this.state.data[3];

        return (
            <div className={"basicInfo hourInfo basicDescription"}>
                <h1>Hours</h1>
                <p>
                    {strHours.split("\n").map((str, i) => {
                        return <div key={i}>{str}</div>;
                    })}
                </p>
            </div>
        )
    }

    getRatingInfo(){
        return (
            <div className={"basicInfo rateInfo basicDescription"}>
                <h1>Likes</h1>
                <p>{this.state.data[8]}</p>
            </div>
        )
    }

    getParkInfo(){
        return (
            <div className={"parkInfo basicInfo basicDescription"}>
                <h1>Nearby Park</h1>
                <a href={this.state.data[6][1]}>{this.state.data[6][0]}</a>
            </div>
        );

    }

    getTruckInfo(){
        return (
            <div className={"truckInfo basicInfo"}>
                <h3>Food Truck</h3>
                <a href={this.state.data[7][1]}>{this.state.data[7][0]}</a>
            </div>
        );

    }

    getLocationInfo(){
        return (
            <div className={"locationInfo basicInfo"}>
                <h3>Location</h3>
                <p>{this.state.data[2]}</p>
                <ReactGoogleMap isMarkerShown={true}
                                lat={this.state.data[4][0]}
                                lng={this.state.data[4][1]}
                                zoom={15}/>
            </div>
        )
    }

    render(){
        let images = [];
        for(let i=0; i<this.state.data[5].length; i++){
            images.push(this.state.data[5][i][0]);
        }

        return (
            <div>
                <TransparentNav isTinted={true}/>

                <div className={'bodyPhoto'}>
                    <img src={this.state.data[5][0]} alt={'photos'}/>

                    <div className="sectionDivider"/>

                    <Container className={'info'}>
                        <Row>
                            {/* Description */}
                            <Col xs="8">
                                {this.getBasicDescription()}
                                {this.getRatingInfo()}
                                {this.getHourInfo()}
                                {this.getParkInfo()}
                            </Col>

                            {/* Location Information */}
                            <Col xs="4">
                                {this.getTruckInfo()}
                                <br/>
                                {this.getLocationInfo()}
                            </Col>
                        </Row>
                    </Container>

                    <div className={"sectionDivider"}>
                        <br/>
                    </div>
                </div>

                <Footer/>
            </div>
        );
    }
}

