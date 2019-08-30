import React from 'react'
import {
    Select,
} from 'react-materialize';
class SMS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parts: [],
            part: '',
            countries: [],
            country: '',
            countryID: '',
            regions: [],
            region: ''
        }
    }
    async componentDidMount() {
        const resp = await fetch('http://htmlweb.ru/geo/api.php?locations&json&api_key=7464b9d209e6dcb1d5ebaa5a587c784e')
        
        const parts = await resp.json()
        const arr = Object.keys(parts).map(function (key) {
            return [Number(key), parts[key]]
        })

        this.setState({
            parts: arr,

        })
        console.log(arr)
    }

    changePart = async (e) => {
        this.setState({
            part: e.target.value
        }, ()=>this.chooseCountry())      
    }
    chooseCountry = async () => {
        const resp1 = await fetch(`http://htmlweb.ru/geo/api.php?location=${this.state.part}&json&api_key=7464b9d209e6dcb1d5ebaa5a587c784e`)
        const countries = await resp1.json()
        const arr1 = Object.keys(countries).map(function (key) {
            return [Number(key), countries[key]]
        })
        console.log(arr1)
        this.setState({
            countries: arr1
        })
    }
    changeCountry = async (e) => {
        this.setState({
            country: e.target.value
        }, ()=>this.chooseRegion())
    }
    chooseRegion = async () => {
        const idArr = this.state.country.split(' ')
        const id = idArr[idArr.length-1]
        console.log(this.state.country)
        const resp2 = await fetch(`http://htmlweb.ru/geo/api.php?country=${id}&json&api_key=7464b9d209e6dcb1d5ebaa5a587c784e`)
        const regions = await resp2.json()
        console.log(regions)
        const arr2 = Object.keys(regions).map(function (key) {
            return [Number(key), regions[key]]
        })
        console.log(arr2)
        this.setState({
            regions: arr2
        })
    }
    changeRegion = async (e) => {
        this.setState({
            region: e.target.value
        })
    }


    render() {
        console.log('------');
        
        console.log(this.state.countries);
        console.log(this.state.regions);
        
        return (
            <div>
                <Select defaultValue="" onChange={this.changePart}>
                    <option value="" disabled>
                        Choose part
        </option>
                    {this.state.parts ? this.state.parts.map((part) =>
                        <option value={`${part[1]}`}>
                            {part[1]}
                        </option>
                    ) : null}
                </Select>

                <Select defaultValue="" onChange={this.changeCountry}>
                    <option value="" disabled>
                        Choose country
    </option>
                    {this.state.countries ? this.state.countries.map((country) =>
                        <option value={`${country[1].name} ${country[1].id}`} >
                            {`${country[1].name} ${country[1].id}`}
                        </option>
                    ) : null}
                </Select>

                <Select defaultValue="" onChange={this.changeRegion}>
                    <option value="" disabled>
                        Choose region
    </option>
                    {this.state.regions ? this.state.regions.map((region) =>
                        <option value={`${region[1].name}`} >
                            {region[1].name}
                        </option>
                    ) : null}
                </Select>



            </div>
        )
    }
}



export default SMS;