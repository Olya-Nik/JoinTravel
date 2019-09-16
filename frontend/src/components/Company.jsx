import React, {Suspense} from 'react'
import { useTranslation, withTranslation, Trans } from 'react-i18next'
import { Collection, CollectionItem, Row, Col, Icon } from 'react-materialize'
import moment from 'moment'
const server = "http://localhost:3001"

class Company extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allusers: []
        }
    }
    async componentDidMount() {
        const resp = await fetch(`${server}/getall`)
        const allusers = await resp.json()
        console.log(allusers)
        this.setState({ allusers: allusers })
    }

    render() {
        const { t } = this.props;
        return (
            <Row className="company">
                <Col m={4} s={12} block style={{
                    width: "800px",
                    
                }}>
                    <Collection>
                        {this.state.allusers ? this.state.allusers.map((user) =>
                            <CollectionItem className="avatar" key={user._id}>
                                <img  className= 'imagepop' src={`http://localhost:3001/${user.imageData}`} alt="" className="circle" />
                                <span className="title" >
                                    {user.name}
                                </span>
                                <div className='textprofile'>
                                <p>
                                    {t('Dates of trip')}: {`${moment(user.dateDepature).format("DD MMM YYYY")} - ${moment(user.dateReturn).format("DD MMM YYYY")}`}
                                </p>
                                <p>
                                {t('Contacts')}: {user.contacts}
                                </p>
                                </div>
                                <a href={`/company/${user._id}`} className="secondary-content">
                                    <Icon>
                                        {t('More info')}
                                </Icon>
                                </a>
                            </CollectionItem>
                        ) : null}
                    </Collection>
                </Col>
            </Row>
        )
    }
}
const CompanyTrans = withTranslation()(Company);
const Loader = () => (
    <div className="App">
      <div>loading...</div>
    </div>
  );
  export default function App() {
    return (
      <Suspense fallback={<Loader />}>
        <CompanyTrans />
      </Suspense>
    );
  }