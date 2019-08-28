import React from 'react'
class SMS extends React.Component {

    onClick = async () => {
    //    const enable = await fetch ('https://api.voximplant.com/platform_api/ControlSms/?account_id=3199898&api_key=bd0a9853-7f4c-469e-9007-172f1e820277&phone_number=79581008962&command=enable')
    const send = await fetch ('https://api.voximplant.com/platform_api/SendSmsMessage/?account_id=3199898&api_key=bd0a9853-7f4c-469e-9007-172f1e820277&source=79581008962&destination=79773203997&sms_body=Test%20message')
    console.log(send)
    }
    render() {
        return(
            <div>
                <button onClick={this.onClick}>SMS</button>
            </div>
        )
    }
}


export default SMS;